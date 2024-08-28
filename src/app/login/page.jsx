"use client"

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("เกิดข้อผิดพลาด: " + res.error);
      } else {
        router.replace("/welcome");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto flex justify-center items-center py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md'>
                {error}
              </div>
            )}
            <div className="mb-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
