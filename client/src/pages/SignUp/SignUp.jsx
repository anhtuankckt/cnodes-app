import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '~/components/Navbar/Navbar'
import PasswordInput from '~/input/PasswordInput'
import { validateEmail } from '~/utils/helper'
import axiosIntance from '~/services/axiosInstance'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!name) {
      setError('Please enter your name.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please eneter a valid email.')
      return
    }

    if (!password) {
      setError('Please enter your password.')
      return
    }

    setError('')
    // Sign Up Api..
    try {
      const response = await axiosIntance.post('/auth/create-account', { fullName: name, email, password })

      if (response.data && response.data.error) {
        setError(response.data.msg)
        return
      }

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
          <form onSubmit={handleSignUp}>
            <h4 className='text-2xl mb-7'>SignUp</h4>

            <input
              type="text"
              placeholder='Name'
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder='Email'
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)} />

            {error && <p className='text-red-500 text-sx pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>
              Create Account
            </button>

            <p className='text-sm text-center mt-4'>
              Already have an acctoun?{' '}
              <Link to='/login' className='font-medium text-primary underline'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp