"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faHouse } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#101828] text-left justify-left w-full pt-12 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 border-t border-opacity-20 border-[#a8b9cd] py-5 my-6">
        {/* Grid thông tin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up" data-aos-duration="800">
          <div>
            {/* Logo */}
            <div className="w-40 mb-4">
              <Image
                src="/images/togogo_logo.png"
                alt="TOGOGO"
                width={150}
                height={50}
                className="w-full h-auto"
              />
            </div>
            <p className="text-white mb-5">
              Chúng tôi chuyên thiết kế, xây dựng, vận dụng và mở rộng quy mô
              các mô hình Bot giao dịch.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-white text-base font-semibold mb-5">Liên kết nhanh</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[#a8b9cd] text-sm hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#a8b9cd] text-sm hover:text-white transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-[#a8b9cd] text-sm hover:text-white transition-colors">
                  Đội ngũ Togogo
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#a8b9cd] text-sm hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-base font-semibold mb-5">Sản phẩm</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/design-bot" className="text-[#a8b9cd] text-sm hover:text-white transition-colors">
                  DesignBot
                </Link>
              </li>
              <li>
                <Link href="/togo-auto" className="text-[#a8b9cd] text-sm hover:text-white transition-colors">
                  TogoAuto
                </Link>
              </li>
              <li>
                <Link href="/system-rental" className="text-[#a8b9cd] text-sm hover:text-white transition-colors">
                  System Rental
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-base font-semibold mb-5">Liên hệ</h5>
            <ul className="space-y-2" id="contact-info">
              <li>
                <a href="#" className="text-[#a8b9cd] text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" /> (+84) 853.336.668
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a8b9cd] text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> info@togogo.vn
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a8b9cd] text-sm hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faHouse} className="mr-2" /> Tầng 8, Tòa nhà Hà Nội, Số 12 Hàng Bài
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-b border-opacity-20 border-[#a8b9cd] py-5 my-6" data-aos="fade-up" data-aos-delay="200">
          <p className="text-[#a8b9cd] text-xs">
            Tuyên bố miễn trừ trách nhiệm: Thông tin có trong đây không được hiểu là lời khuyên đầu tư hoặc khuyến nghị đầu tư, hoặc lệnh hoặc chào mời cho bất kỳ giao dịch nào trong các công cụ tài chính. Chúng tôi không bảo đảm hoặc tuyên bố, dù là rõ ràng hay ngụ ý, về tính đầy đủ hoặc chính xác của thông tin có trong đây hoặc tính phù hợp của thông tin đó cho một mục đích cụ thể. Việc sử dụng hình ảnh và biểu tượng chỉ nhằm mục đích minh họa và không cấu thành khuyến nghị mua, bán hoặc nắm giữ một công cụ tài chính cụ thể. Việc sử dụng logo thương hiệu không nhất thiết ngụ ý mối quan hệ hợp đồng giữa chúng tôi và các thực thể sở hữu logo, cũng không đại diện cho sự chứng thực của bất kỳ thực thể nào như vậy bởi Togogo, hoặc ngược lại. Thông tin thị trường chỉ được cung cấp cho bạn dưới dạng dịch vụ và chúng tôi không chứng thực hoặc chấp thuận thông tin đó. Togogo không nắm giữ tiền của khách hàng và không chịu trách nhiệm với bạn về bất kỳ thiệt hại (trực tiếp hoặc gián tiếp) nào mà bạn phải chịu do việc sử dụng Trang web hoặc Phần mềm hoặc nội dung được cung cấp trên đó.
          </p>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-4 pb-6" data-aos="fade-up" data-aos-delay="300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <p className="text-[#a8b9cd] text-xs mb-4 md:mb-0 text-center md:text-left">
              &copy; {new Date().getFullYear()} TOGOGO. All rights reserved.
            </p>
          </div>
        </div>

        {/* Google Maps */}
        <div className="w-full h-72" data-aos="fade-up" data-aos-delay="400">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.899255391922!2d105.78257067608789!3d20.996675130644643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acb49b94ab1b%3A0x58570ca03e970d9a!2zQ2h1bmcgY8awIFZPViBN4buFIFRyw6w!5e0!3m2!1sen!2s!4v1739454201386!5m2!1sen!2s"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 