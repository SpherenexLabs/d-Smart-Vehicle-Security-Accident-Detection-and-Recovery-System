import React from "react";

export default function DirectionControls({ onSendDirection }) {
  return (
    <div className="direction-panel">
      <div className="direction-heading">
        <div className="panel-icon icon-amber" style={{ width: 36, height: 36, fontSize: 18, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>🎮</div>
        <h3>Manual Direction Control</h3>
      </div>

      <div className="dpad-wrap">
        <div className="direction-grid">
          <button className="dir-empty" disabled></button>
          <button onClick={() => onSendDirection("F")}>
            <span className="dir-arrow">↑</span>
            <span>Forward</span>
          </button>
          <button className="dir-empty" disabled></button>

          <button onClick={() => onSendDirection("L")}>
            <span className="dir-arrow">←</span>
            <span>Left</span>
          </button>
          <button className="dir-stop" onClick={() => onSendDirection("S")}>
            <span className="dir-arrow">■</span>
            <span>Stop</span>
          </button>
          <button onClick={() => onSendDirection("R")}>
            <span className="dir-arrow">→</span>
            <span>Right</span>
          </button>

          <button className="dir-empty" disabled></button>
          <button onClick={() => onSendDirection("B")}>
            <span className="dir-arrow">↓</span>
            <span>Backward</span>
          </button>
          <button className="dir-empty" disabled></button>
        </div>
      </div>
    </div>
  );
}