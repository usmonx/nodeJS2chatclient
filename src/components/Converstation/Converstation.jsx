import React, { useEffect, useState } from 'react'
import { useInfoContext } from '../../context/Context'
import profileImg from "../../img/defaultProfile.png"
import { getUser } from '../../api/userRequest'

import "./Converstation.css"

export const Converstation = ({data, online}) => {

  const {currentUser, exit} = useInfoContext()

  const [userData, setUserData] = useState(null)

  const userId = data?.members.find(id => id !== currentUser._id)

  useEffect(()=> {
    const getUserData = async () => {
      try {
        const {data} = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error);
        if(error.response.data.message === "jwt expired") {
          exit()
        }
      }
    } 

    getUserData()
  }, [])
  return (
    <>
    <div className='converstation'>
      <div>
      {
        online && <div className="online-dot"></div>
      }
      <img src={userData.profilePicture ? userData.profilePicture?.url : profileImg} alt="profile_img" className="profile-img" />
      <div className="name">
        <span>{userData?.firstname} {userData.lastname}</span>
        <span style={{color: online ? '#51e200' : 'black'}} className="status">{online ? "online" : "offline"}</span>
      </div>
      </div>
    </div>
    <hr />
    </>
  )
}
