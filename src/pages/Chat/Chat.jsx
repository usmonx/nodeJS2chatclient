import React, { useEffect, useState } from 'react'
import { useInfoContext } from '../../context/Context'
import io from "socket.io-client"
import "./Chat.css"
import { Search } from '../../components/Search/Search'
import { InfoModal } from '../../components/InfoModal/InfoModal'
import { ChatBox } from '../../components/ChatBox/ChatBox'
import { Converstation } from '../../components/Converstation/Converstation'
import { userChats } from '../../api/chatRequest'

// const socket = io.connect(`http://localhost:4001/`)

export const Chat = () => {

  const {currentUser, onlineUsers, setOnlineUsers, modal, setModal, exit, setCurrentChat, chats, setChats} = useInfoContext()

  const [sendMessage, setSendMessage] = useState(null)
  const [recievedMessage, setRecievedMessage] = useState(null)

  // Get the chat in the sections

  useEffect(()=> {
    const getChats = async () => {
      try {
        const {data} = await userChats()
        setChats(data)
      } catch (error) {
        console.log(error);
        if(error.response.data.message === "jwt expired") {
          exit()
        }
      }
    }
    
    getChats()
  }, [currentUser._id])

  // useEffect(()=> {
  //   socket.emit("new-user-add", currentUser._id)

  //   socket.on('get-users', (users) => {
  //     setOnlineUsers(users)
  //   })
  // }, [currentUser])

  // // send message to socket server
  // useEffect(()=> {
  //   if(sendMessage !== null) {
  //     socket.emit("send message", sendMessage)
  //   }
  // }, [sendMessage])

  // // Get the message from sockets server
  // useEffect(()=> {
  //   socket.on("recieve-message", (data) => {
  //     setRecievedMessage(data)
  //   })
  // }, [])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find(member => member !== currentUser._id)

    const online = onlineUsers.find(user => user.userId === chatMember)

    return online ? true : false
  }

  return (
    <div className='Chat'>
      <div className='left-side'>
        <Search />

      </div>

      <div className='middle-box'>
        <ChatBox setSendMessage={recievedMessage} />

      </div>

      <div className='right-side'>
        <div className='right-side-top'>
          <h2>List Chats</h2>
          <button className="settings-btn button">S</button>
          <button onClick={exit} className="exit-btn"></button>
        </div>
        <div className='chat-list'>
          {
            chats?.map((chat) => {
              return (
                <div key={chat._id} onClick={()=> setCurrentChat(chat)}>
                  <Converstation data={chat} online={checkOnlineStatus(chat)}/>
                </div>
              )
            })
          }
        </div>
      </div>

      {
        modal && <InfoModal /> 
      }
    </div>
  )
}
