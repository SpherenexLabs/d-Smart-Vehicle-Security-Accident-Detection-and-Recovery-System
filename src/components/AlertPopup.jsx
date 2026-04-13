import React from "react";

const ALERT_CONFIG = {
  "Emergency Alert": { cls: "emergency", icon: "🆘", sub: "Immediate action required" },
  "Security Alert":  { cls: "security",  icon: "🚨", sub: "Security breach detected" },
  "Warning":         { cls: "warning",   icon: "⚠️", sub: "Please check the vehicle" },
  "Alert":           { cls: "warning",   icon: "🔔", sub: "System notification" },
  "Success":         { cls: "success",   icon: "✅", sub: "Operation completed" },
  "Deleted":         { cls: "info",      icon: "🗑",  sub: "Record removed" },
  "Not Found":       { cls: "warning",   icon: "🔍", sub: "Search result" },
  "Error":           { cls: "emergency", icon: "❌", sub: "Action failed" },
};

export default function AlertPopup({ alert, onClose }) {
  if (!alert) return null;

  const config = ALERT_CONFIG[alert.title] || { cls: "info", icon: "ℹ️", sub: "" };

  return (
    <div className="popup-overlay">
      <div className="alert-popup-box">
        <div className={`alert-banner ${config.cls}`}>
          <span className="alert-banner-icon">{config.icon}</span>
          <div>
            <div className="alert-banner-title">{alert.title}</div>
            <div className="alert-banner-sub">{config.sub}</div>
          </div>
        </div>
        <div className="alert-body">
          <p>{alert.message}</p>
          <button onClick={onClose}>OK, Got it</button>
        </div>
      </div>
    </div>
  );
}