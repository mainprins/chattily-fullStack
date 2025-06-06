import React from 'react'
import { LogOut, MessageSquare, Settings, UserRoundPen } from "lucide-react"
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

 

const Navbar = () => {

  const handleRefresh = () => {
    window.location.reload();
  };


  const { logout, authUser } = useAuthStore()

  return (
    <div className='flex justify-between w-full px-10 py-5 md:px-20 xl:px-30'>

        <div onClick={handleRefresh} id="left" className='flex gap-2 cursor-pointer'>
          <MessageSquare />
          <span className='font-bold tracking-widest'>Chattily</span>
        </div>

      <div id="right" className='flex gap-4'>
        <Link to={'/settings'}> <Settings className='cursor-pointer' /></Link>

        {authUser && (
          <>
            <Link to={'/profile'}><UserRoundPen className='cursor-pointer' /></Link>
            <LogOut className="cursor-pointer" onClick={logout} />
          </>
        )}
      </div>

    </div>
  )
}

export default Navbar