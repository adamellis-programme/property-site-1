import { useSelector } from 'react-redux'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { setListings } from '../../features/properties/propertiesSlice'
import { useDispatch } from 'react-redux'

import UseAuthCheck from '../../hooks/UseAuthCheck'
const DeletePropertyButton = ({ listings, setShowDeleteAlert }) => {
  const { loggedInUser } = UseAuthCheck()
  // console.log(loggedInUser)
  const dispatch = useDispatch()
  const { propIndex } = useSelector((state) => state.property)
  const propertyForDeletion = listings[propIndex]
  const imgsToDelete = propertyForDeletion.data?.imgURLS

  const deleteImgFromStorage = (pathName) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage()

      // Create a reference to the file to delete
      const imgRef = ref(storage, pathName)

      // Delete the file
      deleteObject(imgRef)
        .then(() => {
          console.log('img deleted successfully')
          resolve(`${pathName} successfully deleted`)
        })
        .catch((error) => {
          reject(`Failed to delete ${pathName}: ${error.message}`)
        })
    })
  }

  const handleDeleteSubmit = async () => {
    // change it to id
    console.log('deleted', propertyForDeletion)
    const propertyOwnerID = propertyForDeletion.data?.propertyOwner
    const loggedInUSerID = loggedInUser.uid

    console.log({
      propOwner: propertyOwnerID,
      loggedInUser: loggedInUSerID,
    })
    console.log(loggedInUser)

    try {
      // security check
      if (propertyOwnerID !== loggedInUSerID) {
        throw new Error('you must be the property owner')
      }

      // map returns something --> is there another way using for of
      const deletePromises = imgsToDelete.map((item) => deleteImgFromStorage(item.fullPath))
      // const deletePromises = imgsToDelete.map((item) => {
      //   const itemPath = item.fullPath
      //   return deleteImgFromStorage(itemPath)
      // })

      const results = await Promise.all(deletePromises)
      console.log(results)
      results.forEach((msg) => console.log(msg))

      const updatedArr = listings.filter((item) => item.id !== propertyForDeletion.id)
      dispatch(setListings(updatedArr))

      console.log(updatedArr)
      setShowDeleteAlert(false)
      await deleteDoc(doc(db, 'listings', propertyForDeletion.id))
    } catch (error) {
      console.error('Error deleting property:', error.message)
    }
  }

  return (
    <button onClick={handleDeleteSubmit} className="delete-prop-btn">
      delete
    </button>
  )
}

export default DeletePropertyButton
