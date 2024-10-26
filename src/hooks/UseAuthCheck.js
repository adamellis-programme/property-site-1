import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const UseAuthCheck = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user)
      } else {
        setLoggedInUser(null)
      }
    })
    return () => {}
  }, [])
  return { loggedInUser }
}

export default UseAuthCheck
