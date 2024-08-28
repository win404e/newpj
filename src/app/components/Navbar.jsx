"use client";

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">Home</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/login" className="text-white hover:text-gray-400">
              SignIn
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-white hover:text-gray-400">
              SignUp
            </Link>
          </li>
          <li>
            <button
              onClick={() => signOut()}
              className="text-white hover:text-gray-400 bg-transparent border-none cursor-pointer"
            >
              LogOut
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
