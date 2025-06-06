import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { ChevronRight } from "lucide-react"
import { useThemeStore } from '../store/useThemeStore'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const SettingsPage = () => {
  const { authUser, logout } = useAuthStore()
  const { setTheme } = useThemeStore()
  const navigate = useNavigate()

  const handleButtonClick = () => {
    if (!authUser) {
      navigate('/login')
    } else {
      logout()
    }


  }
  return (

    <div className='w-full flex flex-col h-[92vh] justify-center items-center gap-4'>

      {authUser && (
        <>
          <span className='font-bold text-xl tracking-widest'>Customize as your choice</span>
          <Link to={'/profile'}>
            <div className='flex gap-2 md:gap-8 justify-center items-center bg-black text-white p-5 rounded-xl'>
              <figure className='w-20 h-20 rounded-full'>
                <img src={authUser.profilePic} className='w-full h-full rounded-full' alt="" />
              </figure>
              <div className='flex flex-col gap-2'>
                <span className='font-semibold tracking-wider'>{authUser.fullName}</span>
                <span>customize your profile picture</span>
              </div>
              <ChevronRight />
            </div>
          </Link>

        </>
      )}

      <span className='font-bold text-xl tracking-widest'>Customize Theme</span>
      <div id="theme" className='flex w-full justify-center items-center gap-4'>

        <div id="light" className='flex flex-col gap-3'>
          <button onClick={() => { setTheme("light") }} className='cursor-pointer'><div className='bg-white border-2 border-black w-20 h-20'></div></button>
          <span className='text-center'>Light</span>
        </div>
        <div id="dark" className='flex flex-col gap-3'>
          <button onClick={() => { setTheme("dark") }} className='cursor-pointer'><div className='bg-black border-2 border-black w-20 h-20'></div></button>
          <span className='text-center'>Dark</span>
        </div>
        <div id="cupcake" className='flex flex-col gap-3'>
          <button onClick={() => { setTheme("retro") }} className='cursor-pointer'><div className='bg-[#F7AD45] border-2 border-black w-20 h-20'></div></button>
          <span className='text-center'>Retro</span>
        </div>
      </div>
      <button className='btn btn-accent' onClick={handleButtonClick}>{authUser ? "Log Out" : "Sign Up"}</button>
    </div>
  )
}

export default SettingsPage