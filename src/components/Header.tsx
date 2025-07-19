"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          {/* Assuming logo is at /images/togogo-logo.png. Update src if needed. */}
          <div className="relative w-40 h-10">
            <Image
              src="/images/togogo-logo.png"
              alt="togogo Blog Logo"
              fill
              className="object-contain"
            />
          </div>
          {/* Removed "Blog" text next to logo based on image */}
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-7 items-center text-sm font-medium">
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Báo cáo hàng tháng
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Sự kiện
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Tin tức
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Thông báo
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Khóa học giao dịch
          </Link>
        </nav>

        {/* Action Buttons / Icons */}
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300 text-sm">
            Đăng nhập
          </button>
          {/* Placeholder Icons (Notification, Profile) */}
          <div className="hidden md:flex items-center gap-3 text-gray-600">
            {/* Notification Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hover:text-blue-600 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0a6 6 0 00-6 0m6 0h-6"
              />
            </svg>
            {/* Profile Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hover:text-blue-600 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
