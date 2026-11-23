import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
    const location = useLocation()

    const items = [
        {name : "Home", path : "/"},
        {name : "Feeds", path : "/feeds"},
        {name : "Chat", path : "/chat"},
        {name : "Login", path : "/login"},
    ]

  return ( 
    <div className='h-16 bg-gray-200 flex justify-between items-center'>
        <div className='text-3xl font-serif hover:bg-purple-500 px-3 py-2 rounded-lg hover:cursor-pointer'>Meetly</div>
        <div>
            <ul className='flex justify-evenly gap-5 items-center mr-5'>
                {
                    items.map((item, idx) => <Link key={idx} to={item.path}><div className={`text-xl hover: bg-gray-700 px-2 py-2 rounded-lg hover:cursor-pointer text-white ${location.pathname == item.path ? "bg-blue-700" :""}`}>{item.name}</div></Link>)
                }
            </ul>
        </div>
    </div> 
  )
}
