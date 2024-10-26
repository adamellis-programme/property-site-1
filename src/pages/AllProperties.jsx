import { useState, useEffect } from 'react'
import PropertySearchForm from '../components/search/PropertySearchForm'
import PageHeader from '../layout/PageHeader'
import PropertyCard from '../layout/PropertyCard'

import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'
import { fetchAllProperties, fetchUser } from '../features/properties/propertiesAction'
import { useDispatch, useSelector } from 'react-redux'
import { setProperties } from '../features/properties/propertiesSlice'
import PageLoader from '../components/loaders/PageLoader'
import PageAlert from '../components/alerts/PageAlert'
const AllProperties = () => {
  const { properties } = useSelector((state) => state.property)
  const [showAlert, setShowAlert] = useState(false)

  const [imgLoading, setImgLoading] = useState({})

  const dispatch = useDispatch()
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(false)

  //  we need to write the same logic in here as is in the
  // HOME PAGE

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchAllProperties('listings')
        // 2: use this to get the lengtn of the array
        const loadingImgState = data.reduce((acc, _, index) => {
          acc[index] = { finishedLoading: false }
          return acc
        }, {})
        setImgLoading(loadingImgState)
        // console.log(data)
        setListings(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }

    fetchData()
    return () => {}
  }, [])

  const handleImgLoad = (i) => {
    console.log(i)
    setImgLoading((prevState) => ({
      ...prevState,
      [i]: { finishedLoading: true },
    }))
  }

  if (loading) {
    return <PageLoader />
  }

  console.log(imgLoading)
  return (
    <div className="all-properties-page">
      <section className="all-properties-header">
        <PageHeader text={`check out all our properties `} />
        <div className="alert-container">
          {showAlert && (
            <PageAlert text={`please include a location`} alertStyle={'danger'} />
          )}
        </div>
        <div className="search-all-container">
          <PropertySearchForm setShowAlert={setShowAlert} page={{ from: 'all' }} />
        </div>
      </section>
      {/* search by tag */}
      <section className="all-prop-section">
        {listings &&
          listings.map((item, i) => (
            <PropertyCard
              imgLoading={imgLoading}
              setImgLoading={setImgLoading}
              handleImgLoad={handleImgLoad}
              key={item.id}
              item={item}
              i={i}
            />
          ))}
      </section>
    </div>
  )
}

export default AllProperties
