import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { TripInfo } from "./types.ts";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FirebaseApp);

export function isAdminOnTrip(tripInfo: TripInfo, accountID: string) {
    return tripInfo.adminID === accountID;
}
