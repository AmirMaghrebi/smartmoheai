# m2smart - Commercial Smart Home Platform

A commercial-grade smart home platform designed for hundreds of thousands of users, supporting millions of IoT devices with real-time control, offline capabilities, and emergency alert systems.

## 🏗️ Architecture

- **Frontend**: Vue 3 + TypeScript + Vite + PWA
- **Backend**: Node.js + TypeScript + Modular Monolith
- **Database**: PostgreSQL + TimescaleDB (for telemetry)
- **Cache**: Redis
- **MQTT Broker**: EMQX (or compatible)
- **Real-time**: WebSocket + MQTT
- **SMS/Call**: Pluggable provider (e.g., Faraz SMS)

## 🎯 Core Principles

1. **Simple by Default, Powerful When Needed**
2. **Online-First with Offline Fallback**
3. **Security by Design**
4. **Hardware Agnostic**
5. **Global Control from Anywhere**

## 📁 Project Structure

```
m2smart/
├── backend/          # Node.js + TypeScript API
├── frontend/         # Vue 3 + TypeScript PWA
├── docs/             # Architecture & Security documentation
├── scripts/          # Deployment & utility scripts
├── deploy/           # Docker & Ubuntu deployment configs
└── README.md
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌍 Supported Languages

- English (Default)
- Persian (فارسی)
- Arabic (العربية)
- Turkish (Türkçe)
- Russian (Русский)

## 📱 Features

- Real-time device control via MQTT
- Offline local control fallback
- Emergency alerts (SMS/Call/Push)
- Multi-property management
- Advanced automation engine
- Energy monitoring
- Role-based access control
- Dark/Light theme
- RTL/LTR support

## 🔐 Security

- Zero Trust architecture
- Secure device provisioning
- Encrypted communications
- Granular permissions
- Audit logging

## 📄 License

Proprietary - All rights reserved

---

**Brand**: m2smart  
**Repository**: https://github.com/AmirMaghrebi/smartmoheai
