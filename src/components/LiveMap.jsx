import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
};

export default function LiveMap({ location }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAADbfCsSV024p4bhaeeOtqp1mf1WcKp4o",
  });

  if (!isLoaded) return <div className="map-box">Loading map...</div>;
  if (!location) return <div className="map-box">Getting current location...</div>;

  return (
    <div className="map-wrapper">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={16}
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
}