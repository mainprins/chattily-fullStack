import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera } from 'lucide-react'
import userImage from "../assets/user.png"

const ProfilePage = () => {

    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = async () => {
            const base64Image = reader.result
            setSelectedImage(base64Image)
            await updateProfile({ profilePic: base64Image })
        }
    }
    return (
        <div className='flex flex-col justify-center py-4 items-center gap-10'>

            <div className='w-[70%] bg-base-200 flex flex-col justify-center rounded-xl items-center py-5 gap-10'>
                <div id="top" className='flex flex-col justify-center items-center'>
                    <span className='font-bold tracking-widest text-xl'>Profile Information</span>
                    <span>Your Profile Information</span>
                </div>
                <div id="selector" className='flex justify-center items-center flex-col gap-2'>
                    <label htmlFor="profileImage">
                        <figure className='relative w-32 h-32'>
                            <img
                                src={selectedImage || authUser.profilePic || userImage}
                                className='w-full h-full object-cover rounded-full'
                                alt="Profile"
                            />
                            <Camera className='w-10 h-10 cursor-pointer absolute right-0 bottom-0 bg-green-300 text-black rounded-xl' />
                        </figure>
                        <input id='profileImage' type="file" className='hidden' accept='image/*' onChange={handleImageUpload} disabled={isUpdatingProfile} />
                    </label>
                    <span>{isUpdatingProfile ? "Uploading ....." : "Click the camera icon to upload your photo"}</span>
                </div>
                <form action="" className='flex flex-col gap-4'>
                    <label htmlFor="">Full Name</label>
                    <input type="text" value={authUser?.fullName} readOnly />
                    <label htmlFor="">Email</label>
                    <input type="text" value={authUser?.email} readOnly />
                </form>
                <div id="bottom" className='flex flex-col gap-4'>

                    <span>Account Information</span>
                    <div className='flex gap-20 md:gap-40'>
                        <span>Member Since</span>
                        <span>{authUser.createdAt?.split("T")[0]}</span>
                    </div>

                    <hr />
                    <div className='flex gap-20 md:gap-40'>
                        <span>Account Status</span>
                        <span className='text-green-500'>Active</span>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default ProfilePage