import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './layout/Header'
import PropertyDetails from './pages/PropertyDetails'
import AllProperties from './pages/AllProperties'
import MyProfile from './pages/MyProfile'
import MyAccount from './pages/MyAccount'
import RegisterNewProperty from './pages/RegisterNewProperty'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ManageImages from './pages/ManageImages'
import BookmarkedProperties from './pages/BookmarkedProperties'
import Messages from './pages/Messages'
import SearchResultsPage from './pages/SearchResultsPage'
import UpdateProperty from './pages/UpdateProperty'
import Footer from './layout/Footer'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
          <Route path="/all" element={<AllProperties />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/@me" element={<MyAccount />} />
          <Route path="/manage/:id" element={<ManageImages />} />
          <Route path="/messages/:id" element={<Messages />} />
          <Route path="/bookmarked" element={<BookmarkedProperties />} />
          <Route path="/register" element={<RegisterNewProperty />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/update" element={<UpdateProperty />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
