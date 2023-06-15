import React, { useEffect, useState } from 'react'
import Logo from "../../img/logo.png"
import {UilSearch, UilTimes, UilLockOpenAlt} from "@iconscout/react-unicons"
import { Users } from '../Users/Users'
import { getAllUsers } from '../../api/userRequest'

import "./Search.css"
import { useInfoContext } from '../../context/Context'

export const Search = () => {
  const {currentUser, exit} = useInfoContext()
  const [users, setUsers] = useState([])
  const [findUsers, setFindUsers] = useState([])

  // Get all users
  useEffect(()=> {
    const getUsers = async () => {

      try {
        const {data} = await getAllUsers()
        setUsers(data?.filter(user => user._id !== currentUser._id))
      } catch (error) {
        console.log(error);
        if(error.response.data?.message === "jwt expired") {
          exit()
        }
      }
    }

    getUsers()
  }, [])

  const search = (e) => {
    const key = new RegExp(e.target.value, "i");

    let filteredUsers = users.filter(user=> user.firstname.match(key))
    setFindUsers(filteredUsers)
  }

  return (
    <div className='search-users'> 
      <div className="search-box">
        <img src={Logo} alt="logo" />
        <div className='search-input-box'>
          <input onChange={search} type="text" placeholder='Search...' />
          <div className='search-icon'>
            <UilSearch />
          </div>
        </div>
        <button className="open-list-btn">
        <UilLockOpenAlt/>
          {/* <UilTimes /> */}
        </button>
      </div>
      <button className='closed-list-btn'>
        </button>
      <h4>All Users</h4>
      <Users users={findUsers.length > 0 ? findUsers : users}/>
    </div>
  )
}
