"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShinyButton } from "@/components/magicui/shiny-button";
import AOS from "aos";

// Define interfaces
interface Card {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface Achievement {
  number: string;
  label: string;
  description: string;
}

interface CompanyValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Company achievements data
const achievements: Achievement[] = [
  {
    number: "1000+",
    label: "Người dùng tin tưởng",
    description:
      "Hơn 1000 nhà đầu tư đang sử dụng TOGOGO để tối ưu hóa lợi nhuận",
  },
  {
    number: "99.9%",
    label: "Độ tin cậy",
    description: "Hệ thống hoạt động ổn định với uptime 99.9%",
  },
  {
    number: "24/7",
    label: "Hoạt động liên tục",
    description: "Bot giao dịch không ngừng nghỉ, không bỏ lỡ cơ hội nào",
  },
  {
    number: "$10M+",
    label: "Khối lượng giao dịch",
    description: "Tổng khối lượng giao dịch đã xử lý qua nền tảng",
  },
];

// Company values
const companyValues: CompanyValue[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="#64FFDA"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    title: "Bảo mật tối đa",
    description:
      "Chúng tôi cam kết bảo vệ tài sản và thông tin cá nhân của khách hàng bằng công nghệ mã hóa tiên tiến nhất.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          stroke="#64FFDA"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    title: "Hiệu suất vượt trội",
    description:
      "Tối ưu hóa thuật toán để đạt được hiệu suất giao dịch tốt nhất, giúp tối đa hóa lợi nhuận cho người dùng.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"
          stroke="#64FFDA"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    title: "Minh bạch",
    description:
      "Mọi giao dịch và phí đều được hiển thị rõ ràng, không có chi phí ẩn hay bất ngờ nào.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
          stroke="#64FFDA"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    title: "Hỗ trợ 24/7",
    description:
      "Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng giải đáp mọi thắc mắc của khách hàng.",
  },
];

// Core Features data
const coreFeatures: Card[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill="#64FFDA" />
        <path
          d="M12 14.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5Z"
          fill="#64FFDA"
          opacity="0.7"
        />
      </svg>
    ),
    title: "Giao dịch tự động 24/7",
    desc: "Bot giao dịch hoạt động liên tục, không bỏ lỡ cơ hội nào trên thị trường crypto, forex và chứng khoán.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          stroke="#64FFDA"
          strokeWidth="2"
        />
        <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" fill="#64FFDA" />
      </svg>
    ),
    title: "Đa dạng sàn giao dịch",
    desc: "Kết nối với hơn 50 sàn giao dịch uy tín như Binance, Bybit, MT4/MT5, và nhiều sàn khác.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 7L13 15L9 11L3 17M21 7H15M21 7V13"
          stroke="#64FFDA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Công nghệ AI tiên tiến",
    desc: "Ứng dụng machine learning và deep learning để phân tích thị trường và tối ưu hóa chiến lược.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          ry="2"
          stroke="#64FFDA"
          strokeWidth="2"
          fill="none"
        />
        <line x1="16" y1="2" x2="16" y2="6" stroke="#64FFDA" strokeWidth="2" />
        <line x1="8" y1="2" x2="8" y2="6" stroke="#64FFDA" strokeWidth="2" />
        <line x1="3" y1="10" x2="21" y2="10" stroke="#64FFDA" strokeWidth="2" />
      </svg>
    ),
    title: "Quản lý rủi ro thông minh",
    desc: "Hệ thống stop-loss tự động và quản lý vốn khoa học để bảo vệ tài khoản của bạn.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          stroke="#64FFDA"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    title: "Backtesting chuyên nghiệp",
    desc: "Kiểm tra hiệu quả chiến lược trên dữ liệu lịch sử trước khi triển khai thực tế.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
          stroke="#64FFDA"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    title: "Phí giao dịch thấp",
    desc: "Chi phí cạnh tranh và minh bạch, không có phí ẩn. Chỉ thu phí khi có lợi nhuận.",
  },
];

// Trading Bots data (expanded)
const tradingBots = [
  {
    name: "Grid Bot",
    desc: "Phù hợp thị trường sideway, tự động mua thấp bán cao",
    risk: "Thấp",
    image: "/images/grid-chart.png",
    profit: "+15%",
    color: "from-green-500/20 to-emerald-500/20",
    features: ["Tự động đặt lệnh", "Phù hợp thị trường ổn định", "Rủi ro thấp"],
  },
  {
    name: "DCA Bot",
    desc: "Tối ưu chi phí trung bình, phân bổ vốn thông minh",
    risk: "Trung bình",
    image: "/images/dca-chart.png",
    profit: "+22%",
    color: "from-yellow-500/20 to-orange-500/20",
    features: ["Mua định kỳ", "Giảm rủi ro timing", "Phù hợp đầu tư dài hạn"],
  },
  {
    name: "Futures Bot",
    desc: "Tối đa hóa lợi nhuận với leverage, phù hợp trader kinh nghiệm",
    risk: "Cao",
    image: "/images/futures-chart.png",
    profit: "+35%",
    color: "from-red-500/20 to-pink-500/20",
    features: ["Leverage cao", "Lợi nhuận lớn", "Cần kinh nghiệm"],
  },
];

// Team data (expanded)
const teamData = [
  {
    name: "Lucas Ethan",
    position: "CEO & Founder",
    image: "/images/robotv.png",
    bio: "10+ năm kinh nghiệm giao dịch chứng khoán và forex. Cựu trader tại Goldman Sachs.",
    expertise: ["Trading Strategy", "Risk Management", "Financial Analysis"],
    linkedin: "#",
  },
  {
    name: "Anna Wilson",
    position: "CTO",
    image: "/images/robo.png",
    bio: "Chuyên gia AI và phát triển phần mềm, cựu kỹ sư tại Google với 8 năm kinh nghiệm.",
    expertise: ["Machine Learning", "System Architecture", "Blockchain"],
    linkedin: "#",
  },
  {
    name: "John Miller",
    position: "Lead Developer",
    image: "/images/robotv.png",
    bio: "Chuyên môn Pine Script và thuật toán, đã phát triển hơn 100 bot giao dịch thành công.",
    expertise: ["Algorithm Development", "Pine Script", "API Integration"],
    linkedin: "#",
  },
];

// Company milestones
const milestones = [
  {
    year: "2020",
    title: "Thành lập TOGOGO",
    description: "Ra mắt với tầm nhìn democratize algorithmic trading",
  },
  {
    year: "2021",
    title: "Ra mắt Bot đầu tiên",
    description: "Grid Bot với 98% độ chính xác trên thị trường crypto",
  },
  {
    year: "2022",
    title: "Mở rộng sang Forex",
    description: "Tích hợp với MT4/MT5, phục vụ 500+ trader",
  },
  {
    year: "2023",
    title: "Ứng dụng AI",
    description: "Tích hợp machine learning vào hệ thống giao dịch",
  },
  {
    year: "2024",
    title: "1000+ Users",
    description: "Đạt mốc 1000 người dùng và $10M+ khối lượng giao dịch",
  },
];

// FAQ data (expanded)
const faqs = [
  {
    question: "Chi phí sử dụng TOGOGO là bao nhiêu?",
    answer:
      "Gói Basic: 499,000 VND/tháng. Gói Pro: 999,000 VND/tháng. Gói Enterprise: 1,999,000 VND/tháng. Dùng thử miễn phí 7 ngày đầu tiên, không cần thẻ tín dụng.",
  },
  {
    question: "TOGOGO có an toàn không?",
    answer:
      "Chúng tôi sử dụng mã hóa SSL 256-bit, xác thực 2 lớp và không lưu trữ private key. API keys được mã hóa và chỉ có quyền giao dịch, không rút tiền.",
  },
  {
    question: "Làm sao để bắt đầu?",
    answer:
      "1) Đăng ký tài khoản miễn phí 2) Kết nối API từ sàn giao dịch 3) Chọn và cấu hình bot phù hợp 4) Thiết lập tham số rủi ro 5) Bắt đầu giao dịch tự động",
  },
  {
    question: "Tôi có thể kiểm soát bot như thế nào?",
    answer:
      "Bạn có thể tạm dừng, chỉnh sửa tham số, hoặc dừng bot bất cứ lúc nào. Hệ thống cũng có các giới hạn an toàn tự động.",
  },
  {
    question: "Bot có hoạt động trên mobile không?",
    answer:
      "Có, TOGOGO có ứng dụng mobile cho iOS và Android, cho phép bạn theo dõi và điều khiển bot mọi lúc mọi nơi.",
  },
];

// Optimize animation variants with simpler transitions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Increased for better performance
      delayChildren: 0.05, // Increased for better performance
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Reduced movement
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100, // Reduced stiffness
      damping: 10, // Reduced damping
    },
  },
};

// Replace emoji icons with SVG icons
const icons = {
  location: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  phone: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  email: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  check: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  lock: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  rocket: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  sparkles: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  target: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  lightning: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  clock: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  globe: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  money: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9.354a3 3 0 1 0 0 5.292M9 9.354a3 3 0 1 1 0 5.292M12 7v10" />
    </svg>
  ),
};

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  // --- BEGIN: Fix hydration for animated background particles ---
  const [particleStyles, setParticleStyles] = useState<
    { left: string; top: string }[]
  >([]);
  useEffect(() => {
    const arr = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticleStyles(arr);
  }, []);
  // --- END ---

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800, // Increased for smoother animation
      easing: "ease-out",
    });
    setIsVisible(true);

    // Optimize mouse tracking with throttling
    let timeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      }, 100); // Increased throttle time
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="bg-[#0A1529] text-white pt-24 md:pt-32 overflow-x-hidden home-page">
      {/* Optimize floating background */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#64FFDA]/8 to-purple-500/8 blur-3xl"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Reduce number of floating shapes */}
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${15 + i * 30}%`,
            left: `${10 + i * 20}%`,
            width: `${20 + i * 10}px`,
            height: `${20 + i * 10}px`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#64FFDA]/20 to-purple-500/20 rounded-full blur-xl" />
        </div>
      ))}

      {/* Hero section không hiệu ứng động */}
      <section className="relative px-4 md:px-6 lg:px-8 z-10 mb-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-[#00E5A1]/30 bg-[#0A1529]/80 backdrop-blur-sm px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-[#00E5A1] rounded-full mr-3" />
            <span className="text-[#00E5A1] font-semibold tracking-wide">
              TOGOGO TRADING - NỀN TẢNG GIAO DỊCH TỰ ĐỘNG HÀNG ĐẦU
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="inline-block bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] bg-clip-text text-transparent">
              Giao dịch thông minh
            </span>
            <br />
            <span>với sức mạnh AI</span>
          </h1>

          <p className="text-[#8892B0] text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            TOGOGO là nền tảng bot giao dịch tiên tiến nhất Việt Nam, sử dụng
            công nghệ AI và machine learning để tối ưu hóa lợi nhuận và giảm
            thiểu rủi ro cho hơn 1,000 nhà đầu tư.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <div className="relative"></div>
            <div className="flex items-center">
              <Link
                href="#features"
                className="text-[#64FFDA] hover:text-[#00E5A1] transition-all duration-300 text-lg font-semibold border-b-2 border-transparent hover:border-[#64FFDA] cursor-pointer"
              >
                Khám phá tính năng
              </Link>
              <span className="ml-2 text-[#64FFDA]">→</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {achievements.map((stat, index) => (
              <div
                key={index}
                className="bg-[#0A1529]/80 border border-[#64FFDA]/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#64FFDA] mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-[#64FFDA] mb-1">
                  {stat.label}
                </div>
                <div className="text-[#b6c6e3] text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#112240]/20 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Câu chuyện của <span className="text-[#64FFDA]">TOGOGO</span>
            </h2>
            <p className="text-[#8892B0] text-lg max-w-3xl mx-auto leading-relaxed">
              Được thành lập vào năm 2020 bởi đội ngũ chuyên gia tài chính và
              công nghệ, TOGOGO ra đời với sứ mệnh democratize algorithmic
              trading - đem công nghệ giao dịch tự động tiên tiến đến tay mọi
              nhà đầu tư Việt Nam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {companyValues.map((value, index) => (
              <div key={index} className="group text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#64FFDA]/20 to-[#00E5A1]/20 border border-[#64FFDA] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-[#64FFDA]/25">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#64FFDA] transition-colors">
                  {value.title}
                </h3>
                <p className="text-[#8892B0] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <div className="relative">
            <h3 className="text-3xl font-bold text-center mb-12">
              Hành trình phát triển
            </h3>

            <div className="hidden md:block absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#64FFDA] via-[#00E5A1] to-[#64FFDA]">
              <div className="h-full bg-gradient-to-b from-[#64FFDA] to-[#00E5A1]" />
            </div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0
                        ? "md:text-right md:pr-8"
                        : "md:text-left md:pl-8"
                    }`}
                  >
                    <div className="bg-[#112240]/80 backdrop-blur-sm border border-[#233554] rounded-xl p-6 hover:border-[#64FFDA] transition-all duration-500 group">
                      <div className="text-[#64FFDA] font-bold text-2xl mb-2 group-hover:scale-110 transition-transform">
                        {milestone.year}
                      </div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-[#64FFDA] transition-colors">
                        {milestone.title}
                      </h4>
                      <p className="text-[#8892B0]">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex w-4 h-4 bg-[#64FFDA] rounded-full border-4 border-[#0A192F] z-10 relative" />

                  <div className="w-full md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tại sao chọn <span className="text-[#64FFDA]">TOGOGO</span>?
            </h2>
            <p className="text-[#8892B0] text-lg max-w-3xl mx-auto">
              Giải pháp giao dịch tự động toàn diện với công nghệ tiên tiến nhất
              thị trường
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-[#112240]/80 backdrop-blur-sm p-8 rounded-2xl border border-[#233554] hover:border-[#64FFDA] transition-all duration-700 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/5 via-transparent to-[#00E5A1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="w-16 h-16 bg-[#0A192F] rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:shadow-lg group-hover:shadow-[#64FFDA]/25">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-4 relative z-10 group-hover:text-[#64FFDA] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#8892B0] relative z-10 leading-relaxed">
                  {feature.desc}
                </p>

                <div className="absolute top-6 right-6 w-2 h-2 bg-[#64FFDA] rounded-full opacity-0 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#112240]/20 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bot giao dịch{" "}
              <span className="text-[#64FFDA]">chuyên nghiệp</span>
            </h2>
            <p className="text-[#8892B0] text-lg max-w-3xl mx-auto">
              Lựa chọn bot phù hợp với phong cách đầu tư và mức độ rủi ro của
              bạn
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {tradingBots.map((bot, index) => (
              <div
                key={index}
                className="group relative bg-[#112240]/90 backdrop-blur-sm p-8 rounded-2xl border border-[#233554] hover:border-[#64FFDA] transition-all duration-700 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${bot.color} opacity-0 group-hover:opacity-100 transition-all duration-700`}
                />

                <div className="bg-[#0A192F]/90 rounded-xl p-6 mb-6 h-40 flex items-center justify-center relative overflow-hidden">
                  <div>
                    <Image
                      src={bot.image}
                      alt={bot.name}
                      width={140}
                      height={100}
                      className="object-contain"
                    />
                  </div>

                  <div className="absolute top-3 right-3 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
                    {bot.profit}
                  </div>

                  <div className="absolute inset-0 opacity-10">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full h-px bg-[#64FFDA]"
                        style={{ top: `${20 + i * 15}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-4 relative z-10">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                      bot.risk === "Thấp"
                        ? "bg-green-500/20 text-green-400 border-green-500/40"
                        : bot.risk === "Trung bình"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                        : "bg-red-500/20 text-red-400 border-red-500/40"
                    }`}
                  >
                    Rủi ro: {bot.risk}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 relative z-10 group-hover:text-[#64FFDA] transition-colors">
                  {bot.name}
                </h3>
                <p className="text-[#8892B0] mb-6 relative z-10 leading-relaxed">
                  {bot.desc}
                </p>

                <div className="mb-6 relative z-10">
                  {bot.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-center text-sm text-[#8892B0] mb-2"
                    >
                      <div className="w-1.5 h-1.5 bg-[#64FFDA] rounded-full mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-[#64FFDA]/10 to-[#00E5A1]/10 hover:from-[#64FFDA]/20 hover:to-[#00E5A1]/20 text-[#64FFDA] py-3 rounded-xl transition-all duration-300 relative z-10 border border-[#64FFDA]/30 hover:border-[#64FFDA]/60 font-semibold cursor-pointer">
                  <Link
                    href={`/bots/${bot.name.toLowerCase().replace(" ", "-")}`}
                    className="cursor-pointer"
                  >
                    Tìm hiểu thêm
                  </Link>
                </button>

                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#64FFDA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#00E5A1]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Cách thức <span className="text-[#64FFDA]">hoạt động</span>
            </h2>
            <p className="text-[#8892B0] text-lg max-w-3xl mx-auto">
              Chỉ với 4 bước đơn giản, bạn có thể bắt đầu giao dịch tự động cùng
              TOGOGO
            </p>
          </div>

          <div className="relative">
            <svg
              className="absolute top-6 left-0 w-full h-16 hidden md:block z-0"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <line
                x1="18.75"
                y1="5"
                x2="31.25"
                y2="5"
                stroke="#64FFDA"
                strokeWidth="0.2"
                opacity="0.5"
              />

              <line
                x1="43.75"
                y1="5"
                x2="56.25"
                y2="5"
                stroke="#00E5A1"
                strokeWidth="0.2"
                opacity="0.5"
              />

              <line
                x1="68.75"
                y1="5"
                x2="81.25"
                y2="5"
                stroke="#64FFDA"
                strokeWidth="0.2"
                opacity="0.5"
              />

              <line
                x1="18.75"
                y1="5"
                x2="31.25"
                y2="5"
                stroke="#64FFDA"
                strokeWidth="0.4"
                filter="url(#glow)"
              />

              <line
                x1="43.75"
                y1="5"
                x2="56.25"
                y2="5"
                stroke="#00E5A1"
                strokeWidth="0.4"
                filter="url(#glow)"
              />

              <line
                x1="68.75"
                y1="5"
                x2="81.25"
                y2="5"
                stroke="#64FFDA"
                strokeWidth="0.4"
                filter="url(#glow)"
              />

              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: "01",
                  title: "Đăng ký tài khoản",
                  desc: "Tạo tài khoản miễn phí chỉ trong 30 giây",
                  icon: icons.check,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  step: "02",
                  title: "Kết nối API",
                  desc: "Liên kết an toàn với sàn giao dịch yêu thích",
                  icon: icons.lock,
                  color: "from-green-500 to-emerald-500",
                },
                {
                  step: "03",
                  title: "Cấu hình Bot",
                  desc: "Thiết lập tham số theo chiến lược cá nhân",
                  icon: icons.rocket,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  step: "04",
                  title: "Bắt đầu giao dịch",
                  desc: "Bot hoạt động tự động 24/7, theo dõi mọi lúc",
                  icon: icons.lightning,
                  color: "from-orange-500 to-red-500",
                },
              ].map((item, index) => (
                <div key={index} className="text-center group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
                  />

                  <div className="relative w-24 h-24 bg-gradient-to-br from-[#64FFDA]/30 to-[#00E5A1]/30 border-2 border-[#64FFDA] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl group-hover:shadow-[#64FFDA]/30">
                    <span className="text-[#64FFDA] font-bold text-xl">
                      {item.step}
                    </span>

                    <div className="absolute -top-3 -right-3 text-2xl">
                      {item.icon}
                    </div>

                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 border-2 border-[#64FFDA]/20 rounded-3xl"
                      />
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#64FFDA] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#8892B0] text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  {index < 3 && (
                    <div className="md:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-[#64FFDA] to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#112240]/15 to-[#112240]/40" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Đội ngũ <span className="text-[#64FFDA]">chuyên gia</span>
            </h2>
            <p className="text-[#8892B0] text-lg max-w-3xl mx-auto">
              Kinh nghiệm sâu rộng về tài chính và công nghệ, cam kết mang đến
              giải pháp tốt nhất
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {teamData.map((member, index) => (
              <div key={index} className="group perspective-1000">
                <div className="relative bg-[#112240]/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#233554] hover:border-[#64FFDA] transition-all duration-700 transform-gpu h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/8 via-transparent to-[#00E5A1]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="h-56 bg-gradient-to-br from-[#0A192F] to-[#112240] flex items-center justify-center relative overflow-hidden">
                    <div>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={140}
                        height={140}
                        className="object-contain relative z-10"
                      />
                    </div>

                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-[#64FFDA]/60 rounded-full"
                        style={{
                          left: `${40 * Math.cos(i * 1.2)}px`,
                          top: `${40 * Math.sin(i * 1.2)}px`,
                        }}
                      />
                    ))}

                    <div className="absolute inset-0 border border-[#64FFDA]/20 rounded-full" />
                  </div>

                  <div className="p-8 relative z-10">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-[#64FFDA] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[#64FFDA] text-sm mb-3 font-semibold uppercase tracking-wide">
                      {member.position}
                    </p>
                    <p className="text-[#8892B0] text-sm mb-4 leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-[#64FFDA]/10 text-[#64FFDA] text-xs rounded-full border border-[#64FFDA]/20"
                          style={{
                            backgroundColor: "rgba(100, 255, 218, 0.2)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <a
                      href={member.linkedin}
                      className="inline-flex items-center text-[#64FFDA] hover:text-[#00E5A1] transition-colors text-sm font-medium cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.71zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                      </svg>
                      LinkedIn Profile
                    </a>
                  </div>

                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#64FFDA]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#00E5A1]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Công nghệ & <span className="text-[#64FFDA]">Đổi mới</span>
            </h2>
            <p className="text-[#8892B0] text-lg max-w-3xl mx-auto">
              Nền tảng giao dịch tự động được xây dựng trên công nghệ tiên tiến
              nhất
            </p>
          </div>

          <div className="mb-20">
            <h3 className="text-2xl font-bold text-center mb-12">
              Công nghệ nền tảng
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#112240]/80 backdrop-blur-sm border border-[#233554] rounded-xl p-8">
                <h4 className="text-xl font-bold mb-6 text-[#64FFDA]">
                  Kiến trúc hệ thống
                </h4>
                <ul className="space-y-4">
                  {[
                    "Microservices Architecture với Node.js & Python",
                    "Real-time Data Processing với Apache Kafka",
                    "Machine Learning Pipeline với TensorFlow & PyTorch",
                    "High-Frequency Trading Engine tự phát triển",
                  ].map((tech, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#64FFDA] mr-3">▹</span>
                      <span className="text-[#8892B0]">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#112240]/80 backdrop-blur-sm border border-[#233554] rounded-xl p-8">
                <h4 className="text-xl font-bold mb-6 text-[#64FFDA]">
                  Đổi mới công nghệ
                </h4>
                <ul className="space-y-4">
                  {[
                    "Thuật toán AI độc quyền dự đoán xu hướng thị trường",
                    "Hệ thống quản lý rủi ro thông minh tự động",
                    "Công nghệ mã hóa đa lớp bảo vệ tài sản",
                    "Phân tích thị trường thời gian thực với độ chính xác 95%",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#64FFDA] mr-3">▹</span>
                      <span className="text-[#8892B0]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h3 className="text-2xl font-bold text-center mb-12">
              Lộ trình phát triển
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  phase: "Giai đoạn 1",
                  title: "Tối ưu hóa hiệu suất",
                  items: [
                    "Nâng cấp hệ thống xử lý dữ liệu",
                    "Cải thiện độ chính xác của AI",
                    "Tối ưu hóa tốc độ giao dịch",
                  ],
                  icon: icons.lightning,
                },
                {
                  phase: "Giai đoạn 2",
                  title: "Mở rộng tính năng",
                  items: [
                    "Thêm chiến lược giao dịch mới",
                    "Tích hợp thêm sàn giao dịch",
                    "Phát triển ứng dụng mobile",
                  ],
                  icon: icons.rocket,
                },
                {
                  phase: "Giai đoạn 3",
                  title: "Phát triển bền vững",
                  items: [
                    "Mở rộng thị trường Đông Nam Á",
                    "Xây dựng cộng đồng trader",
                    "Phát triển API cho đối tác",
                  ],
                  icon: icons.globe,
                },
              ].map((phase, index) => (
                <div
                  key={index}
                  className="group bg-[#112240]/80 backdrop-blur-sm border border-[#233554] rounded-xl p-8 hover:border-[#64FFDA] transition-all duration-500"
                >
                  <div className="text-4xl mb-4">{phase.icon}</div>
                  <div className="text-[#64FFDA] text-sm font-semibold mb-2">
                    {phase.phase}
                  </div>
                  <h4 className="text-xl font-bold mb-4 group-hover:text-[#64FFDA] transition-colors">
                    {phase.title}
                  </h4>
                  <ul className="space-y-2">
                    {phase.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-[#8892B0] text-sm flex items-start"
                      >
                        <span className="text-[#64FFDA] mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#112240]/80 backdrop-blur-sm border border-[#233554] rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">
              Thống kê công nghệ
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Tốc độ xử lý",
                  value: "< 10ms",
                  desc: "Độ trễ giao dịch",
                  icon: icons.lightning,
                },
                {
                  title: "Độ chính xác",
                  value: "95%",
                  desc: "Dự đoán thị trường",
                  icon: icons.target,
                },
                {
                  title: "Uptime",
                  value: "99.9%",
                  desc: "Thời gian hoạt động",
                  icon: icons.clock,
                },
                {
                  title: "Bảo mật",
                  value: "256-bit",
                  desc: "Mã hóa SSL",
                  icon: icons.lock,
                },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-2xl font-bold text-[#64FFDA] mb-2">
                    {stat.value}
                  </div>
                  <h4 className="text-lg font-bold mb-1">{stat.title}</h4>
                  <p className="text-[#8892B0] text-sm">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#112240]/90 to-[#0A192F]/90 backdrop-blur-sm rounded-3xl p-12 border border-[#64FFDA]/30 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {particleStyles.map((style, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#64FFDA] rounded-full"
                  style={style}
                />
              ))}
            </div>

            <div className="absolute -inset-1 bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] rounded-3xl blur-sm opacity-30">
              <div className="w-full h-full bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA]" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center bg-[#64FFDA]/10 border border-[#64FFDA]/30 rounded-full px-6 py-2 mb-8">
                <div className="w-2 h-2 bg-[#64FFDA] rounded-full mr-3" />
                <span className="text-[#64FFDA] font-semibold">
                  🎉 Ưu đái đặc biệt
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Sẵn sàng bắt đầu{" "}
                <span className="bg-gradient-to-r from-[#64FFDA] to-[#00E5A1] bg-clip-text text-transparent">
                  giao dịch tự động
                </span>
                ?
              </h2>

              <p className="text-[#8892B0] text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                Tham gia cùng hơn 1,000 nhà đầu tư thông minh đang sử dụng
                TOGOGO để tối ưu hóa lợi nhuận và tiết kiệm thời gian. Dùng thử
                miễn phí 7 ngày, không cần thẻ tín dụng.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#64FFDA] to-[#00E5A1] rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <ShinyButton className="relative bg-gradient-to-r from-[#64FFDA] to-[#00E5A1] hover:from-[#4CD2A9] hover:to-[#64FFDA] text-[#0A192F] font-bold px-12 py-4 rounded-2xl text-xl shadow-2xl cursor-pointer">
                    🚀 Bắt đầu miễn phí ngay
                  </ShinyButton>
                </div>

                <div className="flex items-center group cursor-pointer">
                  <Link
                    href="/contact"
                    className="text-[#64FFDA] hover:text-[#00E5A1] transition-colors text-lg font-semibold border-b-2 border-transparent hover:border-[#64FFDA] pb-1 cursor-pointer"
                  >
                    Hoặc liên hệ tư vấn
                  </Link>
                  <span className="ml-3 text-[#64FFDA] text-xl">→</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
                {[
                  { icon: icons.check, text: "Dùng thử 7 ngày miễn phí" },
                  { icon: icons.lock, text: "Bảo mật tuyệt đối" },
                  { icon: icons.phone, text: "Hỗ trợ 24/7" },
                  { icon: icons.money, text: "Không phí ẩn" },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-[#0A192F]/60 border border-[#64FFDA]/20 rounded-full px-4 py-2 hover:border-[#64FFDA]/40 transition-colors group cursor-pointer"
                  >
                    <span className="mr-2 text-base">{badge.icon}</span>
                    <span className="text-[#8892B0] group-hover:text-[#64FFDA] transition-colors font-medium cursor-pointer">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-sm max-w-3xl mx-auto">
                {[
                  {
                    icon: icons.location,
                    title: "Địa chỉ",
                    text: "83 Nguyễn Văn Tuyết, Hà Nội",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: icons.phone,
                    title: "Hotline",
                    text: "0123.456.789",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: icons.email,
                    title: "Email",
                    text: "support@togogo.vn",
                    color: "from-purple-500 to-pink-500",
                  },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="group text-center cursor-pointer bg-[#0A192F]/40 border border-[#233554] rounded-xl p-4 hover:border-[#64FFDA]/40 transition-all duration-300"
                  >
                    <div className="text-2xl mb-2">{contact.icon}</div>
                    <div className="text-[#64FFDA] font-semibold mb-1">
                      {contact.title}
                    </div>
                    <div className="text-[#8892B0] group-hover:text-white transition-colors">
                      {contact.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
