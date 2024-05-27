import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      <p className='w-1/2 text-sm font-medium text-slate-500 text-center leading-7 mt-5'>The website path is wrong. Please click <Link to='/login' className='text-blue-500'>here</Link> to log in</p>
    </div>
  )
}

export default NotFound