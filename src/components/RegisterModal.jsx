import React, { useState } from "react";

export default function RegisterModal({ open, onClose, onSubmit, nextId }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !gender.trim()) {
      alert("Please enter name and gender");
      return;
    }

    onSubmit({
      id: nextId,
      name: name.trim(),
      gender: gender.trim(),
    });

    setName("");
    setGender("");
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="modal-header">
          <div className="modal-header-icon icon-indigo" style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>◉</div>
          <div>
            <h2>Register Fingerprint</h2>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Add a new authorised user</p>
          </div>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select gender</option>
                <option value="Male">👨 Male</option>
                <option value="Female">👩 Female</option>
                <option value="Other">🧑 Other</option>
              </select>
            </div>

            <div className="enroll-badge">
              <span>Enroll Number Assigned</span>
              <strong>#{nextId}</strong>
            </div>

            <div className="modal-actions">
              <button type="submit">✓ Register</button>
              <button type="button" className="danger" onClick={onClose}>✕ Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}