"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShinyButton } from "@/components/magicui/shiny-button";
import GradientText from "@/components/magicui/animated-shiny-text";
import {
  Calendar,
  RefreshCw,
  Activity,
  BarChart2,
  Target,
  Lightbulb,
  Shield,
  TrendingUp,
  Info,
  InfoIcon,
} from "lucide-react";

// Bot interface from API
interface BotData {
  botId: number;
  botName: string;
  description: string;
  createdDate: string;
  lastModifiedDate: string;
  isActive: boolean;
  settings?: string;
}

// Bot interface for UI
interface Bot {
  id: string;
  image: string;
  tag: string;
  title: string;
  name: string;
  description: {
    label: string;
    value: string;
    icon: React.FC<any>;
    color: string;
  }[];
  botType: string;
  roi: string;
  apiData: BotData;
}

// Bot benefits
const botBenefits = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Giám sát thời gian thực",
    description:
      "Theo dõi trạng thái hoạt động của bot trực tiếp trên bảng điều khiển của bạn",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="15"></line>
        <line x1="15" y1="9" x2="9" y2="15"></line>
      </svg>
    ),
    title: "Cấu hình dễ dàng",
    description:
      "Thiết lập tối thiểu, giao diện thân thiện với người dùng để bắt đầu nhanh chóng",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
      </svg>
    ),
    title: "Quản lý tập trung",
    description:
      "Quản lý tài sản và xem giao dịch trên tất cả các sàn giao dịch được kết nối",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    ),
    title: "Hoạt động 24/7",
    description:
      "Tận hưởng giao dịch liên tục mà không cần giám sát thường xuyên",
  },
];

// How it works steps
const howItWorksSteps = [
  {
    number: "01",
    title: "Tạo tài khoản",
    description: "Đăng ký và kết nối API của sàn giao dịch",
  },
  {
    number: "02",
    title: "Thiết lập bot",
    description: "Tùy chỉnh thông số giao dịch theo nhu cầu của bạn",
  },
  {
    number: "03",
    title: "Giao dịch tự động",
    description: "Để bot xử lý các giao dịch tự động",
  },
  {
    number: "04",
    title: "Giám sát và điều chỉnh",
    description: "Theo dõi và tinh chỉnh cài đặt để hiệu suất tối ưu",
  },
];

// Platform features
const platformFeatures = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m16 12-4 4-4-4"></path>
        <path d="M12 8v8"></path>
      </svg>
    ),
    title: "Tự động hóa toàn phần",
    description: "Tính năng đặt lệnh và quản lý vị thế hoàn toàn tự động 24/7",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
      </svg>
    ),
    title: "Quản lý rủi ro",
    description:
      "Tự động thiết lập bảo vệ vốn với cơ chế stop-loss và take-profit",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18"></path>
        <path d="m19 9-5 5-4-4-3 3"></path>
      </svg>
    ),
    title: "Phân tích kỹ thuật",
    description:
      "Kết hợp nhiều chỉ báo để đưa ra quyết định giao dịch chính xác",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    title: "Thời gian chạy liên tục",
    description: "Bot chạy 24/7 không cần bạn phải theo dõi thường xuyên",
  },
];

// Testimonials
const testimonials = [
  {
    name: "Nguyễn Văn A",
    role: "Nhà đầu tư phái sinh",
    avatar: "/images/user-avatar.png",
    quote:
      "Bot phái sinh của TOGOGO giúp tôi tiết kiệm thời gian và tối ưu lợi nhuận rõ rệt. Giao diện rất dễ dùng!",
  },
  {
    name: "Trần Thị B",
    role: "Trader chuyên nghiệp",
    avatar: "/images/user-avatar.png",
    quote:
      "Tôi thích nhất là tính năng quản lý rủi ro tự động và báo cáo hiệu suất chi tiết.",
  },
  {
    name: "Lê Văn C",
    role: "Nhà đầu tư cá nhân",
    avatar: "/images/user-avatar.png",
    quote:
      "Bot tự động hóa giao dịch rất thông minh, tôi không cần phải canh thị trường liên tục.",
  },
  {
    name: "Phạm Thị D",
    role: "Chuyên gia tài chính",
    avatar: "/images/user-avatar.png",
    quote:
      "Tôi đánh giá cao khả năng phân tích thị trường và cảnh báo rủi ro của bot.",
  },
  {
    name: "Trần Văn E",
    role: "Trader chuyên nghiệp",
    avatar: "/images/user-avatar.png",
    quote:
      "Sau 3 tháng sử dụng bot, lợi nhuận của tôi tăng rõ rệt và rất an toàn.",
  },
];

// Đảm bảo testimonials luôn có ít nhất 3 phần tử để tránh lỗi index undefined
const safeTestimonials =
  testimonials.length >= 3
    ? testimonials
    : [...testimonials, ...testimonials, ...testimonials].slice(0, 3);

// Hàm tách description thành các trường rõ ràng
function parseDescription(raw: string) {
  if (!raw) return [];
  const fields = [
    { key: "Mục đích", icon: Target, color: "text-blue-400" },
    { key: "Chiến lược", icon: Lightbulb, color: "text-yellow-400" },
    { key: "Rủi ro", icon: Shield, color: "text-red-400" },
    { key: "Lợi nhuận", icon: TrendingUp, color: "text-green-400" },
    { key: "Lưu ý", icon: Info, color: "text-purple-400" },
  ];
  const result = [];
  let lastIdx = 0;
  for (let i = 0; i < fields.length; i++) {
    const idx = raw.indexOf(fields[i].key + ":");
    if (idx !== -1) {
      if (result.length > 0) {
        result[result.length - 1].value = raw
          .slice(lastIdx, idx)
          .replace(/^[.\s]+|[.\s]+$/g, "");
      }
      result.push({
        label: fields[i].key,
        value: "",
        icon: fields[i].icon,
        color: fields[i].color,
      });
      lastIdx = idx + fields[i].key.length + 1;
    }
  }
  if (result.length > 0) {
    result[result.length - 1].value = raw
      .slice(lastIdx)
      .replace(/^[.\s]+|[.\s]+$/g, "");
  } else {
    result.push({
      label: "Mô tả",
      value: raw,
      icon: Info,
      color: "text-blue-400",
    });
  }
  return result;
}

// Định nghĩa màu chủ đạo cho icon
const iconColor = "text-[#64FFDA]";

// Insert new section data at the top of the file
const features = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 12l-4 4-4-4"></path>
        <path d="M12 8v8"></path>
      </svg>
    ),
    title: "Phân tích AI",
    desc: "Bot nhận diện xu hướng phái sinh bằng AI.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9l6 6M15 9l-6 6" />
      </svg>
    ),
    title: "Quản lý rủi ro tự động",
    desc: "Tự động đặt stop-loss, take-profit.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    title: "Giao dịch 24/7",
    desc: "Bot hoạt động liên tục, không bỏ lỡ cơ hội.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Giao diện trực quan",
    desc: "Bảng điều khiển dễ dùng, theo dõi hiệu suất.",
  },
];
const botStrategies = [
  {
    name: "Bot Lưới",
    chart: (
      <svg width="100%" height="60" viewBox="0 0 200 60">
        <polyline
          points="0,50 30,30 60,40 90,20 120,35 150,15 200,30"
          fill="none"
          stroke="#64FFDA"
          strokeWidth="3"
        />
        <circle cx="30" cy="30" r="4" fill="#64FFDA" />
        <circle cx="90" cy="20" r="4" fill="#64FFDA" />
        <circle cx="150" cy="15" r="4" fill="#64FFDA" />
      </svg>
    ),
    desc: "Tối ưu lợi nhuận sideway, tự động mua bán theo lưới giá.",
  },
  {
    name: "Bot Hợp đồng tương lai",
    chart: (
      <svg width="100%" height="60" viewBox="0 0 200 60">
        <polyline
          points="0,50 40,20 80,40 120,10 160,35 200,15"
          fill="none"
          stroke="#4079ff"
          strokeWidth="3"
        />
        <circle cx="40" cy="20" r="4" fill="#4079ff" />
        <circle cx="120" cy="10" r="4" fill="#4079ff" />
      </svg>
    ),
    desc: "Tận dụng xu hướng mạnh, vào lệnh Long/Short tự động.",
  },
  {
    name: "Bot Chênh lệch giá",
    chart: (
      <svg width="100%" height="60" viewBox="0 0 200 60">
        <polyline
          points="0,40 50,30 100,50 150,20 200,40"
          fill="none"
          stroke="#a084ff"
          strokeWidth="3"
        />
        <circle cx="50" cy="30" r="4" fill="#a084ff" />
        <circle cx="150" cy="20" r="4" fill="#a084ff" />
      </svg>
    ),
    desc: "Tìm kiếm arbitrage, khai thác chênh lệch giá.",
  },
];
const howItWorks = [
  {
    step: "01",
    title: "Đăng ký tài khoản",
    desc: "Tạo tài khoản và xác thực thông tin.",
  },
  {
    step: "02",
    title: "Kết nối API",
    desc: "Liên kết tài khoản chứng khoán phái sinh.",
  },
  {
    step: "03",
    title: "Thiết lập bot",
    desc: "Chọn chiến lược, cấu hình thông số và khởi động bot.",
  },
  {
    step: "04",
    title: "Theo dõi & tối ưu",
    desc: "Giám sát hiệu suất, điều chỉnh chiến lược.",
  },
];

export default function Bots() {
  const [activeBot, setActiveBot] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeBotIndex, setActiveBotIndex] = useState(0);
  const [botsData, setBotsData] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);

  const activeCardRef = useRef(null);
  const [previewHeight, setPreviewHeight] = useState(0);

  useEffect(() => {
    if (activeCardRef.current) {
      const height = activeCardRef.current.offsetHeight;
      setPreviewHeight(Math.round(height * 0.75));
    }
  }, [activeBotIndex]);

  const handleHover = (index: number | null) => {
    setActiveBot(index);
  };

  const nextBot = () => {
    setActiveBotIndex((prev) => (prev + 1) % botsData.length);
  };

  const prevBot = () => {
    setActiveBotIndex((prev) => (prev === 0 ? botsData.length - 1 : prev - 1));
  };

  const handlePrevTestimonial = () =>
    setActiveTestimonial((prev) =>
      prev === 0 ? safeTestimonials.length - 1 : prev - 1
    );
  const handleNextTestimonial = () =>
    setActiveTestimonial((prev) =>
      prev === safeTestimonials.length - 1 ? 0 : prev + 1
    );

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch(
          "https://apibacktest.togogo.vn/api/DataManagement/bots"
        );
        const data: BotData[] = await response.json();

        // Transform API data to UI format
        const transformedBots: Bot[] = data.map((bot, index) => ({
          id: bot.botId.toString(),
          image:
            index % 3 === 0
              ? "/images/grid-chart.png"
              : index % 3 === 1
              ? "/images/futures-chart.png"
              : "/images/dca-chart.png",
          tag: "BOT GIAO DỊCH TỰ ĐỘNG",
          title: bot.botName,
          name: bot.botName,
          description: [
            ...parseDescription(bot.description),
            {
              label: "Ngày tạo",
              value: new Date(bot.createdDate).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              icon: Calendar,
              color: "text-blue-400",
            },
            {
              label: "Cập nhật",
              value: new Date(bot.lastModifiedDate).toLocaleDateString(
                "vi-VN",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              ),
              icon: RefreshCw,
              color: "text-purple-400",
            },
            {
              label: "Trạng thái",
              value: bot.isActive ? "Đang hoạt động" : "Tạm dừng",
              icon: Activity,
              color: bot.isActive ? "text-green-400" : "text-red-400",
            },
            {
              label: "Loại bot",
              value:
                index % 3 === 0
                  ? "Grid Trading"
                  : index % 3 === 1
                  ? "Futures Trading"
                  : "DCA Strategy",
              icon: BarChart2,
              color: "text-yellow-400",
            },
          ],
          botType:
            index % 3 === 0
              ? "Grid Trading"
              : index % 3 === 1
              ? "Futures Trading"
              : "DCA Strategy",
          roi: `+${(Math.random() * 15 + 8).toFixed(1)}%`,
          apiData: bot,
        }));

        setBotsData(transformedBots);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bots:", error);
        setLoading(false);
      }
    };

    fetchBots();
  }, []);

  // Calculate indices for displaying adjacent bots
  const totalBots = botsData.length;
  const prevBotIndex = (activeBotIndex - 1 + totalBots) % totalBots;
  const nextBotIndex = (activeBotIndex + 1) % totalBots;

  return (
    <div
      className="min-h-screen text-white pt-32 md:pt-44 relative"
      style={{
        background:
          "linear-gradient(to bottom, rgb(16, 24, 40), rgb(11, 17, 31))",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hero Section */}
      <section className="relative px-4 md:px-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-20">
          <div className="inline-block rounded-full border border-[#64FFDA]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-6">
            <span className="text-[#64FFDA] font-medium tracking-wide text-lg">
              BOT CHỨNG KHOÁN PHÁI SINH
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#64FFDA]">
              Tự động hóa giao dịch phái sinh
            </span>
          </h1>
          <p className="text-[#8892B0] text-xl mb-8 max-w-2xl mx-auto">
            Sử dụng bot thông minh để tối ưu hóa chiến lược giao dịch hợp đồng
            tương lai và quyền chọn.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <ShinyButton
              onClick={() =>
                (window.location.href = "/dangnhap?panel=register")
              }
              className="bg-[#64FFDA] hover:bg-[#4CD2A9] text-[#0A192F] font-bold px-10 py-4 rounded-full text-xl cursor-pointer shadow-xl whitespace-nowrap"
            >
              Đăng ký ngay
            </ShinyButton>
            <Link
              href="#bot-list"
              className="text-[#64FFDA] hover:underline font-medium flex items-center gap-2 mt-2 sm:mt-0 py-3 cursor-pointer"
            >
              Khám phá bot{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="M17 7l-8.5 8.5M21 18l-8.5-8.5-5 5L3 10" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-12 w-full max-w-lg">
            <div className="flex flex-col items-center text-center">
              <div className="text-3xl font-bold text-[#64FFDA]">24/7</div>
              <div className="text-sm text-[#8892B0]">Hoạt động liên tục</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-3xl font-bold text-[#64FFDA]">+200</div>
              <div className="text-sm text-[#8892B0]">Nhà đầu tư</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-3xl font-bold text-[#64FFDA]">3+</div>
              <div className="text-sm text-[#8892B0]">Chiến lược bot</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full border border-[#64FFDA]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-4 text-[#64FFDA] font-medium tracking-wide text-lg">
              TÍNH NĂNG NỔI BẬT
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Lợi ích khi dùng{" "}
              <span className="text-[#64FFDA]">Bot Phái Sinh</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="backdrop-blur-md bg-white/10 shadow-lg rounded-2xl flex flex-col items-center text-center cursor-pointer transition-transform duration-200 hover:scale-105 group"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#64FFDA] bg-gradient-to-br from-[#64FFDA]/30 to-[#3730a3]/30 shadow-[0_0_24px_4px_#64FFDA44] group-hover:shadow-[0_0_32px_8px_#64FFDA88]">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-[#b6c6e3]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bot Strategies Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full border border-[#64FFDA]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-4 text-[#64FFDA] font-medium tracking-wide text-lg">
              CHIẾN LƯỢC BOT
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Các loại <span className="text-[#64FFDA]">Bot giao dịch</span> nổi
              bật
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {botStrategies.map((b, i) => (
              <div
                key={i}
                className="flex items-center bg-[#0A192F]/60 border-2 border-[#3730a3] hover:border-[#64FFDA] rounded-xl p-6 transition-all cursor-pointer group"
              >
                <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center mr-6 group-hover:animate-wiggle">
                  {b.chart}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#64FFDA]">
                    {b.name}
                  </h3>
                  <p className="text-[#b6c6e3]">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bot List Section */}
      <section id="bot-list" className="py-20 px-4 md:px-0 relative">
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Bottom semi-circle background */}
          <div className="absolute w-[1600px] h-[1600px] rounded-full border border-[#64FFDA]/10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[65%] blur-lg"></div>
          <div className="absolute w-[1400px] h-[1400px] rounded-full border border-[#64FFDA]/10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[65%] blur-lg"></div>
          <div className="absolute w-[1200px] h-[1200px] rounded-full border border-[#64FFDA]/10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[65%] blur-lg"></div>
          <div className="absolute w-[1000px] h-[1000px] rounded-full border border-[#64FFDA]/10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[65%] blur-lg"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full border border-[#00E5A1]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-4">
              <span className="text-[#00E5A1] font-medium tracking-wide text-lg">
                BOT GIAO DỊCH
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Bot giao dịch tiên tiến
            </h2>
            <p className="text-[#8892B0] text-xl mb-12 max-w-2xl mx-auto">
              Trải nghiệm các bot giao dịch được thiết kế cho nhiều chiến lược
              và mục tiêu đầu tư khác nhau
            </p>
          </div>
          <div className="relative mb-16 flex items-center justify-center">
            {/* Conditional rendering based on loading state and data availability */}
            {loading ? (
              // Loading state
              <div className="text-center py-20 w-full">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#64FFDA]"></div>
                <p className="mt-4 text-[#8892B0]">Đang tải dữ liệu bot...</p>
              </div>
            ) : botsData.length > 0 ? (
              // Data loaded and available - render bot slider
              <div className="flex items-center justify-center w-full relative">
                {/* Previous Bot Preview (Optional - adjust styling as needed) */}
                {totalBots > 1 && (
                  <motion.div
                    key={botsData[prevBotIndex].id + "prev"}
                    className="w-1/4 opacity-50 scale-90 transition-all duration-300 hidden md:block  h-[450px]"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 0.5, x: 0, scale: 0.9 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Render a simplified version of the card or just an image/placeholder */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center cursor-pointer shadow-lg h-full flex flex-col justify-between">
                      <div className="my-2 h-20 flex items-center justify-center opacity-50">
                        {/* Simplified Placeholder for Chart/Image */}
                        {prevBotIndex % 3 === 0 && (
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 300 100"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M50,80 Q100,40 150,80 Q200,120 250,80"
                              fill="none"
                              stroke="#64FFDA"
                              strokeWidth="3"
                            />
                          </svg>
                        )}
                        {prevBotIndex % 3 === 1 && (
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 300 100"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0,80 L50,40 L100,60 L150,20 L200,70 L250,30 L300,50"
                              fill="none"
                              stroke="#64FFDA"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                        {prevBotIndex % 3 === 2 && (
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 300 100"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0,80 L50,60 L100,70 L150,50 L200,60 L250,40 L300,50"
                              fill="none"
                              stroke="#64FFDA"
                              strokeWidth="2"
                            />
                            <path
                              d="M0,90 L50,70 L100,80 L150,60 L200,70 L250,50 L300,60"
                              fill="none"
                              stroke="#4079ff"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="pt-8">
                        <div className="text-xs text-[#64FFDA] font-medium mb-2 mt-auto text-center">
                          {botsData[prevBotIndex].botType.toUpperCase()} BOT
                        </div>
                        <p className="text-lg font-bold text-white mb-3 text-center">
                          {botsData[prevBotIndex].title}
                        </p>
                        <div className="text-xs text-white/60 italic truncate flex items-center gap-1 mb-4 px-4">
                          <span className="text-[#64FFDA] font-semibold flex items-center gap-1">
                            <InfoIcon />
                            <span className="flex item-center">Mô tả: </span>
                          </span>
                          {botsData[prevBotIndex].description.find(
                            (d) =>
                              ![
                                "Trạng thái",
                                "Ngày tạo",
                                "Cập nhật",
                                "Loại bot",
                              ].includes(d.label)
                          )?.value ?? ""}
                        </div>
                        <div className="px-4">
                          <div className="text-xs text-white/70 grid grid-cols-[auto_minmax(0,1fr)] gap-x-10 gap-y-1 items-center">
                            <span className="text-[#64FFDA] font-semibold">
                              Trạng thái:
                            </span>
                            <span>
                              {
                                botsData[prevBotIndex].description.find(
                                  (d) => d.label === "Trạng thái"
                                )?.value
                              }
                            </span>
                            <span className="text-[#64FFDA] font-semibold">
                              Ngày tạo:
                            </span>
                            <span>
                              {
                                botsData[prevBotIndex].description.find(
                                  (d) => d.label === "Ngày tạo"
                                )?.value
                              }
                            </span>
                            <span className="text-[#64FFDA] font-semibold">
                              Cập nhật:
                            </span>
                            <span>
                              {
                                botsData[prevBotIndex].description.find(
                                  (d) => d.label === "Cập nhật"
                                )?.value
                              }
                            </span>
                            <span className="text-[#64FFDA] font-semibold">
                              Loại bot:
                            </span>
                            <span>
                              {
                                botsData[prevBotIndex].description.find(
                                  (d) => d.label === "Loại bot"
                                )?.value
                              }
                            </span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-[#64FFDA] to-[#4079ff] text-[#0A192F] px-4 py-2 rounded-full text-sm font-bold self-center my-6 inline-block">
                          {botsData[prevBotIndex].roi}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {/* Active Bot Card */}
                <AnimatePresence mode="wait">
                  {botsData.length > 0 &&
                    botsData[activeBotIndex] &&
                    (() => {
                      const infoFields = botsData[
                        activeBotIndex
                      ].description.filter((d) =>
                        [
                          "Ngày tạo",
                          "Cập nhật",
                          "Trạng thái",
                          "Loại bot",
                        ].includes(d.label)
                      );
                      const descFields = botsData[
                        activeBotIndex
                      ].description.filter(
                        (d) =>
                          ![
                            "Ngày tạo",
                            "Cập nhật",
                            "Trạng thái",
                            "Loại bot",
                          ].includes(d.label)
                      );
                      return (
                        <motion.div
                          key={botsData[activeBotIndex].id}
                          className="w-full md:w-1/2 mx-4 z-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-[#64FFDA] shadow-2xl p-6 flex flex-col h-full cursor-pointer transition-transform duration-200 hover:scale-105"
                            ref={activeCardRef}
                          >
                            {/* Bot Type Tag - Moved below image */}

                            <div className="my-4 h-20 flex items-center justify-center">
                              {/* Placeholder for Chart/Image */}
                              {activeBotIndex % 3 === 0 && (
                                <svg
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 300 100"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M50,80 Q100,40 150,80 Q200,120 250,80"
                                    fill="none"
                                    stroke="#64FFDA"
                                    strokeWidth="3"
                                  />
                                  <circle
                                    cx="100"
                                    cy="50"
                                    r="4"
                                    fill="#64FFDA"
                                  />
                                  <circle
                                    cx="150"
                                    cy="80"
                                    r="4"
                                    fill="#64FFDA"
                                  />
                                  <circle
                                    cx="200"
                                    cy="95"
                                    r="4"
                                    fill="#64FFDA"
                                  />
                                  <circle
                                    cx="50"
                                    cy="80"
                                    r="4"
                                    fill="#64FFDA"
                                  />
                                  <circle
                                    cx="250"
                                    cy="80"
                                    r="4"
                                    fill="#64FFDA"
                                  />
                                  <line
                                    x1="50"
                                    y1="80"
                                    x2="100"
                                    y2="50"
                                    stroke="#98fb98"
                                    strokeWidth="1.5"
                                    strokeDasharray="5,5"
                                  />
                                  <line
                                    x1="100"
                                    y1="50"
                                    x2="150"
                                    y2="80"
                                    stroke="#ff6347"
                                    strokeWidth="1.5"
                                    strokeDasharray="5,5"
                                  />
                                  <line
                                    x1="150"
                                    y1="80"
                                    x2="200"
                                    y2="95"
                                    stroke="#98fb98"
                                    strokeWidth="1.5"
                                    strokeDasharray="5,5"
                                  />
                                  <line
                                    x1="200"
                                    y1="95"
                                    x2="250"
                                    y2="80"
                                    stroke="#ff6347"
                                    strokeWidth="1.5"
                                    strokeDasharray="5,5"
                                  />
                                  {/* Buy/Sell indicators */}
                                  <circle
                                    cx="50"
                                    cy="80"
                                    r="5"
                                    fill="#98fb98"
                                  />{" "}
                                  {/* Example Buy */}
                                  <circle
                                    cx="100"
                                    cy="50"
                                    r="5"
                                    fill="#ff6347"
                                  />{" "}
                                  {/* Example Sell */}
                                  <circle
                                    cx="150"
                                    cy="80"
                                    r="5"
                                    fill="#98fb98"
                                  />{" "}
                                  {/* Example Buy */}
                                  <circle
                                    cx="200"
                                    cy="95"
                                    r="5"
                                    fill="#ff6347"
                                  />{" "}
                                  {/* Example Sell */}
                                  <circle
                                    cx="250"
                                    cy="80"
                                    r="5"
                                    fill="#98fb98"
                                  />{" "}
                                  {/* Example Buy */}
                                  <text
                                    x="60"
                                    y="30"
                                    fill="#98fb98"
                                    fontSize="14"
                                    fontWeight="bold"
                                  >
                                    • Buy
                                  </text>
                                  <text
                                    x="120"
                                    y="30"
                                    fill="#ff6347"
                                    fontSize="14"
                                    fontWeight="bold"
                                  >
                                    • Sell
                                  </text>
                                </svg>
                              )}
                              {activeBotIndex % 3 === 1 && (
                                <svg
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 300 100"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0,80 L50,40 L100,60 L150,20 L200,70 L250,30 L300,50"
                                    fill="none"
                                    stroke="#64FFDA"
                                    strokeWidth="2"
                                  />
                                  <line
                                    x1="50"
                                    y1="40"
                                    x2="0"
                                    y2="80"
                                    stroke="#64FFDA"
                                    strokeWidth="1"
                                    strokeDasharray="5,5"
                                  />
                                  <line
                                    x1="100"
                                    y1="60"
                                    x2="50"
                                    y2="40"
                                    stroke="#64FFDA"
                                    strokeWidth="1"
                                    strokeDasharray="5,5"
                                  />
                                  <line
                                    x1="150"
                                    y1="20"
                                    x2="100"
                                    y2="60"
                                    stroke="#64FFDA"
                                    strokeWidth="1"
                                    strokeDasharray="5,5"
                                  />
                                  <line
                                    x1="200"
                                    y1="70"
                                    x2="150"
                                    y2="20"
                                    stroke="#64FFDA"
                                    strokeWidth="1"
                                    strokeDasharray="5,5"
                                  />
                                  <line
                                    x1="250"
                                    y1="30"
                                    x2="200"
                                    y2="70"
                                    stroke="#64FFDA"
                                    strokeWidth="1"
                                    strokeDasharray="5,5"
                                  />
                                  <line
                                    x1="300"
                                    y1="50"
                                    x2="250"
                                    y2="30"
                                    stroke="#64FFDA"
                                    strokeWidth="1"
                                    strokeDasharray="5,5"
                                  />
                                </svg>
                              )}
                              {activeBotIndex % 3 === 2 && (
                                <svg
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 300 100"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0,80 L50,60 L100,70 L150,50 L200,60 L250,40 L300,50"
                                    fill="none"
                                    stroke="#64FFDA"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="M0,90 L50,70 L100,80 L150,60 L200,70 L250,50 L300,60"
                                    fill="none"
                                    stroke="#4079ff"
                                    strokeWidth="2"
                                  />
                                </svg>
                              )}
                            </div>

                            <div className="text-xs text-[#64FFDA] font-medium mb-2 mt-auto text-center">
                              {botsData[activeBotIndex].botType.toUpperCase()}{" "}
                              BOT
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 text-center">
                              {botsData[activeBotIndex].title}
                            </h3>
                            <div className="mb-4 text-left relative">
                              <div className="text-white/90 text-sm leading-[1.8em] max-h-[3.6em] overflow-hidden">
                                {descFields.length > 0 &&
                                  (() => {
                                    const Icon = descFields[0].icon;
                                    return (
                                      <div className="flex items-start mb-2 truncate">
                                        <span className="mr-2 mt-1 text-[#64FFDA]">
                                          <Icon size={20} />
                                        </span>
                                        <span className="truncate">
                                          <span className="font-semibold text-[#64FFDA]">
                                            {descFields[0].label}:
                                          </span>
                                          <span className="text-white/90">
                                            {" "}
                                            {descFields[0].value}
                                          </span>
                                        </span>
                                      </div>
                                    );
                                  })()}
                              </div>
                            </div>

                            <div className="bg-[#0A192F]/60 rounded-xl p-4 shadow border border-[#233554] grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                              {infoFields.map((item, idx) => {
                                const Icon = item.icon;
                                // Border phải cho cột trái (trừ item cuối nếu lẻ)
                                const isLeftCol =
                                  idx % 2 === 0 &&
                                  idx !== infoFields.length - 1;
                                return (
                                  <div
                                    key={idx}
                                    className={`flex items-center gap-3 p-3 rounded-lg bg-[#112240]/60 hover:bg-[#112240]/80 transition ${
                                      isLeftCol
                                        ? "sm:border-r sm:border-[#233554]"
                                        : ""
                                    }`}
                                  >
                                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#233554]">
                                      <Icon
                                        size={20}
                                        className="text-[#64FFDA]"
                                      />
                                    </span>
                                    <div>
                                      <div className="text-xs text-[#8892B0] font-medium">
                                        {item.label}
                                      </div>
                                      <div className="text-white font-bold text-base">
                                        {item.value}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="bg-gradient-to-r from-[#64FFDA] to-[#4079ff] text-[#0A192F] px-4 py-2 rounded-full text-sm font-bold self-center mb-6">
                              {botsData[activeBotIndex].roi}
                            </div>

                            <div className="mt-auto">
                              <button className="w-full bg-transparent border border-[#64FFDA] text-[#64FFDA] py-3 px-4 rounded-md hover:bg-[#64FFDA]/10 transition-colors text-base font-medium cursor-pointer">
                                Xem chi tiết
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                </AnimatePresence>

                {/* Next Bot Preview (Optional - adjust styling as needed) */}
                {totalBots > 1 && (
                  <motion.div
                    key={botsData[nextBotIndex].id + "next"}
                    className="w-1/4 opacity-50 scale-90 transition-all duration-300 hidden md:block h-[450px]"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 0.5, x: 0, scale: 0.9 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Render a simplified version of the card or just an image/placeholder */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 py-8 text-center cursor-pointer shadow-lg h-full flex flex-col justify-between">
                      <div className="my-2 h-20 flex items-center justify-center opacity-50">
                        {/* Simplified Placeholder for Chart/Image */}
                        {nextBotIndex % 3 === 0 && (
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 300 100"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M50,80 Q100,40 150,80 Q200,120 250,80"
                              fill="none"
                              stroke="#64FFDA"
                              strokeWidth="3"
                            />
                          </svg>
                        )}
                        {nextBotIndex % 3 === 1 && (
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 300 100"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0,80 L50,40 L100,60 L150,20 L200,70 L250,30 L300,50"
                              fill="none"
                              stroke="#64FFDA"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                        {nextBotIndex % 3 === 2 && (
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 300 100"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0,80 L50,60 L100,70 L150,50 L200,60 L250,40 L300,50"
                              fill="none"
                              stroke="#64FFDA"
                              strokeWidth="2"
                            />
                            <path
                              d="M0,90 L50,70 L100,80 L150,60 L200,70 L250,50 L300,60"
                              fill="none"
                              stroke="#4079ff"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="pt-8">
                        <div className="text-xs text-[#64FFDA] font-medium mb-2 mt-auto text-center">
                          {botsData[nextBotIndex].botType.toUpperCase()} BOT
                        </div>
                        <p className="text-lg font-bold text-white mb-3 text-center">
                          {botsData[nextBotIndex].title}
                        </p>
                        <div className="text-xs text-white/60 italic truncate flex items-center gap-1 mb-4 px-4">
                          <span className="text-[#64FFDA] font-semibold flex items-center gap-1">
                            <InfoIcon />
                            <span className="flex item-center">Mô tả: </span>
                          </span>
                          {botsData[nextBotIndex].description.find(
                            (d) =>
                              ![
                                "Trạng thái",
                                "Ngày tạo",
                                "Cập nhật",
                                "Loại bot",
                              ].includes(d.label)
                          )?.value ?? ""}
                        </div>
                        <div className="px-4">
                          <div className="text-xs text-white/70 grid grid-cols-[auto_minmax(0,1fr)] gap-x-10 gap-y-1 items-center">
                            <span className="text-[#64FFDA] font-semibold">
                              Trạng thái:
                            </span>
                            <span>
                              {
                                botsData[nextBotIndex].description.find(
                                  (d) => d.label === "Trạng thái"
                                )?.value
                              }
                            </span>
                            <span className="text-[#64FFDA] font-semibold">
                              Ngày tạo:
                            </span>
                            <span>
                              {
                                botsData[nextBotIndex].description.find(
                                  (d) => d.label === "Ngày tạo"
                                )?.value
                              }
                            </span>
                            <span className="text-[#64FFDA] font-semibold">
                              Cập nhật:
                            </span>
                            <span>
                              {
                                botsData[nextBotIndex].description.find(
                                  (d) => d.label === "Cập nhật"
                                )?.value
                              }
                            </span>
                            <span className="text-[#64FFDA] font-semibold">
                              Loại bot:
                            </span>
                            <span>
                              {
                                botsData[nextBotIndex].description.find(
                                  (d) => d.label === "Loại bot"
                                )?.value
                              }
                            </span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-[#64FFDA] to-[#4079ff] text-[#0A192F] px-4 py-2 rounded-full text-sm font-bold self-center my-6 inline-block">
                          {botsData[nextBotIndex].roi}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation buttons */}
                {totalBots > 1 && (
                  <>
                    <button
                      onClick={prevBot}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0A192F] rounded-full flex items-center justify-center border border-[#233554] hover:shadow-[0_0_16px_4px_#64FFDA88] hover:border-[#64FFDA] transition-colors text-[#64FFDA] z-20 shadow-lg cursor-pointer"
                      aria-label="Previous Bot"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    <button
                      onClick={nextBot}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0A192F] rounded-full flex items-center justify-center border border-[#233554] hover:shadow-[0_0_16px_4px_#64FFDA88] hover:border-[#64FFDA] transition-colors text-[#64FFDA] z-20 shadow-lg cursor-pointer"
                      aria-label="Next Bot"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            ) : (
              // Data loaded but no bots available
              <div className="text-center py-20 w-full">
                <p className="mt-4 text-[#8892B0]">
                  Không có bot nào được tìm thấy.
                </p>
              </div>
            )}
          </div>

          {/* Simple dots indicator */}
          {totalBots > 0 && botsData.length > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              {botsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveBotIndex(index)}
                  className={`transition-all duration-300 ${
                    activeBotIndex === index
                      ? "w-3 h-3 bg-[#64FFDA] rounded-full shadow-[0_0_8px_2px_#64FFDA88]"
                      : "w-2 h-2 bg-[#233554] hover:bg-[#64FFDA]/50 rounded-full"
                  }`}
                  aria-label={`Go to bot ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View all bots button */}
        <div className="text-center mt-8">
          <button className="inline-flex items-center justify-center bg-[#64FFDA] hover:bg-[#4CD2A9] text-[#0A192F] font-bold px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-lg">
            Xem tất cả {botsData.length} bot
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </section>
      {/* How It Works Section (Stepper) */}
      <section className="py-16 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full border border-[#64FFDA]/70 bg-[#0A1529] shadow-lg px-5 py-2 mb-4 text-[#64FFDA] font-medium tracking-wide text-lg">
              QUY TRÌNH
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Cách sử dụng <span className="text-[#64FFDA]">Bot phái sinh</span>
            </h2>
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Connecting Line - Behind all steps */}
            <div className="hidden md:block absolute top-10 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-1 z-0">
              <svg
                width="100%"
                height="4"
                viewBox="0 0 800 4"
                className="w-full"
              >
                <defs>
                  <linearGradient
                    id="stepper-line-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#64FFDA" stopOpacity="0.3">
                      <animate
                        attributeName="stop-opacity"
                        values="0.3;0.8;0.3"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#4079ff" stopOpacity="0.6">
                      <animate
                        attributeName="stop-opacity"
                        values="0.6;1;0.6"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#64FFDA" stopOpacity="0.3">
                      <animate
                        attributeName="stop-opacity"
                        values="0.3;0.8;0.3"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>

                  {/* Animated dots */}
                  <circle id="moving-dot" r="2" fill="#64FFDA" opacity="0.8">
                    <animateMotion dur="4s" repeatCount="indefinite">
                      <mpath href="#connection-path" />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      values="0.8;0.3;0.8"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </defs>

                {/* Main connection path */}
                <path
                  id="connection-path"
                  d="M 50 2 Q 200 2 350 2 Q 450 2 600 2 Q 750 2 750 2"
                  stroke="url(#stepper-line-gradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Moving dot */}
                <use href="#moving-dot" />
              </svg>
            </div>

            {howItWorks.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center flex-1 relative z-10 max-w-xs"
              >
                {/* Step Circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-[#1e293b] to-[#233554] border-2 border-[#64FFDA]/60 shadow-[0_4px_20px_0_#64FFDA33] relative transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_30px_0_#64FFDA44]">
                    {/* Pulse animation ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#64FFDA]/30 animate-ping"></div>

                    <span
                      className="text-3xl md:text-4xl font-extrabold font-heading text-[#64FFDA] relative z-10"
                      style={{
                        letterSpacing: "0.01em",
                      }}
                    >
                      {step.step}
                    </span>
                  </div>

                  {/* Decorative elements around circle */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#64FFDA] rounded-full opacity-60 animate-pulse"></div>
                  <div
                    className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#4079ff] rounded-full opacity-40 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-3 text-[#64FFDA]">
                    {step.title}
                  </h3>
                  <p className="text-[#b6c6e3] text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Mobile connector (vertical) */}
                {i < howItWorks.length - 1 && (
                  <div className="md:hidden mt-6 mb-2 flex flex-col items-center">
                    <div className="w-px h-8 bg-gradient-to-b from-[#64FFDA]/60 to-[#4079ff]/40 relative">
                      <div className="absolute top-0 w-px h-full bg-gradient-to-b from-[#64FFDA] to-transparent opacity-50 animate-pulse"></div>
                    </div>
                    <div
                      className="w-2 h-2 bg-[#64FFDA] rounded-full opacity-70 animate-bounce"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section (slider 3D depth) */}
      <section className="py-16 px-4 md:px-0">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full border border-[#64FFDA]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-4 text-[#64FFDA] font-medium tracking-wide text-lg">
              PHẢN HỒI KHÁCH HÀNG
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Khách hàng nói gì về{" "}
              <span className="text-[#64FFDA]">Bot phái sinh</span>
            </h2>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevTestimonial}
              aria-label="Trước"
              className="w-12 h-12 rounded-full flex items-center justify-center border border-[#233554] hover:border-[#64FFDA] text-[#64FFDA] bg-[#0A192F] transition-colors cursor-pointer text-2xl"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="flex-1 relative min-h-[220px] flex items-center justify-center">
              {/* 3D Layered Testimonials */}
              <AnimatePresence initial={false} custom={activeTestimonial}>
                {[...Array(3)].map((_, idx) => {
                  // idx: 0 = prev, 1 = active, 2 = next
                  let tIndex: number;
                  if (idx === 0)
                    tIndex =
                      (activeTestimonial - 1 + safeTestimonials.length) %
                      safeTestimonials.length;
                  else if (idx === 1)
                    tIndex = activeTestimonial % safeTestimonials.length;
                  else if (idx === 2)
                    tIndex = (activeTestimonial + 1) % safeTestimonials.length;
                  else tIndex = activeTestimonial % safeTestimonials.length;
                  // Layer style
                  const isActive = idx === 1;
                  const z = isActive ? 30 : idx === 0 ? 20 : 10;
                  const scale = isActive ? 1 : idx === 0 ? 0.95 : 0.9;
                  const opacity = isActive ? 1 : idx === 0 ? 0.5 : 0.3;
                  const translateY = isActive ? 0 : idx === 0 ? -20 : -40;
                  const border = isActive
                    ? "border-[#64FFDA]"
                    : "border-[#64FFDA]/30";
                  return (
                    <motion.div
                      key={tIndex + "-" + activeTestimonial}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: -40,
                        zIndex: z,
                      }}
                      animate={{
                        opacity,
                        scale,
                        y: translateY,
                        zIndex: z,
                        filter: isActive
                          ? "brightness(1.1)"
                          : "brightness(0.9)",
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        y: -40,
                        zIndex: z,
                      }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className={`absolute left-0 right-0 mx-auto bg-[#101828] rounded-2xl border-2 ${border} shadow-xl px-8 py-10 flex flex-col items-start justify-center min-h-[220px] max-w-full pointer-events-none select-none`}
                      style={{ zIndex: z }}
                    >
                      <p className="text-2xl md:text-2xl text-[#e0e6f7] font-semibold italic mb-6 leading-relaxed">
                        "{safeTestimonials[tIndex].quote}"
                      </p>
                      <div className="flex items-center gap-3 mt-auto">
                        <img
                          src={safeTestimonials[tIndex].avatar}
                          alt={safeTestimonials[tIndex].name}
                          className="w-10 h-10 rounded-full border-2 border-[#64FFDA]"
                        />
                        <div>
                          <div className="text-white font-bold">
                            {safeTestimonials[tIndex].name}
                          </div>
                          {safeTestimonials[tIndex].role && (
                            <div className="text-[#8892B0] text-sm">
                              {safeTestimonials[tIndex].role}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            <button
              onClick={handleNextTestimonial}
              aria-label="Sau"
              className="w-12 h-12 rounded-full flex items-center justify-center border border-[#233554] hover:border-[#64FFDA] text-[#64FFDA] bg-[#0A192F] transition-colors cursor-pointer text-2xl"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="w-full bg-gradient-to-b from-[#0A192F] via-[#3730a3] to-[#b6a8e8] px-4 py-14 flex flex-col items-center rounded-b-[80px] shadow-2xl shadow-[#3730a3]/40 brightness-110 overflow-visible">
        <h2 className="text-[#64FFDA] text-3xl md:text-4xl font-bold mb-4 leading-tight text-center">
          Sẵn sàng trải nghiệm các bot giao dịch hiện đại?
          <br />
          Đột phá cùng TOGOGO ngay hôm nay
        </h2>
        <p className="text-white/90 text-lg leading-relaxed mb-8 text-center">
          Đăng ký để khám phá sức mạnh của AI và tự động hóa giao dịch.
          <br />
          Tối ưu lợi nhuận, giảm rủi ro, nâng tầm chiến lược đầu tư của bạn.
        </p>
        <div className="flex justify-center">
          <ShinyButton
            onClick={() => (window.location.href = "/dangnhap?panel=register")}
            className="bg-[#64FFDA] hover:bg-[#4CD2A9] text-[#0A192F] font-bold px-10 py-4 rounded-full text-xl cursor-pointer shadow-xl whitespace-nowrap"
          >
            Đăng ký ngay
          </ShinyButton>
        </div>
      </section>
    </div>
  );
}
