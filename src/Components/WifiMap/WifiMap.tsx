'use client'

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import styles from './WifiMap.module.css';

// Переопределяем иконку Leaflet, иначе не работает по дефолту
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
  });
  

type WifiPoint = {
  lat: number;
  lng: number;
  name: string;
  description: string;
};

export default function WifiMap() {
  const [pins, setPins] = useState<WifiPoint[]>([]);
  const [newPinCoords, setNewPinCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [formState, setFormState] = useState({ name: '', description: '' });

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setNewPinCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinCoords) return;

    const newPin: WifiPoint = {
      lat: newPinCoords.lat,
      lng: newPinCoords.lng,
      name: formState.name,
      description: formState.description,
    };

    setPins([...pins, newPin]);
    setNewPinCoords(null);
    setFormState({ name: '', description: '' });
  };

  return (
    <div className={styles.mapWrapper}>
      <MapContainer center={[51.505, -0.09]} zoom={13} className={styles.map}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />

        {pins.map((pin, idx) => (
          <Marker key={idx} position={[pin.lat, pin.lng]}>
            <Popup>
              <strong>{pin.name}</strong>
              <br />
              {pin.description}
            </Popup>
          </Marker>
        ))}

        {newPinCoords && (
          <Marker position={[newPinCoords.lat, newPinCoords.lng]}>
            <Popup>
              <form onSubmit={handleFormSubmit} className={styles.form}>
                <input
                  type="text"
                  placeholder="Название Wi-Fi"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Описание"
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                />
                <button type="submit">Добавить</button>
              </form>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}