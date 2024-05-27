import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cnotes from '../../assets/images/cnotes.svg'

const Notification = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      navigate('/dashboard')
    }
  }, [token])

  return (
    <div>
      <div className='flex flex-col items-center justify-center mt-20'>
        <img src={Cnotes} alt='No notes' className='w-60' />

        <p className='w-1/2 text-sm font-medium text-slate-500 text-center leading-7 mt-5'>Welcome to CNotes. Please <Link to='/login' className='text-yellow-500'>login</Link> to your account to use the application</p>
      </div>
    </div>
  )
}

export default Notification