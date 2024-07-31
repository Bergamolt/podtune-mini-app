import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT as admin.ServiceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })
}

export const db = admin.firestore()