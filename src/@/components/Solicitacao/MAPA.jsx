// src/components/MapComponent.js
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ onLocationSelect }) => {
  const [position, setPosition] = useState([-15.6147, -47.5167]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng); // Pass the selected location to the parent
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[-15.6191, -47.655]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && (
        <Marker position={position}>
          <Popup>Local selecionado</Popup>
        </Marker>
      )}
      <MapEvents />
    </MapContainer>
  );
};

export default MapComponent;
