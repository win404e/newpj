import React from 'react';
import Link from 'next/link';

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
              SingIn
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-white hover:text-gray-400">
              SingUp
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-gray-400">
              LogOut
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
