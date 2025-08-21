import React from 'react'
import {auth, provider} from '../../config/FirebaseConfig'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Authentication = () => {
    const navigate= useNavigate();
    const handleSignInWithGoogle = async () =>{
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const authInfo={
                userId: result.user.uid,
                name: result.user.displayName,
                isAuth: true,
            }
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate('/dashboard');
        } catch (error) {
            console.error("Sign-in error:", error);
        }

        
    }

    const handleEmailBtn = () =>{
        navigate('/email-auth');
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-violet-600">
            <div className="flex flex-col gap-2 bg-white p-10 rounded-2xl shadow-xl text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h2>
                <p className="text-gray-500 mb-6">Sign in with your Google account to continue</p>
                <button
                    onClick={handleSignInWithGoogle}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                >
                    Sign In With Google
                </button>
                <button 
                onClick={handleEmailBtn}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                >Email Auth</button>
            </div>
        </div>
  )
}

export default Authentication