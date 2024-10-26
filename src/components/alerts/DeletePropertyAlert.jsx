import { useRef, useEffect } from 'react'
import DeletePropertyButton from '../buttons/DeletePropertyButton'

const DeletePropertyAlert = ({ setShowDeleteAlert, listings }) => {
  const deleteRef = useRef()
  /**
   * click on the travel item
   * decrement the amount from the original data
   * have it sync with the cart and hold until
   * the sale has gone through if not place
   * it back
   */
  useEffect(() => {
    const deleteBtn = deleteRef.current
    deleteBtn.focus()
    return () => {}
  }, [])

  return (
    <div tabIndex={-1} ref={deleteRef} className="delete-property-alert">
      <p>you are about to delete this property...</p>

      <div className="delete-prop-btn-container">
        <DeletePropertyButton
          listings={listings}
          setShowDeleteAlert={setShowDeleteAlert}
        />
        <button onClick={() => setShowDeleteAlert(false)} className="back-delete-btn">
          back
        </button>
      </div>
    </div>
  )
}

export default DeletePropertyAlert
