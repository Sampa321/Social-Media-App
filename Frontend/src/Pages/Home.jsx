import React, { useEffect, useState } from 'react'

export default function Home() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState({})
  
  useEffect(() =>{
    fetch(BACKEND_URL + "/user/profile",{
      credentials : "include"
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.success == false)
      {
        alert(res.message)
      }
      else{
        setUser(res.user)
      }
    })
  }, [])
  console.log(user);
  

  return (
    <div>
      <div>
        Name : {user.name} <br/>
        email : {user.email} < br/>
        User image : <img src={user.image} alt="" className='h-12'/>
      </div>
    </div>
  )
} 


