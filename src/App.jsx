// // import React, { useEffect, useMemo, useRef, useState } from "react";
// // import { initializeApp } from "firebase/app";
// // import {
// //   getAuth,
// //   onAuthStateChanged,
// //   createUserWithEmailAndPassword,
// //   signInWithEmailAndPassword,
// //   signOut,
// //   setPersistence,
// //   browserSessionPersistence,
// // } from "firebase/auth";
// // import {
// //   getDatabase,
// //   ref,
// //   set,
// //   push,
// //   onValue,
// //   update,
// //   get,
// // } from "firebase/database";

// // /* =========================================================
// //    FIREBASE
// // ========================================================= */
// // const firebaseConfig = {
// //   apiKey: "AIzaSyB9ererNsNonAzH0zQo_GS79XPOyCoMxr4",
// //   authDomain: "waterdtection.firebaseapp.com",
// //   databaseURL: "https://waterdtection-default-rtdb.firebaseio.com",
// //   projectId: "waterdtection",
// //   storageBucket: "waterdtection.firebasestorage.app",
// //   messagingSenderId: "690886375729",
// //   appId: "1:690886375729:web:172c3a47dda6585e4e1810",
// //   measurementId: "G-TXF33Y6XY0",
// // };

// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);
// // const db = getDatabase(app);

// // /* =========================================================
// //    ROOT PATHS
// //    Primary new path + fallback legacy path
// // ========================================================= */
// // const ROOT = "Smart_Medicine";
// // const LEGACY_ROOT = "Smart_Medicen";

// // /* =========================================================
// //    TELEGRAM
// // ========================================================= */
// // const TELEGRAM_BOT_TOKEN = "8601802887:AAFqEXZ6YlHFzCp5jOJlBafLvV2OLMbWzUg";
// // const TELEGRAM_CHAT_IDS = [
// //   "6333513741",
// //   "987654321",
// //   "123456789",
// //   "555555555",
// // ];

// // /* =========================================================
// //    HELPERS
// // ========================================================= */
// // const nowTs = () => Date.now();

// // const formatDateTime = (ts) => (ts ? new Date(ts).toLocaleString() : "-");
// // const formatDate = (ts) => (ts ? new Date(ts).toLocaleDateString() : "-");

// // function timeStringToTodayTimestamp(timeStr) {
// //   const [h, m] = String(timeStr || "00:00").split(":").map(Number);
// //   const d = new Date();
// //   d.setHours(h || 0, m || 0, 0, 0);
// //   return d.getTime();
// // }

// // function getNextOccurrence(timeStr) {
// //   const ts = timeStringToTodayTimestamp(timeStr);
// //   return ts >= Date.now() ? ts : ts + 24 * 60 * 60 * 1000;
// // }

// // function minutesDiff(a, b) {
// //   return Math.floor((a - b) / 60000);
// // }

// // function sortTimes(times = []) {
// //   return [...times].sort(
// //     (a, b) => timeStringToTodayTimestamp(a) - timeStringToTodayTimestamp(b)
// //   );
// // }

// // function statusColor(status) {
// //   if (status === "accepted") return "#16a34a";
// //   if (status === "rejected") return "#dc2626";
// //   return "#f59e0b";
// // }

// // function logTypeColor(type) {
// //   if (type === "DISPENSED") return "#16a34a";
// //   if (type === "MISSED") return "#dc2626";
// //   if (type === "LOW_STOCK") return "#f59e0b";
// //   if (type === "EMPTY_SLOT") return "#ef4444";
// //   if (type === "REFILL") return "#2563eb";
// //   return "#7c3aed";
// // }

// // function playBeep(duration = 700, frequency = 880) {
// //   try {
// //     const AudioCtx = window.AudioContext || window.webkitAudioContext;
// //     const ctx = new AudioCtx();
// //     const oscillator = ctx.createOscillator();
// //     const gain = ctx.createGain();

// //     oscillator.type = "sine";
// //     oscillator.frequency.value = frequency;
// //     oscillator.connect(gain);
// //     gain.connect(ctx.destination);
// //     oscillator.start();

// //     gain.gain.setValueAtTime(0.15, ctx.currentTime);
// //     gain.gain.exponentialRampToValueAtTime(
// //       0.0001,
// //       ctx.currentTime + duration / 1000
// //     );

// //     setTimeout(() => {
// //       oscillator.stop();
// //       ctx.close();
// //     }, duration + 80);
// //   } catch (err) {
// //     console.log("Beep blocked:", err);
// //   }
// // }

// // async function sendTelegramMessage(text) {
// //   for (const chatId of TELEGRAM_CHAT_IDS) {
// //     try {
// //       await fetch(
// //         `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
// //         {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ chat_id: chatId, text }),
// //         }
// //       );
// //     } catch (err) {
// //       console.error("Telegram failed:", err);
// //     }
// //   }
// // }

// // async function logEvent(userUid, payload) {
// //   const logRef = push(ref(db, `${ROOT}/logs/${userUid}`));
// //   await set(logRef, { ...payload, timestamp: nowTs() });
// // }

// // const DEMO_CARETAKERS = [
// //   { name: "Dr. Sarah Johnson", email: "sarah.johnson@healthcare.com", phone: "9876543210" },
// //   { name: "Dr. Michael Chen", email: "michael.chen@healthcare.com", phone: "9876543211" },
// //   { name: "Nurse Emily Davis", email: "emily.davis@healthcare.com", phone: "9876543212" },
// //   { name: "Dr. Robert Martinez", email: "robert.martinez@healthcare.com", phone: "9876543213" },
// //   { name: "Nurse Priya Patel", email: "priya.patel@healthcare.com", phone: "9876543214" },
// // ];

// // const DEMO_USERS = [
// //   { name: "Alice Thompson", email: "alice.thompson@gmail.com", phone: "9123456701" },
// //   { name: "Bob Wilson", email: "bob.wilson@gmail.com", phone: "9123456702" },
// //   { name: "Carol Singh", email: "carol.singh@gmail.com", phone: "9123456703" },
// //   { name: "David Kumar", email: "david.kumar@gmail.com", phone: "9123456704" },
// //   { name: "Emma Brown", email: "emma.brown@gmail.com", phone: "9123456705" },
// // ];

// // async function seedDemoData() {
// //   for (const ct of DEMO_CARETAKERS) {
// //     const ctRef = push(ref(db, `${ROOT}/caretakers`));
// //     await set(ctRef, {
// //       role: "caretaker",
// //       name: ct.name,
// //       email: ct.email,
// //       phone: ct.phone,
// //       createdAt: nowTs(),
// //     });
// //   }

// //   for (const u of DEMO_USERS) {
// //     const uRef = push(ref(db, `${ROOT}/users`));
// //     await set(uRef, {
// //       role: "user",
// //       name: u.name,
// //       email: u.email,
// //       phone: u.phone,
// //       status: "pending",
// //       caretakerUid: "",
// //       createdAt: nowTs(),
// //     });
// //   }
// // }

// // async function createAlert(userUid, title, message) {
// //   const alertRef = push(ref(db, `${ROOT}/alerts/${userUid}`));
// //   await set(alertRef, {
// //     title,
// //     message,
// //     timestamp: nowTs(),
// //     seen: false,
// //   });
// // }

// // function getFirebaseError(err) {
// //   const code = err?.code || "";
// //   if (code.includes("auth/email-already-in-use")) return "This email is already registered.";
// //   if (code.includes("auth/invalid-email")) return "Invalid email address.";
// //   if (code.includes("auth/weak-password")) return "Password should be at least 6 characters.";
// //   if (code.includes("auth/invalid-credential")) return "Invalid email or password.";
// //   if (code.includes("auth/user-not-found")) return "User account not found.";
// //   if (code.includes("auth/wrong-password")) return "Wrong password.";
// //   if (code.includes("auth/network-request-failed")) return "Network error. Please check internet.";
// //   return err?.message || "Something went wrong.";
// // }

// // async function getProfileFromAnyRoot(uid) {
// //   const userSnap = await get(ref(db, `${ROOT}/users/${uid}`));
// //   if (userSnap.exists()) {
// //     return { root: ROOT, role: "user", data: userSnap.val() };
// //   }

// //   const caretakerSnap = await get(ref(db, `${ROOT}/caretakers/${uid}`));
// //   if (caretakerSnap.exists()) {
// //     return { root: ROOT, role: "caretaker", data: caretakerSnap.val() };
// //   }

// //   const legacyUserSnap = await get(ref(db, `${LEGACY_ROOT}/users/${uid}`));
// //   if (legacyUserSnap.exists()) {
// //     return { root: LEGACY_ROOT, role: "user", data: legacyUserSnap.val() };
// //   }

// //   const legacyCaretakerSnap = await get(ref(db, `${LEGACY_ROOT}/caretakers/${uid}`));
// //   if (legacyCaretakerSnap.exists()) {
// //     return { root: LEGACY_ROOT, role: "caretaker", data: legacyCaretakerSnap.val() };
// //   }

// //   return null;
// // }

// // /* =========================================================
// //    SMALL UI
// // ========================================================= */
// // function Input({ label, ...props }) {
// //   return (
// //     <div style={styles.field}>
// //       <label style={styles.label}>{label}</label>
// //       <input style={styles.input} {...props} />
// //     </div>
// //   );
// // }

// // function Select({ label, children, ...props }) {
// //   return (
// //     <div style={styles.field}>
// //       <label style={styles.label}>{label}</label>
// //       <select style={styles.select} {...props}>
// //         {children}
// //       </select>
// //     </div>
// //   );
// // }

// // function Badge({ text, color = "#2563eb" }) {
// //   return (
// //     <span
// //       style={{
// //         display: "inline-flex",
// //         alignItems: "center",
// //         gap: 8,
// //         padding: "7px 12px",
// //         borderRadius: 999,
// //         fontSize: 12,
// //         fontWeight: 800,
// //         color,
// //         background: `${color}18`,
// //         border: `1px solid ${color}35`,
// //       }}
// //     >
// //       <span
// //         style={{
// //           width: 8,
// //           height: 8,
// //           borderRadius: "50%",
// //           background: color,
// //         }}
// //       />
// //       {text}
// //     </span>
// //   );
// // }

// // function SectionCard({ title, subtitle, right, children }) {
// //   return (
// //     <div style={styles.card}>
// //       <div style={styles.cardHeader}>
// //         <div>
// //           <h3 style={styles.cardTitle}>{title}</h3>
// //           {subtitle ? <p style={styles.cardSubtitle}>{subtitle}</p> : null}
// //         </div>
// //         {right}
// //       </div>
// //       {children}
// //     </div>
// //   );
// // }

// // function StatBox({ label, value }) {
// //   return (
// //     <div style={styles.statBox}>
// //       <div style={styles.statLabel}>{label}</div>
// //       <div style={styles.statValue}>{value}</div>
// //     </div>
// //   );
// // }

// // /* =========================================================
// //    APP
// // ========================================================= */
// // export default function App() {
// //   const [authReady, setAuthReady] = useState(false);
// //   const [authUser, setAuthUser] = useState(null);
// //   const [profile, setProfile] = useState(null);
// //   const [mode, setMode] = useState("login");
// //   const [roleTab, setRoleTab] = useState("user");
// //   const [busy, setBusy] = useState(false);
// //   const [popup, setPopup] = useState(null);
// //   const [forceLoginScreen, setForceLoginScreen] = useState(false);

// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     phone: "",
// //   });

// //   useEffect(() => {
// //     const unsub = onAuthStateChanged(auth, async (user) => {
// //       try {
// //         if (forceLoginScreen) {
// //           setAuthUser(null);
// //           setProfile(null);
// //           setAuthReady(true);
// //           return;
// //         }

// //         if (!user) {
// //           setAuthUser(null);
// //           setProfile(null);
// //           setAuthReady(true);
// //           return;
// //         }

// //         const foundProfile = await getProfileFromAnyRoot(user.uid);

// //         if (foundProfile) {
// //           setAuthUser(user);
// //           setProfile({
// //             uid: user.uid,
// //             root: foundProfile.root,
// //             role: foundProfile.role,
// //             ...foundProfile.data,
// //           });
// //         } else {
// //           await signOut(auth);
// //           setAuthUser(null);
// //           setProfile(null);
// //         }
// //       } catch (err) {
// //         console.error(err);
// //         setAuthUser(null);
// //         setProfile(null);
// //       } finally {
// //         setAuthReady(true);
// //       }
// //     });

// //     return () => unsub();
// //   }, [forceLoginScreen]);

// //   const showPopup = (title, message, tone = "danger") => {
// //     setPopup({ title, message, tone });
// //     playBeep();
// //     setTimeout(() => setPopup(null), 4500);
// //   };

// //   const handleRegister = async () => {
// //     if (!form.name || !form.email || !form.password) {
// //       alert("Please fill name, email and password.");
// //       return;
// //     }

// //     setBusy(true);
// //     try {
// //       setForceLoginScreen(true);
// //       await setPersistence(auth, browserSessionPersistence);

// //       const cred = await createUserWithEmailAndPassword(
// //         auth,
// //         form.email.trim(),
// //         form.password
// //       );

// //       const uid = cred.user.uid;

// //       if (roleTab === "user") {
// //         await set(ref(db, `${ROOT}/users/${uid}`), {
// //           role: "user",
// //           name: form.name.trim(),
// //           email: form.email.trim(),
// //           phone: form.phone.trim(),
// //           status: "pending",
// //           caretakerUid: "",
// //           createdAt: nowTs(),
// //         });
// //       } else {
// //         await set(ref(db, `${ROOT}/caretakers/${uid}`), {
// //           role: "caretaker",
// //           name: form.name.trim(),
// //           email: form.email.trim(),
// //           phone: form.phone.trim(),
// //           createdAt: nowTs(),
// //         });
// //       }

// //       await signOut(auth);

// //       setForm({ name: "", email: "", password: "", phone: "" });
// //       setMode("login");
// //       setAuthUser(null);
// //       setProfile(null);

// //       showPopup("Registration Successful", "Account created. Please login now.", "success");

// //       setTimeout(() => {
// //         setForceLoginScreen(false);
// //       }, 300);
// //     } catch (err) {
// //       console.error(err);
// //       setForceLoginScreen(false);
// //       alert(getFirebaseError(err));
// //     } finally {
// //       setBusy(false);
// //     }
// //   };

// //   const handleLogin = async () => {
// //     if (!form.email || !form.password) {
// //       alert("Please enter email and password.");
// //       return;
// //     }

// //     setBusy(true);
// //     try {
// //       setForceLoginScreen(false);
// //       await setPersistence(auth, browserSessionPersistence);
// //       const res = await signInWithEmailAndPassword(
// //         auth,
// //         form.email.trim(),
// //         form.password
// //       );

// //       const foundProfile = await getProfileFromAnyRoot(res.user.uid);

// //       if (!foundProfile) {
// //         await signOut(auth);
// //         alert("Login succeeded, but no profile exists in Firebase for this account.");
// //         return;
// //       }

// //       setAuthUser(res.user);
// //       setProfile({
// //         uid: res.user.uid,
// //         root: foundProfile.root,
// //         role: foundProfile.role,
// //         ...foundProfile.data,
// //       });

// //       setForm({ name: "", email: "", password: "", phone: "" });
// //     } catch (err) {
// //       console.error(err);
// //       alert(getFirebaseError(err));
// //     } finally {
// //       setBusy(false);
// //     }
// //   };

// //   const handleLogout = async () => {
// //     await signOut(auth);
// //     setAuthUser(null);
// //     setProfile(null);
// //     setMode("login");
// //   };

// //   if (!authReady) {
// //     return (
// //       <div style={styles.loaderWrap}>
// //         <div style={styles.loaderCard}>
// //           <div style={styles.spinner} />
// //           <h2 style={{ margin: 0 }}>Loading Smart Medicine System</h2>
// //           <p style={styles.loaderText}>Checking login session...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const showAuthScreen = forceLoginScreen || !authUser || !profile;

// //   return (
// //     <div style={styles.app}>
// //       <div style={styles.bgA} />
// //       <div style={styles.bgB} />
// //       <div style={styles.bgC} />

// //       <div style={styles.container}>
// //         <header style={styles.header}>
// //           <div>
// //             <div style={styles.kicker}>Healthcare Platform</div>
// //             <h1 style={styles.mainTitle}>
// //               Smart Medicine Reminder and Tablet Dispensing Dashboard
// //             </h1>
// //           </div>

// //           {!showAuthScreen && (
// //             <button style={styles.logoutBtn} onClick={handleLogout}>
// //               Logout
// //             </button>
// //           )}
// //         </header>

// //         {showAuthScreen ? (
// //           <AuthScreen
// //             roleTab={roleTab}
// //             setRoleTab={setRoleTab}
// //             mode={mode}
// //             setMode={setMode}
// //             form={form}
// //             setForm={setForm}
// //             handleLogin={handleLogin}
// //             handleRegister={handleRegister}
// //             busy={busy}
// //           />
// //         ) : profile.role === "user" ? (
// //           <UserDashboard
// //             profile={profile}
// //             showPopup={showPopup}
// //             setProfile={setProfile}
// //           />
// //         ) : (
// //           <CaretakerDashboard
// //             profile={profile}
// //             showPopup={showPopup}
// //           />
// //         )}
// //       </div>

// //       {popup && (
// //         <div
// //           style={{
// //             ...styles.popup,
// //             borderLeft: `5px solid ${
// //               popup.tone === "success"
// //                 ? "#16a34a"
// //                 : popup.tone === "info"
// //                 ? "#2563eb"
// //                 : "#dc2626"
// //             }`,
// //           }}
// //         >
// //           <div style={styles.popupTitle}>{popup.title}</div>
// //           <div style={styles.popupMessage}>{popup.message}</div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // /* =========================================================
// //    AUTH SCREEN
// // ========================================================= */
// // function AuthScreen({
// //   roleTab,
// //   setRoleTab,
// //   mode,
// //   setMode,
// //   form,
// //   setForm,
// //   handleLogin,
// //   handleRegister,
// //   busy,
// // }) {
// //   return (
// //     <div style={styles.authLayout}>
// //       <div style={styles.authRight}>
// //         <div style={styles.authPanel}>
// //           <div style={styles.roleSwitch}>
// //             <button
// //               type="button"
// //               style={roleTab === "user" ? styles.roleSwitchActive : styles.roleSwitchBtn}
// //               onClick={() => setRoleTab("user")}
// //             >
// //               User
// //             </button>
// //             <button
// //               type="button"
// //               style={roleTab === "caretaker" ? styles.roleSwitchActive : styles.roleSwitchBtn}
// //               onClick={() => setRoleTab("caretaker")}
// //             >
// //               Caretaker
// //             </button>
// //           </div>

// //           <h2 style={styles.authTitle}>
// //             {mode === "login" ? "Sign in to continue" : "Create your account"}
// //           </h2>
// //           <p style={styles.authSubtitle}>
// //             {mode === "login" ? `Login as ${roleTab}` : `Register as ${roleTab}`}
// //           </p>

// //           <div style={styles.formGridSingle}>
// //             {mode === "register" && (
// //               <>
// //                 <Input
// //                   label="Full Name"
// //                   value={form.name}
// //                   onChange={(e) => setForm({ ...form, name: e.target.value })}
// //                   placeholder="Enter full name"
// //                 />
// //                 <Input
// //                   label="Phone Number"
// //                   value={form.phone}
// //                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
// //                   placeholder="Enter phone number"
// //                 />
// //               </>
// //             )}

// //             <Input
// //               label="Email"
// //               type="email"
// //               value={form.email}
// //               onChange={(e) => setForm({ ...form, email: e.target.value })}
// //               placeholder="Enter email"
// //             />

// //             <Input
// //               label="Password"
// //               type="password"
// //               value={form.password}
// //               onChange={(e) => setForm({ ...form, password: e.target.value })}
// //               placeholder="Enter password"
// //             />

// //             <button
// //               type="button"
// //               style={styles.primaryAction}
// //               onClick={mode === "login" ? handleLogin : handleRegister}
// //               disabled={busy}
// //             >
// //               {busy
// //                 ? "Please wait..."
// //                 : mode === "login"
// //                 ? `Login as ${roleTab}`
// //                 : `Register as ${roleTab}`}
// //             </button>

// //             <button
// //               type="button"
// //               style={styles.secondaryAction}
// //               onClick={() => setMode(mode === "login" ? "register" : "login")}
// //               disabled={busy}
// //             >
// //               {mode === "login" ? "Create new account" : "Back to login"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* =========================================================
// //    USER DASHBOARD
// // ========================================================= */
// // function UserDashboard({ profile, showPopup, setProfile }) {
// //   const activeRoot = profile.root || ROOT;
// //   const [medicines, setMedicines] = useState([]);
// //   const [logs, setLogs] = useState([]);
// //   const [alerts, setAlerts] = useState([]);
// //   const [caretakers, setCaretakers] = useState([]);
// //   const [selectedCaretaker, setSelectedCaretaker] = useState("");
// //   const [seedingData, setSeedingData] = useState(false);
// //   const reminderLockRef = useRef({});

// //   const [medicineForm, setMedicineForm] = useState({
// //     medicineName: "",
// //     slotNumber: 1,
// //     quantity: 10,
// //     dosageCount: 1,
// //     time1: "08:00",
// //     time2: "",
// //     time3: "",
// //     time4: "",
// //     period: "Morning",
// //     frequencyPerDay: 1,
// //   });

// //   useEffect(() => {
// //     const unsubMeds = onValue(ref(db, `${activeRoot}/medicines/${profile.uid}`), (snap) => {
// //       const data = snap.val() || {};
// //       const arr = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
// //       setMedicines(arr);
// //     });

// //     const unsubLogs = onValue(ref(db, `${activeRoot}/logs/${profile.uid}`), (snap) => {
// //       const data = snap.val() || {};
// //       const arr = Object.keys(data)
// //         .map((key) => ({ id: key, ...data[key] }))
// //         .sort((a, b) => b.timestamp - a.timestamp);
// //       setLogs(arr);
// //     });

// //     const unsubAlerts = onValue(ref(db, `${activeRoot}/alerts/${profile.uid}`), (snap) => {
// //       const data = snap.val() || {};
// //       const arr = Object.keys(data)
// //         .map((key) => ({ id: key, ...data[key] }))
// //         .sort((a, b) => b.timestamp - a.timestamp);
// //       setAlerts(arr);
// //     });

// //     const unsubCare = onValue(ref(db, `${activeRoot}/caretakers`), (snap) => {
// //       const data = snap.val() || {};
// //       const arr = Object.keys(data).map((key) => ({ uid: key, ...data[key] }));
// //       setCaretakers(arr);
// //     });

// //     const unsubProfile = onValue(ref(db, `${activeRoot}/users/${profile.uid}`), (snap) => {
// //       if (snap.exists()) {
// //         setProfile((prev) => ({ ...prev, ...snap.val(), root: activeRoot }));
// //       }
// //     });

// //     return () => {
// //       unsubMeds();
// //       unsubLogs();
// //       unsubAlerts();
// //       unsubCare();
// //       unsubProfile();
// //     };
// //   }, [profile.uid, setProfile, activeRoot]);

// //   useEffect(() => {
// //     if (profile.status !== "accepted") return;

// //     const interval = setInterval(async () => {
// //       const now = Date.now();

// //       for (const med of medicines) {
// //         if (!med.active) continue;

// //         for (const t of med.times || []) {
// //           const scheduleTs = timeStringToTodayTimestamp(t);
// //           const diffMin = minutesDiff(now, scheduleTs);
// //           const reminderKey = `${med.id}_${t}_${formatDate(scheduleTs)}`;

// //           if (diffMin >= 0 && diffMin <= 1 && !reminderLockRef.current[`${reminderKey}_due`]) {
// //             reminderLockRef.current[`${reminderKey}_due`] = true;

// //             const msg = `Medicine time now: ${med.medicineName} (Slot ${med.slotNumber}) at ${t}`;
// //             showPopup("Medicine Reminder", msg, "info");
// //             await createAlert(profile.uid, "Medicine Reminder", msg);
// //             await logEvent(profile.uid, {
// //               type: "REMINDER",
// //               medicineName: med.medicineName,
// //               slotNumber: med.slotNumber,
// //               message: msg,
// //             });

// //             await sendTelegramMessage(
// //               `SMART MEDICINE REMINDER
// // User: ${profile.name}
// // Medicine: ${med.medicineName}
// // Slot: ${med.slotNumber}
// // Time: ${t}`
// //             );
// //           }

// //           if (diffMin > 30 && !reminderLockRef.current[`${reminderKey}_missed`]) {
// //             const lastTakenSameWindow =
// //               med.lastTakenAt &&
// //               Math.abs(med.lastTakenAt - scheduleTs) < 30 * 60 * 1000;

// //             if (!lastTakenSameWindow) {
// //               reminderLockRef.current[`${reminderKey}_missed`] = true;

// //               const msg = `Missed medicine: ${med.medicineName} (Slot ${med.slotNumber}) scheduled at ${t}`;
// //               showPopup("Missed Dose Alert", msg, "danger");
// //               await createAlert(profile.uid, "Missed Dose Alert", msg);
// //               await logEvent(profile.uid, {
// //                 type: "MISSED",
// //                 medicineName: med.medicineName,
// //                 slotNumber: med.slotNumber,
// //                 message: msg,
// //               });

// //               await sendTelegramMessage(
// //                 `SMART MEDICINE ALERT
// // User: ${profile.name}
// // Missed dose: ${med.medicineName}
// // Slot: ${med.slotNumber}
// // Scheduled: ${t}`
// //               );
// //             }
// //           }
// //         }

// //         if (med.quantity <= 2 && med.quantity > 0 && !med.lowStockAlertSent) {
// //           await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${med.id}`), {
// //             lowStockAlertSent: true,
// //           });

// //           const msg = `Low stock: ${med.medicineName} in Slot ${med.slotNumber}. Remaining ${med.quantity}`;
// //           showPopup("Low Stock Alert", msg, "danger");
// //           await createAlert(profile.uid, "Low Stock Alert", msg);
// //           await logEvent(profile.uid, {
// //             type: "LOW_STOCK",
// //             medicineName: med.medicineName,
// //             slotNumber: med.slotNumber,
// //             message: msg,
// //           });

// //           await sendTelegramMessage(
// //             `SMART MEDICINE LOW STOCK
// // User: ${profile.name}
// // Medicine: ${med.medicineName}
// // Slot: ${med.slotNumber}
// // Remaining: ${med.quantity}`
// //           );
// //         }

// //         if (med.quantity <= 0 && !med.emptyAlertSent) {
// //           await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${med.id}`), {
// //             emptyAlertSent: true,
// //           });

// //           const msg = `Slot ${med.slotNumber} is empty for ${med.medicineName}`;
// //           showPopup("Empty Slot Alert", msg, "danger");
// //           await createAlert(profile.uid, "Empty Slot Alert", msg);
// //           await logEvent(profile.uid, {
// //             type: "EMPTY_SLOT",
// //             medicineName: med.medicineName,
// //             slotNumber: med.slotNumber,
// //             message: msg,
// //           });

// //           await sendTelegramMessage(
// //             `SMART MEDICINE EMPTY SLOT
// // User: ${profile.name}
// // Medicine: ${med.medicineName}
// // Slot: ${med.slotNumber} is empty`
// //           );
// //         }
// //       }
// //     }, 15000);

// //     return () => clearInterval(interval);
// //   }, [medicines, profile, showPopup, activeRoot]);

// //   const nextDose = useMemo(() => {
// //     const upcoming = [];
// //     medicines.forEach((med) => {
// //       if (!med.active) return;
// //       (med.times || []).forEach((timeStr) => {
// //         upcoming.push({
// //           medicineName: med.medicineName,
// //           slotNumber: med.slotNumber,
// //           nextTs: getNextOccurrence(timeStr),
// //         });
// //       });
// //     });
// //     upcoming.sort((a, b) => a.nextTs - b.nextTs);
// //     return upcoming[0] || null;
// //   }, [medicines]);

// //   const requestCaretaker = async () => {
// //     if (!selectedCaretaker) {
// //       alert("Please select caretaker.");
// //       return;
// //     }

// //     const caretaker = caretakers.find((c) => c.uid === selectedCaretaker);
// //     if (!caretaker) {
// //       alert("Selected caretaker not found.");
// //       return;
// //     }

// //     try {
// //       const reqRef = push(ref(db, `${activeRoot}/requests`));

// //       await set(reqRef, {
// //         userUid: profile.uid,
// //         caretakerUid: caretaker.uid,
// //         userName: profile.name,
// //         caretakerName: caretaker.name,
// //         status: "pending",
// //         createdAt: nowTs(),
// //       });

// //       await update(ref(db, `${activeRoot}/users/${profile.uid}`), {
// //         caretakerUid: caretaker.uid,
// //         status: "pending",
// //       });

// //       setProfile((prev) => ({
// //         ...prev,
// //         caretakerUid: caretaker.uid,
// //         status: "pending",
// //         root: activeRoot,
// //       }));

// //       showPopup("Request Sent", `Request sent to ${caretaker.name}`, "success");

// //       await sendTelegramMessage(
// //         `SMART MEDICINE REQUEST
// // User: ${profile.name}
// // Requested caretaker: ${caretaker.name}
// // Status: pending`
// //       );
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to send caretaker request.");
// //     }
// //   };

// //   const addMedicine = async () => {
// //     if (profile.status !== "accepted") {
// //       alert("Your account is not accepted by caretaker yet.");
// //       return;
// //     }

// //     if (!medicineForm.medicineName.trim()) {
// //       alert("Please enter medicine name.");
// //       return;
// //     }

// //     const times = [
// //       medicineForm.time1,
// //       medicineForm.time2,
// //       medicineForm.time3,
// //       medicineForm.time4,
// //     ]
// //       .filter(Boolean)
// //       .slice(0, Number(medicineForm.frequencyPerDay));

// //     if (!times.length) {
// //       alert("Please add at least one time.");
// //       return;
// //     }

// //     const medRef = push(ref(db, `${activeRoot}/medicines/${profile.uid}`));

// //     await set(medRef, {
// //       medicineName: medicineForm.medicineName.trim(),
// //       slotNumber: Number(medicineForm.slotNumber),
// //       quantity: Number(medicineForm.quantity),
// //       dosageCount: Number(medicineForm.dosageCount),
// //       frequencyPerDay: Number(medicineForm.frequencyPerDay),
// //       period: medicineForm.period,
// //       times: sortTimes(times),
// //       active: true,
// //       lastTakenAt: 0,
// //       lowStockAlertSent: false,
// //       emptyAlertSent: false,
// //       createdAt: nowTs(),
// //       updatedAt: nowTs(),
// //     });

// //     await logEvent(profile.uid, {
// //       type: "MEDICINE_ADDED",
// //       medicineName: medicineForm.medicineName.trim(),
// //       slotNumber: Number(medicineForm.slotNumber),
// //       message: "Medicine added successfully",
// //     });

// //     showPopup("Medicine Added", "Medicine plan saved successfully.", "success");

// //     await sendTelegramMessage(
// //       `SMART MEDICINE PLAN ADDED
// // User: ${profile.name}
// // Medicine: ${medicineForm.medicineName.trim()}
// // Slot: ${medicineForm.slotNumber}
// // Times: ${times.join(", ")}`
// //     );

// //     setMedicineForm({
// //       medicineName: "",
// //       slotNumber: 1,
// //       quantity: 10,
// //       dosageCount: 1,
// //       time1: "08:00",
// //       time2: "",
// //       time3: "",
// //       time4: "",
// //       period: "Morning",
// //       frequencyPerDay: 1,
// //     });
// //   };

// //   const markTaken = async (med) => {
// //     if (med.quantity <= 0) {
// //       alert("No tablets available in this slot.");
// //       return;
// //     }

// //     const newQty = Math.max(0, Number(med.quantity) - Number(med.dosageCount));

// //     await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${med.id}`), {
// //       quantity: newQty,
// //       lastTakenAt: nowTs(),
// //       updatedAt: nowTs(),
// //     });

// //     await createAlert(
// //       profile.uid,
// //       "Medicine Dispensed",
// //       `${med.medicineName} dispensed from Slot ${med.slotNumber}`
// //     );

// //     await logEvent(profile.uid, {
// //       type: "DISPENSED",
// //       medicineName: med.medicineName,
// //       slotNumber: med.slotNumber,
// //       message: "Medicine dispensed successfully",
// //     });

// //     showPopup("Medicine Dispensed", `${med.medicineName} dispensed successfully.`, "success");
// //   };

// //   const refillMedicine = async (med, qty = 10) => {
// //     await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${med.id}`), {
// //       quantity: Number(med.quantity) + Number(qty),
// //       lowStockAlertSent: false,
// //       emptyAlertSent: false,
// //       updatedAt: nowTs(),
// //     });

// //     await logEvent(profile.uid, {
// //       type: "REFILL",
// //       medicineName: med.medicineName,
// //       slotNumber: med.slotNumber,
// //       message: `Refilled ${qty} tablets`,
// //     });

// //     showPopup("Refill Updated", `${med.medicineName} refilled.`, "success");

// //     await sendTelegramMessage(
// //       `SMART MEDICINE REFILL
// // User: ${profile.name}
// // Medicine: ${med.medicineName}
// // Slot: ${med.slotNumber}
// // Added tablets: ${qty}`
// //     );
// //   };

// //   return (
// //     <div style={styles.dashboardGrid}>
// //       <div style={styles.mainColumn}>
// //         <SectionCard
// //           title={`Welcome, ${profile.name}`}
// //           subtitle="User dashboard overview"
// //           right={<Badge text={profile.status.toUpperCase()} color={statusColor(profile.status)} />}
// //         >
// //           <div style={styles.statsGrid}>
// //             <StatBox label="Email" value={profile.email} />
// //             <StatBox label="Role" value={profile.role} />
// //             <StatBox label="Created" value={formatDateTime(profile.createdAt)} />
// //             <StatBox
// //               label="Next Dose"
// //               value={
// //                 nextDose
// //                   ? `${nextDose.medicineName} | Slot ${nextDose.slotNumber} | ${new Date(
// //                       nextDose.nextTs
// //                     ).toLocaleString()}`
// //                   : "No schedule"
// //               }
// //             />
// //           </div>
// //         </SectionCard>

// //         <SectionCard title="Caretaker Approval" subtitle="Choose caretaker and send request">
// //           <div style={styles.grid2}>
// //             <Select
// //               label="Select Caretaker"
// //               value={selectedCaretaker}
// //               onChange={(e) => setSelectedCaretaker(e.target.value)}
// //             >
// //               <option value="">Choose caretaker</option>
// //               {caretakers.map((c) => (
// //                 <option key={c.uid} value={c.uid}>
// //                   {c.name} ({c.email})
// //                 </option>
// //               ))}
// //             </Select>
// //           </div>
// //           <div style={styles.spaceTop}>
// //             <button style={styles.primaryBtn} onClick={requestCaretaker}>
// //               Send Request
// //             </button>
// //           </div>
// //           <div style={{ marginTop: 12 }}>
// //             <button
// //               style={styles.secondaryBtn}
// //               disabled={seedingData}
// //               onClick={async () => {
// //                 setSeedingData(true);
// //                 try {
// //                   await seedDemoData();
// //                   showPopup("Demo Data Added", "5 caretakers and 5 users added successfully.", "success");
// //                 } catch (err) {
// //                   console.error(err);
// //                   alert("Failed to seed demo data.");
// //                 } finally {
// //                   setSeedingData(false);
// //                 }
// //               }}
// //             >
// //               {seedingData ? "Adding..." : "Add 5 Demo Caretakers & Users"}
// //             </button>
// //           </div>
// //         </SectionCard>

// //         <SectionCard title="Medicine Setup" subtitle="Configure slot, dosage, and time schedule">
// //           <div style={styles.grid3}>
// //             <Input
// //               label="Medicine Name"
// //               value={medicineForm.medicineName}
// //               onChange={(e) => setMedicineForm({ ...medicineForm, medicineName: e.target.value })}
// //               placeholder="Paracetamol"
// //             />
// //             <Input
// //               label="Slot Number"
// //               type="number"
// //               value={medicineForm.slotNumber}
// //               onChange={(e) => setMedicineForm({ ...medicineForm, slotNumber: e.target.value })}
// //             />
// //             <Input
// //               label="Quantity"
// //               type="number"
// //               value={medicineForm.quantity}
// //               onChange={(e) => setMedicineForm({ ...medicineForm, quantity: e.target.value })}
// //             />
// //             <Input
// //               label="Dosage Count"
// //               type="number"
// //               value={medicineForm.dosageCount}
// //               onChange={(e) => setMedicineForm({ ...medicineForm, dosageCount: e.target.value })}
// //             />
// //             <Select
// //               label="Frequency Per Day"
// //               value={medicineForm.frequencyPerDay}
// //               onChange={(e) => setMedicineForm({ ...medicineForm, frequencyPerDay: e.target.value })}
// //             >
// //               <option value={1}>1 time</option>
// //               <option value={2}>2 times</option>
// //               <option value={3}>3 times</option>
// //               <option value={4}>4 times</option>
// //             </Select>
// //             <Select
// //               label="Schedule Type"
// //               value={medicineForm.period}
// //               onChange={(e) => setMedicineForm({ ...medicineForm, period: e.target.value })}
// //             >
// //               <option>Morning</option>
// //               <option>Afternoon</option>
// //               <option>Evening</option>
// //               <option>Night</option>
// //               <option>Custom</option>
// //             </Select>
// //             <Input
// //               label="Time 1"
// //               type="time"
// //               value={medicineForm.time1}
// //               onChange={(e) => setMedicineForm({ ...medicineForm, time1: e.target.value })}
// //             />
// //             <Input
// //               label="Time 2"
// //               type="time"
// //               value={medicineForm.time2}
// //               onChange={(e) => setMedicineForm({ ...medicineForm, time2: e.target.value })}
// //             />
// //             <Input
// //               label="Time 3"
// //               type="time"
// //               value={medicineForm.time3}
// //               onChange={(e) => setMedicineForm({ ...medicineForm, time3: e.target.value })}
// //             />
// //             <Input
// //               label="Time 4"
// //               type="time"
// //               value={medicineForm.time4}
// //               onChange={(e) => setMedicineForm({ ...medicineForm, time4: e.target.value })}
// //             />
// //           </div>

// //           <div style={styles.spaceTop}>
// //             <button style={styles.primaryBtn} onClick={addMedicine}>
// //               Save Medicine Plan
// //             </button>
// //           </div>
// //         </SectionCard>

// //         <SectionCard title="Medicine Slots" subtitle="Dispense and refill medicines">
// //           <div style={styles.tableWrap}>
// //             <table style={styles.table}>
// //               <thead>
// //                 <tr>
// //                   <th style={styles.th}>Medicine</th>
// //                   <th style={styles.th}>Slot</th>
// //                   <th style={styles.th}>Qty</th>
// //                   <th style={styles.th}>Dosage</th>
// //                   <th style={styles.th}>Times</th>
// //                   <th style={styles.th}>Status</th>
// //                   <th style={styles.th}>Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {medicines.length === 0 ? (
// //                   <tr>
// //                     <td colSpan="7" style={styles.noData}>No medicines added yet</td>
// //                   </tr>
// //                 ) : (
// //                   medicines.map((med) => (
// //                     <tr key={med.id}>
// //                       <td style={styles.td}>{med.medicineName}</td>
// //                       <td style={styles.td}>{med.slotNumber}</td>
// //                       <td style={styles.td}>{med.quantity}</td>
// //                       <td style={styles.td}>{med.dosageCount}</td>
// //                       <td style={styles.td}>{(med.times || []).join(", ")}</td>
// //                       <td style={styles.td}>
// //                         {med.quantity <= 0 ? (
// //                           <Badge text="EMPTY" color="#dc2626" />
// //                         ) : med.quantity <= 2 ? (
// //                           <Badge text="LOW" color="#f59e0b" />
// //                         ) : (
// //                           <Badge text="AVAILABLE" color="#16a34a" />
// //                         )}
// //                       </td>
// //                       <td style={styles.td}>
// //                         <div style={styles.inlineActions}>
// //                           <button style={styles.successBtn} onClick={() => markTaken(med)}>
// //                             Take
// //                           </button>
// //                           <button style={styles.secondaryBtn} onClick={() => refillMedicine(med, 10)}>
// //                             Refill +10
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </SectionCard>
// //       </div>

// //       <div style={styles.sideColumn}>
// //         <SectionCard title="Alerts" subtitle="Recent notifications">
// //           <div style={styles.feedList}>
// //             {alerts.length === 0 ? (
// //               <div style={styles.emptyBox}>No alerts available</div>
// //             ) : (
// //               alerts.slice(0, 10).map((a) => (
// //                 <div key={a.id} style={styles.feedCard}>
// //                   <div style={styles.feedTitle}>{a.title}</div>
// //                   <div style={styles.feedText}>{a.message}</div>
// //                   <div style={styles.feedTime}>{formatDateTime(a.timestamp)}</div>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </SectionCard>

// //         <SectionCard title="History / Logs" subtitle="Dispensing and event history">
// //           <div style={styles.feedList}>
// //             {logs.length === 0 ? (
// //               <div style={styles.emptyBox}>No history found</div>
// //             ) : (
// //               logs.slice(0, 20).map((log) => (
// //                 <div key={log.id} style={styles.feedCard}>
// //                   <div style={styles.rowBetween}>
// //                     <Badge text={log.type} color={logTypeColor(log.type)} />
// //                     <span style={styles.feedTime}>{formatDateTime(log.timestamp)}</span>
// //                   </div>
// //                   <div style={{ height: 8 }} />
// //                   <div style={styles.feedTitle}>{log.medicineName || "System"}</div>
// //                   <div style={styles.feedText}>{log.message}</div>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </SectionCard>
// //       </div>
// //     </div>
// //   );
// // }

// // /* =========================================================
// //    CARETAKER DASHBOARD
// // ========================================================= */
// // function CaretakerDashboard({ profile, showPopup }) {
// //   const activeRoot = profile.root || ROOT;
// //   const [requests, setRequests] = useState([]);
// //   const [acceptedUsers, setAcceptedUsers] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState("");
// //   const [userMedicines, setUserMedicines] = useState([]);

// //   const [editForm, setEditForm] = useState({
// //     medicineName: "",
// //     slotNumber: 1,
// //     quantity: 10,
// //     dosageCount: 1,
// //     time1: "08:00",
// //     time2: "",
// //     frequencyPerDay: 1,
// //     period: "Morning",
// //   });

// //   useEffect(() => {
// //     const unsubReq = onValue(ref(db, `${activeRoot}/requests`), (snap) => {
// //       const data = snap.val() || {};
// //       const arr = Object.keys(data)
// //         .map((key) => ({ id: key, ...data[key] }))
// //         .filter((r) => r.caretakerUid === profile.uid);
// //       setRequests(arr);
// //     });

// //     const unsubUsers = onValue(ref(db, `${activeRoot}/users`), (snap) => {
// //       const data = snap.val() || {};
// //       const arr = Object.keys(data)
// //         .map((key) => ({ uid: key, ...data[key] }))
// //         .filter((u) => u.caretakerUid === profile.uid && u.status === "accepted");
// //       setAcceptedUsers(arr);
// //     });

// //     return () => {
// //       unsubReq();
// //       unsubUsers();
// //     };
// //   }, [profile.uid, activeRoot]);

// //   useEffect(() => {
// //     if (!selectedUser) {
// //       setUserMedicines([]);
// //       return;
// //     }

// //     const unsubMeds = onValue(ref(db, `${activeRoot}/medicines/${selectedUser}`), (snap) => {
// //       const data = snap.val() || {};
// //       const arr = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
// //       setUserMedicines(arr);
// //     });

// //     return () => unsubMeds();
// //   }, [selectedUser, activeRoot]);

// //   const updateRequestStatus = async (req, status) => {
// //     await update(ref(db, `${activeRoot}/requests/${req.id}`), {
// //       status,
// //       updatedAt: nowTs(),
// //     });

// //     await update(ref(db, `${activeRoot}/users/${req.userUid}`), {
// //       status,
// //       caretakerUid: profile.uid,
// //     });

// //     await createAlert(
// //       req.userUid,
// //       "Account Approval Update",
// //       `Your request was marked as ${status} by caretaker ${profile.name}`
// //     );

// //     await logEvent(req.userUid, {
// //       type: "ACCOUNT_STATUS",
// //       medicineName: "",
// //       slotNumber: "",
// //       message: `Caretaker changed account status to ${status}`,
// //     });

// //     showPopup("Request Updated", `${req.userName} marked as ${status}`, "success");

// //     await sendTelegramMessage(
// //       `SMART MEDICINE CARETAKER UPDATE
// // User: ${req.userName}
// // Caretaker: ${profile.name}
// // Status: ${status}`
// //     );
// //   };

// //   const addMedicineToUser = async () => {
// //     if (!selectedUser) {
// //       alert("Please select accepted user.");
// //       return;
// //     }

// //     if (!editForm.medicineName.trim()) {
// //       alert("Please enter medicine name.");
// //       return;
// //     }

// //     const times = [editForm.time1, editForm.time2]
// //       .filter(Boolean)
// //       .slice(0, Number(editForm.frequencyPerDay));

// //     const medRef = push(ref(db, `${activeRoot}/medicines/${selectedUser}`));

// //     await set(medRef, {
// //       medicineName: editForm.medicineName.trim(),
// //       slotNumber: Number(editForm.slotNumber),
// //       quantity: Number(editForm.quantity),
// //       dosageCount: Number(editForm.dosageCount),
// //       frequencyPerDay: Number(editForm.frequencyPerDay),
// //       period: editForm.period,
// //       times: sortTimes(times),
// //       active: true,
// //       lastTakenAt: 0,
// //       lowStockAlertSent: false,
// //       emptyAlertSent: false,
// //       createdAt: nowTs(),
// //       updatedAt: nowTs(),
// //       addedByCaretaker: true,
// //       caretakerUid: profile.uid,
// //     });

// //     await createAlert(
// //       selectedUser,
// //       "Medicine Plan Updated",
// //       `Caretaker ${profile.name} updated your medicine schedule`
// //     );

// //     await logEvent(selectedUser, {
// //       type: "PLAN_UPDATED_BY_CARETAKER",
// //       medicineName: editForm.medicineName.trim(),
// //       slotNumber: Number(editForm.slotNumber),
// //       message: "Medicine plan added by caretaker",
// //     });

// //     showPopup("Plan Saved", "Medicine plan added remotely.", "success");

// //     await sendTelegramMessage(
// //       `SMART MEDICINE PLAN UPDATED
// // Caretaker: ${profile.name}
// // Medicine: ${editForm.medicineName.trim()}
// // Times: ${times.join(", ")}`
// //     );
// //   };

// //   const refillUserMedicine = async (med) => {
// //     await update(ref(db, `${activeRoot}/medicines/${selectedUser}/${med.id}`), {
// //       quantity: Number(med.quantity) + 10,
// //       lowStockAlertSent: false,
// //       emptyAlertSent: false,
// //       updatedAt: nowTs(),
// //     });

// //     await createAlert(
// //       selectedUser,
// //       "Refill Updated",
// //       `${med.medicineName} refilled by caretaker`
// //     );

// //     await logEvent(selectedUser, {
// //       type: "REFILL_BY_CARETAKER",
// //       medicineName: med.medicineName,
// //       slotNumber: med.slotNumber,
// //       message: "Caretaker refilled +10 tablets",
// //     });

// //     showPopup("Refill Done", `${med.medicineName} refilled.`, "success");

// //     await sendTelegramMessage(
// //       `SMART MEDICINE REFILL BY CARETAKER
// // Caretaker: ${profile.name}
// // Medicine: ${med.medicineName}
// // Slot: ${med.slotNumber}
// // Added tablets: 10`
// //     );
// //   };

// //   return (
// //     <div style={styles.dashboardGrid}>
// //       <div style={styles.mainColumn}>
// //         <SectionCard
// //           title={`Caretaker Dashboard - ${profile.name}`}
// //           subtitle="Monitor and manage linked users"
// //         >
// //           <div style={styles.statsGrid}>
// //             <StatBox label="Email" value={profile.email} />
// //             <StatBox label="Role" value={profile.role} />
// //             <StatBox label="Accepted Users" value={acceptedUsers.length} />
// //             <StatBox
// //               label="Pending Requests"
// //               value={requests.filter((r) => r.status === "pending").length}
// //             />
// //           </div>
// //         </SectionCard>

// //         <SectionCard title="User Approval Requests" subtitle="Accept, reject or keep pending">
// //           <div style={styles.feedList}>
// //             {requests.length === 0 ? (
// //               <div style={styles.emptyBox}>No requests found</div>
// //             ) : (
// //               requests.map((req) => (
// //                 <div key={req.id} style={styles.requestCard}>
// //                   <div>
// //                     <div style={styles.feedTitle}>{req.userName}</div>
// //                     <div style={styles.feedText}>User ID: {req.userUid}</div>
// //                     <div style={styles.feedText}>Status: {req.status}</div>
// //                   </div>

// //                   <div style={styles.inlineActions}>
// //                     <button style={styles.successBtn} onClick={() => updateRequestStatus(req, "accepted")}>
// //                       Accept
// //                     </button>
// //                     <button style={styles.dangerBtn} onClick={() => updateRequestStatus(req, "rejected")}>
// //                       Reject
// //                     </button>
// //                     <button style={styles.secondaryBtn} onClick={() => updateRequestStatus(req, "pending")}>
// //                       Pending
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </SectionCard>

// //         <SectionCard title="Remote Medicine Plan" subtitle="Add or modify medicine plan for selected user">
// //           <div style={styles.grid3}>
// //             <Select
// //               label="Select Accepted User"
// //               value={selectedUser}
// //               onChange={(e) => setSelectedUser(e.target.value)}
// //             >
// //               <option value="">Choose user</option>
// //               {acceptedUsers.map((u) => (
// //                 <option key={u.uid} value={u.uid}>
// //                   {u.name} ({u.email})
// //                 </option>
// //               ))}
// //             </Select>

// //             <Input
// //               label="Medicine Name"
// //               value={editForm.medicineName}
// //               onChange={(e) => setEditForm({ ...editForm, medicineName: e.target.value })}
// //             />
// //             <Input
// //               label="Slot Number"
// //               type="number"
// //               value={editForm.slotNumber}
// //               onChange={(e) => setEditForm({ ...editForm, slotNumber: e.target.value })}
// //             />
// //             <Input
// //               label="Quantity"
// //               type="number"
// //               value={editForm.quantity}
// //               onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
// //             />
// //             <Input
// //               label="Dosage Count"
// //               type="number"
// //               value={editForm.dosageCount}
// //               onChange={(e) => setEditForm({ ...editForm, dosageCount: e.target.value })}
// //             />
// //             <Select
// //               label="Frequency Per Day"
// //               value={editForm.frequencyPerDay}
// //               onChange={(e) => setEditForm({ ...editForm, frequencyPerDay: e.target.value })}
// //             >
// //               <option value={1}>1</option>
// //               <option value={2}>2</option>
// //             </Select>
// //             <Select
// //               label="Schedule Type"
// //               value={editForm.period}
// //               onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
// //             >
// //               <option>Morning</option>
// //               <option>Afternoon</option>
// //               <option>Evening</option>
// //               <option>Night</option>
// //               <option>Custom</option>
// //             </Select>
// //             <Input
// //               label="Time 1"
// //               type="time"
// //               value={editForm.time1}
// //               onChange={(e) => setEditForm({ ...editForm, time1: e.target.value })}
// //             />
// //             <Input
// //               label="Time 2"
// //               type="time"
// //               value={editForm.time2}
// //               onChange={(e) => setEditForm({ ...editForm, time2: e.target.value })}
// //             />
// //           </div>

// //           <div style={styles.spaceTop}>
// //             <button style={styles.primaryBtn} onClick={addMedicineToUser}>
// //               Save Remote Plan
// //             </button>
// //           </div>
// //         </SectionCard>
// //       </div>

// //       <div style={styles.sideColumn}>
// //         <SectionCard title="Selected User Medicines" subtitle="Live medicine details">
// //           {!selectedUser ? (
// //             <div style={styles.emptyBox}>Select an accepted user to view medicines</div>
// //           ) : (
// //             <div style={styles.tableWrap}>
// //               <table style={styles.table}>
// //                 <thead>
// //                   <tr>
// //                     <th style={styles.th}>Medicine</th>
// //                     <th style={styles.th}>Slot</th>
// //                     <th style={styles.th}>Qty</th>
// //                     <th style={styles.th}>Times</th>
// //                     <th style={styles.th}>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {userMedicines.length === 0 ? (
// //                     <tr>
// //                       <td colSpan="5" style={styles.noData}>No medicines found</td>
// //                     </tr>
// //                   ) : (
// //                     userMedicines.map((med) => (
// //                       <tr key={med.id}>
// //                         <td style={styles.td}>{med.medicineName}</td>
// //                         <td style={styles.td}>{med.slotNumber}</td>
// //                         <td style={styles.td}>{med.quantity}</td>
// //                         <td style={styles.td}>{(med.times || []).join(", ")}</td>
// //                         <td style={styles.td}>
// //                           <button style={styles.secondaryBtn} onClick={() => refillUserMedicine(med)}>
// //                             Refill +10
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </SectionCard>
// //       </div>
// //     </div>
// //   );
// // }

// // /* =========================================================
// //    STYLES
// // ========================================================= */
// // const styles = {
// //   app: {
// //     minHeight: "100vh",
// //     background: "linear-gradient(135deg, #050816 0%, #0c1426 40%, #08101d 100%)",
// //     color: "#e6eefc",
// //     fontFamily:
// //       'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
// //     position: "relative",
// //     overflow: "hidden",
// //   },
// //   bgA: {
// //     position: "absolute",
// //     top: -120,
// //     left: -100,
// //     width: 320,
// //     height: 320,
// //     borderRadius: "50%",
// //     background: "rgba(59,130,246,0.15)",
// //     filter: "blur(90px)",
// //   },
// //   bgB: {
// //     position: "absolute",
// //     right: -120,
// //     bottom: -120,
// //     width: 360,
// //     height: 360,
// //     borderRadius: "50%",
// //     background: "rgba(6,182,212,0.12)",
// //     filter: "blur(110px)",
// //   },
// //   bgC: {
// //     position: "absolute",
// //     top: "35%",
// //     left: "45%",
// //     width: 240,
// //     height: 240,
// //     borderRadius: "50%",
// //     background: "rgba(34,197,94,0.08)",
// //     filter: "blur(100px)",
// //   },
// //   container: {
// //     position: "relative",
// //     zIndex: 2,
// //     maxWidth: 1460,
// //     margin: "0 auto",
// //     padding: "28px 20px 40px",
// //   },
// //   header: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     gap: 24,
// //     alignItems: "flex-start",
// //     flexWrap: "wrap",
// //     marginBottom: 26,
// //   },
// //   kicker: {
// //     display: "inline-flex",
// //     padding: "8px 14px",
// //     borderRadius: 999,
// //     background: "rgba(255,255,255,0.06)",
// //     border: "1px solid rgba(255,255,255,0.08)",
// //     color: "#8ac5ff",
// //     fontSize: 12,
// //     fontWeight: 800,
// //     textTransform: "uppercase",
// //     letterSpacing: 0.8,
// //     marginBottom: 14,
// //   },
// //   mainTitle: {
// //     margin: 0,
// //     fontSize: "clamp(28px, 4vw, 48px)",
// //     lineHeight: 1.08,
// //     fontWeight: 900,
// //     maxWidth: 980,
// //   },
// //   logoutBtn: {
// //     border: "none",
// //     background: "linear-gradient(135deg, #ef4444, #b91c1c)",
// //     color: "#fff",
// //     padding: "12px 20px",
// //     borderRadius: 14,
// //     fontWeight: 800,
// //     cursor: "pointer",
// //     boxShadow: "0 14px 28px rgba(239,68,68,0.2)",
// //   },
// //   authLayout: {
// //     display: "grid",
// //     gridTemplateColumns: "1fr",
// //     gap: 24,
// //     minHeight: "70vh",
// //     maxWidth: 520,
// //     margin: "0 auto",
// //   },
// //   authRight: {
// //     display: "flex",
// //     alignItems: "center",
// //   },
// //   authPanel: {
// //     width: "100%",
// //     borderRadius: 30,
// //     padding: 30,
// //     background: "rgba(10,16,28,0.96)",
// //     border: "1px solid rgba(255,255,255,0.08)",
// //     boxShadow: "0 24px 70px rgba(0,0,0,0.30)",
// //   },
// //   roleSwitch: {
// //     display: "inline-flex",
// //     padding: 6,
// //     gap: 6,
// //     borderRadius: 16,
// //     background: "rgba(255,255,255,0.04)",
// //     border: "1px solid rgba(255,255,255,0.06)",
// //     marginBottom: 18,
// //   },
// //   roleSwitchBtn: {
// //     border: "none",
// //     background: "transparent",
// //     color: "#b7c8e1",
// //     padding: "11px 18px",
// //     borderRadius: 12,
// //     fontWeight: 700,
// //     cursor: "pointer",
// //   },
// //   roleSwitchActive: {
// //     border: "none",
// //     background: "linear-gradient(135deg, #2563eb, #06b6d4)",
// //     color: "#fff",
// //     padding: "11px 18px",
// //     borderRadius: 12,
// //     fontWeight: 800,
// //     cursor: "pointer",
// //     boxShadow: "0 14px 30px rgba(37,99,235,0.24)",
// //   },
// //   authTitle: {
// //     margin: "0 0 8px",
// //     fontSize: 30,
// //     fontWeight: 900,
// //     color: "#fff",
// //   },
// //   authSubtitle: {
// //     margin: "0 0 20px",
// //     color: "#9fb2cf",
// //   },
// //   formGridSingle: {
// //     display: "grid",
// //     gap: 16,
// //   },
// //   field: {
// //     display: "grid",
// //     gap: 8,
// //   },
// //   label: {
// //     fontSize: 13,
// //     fontWeight: 700,
// //     color: "#bfd3ef",
// //   },
// //   input: {
// //     height: 50,
// //     borderRadius: 14,
// //     border: "1px solid rgba(255,255,255,0.10)",
// //     background: "rgba(255,255,255,0.04)",
// //     color: "#fff",
// //     padding: "0 14px",
// //     outline: "none",
// //   },
// //   select: {
// //     height: 50,
// //     borderRadius: 14,
// //     border: "1px solid rgba(255,255,255,0.10)",
// //     background: "#101828",
// //     color: "#fff",
// //     padding: "0 14px",
// //     outline: "none",
// //   },
// //   primaryAction: {
// //     marginTop: 6,
// //     height: 50,
// //     borderRadius: 14,
// //     border: "none",
// //     background: "linear-gradient(135deg, #2563eb, #0891b2)",
// //     color: "#fff",
// //     fontWeight: 800,
// //     cursor: "pointer",
// //     boxShadow: "0 18px 35px rgba(37,99,235,0.22)",
// //   },
// //   secondaryAction: {
// //     height: 48,
// //     borderRadius: 14,
// //     border: "1px solid rgba(255,255,255,0.10)",
// //     background: "rgba(255,255,255,0.03)",
// //     color: "#d8e5f8",
// //     fontWeight: 700,
// //     cursor: "pointer",
// //   },
// //   dashboardGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "2fr 1fr",
// //     gap: 24,
// //   },
// //   mainColumn: { minWidth: 0 },
// //   sideColumn: { minWidth: 0 },
// //   card: {
// //     background: "rgba(10,16,28,0.94)",
// //     border: "1px solid rgba(255,255,255,0.08)",
// //     borderRadius: 24,
// //     padding: 22,
// //     boxShadow: "0 22px 60px rgba(0,0,0,0.22)",
// //     marginBottom: 20,
// //   },
// //   cardHeader: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     gap: 14,
// //     alignItems: "flex-start",
// //     flexWrap: "wrap",
// //     marginBottom: 16,
// //   },
// //   cardTitle: {
// //     margin: 0,
// //     color: "#fff",
// //     fontSize: 22,
// //     fontWeight: 900,
// //   },
// //   cardSubtitle: {
// //     margin: "6px 0 0",
// //     color: "#97aac8",
// //     fontSize: 13,
// //   },
// //   statsGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(2, 1fr)",
// //     gap: 14,
// //   },
// //   statBox: {
// //     padding: 16,
// //     borderRadius: 18,
// //     background: "rgba(255,255,255,0.04)",
// //     border: "1px solid rgba(255,255,255,0.06)",
// //   },
// //   statLabel: {
// //     color: "#8eb4dd",
// //     fontSize: 12,
// //     fontWeight: 800,
// //     letterSpacing: 0.6,
// //     textTransform: "uppercase",
// //     marginBottom: 8,
// //   },
// //   statValue: {
// //     color: "#fff",
// //     fontWeight: 800,
// //     lineHeight: 1.6,
// //   },
// //   grid2: {
// //     display: "grid",
// //     gridTemplateColumns: "1fr 1fr",
// //     gap: 16,
// //   },
// //   grid3: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(3, 1fr)",
// //     gap: 16,
// //   },
// //   spaceTop: {
// //     marginTop: 18,
// //   },
// //   primaryBtn: {
// //     border: "none",
// //     background: "linear-gradient(135deg, #2563eb, #06b6d4)",
// //     color: "#fff",
// //     padding: "12px 18px",
// //     borderRadius: 14,
// //     fontWeight: 800,
// //     cursor: "pointer",
// //     boxShadow: "0 18px 35px rgba(37,99,235,0.22)",
// //   },
// //   secondaryBtn: {
// //     border: "1px solid rgba(255,255,255,0.10)",
// //     background: "rgba(255,255,255,0.04)",
// //     color: "#e9f1ff",
// //     padding: "10px 14px",
// //     borderRadius: 12,
// //     fontWeight: 700,
// //     cursor: "pointer",
// //   },
// //   successBtn: {
// //     border: "none",
// //     background: "linear-gradient(135deg, #16a34a, #15803d)",
// //     color: "#fff",
// //     padding: "10px 14px",
// //     borderRadius: 12,
// //     fontWeight: 800,
// //     cursor: "pointer",
// //   },
// //   dangerBtn: {
// //     border: "none",
// //     background: "linear-gradient(135deg, #ef4444, #b91c1c)",
// //     color: "#fff",
// //     padding: "10px 14px",
// //     borderRadius: 12,
// //     fontWeight: 800,
// //     cursor: "pointer",
// //   },
// //   inlineActions: {
// //     display: "flex",
// //     gap: 8,
// //     flexWrap: "wrap",
// //   },
// //   tableWrap: {
// //     overflowX: "auto",
// //   },
// //   table: {
// //     width: "100%",
// //     borderCollapse: "separate",
// //     borderSpacing: "0 10px",
// //   },
// //   th: {
// //     textAlign: "left",
// //     padding: "0 12px 8px",
// //     color: "#89a8d1",
// //     fontSize: 12,
// //     textTransform: "uppercase",
// //     letterSpacing: 0.7,
// //   },
// //   td: {
// //     background: "rgba(255,255,255,0.04)",
// //     borderTop: "1px solid rgba(255,255,255,0.06)",
// //     borderBottom: "1px solid rgba(255,255,255,0.06)",
// //     padding: 14,
// //     color: "#fff",
// //   },
// //   noData: {
// //     padding: 20,
// //     textAlign: "center",
// //     color: "#a9bdd8",
// //     background: "rgba(255,255,255,0.03)",
// //     borderRadius: 14,
// //   },
// //   feedList: {
// //     display: "grid",
// //     gap: 12,
// //     maxHeight: 760,
// //     overflowY: "auto",
// //   },
// //   feedCard: {
// //     padding: 14,
// //     borderRadius: 16,
// //     background: "rgba(255,255,255,0.04)",
// //     border: "1px solid rgba(255,255,255,0.06)",
// //   },
// //   feedTitle: {
// //     color: "#fff",
// //     fontWeight: 800,
// //     marginBottom: 6,
// //   },
// //   feedText: {
// //     color: "#bfd1e9",
// //     lineHeight: 1.6,
// //     fontSize: 14,
// //   },
// //   feedTime: {
// //     color: "#8da5c6",
// //     fontSize: 12,
// //   },
// //   requestCard: {
// //     padding: 16,
// //     borderRadius: 18,
// //     background: "rgba(255,255,255,0.04)",
// //     border: "1px solid rgba(255,255,255,0.06)",
// //     display: "flex",
// //     justifyContent: "space-between",
// //     gap: 16,
// //     alignItems: "center",
// //     flexWrap: "wrap",
// //   },
// //   emptyBox: {
// //     padding: 16,
// //     borderRadius: 16,
// //     background: "rgba(255,255,255,0.04)",
// //     border: "1px dashed rgba(255,255,255,0.08)",
// //     color: "#abc1dd",
// //   },
// //   rowBetween: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     gap: 12,
// //     flexWrap: "wrap",
// //   },
// //   popup: {
// //     position: "fixed",
// //     right: 20,
// //     bottom: 20,
// //     width: 340,
// //     background: "#0f172a",
// //     color: "#fff",
// //     padding: 18,
// //     borderRadius: 18,
// //     boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
// //     zIndex: 9999,
// //   },
// //   popupTitle: {
// //     fontWeight: 900,
// //     marginBottom: 8,
// //     fontSize: 16,
// //   },
// //   popupMessage: {
// //     color: "#d5e2f7",
// //     lineHeight: 1.6,
// //   },
// //   loaderWrap: {
// //     minHeight: "100vh",
// //     display: "grid",
// //     placeItems: "center",
// //     background: "#08111f",
// //     padding: 20,
// //   },
// //   loaderCard: {
// //     width: 380,
// //     maxWidth: "100%",
// //     padding: 28,
// //     borderRadius: 24,
// //     background: "rgba(10,16,28,0.96)",
// //     border: "1px solid rgba(255,255,255,0.08)",
// //     textAlign: "center",
// //   },
// //   loaderText: {
// //     color: "#9fb2cf",
// //     marginTop: 10,
// //   },
// //   spinner: {
// //     width: 54,
// //     height: 54,
// //     borderRadius: "50%",
// //     border: "4px solid rgba(255,255,255,0.10)",
// //     borderTopColor: "#38bdf8",
// //     margin: "0 auto 18px",
// //     animation: "spin 1s linear infinite",
// //   },
// // };




// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   setPersistence,
//   browserSessionPersistence,
// } from "firebase/auth";
// import {
//   getDatabase,
//   ref,
//   set,
//   push,
//   onValue,
//   update,
//   get,
// } from "firebase/database";
// import "./App.css";

// /* =========================================================
//    FIREBASE
// ========================================================= */
// const firebaseConfig = {
//   apiKey: "AIzaSyB9ererNsNonAzH0zQo_GS79XPOyCoMxr4",
//   authDomain: "waterdtection.firebaseapp.com",
//   databaseURL: "https://waterdtection-default-rtdb.firebaseio.com",
//   projectId: "waterdtection",
//   storageBucket: "waterdtection.firebasestorage.app",
//   messagingSenderId: "690886375729",
//   appId: "1:690886375729:web:172c3a47dda6585e4e1810",
//   measurementId: "G-TXF33Y6XY0",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getDatabase(app);

// /* =========================================================
//    ROOT PATHS
// ========================================================= */
// const ROOT = "Smart_Medicen";
// const LEGACY_ROOT = "Smart_Medicine";

// /* =========================================================
//    TELEGRAM
// ========================================================= */
// const TELEGRAM_BOT_TOKEN = "8601802887:AAFqEXZ6YlHFzCp5jOJlBafLvV2OLMbWzUg";
// const TELEGRAM_CHAT_IDS = [
//   "6333513741",
//   "987654321",
//   "123456789",
//   "555555555",
// ];

// /* =========================================================
//    SLOT CONFIG
// ========================================================= */
// const SLOT_KEYS = ["M1", "M2", "M3", "M4"];
// const MAX_SLOT_CAPACITY = 5;
// const LOW_SLOT_THRESHOLD = 3;

// /* =========================================================
//    HELPERS
// ========================================================= */
// const nowTs = () => Date.now();

// const formatDateTime = (ts) => (ts ? new Date(ts).toLocaleString() : "-");
// const formatDate = (ts) => (ts ? new Date(ts).toLocaleDateString() : "-");

// function timeStringToTodayTimestamp(timeStr) {
//   const [h, m] = String(timeStr || "00:00").split(":").map(Number);
//   const d = new Date();
//   d.setHours(h || 0, m || 0, 0, 0);
//   return d.getTime();
// }

// function getNextOccurrence(timeStr) {
//   const ts = timeStringToTodayTimestamp(timeStr);
//   return ts >= Date.now() ? ts : ts + 24 * 60 * 60 * 1000;
// }

// function minutesDiff(a, b) {
//   return Math.floor((a - b) / 60000);
// }

// function sortTimes(times = []) {
//   return [...times].sort(
//     (a, b) => timeStringToTodayTimestamp(a) - timeStringToTodayTimestamp(b)
//   );
// }

// function statusColor(status) {
//   if (status === "accepted") return "#16a34a";
//   if (status === "rejected") return "#dc2626";
//   return "#f59e0b";
// }

// function logTypeColor(type) {
//   if (type === "DISPENSED") return "#16a34a";
//   if (type === "MISSED") return "#dc2626";
//   if (type === "LOW_STOCK") return "#f59e0b";
//   if (type === "EMPTY_SLOT") return "#ef4444";
//   if (type === "REFILL") return "#2563eb";
//   if (type === "SLOT_LOW") return "#f59e0b";
//   if (type === "SLOT_EMPTY") return "#dc2626";
//   if (type === "SLOT_FULL") return "#16a34a";
//   return "#7c3aed";
// }

// function getSlotLevel(value) {
//   const n = Number(value || 0);
//   if (n <= 0) return "empty";
//   if (n <= LOW_SLOT_THRESHOLD) return "low";
//   if (n >= MAX_SLOT_CAPACITY) return "full";
//   return "normal";
// }

// function getSlotRefillNeeded(value) {
//   const n = Number(value || 0);
//   return Math.max(0, MAX_SLOT_CAPACITY - n);
// }

// function playBeep(duration = 700, frequency = 880) {
//   try {
//     const AudioCtx = window.AudioContext || window.webkitAudioContext;
//     const ctx = new AudioCtx();
//     const oscillator = ctx.createOscillator();
//     const gain = ctx.createGain();

//     oscillator.type = "sine";
//     oscillator.frequency.value = frequency;
//     oscillator.connect(gain);
//     gain.connect(ctx.destination);
//     oscillator.start();

//     gain.gain.setValueAtTime(0.15, ctx.currentTime);
//     gain.gain.exponentialRampToValueAtTime(
//       0.0001,
//       ctx.currentTime + duration / 1000
//     );

//     setTimeout(() => {
//       oscillator.stop();
//       ctx.close();
//     }, duration + 80);
//   } catch (err) {
//     console.log("Beep blocked:", err);
//   }
// }

// async function sendTelegramMessage(text) {
//   for (const chatId of TELEGRAM_CHAT_IDS) {
//     try {
//       await fetch(
//         `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ chat_id: chatId, text }),
//         }
//       );
//     } catch (err) {
//       console.error("Telegram failed:", err);
//     }
//   }
// }

// async function logEvent(userUid, payload, activeRoot = ROOT) {
//   const logRef = push(ref(db, `${activeRoot}/logs/${userUid}`));
//   await set(logRef, { ...payload, timestamp: nowTs() });
// }

// async function createAlert(userUid, title, message, activeRoot = ROOT) {
//   const alertRef = push(ref(db, `${activeRoot}/alerts/${userUid}`));
//   await set(alertRef, {
//     title,
//     message,
//     timestamp: nowTs(),
//     seen: false,
//   });
// }

// function getFirebaseError(err) {
//   const code = err?.code || "";
//   if (code.includes("auth/email-already-in-use")) return "This email is already registered.";
//   if (code.includes("auth/invalid-email")) return "Invalid email address.";
//   if (code.includes("auth/weak-password")) return "Password should be at least 6 characters.";
//   if (code.includes("auth/invalid-credential")) return "Invalid email or password.";
//   if (code.includes("auth/user-not-found")) return "User account not found.";
//   if (code.includes("auth/wrong-password")) return "Wrong password.";
//   if (code.includes("auth/network-request-failed")) return "Network error. Please check internet.";
//   return err?.message || "Something went wrong.";
// }

// async function getProfileFromAnyRoot(uid) {
//   const userSnap = await get(ref(db, `${ROOT}/users/${uid}`));
//   if (userSnap.exists()) {
//     return { root: ROOT, role: "user", data: userSnap.val() };
//   }

//   const caretakerSnap = await get(ref(db, `${ROOT}/caretakers/${uid}`));
//   if (caretakerSnap.exists()) {
//     return { root: ROOT, role: "caretaker", data: caretakerSnap.val() };
//   }

//   const legacyUserSnap = await get(ref(db, `${LEGACY_ROOT}/users/${uid}`));
//   if (legacyUserSnap.exists()) {
//     return { root: LEGACY_ROOT, role: "user", data: legacyUserSnap.val() };
//   }

//   const legacyCaretakerSnap = await get(ref(db, `${LEGACY_ROOT}/caretakers/${uid}`));
//   if (legacyCaretakerSnap.exists()) {
//     return { root: LEGACY_ROOT, role: "caretaker", data: legacyCaretakerSnap.val() };
//   }

//   return null;
// }

// /* =========================================================
//    SMALL UI
// ========================================================= */
// function Input({ label, ...props }) {
//   return (
//     <div style={styles.field}>
//       <label style={styles.label}>{label}</label>
//       <input style={styles.input} {...props} />
//     </div>
//   );
// }

// function Select({ label, children, ...props }) {
//   return (
//     <div style={styles.field}>
//       <label style={styles.label}>{label}</label>
//       <select style={styles.select} {...props}>
//         {children}
//       </select>
//     </div>
//   );
// }

// function Badge({ text, color = "#2563eb" }) {
//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 8,
//         padding: "7px 12px",
//         borderRadius: 999,
//         fontSize: 12,
//         fontWeight: 800,
//         color,
//         background: `${color}18`,
//         border: `1px solid ${color}35`,
//       }}
//     >
//       <span
//         style={{
//           width: 8,
//           height: 8,
//           borderRadius: "50%",
//           background: color,
//         }}
//       />
//       {text}
//     </span>
//   );
// }

// function SectionCard({ title, subtitle, right, children }) {
//   return (
//     <div style={styles.card}>
//       <div style={styles.cardHeader}>
//         <div>
//           <h3 style={styles.cardTitle}>{title}</h3>
//           {subtitle ? <p style={styles.cardSubtitle}>{subtitle}</p> : null}
//         </div>
//         {right}
//       </div>
//       {children}
//     </div>
//   );
// }

// function StatBox({ label, value }) {
//   return (
//     <div style={styles.statBox}>
//       <div style={styles.statLabel}>{label}</div>
//       <div style={styles.statValue}>{value}</div>
//     </div>
//   );
// }

// function SlotCard({ slotKey, value, pulse = false }) {
//   const level = getSlotLevel(value);
//   const refillNeeded = getSlotRefillNeeded(value);

//   const levelMeta = {
//     empty: { title: "Empty", color: "#ef4444" },
//     low: { title: "Low", color: "#f59e0b" },
//     normal: { title: "Available", color: "#38bdf8" },
//     full: { title: "Full", color: "#16a34a" },
//   }[level];

//   const fillPercent = Math.max(
//     0,
//     Math.min(100, (Number(value || 0) / MAX_SLOT_CAPACITY) * 100)
//   );

//   return (
//     <div
//       style={{
//         ...styles.slotCard,
//         ...(pulse ? styles.slotCardPulse : {}),
//         borderColor: `${levelMeta.color}55`,
//         boxShadow: `0 18px 35px ${levelMeta.color}20`,
//       }}
//     >
//       <div style={styles.slotTopRow}>
//         <div style={styles.slotTitle}>{slotKey}</div>
//         <Badge text={levelMeta.title} color={levelMeta.color} />
//       </div>

//       <div style={styles.slotBigNumber}>{Number(value || 0)}</div>
//       <div style={styles.slotSmallText}>Current tablets in slot</div>

//       <div style={styles.slotProgressTrack}>
//         <div
//           style={{
//             ...styles.slotProgressFill,
//             width: `${fillPercent}%`,
//             background: `linear-gradient(90deg, ${levelMeta.color}, ${levelMeta.color}cc)`,
//           }}
//         />
//       </div>

//       <div style={styles.slotInfoGrid}>
//         <div style={styles.slotInfoBox}>
//           <div style={styles.slotInfoLabel}>Capacity</div>
//           <div style={styles.slotInfoValue}>{MAX_SLOT_CAPACITY}</div>
//         </div>
//         <div style={styles.slotInfoBox}>
//           <div style={styles.slotInfoLabel}>Refill Needed</div>
//           <div style={styles.slotInfoValue}>{refillNeeded}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    APP
// ========================================================= */
// export default function App() {
//   const [authReady, setAuthReady] = useState(false);
//   const [authUser, setAuthUser] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [mode, setMode] = useState("login");
//   const [roleTab, setRoleTab] = useState("user");
//   const [busy, setBusy] = useState(false);
//   const [popup, setPopup] = useState(null);
//   const [forceLoginScreen, setForceLoginScreen] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (user) => {
//       try {
//         if (forceLoginScreen) {
//           setAuthUser(null);
//           setProfile(null);
//           setAuthReady(true);
//           return;
//         }

//         if (!user) {
//           setAuthUser(null);
//           setProfile(null);
//           setAuthReady(true);
//           return;
//         }

//         const foundProfile = await getProfileFromAnyRoot(user.uid);

//         if (foundProfile) {
//           setAuthUser(user);
//           setProfile({
//             uid: user.uid,
//             root: foundProfile.root,
//             role: foundProfile.role,
//             ...foundProfile.data,
//           });
//         } else {
//           await signOut(auth);
//           setAuthUser(null);
//           setProfile(null);
//         }
//       } catch (err) {
//         console.error(err);
//         setAuthUser(null);
//         setProfile(null);
//       } finally {
//         setAuthReady(true);
//       }
//     });

//     return () => unsub();
//   }, [forceLoginScreen]);

//   const showPopup = (title, message, tone = "danger") => {
//     setPopup({ title, message, tone });
//     playBeep();
//     setTimeout(() => setPopup(null), 4500);
//   };

//   const handleRegister = async () => {
//     if (!form.name || !form.email || !form.password) {
//       alert("Please fill name, email and password.");
//       return;
//     }

//     setBusy(true);
//     try {
//       setForceLoginScreen(true);
//       await setPersistence(auth, browserSessionPersistence);

//       const cred = await createUserWithEmailAndPassword(
//         auth,
//         form.email.trim(),
//         form.password
//       );

//       const uid = cred.user.uid;

//       if (roleTab === "user") {
//         await set(ref(db, `${ROOT}/users/${uid}`), {
//           role: "user",
//           name: form.name.trim(),
//           email: form.email.trim(),
//           phone: form.phone.trim(),
//           status: "pending",
//           caretakerUid: "",
//           createdAt: nowTs(),
//         });
//       } else {
//         await set(ref(db, `${ROOT}/caretakers/${uid}`), {
//           role: "caretaker",
//           name: form.name.trim(),
//           email: form.email.trim(),
//           phone: form.phone.trim(),
//           createdAt: nowTs(),
//         });
//       }

//       await signOut(auth);

//       setForm({ name: "", email: "", password: "", phone: "" });
//       setMode("login");
//       setAuthUser(null);
//       setProfile(null);

//       showPopup("Registration Successful", "Account created. Please login now.", "success");

//       setTimeout(() => {
//         setForceLoginScreen(false);
//       }, 300);
//     } catch (err) {
//       console.error(err);
//       setForceLoginScreen(false);
//       alert(getFirebaseError(err));
//     } finally {
//       setBusy(false);
//     }
//   };

//   const handleLogin = async () => {
//     if (!form.email || !form.password) {
//       alert("Please enter email and password.");
//       return;
//     }

//     setBusy(true);
//     try {
//       setForceLoginScreen(false);
//       await setPersistence(auth, browserSessionPersistence);
//       const res = await signInWithEmailAndPassword(
//         auth,
//         form.email.trim(),
//         form.password
//       );

//       const foundProfile = await getProfileFromAnyRoot(res.user.uid);

//       if (!foundProfile) {
//         await signOut(auth);
//         alert("Login succeeded, but no profile exists in Firebase for this account.");
//         return;
//       }

//       setAuthUser(res.user);
//       setProfile({
//         uid: res.user.uid,
//         root: foundProfile.root,
//         role: foundProfile.role,
//         ...foundProfile.data,
//       });

//       setForm({ name: "", email: "", password: "", phone: "" });
//     } catch (err) {
//       console.error(err);
//       alert(getFirebaseError(err));
//     } finally {
//       setBusy(false);
//     }
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     setAuthUser(null);
//     setProfile(null);
//     setMode("login");
//   };

//   if (!authReady) {
//     return (
//       <div style={styles.loaderWrap}>
//         <div style={styles.loaderCard}>
//           <div style={styles.spinner} />
//           <h2 style={{ margin: 0 }}>Loading Smart Medicine System</h2>
//           <p style={styles.loaderText}>Checking login session...</p>
//         </div>
//       </div>
//     );
//   }

//   const showAuthScreen = forceLoginScreen || !authUser || !profile;

//   return (
//     <div style={styles.app}>
//       <div style={styles.bgA} />
//       <div style={styles.bgB} />
//       <div style={styles.bgC} />

//       <div style={styles.container}>
//         <header style={styles.header}>
//           <div>
//             <div style={styles.kicker}>Healthcare Platform</div>
//             <h1 style={styles.mainTitle}>
//               Smart Medicine Reminder and Tablet Dispensing Dashboard
//             </h1>
//           </div>

//           {!showAuthScreen && (
//             <button style={styles.logoutBtn} onClick={handleLogout}>
//               Logout
//             </button>
//           )}
//         </header>

//         {showAuthScreen ? (
//           <AuthScreen
//             roleTab={roleTab}
//             setRoleTab={setRoleTab}
//             mode={mode}
//             setMode={setMode}
//             form={form}
//             setForm={setForm}
//             handleLogin={handleLogin}
//             handleRegister={handleRegister}
//             busy={busy}
//           />
//         ) : profile.role === "user" ? (
//           <UserDashboard
//             profile={profile}
//             showPopup={showPopup}
//             setProfile={setProfile}
//           />
//         ) : (
//           <CaretakerDashboard
//             profile={profile}
//             showPopup={showPopup}
//           />
//         )}
//       </div>

//       {popup && (
//         <div
//           style={{
//             ...styles.popup,
//             borderLeft: `5px solid ${
//               popup.tone === "success"
//                 ? "#16a34a"
//                 : popup.tone === "info"
//                 ? "#2563eb"
//                 : "#dc2626"
//             }`,
//           }}
//         >
//           <div style={styles.popupTitle}>{popup.title}</div>
//           <div style={styles.popupMessage}>{popup.message}</div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* =========================================================
//    AUTH SCREEN
// ========================================================= */
// function AuthScreen({
//   roleTab,
//   setRoleTab,
//   mode,
//   setMode,
//   form,
//   setForm,
//   handleLogin,
//   handleRegister,
//   busy,
// }) {
//   return (
//     <div style={styles.authLayout}>
//       <div style={styles.authRight}>
//         <div style={styles.authPanel}>
//           <div style={styles.roleSwitch}>
//             <button
//               type="button"
//               style={roleTab === "user" ? styles.roleSwitchActive : styles.roleSwitchBtn}
//               onClick={() => setRoleTab("user")}
//             >
//               User
//             </button>
//             <button
//               type="button"
//               style={roleTab === "caretaker" ? styles.roleSwitchActive : styles.roleSwitchBtn}
//               onClick={() => setRoleTab("caretaker")}
//             >
//               Caretaker
//             </button>
//           </div>

//           <h2 style={styles.authTitle}>
//             {mode === "login" ? "Sign in to continue" : "Create your account"}
//           </h2>
//           <p style={styles.authSubtitle}>
//             {mode === "login" ? `Login as ${roleTab}` : `Register as ${roleTab}`}
//           </p>

//           <div style={styles.formGridSingle}>
//             {mode === "register" && (
//               <>
//                 <Input
//                   label="Full Name"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   placeholder="Enter full name"
//                 />
//                 <Input
//                   label="Phone Number"
//                   value={form.phone}
//                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                   placeholder="Enter phone number"
//                 />
//               </>
//             )}

//             <Input
//               label="Email"
//               type="email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               placeholder="Enter email"
//             />

//             <Input
//               label="Password"
//               type="password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               placeholder="Enter password"
//             />

//             <button
//               type="button"
//               style={styles.primaryAction}
//               onClick={mode === "login" ? handleLogin : handleRegister}
//               disabled={busy}
//             >
//               {busy
//                 ? "Please wait..."
//                 : mode === "login"
//                 ? `Login as ${roleTab}`
//                 : `Register as ${roleTab}`}
//             </button>

//             <button
//               type="button"
//               style={styles.secondaryAction}
//               onClick={() => setMode(mode === "login" ? "register" : "login")}
//               disabled={busy}
//             >
//               {mode === "login" ? "Create new account" : "Back to login"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    USER DASHBOARD
// ========================================================= */
// function UserDashboard({ profile, showPopup, setProfile }) {
//   const activeRoot = profile.root || ROOT;
//   const [medicines, setMedicines] = useState([]);
//   const [logs, setLogs] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [caretakers, setCaretakers] = useState([]);
//   const [selectedCaretaker, setSelectedCaretaker] = useState("");
//   const [slotLevels, setSlotLevels] = useState({
//     M1: 0,
//     M2: 0,
//     M3: 0,
//     M4: 0,
//   });
//   const [slotPulse, setSlotPulse] = useState({
//     M1: false,
//     M2: false,
//     M3: false,
//     M4: false,
//   });
//   const [slotForm, setSlotForm] = useState({
//     M1: 0,
//     M2: 0,
//     M3: 0,
//     M4: 0,
//   });

//   const reminderLockRef = useRef({});
//   const slotAlertLockRef = useRef({});

//   const [medicineForm, setMedicineForm] = useState({
//     medicineName: "",
//     slotNumber: 1,
//     quantity: 10,
//     dosageCount: 1,
//     time1: "08:00",
//     time2: "",
//     time3: "",
//     time4: "",
//     period: "Morning",
//     frequencyPerDay: 1,
//   });

//   useEffect(() => {
//     const unsubMeds = onValue(ref(db, `${activeRoot}/medicines/${profile.uid}`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
//       setMedicines(arr);
//     });

//     const unsubLogs = onValue(ref(db, `${activeRoot}/logs/${profile.uid}`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data)
//         .map((key) => ({ id: key, ...data[key] }))
//         .sort((a, b) => b.timestamp - a.timestamp);
//       setLogs(arr);
//     });

//     const unsubAlerts = onValue(ref(db, `${activeRoot}/alerts/${profile.uid}`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data)
//         .map((key) => ({ id: key, ...data[key] }))
//         .sort((a, b) => b.timestamp - a.timestamp);
//       setAlerts(arr);
//     });

//     const unsubCare = onValue(ref(db, `${activeRoot}/caretakers`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data).map((key) => ({ uid: key, ...data[key] }));
//       setCaretakers(arr);
//     });

//     const unsubProfile = onValue(ref(db, `${activeRoot}/users/${profile.uid}`), (snap) => {
//       if (snap.exists()) {
//         setProfile((prev) => ({ ...prev, ...snap.val(), root: activeRoot }));
//       }
//     });

//     const slotUnsubs = SLOT_KEYS.map((slotKey) =>
//       onValue(ref(db, `${activeRoot}/${slotKey}`), (snap) => {
//         const value = Number(snap.val() || 0);
//         setSlotLevels((prev) => ({ ...prev, [slotKey]: value }));
//         setSlotForm((prev) => ({ ...prev, [slotKey]: value }));
//       })
//     );

//     return () => {
//       unsubMeds();
//       unsubLogs();
//       unsubAlerts();
//       unsubCare();
//       unsubProfile();
//       slotUnsubs.forEach((fn) => fn && fn());
//     };
//   }, [profile.uid, setProfile, activeRoot]);

//   useEffect(() => {
//     if (profile.status !== "accepted") return;

//     const interval = setInterval(async () => {
//       const now = Date.now();

//       for (const med of medicines) {
//         if (!med.active) continue;

//         for (const t of med.times || []) {
//           const scheduleTs = timeStringToTodayTimestamp(t);
//           const diffMin = minutesDiff(now, scheduleTs);
//           const reminderKey = `${med.id}_${t}_${formatDate(scheduleTs)}`;

//           if (diffMin >= 0 && diffMin <= 1 && !reminderLockRef.current[`${reminderKey}_due`]) {
//             reminderLockRef.current[`${reminderKey}_due`] = true;

//             const msg = `Medicine time now: ${med.medicineName} (Slot ${med.slotNumber}) at ${t}`;
//             showPopup("Medicine Reminder", msg, "info");
//             await createAlert(profile.uid, "Medicine Reminder", msg, activeRoot);
//             await logEvent(
//               profile.uid,
//               {
//                 type: "REMINDER",
//                 medicineName: med.medicineName,
//                 slotNumber: med.slotNumber,
//                 message: msg,
//               },
//               activeRoot
//             );

//             await sendTelegramMessage(
//               `SMART MEDICINE REMINDER
// User: ${profile.name}
// Medicine: ${med.medicineName}
// Slot: ${med.slotNumber}
// Time: ${t}`
//             );
//           }

//           if (diffMin > 30 && !reminderLockRef.current[`${reminderKey}_missed`]) {
//             const lastTakenSameWindow =
//               med.lastTakenAt &&
//               Math.abs(med.lastTakenAt - scheduleTs) < 30 * 60 * 1000;

//             if (!lastTakenSameWindow) {
//               reminderLockRef.current[`${reminderKey}_missed`] = true;

//               const msg = `Missed medicine: ${med.medicineName} (Slot ${med.slotNumber}) scheduled at ${t}`;
//               showPopup("Missed Dose Alert", msg, "danger");
//               await createAlert(profile.uid, "Missed Dose Alert", msg, activeRoot);
//               await logEvent(
//                 profile.uid,
//                 {
//                   type: "MISSED",
//                   medicineName: med.medicineName,
//                   slotNumber: med.slotNumber,
//                   message: msg,
//                 },
//                 activeRoot
//               );

//               await sendTelegramMessage(
//                 `SMART MEDICINE ALERT
// User: ${profile.name}
// Missed dose: ${med.medicineName}
// Slot: ${med.slotNumber}
// Scheduled: ${t}`
//               );
//             }
//           }
//         }

//         if (med.quantity <= 2 && med.quantity > 0 && !med.lowStockAlertSent) {
//           await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${med.id}`), {
//             lowStockAlertSent: true,
//           });

//           const msg = `Low stock: ${med.medicineName} in Slot ${med.slotNumber}. Remaining ${med.quantity}`;
//           showPopup("Low Stock Alert", msg, "danger");
//           await createAlert(profile.uid, "Low Stock Alert", msg, activeRoot);
//           await logEvent(
//             profile.uid,
//             {
//               type: "LOW_STOCK",
//               medicineName: med.medicineName,
//               slotNumber: med.slotNumber,
//               message: msg,
//             },
//             activeRoot
//           );

//           await sendTelegramMessage(
//             `SMART MEDICINE LOW STOCK
// User: ${profile.name}
// Medicine: ${med.medicineName}
// Slot: ${med.slotNumber}
// Remaining: ${med.quantity}`
//           );
//         }

//         if (med.quantity <= 0 && !med.emptyAlertSent) {
//           await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${med.id}`), {
//             emptyAlertSent: true,
//           });

//           const msg = `Slot ${med.slotNumber} is empty for ${med.medicineName}`;
//           showPopup("Empty Slot Alert", msg, "danger");
//           await createAlert(profile.uid, "Empty Slot Alert", msg, activeRoot);
//           await logEvent(
//             profile.uid,
//             {
//               type: "EMPTY_SLOT",
//               medicineName: med.medicineName,
//               slotNumber: med.slotNumber,
//               message: msg,
//             },
//             activeRoot
//           );

//           await sendTelegramMessage(
//             `SMART MEDICINE EMPTY SLOT
// User: ${profile.name}
// Medicine: ${med.medicineName}
// Slot: ${med.slotNumber} is empty`
//           );
//         }
//       }
//     }, 15000);

//     return () => clearInterval(interval);
//   }, [medicines, profile, showPopup, activeRoot]);

//   useEffect(() => {
//     const run = async () => {
//       for (const slotKey of SLOT_KEYS) {
//         const value = Number(slotLevels[slotKey] || 0);
//         const level = getSlotLevel(value);
//         const refillNeeded = getSlotRefillNeeded(value);

//         const stateKey = `${slotKey}_${value}_${level}`;
//         if (slotAlertLockRef.current[stateKey]) continue;

//         if (level === "empty") {
//           slotAlertLockRef.current[stateKey] = true;
//           setSlotPulse((prev) => ({ ...prev, [slotKey]: true }));
//           setTimeout(() => {
//             setSlotPulse((prev) => ({ ...prev, [slotKey]: false }));
//           }, 2500);

//           const msg = `${slotKey} is empty. Refill needed: ${refillNeeded} tablets`;
//           showPopup("Slot Empty Alert", msg, "danger");
//           await createAlert(profile.uid, "Slot Empty Alert", msg, activeRoot);
//           await logEvent(
//             profile.uid,
//             {
//               type: "SLOT_EMPTY",
//               medicineName: "Slot Monitor",
//               slotNumber: slotKey,
//               message: msg,
//             },
//             activeRoot
//           );
//           await sendTelegramMessage(
//             `SMART MEDICINE SLOT ALERT
// User: ${profile.name}
// ${slotKey} is EMPTY
// Current Tablets: ${value}
// Refill Needed: ${refillNeeded}`
//           );
//         } else if (level === "low") {
//           slotAlertLockRef.current[stateKey] = true;
//           setSlotPulse((prev) => ({ ...prev, [slotKey]: true }));
//           setTimeout(() => {
//             setSlotPulse((prev) => ({ ...prev, [slotKey]: false }));
//           }, 2500);

//           const msg = `${slotKey} is low. Current tablets: ${value}. Refill needed: ${refillNeeded}`;
//           showPopup("Slot Low Alert", msg, "danger");
//           await createAlert(profile.uid, "Slot Low Alert", msg, activeRoot);
//           await logEvent(
//             profile.uid,
//             {
//               type: "SLOT_LOW",
//               medicineName: "Slot Monitor",
//               slotNumber: slotKey,
//               message: msg,
//             },
//             activeRoot
//           );
//           await sendTelegramMessage(
//             `SMART MEDICINE SLOT ALERT
// User: ${profile.name}
// ${slotKey} is LOW
// Current Tablets: ${value}
// Refill Needed: ${refillNeeded}`
//           );
//         } else if (level === "full") {
//           slotAlertLockRef.current[stateKey] = true;
//           setSlotPulse((prev) => ({ ...prev, [slotKey]: true }));
//           setTimeout(() => {
//             setSlotPulse((prev) => ({ ...prev, [slotKey]: false }));
//           }, 1800);

//           const msg = `${slotKey} is full with ${value} tablets`;
//           showPopup("Slot Full", msg, "success");
//           await createAlert(profile.uid, "Slot Full", msg, activeRoot);
//           await logEvent(
//             profile.uid,
//             {
//               type: "SLOT_FULL",
//               medicineName: "Slot Monitor",
//               slotNumber: slotKey,
//               message: msg,
//             },
//             activeRoot
//           );
//           await sendTelegramMessage(
//             `SMART MEDICINE SLOT STATUS
// User: ${profile.name}
// ${slotKey} is FULL
// Current Tablets: ${value}`
//           );
//         }
//       }
//     };

//     if (profile?.uid) {
//       run();
//     }
//   }, [slotLevels, profile, activeRoot, showPopup]);

//   const nextDose = useMemo(() => {
//     const upcoming = [];
//     medicines.forEach((med) => {
//       if (!med.active) return;
//       (med.times || []).forEach((timeStr) => {
//         upcoming.push({
//           medicineName: med.medicineName,
//           slotNumber: med.slotNumber,
//           nextTs: getNextOccurrence(timeStr),
//         });
//       });
//     });
//     upcoming.sort((a, b) => a.nextTs - b.nextTs);
//     return upcoming[0] || null;
//   }, [medicines]);

//   const requestCaretaker = async () => {
//     if (!selectedCaretaker) {
//       alert("Please select caretaker.");
//       return;
//     }

//     const caretaker = caretakers.find((c) => c.uid === selectedCaretaker);
//     if (!caretaker) {
//       alert("Selected caretaker not found.");
//       return;
//     }

//     try {
//       const reqRef = push(ref(db, `${activeRoot}/requests`));

//       await set(reqRef, {
//         userUid: profile.uid,
//         caretakerUid: caretaker.uid,
//         userName: profile.name,
//         caretakerName: caretaker.name,
//         status: "pending",
//         createdAt: nowTs(),
//       });

//       await update(ref(db, `${activeRoot}/users/${profile.uid}`), {
//         caretakerUid: caretaker.uid,
//         status: "pending",
//       });

//       setProfile((prev) => ({
//         ...prev,
//         caretakerUid: caretaker.uid,
//         status: "pending",
//         root: activeRoot,
//       }));

//       showPopup("Request Sent", `Request sent to ${caretaker.name}`, "success");

//       await sendTelegramMessage(
//         `SMART MEDICINE REQUEST
// User: ${profile.name}
// Requested caretaker: ${caretaker.name}
// Status: pending`
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send caretaker request.");
//     }
//   };

//   const addMedicine = async () => {
//     if (profile.status !== "accepted") {
//       alert("Your account is not accepted by caretaker yet.");
//       return;
//     }

//     if (!medicineForm.medicineName.trim()) {
//       alert("Please enter medicine name.");
//       return;
//     }

//     const times = [
//       medicineForm.time1,
//       medicineForm.time2,
//       medicineForm.time3,
//       medicineForm.time4,
//     ]
//       .filter(Boolean)
//       .slice(0, Number(medicineForm.frequencyPerDay));

//     if (!times.length) {
//       alert("Please add at least one time.");
//       return;
//     }

//     const medRef = push(ref(db, `${activeRoot}/medicines/${profile.uid}`));

//     await set(medRef, {
//       medicineName: medicineForm.medicineName.trim(),
//       slotNumber: Number(medicineForm.slotNumber),
//       quantity: Number(medicineForm.quantity),
//       dosageCount: Number(medicineForm.dosageCount),
//       frequencyPerDay: Number(medicineForm.frequencyPerDay),
//       period: medicineForm.period,
//       times: sortTimes(times),
//       active: true,
//       lastTakenAt: 0,
//       lowStockAlertSent: false,
//       emptyAlertSent: false,
//       createdAt: nowTs(),
//       updatedAt: nowTs(),
//     });

//     await logEvent(
//       profile.uid,
//       {
//         type: "MEDICINE_ADDED",
//         medicineName: medicineForm.medicineName.trim(),
//         slotNumber: Number(medicineForm.slotNumber),
//         message: "Medicine added successfully",
//       },
//       activeRoot
//     );

//     showPopup("Medicine Added", "Medicine plan saved successfully.", "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE PLAN ADDED
// User: ${profile.name}
// Medicine: ${medicineForm.medicineName.trim()}
// Slot: ${medicineForm.slotNumber}
// Times: ${times.join(", ")}`
//     );

//     setMedicineForm({
//       medicineName: "",
//       slotNumber: 1,
//       quantity: 10,
//       dosageCount: 1,
//       time1: "08:00",
//       time2: "",
//       time3: "",
//       time4: "",
//       period: "Morning",
//       frequencyPerDay: 1,
//     });
//   };

//   const markTaken = async (med) => {
//     if (med.quantity <= 0) {
//       alert("No tablets available in this slot.");
//       return;
//     }

//     const newQty = Math.max(0, Number(med.quantity) - Number(med.dosageCount));

//     await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${med.id}`), {
//       quantity: newQty,
//       lastTakenAt: nowTs(),
//       updatedAt: nowTs(),
//     });

//     await createAlert(
//       profile.uid,
//       "Medicine Dispensed",
//       `${med.medicineName} dispensed from Slot ${med.slotNumber}`,
//       activeRoot
//     );

//     await logEvent(
//       profile.uid,
//       {
//         type: "DISPENSED",
//         medicineName: med.medicineName,
//         slotNumber: med.slotNumber,
//         message: "Medicine dispensed successfully",
//       },
//       activeRoot
//     );

//     showPopup("Medicine Dispensed", `${med.medicineName} dispensed successfully.`, "success");
//   };

//   const refillMedicine = async (med, qty = 10) => {
//     await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${med.id}`), {
//       quantity: Number(med.quantity) + Number(qty),
//       lowStockAlertSent: false,
//       emptyAlertSent: false,
//       updatedAt: nowTs(),
//     });

//     await logEvent(
//       profile.uid,
//       {
//         type: "REFILL",
//         medicineName: med.medicineName,
//         slotNumber: med.slotNumber,
//         message: `Refilled ${qty} tablets`,
//       },
//       activeRoot
//     );

//     showPopup("Refill Updated", `${med.medicineName} refilled.`, "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE REFILL
// User: ${profile.name}
// Medicine: ${med.medicineName}
// Slot: ${med.slotNumber}
// Added tablets: ${qty}`
//     );
//   };

//   const updateSlotValue = async (slotKey) => {
//     try {
//       const newValue = Math.max(0, Number(slotForm[slotKey] || 0));
//       await set(ref(db, `${activeRoot}/${slotKey}`), newValue);

//       const refillNeeded = getSlotRefillNeeded(newValue);
//       showPopup(
//         "Slot Updated",
//         `${slotKey} updated to ${newValue}. Refill needed: ${refillNeeded}`,
//         "success"
//       );

//       await logEvent(
//         profile.uid,
//         {
//           type: "SLOT_MANUAL_UPDATE",
//           medicineName: "Slot Monitor",
//           slotNumber: slotKey,
//           message: `${slotKey} updated to ${newValue}. Refill needed: ${refillNeeded}`,
//         },
//         activeRoot
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update slot value.");
//     }
//   };

//   return (
//     <div style={styles.dashboardGrid}>
//       <div style={styles.mainColumn}>
//         <SectionCard
//           title={`Welcome, ${profile.name}`}
//           subtitle="User dashboard overview"
//           right={<Badge text={profile.status.toUpperCase()} color={statusColor(profile.status)} />}
//         >
//           <div style={styles.statsGrid}>
//             <StatBox label="Email" value={profile.email} />
//             <StatBox label="Role" value={profile.role} />
//             <StatBox label="Created" value={formatDateTime(profile.createdAt)} />
//             <StatBox
//               label="Next Dose"
//               value={
//                 nextDose
//                   ? `${nextDose.medicineName} | Slot ${nextDose.slotNumber} | ${new Date(
//                       nextDose.nextTs
//                     ).toLocaleString()}`
//                   : "No schedule"
//               }
//             />
//           </div>
//         </SectionCard>

//         <SectionCard title="Live Tablet Slot Animation" subtitle="Realtime Firebase slot levels for M1, M2, M3, M4">
//           <div style={styles.slotGrid}>
//             {SLOT_KEYS.map((slotKey) => (
//               <SlotCard
//                 key={slotKey}
//                 slotKey={slotKey}
//                 value={slotLevels[slotKey]}
//                 pulse={slotPulse[slotKey]}
//               />
//             ))}
//           </div>
//         </SectionCard>

//         <SectionCard title="Slot Refill Control" subtitle="Update Firebase slot tablets directly">
//           <div style={styles.slotControlGrid}>
//             {SLOT_KEYS.map((slotKey) => (
//               <div key={slotKey} style={styles.slotControlCard}>
//                 <div style={styles.slotControlTitle}>{slotKey}</div>
//                 <Input
//                   label="Tablet Count"
//                   type="number"
//                   min="0"
//                   max={MAX_SLOT_CAPACITY}
//                   value={slotForm[slotKey]}
//                   onChange={(e) =>
//                     setSlotForm((prev) => ({
//                       ...prev,
//                       [slotKey]: e.target.value,
//                     }))
//                   }
//                 />
//                 <div style={styles.slotControlMeta}>
//                   Refill needed: {getSlotRefillNeeded(slotForm[slotKey])}
//                 </div>
//                 <button
//                   style={styles.primaryBtn}
//                   onClick={() => updateSlotValue(slotKey)}
//                 >
//                   Update {slotKey}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </SectionCard>

//         <SectionCard title="Caretaker Approval" subtitle="Choose caretaker and send request">
//           <div style={styles.grid2}>
//             <Select
//               label="Select Caretaker"
//               value={selectedCaretaker}
//               onChange={(e) => setSelectedCaretaker(e.target.value)}
//             >
//               <option value="">Choose caretaker</option>
//               {caretakers.map((c) => (
//                 <option key={c.uid} value={c.uid}>
//                   {c.name} ({c.email})
//                 </option>
//               ))}
//             </Select>
//           </div>
//           <div style={styles.spaceTop}>
//             <button style={styles.primaryBtn} onClick={requestCaretaker}>
//               Send Request
//             </button>
//           </div>
//         </SectionCard>

//         <SectionCard title="Medicine Setup" subtitle="Configure slot, dosage, and time schedule">
//           <div style={styles.grid3}>
//             <Input
//               label="Medicine Name"
//               value={medicineForm.medicineName}
//               onChange={(e) => setMedicineForm({ ...medicineForm, medicineName: e.target.value })}
//               placeholder="Paracetamol"
//             />
//             <Input
//               label="Slot Number"
//               type="number"
//               value={medicineForm.slotNumber}
//               onChange={(e) => setMedicineForm({ ...medicineForm, slotNumber: Math.min(e.target.value, MAX_SLOT_CAPACITY) })}
//               max={MAX_SLOT_CAPACITY}
//             />
//             <Input
//               label="Quantity"
//               type="number"
//               value={medicineForm.quantity}
//               onChange={(e) => setMedicineForm({ ...medicineForm, quantity: e.target.value })}
//             />
//             <Input
//               label="Dosage Count"
//               type="number"
//               value={medicineForm.dosageCount}
//               onChange={(e) => setMedicineForm({ ...medicineForm, dosageCount: e.target.value })}
//             />
//             <Select
//               label="Frequency Per Day"
//               value={medicineForm.frequencyPerDay}
//               onChange={(e) => setMedicineForm({ ...medicineForm, frequencyPerDay: e.target.value })}
//             >
//               <option value={1}>1 time</option>
//               <option value={2}>2 times</option>
//               <option value={3}>3 times</option>
//               <option value={4}>4 times</option>
//             </Select>
//             <Select
//               label="Schedule Type"
//               value={medicineForm.period}
//               onChange={(e) => setMedicineForm({ ...medicineForm, period: e.target.value })}
//             >
//               <option>Morning</option>
//               <option>Afternoon</option>
//               <option>Evening</option>
//               <option>Night</option>
//               <option>Custom</option>
//             </Select>
//             <Input
//               label="Time 1"
//               type="time"
//               value={medicineForm.time1}
//               onChange={(e) => setMedicineForm({ ...medicineForm, time1: e.target.value })}
//             />
//             <Input
//               label="Time 2"
//               type="time"
//               value={medicineForm.time2}
//               onChange={(e) => setMedicineForm({ ...medicineForm, time2: e.target.value })}
//             />
//             <Input
//               label="Time 3"
//               type="time"
//               value={medicineForm.time3}
//               onChange={(e) => setMedicineForm({ ...medicineForm, time3: e.target.value })}
//             />
//             <Input
//               label="Time 4"
//               type="time"
//               value={medicineForm.time4}
//               onChange={(e) => setMedicineForm({ ...medicineForm, time4: e.target.value })}
//             />
//           </div>

//           <div style={styles.spaceTop}>
//             <button style={styles.primaryBtn} onClick={addMedicine}>
//               Save Medicine Plan
//             </button>
//           </div>
//         </SectionCard>

//         <SectionCard title="Medicine Slots" subtitle="Dispense and refill medicines">
//           <div style={styles.tableWrap}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.th}>Medicine</th>
//                   <th style={styles.th}>Slot</th>
//                   <th style={styles.th}>Qty</th>
//                   <th style={styles.th}>Dosage</th>
//                   <th style={styles.th}>Times</th>
//                   <th style={styles.th}>Status</th>
//                   <th style={styles.th}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {medicines.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" style={styles.noData}>No medicines added yet</td>
//                   </tr>
//                 ) : (
//                   medicines.map((med) => (
//                     <tr key={med.id}>
//                       <td style={styles.td}>{med.medicineName}</td>
//                       <td style={styles.td}>{med.slotNumber}</td>
//                       <td style={styles.td}>{med.quantity}</td>
//                       <td style={styles.td}>{med.dosageCount}</td>
//                       <td style={styles.td}>{(med.times || []).join(", ")}</td>
//                       <td style={styles.td}>
//                         {med.quantity <= 0 ? (
//                           <Badge text="EMPTY" color="#dc2626" />
//                         ) : med.quantity <= 2 ? (
//                           <Badge text="LOW" color="#f59e0b" />
//                         ) : (
//                           <Badge text="AVAILABLE" color="#16a34a" />
//                         )}
//                       </td>
//                       <td style={styles.td}>
//                         <div style={styles.inlineActions}>
//                           <button style={styles.successBtn} onClick={() => markTaken(med)}>
//                             Take
//                           </button>
//                           <button style={styles.secondaryBtn} onClick={() => refillMedicine(med, 10)}>
//                             Refill +10
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </SectionCard>
//       </div>

//       <div style={styles.sideColumn}>
//         <SectionCard title="Alerts" subtitle="Recent notifications">
//           <div style={styles.feedList}>
//             {alerts.length === 0 ? (
//               <div style={styles.emptyBox}>No alerts available</div>
//             ) : (
//               alerts.slice(0, 10).map((a) => (
//                 <div key={a.id} style={styles.feedCard}>
//                   <div style={styles.feedTitle}>{a.title}</div>
//                   <div style={styles.feedText}>{a.message}</div>
//                   <div style={styles.feedTime}>{formatDateTime(a.timestamp)}</div>
//                 </div>
//               ))
//             )}
//           </div>
//         </SectionCard>

//         <SectionCard title="History / Logs" subtitle="Dispensing and event history">
//           <div style={styles.feedList}>
//             {logs.length === 0 ? (
//               <div style={styles.emptyBox}>No history found</div>
//             ) : (
//               logs.slice(0, 20).map((log) => (
//                 <div key={log.id} style={styles.feedCard}>
//                   <div style={styles.rowBetween}>
//                     <Badge text={log.type} color={logTypeColor(log.type)} />
//                     <span style={styles.feedTime}>{formatDateTime(log.timestamp)}</span>
//                   </div>
//                   <div style={{ height: 8 }} />
//                   <div style={styles.feedTitle}>{log.medicineName || "System"}</div>
//                   <div style={styles.feedText}>{log.message}</div>
//                 </div>
//               ))
//             )}
//           </div>
//         </SectionCard>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    CARETAKER DASHBOARD
// ========================================================= */
// function CaretakerDashboard({ profile, showPopup }) {
//   const activeRoot = profile.root || ROOT;
//   const [requests, setRequests] = useState([]);
//   const [acceptedUsers, setAcceptedUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [userMedicines, setUserMedicines] = useState([]);
//   const [slotLevels, setSlotLevels] = useState({
//     M1: 0,
//     M2: 0,
//     M3: 0,
//     M4: 0,
//   });
//   const [slotForm, setSlotForm] = useState({
//     M1: 0,
//     M2: 0,
//     M3: 0,
//     M4: 0,
//   });

//   const [editForm, setEditForm] = useState({
//     medicineName: "",
//     slotNumber: 1,
//     quantity: 10,
//     dosageCount: 1,
//     time1: "08:00",
//     time2: "",
//     frequencyPerDay: 1,
//     period: "Morning",
//   });

//   useEffect(() => {
//     const unsubReq = onValue(ref(db, `${activeRoot}/requests`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data)
//         .map((key) => ({ id: key, ...data[key] }))
//         .filter((r) => r.caretakerUid === profile.uid);
//       setRequests(arr);
//     });

//     const unsubUsers = onValue(ref(db, `${activeRoot}/users`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data)
//         .map((key) => ({ uid: key, ...data[key] }))
//         .filter((u) => u.caretakerUid === profile.uid && u.status === "accepted");
//       setAcceptedUsers(arr);
//     });

//     const slotUnsubs = SLOT_KEYS.map((slotKey) =>
//       onValue(ref(db, `${activeRoot}/${slotKey}`), (snap) => {
//         const value = Number(snap.val() || 0);
//         setSlotLevels((prev) => ({ ...prev, [slotKey]: value }));
//         setSlotForm((prev) => ({ ...prev, [slotKey]: value }));
//       })
//     );

//     return () => {
//       unsubReq();
//       unsubUsers();
//       slotUnsubs.forEach((fn) => fn && fn());
//     };
//   }, [profile.uid, activeRoot]);

//   useEffect(() => {
//     if (!selectedUser) {
//       setUserMedicines([]);
//       return;
//     }

//     const unsubMeds = onValue(ref(db, `${activeRoot}/medicines/${selectedUser}`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
//       setUserMedicines(arr);
//     });

//     return () => unsubMeds();
//   }, [selectedUser, activeRoot]);

//   const updateRequestStatus = async (req, status) => {
//     await update(ref(db, `${activeRoot}/requests/${req.id}`), {
//       status,
//       updatedAt: nowTs(),
//     });

//     await update(ref(db, `${activeRoot}/users/${req.userUid}`), {
//       status,
//       caretakerUid: profile.uid,
//     });

//     await createAlert(
//       req.userUid,
//       "Account Approval Update",
//       `Your request was marked as ${status} by caretaker ${profile.name}`,
//       activeRoot
//     );

//     await logEvent(
//       req.userUid,
//       {
//         type: "ACCOUNT_STATUS",
//         medicineName: "",
//         slotNumber: "",
//         message: `Caretaker changed account status to ${status}`,
//       },
//       activeRoot
//     );

//     showPopup("Request Updated", `${req.userName} marked as ${status}`, "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE CARETAKER UPDATE
// User: ${req.userName}
// Caretaker: ${profile.name}
// Status: ${status}`
//     );
//   };

//   const addMedicineToUser = async () => {
//     if (!selectedUser) {
//       alert("Please select accepted user.");
//       return;
//     }

//     if (!editForm.medicineName.trim()) {
//       alert("Please enter medicine name.");
//       return;
//     }

//     const times = [editForm.time1, editForm.time2]
//       .filter(Boolean)
//       .slice(0, Number(editForm.frequencyPerDay));

//     const medRef = push(ref(db, `${activeRoot}/medicines/${selectedUser}`));

//     await set(medRef, {
//       medicineName: editForm.medicineName.trim(),
//       slotNumber: Number(editForm.slotNumber),
//       quantity: Number(editForm.quantity),
//       dosageCount: Number(editForm.dosageCount),
//       frequencyPerDay: Number(editForm.frequencyPerDay),
//       period: editForm.period,
//       times: sortTimes(times),
//       active: true,
//       lastTakenAt: 0,
//       lowStockAlertSent: false,
//       emptyAlertSent: false,
//       createdAt: nowTs(),
//       updatedAt: nowTs(),
//       addedByCaretaker: true,
//       caretakerUid: profile.uid,
//     });

//     await createAlert(
//       selectedUser,
//       "Medicine Plan Updated",
//       `Caretaker ${profile.name} updated your medicine schedule`,
//       activeRoot
//     );

//     await logEvent(
//       selectedUser,
//       {
//         type: "PLAN_UPDATED_BY_CARETAKER",
//         medicineName: editForm.medicineName.trim(),
//         slotNumber: Number(editForm.slotNumber),
//         message: "Medicine plan added by caretaker",
//       },
//       activeRoot
//     );

//     showPopup("Plan Saved", "Medicine plan added remotely.", "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE PLAN UPDATED
// Caretaker: ${profile.name}
// Medicine: ${editForm.medicineName.trim()}
// Times: ${times.join(", ")}`
//     );
//   };

//   const refillUserMedicine = async (med) => {
//     await update(ref(db, `${activeRoot}/medicines/${selectedUser}/${med.id}`), {
//       quantity: Number(med.quantity) + 10,
//       lowStockAlertSent: false,
//       emptyAlertSent: false,
//       updatedAt: nowTs(),
//     });

//     await createAlert(
//       selectedUser,
//       "Refill Updated",
//       `${med.medicineName} refilled by caretaker`,
//       activeRoot
//     );

//     await logEvent(
//       selectedUser,
//       {
//         type: "REFILL_BY_CARETAKER",
//         medicineName: med.medicineName,
//         slotNumber: med.slotNumber,
//         message: "Caretaker refilled +10 tablets",
//       },
//       activeRoot
//     );

//     showPopup("Refill Done", `${med.medicineName} refilled.`, "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE REFILL BY CARETAKER
// Caretaker: ${profile.name}
// Medicine: ${med.medicineName}
// Slot: ${med.slotNumber}
// Added tablets: 10`
//     );
//   };

//   const updateRootSlot = async (slotKey) => {
//     try {
//       const newValue = Math.max(0, Number(slotForm[slotKey] || 0));
//       await set(ref(db, `${activeRoot}/${slotKey}`), newValue);
//       showPopup("Slot Updated", `${slotKey} changed to ${newValue}`, "success");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update slot.");
//     }
//   };

//   return (
//     <div style={styles.dashboardGrid}>
//       <div style={styles.mainColumn}>
//         <SectionCard
//           title={`Caretaker Dashboard - ${profile.name}`}
//           subtitle="Monitor and manage linked users"
//         >
//           <div style={styles.statsGrid}>
//             <StatBox label="Email" value={profile.email} />
//             <StatBox label="Role" value={profile.role} />
//             <StatBox label="Accepted Users" value={acceptedUsers.length} />
//             <StatBox
//               label="Pending Requests"
//               value={requests.filter((r) => r.status === "pending").length}
//             />
//           </div>
//         </SectionCard>

//         <SectionCard title="Global Slot Monitor" subtitle="M1, M2, M3, M4 realtime status">
//           <div style={styles.slotGrid}>
//             {SLOT_KEYS.map((slotKey) => (
//               <SlotCard
//                 key={slotKey}
//                 slotKey={slotKey}
//                 value={slotLevels[slotKey]}
//                 pulse={false}
//               />
//             ))}
//           </div>
//         </SectionCard>

//         <SectionCard title="Update Global Slot Levels" subtitle="Change root slot values directly">
//           <div style={styles.slotControlGrid}>
//             {SLOT_KEYS.map((slotKey) => (
//               <div key={slotKey} style={styles.slotControlCard}>
//                 <div style={styles.slotControlTitle}>{slotKey}</div>
//                 <Input
//                   label="Tablet Count"
//                   type="number"
//                   min="0"
//                   max={MAX_SLOT_CAPACITY}
//                   value={slotForm[slotKey]}
//                   onChange={(e) =>
//                     setSlotForm((prev) => ({
//                       ...prev,
//                       [slotKey]: e.target.value,
//                     }))
//                   }
//                 />
//                 <div style={styles.slotControlMeta}>
//                   Refill needed: {getSlotRefillNeeded(slotForm[slotKey])}
//                 </div>
//                 <button
//                   style={styles.primaryBtn}
//                   onClick={() => updateRootSlot(slotKey)}
//                 >
//                   Update {slotKey}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </SectionCard>

//         <SectionCard title="User Approval Requests" subtitle="Accept, reject or keep pending">
//           <div style={styles.feedList}>
//             {requests.length === 0 ? (
//               <div style={styles.emptyBox}>No requests found</div>
//             ) : (
//               requests.map((req) => (
//                 <div key={req.id} style={styles.requestCard}>
//                   <div>
//                     <div style={styles.feedTitle}>{req.userName}</div>
//                     <div style={styles.feedText}>User ID: {req.userUid}</div>
//                     <div style={styles.feedText}>Status: {req.status}</div>
//                   </div>

//                   <div style={styles.inlineActions}>
//                     <button style={styles.successBtn} onClick={() => updateRequestStatus(req, "accepted")}>
//                       Accept
//                     </button>
//                     <button style={styles.dangerBtn} onClick={() => updateRequestStatus(req, "rejected")}>
//                       Reject
//                     </button>
//                     <button style={styles.secondaryBtn} onClick={() => updateRequestStatus(req, "pending")}>
//                       Pending
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </SectionCard>

//         <SectionCard title="Remote Medicine Plan" subtitle="Add or modify medicine plan for selected user">
//           <div style={styles.grid3}>
//             <Select
//               label="Select Accepted User"
//               value={selectedUser}
//               onChange={(e) => setSelectedUser(e.target.value)}
//             >
//               <option value="">Choose user</option>
//               {acceptedUsers.map((u) => (
//                 <option key={u.uid} value={u.uid}>
//                   {u.name} ({u.email})
//                 </option>
//               ))}
//             </Select>

//             <Input
//               label="Medicine Name"
//               value={editForm.medicineName}
//               onChange={(e) => setEditForm({ ...editForm, medicineName: e.target.value })}
//             />
//             <Input
//               label="Slot Number"
//               type="number"
//               value={editForm.slotNumber}
//               onChange={(e) => setEditForm({ ...editForm, slotNumber: Math.min(e.target.value, MAX_SLOT_CAPACITY) })}
//               max={MAX_SLOT_CAPACITY}
//             />
//             <Input
//               label="Quantity"
//               type="number"
//               value={editForm.quantity}
//               onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
//             />
//             <Input
//               label="Dosage Count"
//               type="number"
//               value={editForm.dosageCount}
//               onChange={(e) => setEditForm({ ...editForm, dosageCount: e.target.value })}
//             />
//             <Select
//               label="Frequency Per Day"
//               value={editForm.frequencyPerDay}
//               onChange={(e) => setEditForm({ ...editForm, frequencyPerDay: e.target.value })}
//             >
//               <option value={1}>1</option>
//               <option value={2}>2</option>
//             </Select>
//             <Select
//               label="Schedule Type"
//               value={editForm.period}
//               onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
//             >
//               <option>Morning</option>
//               <option>Afternoon</option>
//               <option>Evening</option>
//               <option>Night</option>
//               <option>Custom</option>
//             </Select>
//             <Input
//               label="Time 1"
//               type="time"
//               value={editForm.time1}
//               onChange={(e) => setEditForm({ ...editForm, time1: e.target.value })}
//             />
//             <Input
//               label="Time 2"
//               type="time"
//               value={editForm.time2}
//               onChange={(e) => setEditForm({ ...editForm, time2: e.target.value })}
//             />
//           </div>

//           <div style={styles.spaceTop}>
//             <button style={styles.primaryBtn} onClick={addMedicineToUser}>
//               Save Remote Plan
//             </button>
//           </div>
//         </SectionCard>
//       </div>

//       <div style={styles.sideColumn}>
//         <SectionCard title="Selected User Medicines" subtitle="Live medicine details">
//           {!selectedUser ? (
//             <div style={styles.emptyBox}>Select an accepted user to view medicines</div>
//           ) : (
//             <div style={styles.tableWrap}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}>Medicine</th>
//                     <th style={styles.th}>Slot</th>
//                     <th style={styles.th}>Qty</th>
//                     <th style={styles.th}>Times</th>
//                     <th style={styles.th}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {userMedicines.length === 0 ? (
//                     <tr>
//                       <td colSpan="5" style={styles.noData}>No medicines found</td>
//                     </tr>
//                   ) : (
//                     userMedicines.map((med) => (
//                       <tr key={med.id}>
//                         <td style={styles.td}>{med.medicineName}</td>
//                         <td style={styles.td}>{med.slotNumber}</td>
//                         <td style={styles.td}>{med.quantity}</td>
//                         <td style={styles.td}>{(med.times || []).join(", ")}</td>
//                         <td style={styles.td}>
//                           <button style={styles.secondaryBtn} onClick={() => refillUserMedicine(med)}>
//                             Refill +10
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </SectionCard>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    STYLES
// ========================================================= */
// const styles = {
//   app: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #050816 0%, #0c1426 40%, #08101d 100%)",
//     color: "#e6eefc",
//     fontFamily:
//       'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
//     position: "relative",
//     overflow: "hidden",
//   },
//   bgA: {
//     position: "absolute",
//     top: -120,
//     left: -100,
//     width: 320,
//     height: 320,
//     borderRadius: "50%",
//     background: "rgba(59,130,246,0.15)",
//     filter: "blur(90px)",
//   },
//   bgB: {
//     position: "absolute",
//     right: -120,
//     bottom: -120,
//     width: 360,
//     height: 360,
//     borderRadius: "50%",
//     background: "rgba(6,182,212,0.12)",
//     filter: "blur(110px)",
//   },
//   bgC: {
//     position: "absolute",
//     top: "35%",
//     left: "45%",
//     width: 240,
//     height: 240,
//     borderRadius: "50%",
//     background: "rgba(34,197,94,0.08)",
//     filter: "blur(100px)",
//   },
//   container: {
//     position: "relative",
//     zIndex: 2,
//     maxWidth: 1460,
//     margin: "0 auto",
//     padding: "28px 20px 40px",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     gap: 24,
//     alignItems: "flex-start",
//     flexWrap: "wrap",
//     marginBottom: 26,
//   },
//   kicker: {
//     display: "inline-flex",
//     padding: "8px 14px",
//     borderRadius: 999,
//     background: "rgba(255,255,255,0.06)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     color: "#8ac5ff",
//     fontSize: 12,
//     fontWeight: 800,
//     textTransform: "uppercase",
//     letterSpacing: 0.8,
//     marginBottom: 14,
//   },
//   mainTitle: {
//     margin: 0,
//     fontSize: "clamp(28px, 4vw, 48px)",
//     lineHeight: 1.08,
//     fontWeight: 900,
//     maxWidth: 980,
//   },
//   logoutBtn: {
//     border: "none",
//     background: "linear-gradient(135deg, #ef4444, #b91c1c)",
//     color: "#fff",
//     padding: "12px 20px",
//     borderRadius: 14,
//     fontWeight: 800,
//     cursor: "pointer",
//     boxShadow: "0 14px 28px rgba(239,68,68,0.2)",
//   },
//   authLayout: {
//     display: "grid",
//     gridTemplateColumns: "1fr",
//     gap: 24,
//     minHeight: "70vh",
//     maxWidth: 520,
//     margin: "0 auto",
//   },
//   authRight: {
//     display: "flex",
//     alignItems: "center",
//   },
//   authPanel: {
//     width: "100%",
//     borderRadius: 30,
//     padding: 30,
//     background: "rgba(10,16,28,0.96)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     boxShadow: "0 24px 70px rgba(0,0,0,0.30)",
//   },
//   roleSwitch: {
//     display: "inline-flex",
//     padding: 6,
//     gap: 6,
//     borderRadius: 16,
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.06)",
//     marginBottom: 18,
//   },
//   roleSwitchBtn: {
//     border: "none",
//     background: "transparent",
//     color: "#b7c8e1",
//     padding: "11px 18px",
//     borderRadius: 12,
//     fontWeight: 700,
//     cursor: "pointer",
//   },
//   roleSwitchActive: {
//     border: "none",
//     background: "linear-gradient(135deg, #2563eb, #06b6d4)",
//     color: "#fff",
//     padding: "11px 18px",
//     borderRadius: 12,
//     fontWeight: 800,
//     cursor: "pointer",
//     boxShadow: "0 14px 30px rgba(37,99,235,0.24)",
//   },
//   authTitle: {
//     margin: "0 0 8px",
//     fontSize: 30,
//     fontWeight: 900,
//     color: "#fff",
//   },
//   authSubtitle: {
//     margin: "0 0 20px",
//     color: "#9fb2cf",
//   },
//   formGridSingle: {
//     display: "grid",
//     gap: 16,
//   },
//   field: {
//     display: "grid",
//     gap: 8,
//   },
//   label: {
//     fontSize: 13,
//     fontWeight: 700,
//     color: "#bfd3ef",
//   },
//   input: {
//     height: 50,
//     borderRadius: 14,
//     border: "1px solid rgba(255,255,255,0.10)",
//     background: "rgba(255,255,255,0.04)",
//     color: "#fff",
//     padding: "0 14px",
//     outline: "none",
//   },
//   select: {
//     height: 50,
//     borderRadius: 14,
//     border: "1px solid rgba(255,255,255,0.10)",
//     background: "#101828",
//     color: "#fff",
//     padding: "0 14px",
//     outline: "none",
//   },
//   primaryAction: {
//     marginTop: 6,
//     height: 50,
//     borderRadius: 14,
//     border: "none",
//     background: "linear-gradient(135deg, #2563eb, #0891b2)",
//     color: "#fff",
//     fontWeight: 800,
//     cursor: "pointer",
//     boxShadow: "0 18px 35px rgba(37,99,235,0.22)",
//   },
//   secondaryAction: {
//     height: 48,
//     borderRadius: 14,
//     border: "1px solid rgba(255,255,255,0.10)",
//     background: "rgba(255,255,255,0.03)",
//     color: "#d8e5f8",
//     fontWeight: 700,
//     cursor: "pointer",
//   },
//   dashboardGrid: {
//     display: "grid",
//     gridTemplateColumns: "2fr 1fr",
//     gap: 24,
//   },
//   mainColumn: { minWidth: 0 },
//   sideColumn: { minWidth: 0 },
//   card: {
//     background: "rgba(10,16,28,0.94)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     borderRadius: 24,
//     padding: 22,
//     boxShadow: "0 22px 60px rgba(0,0,0,0.22)",
//     marginBottom: 20,
//   },
//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     gap: 14,
//     alignItems: "flex-start",
//     flexWrap: "wrap",
//     marginBottom: 16,
//   },
//   cardTitle: {
//     margin: 0,
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: 900,
//   },
//   cardSubtitle: {
//     margin: "6px 0 0",
//     color: "#97aac8",
//     fontSize: 13,
//   },
//   statsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(2, 1fr)",
//     gap: 14,
//   },
//   statBox: {
//     padding: 16,
//     borderRadius: 18,
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.06)",
//   },
//   statLabel: {
//     color: "#8eb4dd",
//     fontSize: 12,
//     fontWeight: 800,
//     letterSpacing: 0.6,
//     textTransform: "uppercase",
//     marginBottom: 8,
//   },
//   statValue: {
//     color: "#fff",
//     fontWeight: 800,
//     lineHeight: 1.6,
//   },
//   grid2: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: 16,
//   },
//   grid3: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: 16,
//   },
//   spaceTop: {
//     marginTop: 18,
//   },
//   primaryBtn: {
//     border: "none",
//     background: "linear-gradient(135deg, #2563eb, #06b6d4)",
//     color: "#fff",
//     padding: "12px 18px",
//     borderRadius: 14,
//     fontWeight: 800,
//     cursor: "pointer",
//     boxShadow: "0 18px 35px rgba(37,99,235,0.22)",
//   },
//   secondaryBtn: {
//     border: "1px solid rgba(255,255,255,0.10)",
//     background: "rgba(255,255,255,0.04)",
//     color: "#e9f1ff",
//     padding: "10px 14px",
//     borderRadius: 12,
//     fontWeight: 700,
//     cursor: "pointer",
//   },
//   successBtn: {
//     border: "none",
//     background: "linear-gradient(135deg, #16a34a, #15803d)",
//     color: "#fff",
//     padding: "10px 14px",
//     borderRadius: 12,
//     fontWeight: 800,
//     cursor: "pointer",
//   },
//   dangerBtn: {
//     border: "none",
//     background: "linear-gradient(135deg, #ef4444, #b91c1c)",
//     color: "#fff",
//     padding: "10px 14px",
//     borderRadius: 12,
//     fontWeight: 800,
//     cursor: "pointer",
//   },
//   inlineActions: {
//     display: "flex",
//     gap: 8,
//     flexWrap: "wrap",
//   },
//   tableWrap: {
//     overflowX: "auto",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "separate",
//     borderSpacing: "0 10px",
//   },
//   th: {
//     textAlign: "left",
//     padding: "0 12px 8px",
//     color: "#89a8d1",
//     fontSize: 12,
//     textTransform: "uppercase",
//     letterSpacing: 0.7,
//   },
//   td: {
//     background: "rgba(255,255,255,0.04)",
//     borderTop: "1px solid rgba(255,255,255,0.06)",
//     borderBottom: "1px solid rgba(255,255,255,0.06)",
//     padding: 14,
//     color: "#fff",
//   },
//   noData: {
//     padding: 20,
//     textAlign: "center",
//     color: "#a9bdd8",
//     background: "rgba(255,255,255,0.03)",
//     borderRadius: 14,
//   },
//   feedList: {
//     display: "grid",
//     gap: 12,
//     maxHeight: 760,
//     overflowY: "auto",
//   },
//   feedCard: {
//     padding: 14,
//     borderRadius: 16,
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.06)",
//   },
//   feedTitle: {
//     color: "#fff",
//     fontWeight: 800,
//     marginBottom: 6,
//   },
//   feedText: {
//     color: "#bfd1e9",
//     lineHeight: 1.6,
//     fontSize: 14,
//   },
//   feedTime: {
//     color: "#8da5c6",
//     fontSize: 12,
//   },
//   requestCard: {
//     padding: 16,
//     borderRadius: 18,
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.06)",
//     display: "flex",
//     justifyContent: "space-between",
//     gap: 16,
//     alignItems: "center",
//     flexWrap: "wrap",
//   },
//   emptyBox: {
//     padding: 16,
//     borderRadius: 16,
//     background: "rgba(255,255,255,0.04)",
//     border: "1px dashed rgba(255,255,255,0.08)",
//     color: "#abc1dd",
//   },
//   rowBetween: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 12,
//     flexWrap: "wrap",
//   },
//   popup: {
//     position: "fixed",
//     right: 20,
//     bottom: 20,
//     width: 340,
//     background: "#0f172a",
//     color: "#fff",
//     padding: 18,
//     borderRadius: 18,
//     boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
//     zIndex: 9999,
//   },
//   popupTitle: {
//     fontWeight: 900,
//     marginBottom: 8,
//     fontSize: 16,
//   },
//   popupMessage: {
//     color: "#d5e2f7",
//     lineHeight: 1.6,
//   },
//   loaderWrap: {
//     minHeight: "100vh",
//     display: "grid",
//     placeItems: "center",
//     background: "#08111f",
//     padding: 20,
//   },
//   loaderCard: {
//     width: 380,
//     maxWidth: "100%",
//     padding: 28,
//     borderRadius: 24,
//     background: "rgba(10,16,28,0.96)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     textAlign: "center",
//   },
//   loaderText: {
//     color: "#9fb2cf",
//     marginTop: 10,
//   },
//   spinner: {
//     width: 54,
//     height: 54,
//     borderRadius: "50%",
//     border: "4px solid rgba(255,255,255,0.10)",
//     borderTopColor: "#38bdf8",
//     margin: "0 auto 18px",
//     animation: "spin 1s linear infinite",
//   },

//   slotGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: 16,
//   },
//   slotCard: {
//     position: "relative",
//     borderRadius: 22,
//     padding: 18,
//     background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
//     border: "1px solid rgba(255,255,255,0.08)",
//     overflow: "hidden",
//     transition: "transform 0.35s ease, box-shadow 0.35s ease",
//   },
//   slotCardPulse: {
//     transform: "translateY(-4px) scale(1.02)",
//   },
//   slotTopRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 12,
//   },
//   slotTitle: {
//     fontSize: 20,
//     fontWeight: 900,
//     color: "#fff",
//   },
//   slotBigNumber: {
//     fontSize: 44,
//     fontWeight: 900,
//     lineHeight: 1,
//     marginBottom: 8,
//   },
//   slotSmallText: {
//     color: "#9db3d3",
//     fontSize: 13,
//     marginBottom: 14,
//   },
//   slotProgressTrack: {
//     height: 12,
//     borderRadius: 999,
//     background: "rgba(255,255,255,0.08)",
//     overflow: "hidden",
//     marginBottom: 14,
//   },
//   slotProgressFill: {
//     height: "100%",
//     borderRadius: 999,
//     transition: "width 0.5s ease",
//   },
//   slotInfoGrid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: 10,
//   },
//   slotInfoBox: {
//     padding: 12,
//     borderRadius: 14,
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.06)",
//   },
//   slotInfoLabel: {
//     fontSize: 11,
//     color: "#8ea9cb",
//     textTransform: "uppercase",
//     letterSpacing: 0.6,
//     marginBottom: 6,
//     fontWeight: 800,
//   },
//   slotInfoValue: {
//     fontSize: 18,
//     fontWeight: 800,
//     color: "#fff",
//   },
//   slotControlGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: 16,
//   },
//   slotControlCard: {
//     padding: 16,
//     borderRadius: 20,
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.08)",
//   },
//   slotControlTitle: {
//     fontSize: 20,
//     fontWeight: 900,
//     marginBottom: 12,
//     color: "#fff",
//   },
//   slotControlMeta: {
//     fontSize: 13,
//     color: "#9fb3d1",
//     marginBottom: 12,
//   },
// };




// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   setPersistence,
//   browserSessionPersistence,
// } from "firebase/auth";
// import {
//   getDatabase,
//   ref,
//   set,
//   push,
//   onValue,
//   update,
//   get,
// } from "firebase/database";
// import "./App.css";

// /* ================= FIREBASE ================= */
// const firebaseConfig = {
//   apiKey: "AIzaSyB9ererNsNonAzH0zQo_GS79XPOyCoMxr4",
//   authDomain: "waterdtection.firebaseapp.com",
//   databaseURL: "https://waterdtection-default-rtdb.firebaseio.com",
//   projectId: "waterdtection",
//   storageBucket: "waterdtection.firebasestorage.app",
//   messagingSenderId: "690886375729",
//   appId: "1:690886375729:web:172c3a47dda6585e4e1810",
//   measurementId: "G-TXF33Y6XY0",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getDatabase(app);

// /* ================= ROOT PATH ================= */
// const ROOT = "Smart_Medicen";
// const LEGACY_ROOT = "Smart_Medicine";

// /* ================= TELEGRAM ================= */
// const TELEGRAM_BOT_TOKEN = "8601802887:AAFqEXZ6YlHFzCp5jOJlBafLvV2OLMbWzUg";
// const TELEGRAM_CHAT_IDS = ["6333513741"];

// /* ================= SLOT SETTINGS ================= */
// const SLOT_KEYS = ["M1", "M2", "M3", "M4"];
// const DEFAULT_SLOT_CAPACITY = 5;
// const LOW_STOCK_LIMIT = 2;

// /* ================= HELPERS ================= */
// const nowTs = () => Date.now();

// const formatDateTime = (ts) => (ts ? new Date(ts).toLocaleString() : "-");

// function normalizeSlot(slot) {
//   const s = String(slot || "").toUpperCase().replace("SLOT", "").trim();
//   if (["M1", "M2", "M3", "M4"].includes(s)) return s;
//   if (["1", "2", "3", "4"].includes(s)) return `M${s}`;
//   return "M1";
// }

// function timeStringToTodayTimestamp(timeStr) {
//   const [h, m] = String(timeStr || "00:00").split(":").map(Number);
//   const d = new Date();
//   d.setHours(h || 0, m || 0, 0, 0);
//   return d.getTime();
// }

// function getNextOccurrence(timeStr) {
//   const ts = timeStringToTodayTimestamp(timeStr);
//   return ts >= Date.now() ? ts : ts + 24 * 60 * 60 * 1000;
// }

// function sortTimes(times = []) {
//   return [...times].sort(
//     (a, b) => timeStringToTodayTimestamp(a) - timeStringToTodayTimestamp(b)
//   );
// }

// function statusColor(status) {
//   if (status === "accepted") return "#16a34a";
//   if (status === "rejected") return "#dc2626";
//   return "#f59e0b";
// }

// function logTypeColor(type) {
//   if (type?.includes("TAKEN") || type === "DISPENSED") return "#16a34a";
//   if (type?.includes("LOW")) return "#f59e0b";
//   if (type?.includes("EMPTY") || type?.includes("MISSED")) return "#dc2626";
//   if (type?.includes("REFILL")) return "#2563eb";
//   if (type?.includes("ACCOUNT")) return "#06b6d4";
//   return "#7c3aed";
// }

// function getSlotStatus(value, capacity = DEFAULT_SLOT_CAPACITY) {
//   const v = Number(value || 0);
//   if (v <= 0) return { text: "FULL", color: "#16a34a" };
//   if (v >= capacity) return { text: "EMPTY", color: "#dc2626" };
//   if (capacity - v <= LOW_STOCK_LIMIT) return { text: "LOW", color: "#f59e0b" };
//   return { text: "AVAILABLE", color: "#2563eb" };
// }

// function playBeep(duration = 650, frequency = 850) {
//   try {
//     const AudioCtx = window.AudioContext || window.webkitAudioContext;
//     const ctx = new AudioCtx();
//     const oscillator = ctx.createOscillator();
//     const gain = ctx.createGain();

//     oscillator.type = "sine";
//     oscillator.frequency.value = frequency;
//     oscillator.connect(gain);
//     gain.connect(ctx.destination);
//     oscillator.start();

//     gain.gain.setValueAtTime(0.12, ctx.currentTime);
//     gain.gain.exponentialRampToValueAtTime(
//       0.0001,
//       ctx.currentTime + duration / 1000
//     );

//     setTimeout(() => {
//       oscillator.stop();
//       ctx.close();
//     }, duration + 80);
//   } catch (err) {
//     console.log("Beep blocked:", err);
//   }
// }

// async function sendTelegramMessage(text) {
//   for (const chatId of TELEGRAM_CHAT_IDS) {
//     try {
//       await fetch(
//         `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ chat_id: chatId, text }),
//         }
//       );
//     } catch (err) {
//       console.error("Telegram failed:", err);
//     }
//   }
// }

// async function createAlert(userUid, title, message, activeRoot = ROOT) {
//   const alertRef = push(ref(db, `${activeRoot}/alerts/${userUid}`));
//   await set(alertRef, {
//     title,
//     message,
//     timestamp: nowTs(),
//     seen: false,
//   });
// }

// async function logEvent(userUid, payload, activeRoot = ROOT) {
//   const logRef = push(ref(db, `${activeRoot}/logs/${userUid}`));
//   await set(logRef, {
//     ...payload,
//     timestamp: nowTs(),
//   });
// }

// async function ensureSlotNodes(activeRoot = ROOT) {
//   const snap = await get(ref(db, activeRoot));
//   const data = snap.val() || {};
//   const missing = {};

//   SLOT_KEYS.forEach((slot) => {
//     if (data[slot] === undefined || data[slot] === null) {
//       missing[slot] = 0;
//     }
//   });

//   if (Object.keys(missing).length > 0) {
//     await update(ref(db, activeRoot), missing);
//   }
// }

// function getFirebaseError(err) {
//   const code = err?.code || "";
//   if (code.includes("auth/email-already-in-use")) return "This email is already registered.";
//   if (code.includes("auth/invalid-email")) return "Invalid email address.";
//   if (code.includes("auth/weak-password")) return "Password should be at least 6 characters.";
//   if (code.includes("auth/invalid-credential")) return "Invalid email or password.";
//   if (code.includes("auth/user-not-found")) return "User account not found.";
//   if (code.includes("auth/wrong-password")) return "Wrong password.";
//   if (code.includes("auth/network-request-failed")) return "Network error. Please check internet.";
//   return err?.message || "Something went wrong.";
// }

// async function getProfileFromAnyRoot(uid) {
//   const userSnap = await get(ref(db, `${ROOT}/users/${uid}`));
//   if (userSnap.exists()) {
//     return { root: ROOT, role: "user", data: userSnap.val() };
//   }

//   const caretakerSnap = await get(ref(db, `${ROOT}/caretakers/${uid}`));
//   if (caretakerSnap.exists()) {
//     return { root: ROOT, role: "caretaker", data: caretakerSnap.val() };
//   }

//   const legacyUserSnap = await get(ref(db, `${LEGACY_ROOT}/users/${uid}`));
//   if (legacyUserSnap.exists()) {
//     return { root: LEGACY_ROOT, role: "user", data: legacyUserSnap.val() };
//   }

//   const legacyCaretakerSnap = await get(ref(db, `${LEGACY_ROOT}/caretakers/${uid}`));
//   if (legacyCaretakerSnap.exists()) {
//     return { root: LEGACY_ROOT, role: "caretaker", data: legacyCaretakerSnap.val() };
//   }

//   return null;
// }

// /* ================= SMALL COMPONENTS ================= */
// function Input({ label, ...props }) {
//   return (
//     <div className="field">
//       <label>{label}</label>
//       <input {...props} />
//     </div>
//   );
// }

// function Select({ label, children, ...props }) {
//   return (
//     <div className="field">
//       <label>{label}</label>
//       <select {...props}>{children}</select>
//     </div>
//   );
// }

// function Badge({ text, color = "#2563eb" }) {
//   return (
//     <span className="badge" style={{ color, borderColor: `${color}55`, background: `${color}18` }}>
//       <span style={{ background: color }} />
//       {text}
//     </span>
//   );
// }

// function SectionCard({ title, subtitle, right, children }) {
//   return (
//     <section className="card">
//       <div className="card-header">
//         <div>
//           <h3>{title}</h3>
//           {subtitle && <p>{subtitle}</p>}
//         </div>
//         {right}
//       </div>
//       {children}
//     </section>
//   );
// }

// function StatBox({ label, value }) {
//   return (
//     <div className="stat-box">
//       <div className="stat-label">{label}</div>
//       <div className="stat-value">{value}</div>
//     </div>
//   );
// }

// /* ================= APP ================= */
// export default function App() {
//   const [authReady, setAuthReady] = useState(false);
//   const [authUser, setAuthUser] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [mode, setMode] = useState("login");
//   const [roleTab, setRoleTab] = useState("user");
//   const [busy, setBusy] = useState(false);
//   const [popup, setPopup] = useState(null);
//   const [forceLoginScreen, setForceLoginScreen] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (user) => {
//       try {
//         if (forceLoginScreen) {
//           setAuthUser(null);
//           setProfile(null);
//           setAuthReady(true);
//           return;
//         }

//         if (!user) {
//           setAuthUser(null);
//           setProfile(null);
//           setAuthReady(true);
//           return;
//         }

//         const foundProfile = await getProfileFromAnyRoot(user.uid);

//         if (foundProfile) {
//           setAuthUser(user);
//           setProfile({
//             uid: user.uid,
//             root: foundProfile.root,
//             role: foundProfile.role,
//             ...foundProfile.data,
//           });
//           await ensureSlotNodes(foundProfile.root);
//         } else {
//           await signOut(auth);
//           setAuthUser(null);
//           setProfile(null);
//         }
//       } catch (err) {
//         console.error(err);
//         setAuthUser(null);
//         setProfile(null);
//       } finally {
//         setAuthReady(true);
//       }
//     });

//     return () => unsub();
//   }, [forceLoginScreen]);

//   const showPopup = (title, message, tone = "danger") => {
//     setPopup({ title, message, tone });
//     playBeep();
//     setTimeout(() => setPopup(null), 4500);
//   };

//   const handleRegister = async () => {
//     if (!form.name || !form.email || !form.password) {
//       alert("Please fill name, email and password.");
//       return;
//     }

//     setBusy(true);
//     try {
//       setForceLoginScreen(true);
//       await setPersistence(auth, browserSessionPersistence);

//       const cred = await createUserWithEmailAndPassword(
//         auth,
//         form.email.trim(),
//         form.password
//       );

//       const uid = cred.user.uid;

//       if (roleTab === "user") {
//         await set(ref(db, `${ROOT}/users/${uid}`), {
//           role: "user",
//           name: form.name.trim(),
//           email: form.email.trim(),
//           phone: form.phone.trim(),
//           status: "pending",
//           caretakerUid: "",
//           createdAt: nowTs(),
//         });
//       } else {
//         await set(ref(db, `${ROOT}/caretakers/${uid}`), {
//           role: "caretaker",
//           name: form.name.trim(),
//           email: form.email.trim(),
//           phone: form.phone.trim(),
//           createdAt: nowTs(),
//         });
//       }

//       await ensureSlotNodes(ROOT);
//       await signOut(auth);

//       setForm({ name: "", email: "", password: "", phone: "" });
//       setMode("login");
//       setAuthUser(null);
//       setProfile(null);

//       showPopup("Registration Successful", "Account created. Please login now.", "success");

//       setTimeout(() => {
//         setForceLoginScreen(false);
//       }, 300);
//     } catch (err) {
//       console.error(err);
//       setForceLoginScreen(false);
//       alert(getFirebaseError(err));
//     } finally {
//       setBusy(false);
//     }
//   };

//   const handleLogin = async () => {
//     if (!form.email || !form.password) {
//       alert("Please enter email and password.");
//       return;
//     }

//     setBusy(true);
//     try {
//       setForceLoginScreen(false);
//       await setPersistence(auth, browserSessionPersistence);

//       const res = await signInWithEmailAndPassword(
//         auth,
//         form.email.trim(),
//         form.password
//       );

//       const foundProfile = await getProfileFromAnyRoot(res.user.uid);

//       if (!foundProfile) {
//         await signOut(auth);
//         alert("Login succeeded, but no profile exists in Firebase.");
//         return;
//       }

//       setAuthUser(res.user);
//       setProfile({
//         uid: res.user.uid,
//         root: foundProfile.root,
//         role: foundProfile.role,
//         ...foundProfile.data,
//       });

//       await ensureSlotNodes(foundProfile.root);
//       setForm({ name: "", email: "", password: "", phone: "" });
//     } catch (err) {
//       console.error(err);
//       alert(getFirebaseError(err));
//     } finally {
//       setBusy(false);
//     }
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     setAuthUser(null);
//     setProfile(null);
//     setMode("login");
//   };

//   if (!authReady) {
//     return (
//       <div className="loader-wrap">
//         <div className="loader-card">
//           <div className="spinner" />
//           <h2>Loading Smart Medicine System</h2>
//           <p>Checking login session...</p>
//         </div>
//       </div>
//     );
//   }

//   const showAuthScreen = forceLoginScreen || !authUser || !profile;

//   return (
//     <div className="app">
//       <div className="bg bg-a" />
//       <div className="bg bg-b" />
//       <div className="bg bg-c" />

//       <div className="container">
//         <header className="header">
//           <div>
//             <div className="kicker">Healthcare Platform</div>
//             <h1>Smart Medicine Reminder and Tablet Dispensing Dashboard</h1>
//           </div>

//           {!showAuthScreen && (
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           )}
//         </header>

//         {showAuthScreen ? (
//           <AuthScreen
//             roleTab={roleTab}
//             setRoleTab={setRoleTab}
//             mode={mode}
//             setMode={setMode}
//             form={form}
//             setForm={setForm}
//             handleLogin={handleLogin}
//             handleRegister={handleRegister}
//             busy={busy}
//           />
//         ) : profile.role === "user" ? (
//           <UserDashboard
//             profile={profile}
//             showPopup={showPopup}
//             setProfile={setProfile}
//           />
//         ) : (
//           <CaretakerDashboard profile={profile} showPopup={showPopup} />
//         )}
//       </div>

//       {popup && (
//         <div className={`popup ${popup.tone}`}>
//           <div className="popup-title">{popup.title}</div>
//           <div className="popup-message">{popup.message}</div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ================= AUTH SCREEN ================= */
// function AuthScreen({
//   roleTab,
//   setRoleTab,
//   mode,
//   setMode,
//   form,
//   setForm,
//   handleLogin,
//   handleRegister,
//   busy,
// }) {
//   return (
//     <div className="auth-layout">
//       <div className="auth-panel">
//         <div className="role-switch">
//           <button
//             type="button"
//             className={roleTab === "user" ? "active" : ""}
//             onClick={() => setRoleTab("user")}
//           >
//             User
//           </button>
//           <button
//             type="button"
//             className={roleTab === "caretaker" ? "active" : ""}
//             onClick={() => setRoleTab("caretaker")}
//           >
//             Caretaker
//           </button>
//         </div>

//         <h2>{mode === "login" ? "Sign in to continue" : "Create your account"}</h2>
//         <p>{mode === "login" ? `Login as ${roleTab}` : `Register as ${roleTab}`}</p>

//         <div className="form-grid-single">
//           {mode === "register" && (
//             <>
//               <Input
//                 label="Full Name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 placeholder="Enter full name"
//               />
//               <Input
//                 label="Phone Number"
//                 value={form.phone}
//                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 placeholder="Enter phone number"
//               />
//             </>
//           )}

//           <Input
//             label="Email"
//             type="email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             placeholder="Enter email"
//           />

//           <Input
//             label="Password"
//             type="password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             placeholder="Enter password"
//           />

//           <button
//             type="button"
//             className="primary-action"
//             onClick={mode === "login" ? handleLogin : handleRegister}
//             disabled={busy}
//           >
//             {busy
//               ? "Please wait..."
//               : mode === "login"
//               ? `Login as ${roleTab}`
//               : `Register as ${roleTab}`}
//           </button>

//           <button
//             type="button"
//             className="secondary-action"
//             onClick={() => setMode(mode === "login" ? "register" : "login")}
//             disabled={busy}
//           >
//             {mode === "login" ? "Create new account" : "Back to login"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= USER DASHBOARD ================= */
// function UserDashboard({ profile, showPopup, setProfile }) {
//   const activeRoot = profile.root || ROOT;

//   const [slotLevels, setSlotLevels] = useState({
//     M1: 0,
//     M2: 0,
//     M3: 0,
//     M4: 0,
//   });

//   const [medicines, setMedicines] = useState([]);
//   const [logs, setLogs] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [caretakers, setCaretakers] = useState([]);
//   const [selectedCaretaker, setSelectedCaretaker] = useState("");
//   const reminderLockRef = useRef({});

//   const [medicineForm, setMedicineForm] = useState({
//     medicineName: "",
//     slotKey: "M1",
//     capacity: 5,
//     morningCount: 1,
//     afternoonCount: 0,
//     eveningCount: 0,
//     nightCount: 0,
//     morningTime: "08:00",
//     afternoonTime: "13:00",
//     eveningTime: "18:00",
//     nightTime: "21:00",
//   });

//   const [takeForm, setTakeForm] = useState({
//     slotKey: "M1",
//     takeCount: 1,
//     period: "Morning",
//   });

//   useEffect(() => {
//     ensureSlotNodes(activeRoot);

//     const unsubSlots = onValue(ref(db, activeRoot), (snap) => {
//       const data = snap.val() || {};
//       setSlotLevels({
//         M1: Number(data.M1 || 0),
//         M2: Number(data.M2 || 0),
//         M3: Number(data.M3 || 0),
//         M4: Number(data.M4 || 0),
//       });
//     });

//     const unsubMeds = onValue(ref(db, `${activeRoot}/medicines/${profile.uid}`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data).map((key) => ({
//         id: key,
//         ...data[key],
//         slotKey: normalizeSlot(data[key].slotKey || data[key].slotNumber || key),
//       }));
//       setMedicines(arr);
//     });

//     const unsubLogs = onValue(ref(db, `${activeRoot}/logs/${profile.uid}`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data)
//         .map((key) => ({ id: key, ...data[key] }))
//         .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
//       setLogs(arr);
//     });

//     const unsubAlerts = onValue(ref(db, `${activeRoot}/alerts/${profile.uid}`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data)
//         .map((key) => ({ id: key, ...data[key] }))
//         .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
//       setAlerts(arr);
//     });

//     const unsubCare = onValue(ref(db, `${activeRoot}/caretakers`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data).map((key) => ({ uid: key, ...data[key] }));
//       setCaretakers(arr);
//     });

//     const unsubProfile = onValue(ref(db, `${activeRoot}/users/${profile.uid}`), (snap) => {
//       if (snap.exists()) {
//         setProfile((prev) => ({ ...prev, ...snap.val(), root: activeRoot }));
//       }
//     });

//     return () => {
//       unsubSlots();
//       unsubMeds();
//       unsubLogs();
//       unsubAlerts();
//       unsubCare();
//       unsubProfile();
//     };
//   }, [profile.uid, setProfile, activeRoot]);

//   useEffect(() => {
//     if (profile.status !== "accepted") return;

//     const interval = setInterval(async () => {
//       for (const med of medicines) {
//         if (!med.active) continue;

//         for (const t of med.times || []) {
//           const scheduleTs = timeStringToTodayTimestamp(t);
//           const diffMin = Math.floor((Date.now() - scheduleTs) / 60000);
//           const key = `${med.id}_${t}_${new Date().toLocaleDateString()}`;

//           if (diffMin >= 0 && diffMin <= 1 && !reminderLockRef.current[`${key}_due`]) {
//             reminderLockRef.current[`${key}_due`] = true;

//             const msg = `Medicine time now: ${med.medicineName} (${med.slotKey}) at ${t}`;
//             showPopup("Medicine Reminder", msg, "info");

//             await createAlert(profile.uid, "Medicine Reminder", msg, activeRoot);
//             await logEvent(
//               profile.uid,
//               {
//                 type: "REMINDER",
//                 medicineName: med.medicineName,
//                 slotNumber: med.slotKey,
//                 message: msg,
//               },
//               activeRoot
//             );

//             await sendTelegramMessage(
//               `SMART MEDICINE REMINDER
// User: ${profile.name}
// Medicine: ${med.medicineName}
// Slot: ${med.slotKey}
// Time: ${t}`
//             );
//           }

//           if (diffMin > 30 && !reminderLockRef.current[`${key}_missed`]) {
//             reminderLockRef.current[`${key}_missed`] = true;

//             const msg = `Missed medicine: ${med.medicineName} (${med.slotKey}) scheduled at ${t}`;
//             showPopup("Missed Dose Alert", msg, "danger");

//             await createAlert(profile.uid, "Missed Dose Alert", msg, activeRoot);
//             await logEvent(
//               profile.uid,
//               {
//                 type: "MISSED",
//                 medicineName: med.medicineName,
//                 slotNumber: med.slotKey,
//                 message: msg,
//               },
//               activeRoot
//             );

//             await sendTelegramMessage(
//               `SMART MEDICINE MISSED ALERT
// User: ${profile.name}
// Medicine: ${med.medicineName}
// Slot: ${med.slotKey}
// Scheduled: ${t}`
//             );
//           }
//         }
//       }
//     }, 15000);

//     return () => clearInterval(interval);
//   }, [medicines, profile, showPopup, activeRoot]);

//   const nextDose = useMemo(() => {
//     const upcoming = [];

//     medicines.forEach((med) => {
//       if (!med.active) return;
//       (med.times || []).forEach((timeStr) => {
//         upcoming.push({
//           medicineName: med.medicineName,
//           slotKey: med.slotKey,
//           nextTs: getNextOccurrence(timeStr),
//         });
//       });
//     });

//     upcoming.sort((a, b) => a.nextTs - b.nextTs);
//     return upcoming[0] || null;
//   }, [medicines]);

//   const selectedMedicine = useMemo(() => {
//     return medicines.find((m) => normalizeSlot(m.slotKey) === takeForm.slotKey);
//   }, [medicines, takeForm.slotKey]);

//   const requestCaretaker = async () => {
//     if (!selectedCaretaker) {
//       alert("Please select caretaker.");
//       return;
//     }

//     const caretaker = caretakers.find((c) => c.uid === selectedCaretaker);
//     if (!caretaker) {
//       alert("Selected caretaker not found.");
//       return;
//     }

//     const reqRef = push(ref(db, `${activeRoot}/requests`));

//     await set(reqRef, {
//       userUid: profile.uid,
//       caretakerUid: caretaker.uid,
//       userName: profile.name,
//       caretakerName: caretaker.name,
//       status: "pending",
//       createdAt: nowTs(),
//     });

//     await update(ref(db, `${activeRoot}/users/${profile.uid}`), {
//       caretakerUid: caretaker.uid,
//       status: "pending",
//     });

//     setProfile((prev) => ({
//       ...prev,
//       caretakerUid: caretaker.uid,
//       status: "pending",
//       root: activeRoot,
//     }));

//     showPopup("Request Sent", `Request sent to ${caretaker.name}`, "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE REQUEST
// User: ${profile.name}
// Requested caretaker: ${caretaker.name}
// Status: pending`
//     );
//   };

//   const addMedicine = async () => {
//     if (profile.status !== "accepted") {
//       alert("Your account is not accepted by caretaker yet.");
//       return;
//     }

//     if (!medicineForm.medicineName.trim()) {
//       alert("Please enter medicine name.");
//       return;
//     }

//     const slotKey = normalizeSlot(medicineForm.slotKey);
//     const capacity = Number(medicineForm.capacity || DEFAULT_SLOT_CAPACITY);

//     const scheduleItems = [
//       {
//         period: "Morning",
//         count: Number(medicineForm.morningCount || 0),
//         time: medicineForm.morningTime,
//       },
//       {
//         period: "Afternoon",
//         count: Number(medicineForm.afternoonCount || 0),
//         time: medicineForm.afternoonTime,
//       },
//       {
//         period: "Evening",
//         count: Number(medicineForm.eveningCount || 0),
//         time: medicineForm.eveningTime,
//       },
//       {
//         period: "Night",
//         count: Number(medicineForm.nightCount || 0),
//         time: medicineForm.nightTime,
//       },
//     ].filter((item) => item.count > 0 && item.time);

//     if (!scheduleItems.length) {
//       alert("Please add at least one timing with tablet count.");
//       return;
//     }

//     const currentSlotValue = Number(slotLevels[slotKey] || 0);
//     const remaining = Math.max(0, capacity - currentSlotValue);

//     await set(ref(db, `${activeRoot}/medicines/${profile.uid}/${slotKey}`), {
//       medicineName: medicineForm.medicineName.trim(),
//       slotKey,
//       slotNumber: slotKey,
//       capacity,
//       quantity: remaining,
//       remaining,
//       takenSinceRefill: currentSlotValue,
//       totalTaken: 0,
//       dailyTabletCount: scheduleItems.reduce((sum, item) => sum + item.count, 0),
//       scheduleItems,
//       times: sortTimes(scheduleItems.map((item) => item.time)),
//       active: true,
//       lastTakenAt: 0,
//       lowStockAlertSent: false,
//       emptyAlertSent: false,
//       createdAt: nowTs(),
//       updatedAt: nowTs(),
//     });

//     await update(ref(db, activeRoot), {
//       [slotKey]: currentSlotValue,
//     });

//     await logEvent(
//       profile.uid,
//       {
//         type: "MEDICINE_ADDED",
//         medicineName: medicineForm.medicineName.trim(),
//         slotNumber: slotKey,
//         message: `${medicineForm.medicineName.trim()} added in ${slotKey}`,
//       },
//       activeRoot
//     );

//     showPopup("Medicine Added", "Medicine slot saved successfully.", "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE PLAN ADDED
// User: ${profile.name}
// Medicine: ${medicineForm.medicineName.trim()}
// Slot: ${slotKey}
// Capacity: ${capacity}
// Timings: ${scheduleItems.map((i) => `${i.period}-${i.count} at ${i.time}`).join(", ")}`
//     );
//   };

//   const takeMedicine = async () => {
//     if (profile.status !== "accepted") {
//       alert("Your account is not accepted by caretaker yet.");
//       return;
//     }

//     const slotKey = normalizeSlot(takeForm.slotKey);
//     const takeCount = Number(takeForm.takeCount || 0);

//     if (takeCount <= 0) {
//       alert("Please enter valid tablet count.");
//       return;
//     }

//     const med = medicines.find((m) => normalizeSlot(m.slotKey) === slotKey);

//     if (!med) {
//       alert(`No medicine configured in ${slotKey}.`);
//       return;
//     }

//     const capacity = Number(med.capacity || DEFAULT_SLOT_CAPACITY);
//     const currentSlotValue = Number(slotLevels[slotKey] || 0);

//     if (currentSlotValue >= capacity) {
//       alert(`${slotKey} is already empty.`);
//       return;
//     }

//     const newSlotValue = Math.min(capacity, currentSlotValue + takeCount);
//     const actualTaken = newSlotValue - currentSlotValue;
//     const remaining = Math.max(0, capacity - newSlotValue);

//     await update(ref(db, activeRoot), {
//       [slotKey]: newSlotValue,
//     });

//     await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${slotKey}`), {
//       quantity: remaining,
//       remaining,
//       takenSinceRefill: newSlotValue,
//       totalTaken: Number(med.totalTaken || 0) + actualTaken,
//       lastTakenCount: actualTaken,
//       lastTakenPeriod: takeForm.period,
//       lastTakenAt: nowTs(),
//       lowStockAlertSent: remaining <= LOW_STOCK_LIMIT && remaining > 0,
//       emptyAlertSent: remaining <= 0,
//       updatedAt: nowTs(),
//     });

//     const msg = `${actualTaken} tablet(s) taken from ${slotKey}. Remaining: ${remaining}`;

//     await createAlert(profile.uid, "Medicine Taken", msg, activeRoot);

//     await logEvent(
//       profile.uid,
//       {
//         type: "MEDICINE_TAKEN",
//         medicineName: med.medicineName,
//         slotNumber: slotKey,
//         takenNow: actualTaken,
//         takenSinceRefill: newSlotValue,
//         remaining,
//         message: msg,
//       },
//       activeRoot
//     );

//     showPopup("Medicine Taken", msg, "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE TAKEN
// User: ${profile.name}
// Medicine: ${med.medicineName}
// Slot: ${slotKey}
// Period: ${takeForm.period}
// Taken Now: ${actualTaken}
// Firebase ${slotKey} Value: ${newSlotValue}
// Remaining: ${remaining}`
//     );

//     if (remaining <= LOW_STOCK_LIMIT && remaining > 0) {
//       const lowMsg = `Low stock: ${med.medicineName} in ${slotKey}. Remaining ${remaining}`;
//       showPopup("Low Stock Alert", lowMsg, "danger");

//       await createAlert(profile.uid, "Low Stock Alert", lowMsg, activeRoot);
//       await logEvent(
//         profile.uid,
//         {
//           type: "LOW_STOCK",
//           medicineName: med.medicineName,
//           slotNumber: slotKey,
//           remaining,
//           message: lowMsg,
//         },
//         activeRoot
//       );

//       await sendTelegramMessage(
//         `SMART MEDICINE LOW STOCK
// User: ${profile.name}
// Medicine: ${med.medicineName}
// Slot: ${slotKey}
// Remaining: ${remaining}`
//       );
//     }

//     if (remaining <= 0) {
//       const emptyMsg = `${slotKey} is empty for ${med.medicineName}`;
//       showPopup("Empty Slot Alert", emptyMsg, "danger");

//       await createAlert(profile.uid, "Empty Slot Alert", emptyMsg, activeRoot);
//       await logEvent(
//         profile.uid,
//         {
//           type: "EMPTY_SLOT",
//           medicineName: med.medicineName,
//           slotNumber: slotKey,
//           remaining,
//           message: emptyMsg,
//         },
//         activeRoot
//       );

//       await sendTelegramMessage(
//         `SMART MEDICINE EMPTY SLOT
// User: ${profile.name}
// Medicine: ${med.medicineName}
// Slot: ${slotKey} is empty`
//       );
//     }
//   };

//   const refillMedicine = async (slotKeyInput) => {
//     const slotKey = normalizeSlot(slotKeyInput);
//     const med = medicines.find((m) => normalizeSlot(m.slotKey) === slotKey);
//     const capacity = Number(med?.capacity || DEFAULT_SLOT_CAPACITY);

//     await update(ref(db, activeRoot), {
//       [slotKey]: 0,
//     });

//     if (med) {
//       await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${slotKey}`), {
//         quantity: capacity,
//         remaining: capacity,
//         takenSinceRefill: 0,
//         lowStockAlertSent: false,
//         emptyAlertSent: false,
//         lastRefilledAt: nowTs(),
//         updatedAt: nowTs(),
//       });
//     }

//     const msg = `${slotKey} refilled. Firebase ${slotKey} value set to 0.`;

//     await createAlert(profile.uid, "Refill Updated", msg, activeRoot);

//     await logEvent(
//       profile.uid,
//       {
//         type: "REFILL",
//         medicineName: med?.medicineName || "Not assigned",
//         slotNumber: slotKey,
//         remaining: capacity,
//         message: msg,
//       },
//       activeRoot
//     );

//     showPopup("Refill Updated", msg, "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE REFILL
// User: ${profile.name}
// Medicine: ${med?.medicineName || "Not assigned"}
// Slot: ${slotKey}
// Firebase ${slotKey} Value: 0
// Remaining: ${capacity}`
//     );
//   };

//   return (
//     <div className="dashboard-grid">
//       <div className="main-column">
//         <SectionCard
//           title={`Welcome, ${profile.name}`}
//           subtitle="User dashboard overview"
//           right={<Badge text={(profile.status || "pending").toUpperCase()} color={statusColor(profile.status)} />}
//         >
//           <div className="stats-grid">
//             <StatBox label="Email" value={profile.email} />
//             <StatBox label="Role" value={profile.role} />
//             <StatBox label="Created" value={formatDateTime(profile.createdAt)} />
//             <StatBox
//               label="Next Dose"
//               value={
//                 nextDose
//                   ? `${nextDose.medicineName} | ${nextDose.slotKey} | ${new Date(nextDose.nextTs).toLocaleString()}`
//                   : "No schedule"
//               }
//             />
//           </div>
//         </SectionCard>

//         <SectionCard title="Caretaker Approval" subtitle="Send request to caretaker">
//           <div className="grid-2">
//             <Select
//               label="Select Caretaker"
//               value={selectedCaretaker}
//               onChange={(e) => setSelectedCaretaker(e.target.value)}
//             >
//               <option value="">Choose caretaker</option>
//               {caretakers.map((c) => (
//                 <option key={c.uid} value={c.uid}>
//                   {c.name} ({c.email})
//                 </option>
//               ))}
//             </Select>

//             <div className="approval-box">
//               <span>Current Status</span>
//               <Badge text={(profile.status || "pending").toUpperCase()} color={statusColor(profile.status)} />
//             </div>
//           </div>

//           <button className="primary-btn mt" onClick={requestCaretaker}>
//             Send Request
//           </button>
//         </SectionCard>

//         <SectionCard title="Live Medicine Slots" subtitle="0 = full/refilled, 5 = empty">
//           <div className="slot-grid">
//             {SLOT_KEYS.map((slot) => {
//               const med = medicines.find((m) => normalizeSlot(m.slotKey) === slot);
//               const capacity = Number(med?.capacity || DEFAULT_SLOT_CAPACITY);
//               const value = Number(slotLevels[slot] || 0);
//               const remaining = Math.max(0, capacity - value);
//               const status = getSlotStatus(value, capacity);

//               return (
//                 <div className="slot-card" key={slot}>
//                   <div className="slot-top">
//                     <h2>{slot}</h2>
//                     <Badge text={status.text} color={status.color} />
//                   </div>
//                   <p className="slot-medicine">{med?.medicineName || "No medicine assigned"}</p>
//                   <div className="slot-numbers">
//                     <span>Firebase: {value}</span>
//                     <span>Left: {remaining}</span>
//                   </div>
//                   <button className="warning-btn" onClick={() => refillMedicine(slot)}>
//                     Refill → Set {slot}=0
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </SectionCard>

//         <SectionCard title="Medicine Setup" subtitle="Add medicine name, slot, daily timings and tablet count">
//           <div className="grid-3">
//             <Input
//               label="Medicine Name"
//               value={medicineForm.medicineName}
//               onChange={(e) => setMedicineForm({ ...medicineForm, medicineName: e.target.value })}
//               placeholder="Paracetamol"
//             />

//             <Select
//               label="Slot"
//               value={medicineForm.slotKey}
//               onChange={(e) => setMedicineForm({ ...medicineForm, slotKey: e.target.value })}
//             >
//               {SLOT_KEYS.map((slot) => (
//                 <option key={slot} value={slot}>{slot}</option>
//               ))}
//             </Select>

//             <Input
//               label="Slot Capacity"
//               type="number"
//               min="1"
//               value={medicineForm.capacity}
//               onChange={(e) => setMedicineForm({ ...medicineForm, capacity: e.target.value })}
//             />
//           </div>

//           <div className="timing-grid">
//             <div className="timing-box">
//               <h4>Morning</h4>
//               <Input
//                 label="Tablets"
//                 type="number"
//                 min="0"
//                 value={medicineForm.morningCount}
//                 onChange={(e) => setMedicineForm({ ...medicineForm, morningCount: e.target.value })}
//               />
//               <Input
//                 label="Time"
//                 type="time"
//                 value={medicineForm.morningTime}
//                 onChange={(e) => setMedicineForm({ ...medicineForm, morningTime: e.target.value })}
//               />
//             </div>

//             <div className="timing-box">
//               <h4>Afternoon</h4>
//               <Input
//                 label="Tablets"
//                 type="number"
//                 min="0"
//                 value={medicineForm.afternoonCount}
//                 onChange={(e) => setMedicineForm({ ...medicineForm, afternoonCount: e.target.value })}
//               />
//               <Input
//                 label="Time"
//                 type="time"
//                 value={medicineForm.afternoonTime}
//                 onChange={(e) => setMedicineForm({ ...medicineForm, afternoonTime: e.target.value })}
//               />
//             </div>

//             <div className="timing-box">
//               <h4>Evening</h4>
//               <Input
//                 label="Tablets"
//                 type="number"
//                 min="0"
//                 value={medicineForm.eveningCount}
//                 onChange={(e) => setMedicineForm({ ...medicineForm, eveningCount: e.target.value })}
//               />
//               <Input
//                 label="Time"
//                 type="time"
//                 value={medicineForm.eveningTime}
//                 onChange={(e) => setMedicineForm({ ...medicineForm, eveningTime: e.target.value })}
//               />
//             </div>

//             <div className="timing-box">
//               <h4>Night</h4>
//               <Input
//                 label="Tablets"
//                 type="number"
//                 min="0"
//                 value={medicineForm.nightCount}
//                 onChange={(e) => setMedicineForm({ ...medicineForm, nightCount: e.target.value })}
//               />
//               <Input
//                 label="Time"
//                 type="time"
//                 value={medicineForm.nightTime}
//                 onChange={(e) => setMedicineForm({ ...medicineForm, nightTime: e.target.value })}
//               />
//             </div>
//           </div>

//           <button className="primary-btn mt" onClick={addMedicine}>
//             Save Medicine Slot
//           </button>
//         </SectionCard>

//         <SectionCard title="Take Medicine" subtitle="Select slot and tablet count. Firebase slot value will update.">
//           <div className="grid-4">
//             <Select
//               label="Slot"
//               value={takeForm.slotKey}
//               onChange={(e) => setTakeForm({ ...takeForm, slotKey: e.target.value })}
//             >
//               {SLOT_KEYS.map((slot) => (
//                 <option key={slot} value={slot}>{slot}</option>
//               ))}
//             </Select>

//             <Select
//               label="Period"
//               value={takeForm.period}
//               onChange={(e) => setTakeForm({ ...takeForm, period: e.target.value })}
//             >
//               <option>Morning</option>
//               <option>Afternoon</option>
//               <option>Evening</option>
//               <option>Night</option>
//               <option>Custom</option>
//             </Select>

//             <Input
//               label="How many tablets?"
//               type="number"
//               min="1"
//               value={takeForm.takeCount}
//               onChange={(e) => setTakeForm({ ...takeForm, takeCount: e.target.value })}
//             />

//             <button className="success-btn take-btn" onClick={takeMedicine}>
//               Take Medicine
//             </button>
//           </div>

//           {selectedMedicine && (
//             <div className="selected-info">
//               <b>{selectedMedicine.medicineName}</b>
//               <span>Slot: {selectedMedicine.slotKey}</span>
//               <span>Remaining: {selectedMedicine.remaining}</span>
//               <span>Taken Since Refill: {selectedMedicine.takenSinceRefill}</span>
//             </div>
//           )}
//         </SectionCard>

//         <SectionCard title="Medicine Details" subtitle="Which slot contains which medicine">
//           <div className="table-wrap">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Slot</th>
//                   <th>Medicine</th>
//                   <th>Capacity</th>
//                   <th>Firebase Value</th>
//                   <th>Remaining</th>
//                   <th>Daily Schedule</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {medicines.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="no-data">No medicines added yet</td>
//                   </tr>
//                 ) : (
//                   medicines.map((med) => {
//                     const slot = normalizeSlot(med.slotKey);
//                     const value = Number(slotLevels[slot] || 0);
//                     const capacity = Number(med.capacity || DEFAULT_SLOT_CAPACITY);
//                     const remaining = Math.max(0, capacity - value);
//                     const status = getSlotStatus(value, capacity);

//                     return (
//                       <tr key={med.id}>
//                         <td>{slot}</td>
//                         <td>{med.medicineName}</td>
//                         <td>{capacity}</td>
//                         <td>{value}</td>
//                         <td>
//                           <Badge text={`${remaining} LEFT`} color={status.color} />
//                         </td>
//                         <td>
//                           {(med.scheduleItems || []).map((s, i) => (
//                             <div key={i}>
//                               {s.period}: {s.count} tab at {s.time}
//                             </div>
//                           ))}
//                         </td>
//                         <td>
//                           <button className="warning-btn small" onClick={() => refillMedicine(slot)}>
//                             Refill
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </SectionCard>
//       </div>

//       <div className="side-column">
//         <SectionCard title="Alerts" subtitle="Recent notifications">
//           <div className="feed-list">
//             {alerts.length === 0 ? (
//               <div className="empty-box">No alerts available</div>
//             ) : (
//               alerts.slice(0, 10).map((a) => (
//                 <div key={a.id} className="feed-card">
//                   <div className="feed-title">{a.title}</div>
//                   <div className="feed-text">{a.message}</div>
//                   <div className="feed-time">{formatDateTime(a.timestamp)}</div>
//                 </div>
//               ))
//             )}
//           </div>
//         </SectionCard>

//         <SectionCard title="History / Logs" subtitle="Taken, refill and stock history">
//           <div className="feed-list">
//             {logs.length === 0 ? (
//               <div className="empty-box">No history found</div>
//             ) : (
//               logs.slice(0, 20).map((log) => (
//                 <div key={log.id} className="feed-card">
//                   <div className="row-between">
//                     <Badge text={log.type} color={logTypeColor(log.type)} />
//                     <span className="feed-time">{formatDateTime(log.timestamp)}</span>
//                   </div>
//                   <div className="feed-title mt-sm">{log.medicineName || "System"}</div>
//                   <div className="feed-text">{log.message}</div>
//                 </div>
//               ))
//             )}
//           </div>
//         </SectionCard>
//       </div>
//     </div>
//   );
// }

// /* ================= CARETAKER DASHBOARD ================= */
// function CaretakerDashboard({ profile, showPopup }) {
//   const activeRoot = profile.root || ROOT;

//   const [slotLevels, setSlotLevels] = useState({
//     M1: 0,
//     M2: 0,
//     M3: 0,
//     M4: 0,
//   });

//   const [requests, setRequests] = useState([]);
//   const [acceptedUsers, setAcceptedUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [userMedicines, setUserMedicines] = useState([]);
//   const [userLogs, setUserLogs] = useState([]);

//   const [editForm, setEditForm] = useState({
//     medicineName: "",
//     slotKey: "M1",
//     capacity: 5,
//     morningCount: 1,
//     afternoonCount: 0,
//     eveningCount: 0,
//     nightCount: 0,
//     morningTime: "08:00",
//     afternoonTime: "13:00",
//     eveningTime: "18:00",
//     nightTime: "21:00",
//   });

//   useEffect(() => {
//     ensureSlotNodes(activeRoot);

//     const unsubSlots = onValue(ref(db, activeRoot), (snap) => {
//       const data = snap.val() || {};
//       setSlotLevels({
//         M1: Number(data.M1 || 0),
//         M2: Number(data.M2 || 0),
//         M3: Number(data.M3 || 0),
//         M4: Number(data.M4 || 0),
//       });
//     });

//     const unsubReq = onValue(ref(db, `${activeRoot}/requests`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data)
//         .map((key) => ({ id: key, ...data[key] }))
//         .filter((r) => r.caretakerUid === profile.uid)
//         .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
//       setRequests(arr);
//     });

//     const unsubUsers = onValue(ref(db, `${activeRoot}/users`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data)
//         .map((key) => ({ uid: key, ...data[key] }))
//         .filter((u) => u.caretakerUid === profile.uid && u.status === "accepted");
//       setAcceptedUsers(arr);
//     });

//     return () => {
//       unsubSlots();
//       unsubReq();
//       unsubUsers();
//     };
//   }, [profile.uid, activeRoot]);

//   useEffect(() => {
//     if (!selectedUser) {
//       setUserMedicines([]);
//       setUserLogs([]);
//       return;
//     }

//     const unsubMeds = onValue(ref(db, `${activeRoot}/medicines/${selectedUser}`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data).map((key) => ({
//         id: key,
//         ...data[key],
//         slotKey: normalizeSlot(data[key].slotKey || data[key].slotNumber || key),
//       }));
//       setUserMedicines(arr);
//     });

//     const unsubLogs = onValue(ref(db, `${activeRoot}/logs/${selectedUser}`), (snap) => {
//       const data = snap.val() || {};
//       const arr = Object.keys(data)
//         .map((key) => ({ id: key, ...data[key] }))
//         .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
//       setUserLogs(arr);
//     });

//     return () => {
//       unsubMeds();
//       unsubLogs();
//     };
//   }, [selectedUser, activeRoot]);

//   const selectedUserData = acceptedUsers.find((u) => u.uid === selectedUser);

//   const updateRequestStatus = async (req, status) => {
//     await update(ref(db, `${activeRoot}/requests/${req.id}`), {
//       status,
//       updatedAt: nowTs(),
//     });

//     await update(ref(db, `${activeRoot}/users/${req.userUid}`), {
//       status,
//       caretakerUid: profile.uid,
//     });

//     await createAlert(
//       req.userUid,
//       "Account Approval Update",
//       `Your request was marked as ${status} by caretaker ${profile.name}`,
//       activeRoot
//     );

//     await logEvent(
//       req.userUid,
//       {
//         type: "ACCOUNT_STATUS",
//         medicineName: "",
//         slotNumber: "",
//         message: `Caretaker changed account status to ${status}`,
//       },
//       activeRoot
//     );

//     showPopup("Request Updated", `${req.userName} marked as ${status}`, "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE CARETAKER UPDATE
// User: ${req.userName}
// Caretaker: ${profile.name}
// Status: ${status}`
//     );
//   };

//   const addMedicineToUser = async () => {
//     if (!selectedUser) {
//       alert("Please select accepted user.");
//       return;
//     }

//     if (!editForm.medicineName.trim()) {
//       alert("Please enter medicine name.");
//       return;
//     }

//     const slotKey = normalizeSlot(editForm.slotKey);
//     const capacity = Number(editForm.capacity || DEFAULT_SLOT_CAPACITY);

//     const scheduleItems = [
//       {
//         period: "Morning",
//         count: Number(editForm.morningCount || 0),
//         time: editForm.morningTime,
//       },
//       {
//         period: "Afternoon",
//         count: Number(editForm.afternoonCount || 0),
//         time: editForm.afternoonTime,
//       },
//       {
//         period: "Evening",
//         count: Number(editForm.eveningCount || 0),
//         time: editForm.eveningTime,
//       },
//       {
//         period: "Night",
//         count: Number(editForm.nightCount || 0),
//         time: editForm.nightTime,
//       },
//     ].filter((item) => item.count > 0 && item.time);

//     if (!scheduleItems.length) {
//       alert("Please add at least one timing with tablet count.");
//       return;
//     }

//     const currentSlotValue = Number(slotLevels[slotKey] || 0);
//     const remaining = Math.max(0, capacity - currentSlotValue);

//     await set(ref(db, `${activeRoot}/medicines/${selectedUser}/${slotKey}`), {
//       medicineName: editForm.medicineName.trim(),
//       slotKey,
//       slotNumber: slotKey,
//       capacity,
//       quantity: remaining,
//       remaining,
//       takenSinceRefill: currentSlotValue,
//       totalTaken: 0,
//       dailyTabletCount: scheduleItems.reduce((sum, item) => sum + item.count, 0),
//       scheduleItems,
//       times: sortTimes(scheduleItems.map((item) => item.time)),
//       active: true,
//       lastTakenAt: 0,
//       lowStockAlertSent: false,
//       emptyAlertSent: false,
//       createdAt: nowTs(),
//       updatedAt: nowTs(),
//       addedByCaretaker: true,
//       caretakerUid: profile.uid,
//     });

//     await createAlert(
//       selectedUser,
//       "Medicine Plan Updated",
//       `Caretaker ${profile.name} updated your ${slotKey} medicine schedule`,
//       activeRoot
//     );

//     await logEvent(
//       selectedUser,
//       {
//         type: "PLAN_UPDATED_BY_CARETAKER",
//         medicineName: editForm.medicineName.trim(),
//         slotNumber: slotKey,
//         message: `Medicine plan added by caretaker in ${slotKey}`,
//       },
//       activeRoot
//     );

//     showPopup("Plan Saved", "Medicine plan added remotely.", "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE PLAN UPDATED
// Caretaker: ${profile.name}
// User: ${selectedUserData?.name || selectedUser}
// Medicine: ${editForm.medicineName.trim()}
// Slot: ${slotKey}
// Timings: ${scheduleItems.map((i) => `${i.period}-${i.count} at ${i.time}`).join(", ")}`
//     );
//   };

//   const refillUserMedicine = async (med) => {
//     if (!selectedUser) return;

//     const slotKey = normalizeSlot(med.slotKey);
//     const capacity = Number(med.capacity || DEFAULT_SLOT_CAPACITY);

//     await update(ref(db, activeRoot), {
//       [slotKey]: 0,
//     });

//     await update(ref(db, `${activeRoot}/medicines/${selectedUser}/${slotKey}`), {
//       quantity: capacity,
//       remaining: capacity,
//       takenSinceRefill: 0,
//       lowStockAlertSent: false,
//       emptyAlertSent: false,
//       lastRefilledAt: nowTs(),
//       updatedAt: nowTs(),
//     });

//     const msg = `${slotKey} refilled by caretaker. Firebase ${slotKey} value set to 0.`;

//     await createAlert(selectedUser, "Refill Updated", msg, activeRoot);

//     await logEvent(
//       selectedUser,
//       {
//         type: "REFILL_BY_CARETAKER",
//         medicineName: med.medicineName,
//         slotNumber: slotKey,
//         remaining: capacity,
//         message: msg,
//       },
//       activeRoot
//     );

//     showPopup("Refill Done", msg, "success");

//     await sendTelegramMessage(
//       `SMART MEDICINE REFILL BY CARETAKER
// Caretaker: ${profile.name}
// User: ${selectedUserData?.name || selectedUser}
// Medicine: ${med.medicineName}
// Slot: ${slotKey}
// Firebase ${slotKey} Value: 0
// Remaining: ${capacity}`
//     );
//   };

//   return (
//     <div className="dashboard-grid">
//       <div className="main-column">
//         <SectionCard title={`Caretaker Dashboard - ${profile.name}`} subtitle="Monitor and manage linked users">
//           <div className="stats-grid">
//             <StatBox label="Email" value={profile.email} />
//             <StatBox label="Role" value={profile.role} />
//             <StatBox label="Accepted Users" value={acceptedUsers.length} />
//             <StatBox label="Pending Requests" value={requests.filter((r) => r.status === "pending").length} />
//           </div>
//         </SectionCard>

//         <SectionCard title="User Approval Requests" subtitle="Accept, reject or keep pending">
//           <div className="feed-list">
//             {requests.length === 0 ? (
//               <div className="empty-box">No requests found</div>
//             ) : (
//               requests.map((req) => (
//                 <div key={req.id} className="request-card">
//                   <div>
//                     <div className="feed-title">{req.userName}</div>
//                     <div className="feed-text">Caretaker: {req.caretakerName}</div>
//                     <div className="feed-text">Status: {req.status}</div>
//                     <div className="feed-time">{formatDateTime(req.createdAt)}</div>
//                   </div>

//                   <div className="inline-actions">
//                     <button className="success-btn" onClick={() => updateRequestStatus(req, "accepted")}>
//                       Accept
//                     </button>
//                     <button className="danger-btn" onClick={() => updateRequestStatus(req, "rejected")}>
//                       Reject
//                     </button>
//                     <button className="secondary-btn" onClick={() => updateRequestStatus(req, "pending")}>
//                       Pending
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </SectionCard>

//         <SectionCard title="Remote Medicine Plan" subtitle="Add or update medicine schedule for selected user">
//           <div className="grid-3">
//             <Select label="Select Accepted User" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
//               <option value="">Choose user</option>
//               {acceptedUsers.map((u) => (
//                 <option key={u.uid} value={u.uid}>
//                   {u.name} ({u.email})
//                 </option>
//               ))}
//             </Select>

//             <Input
//               label="Medicine Name"
//               value={editForm.medicineName}
//               onChange={(e) => setEditForm({ ...editForm, medicineName: e.target.value })}
//             />

//             <Select
//               label="Slot"
//               value={editForm.slotKey}
//               onChange={(e) => setEditForm({ ...editForm, slotKey: e.target.value })}
//             >
//               {SLOT_KEYS.map((slot) => (
//                 <option key={slot} value={slot}>{slot}</option>
//               ))}
//             </Select>

//             <Input
//               label="Slot Capacity"
//               type="number"
//               min="1"
//               value={editForm.capacity}
//               onChange={(e) => setEditForm({ ...editForm, capacity: e.target.value })}
//             />
//           </div>

//           <div className="timing-grid">
//             <div className="timing-box">
//               <h4>Morning</h4>
//               <Input label="Tablets" type="number" min="0" value={editForm.morningCount} onChange={(e) => setEditForm({ ...editForm, morningCount: e.target.value })} />
//               <Input label="Time" type="time" value={editForm.morningTime} onChange={(e) => setEditForm({ ...editForm, morningTime: e.target.value })} />
//             </div>

//             <div className="timing-box">
//               <h4>Afternoon</h4>
//               <Input label="Tablets" type="number" min="0" value={editForm.afternoonCount} onChange={(e) => setEditForm({ ...editForm, afternoonCount: e.target.value })} />
//               <Input label="Time" type="time" value={editForm.afternoonTime} onChange={(e) => setEditForm({ ...editForm, afternoonTime: e.target.value })} />
//             </div>

//             <div className="timing-box">
//               <h4>Evening</h4>
//               <Input label="Tablets" type="number" min="0" value={editForm.eveningCount} onChange={(e) => setEditForm({ ...editForm, eveningCount: e.target.value })} />
//               <Input label="Time" type="time" value={editForm.eveningTime} onChange={(e) => setEditForm({ ...editForm, eveningTime: e.target.value })} />
//             </div>

//             <div className="timing-box">
//               <h4>Night</h4>
//               <Input label="Tablets" type="number" min="0" value={editForm.nightCount} onChange={(e) => setEditForm({ ...editForm, nightCount: e.target.value })} />
//               <Input label="Time" type="time" value={editForm.nightTime} onChange={(e) => setEditForm({ ...editForm, nightTime: e.target.value })} />
//             </div>
//           </div>

//           <button className="primary-btn mt" onClick={addMedicineToUser}>
//             Save Remote Plan
//           </button>
//         </SectionCard>
//       </div>

//       <div className="side-column">
//         <SectionCard title="Selected User Medicines" subtitle="Live medicine details and refill control">
//           {!selectedUser ? (
//             <div className="empty-box">Select an accepted user to view medicines</div>
//           ) : (
//             <div className="table-wrap">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Slot</th>
//                     <th>Medicine</th>
//                     <th>Firebase</th>
//                     <th>Remaining</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {userMedicines.length === 0 ? (
//                     <tr>
//                       <td colSpan="5" className="no-data">No medicines found</td>
//                     </tr>
//                   ) : (
//                     userMedicines.map((med) => {
//                       const slot = normalizeSlot(med.slotKey);
//                       const value = Number(slotLevels[slot] || 0);
//                       const capacity = Number(med.capacity || DEFAULT_SLOT_CAPACITY);
//                       const remaining = Math.max(0, capacity - value);
//                       const status = getSlotStatus(value, capacity);

//                       return (
//                         <tr key={med.id}>
//                           <td>{slot}</td>
//                           <td>{med.medicineName}</td>
//                           <td>{value}</td>
//                           <td>
//                             <Badge text={`${remaining} LEFT`} color={status.color} />
//                           </td>
//                           <td>
//                             <button className="warning-btn small" onClick={() => refillUserMedicine(med)}>
//                               Refill → 0
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </SectionCard>

//         <SectionCard title="Selected User Logs" subtitle="Recent activity">
//           <div className="feed-list">
//             {!selectedUser ? (
//               <div className="empty-box">Select user to view logs</div>
//             ) : userLogs.length === 0 ? (
//               <div className="empty-box">No logs found</div>
//             ) : (
//               userLogs.slice(0, 15).map((log) => (
//                 <div key={log.id} className="feed-card">
//                   <div className="row-between">
//                     <Badge text={log.type} color={logTypeColor(log.type)} />
//                     <span className="feed-time">{formatDateTime(log.timestamp)}</span>
//                   </div>
//                   <div className="feed-title mt-sm">{log.medicineName || "System"}</div>
//                   <div className="feed-text">{log.message}</div>
//                 </div>
//               ))
//             )}
//           </div>
//         </SectionCard>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useMemo, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
  get,
} from "firebase/database";
import "./App.css";

/* ================= FIREBASE ================= */
const firebaseConfig = {
  apiKey: "AIzaSyB9ererNsNonAzH0zQo_GS79XPOyCoMxr4",
  authDomain: "waterdtection.firebaseapp.com",
  databaseURL: "https://waterdtection-default-rtdb.firebaseio.com",
  projectId: "waterdtection",
  storageBucket: "waterdtection.firebasestorage.app",
  messagingSenderId: "690886375729",
  appId: "1:690886375729:web:172c3a47dda6585e4e1810",
  measurementId: "G-TXF33Y6XY0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

/* ================= ROOT ================= */
const ROOT = "Smart_Medicen";
const LEGACY_ROOT = "Smart_Medicine";

/* ================= TELEGRAM ================= */
const TELEGRAM_BOT_TOKEN = "8601802887:AAFqEXZ6YlHFzCp5jOJlBafLvV2OLMbWzUg";
const TELEGRAM_CHAT_IDS = [
  "1373869897",
  // Add more Telegram chat IDs here. Example:
  // "1234567890",
  // "9876543210",
  
];

/* ================= SLOT SETTINGS ================= */
const SLOT_KEYS = ["M1", "M2", "M3", "M4"];
const SLOT_CAPACITY = 5;
const LOW_STOCK_LIMIT = 2;

/* ================= HELPERS ================= */
const nowTs = () => Date.now();
const formatDateTime = (ts) => (ts ? new Date(ts).toLocaleString() : "-");

function normalizeSlot(slot) {
  const s = String(slot || "").toUpperCase().replace("SLOT", "").trim();
  if (["M1", "M2", "M3", "M4"].includes(s)) return s;
  if (["1", "2", "3", "4"].includes(s)) return `M${s}`;
  return "M1";
}

function timeStringToTodayTimestamp(timeStr) {
  const [h, m] = String(timeStr || "00:00").split(":").map(Number);
  const d = new Date();
  d.setHours(h || 0, m || 0, 0, 0);
  return d.getTime();
}

function getNextOccurrence(timeStr) {
  const ts = timeStringToTodayTimestamp(timeStr);
  return ts >= Date.now() ? ts : ts + 24 * 60 * 60 * 1000;
}

function sortTimes(times = []) {
  return [...times].sort(
    (a, b) => timeStringToTodayTimestamp(a) - timeStringToTodayTimestamp(b)
  );
}

function statusColor(status) {
  if (status === "accepted") return "#16a34a";
  if (status === "rejected") return "#dc2626";
  return "#f59e0b";
}

function logTypeColor(type) {
  if (type?.includes("TAKEN") || type === "DISPENSED") return "#16a34a";
  if (type?.includes("LOW")) return "#f59e0b";
  if (type?.includes("EMPTY") || type?.includes("MISSED")) return "#dc2626";
  if (type?.includes("REFILL")) return "#2563eb";
  if (type?.includes("ACCOUNT")) return "#06b6d4";
  return "#7c3aed";
}

function getSlotStatus(value) {
  const v = Number(value || 0);

  if (v <= 0) return { text: "FULL", color: "#16a34a" };
  if (v >= SLOT_CAPACITY) return { text: "EMPTY", color: "#dc2626" };
  if (SLOT_CAPACITY - v <= LOW_STOCK_LIMIT) return { text: "LOW", color: "#f59e0b" };

  return { text: "AVAILABLE", color: "#2563eb" };
}

function getNextSlotValue(currentValue) {
  const current = Number(currentValue || 0);

  if (current >= SLOT_CAPACITY) {
    return {
      nextValue: SLOT_CAPACITY,
      remaining: 0,
      canTake: false,
      message: "Refill needed in this slot",
    };
  }

  const nextValue = current + 1;
  const remaining = SLOT_CAPACITY - nextValue;

  return {
    nextValue,
    remaining,
    canTake: true,
    message:
      nextValue >= SLOT_CAPACITY
        ? "Refill needed in this slot"
        : `Next value will be ${nextValue + 1}`,
  };
}

function playBeep(duration = 650, frequency = 850) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + duration / 1000
    );

    setTimeout(() => {
      oscillator.stop();
      ctx.close();
    }, duration + 80);
  } catch (err) {
    console.log("Beep blocked:", err);
  }
}

function getTelegramChatIds(chatIds = TELEGRAM_CHAT_IDS) {
  return [...new Set(chatIds.map((chatId) => String(chatId).trim()).filter(Boolean))];
}

async function sendTelegramMessage(text, chatIds = TELEGRAM_CHAT_IDS) {
  const targetChatIds = getTelegramChatIds(chatIds);

  if (!targetChatIds.length) {
    console.warn("Telegram skipped: no chat IDs configured.");
    return;
  }

  const results = await Promise.allSettled(
    targetChatIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      })
    )
  );

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`Telegram failed for chat ID ${targetChatIds[index]}:`, result.reason);
    }
  });
}

async function sendTelegramAlert(title, message, chatIds = TELEGRAM_CHAT_IDS) {
  await sendTelegramMessage(
    `SMART MEDICINE ALERT
${title}
${message}`,
    chatIds
  );
}

async function createAlert(
  userUid,
  title,
  message,
  activeRoot = ROOT,
  notifyTelegram = false
) {
  const alertRef = push(ref(db, `${activeRoot}/alerts/${userUid}`));
  await set(alertRef, {
    title,
    message,
    timestamp: nowTs(),
    seen: false,
  });

  if (notifyTelegram) {
    await sendTelegramAlert(title, message);
  }
}

async function logEvent(userUid, payload, activeRoot = ROOT) {
  const logRef = push(ref(db, `${activeRoot}/logs/${userUid}`));
  await set(logRef, {
    ...payload,
    timestamp: nowTs(),
  });
}

async function ensureSlotNodes(activeRoot = ROOT) {
  const snap = await get(ref(db, activeRoot));
  const data = snap.val() || {};
  const missing = {};

  SLOT_KEYS.forEach((slot) => {
    if (data[slot] === undefined || data[slot] === null) {
      missing[slot] = 0;
    }
  });

  if (Object.keys(missing).length > 0) {
    await update(ref(db, activeRoot), missing);
  }
}

function getFirebaseError(err) {
  const code = err?.code || "";
  if (code.includes("auth/email-already-in-use")) return "This email is already registered.";
  if (code.includes("auth/invalid-email")) return "Invalid email address.";
  if (code.includes("auth/weak-password")) return "Password should be at least 6 characters.";
  if (code.includes("auth/invalid-credential")) return "Invalid email or password.";
  if (code.includes("auth/user-not-found")) return "User account not found.";
  if (code.includes("auth/wrong-password")) return "Wrong password.";
  if (code.includes("auth/network-request-failed")) return "Network error. Please check internet.";
  return err?.message || "Something went wrong.";
}

async function getProfileFromAnyRoot(uid) {
  const userSnap = await get(ref(db, `${ROOT}/users/${uid}`));
  if (userSnap.exists()) {
    return { root: ROOT, role: "user", data: userSnap.val() };
  }

  const caretakerSnap = await get(ref(db, `${ROOT}/caretakers/${uid}`));
  if (caretakerSnap.exists()) {
    return { root: ROOT, role: "caretaker", data: caretakerSnap.val() };
  }

  const legacyUserSnap = await get(ref(db, `${LEGACY_ROOT}/users/${uid}`));
  if (legacyUserSnap.exists()) {
    return { root: LEGACY_ROOT, role: "user", data: legacyUserSnap.val() };
  }

  const legacyCaretakerSnap = await get(ref(db, `${LEGACY_ROOT}/caretakers/${uid}`));
  if (legacyCaretakerSnap.exists()) {
    return { root: LEGACY_ROOT, role: "caretaker", data: legacyCaretakerSnap.val() };
  }

  return null;
}

/* ================= UI COMPONENTS ================= */
function Input({ label, ...props }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select {...props}>{children}</select>
    </div>
  );
}

function Badge({ text, color = "#2563eb" }) {
  return (
    <span
      className="badge"
      style={{
        color,
        borderColor: `${color}55`,
        background: `${color}18`,
      }}
    >
      <span style={{ background: color }} />
      {text}
    </span>
  );
}

function SectionCard({ title, subtitle, right, children }) {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="stat-box">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

/* ================= APP ================= */
export default function App() {
  const [authReady, setAuthReady] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [mode, setMode] = useState("login");
  const [roleTab, setRoleTab] = useState("user");
  const [busy, setBusy] = useState(false);
  const [popup, setPopup] = useState(null);
  const [forceLoginScreen, setForceLoginScreen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      try {
        if (forceLoginScreen) {
          setAuthUser(null);
          setProfile(null);
          setAuthReady(true);
          return;
        }

        if (!user) {
          setAuthUser(null);
          setProfile(null);
          setAuthReady(true);
          return;
        }

        const foundProfile = await getProfileFromAnyRoot(user.uid);

        if (foundProfile) {
          setAuthUser(user);
          setProfile({
            uid: user.uid,
            root: foundProfile.root,
            role: foundProfile.role,
            ...foundProfile.data,
          });
          await ensureSlotNodes(foundProfile.root);
        } else {
          await signOut(auth);
          setAuthUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.error(err);
        setAuthUser(null);
        setProfile(null);
      } finally {
        setAuthReady(true);
      }
    });

    return () => unsub();
  }, [forceLoginScreen]);

  const showPopup = (title, message, tone = "danger") => {
    setPopup({ title, message, tone });
    playBeep();
    setTimeout(() => setPopup(null), 4500);
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill name, email and password.");
      return;
    }

    setBusy(true);
    try {
      setForceLoginScreen(true);
      await setPersistence(auth, browserSessionPersistence);

      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      const uid = cred.user.uid;

      if (roleTab === "user") {
        await set(ref(db, `${ROOT}/users/${uid}`), {
          role: "user",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          status: "pending",
          caretakerUid: "",
          createdAt: nowTs(),
        });
      } else {
        await set(ref(db, `${ROOT}/caretakers/${uid}`), {
          role: "caretaker",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          createdAt: nowTs(),
        });
      }

      await ensureSlotNodes(ROOT);
      await signOut(auth);

      setForm({ name: "", email: "", password: "", phone: "" });
      setMode("login");
      setAuthUser(null);
      setProfile(null);

      showPopup("Registration Successful", "Account created. Please login now.", "success");

      setTimeout(() => {
        setForceLoginScreen(false);
      }, 300);
    } catch (err) {
      console.error(err);
      setForceLoginScreen(false);
      alert(getFirebaseError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please enter email and password.");
      return;
    }

    setBusy(true);
    try {
      setForceLoginScreen(false);
      await setPersistence(auth, browserSessionPersistence);

      const res = await signInWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      const foundProfile = await getProfileFromAnyRoot(res.user.uid);

      if (!foundProfile) {
        await signOut(auth);
        alert("Login succeeded, but no profile exists in Firebase.");
        return;
      }

      setAuthUser(res.user);
      setProfile({
        uid: res.user.uid,
        root: foundProfile.root,
        role: foundProfile.role,
        ...foundProfile.data,
      });

      await ensureSlotNodes(foundProfile.root);
      setForm({ name: "", email: "", password: "", phone: "" });
    } catch (err) {
      console.error(err);
      alert(getFirebaseError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setAuthUser(null);
    setProfile(null);
    setMode("login");
  };

  if (!authReady) {
    return (
      <div className="loader-wrap">
        <div className="loader-card">
          <div className="spinner" />
          <h2>Loading Smart Medicine System</h2>
          <p>Checking login session...</p>
        </div>
      </div>
    );
  }

  const showAuthScreen = forceLoginScreen || !authUser || !profile;

  return (
    <div className="app">
      <div className="bg bg-a" />
      <div className="bg bg-b" />
      <div className="bg bg-c" />

      <div className="container">
        <header className="header">
          <div>
            <div className="kicker">Healthcare Platform</div>
            <h1>Smart Medicine Reminder and Tablet Dispensing Dashboard</h1>
          </div>

          {!showAuthScreen && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </header>

        {showAuthScreen ? (
          <AuthScreen
            roleTab={roleTab}
            setRoleTab={setRoleTab}
            mode={mode}
            setMode={setMode}
            form={form}
            setForm={setForm}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            busy={busy}
          />
        ) : profile.role === "user" ? (
          <UserDashboard
            profile={profile}
            showPopup={showPopup}
            setProfile={setProfile}
          />
        ) : (
          <CaretakerDashboard profile={profile} showPopup={showPopup} />
        )}
      </div>

      {popup && (
        <div className={`popup ${popup.tone}`}>
          <div className="popup-title">{popup.title}</div>
          <div className="popup-message">{popup.message}</div>
        </div>
      )}
    </div>
  );
}

/* ================= AUTH SCREEN ================= */
function AuthScreen({
  roleTab,
  setRoleTab,
  mode,
  setMode,
  form,
  setForm,
  handleLogin,
  handleRegister,
  busy,
}) {
  return (
    <div className="auth-layout">
      <div className="auth-panel">
        <div className="role-switch">
          <button
            type="button"
            className={roleTab === "user" ? "active" : ""}
            onClick={() => setRoleTab("user")}
          >
            User
          </button>
          <button
            type="button"
            className={roleTab === "caretaker" ? "active" : ""}
            onClick={() => setRoleTab("caretaker")}
          >
            Caretaker
          </button>
        </div>

        <h2>{mode === "login" ? "Sign in to continue" : "Create your account"}</h2>
        <p>{mode === "login" ? `Login as ${roleTab}` : `Register as ${roleTab}`}</p>

        <div className="form-grid-single">
          {mode === "register" && (
            <>
              <Input
                label="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter full name"
              />
              <Input
                label="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </>
          )}

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter email"
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter password"
          />

          <button
            type="button"
            className="primary-action"
            onClick={mode === "login" ? handleLogin : handleRegister}
            disabled={busy}
          >
            {busy
              ? "Please wait..."
              : mode === "login"
              ? `Login as ${roleTab}`
              : `Register as ${roleTab}`}
          </button>

          <button
            type="button"
            className="secondary-action"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            disabled={busy}
          >
            {mode === "login" ? "Create new account" : "Back to login"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= USER DASHBOARD ================= */
function UserDashboard({ profile, showPopup, setProfile }) {
  const activeRoot = profile.root || ROOT;

  const [slotLevels, setSlotLevels] = useState({
    M1: 0,
    M2: 0,
    M3: 0,
    M4: 0,
  });

  const [medicines, setMedicines] = useState([]);
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [selectedCaretaker, setSelectedCaretaker] = useState("");
  const reminderLockRef = useRef({});

  const [medicineForm, setMedicineForm] = useState({
    medicineName: "",
    slotKey: "M1",
    capacity: 5,
    morningCount: 1,
    afternoonCount: 0,
    eveningCount: 0,
    nightCount: 0,
    morningTime: "08:00",
    afternoonTime: "13:00",
    eveningTime: "18:00",
    nightTime: "21:00",
  });

  const [takeForm, setTakeForm] = useState({
    slotKey: "M1",
    period: "Morning",
  });

  useEffect(() => {
    ensureSlotNodes(activeRoot);

    const unsubSlots = onValue(ref(db, activeRoot), (snap) => {
      const data = snap.val() || {};
      setSlotLevels({
        M1: Number(data.M1 || 0),
        M2: Number(data.M2 || 0),
        M3: Number(data.M3 || 0),
        M4: Number(data.M4 || 0),
      });
    });

    const unsubMeds = onValue(ref(db, `${activeRoot}/medicines/${profile.uid}`), (snap) => {
      const data = snap.val() || {};
      const arr = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
        slotKey: normalizeSlot(data[key].slotKey || data[key].slotNumber || key),
      }));
      setMedicines(arr);
    });

    const unsubLogs = onValue(ref(db, `${activeRoot}/logs/${profile.uid}`), (snap) => {
      const data = snap.val() || {};
      const arr = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
      setLogs(arr);
    });

    const unsubAlerts = onValue(ref(db, `${activeRoot}/alerts/${profile.uid}`), (snap) => {
      const data = snap.val() || {};
      const arr = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
      setAlerts(arr);
    });

    const unsubCare = onValue(ref(db, `${activeRoot}/caretakers`), (snap) => {
      const data = snap.val() || {};
      const arr = Object.keys(data).map((key) => ({ uid: key, ...data[key] }));
      setCaretakers(arr);
    });

    const unsubProfile = onValue(ref(db, `${activeRoot}/users/${profile.uid}`), (snap) => {
      if (snap.exists()) {
        setProfile((prev) => ({ ...prev, ...snap.val(), root: activeRoot }));
      }
    });

    return () => {
      unsubSlots();
      unsubMeds();
      unsubLogs();
      unsubAlerts();
      unsubCare();
      unsubProfile();
    };
  }, [profile.uid, setProfile, activeRoot]);

  useEffect(() => {
    if (profile.status !== "accepted") return;

    const interval = setInterval(async () => {
      for (const med of medicines) {
        if (!med.active) continue;

        for (const t of med.times || []) {
          const scheduleTs = timeStringToTodayTimestamp(t);
          const diffMin = Math.floor((Date.now() - scheduleTs) / 60000);
          const key = `${med.id}_${t}_${new Date().toLocaleDateString()}`;

          if (diffMin >= 0 && diffMin <= 1 && !reminderLockRef.current[`${key}_due`]) {
            reminderLockRef.current[`${key}_due`] = true;

            const msg = `Medicine time now: ${med.medicineName} (${med.slotKey}) at ${t}`;
            showPopup("Medicine Reminder", msg, "info");

            await createAlert(profile.uid, "Medicine Reminder", msg, activeRoot);
            await logEvent(
              profile.uid,
              {
                type: "REMINDER",
                medicineName: med.medicineName,
                slotNumber: med.slotKey,
                message: msg,
              },
              activeRoot
            );

            await sendTelegramMessage(
              `SMART MEDICINE REMINDER
User: ${profile.name}
Medicine: ${med.medicineName}
Slot: ${med.slotKey}
Time: ${t}`
            );
          }
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [medicines, profile, showPopup, activeRoot]);

  const nextDose = useMemo(() => {
    const upcoming = [];

    medicines.forEach((med) => {
      if (!med.active) return;
      (med.times || []).forEach((timeStr) => {
        upcoming.push({
          medicineName: med.medicineName,
          slotKey: med.slotKey,
          nextTs: getNextOccurrence(timeStr),
        });
      });
    });

    upcoming.sort((a, b) => a.nextTs - b.nextTs);
    return upcoming[0] || null;
  }, [medicines]);

  const selectedMedicine = useMemo(() => {
    return medicines.find((m) => normalizeSlot(m.slotKey) === takeForm.slotKey);
  }, [medicines, takeForm.slotKey]);

  const requestCaretaker = async () => {
    if (!selectedCaretaker) {
      alert("Please select caretaker.");
      return;
    }

    const caretaker = caretakers.find((c) => c.uid === selectedCaretaker);
    if (!caretaker) {
      alert("Selected caretaker not found.");
      return;
    }

    const reqRef = push(ref(db, `${activeRoot}/requests`));

    await set(reqRef, {
      userUid: profile.uid,
      caretakerUid: caretaker.uid,
      userName: profile.name,
      caretakerName: caretaker.name,
      status: "pending",
      createdAt: nowTs(),
    });

    await update(ref(db, `${activeRoot}/users/${profile.uid}`), {
      caretakerUid: caretaker.uid,
      status: "pending",
    });

    setProfile((prev) => ({
      ...prev,
      caretakerUid: caretaker.uid,
      status: "pending",
      root: activeRoot,
    }));

    showPopup("Request Sent", `Request sent to ${caretaker.name}`, "success");

    await sendTelegramMessage(
      `SMART MEDICINE REQUEST
User: ${profile.name}
Requested caretaker: ${caretaker.name}
Status: pending`
    );
  };

  const addMedicine = async () => {
    if (profile.status !== "accepted") {
      alert("Your account is not accepted by caretaker yet.");
      return;
    }

    if (!medicineForm.medicineName.trim()) {
      alert("Please enter medicine name.");
      return;
    }

    const slotKey = normalizeSlot(medicineForm.slotKey);

    const scheduleItems = [
      {
        period: "Morning",
        count: Number(medicineForm.morningCount || 0),
        time: medicineForm.morningTime,
      },
      {
        period: "Afternoon",
        count: Number(medicineForm.afternoonCount || 0),
        time: medicineForm.afternoonTime,
      },
      {
        period: "Evening",
        count: Number(medicineForm.eveningCount || 0),
        time: medicineForm.eveningTime,
      },
      {
        period: "Night",
        count: Number(medicineForm.nightCount || 0),
        time: medicineForm.nightTime,
      },
    ].filter((item) => item.count > 0 && item.time);

    if (!scheduleItems.length) {
      alert("Please add at least one timing with tablet count.");
      return;
    }

    const currentSlotValue = Number(slotLevels[slotKey] || 0);
    const remaining = Math.max(0, SLOT_CAPACITY - currentSlotValue);

    await set(ref(db, `${activeRoot}/medicines/${profile.uid}/${slotKey}`), {
      medicineName: medicineForm.medicineName.trim(),
      slotKey,
      slotNumber: slotKey,
      capacity: SLOT_CAPACITY,
      quantity: remaining,
      remaining,
      takenSinceRefill: currentSlotValue,
      totalTaken: 0,
      dailyTabletCount: scheduleItems.reduce((sum, item) => sum + item.count, 0),
      scheduleItems,
      times: sortTimes(scheduleItems.map((item) => item.time)),
      active: true,
      lastTakenAt: 0,
      lowStockAlertSent: false,
      emptyAlertSent: false,
      createdAt: nowTs(),
      updatedAt: nowTs(),
    });

    await update(ref(db, activeRoot), {
      [slotKey]: currentSlotValue,
    });

    await logEvent(
      profile.uid,
      {
        type: "MEDICINE_ADDED",
        medicineName: medicineForm.medicineName.trim(),
        slotNumber: slotKey,
        message: `${medicineForm.medicineName.trim()} added in ${slotKey}`,
      },
      activeRoot
    );

    showPopup("Medicine Added", "Medicine slot saved successfully.", "success");

    await sendTelegramMessage(
      `SMART MEDICINE PLAN ADDED
User: ${profile.name}
Medicine: ${medicineForm.medicineName.trim()}
Slot: ${slotKey}
Capacity: ${SLOT_CAPACITY}
Timings: ${scheduleItems.map((i) => `${i.period}-${i.count} at ${i.time}`).join(", ")}`
    );
  };

  const takeMedicine = async () => {
    if (profile.status !== "accepted") {
      alert("Your account is not accepted by caretaker yet.");
      return;
    }

    const slotKey = normalizeSlot(takeForm.slotKey);
    const med = medicines.find((m) => normalizeSlot(m.slotKey) === slotKey);

    if (!med) {
      alert(`No medicine configured in ${slotKey}.`);
      return;
    }

    const currentSlotValue = Number(slotLevels[slotKey] || 0);
    const result = getNextSlotValue(currentSlotValue);

    if (!result.canTake) {
      const refillMsg = `Refill needed in ${slotKey}. ${med.medicineName} slot is empty.`;

      showPopup("Refill Needed", refillMsg, "danger");

      await createAlert(profile.uid, "Refill Needed", refillMsg, activeRoot);

      await logEvent(
        profile.uid,
        {
          type: "REFILL_NEEDED",
          medicineName: med.medicineName,
          slotNumber: slotKey,
          firebaseValue: currentSlotValue,
          remaining: 0,
          message: refillMsg,
        },
        activeRoot
      );

      await sendTelegramMessage(
        `SMART MEDICINE REFILL NEEDED
User: ${profile.name}
Medicine: ${med.medicineName}
Slot: ${slotKey}
Firebase Value: ${currentSlotValue}
Message: Refill needed in this slot`
      );

      return;
    }

    await update(ref(db, activeRoot), {
      [slotKey]: result.nextValue,
    });

    await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${slotKey}`), {
      capacity: SLOT_CAPACITY,
      quantity: result.remaining,
      remaining: result.remaining,
      takenSinceRefill: result.nextValue,
      totalTaken: Number(med.totalTaken || 0) + 1,
      lastTakenCount: 1,
      lastTakenPeriod: takeForm.period,
      lastTakenAt: nowTs(),
      lowStockAlertSent: result.remaining <= LOW_STOCK_LIMIT && result.remaining > 0,
      emptyAlertSent: result.remaining <= 0,
      updatedAt: nowTs(),
    });

    const msg =
      result.remaining <= 0
        ? `Tablet ${result.nextValue} taken from ${slotKey}. Refill needed in this slot.`
        : `Tablet ${result.nextValue} taken from ${slotKey}. Remaining: ${result.remaining}`;

    await createAlert(profile.uid, "Medicine Taken", msg, activeRoot);

    await logEvent(
      profile.uid,
      {
        type: result.remaining <= 0 ? "EMPTY_SLOT" : "MEDICINE_TAKEN",
        medicineName: med.medicineName,
        slotNumber: slotKey,
        takenNow: 1,
        firebaseValue: result.nextValue,
        remaining: result.remaining,
        message: msg,
      },
      activeRoot
    );

    showPopup(
      result.remaining <= 0 ? "Refill Needed" : "Medicine Taken",
      msg,
      result.remaining <= 0 ? "danger" : "success"
    );

    await sendTelegramMessage(
      `SMART MEDICINE TAKEN
User: ${profile.name}
Medicine: ${med.medicineName}
Slot: ${slotKey}
Period: ${takeForm.period}
Firebase ${slotKey} Value: ${result.nextValue}
Remaining: ${result.remaining}
${result.remaining <= 0 ? "Message: Refill needed in this slot" : ""}`
    );
  };

  const refillMedicine = async (slotKeyInput) => {
    const slotKey = normalizeSlot(slotKeyInput);
    const med = medicines.find((m) => normalizeSlot(m.slotKey) === slotKey);

    await update(ref(db, activeRoot), {
      [slotKey]: 0,
    });

    if (med) {
      await update(ref(db, `${activeRoot}/medicines/${profile.uid}/${slotKey}`), {
        capacity: SLOT_CAPACITY,
        quantity: SLOT_CAPACITY,
        remaining: SLOT_CAPACITY,
        takenSinceRefill: 0,
        lowStockAlertSent: false,
        emptyAlertSent: false,
        lastRefilledAt: nowTs(),
        updatedAt: nowTs(),
      });
    }

    const msg = `${slotKey} refilled. Firebase ${slotKey} value set to 0.`;

    await createAlert(profile.uid, "Refill Updated", msg, activeRoot);

    await logEvent(
      profile.uid,
      {
        type: "REFILL",
        medicineName: med?.medicineName || "Not assigned",
        slotNumber: slotKey,
        remaining: SLOT_CAPACITY,
        message: msg,
      },
      activeRoot
    );

    showPopup("Refill Updated", msg, "success");

    await sendTelegramMessage(
      `SMART MEDICINE REFILL
User: ${profile.name}
Medicine: ${med?.medicineName || "Not assigned"}
Slot: ${slotKey}
Firebase ${slotKey} Value: 0
Remaining: ${SLOT_CAPACITY}`
    );
  };

  return (
    <div className="dashboard-grid">
      <div className="main-column">
        <SectionCard
          title={`Welcome, ${profile.name}`}
          subtitle="User dashboard overview"
          right={<Badge text={(profile.status || "pending").toUpperCase()} color={statusColor(profile.status)} />}
        >
          <div className="stats-grid">
            <StatBox label="Email" value={profile.email} />
            <StatBox label="Role" value={profile.role} />
            <StatBox label="Created" value={formatDateTime(profile.createdAt)} />
            <StatBox
              label="Next Dose"
              value={
                nextDose
                  ? `${nextDose.medicineName} | ${nextDose.slotKey} | ${new Date(nextDose.nextTs).toLocaleString()}`
                  : "No schedule"
              }
            />
          </div>
        </SectionCard>

        <SectionCard title="Caretaker Approval" subtitle="Send request to caretaker">
          <div className="grid-2">
            <Select
              label="Select Caretaker"
              value={selectedCaretaker}
              onChange={(e) => setSelectedCaretaker(e.target.value)}
            >
              <option value="">Choose caretaker</option>
              {caretakers.map((c) => (
                <option key={c.uid} value={c.uid}>
                  {c.name} ({c.email})
                </option>
              ))}
            </Select>

            <div className="approval-box">
              <span>Current Status</span>
              <Badge text={(profile.status || "pending").toUpperCase()} color={statusColor(profile.status)} />
            </div>
          </div>

          <button className="primary-btn mt" onClick={requestCaretaker}>
            Send Request
          </button>
        </SectionCard>

        <SectionCard title="Live Medicine Slots" subtitle="0 = full/refilled, 5 = empty">
          <div className="slot-grid">
            {SLOT_KEYS.map((slot) => {
              const med = medicines.find((m) => normalizeSlot(m.slotKey) === slot);
              const value = Number(slotLevels[slot] || 0);
              const remaining = Math.max(0, SLOT_CAPACITY - value);
              const status = getSlotStatus(value);

              return (
                <div className="slot-card" key={slot}>
                  <div className="slot-top">
                    <h2>{slot}</h2>
                    <Badge text={status.text} color={status.color} />
                  </div>
                  <p className="slot-medicine">{med?.medicineName || "No medicine assigned"}</p>
                  <div className="slot-numbers">
                    <span>Firebase: {value}</span>
                    <span>Left: {remaining}</span>
                  </div>
                  <button className="warning-btn" onClick={() => refillMedicine(slot)}>
                    Refill → Set {slot}=0
                  </button>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Medicine Setup" subtitle="Add medicine name, slot, daily timings and tablet count">
          <div className="grid-3">
            <Input
              label="Medicine Name"
              value={medicineForm.medicineName}
              onChange={(e) => setMedicineForm({ ...medicineForm, medicineName: e.target.value })}
              placeholder="Paracetamol"
            />

            <Select
              label="Slot"
              value={medicineForm.slotKey}
              onChange={(e) => setMedicineForm({ ...medicineForm, slotKey: e.target.value })}
            >
              {SLOT_KEYS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </Select>

            <Input
              label="Slot Capacity"
              type="number"
              min="1"
              value={SLOT_CAPACITY}
              disabled
            />
          </div>

          <div className="timing-grid">
            <div className="timing-box">
              <h4>Morning</h4>
              <Input label="Tablets" type="number" min="0" value={medicineForm.morningCount} onChange={(e) => setMedicineForm({ ...medicineForm, morningCount: e.target.value })} />
              <Input label="Time" type="time" value={medicineForm.morningTime} onChange={(e) => setMedicineForm({ ...medicineForm, morningTime: e.target.value })} />
            </div>

            <div className="timing-box">
              <h4>Afternoon</h4>
              <Input label="Tablets" type="number" min="0" value={medicineForm.afternoonCount} onChange={(e) => setMedicineForm({ ...medicineForm, afternoonCount: e.target.value })} />
              <Input label="Time" type="time" value={medicineForm.afternoonTime} onChange={(e) => setMedicineForm({ ...medicineForm, afternoonTime: e.target.value })} />
            </div>

            <div className="timing-box">
              <h4>Evening</h4>
              <Input label="Tablets" type="number" min="0" value={medicineForm.eveningCount} onChange={(e) => setMedicineForm({ ...medicineForm, eveningCount: e.target.value })} />
              <Input label="Time" type="time" value={medicineForm.eveningTime} onChange={(e) => setMedicineForm({ ...medicineForm, eveningTime: e.target.value })} />
            </div>

            <div className="timing-box">
              <h4>Night</h4>
              <Input label="Tablets" type="number" min="0" value={medicineForm.nightCount} onChange={(e) => setMedicineForm({ ...medicineForm, nightCount: e.target.value })} />
              <Input label="Time" type="time" value={medicineForm.nightTime} onChange={(e) => setMedicineForm({ ...medicineForm, nightTime: e.target.value })} />
            </div>
          </div>

          <button className="primary-btn mt" onClick={addMedicine}>
            Save Medicine Slot
          </button>
        </SectionCard>

        <SectionCard title="Take Medicine" subtitle="Each click sends next value: 1, 2, 3, 4, 5. After 5 refill needed.">
          <div className="grid-4">
            <Select label="Slot" value={takeForm.slotKey} onChange={(e) => setTakeForm({ ...takeForm, slotKey: e.target.value })}>
              {SLOT_KEYS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </Select>

            <Select label="Period" value={takeForm.period} onChange={(e) => setTakeForm({ ...takeForm, period: e.target.value })}>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
              <option>Night</option>
              <option>Custom</option>
            </Select>

            <div className="approval-box">
              <span>Next Firebase Value</span>
              <b>
                {Number(slotLevels[takeForm.slotKey] || 0) >= SLOT_CAPACITY
                  ? "Refill Needed"
                  : Number(slotLevels[takeForm.slotKey] || 0) + 1}
              </b>
            </div>

            <button className="success-btn take-btn" onClick={takeMedicine}>
              Take Medicine
            </button>
          </div>

          {selectedMedicine && (
            <div className="selected-info">
              <b>{selectedMedicine.medicineName}</b>
              <span>Slot: {selectedMedicine.slotKey}</span>
              <span>Current Firebase Value: {slotLevels[takeForm.slotKey] || 0}</span>
              <span>
                Remaining: {Math.max(0, SLOT_CAPACITY - Number(slotLevels[takeForm.slotKey] || 0))}
              </span>
            </div>
          )}
        </SectionCard>

        <SectionCard title="Medicine Details" subtitle="Which slot contains which medicine">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Slot</th>
                  <th>Medicine</th>
                  <th>Capacity</th>
                  <th>Firebase Value</th>
                  <th>Remaining</th>
                  <th>Daily Schedule</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">No medicines added yet</td>
                  </tr>
                ) : (
                  medicines.map((med) => {
                    const slot = normalizeSlot(med.slotKey);
                    const value = Number(slotLevels[slot] || 0);
                    const remaining = Math.max(0, SLOT_CAPACITY - value);
                    const status = getSlotStatus(value);

                    return (
                      <tr key={med.id}>
                        <td>{slot}</td>
                        <td>{med.medicineName}</td>
                        <td>{SLOT_CAPACITY}</td>
                        <td>{value}</td>
                        <td><Badge text={`${remaining} LEFT`} color={status.color} /></td>
                        <td>
                          {(med.scheduleItems || []).map((s, i) => (
                            <div key={i}>{s.period}: {s.count} tab at {s.time}</div>
                          ))}
                        </td>
                        <td>
                          <button className="warning-btn small" onClick={() => refillMedicine(slot)}>
                            Refill
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <div className="side-column">
        <SectionCard title="Alerts" subtitle="Recent notifications">
          <div className="feed-list">
            {alerts.length === 0 ? (
              <div className="empty-box">No alerts available</div>
            ) : (
              alerts.slice(0, 10).map((a) => (
                <div key={a.id} className="feed-card">
                  <div className="feed-title">{a.title}</div>
                  <div className="feed-text">{a.message}</div>
                  <div className="feed-time">{formatDateTime(a.timestamp)}</div>
                </div>
              ))
            )}
          </div>
        </SectionCard>

        <SectionCard title="History / Logs" subtitle="Taken, refill and stock history">
          <div className="feed-list">
            {logs.length === 0 ? (
              <div className="empty-box">No history found</div>
            ) : (
              logs.slice(0, 20).map((log) => (
                <div key={log.id} className="feed-card">
                  <div className="row-between">
                    <Badge text={log.type} color={logTypeColor(log.type)} />
                    <span className="feed-time">{formatDateTime(log.timestamp)}</span>
                  </div>
                  <div className="feed-title mt-sm">{log.medicineName || "System"}</div>
                  <div className="feed-text">{log.message}</div>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

/* ================= CARETAKER DASHBOARD ================= */
function CaretakerDashboard({ profile, showPopup }) {
  const activeRoot = profile.root || ROOT;

  const [slotLevels, setSlotLevels] = useState({
    M1: 0,
    M2: 0,
    M3: 0,
    M4: 0,
  });

  const [requests, setRequests] = useState([]);
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userMedicines, setUserMedicines] = useState([]);
  const [userLogs, setUserLogs] = useState([]);

  const [editForm, setEditForm] = useState({
    medicineName: "",
    slotKey: "M1",
    morningCount: 1,
    afternoonCount: 0,
    eveningCount: 0,
    nightCount: 0,
    morningTime: "08:00",
    afternoonTime: "13:00",
    eveningTime: "18:00",
    nightTime: "21:00",
  });

  useEffect(() => {
    ensureSlotNodes(activeRoot);

    const unsubSlots = onValue(ref(db, activeRoot), (snap) => {
      const data = snap.val() || {};
      setSlotLevels({
        M1: Number(data.M1 || 0),
        M2: Number(data.M2 || 0),
        M3: Number(data.M3 || 0),
        M4: Number(data.M4 || 0),
      });
    });

    const unsubReq = onValue(ref(db, `${activeRoot}/requests`), (snap) => {
      const data = snap.val() || {};
      const arr = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .filter((r) => r.caretakerUid === profile.uid)
        .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
      setRequests(arr);
    });

    const unsubUsers = onValue(ref(db, `${activeRoot}/users`), (snap) => {
      const data = snap.val() || {};
      const arr = Object.keys(data)
        .map((key) => ({ uid: key, ...data[key] }))
        .filter((u) => u.caretakerUid === profile.uid && u.status === "accepted");
      setAcceptedUsers(arr);
    });

    return () => {
      unsubSlots();
      unsubReq();
      unsubUsers();
    };
  }, [profile.uid, activeRoot]);

  useEffect(() => {
    if (!selectedUser) {
      setUserMedicines([]);
      setUserLogs([]);
      return;
    }

    const unsubMeds = onValue(ref(db, `${activeRoot}/medicines/${selectedUser}`), (snap) => {
      const data = snap.val() || {};
      const arr = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
        slotKey: normalizeSlot(data[key].slotKey || data[key].slotNumber || key),
      }));
      setUserMedicines(arr);
    });

    const unsubLogs = onValue(ref(db, `${activeRoot}/logs/${selectedUser}`), (snap) => {
      const data = snap.val() || {};
      const arr = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
      setUserLogs(arr);
    });

    return () => {
      unsubMeds();
      unsubLogs();
    };
  }, [selectedUser, activeRoot]);

  const selectedUserData = acceptedUsers.find((u) => u.uid === selectedUser);

  const updateRequestStatus = async (req, status) => {
    await update(ref(db, `${activeRoot}/requests/${req.id}`), {
      status,
      updatedAt: nowTs(),
    });

    await update(ref(db, `${activeRoot}/users/${req.userUid}`), {
      status,
      caretakerUid: profile.uid,
    });

    await createAlert(
      req.userUid,
      "Account Approval Update",
      `Your request was marked as ${status} by caretaker ${profile.name}`,
      activeRoot
    );

    await logEvent(
      req.userUid,
      {
        type: "ACCOUNT_STATUS",
        medicineName: "",
        slotNumber: "",
        message: `Caretaker changed account status to ${status}`,
      },
      activeRoot
    );

    showPopup("Request Updated", `${req.userName} marked as ${status}`, "success");

    await sendTelegramMessage(
      `SMART MEDICINE CARETAKER UPDATE
User: ${req.userName}
Caretaker: ${profile.name}
Status: ${status}`
    );
  };

  const addMedicineToUser = async () => {
    if (!selectedUser) {
      alert("Please select accepted user.");
      return;
    }

    if (!editForm.medicineName.trim()) {
      alert("Please enter medicine name.");
      return;
    }

    const slotKey = normalizeSlot(editForm.slotKey);

    const scheduleItems = [
      { period: "Morning", count: Number(editForm.morningCount || 0), time: editForm.morningTime },
      { period: "Afternoon", count: Number(editForm.afternoonCount || 0), time: editForm.afternoonTime },
      { period: "Evening", count: Number(editForm.eveningCount || 0), time: editForm.eveningTime },
      { period: "Night", count: Number(editForm.nightCount || 0), time: editForm.nightTime },
    ].filter((item) => item.count > 0 && item.time);

    if (!scheduleItems.length) {
      alert("Please add at least one timing with tablet count.");
      return;
    }

    const currentSlotValue = Number(slotLevels[slotKey] || 0);
    const remaining = Math.max(0, SLOT_CAPACITY - currentSlotValue);

    await set(ref(db, `${activeRoot}/medicines/${selectedUser}/${slotKey}`), {
      medicineName: editForm.medicineName.trim(),
      slotKey,
      slotNumber: slotKey,
      capacity: SLOT_CAPACITY,
      quantity: remaining,
      remaining,
      takenSinceRefill: currentSlotValue,
      totalTaken: 0,
      dailyTabletCount: scheduleItems.reduce((sum, item) => sum + item.count, 0),
      scheduleItems,
      times: sortTimes(scheduleItems.map((item) => item.time)),
      active: true,
      lastTakenAt: 0,
      lowStockAlertSent: false,
      emptyAlertSent: false,
      createdAt: nowTs(),
      updatedAt: nowTs(),
      addedByCaretaker: true,
      caretakerUid: profile.uid,
    });

    await createAlert(
      selectedUser,
      "Medicine Plan Updated",
      `Caretaker ${profile.name} updated your ${slotKey} medicine schedule`,
      activeRoot
    );

    await logEvent(
      selectedUser,
      {
        type: "PLAN_UPDATED_BY_CARETAKER",
        medicineName: editForm.medicineName.trim(),
        slotNumber: slotKey,
        message: `Medicine plan added by caretaker in ${slotKey}`,
      },
      activeRoot
    );

    showPopup("Plan Saved", "Medicine plan added remotely.", "success");

    await sendTelegramMessage(
      `SMART MEDICINE PLAN UPDATED
Caretaker: ${profile.name}
User: ${selectedUserData?.name || selectedUser}
Medicine: ${editForm.medicineName.trim()}
Slot: ${slotKey}
Timings: ${scheduleItems.map((i) => `${i.period}-${i.count} at ${i.time}`).join(", ")}`
    );
  };

  const refillUserMedicine = async (med) => {
    if (!selectedUser) return;

    const slotKey = normalizeSlot(med.slotKey);

    await update(ref(db, activeRoot), {
      [slotKey]: 0,
    });

    await update(ref(db, `${activeRoot}/medicines/${selectedUser}/${slotKey}`), {
      capacity: SLOT_CAPACITY,
      quantity: SLOT_CAPACITY,
      remaining: SLOT_CAPACITY,
      takenSinceRefill: 0,
      lowStockAlertSent: false,
      emptyAlertSent: false,
      lastRefilledAt: nowTs(),
      updatedAt: nowTs(),
    });

    const msg = `${slotKey} refilled by caretaker. Firebase ${slotKey} value set to 0.`;

    await createAlert(selectedUser, "Refill Updated", msg, activeRoot);

    await logEvent(
      selectedUser,
      {
        type: "REFILL_BY_CARETAKER",
        medicineName: med.medicineName,
        slotNumber: slotKey,
        remaining: SLOT_CAPACITY,
        message: msg,
      },
      activeRoot
    );

    showPopup("Refill Done", msg, "success");

    await sendTelegramMessage(
      `SMART MEDICINE REFILL BY CARETAKER
Caretaker: ${profile.name}
User: ${selectedUserData?.name || selectedUser}
Medicine: ${med.medicineName}
Slot: ${slotKey}
Firebase ${slotKey} Value: 0
Remaining: ${SLOT_CAPACITY}`
    );
  };

  return (
    <div className="dashboard-grid">
      <div className="main-column">
        <SectionCard title={`Caretaker Dashboard - ${profile.name}`} subtitle="Monitor and manage linked users">
          <div className="stats-grid">
            <StatBox label="Email" value={profile.email} />
            <StatBox label="Role" value={profile.role} />
            <StatBox label="Accepted Users" value={acceptedUsers.length} />
            <StatBox label="Pending Requests" value={requests.filter((r) => r.status === "pending").length} />
          </div>
        </SectionCard>

        <SectionCard title="User Approval Requests" subtitle="Accept, reject or keep pending">
          <div className="feed-list">
            {requests.length === 0 ? (
              <div className="empty-box">No requests found</div>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="request-card">
                  <div>
                    <div className="feed-title">{req.userName}</div>
                    <div className="feed-text">Caretaker: {req.caretakerName}</div>
                    <div className="feed-text">Status: {req.status}</div>
                    <div className="feed-time">{formatDateTime(req.createdAt)}</div>
                  </div>

                  <div className="inline-actions">
                    <button className="success-btn" onClick={() => updateRequestStatus(req, "accepted")}>Accept</button>
                    <button className="danger-btn" onClick={() => updateRequestStatus(req, "rejected")}>Reject</button>
                    <button className="secondary-btn" onClick={() => updateRequestStatus(req, "pending")}>Pending</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </SectionCard>

        <SectionCard title="Remote Medicine Plan" subtitle="Add or update medicine schedule for selected user">
          <div className="grid-3">
            <Select label="Select Accepted User" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
              <option value="">Choose user</option>
              {acceptedUsers.map((u) => (
                <option key={u.uid} value={u.uid}>
                  {u.name} ({u.email})
                </option>
              ))}
            </Select>

            <Input label="Medicine Name" value={editForm.medicineName} onChange={(e) => setEditForm({ ...editForm, medicineName: e.target.value })} />

            <Select label="Slot" value={editForm.slotKey} onChange={(e) => setEditForm({ ...editForm, slotKey: e.target.value })}>
              {SLOT_KEYS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </Select>
          </div>

          <div className="timing-grid">
            <div className="timing-box">
              <h4>Morning</h4>
              <Input label="Tablets" type="number" min="0" value={editForm.morningCount} onChange={(e) => setEditForm({ ...editForm, morningCount: e.target.value })} />
              <Input label="Time" type="time" value={editForm.morningTime} onChange={(e) => setEditForm({ ...editForm, morningTime: e.target.value })} />
            </div>

            <div className="timing-box">
              <h4>Afternoon</h4>
              <Input label="Tablets" type="number" min="0" value={editForm.afternoonCount} onChange={(e) => setEditForm({ ...editForm, afternoonCount: e.target.value })} />
              <Input label="Time" type="time" value={editForm.afternoonTime} onChange={(e) => setEditForm({ ...editForm, afternoonTime: e.target.value })} />
            </div>

            <div className="timing-box">
              <h4>Evening</h4>
              <Input label="Tablets" type="number" min="0" value={editForm.eveningCount} onChange={(e) => setEditForm({ ...editForm, eveningCount: e.target.value })} />
              <Input label="Time" type="time" value={editForm.eveningTime} onChange={(e) => setEditForm({ ...editForm, eveningTime: e.target.value })} />
            </div>

            <div className="timing-box">
              <h4>Night</h4>
              <Input label="Tablets" type="number" min="0" value={editForm.nightCount} onChange={(e) => setEditForm({ ...editForm, nightCount: e.target.value })} />
              <Input label="Time" type="time" value={editForm.nightTime} onChange={(e) => setEditForm({ ...editForm, nightTime: e.target.value })} />
            </div>
          </div>

          <button className="primary-btn mt" onClick={addMedicineToUser}>
            Save Remote Plan
          </button>
        </SectionCard>
      </div>

      <div className="side-column">
        <SectionCard title="Selected User Medicines" subtitle="Live medicine details and refill control">
          {!selectedUser ? (
            <div className="empty-box">Select an accepted user to view medicines</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Slot</th>
                    <th>Medicine</th>
                    <th>Firebase</th>
                    <th>Remaining</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userMedicines.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="no-data">No medicines found</td>
                    </tr>
                  ) : (
                    userMedicines.map((med) => {
                      const slot = normalizeSlot(med.slotKey);
                      const value = Number(slotLevels[slot] || 0);
                      const remaining = Math.max(0, SLOT_CAPACITY - value);
                      const status = getSlotStatus(value);

                      return (
                        <tr key={med.id}>
                          <td>{slot}</td>
                          <td>{med.medicineName}</td>
                          <td>{value}</td>
                          <td><Badge text={`${remaining} LEFT`} color={status.color} /></td>
                          <td>
                            <button className="warning-btn small" onClick={() => refillUserMedicine(med)}>
                              Refill → 0
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>

        <SectionCard title="Selected User Logs" subtitle="Recent activity">
          <div className="feed-list">
            {!selectedUser ? (
              <div className="empty-box">Select user to view logs</div>
            ) : userLogs.length === 0 ? (
              <div className="empty-box">No logs found</div>
            ) : (
              userLogs.slice(0, 15).map((log) => (
                <div key={log.id} className="feed-card">
                  <div className="row-between">
                    <Badge text={log.type} color={logTypeColor(log.type)} />
                    <span className="feed-time">{formatDateTime(log.timestamp)}</span>
                  </div>
                  <div className="feed-title mt-sm">{log.medicineName || "System"}</div>
                  <div className="feed-text">{log.message}</div>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
