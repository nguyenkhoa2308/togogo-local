"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// SVG Icons Components
const TrendingUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
    />
  </svg>
);

const TrendingDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6L9 12.75l4.306-4.307a11.95 11.95 0 015.814 5.519l2.74 1.22m0 0l5.94 2.28m-5.94-2.28l-2.28-5.941"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
    />
  </svg>
);

const GridIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
    />
  </svg>
);

const TrophyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
    />
  </svg>
);

// Định nghĩa kiểu dữ liệu chi tiết
interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  comments: number;
  hashtags: string[];
  views: number;
  category: "Crypto" | "Chứng khoán" | "Startup" | "Đầu tư";
  sentiment: "positive" | "negative" | "neutral";
  readTime: number;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
}

// Thêm nhiều bài viết mới
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Chiến lược đầu tư thông minh trong thị trường crypto biến động",
    description:
      "Phân tích chuyên sâu về cách điều chỉnh danh mục đầu tư crypto trong giai đoạn không ổn định.",
    image: "/images/blog/crypto-investment.jpg",
    date: "2024-05-17",
    comments: 12,
    hashtags: ["#Crypto", "#Đầu tư", "#Phân tích"],
    views: 1245,
    category: "Crypto",
    sentiment: "neutral",
    readTime: 5,
    author: {
      name: "Minh Tuấn",
      avatar: "/images/authors/minh-tuan.jpg",
      title: "Chuyên gia phân tích tài chính",
    },
  },
  {
    id: 2,
    title: "Startup công nghệ: Xu hướng đầu tư hứa hẹn năm 2024",
    description:
      "Khám phá các lĩnh vực startup đang thu hút sự chú ý của các nhà đầu tư mạo hiểm.",
    image: "/images/blog/startup-trends.jpg",
    date: "2024-05-16",
    comments: 8,
    hashtags: ["#Startup", "#Đổi mới", "#Công nghệ"],
    views: 876,
    category: "Startup",
    sentiment: "positive",
    readTime: 7,
    author: {
      name: "Hương Linh",
      avatar: "/images/authors/huong-linh.jpg",
      title: "Nhà phân tích startup",
    },
  },
  {
    id: 3,
    title: "Phân tích kỹ thuật: Các mẫu hình chart quan trọng trong giao dịch",
    description:
      "Tìm hiểu về các mẫu hình chart phổ biến và cách áp dụng chúng trong giao dịch chứng khoán.",
    image: "/images/blog/technical-analysis.jpg",
    date: "2024-05-15",
    comments: 15,
    hashtags: ["#Chứng khoán", "#Phân tích kỹ thuật", "#Giao dịch"],
    views: 2341,
    category: "Chứng khoán",
    sentiment: "positive",
    readTime: 8,
    author: {
      name: "Trần Văn An",
      avatar: "/images/authors/tran-van-an.jpg",
      title: "Chuyên gia phân tích kỹ thuật",
    },
  },
  {
    id: 4,
    title: "Rủi ro và cơ hội trong đầu tư bất động sản 2024",
    description:
      "Đánh giá toàn diện về thị trường bất động sản và các chiến lược đầu tư hiệu quả.",
    image: "/images/blog/real-estate.jpg",
    date: "2024-05-14",
    comments: 23,
    hashtags: ["#Bất động sản", "#Đầu tư", "#Phân tích"],
    views: 3456,
    category: "Đầu tư",
    sentiment: "neutral",
    readTime: 10,
    author: {
      name: "Nguyễn Thị Hà",
      avatar: "/images/authors/nguyen-thi-ha.jpg",
      title: "Chuyên gia bất động sản",
    },
  },
  {
    id: 5,
    title: "DeFi: Tương lai của tài chính phi tập trung",
    description:
      "Khám phá các xu hướng mới trong DeFi và tác động của chúng đến hệ thống tài chính truyền thống.",
    image: "/images/blog/defi.jpg",
    date: "2024-05-13",
    comments: 18,
    hashtags: ["#DeFi", "#Crypto", "#Blockchain"],
    views: 1890,
    category: "Crypto",
    sentiment: "positive",
    readTime: 6,
    author: {
      name: "Lê Minh Hoàng",
      avatar: "/images/authors/le-minh-hoang.jpg",
      title: "Chuyên gia DeFi",
    },
  },
  {
    id: 6,
    title: "Chiến lược quản lý rủi ro trong đầu tư",
    description:
      "Hướng dẫn chi tiết về cách xây dựng và thực hiện chiến lược quản lý rủi ro hiệu quả.",
    image: "/images/blog/risk-management.jpg",
    date: "2024-05-12",
    comments: 14,
    hashtags: ["#Quản lý rủi ro", "#Đầu tư", "#Chiến lược"],
    views: 1567,
    category: "Đầu tư",
    sentiment: "neutral",
    readTime: 9,
    author: {
      name: "Phạm Văn Bình",
      avatar: "/images/authors/pham-van-binh.jpg",
      title: "Chuyên gia quản lý rủi ro",
    },
  },
  {
    id: 7,
    title: "Công nghệ AI trong phân tích tài chính",
    description:
      "Tìm hiểu về cách AI đang thay đổi ngành tài chính và tạo ra cơ hội mới cho nhà đầu tư.",
    image: "/images/blog/ai-finance.jpg",
    date: "2024-05-11",
    comments: 20,
    hashtags: ["#AI", "#Công nghệ", "#Tài chính"],
    views: 2789,
    category: "Startup",
    sentiment: "positive",
    readTime: 7,
    author: {
      name: "Đỗ Thị Lan",
      avatar: "/images/authors/do-thi-lan.jpg",
      title: "Chuyên gia AI & Tài chính",
    },
  },
  {
    id: 8,
    title: "Thị trường chứng khoán: Dự báo xu hướng Q2/2024",
    description:
      "Phân tích và dự báo xu hướng thị trường chứng khoán trong quý 2 năm 2024.",
    image: "/images/blog/stock-market.jpg",
    date: "2024-05-10",
    comments: 16,
    hashtags: ["#Chứng khoán", "#Phân tích", "#Dự báo"],
    views: 1987,
    category: "Chứng khoán",
    sentiment: "neutral",
    readTime: 8,
    author: {
      name: "Vũ Minh Tuấn",
      avatar: "/images/authors/vu-minh-tuan.jpg",
      title: "Chuyên gia phân tích thị trường",
    },
  },
  {
    id: 9,
    title: "NFT và tương lai của sở hữu trí tuệ số",
    description:
      "Khám phá tiềm năng của NFT trong việc thay đổi cách chúng ta sở hữu và giao dịch tài sản số.",
    image: "/images/blog/nft.jpg",
    date: "2024-05-09",
    comments: 25,
    hashtags: ["#NFT", "#Crypto", "#Blockchain"],
    views: 3123,
    category: "Crypto",
    sentiment: "positive",
    readTime: 6,
    author: {
      name: "Trần Thị Mai",
      avatar: "/images/authors/tran-thi-mai.jpg",
      title: "Chuyên gia NFT & Blockchain",
    },
  },
];

// Thêm hiệu ứng gradient animation
const GradientBackground = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
  </div>
);

// Thêm hiệu ứng particle
const ParticleEffect = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
        animate={{
          x: [0, Math.random() * 1000 - 500],
          y: [0, Math.random() * 1000 - 500],
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);

// Cập nhật CategoryBadge với hiệu ứng mới
const CategoryBadge = ({
  category,
  sentiment,
}: {
  category: string;
  sentiment: string;
}) => {
  const getColor = () => {
    switch (sentiment) {
      case "positive":
        return "bg-gradient-to-r from-green-400 to-emerald-500 text-white";
      case "negative":
        return "bg-gradient-to-r from-red-400 to-rose-500 text-white";
      default:
        return "bg-gradient-to-r from-blue-400 to-indigo-500 text-white";
    }
  };

  return (
    <motion.span
      whileHover={{ scale: 1.1, rotate: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`px-3 py-1 rounded-full text-xs font-semibold ${getColor()} shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      {category}
    </motion.span>
  );
};

const AuthorInfo = ({ author }: { author: BlogPost["author"] }) => (
  <div className="flex items-center space-x-3">
    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
      <Image
        src={author.avatar}
        alt={author.name}
        fill
        className="object-cover"
      />
    </div>
    <div>
      <p className="font-semibold text-sm text-gray-800">{author.name}</p>
      <p className="text-xs text-gray-500">{author.title}</p>
    </div>
  </div>
);

// Thêm component Modal
const ReportModal = ({
  post,
  onClose,
}: {
  post: BlogPost;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-64 w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
            <div className="flex items-center space-x-4">
              <AuthorInfo author={post.author} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <CategoryBadge
                category={post.category}
                sentiment={post.sentiment}
              />
              <span className="text-gray-500">{post.date}</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex items-center">
                <EyeIcon />
                <span className="ml-1">{post.views} lượt xem</span>
              </div>
              <div className="flex items-center">
                <ChatIcon />
                <span className="ml-1">{post.comments} bình luận</span>
              </div>
              <div className="flex items-center text-yellow-600">
                <TrophyIcon />
                <span className="ml-1">{post.readTime} phút đọc</span>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">{post.description}</p>

            {/* Thêm nội dung chi tiết giả lập */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Phân tích chi tiết
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <h3 className="text-xl font-semibold text-gray-900">Kết luận</h3>
              <p className="text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>

            {/* Hashtags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Cập nhật BlogPostCard với hiệu ứng mới
const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [showReport, setShowReport] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sentimentConfig = {
    positive: {
      icon: <TrendingUpIcon />,
      bgClass: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      hoverBorderColor: "group-hover:border-green-400",
      glowColor: "group-hover:shadow-green-200",
    },
    negative: {
      icon: <TrendingDownIcon />,
      bgClass: "bg-gradient-to-br from-red-50 to-rose-50",
      borderColor: "border-red-200",
      hoverBorderColor: "group-hover:border-red-400",
      glowColor: "group-hover:shadow-red-200",
    },
    neutral: {
      icon: <GridIcon />,
      bgClass: "bg-gradient-to-br from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      hoverBorderColor: "group-hover:border-blue-400",
      glowColor: "group-hover:shadow-blue-200",
    },
  };

  const { icon, bgClass, borderColor, hoverBorderColor, glowColor } =
    sentimentConfig[post.sentiment];

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className={`${bgClass} rounded-2xl shadow-lg overflow-hidden flex flex-col h-full relative group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${borderColor} ${hoverBorderColor} ${glowColor}`}
        onClick={() => setShowReport(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hình ảnh bài viết với overlay gradient */}
        <div className="relative h-56 w-full overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
          />

          {/* Thẻ danh mục và sentiment */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <CategoryBadge
                category={post.category}
                sentiment={post.sentiment}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded-full bg-white/90 shadow-sm backdrop-blur-sm"
            >
              {icon}
            </motion.div>
          </div>
        </div>

        {/* Nội dung bài viết */}
        <div className="p-6 flex flex-col flex-grow">
          <motion.h2
            whileHover={{ scale: 1.02 }}
            className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors"
          >
            <Link href={`/blog/${post.id}`} className="hover:underline">
              {post.title}
            </Link>
          </motion.h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.description}
          </p>

          {/* Thông tin tác giả */}
          <motion.div whileHover={{ scale: 1.02 }} className="mb-4">
            <AuthorInfo author={post.author} />
          </motion.div>

          {/* Thống kê bài viết */}
          <div className="flex items-center text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center mr-4 hover:text-blue-600 transition-colors"
            >
              <EyeIcon />
              <span className="ml-1">{post.views}</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center mr-4 hover:text-blue-600 transition-colors"
            >
              <ChatIcon />
              <span className="ml-1">{post.comments}</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center ml-auto text-yellow-600"
            >
              <TrophyIcon />
              <span className="ml-1">{post.readTime} phút đọc</span>
            </motion.div>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {showReport && (
          <ReportModal post={post} onClose={() => setShowReport(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// Đơn giản hóa Header cho blog
const BlogHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
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
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/blog" className="text-gray-600 hover:text-blue-600">
              Trang chủ
            </Link>
            <Link
              href="/blog/categories"
              className="text-gray-600 hover:text-blue-600"
            >
              Danh mục
            </Link>
            <Link
              href="/blog/authors"
              className="text-gray-600 hover:text-blue-600"
            >
              Tác giả
            </Link>
            <Link
              href="/blog/about"
              className="text-gray-600 hover:text-blue-600"
            >
              Giới thiệu
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-48 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Đơn giản hóa Footer cho blog
const BlogFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
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
            <p className="text-gray-600 text-sm">
              Nền tảng chia sẻ kiến thức tài chính và đầu tư hàng đầu Việt Nam
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog/categories"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Danh mục
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/authors"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Tác giả
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/about"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Đăng ký nhận tin
            </h3>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Đăng ký
              </button>
            </form>
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

// Trang Blog chính
const ProfessionalFinanceBlog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Danh mục để lọc
  const categories = [
    { name: "Crypto", icon: <GlobeIcon /> },
    { name: "Chứng khoán", icon: <GridIcon /> },
    { name: "Startup", icon: <TrophyIcon /> },
    { name: "Đầu tư", icon: <TrendingUpIcon /> },
  ];

  // Lọc và tìm kiếm bài viết
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(
      (post) =>
        (selectedCategory ? post.category === selectedCategory : true) &&
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, selectedCategory]);

  return (
    <div className="font-sans antialiased text-gray-800">
      {/* <BlogHeader /> */}
      {/* GradientBackground và ParticleEffect có thể được giữ lại hoặc tùy chỉnh */}
      {/* <GradientBackground /> */}
      {/* <ParticleEffect /> */}

      <div className="container mx-auto px-4 py-8 z-10 relative">
        {/* Hero Section */}
        {/* <section className="mb-12 text-center"> */}
        {/*   <h1 className="text-4xl font-bold text-gray-900 mb-4">Togogo Blog</h1> */}
        {/*   <p className="text-xl text-gray-700">Chia sẻ kiến thức và phân tích chuyên sâu về tài chính, đầu tư và công nghệ.</p> */}
        {/* </section> */}

        {/* Main content with padding for fixed header */}
        <div className="pt-16">
          {/* Banner chuyên nghiệp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-[500px] overflow-hidden"
          >
            <Image
              src="/images/blog/finance-banner.jpg"
              alt="Finance Blog Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-600/90">
              <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <Link
                      href="/"
                      className="text-3xl font-bold text-white hover:text-blue-200 transition-colors"
                    >
                      togogo Blog
                    </Link>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
                  >
                    Insights Tài Chính Chuyên Sâu
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-white/90 mb-8 leading-relaxed"
                  >
                    Khám phá các phân tích, xu hướng và chiến lược đầu tư tiên
                    phong từ những chuyên gia hàng đầu trong lĩnh vực tài chính
                    và công nghệ.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex space-x-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      Khám phá ngay
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                    >
                      Tìm hiểu thêm
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Nội dung chính */}
          <div className="container mx-auto px-4 py-12">
            {/* Thanh tìm kiếm và lọc */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Ô tìm kiếm */}
                <div className="relative w-full md:w-2/5">
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                  </div>
                </div>

                {/* Nút lọc danh mục */}
                <div className="flex flex-wrap items-center gap-2">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.name}
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === cat.name ? null : cat.name
                        )
                      }
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all duration-300 backdrop-blur-sm
                       ${
                         selectedCategory === cat.name
                           ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                           : "bg-white/80 text-gray-700 hover:bg-white/90 border border-gray-200"
                       }`}
                    >
                      {cat.icon}
                      <span>{cat.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Lưới bài viết */}
            <AnimatePresence>
              {filteredPosts.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delayChildren: 0.2,
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-2xl font-semibold text-gray-700 mb-2">
                    Không tìm thấy bài viết
                  </p>
                  <p className="text-gray-500">
                    Hãy thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc của bạn
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Đảm bảo BlogPage chỉ render ProfessionalFinanceBlog
export default function BlogPage() {
  return <ProfessionalFinanceBlog />;
}
