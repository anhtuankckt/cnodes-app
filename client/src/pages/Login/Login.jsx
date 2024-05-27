import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '~/components/Navbar/Navbar'
import PasswordInput from '~/input/PasswordInput'
import axiosIntance from '~/services/axiosInstance'
import { validateEmail } from '~/utils/helper'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!password) {
      setError('Please enter the password.')
      return
    }

    setError('')

    // Login API..
    try {
      const response = await axiosIntance.post('/auth/login',
        { email, password })
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken)
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg)
      } else {
        setError('An unexpected error occurred. Please try again')
      }
    }
  }

  return (
    <>
      <Navbar />

      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>

            <input
              type="text"
              placeholder='Email'
              className='input-box'
              value={email} onChange={(e) => setEmail(e.target.value)} />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)} />

            {error && <p className='text-red-500 text-sx pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>
              Login
            </button>

            <p className='text-sm text-center mt-4'>
              Not registered yet?{' '}
              <Link to='/signup' className='font-medium text-primary underline'>
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login