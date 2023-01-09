import React, { useContext, useState } from 'react'
import Img from '../img/img.png'
import attach from '../img/attach.png'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import {db} from "../firebase.js"
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from "../firebase"
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'

const Input = () => {
  const {data} = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext)

  const [err,setErr] = useState(false)
  const [text,setText] = useState("")
  const [img,setImg] = useState(null)

  const handleSend = async () => {

    if(img){
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setErr(true)
          // Handle unsuccessful uploads
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                img: downloadURL,
                data: Timestamp.now()
              })
            });
          });
        }
      );

    }else{
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          data: Timestamp.now()
        })
      });
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    });
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    });

    setImg(null)
    setText("")
  };
  return (
    <div className="input">
        <input type="text" placeholder="Enter something..." onChange={e=>setText(e.target.value)} value={text}/>

        <div className="send">
          <img src={attach} alt="" />
          <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
          <label htmlFor="file">
            <img src={Img} alt="" />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input