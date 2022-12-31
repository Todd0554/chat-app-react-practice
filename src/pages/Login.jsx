import React from 'react'

const Login = () => {
  return (
    <div className="formCotainer">
      <div className="formWrapper">
        <span className="logo">MuFeng Chat</span>
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign In</button>
        </form>
        <p>Already had an account? <a href="">Register</a></p>
      </div>
    </div>
  )
}

export default Login