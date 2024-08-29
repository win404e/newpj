"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

function Navbar({ session }) {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">Iphone Store</Link>
        </div>
        <ul className="flex space-x-4">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success text-white bg-gray-500 font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="submit"
            >
              Search
            </button>
          </form>
          {!session ? (
            <>
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
            </>
          ) : (
            <li>
              <button
                onClick={() => signOut()}
                className="text-white hover:text-gray-400 bg-transparent border-none cursor-pointer"
              >
                LogOut
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
