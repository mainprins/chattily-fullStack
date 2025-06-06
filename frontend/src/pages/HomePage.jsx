import { Users, X } from "lucide-react"
import UserList from "../components/UserList"
import userIcon from "../assets/user.png"
import { useChatStore } from "../store/useChatStore"
import MessageInput from "../components/MessageInput"
import { useAuthStore } from "../store/useAuthStore"
import { formatMessageTime } from "../lib/utils"
import { useEffect } from "react"
import { useRef } from "react"

const HomePage = () => {
  const { selectedUser, setSelectedUser, getMessages, messages, subscribeToMessages, unsubscribeFromMessages } = useChatStore()
  const { authUser, onlineUsers } = useAuthStore()

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return () => unsubscribeFromMessages()
    }
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  return (
    <div className="flex w-full">
      <div id="left" className="w-[50%] flex flex-col gap-3 pl-8 py-4">
        <div id="top" className="flex flex-col gap-3">
          <div className="flex gap-4">
            <Users />
            <span className="font-bold tracking-widest text-xl hidden md:block">Contacts</span>
          </div>

          <div id="onlineChooser">
            <UserList />
          </div>
        </div>
      </div>
      {selectedUser ? (
        <div id="right" className="w-[50%] h-[92vh] flex flex-col">
          <div id="top" className="flex gap-3 items-center">
            <div className="chat-image avatar">
              <figure className="size-10 rounded-full border">
                <img src={selectedUser.profilePic || userIcon} className="chat-image avatar rounded-full" alt="" />
              </figure>
            </div>

            <div className="flex-col hidden md:flex">
              <span className="">{selectedUser.fullName}</span>
              <span className="text-xs">{onlineUsers.includes(selectedUser?._id) ? "online" : "offline"}</span>
            </div>
            <X className="ml-150 cursor-pointer" onClick={() => { setSelectedUser(null) }} />
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img src={message.senderId === authUser._id ? authUser.profilePic || userIcon : selectedUser.profilePic || userIcon} alt="profilePic" />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img src={message.image} alt="AttachedImage" className="sm:max-w-[200px] rounded-md mb-2" />
                  )}

                  {message.text && <p>{message.text}</p>}
                </div>
                <div ref={messagesEndRef} />
              </div>
            ))}
          </div>
          <MessageInput />
        </div>
      ) : <div className="flex justify-center items-center w-[50%] h-[92vh]">Select the user to chat.</div>}

    </div>
  )
}

export default HomePage