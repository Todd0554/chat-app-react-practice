import React from 'react'

const SearchBar = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="find a user" />
      </div>
      <div className="userChat">
        <img src="https://e-cdn-images.dzcdn.net/images/artist/77220ccb5a36d0e5df2c9e47f2c89de4/264x264-000000-80-0-0.jpg" alt="/" />
        <div className="userChatInfo">
          <span>Dean</span>
        </div>
      </div>
    </div>
  )
}

export default SearchBar