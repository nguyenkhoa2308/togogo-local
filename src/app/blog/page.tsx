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

const HeartIcon = () => (
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
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
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
  category: "Crypto" | "Chứng khoán" | "Startup" | "Đầu tư" | "AI" | "Trading";
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
    title: "Meet Titan: Your AI Trading Assistant is Now Live on Titan",
    description:
      "Giới thiệu về trợ lý giao dịch AI mới của nền tảng Titan Trading.",
    image: "/images/blog/ai-assistant.jpg",
    date: "2024-05-17",
    comments: 0,
    hashtags: ["#AI", "#Trading", "#TitanTradingPlatform"],
    views: 722,
    category: "AI",
    sentiment: "positive",
    readTime: 5,
    author: {
      name: "Titan Team",
      avatar: "/images/authors/titan-team.jpg",
      title: "Titan Official",
    },
  },
  {
    id: 2,
    title: "Titan Trading Platform's New Function: Fail-Safe Mode is LIVE",
    description:
      "Tính năng mới nhất từ Titan Trading Platform giúp bảo vệ tài khoản của bạn.",
    image: "/images/blog/fail-safe-mode.jpg",
    date: "2024-05-16",
    comments: 0,
    hashtags: ["#FailSafe", "#TitanTrading", "#Security"],
    views: 464,
    category: "Trading",
    sentiment: "positive",
    readTime: 6,
    author: {
      name: "Titan Team",
      avatar: "/images/authors/titan-team.jpg",
      title: "Titan Official",
    },
  },
  {
    id: 3,
    title:
      "Decentralization vs. scalability: The blockchain trilemma explained",
    description:
      "Phân tích sâu về mối quan hệ giữa phân cấp, khả năng mở rộng và bảo mật trong blockchain.",
    image: "/images/blog/blockchain-trilemma.jpg",
    date: "2024-05-15",
    comments: 0,
    hashtags: ["#Blockchain", "#Scalability", "#Decentralization"],
    views: 291,
    category: "Crypto",
    sentiment: "neutral",
    readTime: 8,
    author: {
      name: "Blockchain Expert",
      avatar: "/images/authors/blockchain-expert.jpg",
      title: "Technical Analyst",
    },
  },
  {
    id: 4,
    title: "How to create API on Binance Account | Titan Guide",
    description:
      "Hướng dẫn chi tiết cách tạo API trên tài khoản Binance để kết nối với Titan Platform.",
    image: "/images/blog/binance-api.jpg",
    date: "2024-05-14",
    comments: 0,
    hashtags: ["#Binance", "#API", "#TitanGuide"],
    views: 325,
    category: "Trading",
    sentiment: "positive",
    readTime: 10,
    author: {
      name: "Titan Support",
      avatar: "/images/authors/titan-support.jpg",
      title: "Technical Support",
    },
  },
  {
    id: 5,
    title: "How to create API on BingX Account",
    description:
      "Hướng dẫn từng bước để tạo API trên tài khoản BingX và sử dụng với Titan.",
    image: "/images/blog/bingx-api.jpg",
    date: "2024-05-13",
    comments: 0,
    hashtags: ["#BingX", "#API", "#TitanGuide"],
    views: 245,
    category: "Trading",
    sentiment: "positive",
    readTime: 7,
    author: {
      name: "Titan Support",
      avatar: "/images/authors/titan-support.jpg",
      title: "Technical Support",
    },
  },
  {
    id: 6,
    title: "How to Create API on Bybit Account",
    description:
      "Hướng dẫn đầy đủ để tạo và cấu hình API trên tài khoản Bybit để giao dịch tự động.",
    image: "/images/blog/bybit-api.jpg",
    date: "2024-05-12",
    comments: 0,
    hashtags: ["#Bybit", "#API", "#TitanGuide"],
    views: 198,
    category: "Trading",
    sentiment: "positive",
    readTime: 9,
    author: {
      name: "Titan Support",
      avatar: "/images/authors/titan-support.jpg",
      title: "Technical Support",
    },
  },
];

// Dữ liệu video
const videoTutorials = [
  {
    id: 1,
    title: "How to create API on Binance Account | Titan Guide",
    thumbnail: "/images/tutorials/binance-api.jpg",
    date: "07/04/2025",
    category: "Tutorial",
  },
  {
    id: 2,
    title: "How to create API on BingX Account",
    thumbnail: "/images/tutorials/bingx-api.jpg",
    date: "09/04/2025",
    category: "Tutorial",
  },
  {
    id: 3,
    title: "How to Create API on Bybit Account",
    thumbnail: "/images/tutorials/bybit-api.jpg",
    date: "10/5/2025",
    category: "Tutorial",
  },
];

// Danh sách tag phổ biến
const popularTags = [
  "titan",
  "titantradingplatform",
  "live",
  "decentralization",
  "scalability",
  "blockchain",
  "security",
  "AI",
  "trading",
  "cryptocurrency",
  "binance",
  "bingx",
  "bybit",
];
// Tag component mới theo style Titan
const Tag = ({ text }: { text: string }) => (
  <span className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
    {text}
  </span>
);

// Section Header với icon
const SectionHeader = ({
  title,
  viewAllLink,
}: {
  title: string;
  viewAllLink: string;
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <span className="text-purple-600">
          <HeartIcon />
        </span>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <Link
        href={viewAllLink}
        className="text-sm text-white bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded-md"
      >
        More articles
      </Link>
    </div>
  );
};

// Thiết kế lại blog post card theo style Titan
const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform hover:scale-110 duration-500"
        />
        {post.category === "Trading" && (
          <div className="absolute top-3 left-3">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              titantradinglplatform
            </span>
          </div>
        )}
        {post.category === "AI" && (
          <div className="absolute top-3 left-3 flex space-x-1">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              AI
            </span>
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              titan
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </h3>

        <div className="flex items-center text-sm text-gray-500 mt-3">
          <div className="flex items-center mr-4">
            <EyeIcon />
            <span className="ml-1">{post.views}</span>
          </div>
          <div className="flex items-center mr-4">
            <HeartIcon />
            <span className="ml-1">0</span>
          </div>
          <div className="flex items-center">
            <ChatIcon />
            <span className="ml-1">{post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Video card component mới theo style Titan
const VideoCard: React.FC<{ video: any }> = ({ video }) => {
  return (
    <div className="relative group">
      <div className="relative h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="bg-red-600 rounded-full p-2 hover:bg-red-700 transition-colors">
            <PlayIcon />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-base font-medium text-gray-800">{video.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{video.date}</p>
      </div>
    </div>
  );
};

// Banner chính theo style Titan
const MainBanner = () => {
  return (
    <div className="relative w-full py-4 overflow-hidden">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl overflow-hidden relative h-48">
          <div className="absolute inset-0 flex items-center justify-between px-8">
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold text-white mb-4">
                Earn profits with one clicks
              </h2>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2 rounded-lg transition">
                BUY NOW!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Featured section component
const FeaturedSection = () => {
  // Featured posts selection - we'll use the first 3 posts
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader title="Featured" viewAllLink="/featured" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

// News section component
const NewsSection = () => {
  // Select remaining posts for news
  const newsPosts = blogPosts.slice(3, 6);

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader title="News" viewAllLink="/news" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Video section
const VideoSection = () => {
  return (
    <section className="py-8 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-purple-500">
              <HeartIcon />
            </span>
            <h2 className="text-xl font-bold text-white">Video</h2>
          </div>
          <Link
            href="/videos"
            className="text-sm text-white bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded-md"
          >
            More videos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videoTutorials.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter subscription component
const SubscriptionSection = () => {
  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Sign up for our newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Stay updated with the latest news and announcements
            </p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-md text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
// Trang Blog chính
const ProfessionalFinanceBlog = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Main banner */}
      <MainBanner />

      {/* Featured section */}
      <FeaturedSection />

      {/* News section */}
      <NewsSection />

      {/* Video section */}
      <VideoSection />

      {/* Subscription section */}
      <SubscriptionSection />
    </div>
  );
};

// Trang chính sử dụng layout mới
export default function BlogPage() {
  return <ProfessionalFinanceBlog />;
}
