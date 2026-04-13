import React from "react";

function Card({ title, value, alert, warn }) {
  const cls = `card${alert && Number(value) === 1 ? " alert-active" : warn && Number(value) === 1 ? " warn-active" : ""}`;
  return (
    <div className={cls}>
      <h3>{title}</h3>
      <p>{String(value)}</p>
    </div>
  );
}

export default function DashboardCards({ data, userCount }) {
  return (
    <div className="cards-grid">
      <Card title="Accident"         value={data.Accident}     alert />
      <Card title="Unauthorized"     value={data.Unauthorized} alert />
      <Card title="Vibration"        value={data.Vibration}    warn />
      <Card title="Obstacle"         value={data.Obstacle}     warn />
      <Card title="Ax"               value={data.Ax} />
      <Card title="Ay"               value={data.Ay} />
      <Card title="Az"               value={data.Az} />
      <Card title="Count"            value={data.Count} />
      <Card title="Relay"            value={data.Relay} />
      <Card title="Direction"        value={data.Direction} />
      <Card title="Enroll Sent"      value={data.Enroll} />
      <Card title="Delete Sent"      value={data.Delete} />
      <Card title="Registered Users" value={userCount} />
    </div>
  );
}