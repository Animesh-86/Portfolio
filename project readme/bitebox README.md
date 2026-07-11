# BiteBox Cafe Billing Ecosystem

A modern, multi-tenant billing and management ecosystem designed for cafes and restaurants. It consists of a robust Flutter POS application for in-store operations and a Next.js Admin Web Panel for central management, connected via a unified Firebase backend.

**Current Version**: 1.0.0  
**Status**: Production Ready

---

## Ecosystem Architecture

The BiteBox ecosystem is divided into two primary applications connected by a central cloud backend.

### 1. BiteBox POS (Flutter Mobile/Tablet)
The point-of-sale application used by staff in the cafe to manage orders, print receipts, and handle daily operations.

- **Fast Order Management**: Quick item selection, hold orders, and real-time cart sync across multiple staff devices.
- **Offline-First Storage**: Uses SQLite (Drift) for local storage, ensuring operations continue without internet, syncing to the cloud when online.
- **Thermal Printing**: Direct Bluetooth integration for instant receipt printing (ESC/POS).
- **Payment Processing**: Support for Cash, UPI, Card, and split payments.

### 2. BiteBox Admin Web (Next.js Web App)
The central command center for cafe owners and super-admins to manage tenants, view analytics, and control settings across all branches.

- **Multi-Tenant Management**: Create and manage multiple cafe branches securely from a single dashboard.
- **Real-Time Analytics**: Monitor live revenue, order counts, and staff performance across all locations.
- **User Management**: Centralized role-based access control for cafe owners and staff.

### 3. Cloud Infrastructure (Firebase)
- **Firestore**: Secure, scalable document database storing cafes, orders, and user profiles.
- **Firebase Auth**: Identity management for admins, owners, and staff.
- **Security Rules**: Tenant-isolated data access ensuring strict privacy between cafes.

---

## Project Structure

```text
BiteBox-Cafe-Billing-App/
├── bitebox_admin_web/               # Next.js Admin Web Panel
│   ├── src/app/                     # Next.js App Router (Dashboard, Auth, APIs)
│   ├── src/components/              # Reusable React components
│   └── src/lib/                     # Firebase and utility functions
│
├── bitebox_pos/                     # Flutter POS Application
│   ├── android/                     # Native Android code
│   ├── ios/                         # Native iOS code
│   ├── lib/
│   │   ├── main.dart                # POS App entry point
│   │   ├── data/                    # Drift SQLite DB, Repositories, Providers
│   │   ├── services/                # Printing, Sync, and Business logic
│   │   └── ui/                      # Material 3 UI Screens and Widgets
│   └── pubspec.yaml                 # Flutter dependencies
│
├── firebase.json                    # Firebase deployment configuration
└── README.md                        # Project documentation
```

---

## Technology Stack

### POS Application (BiteBox POS)
- **Framework**: Flutter (Dart)
- **State Management**: Riverpod
- **Local Database**: SQLite via Drift ORM
- **Hardware Integration**: Blue Thermal Printer plugin

### Admin Panel (BiteBox Admin Web)
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

### Backend
- **Platform**: Google Firebase
- **Database**: Cloud Firestore
- **Authentication**: Firebase Authentication
- **Deployment**: Firebase Hosting / Vercel

---

## Getting Started

### Running the Admin Web Panel
1. Navigate to the web directory: `cd bitebox_admin_web`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the dashboard at `http://localhost:3000`

### Running the POS Application
1. Navigate to the POS directory: `cd bitebox_pos`
2. Fetch Flutter packages: `flutter pub get`
3. Generate Drift database files: `flutter pub run build_runner build --delete-conflicting-outputs`
4. Run the application: `flutter run`

---

## Deployment

- **Admin Web Panel**: Designed for zero-configuration deployment on Vercel. Connect your repository and set the root directory to `bitebox_admin_web`.
- **POS Application**: Build APK/AAB via `flutter build apk` or `flutter build appbundle` for Android distribution.
- **Firebase Security Rules**: Deploy updated rules using the Firebase CLI from the project root via `firebase deploy --only firestore:rules`.
