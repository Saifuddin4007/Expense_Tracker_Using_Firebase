import React, { useState } from 'react'
import { auth } from '../../config/FirebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const EmailAuth = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Sign In (for existing users)
  const handleSignInWithEmailBtn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate('/dashboard');  // ✅ navigate only if success
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  // Create User (for new users)
  const handleCreateEmailBtn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Email Authentication</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password..."
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            onClick={handleSignInWithEmailBtn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Sign In
          </button>
          <button
            onClick={handleCreateEmailBtn}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailAuth
