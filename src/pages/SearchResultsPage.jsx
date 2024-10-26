import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'
import PropertyCard from '../layout/PropertyCard'

// const propTypeParam = searchParams.get('propType') === '' ? 'all' : searchParams.get('propType')
const SearchResultsPage = () => {
  const [listings, setListings] = useState(null)
  const location = useLocation()
  const [imgLoading, setImgLoading] = useState({})

  useEffect(() => {
    const getSearchData = async () => {
      const searchParams = new URLSearchParams(location.search)
      const locationParam = searchParams.get('location').toLowerCase() || ''
      const propTypeParam = searchParams.get('propType').toLowerCase() || ''
      const from = searchParams.get('from')

      // console.log(propTypeParam)
      // console.log(locationParam)

      // ** if search from nav **
      if (from === 'nav') {
        const results = []
        const querySnapshot = await getDocs(collection(db, 'listings'))
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          // can use data.tags but cannot run toLowerCase on them
          // can use data.tags but cannot run toLowerCase on them
          // can use data.tags but cannot run toLowerCase on them
          if (
            // these TESTS RETURN TRUE / FALSE BOOLEANS
            // these TESTS RETURN TRUE / FALSE BOOLEANS
            // these TESTS RETURN TRUE / FALSE BOOLEANS
            // these TESTS RETURN TRUE / FALSE BOOLEANS
            //  IF TRUE THEN PROCEDE
            (data.location.toLowerCase().includes(locationParam) ||
              data.tags.some((tag) => tag.toLowerCase().includes(locationParam))) &&
            locationParam.trim() !== ''
          ) {
            results.push({ id: doc.id, data: data })
          }
        })
        setListings(results)

        // handle image loading state
        const imgLoadState = setLoadingState(results)
        setImgLoading(imgLoadState)
        // console.log(imgLoadState)

        return
      }

      // ** if from home search form **
      const q = query(collection(db, 'listings'))
      const querySnapshot = await getDocs(q)
      const results = []
      // prettier-ignore
      querySnapshot.forEach((doc) => {
        const data = doc.data()

        // place in (  )
        // only get data if all is selected and there is something in location
        if(propTypeParam === 'all' && locationParam !== '' && data.location.toLowerCase().includes(locationParam)){
          results.push({ id: doc.id, data: data })
          return
        }

        // only get data if location AND type is selected
        if(data.propertyType.toLowerCase() === propTypeParam && (data.location.toLowerCase().includes(locationParam) || data.tags.some((tag) => tag.toLowerCase().includes(locationParam)))  ){
          results.push({ id: doc.id, data: data })
        }
      })
      setListings(results)

      const imgLoadState = setLoadingState(results)
      setImgLoading(imgLoadState)
      // console.log(imgLoadState)
    }

    getSearchData()
  }, [location.search])

  function setLoadingState(data) {
    const loadingImgState = data.reduce((acc, _, index) => {
      acc[index] = { finishedLoading: false }
      return acc
    }, {})

    return loadingImgState
  }

  const handleImgLoad = (i) => {
    setImgLoading((prevState) => ({
      ...prevState,
      [i]: { finishedLoading: true },
    }))
  }

  // console.log(imgLoading)
  return (
    <div className="search-body">
      <div className="search-results-page">
        {listings && listings.length < 1 ? (
          <div className="no-matching-prop-div">
            <p>no matching properties</p>
          </div>
        ) : (
          listings?.map((item, i) => (
            <PropertyCard
              key={item.id}
              item={item}
              imgLoading={imgLoading}
              handleImgLoad={handleImgLoad}
              i={i}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default SearchResultsPage

// if (propTypeParam === 'all' && data.location.toLowerCase().includes(locationParam)) {
// results.push({ id: doc.id, data: data })
// return
// }

// // could also be a nested if statment
// if (propTypeParam === 'all' && locationParam.trim() !== '' && data.location.toLowerCase().includes(locationParam)) {
//   results.push({ id: doc.id, data: data })
//   return
// }

// if ( data.location.toLowerCase().includes(locationParam.toLowerCase()) && data.propertyType.toLowerCase() === propTypeParam.toLowerCase()) {
//   results.push({ id: doc.id, data: data })
// }
