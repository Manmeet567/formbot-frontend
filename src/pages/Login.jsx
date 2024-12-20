import React from 'react'
import AuthForm from '../components/AuthForm/AuthForm'

function Login() {
  return (
    <div className='login'>
        <h2>Login</h2>
        <AuthForm type="login" />
    </div>
  )
}

export default Login