import React from 'react'
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import Chats from './Chats';

const SideBar = () => {
  return (
    <div className="sidebar">
        <NavBar/>
        <SearchBar/>
        <Chats />
    </div>
  )
}

export default SideBar