# Nodira

**Nodira** is a decentralized platform where users share Wi-Fi access points and earn tokens when others connect. It promotes decentralized internet access while rewarding contributors.
The app offers a public Wi-Fi map, connection via QR codes, and router setup instructions. The backend includes NFT-based routers, a smart connection tracker, and a DAO for node reviews.

---

## 🚀 Features

- **Interactive Map** — Pin Wi-Fi hotspots and share details with others.
- **Pay-to-Access** — Unlock Wi-Fi information by paying a small SOL fee.
- **Solana + Phantom Wallet Integration** — Secure and fast payments via Phantom.
- **User Geolocation Support** — Center the map on your current location.
- **Clean Wallet UI** — Connect, view balance, and manage your identity.

---

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: CSS Modules
- **Blockchain**: Solana, Phantom Wallet Adapter
- **Mapping**: Leaflet.js + React Leaflet
- **Backend (planned)**: Supabase / Solana smart contracts

---

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/DevNodira/Nodira.git
cd Nodira

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev
```
## Usage

- Add Wi-Fi Pin: Click on the map → Fill in Wi-Fi name & description → Submit.

- Purchase Access: Click on a pin → If locked, pay small SOL fee → Unlock info.

- Connect Wallet: Use profile icon in top-right to connect your Phantom wallet.

- Check Balance: Your wallet balance is displayed in the dropdown.