import React from 'react'

const NavBar = () => {
  return (
    <div className="navbar">
      <span className="logo">MF Chat</span>
      <div className="user">
        <img src="https://pyxis.nymag.com/v1/imgs/630/6e0/eb215ad90cd826b9e57ff505f54c5c7228-07-avatar.rhorizontal.w700.jpg" alt="#" />
        <span>Todd</span>
        <button>Log Out</button>
      </div>
    </div>
  )
}

export default NavBar