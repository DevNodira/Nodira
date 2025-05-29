'use client'

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import styles from './WifiMap.module.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
  });

  const customWifiIcon = new L.Icon({
    iconUrl: '/wifiIcon.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  const userIcon = new L.Icon({
  iconUrl: '/userIcon.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
  

  type WifiPoint = {
    lat: number;
    lng: number;
    name: string;
    description: string;
    price: number;
    ssid: string;
    password: string;
  };

function LocateButton({ onLocate }: { onLocate: (lat: number, lng: number) => void }) {
  const map = useMap();

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 18);
        onLocate(latitude, longitude);
      },
      (err) => {
        alert('Permission denied or location unavailable');
        console.error(err);
      }
    );
  };

  return (
    <button className={styles.locateButton} onClick={handleClick}>
      📍 Find Me
    </button>
  );
}

export default function WifiMap() {
  const [pins, setPins] = useState<WifiPoint[]>([]);
  const [newPinCoords, setNewPinCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '0.01',
    ssid: '',
    password: '',
  });
  const [userLocation, setUserLocation] = useState<[number, number] | undefined>();
  const [unlockedPins, setUnlockedPins] = useState<number[]>([]);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('unlockedPins');
    if (stored) setUnlockedPins(JSON.parse(stored));
  }, []);

  const saveUnlocked = (arr: number[]) => {
    setUnlockedPins(arr);
    localStorage.setItem('unlockedPins', JSON.stringify(arr));
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const target = (e.originalEvent as MouseEvent).target as HTMLElement;
          if (target.closest(`.${styles.locateButton}`)) {
            return;
        }
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
      price: parseFloat(formState.price),
      ssid: formState.ssid,
      password: formState.password,
    };

    setPins([...pins, newPin]);
    setNewPinCoords(null);
    setFormState({
      name: '',
      description: '',
      price: '0.01',
      ssid: '',
      password: '',
    });
  };

  const handleUnlock = async (price: number, idx: number) => {
    const success = await handlePayment(price);
    if (success) {
      const updated = [...unlockedPins, idx];
      saveUnlocked(updated);
    }
  };

  const handlePayment = async (price: number): Promise<boolean> => {
    try {
      if (!window.solana || !window.solana.isPhantom) {
        alert('Phantom Wallet not found');
        return false;
      }

      const provider = window.solana;
      await provider.connect();

      const sender = provider.publicKey;
      const recipient = new PublicKey('969AsGFCHevB5EzYmuoDfwMPn6Xo4gnkDiFUPMZzv3qs'); 
      const lamports = price * 1e9;

      const connection = new Connection('https://api.devnet.solana.com');
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: sender,
          toPubkey: recipient,
          lamports,
        })
      );

      transaction.feePayer = sender;
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      const signed = await provider.signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(txid);

      alert('Payment successful!');
      return true;
    } catch (err) {
      console.error(err);
      alert('Payment failed!');
      return false;
    }
  };

  return (
    <div className={styles.mapWrapper}>

      <MapContainer center={[51.505, -0.09]} zoom={150} className={styles.map} whenCreated={(map: any) => (mapRef.current = map)}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        <LocateButton onLocate={(lat, lng) => setUserLocation([lat, lng])}/>

        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              👤 You are here
            </Popup>
          </Marker>
        )}

        {pins.map((pin, idx) => (
          <Marker key={idx} position={[pin.lat, pin.lng]} icon={customWifiIcon}>
            <Popup>
              <strong>{pin.name}</strong>
              <br />
              {pin.description}
              <br />
              {unlockedPins.includes(idx) ? (
                <>
                  <p>📶 SSID: <b>{pin.ssid}</b></p>
                  <p>🔑 Password: <b>{pin.password}</b></p>
                </>
              ) : (
                <>
                  <p>🔒 Locked — {pin.price} SOL</p>
                  <button onClick={() => handleUnlock(pin.price, idx)}>
                    🔓 Unlock Wi-Fi
                  </button>
                </>
              )}
            </Popup>
          </Marker>
        ))}

{newPinCoords && (
          <Marker position={[newPinCoords.lat, newPinCoords.lng]} icon={customWifiIcon}>
            <Popup>
              <form onSubmit={handleFormSubmit} className={styles.form}>
                <input
                  type="text"
                  placeholder="Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="SSID"
                  value={formState.ssid}
                  onChange={(e) => setFormState({ ...formState, ssid: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Password"
                  value={formState.password}
                  onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Price (SOL)"
                  value={formState.price}
                  onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                  required
                />
                <button type="submit">Add Wi-Fi</button>
              </form>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>

  );
}