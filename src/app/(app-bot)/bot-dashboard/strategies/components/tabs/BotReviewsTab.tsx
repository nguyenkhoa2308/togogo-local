// BotReviews.tsx - React + Tailwind (No UI library, no sonner)
import { useState } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Search,
  Users,
  Eye,
  ChevronUp,
  ChevronDown,
  Flag,
  Share2,
  TrendingUp,
  MessageSquare,
  Award,
  Calendar,
  BookOpen,
  BookText,
  Activity,
  Grid3x3,
  List,
} from "lucide-react";

type Bot = {
  name: string;
  status: "Đang test" | "Đang dùng" | "Đã dùng";
  author: string;
  period: string;
  pnl: string;
  pnlPercent: string;
  trades: number;
  winRate: string;
  rating: number;
  comment?: string;
};

export default function BotReviewsTab() {
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewDialog, setReviewDialog] = useState(false);
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const [userRating, setUserRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(
    new Set()
  );
  const [tab, setTab] = useState<"myreviews" | "community">("myreviews");

  //   const card

  const userBotMetrics = [
    {
      label: "Bot đã sử dụng",
      value: 8,
      subtext: "Có thể đánh giá",
      icon: BookText,
      color: "text-[#00e5a1]",
    },
    {
      label: "Đánh giá TB",
      value: 3.4,
      subtext: "Của bạn",
      icon: Star,
      color: "text-yellow-500",
    },
    {
      label: "Sẽ giới thiệu",
      value: 4,
      subtext: "Bot recommend",
      icon: ThumbsUp,
      color: "text-cyan-300",
    },
    {
      label: "Đang sử dụng",
      value: 2,
      subtext: "Bot active",
      icon: Activity,
      color: "text-blue-500",
    },
  ];

  // Available bots for review
  const availableBots = [
    {
      id: "vn30-momentum-pro",
      name: "VN30-MOMENTUM-PRO",
      owner: "TradeMaster",
      category: "Momentum",
      description:
        "Bot chuyên giao dịch momentum trên VN30F với thuật toán AI tiên tiến",
      avgRating: 4.8,
      totalReviews: 156,
      monthlyFee: 200000,
      minCapital: 50000000,
      avgReturn: "+18.7%",
      winRate: 84.8,
      maxDrawdown: "-2.1%",
      activeTrades: 2340,
      followers: 891,
      verified: true,
      trending: true,
      tags: ["AI", "VN30F", "High Performance"],
      ratingDistribution: { 5: 89, 4: 45, 3: 15, 2: 5, 1: 2 },
    },
    {
      id: "hnx30-arbitrage-v2",
      name: "HNX30-ARBITRAGE-V2",
      owner: "AlgoTrader",
      category: "Arbitrage",
      description: "Chiến lược arbitrage thông minh cho HNX30F với rủi ro thấp",
      avgRating: 4.5,
      totalReviews: 89,
      monthlyFee: 150000,
      minCapital: 30000000,
      avgReturn: "+12.3%",
      winRate: 79.2,
      maxDrawdown: "-1.8%",
      activeTrades: 1567,
      followers: 423,
      verified: true,
      trending: false,
      tags: ["Arbitrage", "HNX30F", "Low Risk"],
      ratingDistribution: { 5: 54, 4: 25, 3: 8, 2: 2, 1: 0 },
    },
    {
      id: "grid-scalper-elite",
      name: "GRID-SCALPER-ELITE",
      owner: "QuantBot",
      category: "Scalping",
      description: "Bot scalping tần suất cao với grid trading strategy",
      avgRating: 4.2,
      totalReviews: 67,
      monthlyFee: 100000,
      minCapital: 20000000,
      avgReturn: "+15.4%",
      winRate: 75.5,
      maxDrawdown: "-3.2%",
      activeTrades: 892,
      followers: 234,
      verified: false,
      trending: true,
      tags: ["Scalping", "Grid Trading", "High Frequency"],
      ratingDistribution: { 5: 32, 4: 20, 3: 10, 2: 3, 1: 2 },
    },
    {
      id: "swing-trader-pro",
      name: "SWING-TRADER-PRO",
      owner: "SwingMaster",
      category: "Swing Trading",
      description: "Swing trading bot cho các vị thế trung và dài hạn",
      avgRating: 4.6,
      totalReviews: 134,
      monthlyFee: 180000,
      minCapital: 40000000,
      avgReturn: "+16.8%",
      winRate: 77.3,
      maxDrawdown: "-2.8%",
      activeTrades: 1234,
      followers: 567,
      verified: true,
      trending: false,
      tags: ["Swing Trading", "Medium Term", "Stable"],
      ratingDistribution: { 5: 78, 4: 35, 3: 15, 2: 4, 1: 2 },
    },
  ];

  // User reviews for each bot
  const botReviews = {
    "vn30-momentum-pro": [
      {
        id: "r1",
        userId: "user123",
        userName: "TradingExpert",
        avatar: "",
        rating: 5,
        date: "2024-12-15",
        title: "Bot tuyệt vời, rất ổn định",
        content:
          "Tôi đã sử dụng bot này được 3 tháng và kết quả rất ấn tượng. Win rate cao, drawdown thấp, và customer support rất tốt. Highly recommend!",
        helpful: 45,
        notHelpful: 2,
        verified: true,
        response: {
          from: "TradeMaster",
          date: "2024-12-16",
          content:
            "Cảm ơn bạn đã tin tưởng và sử dụng bot! Chúng tôi sẽ tiếp tục cải thiện để mang lại kết quả tốt nhất.",
        },
      },
      {
        id: "r2",
        userId: "user456",
        userName: "InvestorPro",
        avatar: "",
        rating: 4,
        date: "2024-12-10",
        title: "Tốt nhưng phí hơi cao",
        content:
          "Performance của bot rất tốt, tuy nhiên phí hàng tháng hơi cao so với mặt bằng chung. Nếu giảm phí xuống 150k sẽ perfect.",
        helpful: 23,
        notHelpful: 5,
        verified: true,
      },
      {
        id: "r3",
        userId: "user789",
        userName: "NewTrader",
        avatar: "",
        rating: 5,
        date: "2024-12-08",
        title: "Perfect cho người mới",
        content:
          "Mình là trader mới, bot này giúp mình học được rất nhiều về trading. Setup dễ dàng, documentation chi tiết.",
        helpful: 18,
        notHelpful: 1,
        verified: false,
      },
    ],
  };

  const bots: Bot[] = [
    {
      name: "SWING-TRADER-PRO",
      status: "Đang test",
      author: "SwingMaster",
      period: "2024-12-01  • 2 tuần",
      pnl: "+450.000 ₫",
      pnlPercent: "+4.5%",
      trades: 23,
      winRate: "78.3%",
      rating: 0,
    },
    {
      name: "BREAKOUT-HUNTER",
      status: "Đang dùng",
      author: "BreakoutPro",
      period: "2024-11-01  • 1.5 tháng",
      pnl: "+890.000 ₫",
      pnlPercent: "+5.9%",
      trades: 45,
      winRate: "82.2%",
      rating: 4,
      comment: "Mới test nhưng khá ổn, entry timing tốt.",
    },
  ];

  // User's review history
  const myReviews = [
    {
      botId: "vn30-momentum-pro",
      botName: "VN30-MOMENTUM-PRO",
      myRating: 5,
      myReview: "Bot tuyệt vời, rất ổn định và profitable",
      reviewDate: "2024-12-15",
      usagePeriod: "3 tháng",
      helpful: 45,
    },
    {
      botId: "grid-scalper-elite",
      botName: "GRID-SCALPER-ELITE",
      myRating: 3,
      myReview: "Ổn nhưng cần cải thiện về risk management",
      reviewDate: "2024-11-20",
      usagePeriod: "1 tháng",
      helpful: 12,
    },
  ];

  const categories = [
    { value: "all", label: "Tất cả", count: 156 },
    { value: "momentum", label: "Momentum", count: 45 },
    { value: "arbitrage", label: "Arbitrage", count: 23 },
    { value: "scalping", label: "Scalping", count: 34 },
    { value: "swing-trading", label: "Swing Trading", count: 28 },
    { value: "grid-trading", label: "Grid Trading", count: 26 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleWriteReview = (bot: any) => {
    setSelectedBot(bot);
    setReviewDialog(true);
  };

  const submitReview = () => {
    toast.success(`Đã đăng review cho ${selectedBot?.name}!`);
    setReviewDialog(false);
    setUserRating(5);
    setReviewText("");
  };

  const toggleReviewExpansion = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const handleHelpful = (reviewId: string, isHelpful: boolean) => {
    toast.success(
      isHelpful ? "Đã đánh dấu hữu ích" : "Đã đánh dấu không hữu ích"
    );
  };

  const filteredBots = availableBots.filter((bot) => {
    const matchesCategory =
      selectedCategory === "all" ||
      bot.category.toLowerCase() === selectedCategory;
    const matchesSearch =
      bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.owner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedBots = [...filteredBots].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.avgRating - a.avgRating;
      case "reviews":
        return b.totalReviews - a.totalReviews;
      case "popular":
        return b.followers - a.followers;
      case "newest":
        return 0; // Would sort by creation date
      default:
        return 0;
    }
  });

  return (
    <div className="flex-1 outline-none space-y-6">
      <div className="page-content">
        <div className="container-fluid py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userBotMetrics.map((userBotMetric) => {
              const Icon = userBotMetric.icon;
              return (
                <div
                  key={userBotMetric.label}
                  className="bg-[#0f172a] text-white flex flex-col gap-6 rounded-lg border border-[#64ffda14] bg-gradient-to-br from-[#64FFDA]/10 to-transparent border-[#64FFDA]/20 transition transition-all duration-300 ease-in-out"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">
                          {userBotMetric.label}
                        </p>
                        <p
                          className={`${userBotMetric.color} text-2xl font-bold`}
                        >
                          {userBotMetric.value}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {userBotMetric.subtext}
                        </p>
                      </div>
                      <Icon className={`w-8 h-8 ${userBotMetric.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 bg-[#1E293B] border border-gray-700 rounded-xl">
              <button
                className={`h-9 text-sm font-medium rounded-xl transition-colors px-2 py-1 ${
                  tab === "myreviews" ? "bg-[#64FFDA] text-black" : "text-white"
                }`}
                onClick={() => setTab("myreviews")}
              >
                📝 Đánh giá của tôi
              </button>
              <button
                className={`h-9 text-sm font-medium rounded-xl transition-colors px-2 py-1 ${
                  tab === "community" ? "bg-[#64FFDA] text-black" : "text-white"
                }`}
                onClick={() => setTab("community")}
              >
                👥 Cộng đồng
              </button>
            </div>

            {tab === "myreviews" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <input
                      placeholder="Tìm kiếm bot..."
                      className="w-full h-9 pl-10 pr-3 rounded-md bg-[#1E293B] border border-gray-700 text-sm text-white"
                    />
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <button className="h-9 rounded-md border border-gray-700 bg-[#1E293B] text-white text-sm px-3">
                    Tất cả (8)
                  </button>
                  <button className="h-9 rounded-md border border-gray-700 bg-[#1E293B] text-white text-sm px-3">
                    Gần nhất
                  </button>
                  <div className="flex gap-2">
                    <button
                      className="h-9 w-9 flex items-center justify-center rounded-md bg-[#64FFDA] text-black"
                      title="Chuyển sang dạng danh sách"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      className="h-9 w-9 flex items-center justify-center rounded-md border border-gray-700 text-white"
                      title="Chuyển sang dạng lưới"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {bots.map((bot, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-white font-medium">{bot.name}</h4>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-md border ${
                              bot.status === "Đang dùng"
                                ? "text-green-400 border-green-400/30 bg-green-500/10"
                                : bot.status === "Đang test"
                                ? "text-yellow-400 border-yellow-400/30 bg-yellow-500/10"
                                : "text-blue-400 border-blue-400/30 bg-blue-500/10"
                            }`}
                          >
                            {bot.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">by {bot.author}</p>
                        <p className="text-xs text-gray-400">{bot.period}</p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`${
                            bot.pnl.startsWith("-")
                              ? "text-red-400"
                              : "text-[#64FFDA]"
                          } font-semibold`}
                        >
                          {bot.pnl}
                        </div>
                        <div
                          className={`text-sm ${
                            bot.pnl.startsWith("-")
                              ? "text-red-400"
                              : "text-[#64FFDA]"
                          }`}
                        >
                          {bot.pnlPercent}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 text-sm gap-2 mb-2">
                      <div className="flex justify-between text-white">
                        <span className="text-gray-400">Trades:</span>
                        <span>{bot.trades}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span className="text-gray-400">Win Rate:</span>
                        <span>{bot.winRate}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-400">
                          Đánh giá của tôi:
                        </span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < bot.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-white font-medium">
                          {bot.rating}/5
                        </span>
                      </div>
                      {bot.comment && (
                        <p className="text-sm italic text-gray-300">
                          "{bot.comment}"
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 h-8 bg-[#64FFDA] text-black rounded-md hover:bg-[#64FFDA]/90 text-sm font-medium">
                        {bot.rating === 0
                          ? "Đánh giá ngay"
                          : "Cập nhật đánh giá"}
                      </button>
                      <button className="flex-1 h-8 rounded-md border border-gray-700 text-white text-sm font-medium flex items-center justify-center gap-1 hover:bg-gray-700">
                        <Eye className="w-4 h-4" /> Chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
            {tab === "community" && (
              <div className="text-white">(Nội dung cộng đồng...)</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
