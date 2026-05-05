import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import {
  ref,
  onValue,
  set,
  update,
  get,
  child,
} from "firebase/database";
import { sendTelegramAlert, sendTelegramLocation, buildMapLink } from "./telegram";

import DashboardCards from "./components/DashboardCards";
import DirectionControls from "./components/DirectionControls";
import LiveMap from "./components/LiveMap";
import RegisterModal from "./components/RegisterModal";
import AlertPopup from "./components/AlertPopup";

const ROOT_PATH = "Vehicle_Security";

const defaultData = {
  Accident: 0,
  Ax: 0,
  Ay: 0,
  Az: 0,
  Count: 0,
  Delete: 0,
  Enroll: 0,
  Obstacle: 0,
  Relay: 0,
  Unauthorized: 0,
  Vibration: 0,
  Direction: "S",
};

export default function App() {
  const [data, setData] = useState(defaultData);
  const [users, setUsers] = useState({});
  const [userCount, setUserCount] = useState(0);
  const [nextEnrollId, setNextEnrollId] = useState(1);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [alertBox, setAlertBox] = useState(null);
  const [location, setLocation] = useState(null);

  const lastAlerts = useRef({
    Obstacle: 0,
    Unauthorized: 0,
    Accident: 0,
    Vibration: 0,
  });

  // Keep a ref so the Firebase listener always reads the latest location
  const locationRef = useRef(null);

  useEffect(() => {
    const dataRef = ref(db, ROOT_PATH);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const val = snapshot.val() || {};
      const newData = {
        ...defaultData,
        ...val,
      };
      setData(newData);

      if (newData.Obstacle === 1 && lastAlerts.current.Obstacle !== 1) {
        setAlertBox({
          title: "Alert",
          message: "Obstacle detected",
        });
      }

      if (newData.Unauthorized === 1 && lastAlerts.current.Unauthorized !== 1) {
        setAlertBox({
          title: "Security Alert",
          message: "Unauthorized person detected",
        });
        // Get freshest location — ref first, fallback to Firebase stored value
        const sendUnauthorizedAlert = async () => {
          let loc = locationRef.current;
          if (!loc) {
            const snap = await get(child(ref(db), `${ROOT_PATH}/CurrentLocation`));
            if (snap.exists()) loc = snap.val();
          }
          const mapLink = loc
            ? `<a href="https://www.google.com/maps?q=${loc.lat},${loc.lng}">📍 Open in Google Maps (${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)})</a>`
            : "📍 Location not available";
          await sendTelegramAlert(
            `🚨 <b>UNAUTHORIZED ACCESS DETECTED</b>\n\n` +
            `🚗 Smart Vehicle Security System\n` +
            `⏰ Time: ${new Date().toLocaleString()}\n\n` +
            `${mapLink}`
          );
          if (loc) await sendTelegramLocation(loc.lat, loc.lng);
        };
        sendUnauthorizedAlert();
      }

      if (newData.Accident === 1 && lastAlerts.current.Accident !== 1) {
        setAlertBox({
          title: "Emergency Alert",
          message: "Vehicle accident detected",
        });
        const sendAccidentAlert = async () => {
          let loc = locationRef.current;
          if (!loc) {
            const snap = await get(child(ref(db), `${ROOT_PATH}/CurrentLocation`));
            if (snap.exists()) loc = snap.val();
          }
          const mapLink = loc
            ? `<a href="https://www.google.com/maps?q=${loc.lat},${loc.lng}">📍 Open in Google Maps (${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)})</a>`
            : "📍 Location not available";
          await sendTelegramAlert(
            `🆘 <b>ACCIDENT DETECTED — EMERGENCY ALERT</b>\n\n` +
            `🚗 Smart Vehicle Security System\n` +
            `⏰ Time: ${new Date().toLocaleString()}\n\n` +
            `${mapLink}`
          );
          if (loc) await sendTelegramLocation(loc.lat, loc.lng);
        };
        sendAccidentAlert();
      }

      if (newData.Vibration === 1 && lastAlerts.current.Vibration !== 1) {
        setAlertBox({
          title: "Warning",
          message: "Vibration detected",
        });
      }

      lastAlerts.current = {
        Obstacle: newData.Obstacle,
        Unauthorized: newData.Unauthorized,
        Accident: newData.Accident,
        Vibration: newData.Vibration,
      };
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const usersRef = ref(db, `${ROOT_PATH}/Users`);

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const val = snapshot.val() || {};
      setUsers(val);

      const ids = Object.keys(val)
        .map((k) => Number(k))
        .filter((n) => !Number.isNaN(n))
        .sort((a, b) => a - b);

      setUserCount(ids.length);

      let nextId = 1;
      while (ids.includes(nextId)) {
        nextId++;
      }

      if (nextId > 64) {
        setNextEnrollId(65);
      } else {
        setNextEnrollId(nextId);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    // watchPosition keeps locationRef always up-to-date
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(loc);
        locationRef.current = loc;

        update(ref(db, ROOT_PATH), {
          CurrentLocation: {
            lat: loc.lat,
            lng: loc.lng,
          },
        });
      },
      (error) => {
        console.log("Location error:", error);
        // Fallback: try to read stored location from Firebase
        get(child(ref(db), `${ROOT_PATH}/CurrentLocation`)).then((snap) => {
          if (snap.exists()) {
            const stored = snap.val();
            if (stored.lat && stored.lng) {
              locationRef.current = { lat: stored.lat, lng: stored.lng };
              setLocation({ lat: stored.lat, lng: stored.lng });
            }
          }
        });
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const handleRelayToggle = async () => {
    const newValue = data.Relay === 1 ? 0 : 1;
    await update(ref(db, ROOT_PATH), {
      Relay: newValue,
    });
  };

  const handleSendDirection = async (dir) => {
    await update(ref(db, ROOT_PATH), {
      Direction: dir,
    });
  };

  const handleRegisterUser = async (userData) => {
    if (nextEnrollId > 64) {
      alert("Register limit reached. Maximum is 64 users.");
      return;
    }

    const confirmRegister = window.confirm(
      `Register user with Enroll Number ${userData.id}?`
    );
    if (!confirmRegister) return;

    await set(ref(db, `${ROOT_PATH}/Users/${userData.id}`), {
      id: userData.id,
      name: userData.name,
      gender: userData.gender,
      createdAt: new Date().toISOString(),
    });

    await update(ref(db, ROOT_PATH), {
      Enroll: userData.id,
      UserCount: userCount + 1,
    });

    setShowRegisterModal(false);
    setAlertBox({
      title: "Success",
      message: `User registered successfully. Enroll number sent: ${userData.id}`,
    });
  };

  const handleDeleteUser = async () => {
    const trimmed = deleteId.trim();
    if (!trimmed) {
      setAlertBox({ title: "Error", message: "Enter a user name or number to delete." });
      return;
    }

    let targetUser = null;
    const numId = Number(trimmed);

    if (!isNaN(numId) && Number.isInteger(numId) && numId >= 1 && numId <= 64) {
      if (users[numId]) targetUser = users[numId];
    } else {
      targetUser =
        Object.values(users).find(
          (u) => u.name && u.name.toLowerCase() === trimmed.toLowerCase()
        ) || null;
    }

    if (!targetUser) {
      setAlertBox({
        title: "Not Found",
        message: `No registered user found matching "${trimmed}".`,
      });
      return;
    }

    const id = targetUser.id;
    const userName = targetUser.name;

    const confirmDelete = window.confirm(
      `Delete user "${userName}" (Number: ${id})?`
    );
    if (!confirmDelete) return;

    await set(ref(db, `${ROOT_PATH}/Users/${id}`), null);

    await update(ref(db, ROOT_PATH), {
      Delete: id,
      UserCount: Math.max(userCount - 1, 0),
    });

    setDeleteId("");
    setAlertBox({
      title: "Deleted",
      message: `User "${userName}" (Number: ${id}) deleted. Delete value ${id} sent to Firebase.`,
    });
  };

  const findUserBySearch = (search) => {
    const trimmed = (search || "").trim();
    if (!trimmed) return null;
    const numId = Number(trimmed);
    if (!isNaN(numId) && Number.isInteger(numId) && numId >= 1 && numId <= 64) {
      return users[numId] || null;
    }
    return (
      Object.values(users).find(
        (u) => u.name && u.name.toLowerCase() === trimmed.toLowerCase()
      ) || null
    );
  };

  const deletePreview = findUserBySearch(deleteId);

  return (
    <div className="app">

      {/* ---- HEADER ---- */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="topbar-logo">🚗</div>
          <div>
            <h1>Smart Vehicle Security System</h1>
            <p>Real-time Accident Detection &amp; Recovery Dashboard</p>
          </div>
        </div>
        <div className="topbar-chips">
          <div className={`chip ${data.Accident === 1 ? "chip-danger" : "chip-ok"}`}>
            <span className="chip-dot"></span> Accident
          </div>
          <div className={`chip ${data.Unauthorized === 1 ? "chip-danger" : "chip-ok"}`}>
            <span className="chip-dot"></span> Unauthorized
          </div>
          <div className={`chip ${data.Obstacle === 1 ? "chip-warning" : "chip-ok"}`}>
            <span className="chip-dot"></span> Obstacle
          </div>
          <div className={`chip ${data.Vibration === 1 ? "chip-warning" : "chip-ok"}`}>
            <span className="chip-dot"></span> Vibration
          </div>
          <div className="live-badge">
            <span className="live-dot"></span> LIVE
          </div>
        </div>
      </header>

      {/* ---- STATUS CARDS ---- */}
      <p className="section-label">System Status</p>
      <DashboardCards data={data} userCount={userCount} />

      {/* ---- CONTROLS ---- */}
      <p className="section-label">Controls</p>
      <section className="section-grid">

        <div className="panel">
          <div className="panel-heading">
            <div className="panel-icon icon-green">⚡</div>
            <div>
              <h2>Vehicle Power</h2>
              <p className="panel-heading-sub">Engine relay control</p>
            </div>
          </div>
          <button
            className={data.Relay === 1 ? "toggle-btn active" : "toggle-btn"}
            onClick={handleRelayToggle}
          >
            {data.Relay === 1 ? "🔴 Turn Engine OFF" : "🟢 Turn Engine ON"}
          </button>
          <div className="power-status">
            <span className={`power-dot ${data.Relay === 1 ? "on" : "off"}`}></span>
            Engine is currently <strong style={{ marginLeft: 4 }}>{data.Relay === 1 ? "RUNNING" : "OFF"}</strong>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div className="panel-icon icon-indigo">◉</div>
            <div>
              <h2>Register Fingerprint</h2>
              <p className="panel-heading-sub">
                Next enroll no:&nbsp;
                <strong style={{ color: "var(--accent)", fontFamily: "monospace" }}>
                  {nextEnrollId <= 64 ? nextEnrollId : "—"}
                </strong>
              </p>
            </div>
          </div>
          <p className="small-text">
            Up to <strong>64 users</strong> can be registered. The next available slot is automatically assigned.
          </p>
          <button className="btn-full" onClick={() => setShowRegisterModal(true)}>
            + Register New User
          </button>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div className="panel-icon icon-red">🗑</div>
            <div>
              <h2>Delete Fingerprint</h2>
              <p className="panel-heading-sub">Search by name or number</p>
            </div>
          </div>
          <input
            type="text"
            placeholder="Name or user number (1–64)"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          {deleteId.trim() && (
            <div className={`search-result ${deletePreview ? "found" : "not-found"}`}>
              {deletePreview
                ? `${deletePreview.name} — User #${deletePreview.id} (${deletePreview.gender})`
                : `No user found for "${deleteId.trim()}"`}
            </div>
          )}
          <button className="danger btn-full" onClick={handleDeleteUser}>
            Delete User
          </button>
        </div>

      </section>

      {/* ---- DIRECTION ---- */}
      <DirectionControls onSendDirection={handleSendDirection} />

      {/* ---- BOTTOM ROW ---- */}
      <div className="bottom-row">

        <section className="panel" style={{ marginBottom: 0 }}>
          <div className="panel-heading">
            <div className="panel-icon icon-teal">👤</div>
            <div>
              <h2>Registered Users</h2>
              <p className="panel-heading-sub">{userCount} / 64 slots used</p>
            </div>
          </div>
          <div className="users-list">
            {Object.keys(users).length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
                No users registered yet.
              </p>
            ) : (
              Object.keys(users)
                .sort((a, b) => Number(a) - Number(b))
                .map((key) => (
                  <div className="user-card" key={key}>
                    <div className="user-card-header">
                      <div className="user-avatar">
                        {users[key].gender === "Female" ? "👩" : "👨"}
                      </div>
                      <span className="user-id-badge">USER #{users[key].id}</span>
                    </div>
                    <div className="user-card-row"><strong>Name:</strong> {users[key].name}</div>
                    <div className="user-card-row"><strong>Gender:</strong> {users[key].gender}</div>
                  </div>
                ))
            )}
          </div>
        </section>

        <section className="panel" style={{ marginBottom: 0 }}>
          <div className="panel-heading">
            <div className="panel-icon icon-blue">📍</div>
            <div>
              <h2>Live Location</h2>
              <p className="panel-heading-sub">GPS tracking</p>
            </div>
          </div>
          <LiveMap location={location} />
        </section>

      </div>

      <RegisterModal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSubmit={handleRegisterUser}
        nextId={nextEnrollId}
      />
      <AlertPopup alert={alertBox} onClose={() => setAlertBox(null)} />
    </div>
  );
}
