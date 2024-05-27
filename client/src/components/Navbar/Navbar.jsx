import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery('')
    handleClearSearch()
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>CNotes</h2>

      {userInfo && (<SearchBar
        value={searchQuery}
        onChange={({ target }) => { setSearchQuery(target.value) }}
        onClearSearch={onClearSearch}
        handleSearch={handleSearch}
      />)}

      {userInfo && (<ProfileInfo userInfo={userInfo} onLogout={onLogout} />)}
    </div>
  )
}

export default Navbar