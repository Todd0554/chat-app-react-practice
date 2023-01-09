import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";
import { db } from "../firebase";
import { storage } from "../firebase"
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [err,setErr] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]
    
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
    
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true)
          // Handle unsuccessful uploads
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            })

            await setDoc(doc(db, "userChats", res.user.uid),{})
            navigate("/")
          });
        }
      );
    } catch (e) {
      setErr(true)
      console.log(e.code, e.message)
    }
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
          {err && <span>Something wrong with your registration</span>}
        </form>
        <p>Already had an account? <a href="/login">Login</a></p>
      </div>
    </div>
  )
}

export default Register