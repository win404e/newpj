"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [eorror, setEorror] = useState("");

    console.log(name, email, password, confirmpassword)

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (password !== confirmpassword) {
        setEorror("รหัสผ่านไม่ตรงกัน");
        return;
      }
    
      if (!name || !email || !password || !confirmpassword) {
        setEorror("กรุณากรอกข้อมูลให้ครบ!!");
        return;
      }
    
      try {
        const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
    
        if (res.ok) {
          setEorror("");
          const form = e.target;
          form.reset();
          console.log("การสมัครสมาชิกสำเร็จ!");
        } else {
          const errorData = await res.json(); // Get detailed error message from response
          setEorror(errorData.message || "การสมัครสมาชิกไม่สำเร็จ!!");
          console.log("Error:", errorData);
        }
      } catch (error) {
        console.error("Error during register", error);
        setEorror("เกิดข้อผิดพลาดระหว่างการสมัครสมาชิก");
      }
    };
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <div className="container mx-auto flex justify-center items-center py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
          <form onSubmit={handleSubmit}>

            {eorror && (
                <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md'>
                   {eorror}
                </div>
            )}
            <div className="mb-4">
              <input onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <input onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <input onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-6">
              <input onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
