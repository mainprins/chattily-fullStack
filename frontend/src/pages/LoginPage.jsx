import React, { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import signupImage from '../assets/signup.jpg'
import { useAuthStore } from "../store/useAuthStore"
import toast from "react-hot-toast"

const LoginPage = () => {
  
  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  })

  const {login,isLogginIn} = useAuthStore()

  const validateForm = ()=>{
     
     console.log("Hi")
     if(!formData.email) return toast.error("Email is required")
     if(!formData.password) return toast.error("Password is required")
     if(formData.password.length < 6) return toast.error("Password must be at least 6 characters")
     
     return true
  }
  const handleSubmit = (e)=>{
     e.preventDefault()
     const success = validateForm()

     if(success===true) {
      
      login(formData)
     }

  }
  return (
    <div className="w-full px:10 py-4 flex h-[92vh]">
      <div id="left" className="w-full xl:[50%] bg-base-200 h-full flex flex-col gap-10 justify-center items-center">
         <div id="top" className="flex-col flex justify-center items-center gap-3">
           <MessageCircle />
           <span className="font-bold tracking-widest text-xl">Welcome Back</span>
           <span className="text-sm">Sign in to your account</span>
         </div>
         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
           <label htmlFor="" className="label">Email</label>
           <input type="email" className="input" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
           <label htmlFor="" className="label">Password</label>
           <input type="password" className="input" value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}/>
           <button className="btn btn-accent cursor-pointer" type="submit">Login</button>
           <span>Don't have an account? <Link to={'/signup'}><span className="underline cursor-pointer">SignUp</span></Link></span>
         </form>
      </div>
      <div id="right" className="w-[50%] h-full xl:flex flex-col gap-2 justify-center items-center hidden">
         <figure className="w-full h-80% flex justify-center items-center">
            <img src={signupImage} width={'70%'} height={'100%'} alt="SignUpImage" className="rounded-full" />
         </figure>
         <span className="font-bold tracking-widest text-xl">Join Our Community</span>
         <span>Get connected with friend , share memories and make a long lasting bond.</span>
      </div>
    </div>
  )
}

export default LoginPage