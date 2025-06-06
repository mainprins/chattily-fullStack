import React, { useEffect, useState } from 'react'
import userIcon from "../assets/user.png"
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { ToggleRight, ToggleLeft } from 'lucide-react'

const UserList = () => {
  const { setSelectedUser, selectedUser, getUsers, users } = useChatStore()
  const { onlineUsers } = useAuthStore()

  const [showOnlyOnline, setShowOnlyOnline] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  // Filter users based on toggle state
  const displayedUsers = showOnlyOnline
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users

  return (
    <div className='w-full bg-base-200 h-full p-4 flex flex-col gap-4'>
      {/* Toggle Switch */}
      <button
        onClick={() => setShowOnlyOnline(prev => !prev)}
        className='flex items-center gap-2 self-end text-sm font-medium px-3 py-1 rounded-lg bg-base-100 hover:bg-base-300 transition'
      >
        {showOnlyOnline ? (
          <>
            <ToggleLeft className='w-5 h-5 text-accent' />
            Showing Online Only
          </>
        ) : (
          <>
            <ToggleRight className='w-5 h-5 text-base-content' />
            Showing All Users
          </>
        )}
      </button>

      {/* User List */}
      {displayedUsers.map((user) => (
        <button
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`flex items-center gap-4 w-full p-4 rounded-lg shadow-sm transition-colors duration-200
            ${selectedUser?._id === user._id ? 'bg-accent text-accent-content' : 'bg-base-100 hover:bg-base-300'}
          `}
        >
          <figure className='relative w-14 h-14 rounded-full'>
            <img
              src={user.profilePic || userIcon}
              className='object-cover rounded-full w-full h-full'
              alt={`${user.fullName} profile`}
            />
            {onlineUsers.includes(user._id) && (
              <div className='absolute bg-green-500 w-3 h-3 rounded-full top-0 right-0 border-2 border-base-100'></div>
            )}
          </figure>

          <div className='hidden md:flex flex-col text-left overflow-hidden'>
            <span className='font-semibold truncate text-base'>{user.fullName}</span>
            <span className='text-sm truncate'>
              {onlineUsers.includes(user._id) ? "Online" : "Offline"}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}

export default UserList
