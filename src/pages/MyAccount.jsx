import { useEffect, useState } from 'react'
import UseAuthCheck from '../hooks/UseAuthCheck'
import { ownerListings, fetchUser } from '../features/properties/propertiesAction'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UpdateProfileImg from '../components/buttons/UpdateProfileImg'
import PageLoader from '../components/loaders/PageLoader'
import UpdateImgLoader from '../components/loaders/UpdateImgLoader'
import SectionHeader from '../layout/SectionHeader'
import DeleteAccountModal from '../components/modals/DeleteAccountModal'

const MyAccount = () => {
  const { messages } = useSelector((state) => state.property)
  const [userListings, setUserListings] = useState(null)
  const [userData, setUserData] = useState(null)
  const [firstImgUrls, setFirstImgUrls] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imgLoading, setImgLoading] = useState({}) // State to track loading of each image
  const { loggedInUser } = UseAuthCheck()
  // setShowModal
  const [showModal, setShowModal] = useState(false)
  /**
   * can do away with quite a bit of logic below
   * the loading will work as long as onLoad={() => handleImageLoad(i)}
   * rturns the correct value, in this case true
   * can also be shortened to [index] : true
   * and then check for true in the CSS class
   *
   * I have written the code like this so logicly we have a
   * false for not loaded and a true for isLoaded
   */
  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true)
        if (loggedInUser) {
          const listingsRes = await ownerListings('listings', loggedInUser.uid)
          const usersRes = await fetchUser('users', loggedInUser.uid)
          setUserListings(listingsRes)
          setUserData(usersRes)

          const data = []
          const loadingState = {}
          if (listingsRes) {
            listingsRes.forEach((item, index) => {
              const itemData = {
                url: item.data.imgURLS[0]?.url,
                location: item.data.location,
                id: item.id,
              }
              data.push(itemData)
              // set object on index

              // same same as  loadingState[index] = {...}
              // setImgLoading((prevState) => ({
              //   ...prevState,
              //   loadingState: { finishedLoading: false }, // Initialize loading state for each image
              // }))
              // ** it loops to get the length here
              loadingState[index] = { finishedLoading: false } // Initialize loading state for each image
            })
            setFirstImgUrls(data)
            // have to use setImgLoading as this make it global state
            setImgLoading(loadingState) // Set initial loading state
          }
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getUserData()
  }, [loggedInUser])

  // ** can just loop to get the length here too
  // can be jus [0: true, 1: true ] etc
  const handleImageLoad = (index) => {
    setImgLoading((prevState) => ({ ...prevState, [index]: { finishedLoading: true } }))
  }
  // const handleImageLoad = (index) => {
  //   setImgLoading((prevState) => ({
  //     ...prevState,
  //     [index]: { finishedLoading: true } // Update finishedLoading state for the specific image
  //   }))
  // }

  if (loading) {
    return <PageLoader />
  }

  // console.log(firstImgUrls)
  // console.log(imgLoading)

  return (
    <div className="page-container my-account-container">
      {showModal && <DeleteAccountModal setShowModal={setShowModal} />}
      <div className="my-account-card">
        <div>
          <SectionHeader text={`your details`} />

          <div>
            <p className="account-p">
              <span>name:</span>
              <span>{loggedInUser?.displayName}</span>
            </p>
            <p className="account-p">
              <span>email:</span>
              <span>{loggedInUser?.email}</span>
            </p>
            <p className="account-p">
              <span>properties:</span>
              <span>{userListings?.length}</span>
            </p>
            <p className="account-p">
              <span>messages:</span>
              <span>{messages?.length}</span>
            </p>
            <p className="account-p">
              <span>bookmarked:</span>
              <span>{userData?.data?.bookmarked?.length}</span>
            </p>
          </div>
        </div>
        <div>
          <SectionHeader text={`your listed properties`} />
          {userListings?.length < 1 && !loading && (
            <div className="no-listings-div">no listings to show</div>
          )}
          {/* hide and display img / loader based on boolean */}
          {/* prettier-ignore */}
          <div className="account-grid">
            {firstImgUrls &&
              firstImgUrls.map((item, i) => (
                <Link key={i} to={`/property-details/${item.id}`}>
                  <div className="account-prop-img-small-div">
                    {/* display the loader until finishedLoading is set to false */}
                    {imgLoading[i].finishedLoading !== true && <UpdateImgLoader />}
                    <img
                      className="acc-small-prop-img"
                      src={item?.url}
                      alt=""
                      // sends a true response to the fucnton and we can use css to do whatever we want to the rest of the elements on the page 
                      onLoad={() => handleImageLoad(i)}
                      style={{display: imgLoading[i]?.finishedLoading === true ? 'block' : 'none',
                      }} // Hide the image until it loads
                    />
                    <p className="small-img-p">{item?.location.slice(0, 5) + '...'}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="acc-btn-container">
          <UpdateProfileImg loggedInUser={loggedInUser} />
          <button onClick={() => setShowModal(true)} className="delete-acc-btn">
            delete-account
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
