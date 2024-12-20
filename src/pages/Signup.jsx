import React from 'react'
import AuthForm from '../components/AuthForm/AuthForm';

function Signup() {
  return (
    <div className='signup'>
        <h2>Sign Up</h2>
        <AuthForm type="signup" />
    </div>
  )
}

export default Signup