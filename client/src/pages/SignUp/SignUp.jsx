import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '~/components/Navbar/Navbar'
import PasswordInput from '~/input/PasswordInput'
import { validateEmail } from '~/utils/helper'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSignUp = async (e) => {
    e.prventDefault()

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