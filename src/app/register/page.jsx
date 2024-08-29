"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setEorror] = useState("");
    const [success, setSuccess] = useState("");

    const {data: session} = useSession();
    if (session) redirect("/welcome");

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
        const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
      });
  
      if (!resCheckUser.ok) {
          throw new Error("Failed to check user. Server responded with an error.");
      }
  
      const data = await resCheckUser.json();
      const { user } = data;
  
      if (user) {
          setEorror("Email นี้มีผู้ใช้แล้ว!");
          return;
      }
  
        

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
        const text = await res.text();  // รับคำตอบเป็น string เพื่อดูว่ามีอะไรส่งกลับมา
        console.log("Response text:", text);
    
        if (res.ok) {
          setEorror("");
          setSuccess("สมัครสมาชิกสำเร็จ")
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

            {error && (
                <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md'>
                   {error}
                </div>
            )}
             {success && (
                <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md'>
                   {success}
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
