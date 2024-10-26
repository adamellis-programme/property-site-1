import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase-config'
import { fetchUser } from '../features/properties/propertiesAction'
import { useParams } from 'react-router-dom'
const BookMarkPropertyButton = () => {
  const { id } = useParams()
  // console.log(id)
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [bookmarked, setBookmarked] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user)
        // console.log(loggedInUser)
      } else {
        // User is signed out
        setLoggedInUser(null)
      }
    })

    return () => {}
  }, [loggedInUser])

  useEffect(() => {
    const getData = async () => {
      if (loggedInUser) {
        const res = await fetchUser('users', loggedInUser.uid)
        // console.log(res.data.bookmarked)

        if (res.data?.bookmarked?.includes(id)) {
          setBookmarked(true)
        }
        setUserData(res.data)
      }
    }

    getData()
    return () => {}
  }, [loggedInUser])
  // console.log(userData)

  const handleBookMark = async () => {
    const res = await fetchUser('users', loggedInUser.uid)
    const bookmarkArr = res.data.bookmarked
    console.log(bookmarkArr)

    // console.log(res)
    if (!bookmarkArr.includes(id)) {
      bookmarkArr.push(id)
      setBookmarked(true)
    } else if (bookmarkArr.includes(id)) {
      const indexToDelete = bookmarkArr.indexOf(id)
      bookmarkArr.splice(indexToDelete, 1)
      setBookmarked(false)
    }

    console.log(bookmarkArr)

    // Set the "capital" field of the city 'DC'
    const washingtonRef = doc(db, 'users', loggedInUser.uid)
    await updateDoc(washingtonRef, {
      bookmarked: bookmarkArr,
    })
  }
  return (
    <div className="bookmark-container">
      <button
        onClick={handleBookMark}
        className={`bookmark-btn ${bookmarked && 'bookmarked'}`}
      >
        {bookmarked ? 'bookmarked' : 'bookmark'}
      </button>
    </div>
  )
}

export default BookMarkPropertyButton
