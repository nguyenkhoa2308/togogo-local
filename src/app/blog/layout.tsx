"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Header mới theo style Titan Blog với hiệu ứng
const BlogHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hiệu ứng khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with subtle hover effect */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/blog" className="flex items-center space-x-2 group">
              <span className="text-xl font-bold transition-transform duration-300 group-hover:scale-105">
                <span className="text-gray-800">Togogo</span>
                <span className="text-purple-600"> Blog</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>

            {/* Navigation with hover animations */}
            <nav className="hidden md:flex items-center ml-10 space-x-8">
              {[
                "Monthly report",
                "Event",
                "News",
                "Announcement",
                "Trading Course",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Link
                    href={`/blog/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-600 hover:text-purple-600 text-sm font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Actions with animations */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <motion.button
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.button>

            {/* Notification Bell Icon */}
            <motion.button
              className="text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
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
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
              {/* Notification badge */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/4 -translate-y-1/4">
                2
              </span>
            </motion.button>

            {/* Language/Global Icon */}
            <motion.button
              className="text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
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
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </motion.button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
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
                    d={
                      mobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-100"
            >
              <nav className="flex flex-col space-y-4">
                {[
                  "Monthly report",
                  "Event",
                  "News",
                  "Announcement",
                  "Trading Course",
                ].map((item) => (
                  <Link
                    key={item}
                    href={`/blog/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-600 hover:text-purple-600 text-sm font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gradient line for better UI */}
      <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-60"></div>
    </header>
  );
};

// Animated social icon component
const SocialIcon = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-gray-400 hover:text-purple-600 transition-colors p-2 rounded-full hover:bg-gray-100"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </motion.a>
);

// Footer mới theo style Titan với hiệu ứng đẹp hơn
const BlogFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10">
          <motion.div
            className="w-full md:w-1/3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog" className="inline-block mb-6 group">
              <span className="text-xl font-bold group-hover:text-purple-600 transition-colors duration-300">
                <span className="text-gray-800 group-hover:text-gray-900">
                  Togogo
                </span>
                <span className="text-purple-600"> Blog</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Titan Trading Platform: The Pioneer Borderless Trading Ecosystem
            </p>
            <div className="text-sm text-gray-500">
              <p className="mb-4 font-bold text-gray-700">
                IMPORTANT DISCLAIMER:
              </p>
              <p className="mb-4 leading-relaxed opacity-80 hover:opacity-100 transition-opacity">
                All content provided here on our website, hyperlinked sites,
                associated applications, forums, blogs, social media accounts
                and other platforms ("Site") is for your general information
                only, procured from third party sources. We make no warranties
                of any kind in relation to our content, including but not
                limited to accuracy and updatedness...
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-semibold text-gray-900 mb-4 relative">
                Company
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-purple-500"></span>
              </h3>
              <ul className="space-y-3">
                {["About company", "Why Titan", "Whitepaper"].map(
                  (item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-600 hover:text-purple-600 text-sm group flex items-center"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300 mr-1">
                          →
                        </span>
                        {item}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-semibold text-gray-900 mb-4 relative">
                Product
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-purple-500"></span>
              </h3>
              <ul className="space-y-3">
                {["Features", "Pricing", "Token", "Solutions"].map(
                  (item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="text-gray-600 hover:text-purple-600 text-sm group flex items-center"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300 mr-1">
                          →
                        </span>
                        {item}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-semibold text-gray-900 mb-4 relative">
                Contact us
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-purple-500"></span>
              </h3>
              <p className="text-gray-600 text-sm mb-2">Email:</p>
              <p className="text-purple-600 text-sm mb-4 hover:underline">
                <a href="mailto:marketing@titantrading.io">
                  marketing@titantrading.io
                </a>
              </p>

              <p className="text-gray-600 text-sm mb-3">Follow us:</p>
              <div className="flex space-x-2">
                <SocialIcon href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </SocialIcon>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Subscribe và Copyright với hiệu ứng */}
        <motion.div
          className="border-t border-gray-200 mt-12 pt-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            className="mb-6 relative overflow-hidden group"
            whileHover="hover"
          >
            <motion.button
              className="bg-purple-500 text-white font-medium px-8 py-2.5 rounded-md relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
              variants={{
                hover: { scale: 1.5, rotate: 5 },
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          <div className="flex items-center justify-center mb-1">
            <div className="h-px w-10 bg-gray-300"></div>
            <div className="mx-4 text-gray-400 text-xs uppercase tracking-wider">
              Trusted By Traders
            </div>
            <div className="h-px w-10 bg-gray-300"></div>
          </div>

          <p className="text-gray-500 text-sm">
            Powered by Titan Trading Platform. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Wavy gradient divider */}
      <div className="mt-10 h-2 w-full bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-80"></div>
    </footer>
  );
};

// Layout component với hiệu ứng chuyển trang mượt mà
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to track page load
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <BlogHeader />
      <motion.main
        className="pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <BlogFooter />

      {/* Page transition overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold"
            >
              <span className="text-gray-800">Togogo</span>
              <span className="text-purple-600"> Blog</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
