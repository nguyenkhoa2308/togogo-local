"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronDown } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to manage authentication
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    router.push("/user/dashboard");
  };

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const mainLinks: NavLink[] = [
    { href: "/", label: "Trang Chủ" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/bots", label: "Danh sách Bot" },
    { href: "/backtest", label: "Hiện thị dữ liệu" },
    { href: "/team", label: "Đội ngũ Togogo" },
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0A1529]">
      {/* Ticker/Running text */}
      <div className="bg-gradient-to-r from-[#0A1529] to-[#1a2b4b] border-b border-[#233554]/50 overflow-hidden py-1 px-2">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-amber-400 text-sm inline-block mr-8">
            DNSE: +1.25% (123.45 đ)
          </span>
          <span className="text-green-400 text-sm inline-block mr-8">
            VCB: +2.33% (89.75 đ)
          </span>
          <span className="text-red-400 text-sm inline-block mr-8">
            VHM: -0.45% (55.20 đ)
          </span>
          <span className="text-amber-400 text-sm inline-block mr-8">
            MSN: +0.75% (102.30 đ)
          </span>
          <span className="text-green-400 text-sm inline-block mr-8">
            VIC: +1.12% (78.90 đ)
          </span>
          <span className="text-red-400 text-sm inline-block mr-8">
            HPG: -0.85% (32.10 đ)
          </span>
          <span className="text-amber-400 text-sm inline-block mr-8">
            VNM: +0.33% (95.60 đ)
          </span>
          <span className="text-green-400 text-sm inline-block mr-8">
            FPT: +1.75% (112.40 đ)
          </span>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile menu button (on the left) - visible only on small screens */}
          <button
            className="lg:hidden text-white hover:text-[#64FFDA] focus:outline-none transition-colors order-1" // order-1 to place it first on mobile
            onClick={toggleMenu}
            aria-label="Open mobile menu"
          >
            <FontAwesomeIcon
              icon={isMobileMenuOpen ? faTimes : faBars}
              className="w-6 h-6"
            />
          </button>

          {/* Logo (centered or between elements on mobile, to the left on desktop) */}
          <Link
            href="/"
            className="w-32 lg:w-40 flex-shrink-0 order-2 lg:order-none" // Adjusted order for mobile
          >
            <Image
              src="/images/togogo_logo.png"
              alt="TOGOGO"
              width={160}
              height={50}
              priority
              className="w-full h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center order-3 lg:order-none">
            {" "}
            {/* Adjusted order for mobile */}
            <div className="bg-[#1a2b4b] rounded-full px-2 py-1">
              <ul className="flex items-center">
                {mainLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`px-3 py-2 text-sm whitespace-nowrap block transition-colors ${
                        isActive(link.href)
                          ? "text-[#64FFDA] font-medium"
                          : "text-white hover:text-[#64FFDA]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {/* Services Dropdown */}
                <li className="group relative">
                  <a className="text-white hover:text-[#64FFDA] px-3 py-2 text-sm whitespace-nowrap flex items-center cursor-pointer transition-colors">
                    Dịch vụ
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="w-3 h-3 ml-1 transform group-hover:rotate-180 transition-transform duration-200"
                    />
                  </a>
                  <div className="absolute left-0 top-full z-10 bg-[#1a2b4b] rounded-xl mt-2 min-w-max shadow-xl border border-[#233554] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 invisible group-hover:visible transform group-hover:translate-y-0 translate-y-2">
                    <div className="p-2">
                      <Link
                        href="/design-bot"
                        className="flex items-center text-white hover:text-[#64FFDA] py-2 px-4 rounded text-sm transition-colors"
                        onClick={closeMenu} // Close menu on click
                      >
                        <span>Thiết kế Bot theo yêu cầu</span>
                      </Link>
                      <Link
                        href="/togo-auto"
                        className="flex items-center text-white hover:text-[#64FFDA] py-2 px-4 rounded text-sm transition-colors"
                        onClick={closeMenu} // Close menu on click
                      >
                        <span>Tự động giao dịch</span>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Auth Buttons - Desktop (on the right) */}
          {/* <div className="hidden lg:flex items-center space-x-4 flex-shrink-0 order-4 lg:order-none">
            {" "}
            {/* Adjusted order for mobile 
            <a
              href="#"
              className="text-white hover:text-[#64FFDA] text-sm transition-colors"
            >
              Đăng nhập
            </a>
            <a
              href="#"
              className="bg-[#00E5A1] hover:bg-[#00D194] text-[#0A1529] rounded-full py-2 px-5 text-sm font-medium transition-colors"
            >
              Đăng ký
            </a>
          </div> */}

          {isAuthenticated ? (
            <div className="hidden lg:flex justify-center items-center space-x-4 order-4">
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-default">
                  <div className="flex gap-2 items-center">
                    <span
                      className="max-w-[110px] truncate text-sm"
                      title="Sơn Tùng MTP"
                    >
                      Sơn Tùng MTP
                    </span>
                    <ChevronDown className="w-4 h-4 text-white transition-transform duration-200 group-hover:rotate-180" />
                  </div>
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrH7labPAP-FcsZQFXpdeXF_BRrYluKuKd4w&s" // Replace with actual user avatar
                    alt="User Avatar"
                    width={56}
                    height={56}
                    className="w-10 h-10 rounded-full border-2 border-emerald-500/20"
                  />
                </div>
                <div className="absolute left-1/2 top-full z-10 w-full h-10 -translate-x-1/2"></div>
                <div className="absolute left-1/2 top-full w-full z-10 bg-[#1a2b4b] rounded-xl mt-4 min-w-max shadow-xl border border-[#233554] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 invisible group-hover:visible transform -translate-x-1/2 group-hover:translate-y-0 translate-y-2">
                  <div className="p-2">
                    <Link
                      href="/bot-dashboard"
                      className="flex items-center text-white hover:text-[#64FFDA] py-2 px-4 rounded text-sm transition-colors"
                      onClick={closeMenu} // Close menu on click
                    >
                      <span>Quản lý giao dịch Bot</span>
                    </Link>
                    <hr className="border-slate-600/50 my-2" />
                    <div
                      className="flex items-center text-white hover:text-[#64FFDA] py-2 px-4 rounded text-sm transition-colors cursor-pointer"
                      onClick={() => setIsAuthenticated(false)} // Close menu on click
                    >
                      <span>Đăng xuất</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0 order-4 lg:order-none">
              {" "}
              {/* Adjusted order for mobile */}
              <div
                className="text-white hover:text-[#64FFDA] text-sm transition-colors cursor-pointer"
                onClick={handleLogin} // Close menu on click
              >
                Đăng nhập
              </div>
              <a
                href="#"
                className="bg-[#00E5A1] hover:bg-[#00D194] text-[#0A1529] rounded-full py-2 px-5 text-sm font-medium transition-colors"
              >
                Đăng ký
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile menu (slide-in from left) */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#112240] z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full" // Changed from translate-x-full to -translate-x-full
        } lg:hidden overflow-y-auto`}
      >
        <div className="p-4 border-b border-[#233554]">
          <div className="flex justify-between items-center">
            {/* Logo inside mobile menu (on the left) */}
            <div className="w-32">
              <Image
                src="/images/togogo_logo.png"
                alt="TOGOGO"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </div>
            {/* Close button for mobile menu (on the right) */}
            <button
              className="text-white hover:text-[#64FFDA] focus:outline-none transition-colors"
              onClick={closeMenu}
              aria-label="Close mobile menu"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Mobile Navigation Links */}
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 text-sm transition-colors ${
                isActive(link.href)
                  ? "text-[#64FFDA] font-medium"
                  : "text-white hover:text-[#64FFDA]"
              }`}
              onClick={closeMenu} // Close menu on link click
            >
              {link.label}
            </Link>
          ))}

          {/* Services Section */}
          <div className="pt-2 border-t border-[#233554]">
            <p className="text-[#64FFDA] text-sm font-semibold mb-2">Dịch vụ</p>
            <Link
              href="/design-bot"
              className="block text-white hover:text-[#64FFDA] py-2 text-sm transition-colors"
              onClick={closeMenu} // Close menu on link click
            >
              Thiết kế Bot theo yêu cầu
            </Link>
            <Link
              href="/togo-auto"
              className="block text-white hover:text-[#64FFDA] py-2 text-sm transition-colors"
              onClick={closeMenu} // Close menu on link click
            >
              Tự động giao dịch
            </Link>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 border-t border-[#233554] space-y-2">
            <a
              href="#"
              className="block w-full text-center text-white hover:text-[#64FFDA] py-2 text-sm transition-colors"
              onClick={closeMenu} // Close menu on link click
            >
              Đăng nhập
            </a>
            <a
              href="#"
              className="block w-full text-center bg-[#00E5A1] hover:bg-[#00D194] text-[#0A1529] rounded-full py-2 text-sm font-medium transition-colors"
              onClick={closeMenu} // Close menu on link click
            >
              Đăng ký
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
