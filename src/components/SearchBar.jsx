import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import {db} from "../firebase"
import { AuthContext } from '../context/AuthContext';

const SearchBar = () => {

  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  // const [err, setErr] = useState(false)

  const {currentUser} = useContext(AuthContext)

  const usersRef = collection(db, "users")

  const handleSearch = async () => {
    const allUsers = query(usersRef, where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(allUsers);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data())
      });
    } catch (error) {
      // setErr(true)
      console.log(error)
    }
    
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    // check whether the chats collection exist in db
    const combineId = 
    currentUser.uid > user.uid 
      ? currentUser.uid + user.uid 
      : user.uid + currentUser.uid;
      try {
        const res = await getDoc(doc(db, "chats", combineId))
        if(!res.exists()) {
          // create chats in chats collection
          await setDoc(doc(db, "chats", combineId), {
            message:[]
          })

          // create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combineId+".userInfo"]:{
              uid:user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },
            [combineId+".data"]: serverTimestamp()
          })
          await updateDoc(doc(db, "userChats", user.uid), {
            [combineId+".userInfo"]:{
              uid:currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL
            },
            [combineId+".data"]: serverTimestamp()
          })
        }
      } catch (error) {
        // setErr(true)
        console.log(error)
      }
    
      setUser(null)
      setUsername("")
    // create user chats for 2 users
  }

  return (
    
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="find a user" onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}/>
      </div>
      {user && (
          <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="/" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        )
      }
    </div>
    )
}

export default SearchBar