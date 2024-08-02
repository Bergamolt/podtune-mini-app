import { initializeApp } from 'firebase/app'
import * as firestore from 'firebase/firestore/lite'

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
})

const db = firestore.getFirestore(app)

export const getData = async <T>(
  collection: string,
  userId: number
): Promise<T> => {
  const collectionRef = firestore.collection(db, collection)
  const docRef = await firestore.doc(collectionRef, userId.toString())
  const snapshot = await firestore.getDoc(docRef)

  return snapshot.data() as T
}

export const setData = async <T extends { [x: string]: any }>(
  collection: string,
  data: T,
  userId: number
): Promise<void> => {
  const collectionRef = firestore.collection(db, collection)
  const docRef = firestore.doc(collectionRef, userId.toString())

  await firestore.setDoc(docRef, data)
}
