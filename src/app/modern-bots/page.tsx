"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShinyButton } from "@/components/magicui/shiny-button";
import GradientText from "@/components/magicui/animated-shiny-text";

// Bot data
const botsData = [
  {
    id: "1",
    image: "/images/robotv.png",
    tag: "Thị trường đi ngang",
    title: "Grid Bot",
    name: "Lý tưởng cho nhà đầu tư ưa ổn định, rủi ro thấp",
    description: [
      "Chiến lược: Thực hiện các lệnh Mua/Bán trên lưới giá định sẵn khi thị trường dao động",
      "Rủi ro: Thấp, phù hợp với thị trường ổn định",
      "Lợi nhuận: Thấp, nhưng đều đặn qua thời gian",
    ],
  },
  {
    id: "2",
    image: "/images/robo.png",
    tag: "Phân tích kỹ thuật",
    title: "Trend Bot",
    name: "Tối ưu cho thị trường có xu hướng rõ ràng",
    description: [
      "Chiến lược: Nhận diện và theo xu hướng thị trường bằng các chỉ báo kỹ thuật",
      "Rủi ro: Trung bình, phụ thuộc vào sức mạnh của xu hướng",
      "Lợi nhuận: Cao trong thị trường có xu hướng mạnh",
    ],
  },
  {
    id: "3",
    image: "/images/robotv.png",
    tag: "Kiểm soát rủi ro",
    title: "DCA Bot",
    name: "Phương pháp trung bình giá xuống hiệu quả",
    description: [
      "Chiến lược: Mua thêm khi giá giảm để hạ trung bình giá vốn",
      "Rủi ro: Trung bình, cần cài đặt giới hạn lỗ hợp lý",
      "Lợi nhuận: Cao khi thị trường phục hồi sau điều chỉnh",
    ],
  },
  {
    id: "4",
    image: "/images/robo.png",
    tag: "Giao dịch theo tin tức",
    title: "News Bot",
    name: "Khai thác biến động từ các tin tức quan trọng",
    description: [
      "Chiến lược: Phân tích tin tức và phản ứng nhanh với biến động thị trường",
      "Rủi ro: Cao, do biến động mạnh sau tin tức",
      "Lợi nhuận: Tiềm năng cao khi dự đoán đúng phản ứng thị trường",
    ],
  },
  {
    id: "5",
    image: "/images/robotv.png",
    tag: "Thị trường biến động",
    title: "Breakout Bot",
    name: "Tận dụng đột phá giá mạnh mẽ",
    description: [
      "Chiến lược: Nhận diện và giao dịch khi giá phá vỡ các ngưỡng hỗ trợ/kháng cự",
      "Rủi ro: Cao, cần lọc tín hiệu giả để tránh bẫy",
      "Lợi nhuận: Cao khi bắt đúng điểm đột phá mạnh",
    ],
  },
  {
    id: "6",
    image: "/images/robo.png",
    tag: "Chiến lược đa dạng",
    title: "Multi-Strategy Bot",
    name: "Kết hợp nhiều chiến lược giao dịch",
    description: [
      "Chiến lược: Phối hợp nhiều phương pháp để tối ưu trong mọi điều kiện thị trường",
      "Rủi ro: Trung bình, được phân tán qua nhiều chiến lược",
      "Lợi nhuận: Ổn định nhờ đa dạng hóa phương pháp",
    ],
  },
];

// Features list
const features = [
  {
    title: "Giao dịch tự động 24/7",
    description: "Bot hoạt động không ngừng nghỉ, không bỏ lỡ cơ hội giao dịch ngay cả khi bạn đang ngủ",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#64FFDA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001" stroke="#64FFDA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Loại bỏ yếu tố cảm xúc",
    description: "Tuân thủ nghiêm ngặt chiến lược đã thiết lập mà không bị chi phối bởi cảm xúc con người",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#64FFDA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.99998 15C7.99998 15 9.5 13 12 13C14.5 13 16 15 16 15" stroke="#64FFDA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10Z" fill="#64FFDA"/>
        <path d="M15 10C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9C14 9.55228 14.4477 10 15 10Z" fill="#64FFDA"/>
      </svg>
    ),
  },
  {
    title: "Tối ưu hóa chiến lược",
    description: "Kiểm thử ngược trên dữ liệu lịch sử để tối ưu hiệu suất trước khi giao dịch thực",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#64FFDA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 2V22" stroke="#64FFDA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 8.5H22" stroke="#64FFDA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 15.5H22" stroke="#64FFDA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Đa dạng chiến lược",
    description: "Lựa chọn từ nhiều loại bot với chiến lược khác nhau phù hợp mọi điều kiện thị trường",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.17004 7.44L12 12.55L20.77 7.47" stroke="#64FFDA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21.61V12.54" stroke="#64FFDA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.39001 9.17V14.83C2.39001 16.21 3.38001 17.66 4.59001 18.3L9.93001 21.19C11.07 21.79 12.94 21.79 14.08 21.19L19.42 18.3C20.63 17.66 21.62 16.21 21.62 14.83V9.17C21.62 7.79 20.63 6.34 19.42 5.7L14.08 2.81C12.94 2.21 11.07 2.21 9.93001 2.81L4.59001 5.7C3.38001 6.34 2.39001 7.79 2.39001 9.17Z" stroke="#64FFDA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

// Stats for performance section
const stats = [
  { label: "Lợi nhuận trung bình", value: "25%", subtext: "hàng năm" },
  { label: "Giảm thiểu rủi ro", value: "15%", subtext: "so với giao dịch thủ công" },
  { label: "Tỷ lệ thành công", value: "78%", subtext: "các giao dịch có lãi" },
  { label: "Khách hàng hài lòng", value: "90%", subtext: "quay lại sử dụng" },
];

export default function ModernBots() {
  const [activeBot, setActiveBot] = useState<number | null>(null);

  const handleHover = (index: number | null) => {
    setActiveBot(index);
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-white pt-32 md:pt-44">
      {/* Hero Section */}
      <section className="relative px-4 md:px-0">
        <div className="absolute inset-0 top-32 bg-gradient-to-b from-[#0A192F] to-transparent z-0"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div data-aos="fade-right">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-[#64FFDA]">Tự động hóa</span> giao dịch với Bot thông minh
            </h1>
            <p className="text-[#8892B0] text-xl mb-8">
              Tối ưu hóa chiến lược giao dịch của bạn với các Bot tự động được thiết kế 
              cho mọi điều kiện thị trường, hoạt động 24/7 không ngừng nghỉ.
            </p>
            <div className="flex flex-wrap gap-4">
              <ShinyButton className="bg-[#64FFDA] hover:bg-[#4CD2A9] text-[#0A192F] font-bold px-8 py-3 rounded">
                Dùng thử miễn phí
              </ShinyButton>
              <Link href="#bot-list" className="border border-[#64FFDA] text-[#64FFDA] px-8 py-3 rounded inline-block hover:bg-[#64FFDA]/10 transition-colors">
                Khám phá Bot
              </Link>
            </div>
          </div>
          <div className="relative" data-aos="fade-left">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#64FFDA] to-purple-600 rounded-lg blur opacity-40 animate-pulse"></div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/robotv.png" 
                alt="Robot Trading" 
                width={600} 
                height={400} 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-0 relative">
        <div className="absolute inset-0 bg-[#112240] opacity-50 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-4">Tính năng <span className="text-[#64FFDA]">nổi bật</span></h2>
            <p className="text-[#8892B0] max-w-2xl mx-auto">
              Bot giao dịch của TOGOGO được thiết kế với các tính năng tiên tiến 
              để tối ưu hóa trải nghiệm và hiệu suất giao dịch của bạn.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64FFDA] transition-all"
                whileHover={{ y: -10, borderColor: "#64FFDA" }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-12 h-12 bg-[#0A192F] rounded-lg flex items-center justify-center mb-4 text-[#64FFDA]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-[#8892B0]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl md:text-5xl font-bold text-[#64FFDA] mb-2">{stat.value}</p>
                <p className="text-sm text-[#8892B0] mb-1">{stat.subtext}</p>
                <p className="text-lg font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bot List Section */}
      <section id="bot-list" className="py-24 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <GradientText
              colors={["#64FFDA", "#b37feb", "#64FFDA", "#4CD2A9", "#64FFDA"]}
              animationSpeed={3}
              showBorder={true}
              className="rounded-full px-5 py-2 mb-4 text-lg font-medium"
            >
              DANH SÁCH BOT
            </GradientText>
            <h2 className="text-4xl font-bold mb-4">Chọn Bot <span className="text-[#64FFDA]">phù hợp với bạn</span></h2>
            <p className="text-[#8892B0] max-w-2xl mx-auto">
              Mỗi Bot được thiết kế cho một chiến lược giao dịch cụ thể. 
              Khám phá và chọn Bot phù hợp nhất với phong cách giao dịch của bạn.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {botsData.map((bot, index) => (
              <motion.div
                key={bot.id}
                className="bg-[#112240] rounded-lg overflow-hidden border border-[#233554] hover:border-[#64FFDA] transition-all"
                whileHover={{ y: -10, borderColor: "#64FFDA" }}
                onHoverStart={() => handleHover(index)}
                onHoverEnd={() => handleHover(null)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-48 overflow-hidden bg-[#0A192F]">
                  <Image
                    src={bot.image}
                    alt={bot.title}
                    fill
                    className="object-contain p-4 transition-transform duration-500"
                    style={{ 
                      transform: activeBot === index ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-[#233554] text-[#64FFDA] text-xs font-medium px-2 py-1 rounded">
                    {bot.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{bot.title}</h3>
                  <p className="text-[#8892B0] mb-4">{bot.name}</p>
                  <ul className="space-y-2 mb-6">
                    {bot.description.map((desc, idx) => (
                      <li key={idx} className="text-sm text-[#8892B0] flex">
                        <span className="text-[#64FFDA] mr-2">›</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                  <ShinyButton className="bg-[#64FFDA] hover:bg-[#4CD2A9] text-[#0A192F] font-bold py-2 px-4 rounded w-full">
                    Xem chi tiết
                  </ShinyButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-0">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#64FFDA] to-purple-600 rounded-lg blur opacity-30"></div>
          <div className="relative bg-[#112240] rounded-lg p-8 md:p-12 border border-[#233554]">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sẵn sàng tự động hóa <span className="text-[#64FFDA]">chiến lược giao dịch</span> của bạn?
              </h2>
              <p className="text-[#8892B0] mb-8 max-w-2xl mx-auto">
                Đăng ký ngay hôm nay để trải nghiệm các Bot giao dịch tự động hiệu quả của TOGOGO.
                Bắt đầu với gói miễn phí và nâng cấp khi bạn cần thêm tính năng.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ShinyButton className="bg-[#64FFDA] hover:bg-[#4CD2A9] text-[#0A192F] font-bold px-8 py-3 rounded">
                  Bắt đầu ngay
                </ShinyButton>
                <Link href="#" className="border border-[#64FFDA] text-[#64FFDA] px-8 py-3 rounded inline-block hover:bg-[#64FFDA]/10 transition-colors">
                  Đặt lịch tư vấn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="py-12 px-4 md:px-0 border-t border-[#233554]">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[#8892B0] mb-8">Được tin tưởng bởi các đối tác hàng đầu</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300">
              <Image 
                src="/images/logo-DNSE.png" 
                alt="DNSE Logo" 
                fill
                className="object-contain"
              />
            </div>
            <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300">
              <Image 
                src="/images/togogo_logo.png" 
                alt="Togogo Logo" 
                fill
                className="object-contain"
              />
            </div>
            {/* Add more partner logos as needed */}
          </div>
        </div>
      </section>
    </div>
  );
} 