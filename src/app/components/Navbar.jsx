"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IconMenu, IconUser, IconLogin } from "@tabler/icons-react";

export default function Navbar({ session }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Access dictionary to define role-based access control
  const accessDictionary = {
    admin: ["public", "admin"],
    user: ["public"],
  };

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="w-screen fixed top-0 h-20 md:flex hidden items-center justify-center gap-10 bg-background left-0 z-30 shadow-lg">
        {/* Logo */}
        <div className="font-extrabold text-4xl active:scale-95">
          <Link
            className="transition duration-75 hover:text-black font-semibold p-2 rounded-xl hover:bg-success hover:shadow-lg"
            href="/"
          >
            Wekthor
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {/* About Link */}
          <Link
            className="active:scale-95 transition duration-75 hover:text-black font-semibold px-2 py-1 rounded-xl hover:bg-success hover:shadow-lg"
            href="/about"
          >
            About
          </Link>
          {/* Dashboard Link - Only visible to admin users */}
          {session && accessDictionary[session.user.role].includes("admin") && (
            <Link
              className="active:scale-95 transition duration-75 hover:text-black font-semibold px-2 py-1 rounded-xl hover:bg-success hover:shadow-lg"
              href="/dashboard"
            >
              Dashboard
            </Link>
          )}
          {/* Login Link - Only visible to non-authenticated users */}
          {!session && (
            <Link
              className="active:scale-95 transition duration-75 hover:text-black font-semibold px-2 py-1 rounded-xl hover:bg-success hover:shadow-lg flex gap-2"
              href="/login"
            >
              Log in <IconLogin />
            </Link>
          )}
          {/* Account Link - Only visible to authenticated users */}
          {session && (
            <Link
              className="rounded-xl p-1 px-2 hover:bg-success transition hover:text-black hover:shadow-lg"
              href="/account"
            >
              <div className="flex gap-1 items-center">
                {session.user?.email} <IconUser />
              </div>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="w-screen fixed top-0 md:hidden bg-background left-0 z-30 py-5 shadow-xl">
        <div className="flex justify-between items-center px-4">
          {/* Logo */}
          <Link className="font-extrabold text-2xl active:scale-95" href="/">
            Wekthor
          </Link>
          {/* Menu Toggle Button */}
          <button
            className="text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <IconMenu />
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 px-4">
            {/* About Link */}
            <Link
              className="block p-2 transition duration-75 hover:text-black font-semibold rounded-xl hover:bg-success hover:shadow-lg"
              href="/about"
            >
              About
            </Link>
            {/* Dashboard Link - Only visible to admin users */}
            {session &&
              accessDictionary[session.user.role].includes("admin") && (
                <Link
                  className="block p-2 transition duration-75 hover:text-black font-semibold rounded-xl hover:bg-success hover:shadow-lg"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              )}
            {/* Login Link - Only visible to non-authenticated users */}
            {!session && (
              <Link
                className="p-2 transition duration-75 hover:text-black font-semibold rounded-xl hover:bg-success hover:shadow-lg flex gap-2"
                href="/login"
              >
                Log in <IconLogin />
              </Link>
            )}
            {/* Account Link - Only visible to authenticated users */}
            {session && (
              <Link
                className="block p-2 rounded-xl hover:bg-success transition hover:text-black hover:shadow-lg"
                href="/account"
              >
                <div className="flex gap-1 items-center">
                  {session.user?.email} <IconUser />
                </div>
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
