import { db } from '../../firebase-config'

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
  updateDoc,
} from 'firebase/firestore'

export const fetchProperty = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // console.log(docSnap.id)
      return { data: docSnap.data(), id: docSnap.id }
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchUser = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data())
      return { data: docSnap.data(), id: docSnap.id }
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  } catch (error) {}
}

export const fetchAllProperties = async (collectionName) => {
  const data = []
  try {
    const q = query(collection(db, collectionName))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data())
      data.push({ data: doc.data(), id: doc.id })
    })
  } catch (error) {
    console.log(error)
  }

  return data
}

// get featured properties
export const fetchFeatured = async (collectionName) => {
  const data = []
  try {
    const q = query(collection(db, 'listings'), where('featured', '==', true), limit(2))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data())
      data.push({ data: doc.data(), id: doc.id })
    })
  } catch (error) {
    console.log(error)
  }

  return data
}
// get featured properties limit to 3 ADD IN THE WHERE DATE == 'LATEST'
export const fetchRecent = async (collectionName) => {
  const data = []
  try {
    const q = query(collection(db, collectionName), limit(3))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data())
      data.push({ data: doc.data(), id: doc.id })
    })
  } catch (error) {
    console.log(error)
  }

  return data
}

// get featured properties
export const ownerListings = async (collectionName, userID) => {
  const data = []
  try {
    const q = query(collection(db, collectionName), where('propertyOwner', '==', userID))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data())
      data.push({ data: doc.data(), id: doc.id })
    })
  } catch (error) {
    console.log(error)
  }

  return data
}

export const getMessages = async (loggedInUserId) => {
  const data = []
  const q = query(
    collection(db, 'messages'),
    where('propertyOwnerID', '==', loggedInUserId)
  )

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data())
    data.push({ data: doc.data(), id: doc.id })
  })

  return data
}

export const fetchMessage = async (msgID) => {
  const docRef = doc(db, 'messages', msgID)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data())
    return docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!')
  }
}

export const updateViews = async (id, viewCount) => {
  const viewRef = doc(db, 'listings', id)

  await updateDoc(viewRef, {
    views: viewCount,
  })
}
