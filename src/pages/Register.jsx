 import React from 'react'

const Register = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const avatar = e.target[3].value
  }



  return (
    <div className="formCotainer">
      <div className="formWrapper">
        <span className="logo">MuFeng Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          
          <input 
            style={{display:"none"}} 
            type="file" 
            id="file"
          />
          <label htmlFor="file">
            <img src="https://www.lifewire.com/thmb/tHjH9M19MsA9gFY-qcZvKYv5oG4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cloud-upload-a30f385a928e44e199a62210d578375a.jpg" alt="#" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>Already had an account? <a href="">Login</a></p>
      </div>
    </div>
  )
}

export default Register