// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// to={`/update/${item.id}`}
const UpdatePropertyButton = ({ item }) => {
  const navigate = useNavigate()
  const handleUpdate = () => {
    const data = {
      id: item.id,
    }

    const new_params = new URLSearchParams(data)
    console.log(data)
    console.log(new_params)
    // in App.js we do not set the /:id
    // it is just "/update"  ---> then ?${new_params}` is tacked on
    // manually place the ?
    navigate(`/update?${new_params}`)
  }

  return (
    <button onClick={handleUpdate} className="update-prop-btn">
      update
    </button>
  )
}

export default UpdatePropertyButton
