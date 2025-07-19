"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Import icons if needed by BlogHeader/BlogFooter - Assuming they are also defined in page.tsx
// import { SearchIcon } from "./page"; // Example import if icons are needed

// Cập nhật Header cho blog dựa trên ảnh tham khảo
const BlogHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/blog" className="flex items-center space-x-2">
            {/* Sử dụng logo togogo hiện có */}
            <Image
              src="/images/logo.png"
              alt="togogo Blog"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-lg font-semibold text-gray-900">
              togogo Blog
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-gray-700 text-sm">
            <Link href="/blog/monthly-reports" className="hover:text-blue-600">
              Báo cáo hàng tháng
            </Link>
            <Link href="/blog/events" className="hover:text-blue-600">
              Sự kiện
            </Link>
            <Link href="/blog/news" className="hover:text-blue-600">
              Tin tức
            </Link>
            <Link href="/blog/announcements" className="hover:text-blue-600">
              Thông báo
            </Link>
            <Link href="/blog/courses" className="hover:text-blue-600">
              Khóa học giao dịch
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
              Đăng nhập
            </button>
            {/* Biểu tượng chuông - Bạn cần thêm icon phù hợp ở đây */}
            <div className="text-gray-600 hover:text-blue-600 cursor-pointer">
              {/* Placeholder cho biểu tượng chuông */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.143 17l9.143-9.143M9.143 17H5.667a2.25 2.25 0 01-2.25-2.25V9.143m12.143 5.714l-9.143 9.143M18.357 17H20.833a2.25 2.25 0 002.25-2.25V9.143m-.009-7.066A1.5 1.5 0 0122.5 3v.207a2.25 2.25 0 001.118 2.016l.625.313A1.125 1.125 0 0124 6.233V6.75c0 .621-.503 1.125-1.125 1.125h-1.5A2.25 2.25 0 0119.5 5.625V4.5m-11.04 4.354a1.5 1.5 0 00-1.418 1.418L3 15.5m11.04-4.354a1.5 1.5 0 00-1.418-1.418L9 2.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Cập nhật Footer cho blog dựa trên ảnh tham khảo
const BlogFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and Description */}
          <div>
            <Link href="/blog" className="flex items-center space-x-2 mb-4">
              {/* Sử dụng logo togogo hiện có */}
              <Image
                src="/images/logo.png"
                alt="togogo Blog"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-lg font-semibold text-gray-900">
                togogo Blog
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nền tảng chia sẻ kiến thức tài chính và đầu tư hàng đầu Việt Nam.
              Cập nhật những thông tin mới nhất về thị trường crypto, chứng
              khoán và các chiến lược giao dịch.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog/monthly-reports"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Báo cáo hàng tháng
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/events"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Sự kiện
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/news"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/announcements"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Thông báo
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/courses"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Khóa học giao dịch
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company/About (Assuming from main footer structure) */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Công ty</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Liên hệ
                </Link>
              </li>
              {/* Thêm các liên kết khác nếu có */}
            </ul>
          </div>

          {/* Column 4: Contact Info / Socials */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Liên hệ</h3>
            {/* Thêm thông tin liên hệ và biểu tượng mạng xã hội ở đây */}
            <p className="text-gray-600 text-sm">
              Email: contact@togogoblog.vn
            </p>
            {/* Placeholder cho social icons */}
            <div className="flex space-x-4 mt-4">
              {/* Example: Link for Facebook */}
              {/* <a href="#" className="text-gray-600 hover:text-blue-600">Facebook Icon</a> */}
              {/* Example: Link for Twitter */}
              {/* <a href="#" className="text-gray-600 hover:text-blue-600">Twitter Icon</a> */}
              {/* Thêm các icon khác nếu cần */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>© 2024 togogo Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      <main>{children}</main>
      <BlogFooter />
    </div>
  );
}
