import React from 'react'
import profileImg from "../../img/defaultProfile.png"

import "./Users.css"
import { useInfoContext } from '../../context/Context'

export const Users = ({users}) => {
  const {onlineUsers, setUser, setModal, exit} = useInfoContext()


  const online = (user) => {
    return onlineUsers.some(onlineUsers => onlineUsers.userId === user._id)
  }

  const openModal = (user) => {
    setModal(true)
    setUser(user)
  }

  return (
    <div className='users-list'>
      {
        users.map(user => {
          return (
            <div key={user._id}>
              <div className="conversation user-info-box">
                <div onClick={()=> openModal(user)}>
                  {
                    online(user) && <div className="online-dot"></div>
                  }
                  <img src={user.profilePicture ? user.profilePicture.url : profileImg} alt="profile_img" className="profile-img" />
                  <div className="name">
                    <span>{user.firstname} {user.lastname}</span>
                    <span className="status">{online(user) ? "online" : "offline"}</span>
                  </div>
                </div>

                <button className="button"></button>
              </div>  
              <hr />
            </div>
          )
        })
      }
    </div>
  )
}
