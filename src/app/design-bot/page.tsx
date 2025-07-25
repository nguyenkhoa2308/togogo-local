"use client";

import { useState, useEffect } from "react";
// import { HeroSection } from "./components/sections/HeroSection";
// import { HeroContactVisual } from "./components/HeroContactVisual";

import {
  Code2,
  Target,
  Cloud,
  CheckCircle,
  Award,
  ArrowRight,
  BookOpen,
  Sparkles,
  Settings,
  Crown,
  MessageSquare,
  HeadphonesIcon,
  Lightbulb,
  Calculator,
  Quote,
  Star,
  Users,
  TrendingUp,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  ThumbsUp,
  DollarSign,
  FileCheck,
  Handshake,
  Rocket,
  ChevronDown,
} from "lucide-react";
import {
  scrollToSection,
  handleContactSubmit,
  openExternalLink,
} from "./utils/helpers";
import ContactVisual from "./components/hero-visual/ContactVisual";
import HeroSectionVisual from "./components/hero-visual/HeroSectionVisual";

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleContactSubmit(e, setIsSubmitting);
  };

  const whyChooseData = [
    {
      icon: Award,
      title: "Chuyên gia hàng đầu",
      description:
        "5+ năm kinh nghiệm với Pine Script, đã phát triển hơn 200+ bot giao dịch thành công cho các trader chuyên nghiệp.",
      stats: "200+ Bot",
    },
    {
      icon: Clock,
      title: "Giao hàng nhanh chóng",
      description:
        "Cam kết hoàn thành dự án trong 3-7 ngày làm việc với chất lượng cao và đúng deadline 100%.",
      stats: "3-7 ngày",
    },
    {
      icon: Shield,
      title: "Bảo hành dài hạn",
      description:
        "Hỗ trợ và bảo hành miễn phí 6 tháng, sửa lỗi không giới hạn và tư vấn tối ưu chiến lược liên tục.",
      stats: "6 tháng",
    },
    {
      icon: Target,
      title: "Tỷ lệ thành công cao",
      description:
        "98% dự án hoàn thành đúng yêu cầu từ lần đầu, 95% khách hàng quay lại sử dụng dịch vụ.",
      stats: "98% thành công",
    },
    {
      icon: Users,
      title: "Cộng đồng trader",
      description:
        "Kết nối với 500+ trader đang sử dụng bot của chúng tôi, chia sẻ kinh nghiệm và học hỏi lẫn nhau.",
      stats: "500+ trader",
    },
    {
      icon: Rocket,
      title: "Công nghệ tiên tiến",
      description:
        "Sử dụng những kỹ thuật Pine Script mới nhất, AI optimization và backtesting với dữ liệu lịch sử 10+ năm.",
      stats: "10+ năm data",
    },
  ];

  const processSteps = [
    {
      step: 1,
      icon: MessageSquare,
      title: "Tiếp nhận & Tư vấn",
      description:
        "Trao đổi chi tiết về ý tưởng, phân tích yêu cầu và tư vấn giải pháp tối ưu hoàn toàn miễn phí",
      duration: "30 phút",
    },
    {
      step: 2,
      icon: DollarSign,
      title: "Báo giá & Hợp đồng",
      description:
        "Báo giá chi tiết minh bạch, ký hợp đồng và thỏa thuận timeline dự án cụ thể",
      duration: "1 ngày",
    },
    {
      step: 3,
      icon: FileCheck,
      title: "Phát triển & Test",
      description:
        "Lập trình Pine Script theo yêu cầu, kiểm thử kỹ lưỡng và tối ưu hóa hiệu suất",
      duration: "3-7 ngày",
    },
    {
      step: 4,
      icon: Handshake,
      title: "Bàn giao & Hỗ trợ",
      description:
        "Bàn giao sản phẩm hoàn chỉnh, hướng dẫn sử dụng và hỗ trợ 6 tháng",
      duration: "6 tháng",
    },
  ];

  const clientTestimonials = [
    {
      name: "Nguyễn Minh Tuấn",
      role: "Professional Trader",
      company: "VN Securities",
      content:
        "Bot RSI Divergence của TOGOGO đã giúp tôi tăng portfolio 42% trong 6 tháng. Độ chính xác cao và rất ổn định trong thị trường ranging.",
      rating: 5,
      result: "+42% ROI",
      avatar: "MT",
    },
    {
      name: "Trần Thị Hương",
      role: "Crypto Trader",
      company: "Independent",
      content:
        "Scalping Strategy Pro hoạt động tuyệt vời trong session London và New York. Consistency rất cao, ít drawdown. Recommend cho ai muốn scalp professional.",
      rating: 5,
      result: "+28% profit",
      avatar: "TH",
    },
    {
      name: "Lê Văn Khoa",
      role: "Swing Trader",
      company: "Investment Fund",
      content:
        "Trend Following System capture được major trends rất tốt. Portfolio growth stable và sustainable. Perfect cho long-term trading strategy của tôi.",
      rating: 5,
      result: "+35% annually",
      avatar: "LK",
    },
    {
      name: "Phạm Hoàng Nam",
      role: "Day Trader",
      company: "FX Pro",
      content:
        "Team TOGOGO support 24/7 rất professional. Bot được custom exactly theo yêu cầu và hoạt động flawlessly. Definitely worth the investment.",
      rating: 5,
      result: "98% uptime",
      avatar: "PN",
    },
  ];

  const contactChannels = [
    {
      name: "Email",
      description: "Gửi yêu cầu chi tiết",
      contact: "contact@togogo.vn",
      icon: Mail,
      action: () => (window.location.href = "mailto:contact@togogo.vn"),
      color: "text-[#64FFDA]",
      bgColor: "bg-[#64FFDA]/20",
    },
    {
      name: "Zalo",
      description: "Tư vấn nhanh 24/7",
      contact: "0901 234 567",
      icon: MessageCircle,
      action: () => openExternalLink("https://zalo.me/0901234567"),
      color: "text-[#00E5A1]",
      bgColor: "bg-[#00E5A1]/20",
    },
    {
      name: "Messenger",
      description: "Chat trực tiếp Facebook",
      contact: "m.me/TOGOGO.vn",
      icon: MessageSquare,
      action: () => openExternalLink("https://m.me/TOGOGO.vn"),
      color: "text-[#64FFDA]",
      bgColor: "bg-[#64FFDA]/20",
    },
    {
      name: "Telegram",
      description: "Nhóm cộng đồng trader",
      contact: "@TOGOGO_VN",
      icon: MessageCircle,
      action: () => openExternalLink("https://t.me/TOGOGO_VN"),
      color: "text-[#00E5A1]",
      bgColor: "bg-[#00E5A1]/20",
    },
  ];

  return (
    <div className="min-h-screen text-white pt-24 md:pt-31 overflow-hidden bg-[#101828]">
      {/* Hero Section */}
      {/* <HeroSection /> */}
      <section id="hero" className="flex items-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#101828] to-[#1a202c]"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#1a202c] to-[#101828]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#64FFDA]/5 via-[#00E5A1]/5 to-[#64FFDA]/5"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-full px-4 py-2">
                  <Star className="w-4 h-4" style={{ color: "#64FFDA" }} />
                  <span className="text-sm text-white/80">
                    Được tin tưởng bởi 500+ trader
                  </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white">Pine Script</span>
                  <span className="block bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] bg-clip-text text-transparent">
                    Chuyên nghiệp
                  </span>
                  <span className="block text-[#94a3b8] text-2xl lg:text-3xl mt-4">
                    Cho trader thông minh
                  </span>
                </h1>

                <p className="text-xl text-[#94a3b8] leading-relaxed max-w-lg">
                  Tạo bot giao dịch tự động với Pine Script. Tối ưu hóa chiến
                  lược đầu tư của bạn với công nghệ tiên tiến và đội ngũ giàu
                  kinh nghiệm.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center justify-center gap-2 font-semibold bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] hover:from-[#64FFDA]/80 hover:via-[#00E5A1]/80 hover:to-[#64FFDA]/80 text-black border-0 rounded-xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  Bắt đầu ngay
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform translate-y-0.5" />
                </button>
                <button
                  onClick={() => openExternalLink("https://tradingview.com")}
                  className="text-sm text-[#00E5A1] font-semibold px-8 py-4 whitespace-nowrap border border-[#00E5A1]/50 bg-[#1e293b]/30 rounded-xl hover:bg-[#00E5A1] hover:text-black cursor-pointer transition-all duration-300"
                >
                  Xem demo
                </button>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-100">500+</div>
                  <div className="text-sm text-[#94a3b8]">Khách hàng</div>
                </div>
                <div className="w-px h-12 border bg-[#64FFDA14]"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-100">98%</div>
                  <div className="text-sm text-[#94a3b8]">Hài lòng</div>
                </div>
                <div className="w-px h-12 border bg-[#64FFDA14]"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-100">24/7</div>
                  <div className="text-sm text-[#94a3b8]">Hỗ trợ</div>
                </div>
              </div>
            </div>

            {/* Right Visual - Dynamic based on state */}
            <div className="relative flex justify-center items-center lg:justify-end">
              <div className="relative">
                {/* Floating Cards */}
                <div className="absolute -top-10 -left-10 w-48 h-32 bg-gradient-to-br from-[#64FFDA]/20 to-[#00E5A1]/10 rounded-2xl backdrop-blur-sm border border-[#64FFDA]/20 p-4 transform rotate-3 animate-pulse">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#64FFDA] to-[#00E5A1] rounded-lg flex items-center justify-center">
                      <Code2 className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-slate-200 text-sm">Active Bot</span>
                  </div>
                  <div className="text-[#64FFDA] text-lg font-bold">+24.5%</div>
                  <div className="text-[#94a3b8] text-xs">This month</div>
                </div>

                <div
                  className="absolute -bottom-8 -right-8 w-44 h-28 bg-gradient-to-br from-[#00E5A1]/20 to-[#64FFDA]/10 rounded-2xl backdrop-blur-sm border border-[#00E5A1]/20 p-4 transform -rotate-2 animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00E5A1] to-[#64FFDA]"></div>
                    <span className="text-slate-200 text-sm">Pine Script</span>
                  </div>
                  <div className="text-[#00E5A1] text-base font-bold">
                    Ready
                  </div>
                </div>

                {/* Main Visual - Dynamic */}
                <div className="transform scale-110">
                  <HeroSectionVisual />
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div
              className="group absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center cursor-pointer select-none text-[#94a3b8] hover:text-[#00E5A1] transition-colors"
              onClick={() => scrollToSection("services")}
            >
              <div className="mb-2 hover:text-[#00E5A1]">Khám phá thêm</div>
              <span>
                <ChevronDown className="w-6 h-6 animate-bounce mx-auto cursor-pointer select-none" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="relative -mt-14 z-10 scroll-mt-24 md:scroll-mt-34"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-[##0a0a0a] flex flex-col gap-6 rounded-xl border bg-gradient-to-br from-[#1a202c] to-[#101828] border-[#64FFDA14] backdrop-blur-lg hover:scale-105 transition-all duration-300 group">
              <div className="[&:last-child]:pb-6 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <Code2 className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-bold text-white mb-4">
                  Pine Script tùy chỉnh
                </h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
                  Lập trình bot giao dịch theo ý tưởng riêng với độ chính xác
                  cao
                </p>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm text-[#00E5A1] font-medium px-3 py-2 whitespace-nowrap border border-[#00E5A1]/50 bg-[#1e293b]/30 rounded-lg hover:bg-[#00E5A1] hover:text-black cursor-pointer transition-all duration-300"
                >
                  Tìm hiểu thêm
                </button>
              </div>
            </div>

            <div className="text-[##0a0a0a] flex flex-col gap-6 rounded-xl border bg-gradient-to-br from-[#1a202c] to-[#101828] border-[#64FFDA14] backdrop-blur-lg hover:scale-105 transition-all duration-300 group md:mt-8">
              <div className="[&:last-child]:pb-6 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00E5A1] via-[#64FFDA] to-[#00E5A1] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-bold text-white mb-4">
                  Tối ưu hóa chiến lược
                </h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
                  Cải thiện hiệu suất script hiện tại và nâng cao độ chính xác
                </p>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm text-[#00E5A1] font-medium px-3 py-2 whitespace-nowrap border border-[#00E5A1]/50 bg-[#1e293b]/30 rounded-lg hover:bg-[#00E5A1] hover:text-black cursor-pointer transition-all duration-300"
                >
                  Tìm hiểu thêm
                </button>
              </div>
            </div>

            <div className="text-[##0a0a0a] flex flex-col gap-6 rounded-xl border bg-gradient-to-br from-[#1a202c] to-[#101828] border-[#64FFDA14] backdrop-blur-lg hover:scale-105 transition-all duration-300 group">
              <div className="[&:last-child]:pb-6 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <Cloud className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-bold text-white mb-4">
                  Chuyển đổi platform
                </h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
                  Chuyển đổi từ MQL4/5, Python sang Pine Script chuyên nghiệp
                </p>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm text-[#00E5A1] font-medium px-3 py-2 whitespace-nowrap border border-[#00E5A1]/50 bg-[#1e293b]/30 rounded-lg hover:bg-[#00E5A1] hover:text-black cursor-pointer transition-all duration-300"
                >
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose TOGOGO Section */}
      <section id="why-choose" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#101828] via-[#1a202c]/50 to-[#101828]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4" style={{ color: "#64FFDA" }} />
              <span className="text-sm text-white/80">
                Tại sao chọn chúng tôi
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 flex flex-col items-center justify-center gap-2 ">
              Ưu thế vượt trội của
              <span className="bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] bg-clip-text text-transparent">
                TOGOGO
              </span>
            </h2>
            <p className="text-lg text-[#94a3b8] max-w-3xl mx-auto">
              Với hơn 5 năm kinh nghiệm và 500+ khách hàng tin tưởng, chúng tôi
              tự hào là đối tác đáng tin cậy nhất cho trader Việt Nam trong lĩnh
              vực Pine Script.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
            {whyChooseData.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a202c]/80 to-[#101828]/60 border border-[#64FFDA14] rounded-2xl backdrop-blur-lg hover:scale-105 transition-all duration-300 group"
              >
                <div className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <item.icon className="w-8 h-8 text-black" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-white">
                          {item.title}
                        </h3>
                        <span className="bg-[#64FFDA]/20 text-[#64FFDA] px-3 py-1 rounded-full text-xs font-bold text-center">
                          {item.stats}
                        </span>
                      </div>
                      <p className="text-[#94a3b8] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#64FFDA]/10 via-[#00E5A1]/10 to-[#64FFDA]/10 border border-[#64FFDA14] rounded-2xl backdrop-blur-lg p-12">
              <div className="p-0">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Sẵn sàng tham gia cộng đồng 500+ trader thành công?
                </h3>
                <p className="text-lg text-[#94a3b8] mb-8 max-w-2xl mx-auto">
                  Hãy để chúng tôi giúp bạn tạo ra bot Pine Script hoàn hảo cho
                  chiến lược giao dịch của bạn.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="inline-flex items-center justify-center gap-2 font-semibold bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] hover:from-[#64FFDA]/80 hover:via-[#00E5A1]/80 hover:to-[#64FFDA]/80 text-black border-0 rounded-xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                  >
                    <span className="font-semibold">Bắt đầu dự án ngay</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="inline-flex items-center justify-center text-sm text-[#00E5A1] font-semibold px-8 py-4 whitespace-nowrap border border-[#00E5A1]/50 bg-[#1e293b]/30 rounded-xl hover:bg-[#00E5A1] hover:text-black cursor-pointer transition-all duration-300"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    <span className="font-semibold">
                      Xem đánh giá khách hàng
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a202c]/20 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Quy trình làm việc
            </h2>
            <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
              Từ ý tưởng đến sản phẩm hoàn thiện trong 4 bước đơn giản
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] opacity-30"></div>

            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <div
                  key={step.step}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } gap-16`}
                >
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-[#1a202c]/80 to-[#101828]/60 border border-[#64FFDA14] rounded-2xl backdrop-blur-lg p-8">
                      <div className="flex items-start space-x-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] rounded-2xl flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-black" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-xl font-bold text-white">
                              {step.title}
                            </h3>
                            <span className="bg-[#00E5A1]/20 text-[#00E5A1] px-3 py-1 rounded-full text-sm">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-[#94a3b8] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-12 h-12 bg-gradient-to-r from-[#64FFDA] to-[#00E5A1] rounded-full flex items-center justify-center border-4 border-[#101828] shadow-lg relative z-10">
                    <span className="text-black font-bold">{step.step}</span>
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 relative overflow-hidden scroll-mt-24 md:scroll-mt-34"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#101828] via-[#1a202c]/50 to-[#101828]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4" style={{ color: "#64FFDA" }} />
              <span className="text-sm text-white/80">
                Khách hàng nói gì về chúng tôi
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Câu chuyện thành công
              <br />
              <span className="bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] bg-clip-text text-transparent">
                từ khách hàng thực tế
              </span>
            </h2>
            <p className="text-xl text-[#94a3b8] max-w-3xl mx-auto">
              Hơn 500 trader đã tin tưởng và đạt được kết quả ấn tượng với bot
              Pine Script do chúng tôi thiết kế. Đây là những phản hồi chân thực
              từ khách hàng.
            </p>
          </div>

          {/* Success Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-[#64FFDA]/10 to-[#00E5A1]/5 border border-[#64FFDA]/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-[#64FFDA] mb-2">500+</div>
              <div className="text-[#94a3b8] text-sm">Khách hàng hài lòng</div>
            </div>
            <div className="bg-gradient-to-br from-[#00E5A1]/10 to-[#64FFDA]/5 border border-[#00E5A1]/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-[#00E5A1] mb-2">98%</div>
              <div className="text-[#94a3b8] text-sm">Tỷ lệ thành công</div>
            </div>
            <div className="bg-gradient-to-br from-[#64FFDA]/10 to-[#00E5A1]/5 border border-[#64FFDA]/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-[#64FFDA] mb-2">+38%</div>
              <div className="text-[#94a3b8] text-sm">ROI trung bình</div>
            </div>
            <div className="bg-gradient-to-br from-[#00E5A1]/10 to-[#64FFDA]/5 border border-[#00E5A1]/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-[#00E5A1] mb-2">24/7</div>
              <div className="text-[#94a3b8] text-sm">Hỗ trợ kỹ thuật</div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {clientTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a202c]/80 to-[#101828]/60 border border-[#64FFDA14] backdrop-blur-lg rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-br from-[#64FFDA]/20 to-[#00E5A1]/20 rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-[#64FFDA]" />
                </div>

                {/* Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#64FFDA] fill-current"
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-[#94a3b8] leading-relaxed mb-6">
                  &quot;{testimonial.content}&quot;
                </blockquote>

                {/* Client & Result */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">
                        {testimonial.avatar}
                      </span>
                    </div>

                    {/* Info */}
                    <div>
                      <div className="text-white font-bold">
                        {testimonial.name}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {testimonial.role}
                      </div>
                      <div className="text-slate-500 text-xs">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>

                  {/* Result Badge */}
                  <div className="bg-[#64FFDA]/20 text-[#64FFDA] px-4 py-2 rounded-full font-bold text-sm">
                    {testimonial.result}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#1a202c]/60 to-[#101828]/40 border border-[#64FFDA14] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Bạn có muốn trở thành câu chuyện thành công tiếp theo?
              </h3>
              <p className="text-[#94a3b8] mb-6 max-w-2xl mx-auto">
                Hàng trăm trader đã tin tưởng TOGOGO.vn để thiết kế bot Pine
                Script và đạt được kết quả vượt mong đợi. Đến lượt bạn trải
                nghiệm sự khác biệt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center justify-center gap-2 font-semibold bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] hover:from-[#64FFDA]/80 hover:via-[#00E5A1]/80 hover:to-[#64FFDA]/80 text-black border-0 rounded-xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span className="font-semibold">
                    Bắt đầu câu chuyện của bạn
                  </span>
                </button>
                {/* <button
                  onClick={() =>
                    openExternalLink("https://tradingview.com/u/TOGOGO_VN")
                  }
                  className="inline-flex items-center justify-center text-sm text-[#00E5A1] font-semibold px-8 py-4 whitespace-nowrap border border-[#00E5A1]/50 bg-[#1e293b]/30 rounded-xl hover:bg-[#00E5A1] hover:text-black cursor-pointer transition-all duration-300"
                >
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Xem thêm case studies</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section (formerly Pricing) */}
      <section
        id="pricing"
        className="py-20 bg-gradient-to-b from-[#1a202c]/20 to-[#101828]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-full px-4 py-2 mb-6">
              <Lightbulb className="w-4 h-4 text-[#64FFDA]" />
              <span className="text-sm text-white/80">
                Ví dụ minh họa theo độ phức tạp
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ví dụ minh họa dự án theo độ phức tạp
            </h2>
            <p className="text-lg text-[#94a3b8] max-w-3xl mx-auto mb-8">
              Dưới đây là các ví dụ minh họa để bạn hiểu rõ về độ phức tạp và
              phạm vi công việc.
              <span className="font-semibold text-[#94a3b8]">
                {" "}
                Giá chính xác sẽ được báo sau khi tư vấn chi tiết về yêu cầu cụ
                thể của bạn.
              </span>
            </p>

            {/* Process Highlight */}
            <div className="bg-gradient-to-r from-[#64FFDA]/10 via-[#00E5A1]/10 to-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-8 text-[#94a3b8]">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-[#00E5A1] text-black rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <span className="text-sm">Tư vấn miễn phí</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00E5A1]" />
                <div className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-[#00E5A1]" />
                  <span className="text-sm">Báo giá chi tiết</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00E5A1]" />
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#00E5A1]" />
                  <span className="text-sm">Ký hợp đồng & Thực hiện</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Basic Example */}
            <div className="bg-gradient-to-br from-[#1a202c]/80 to-[#101828]/60 border border-[#64FFDA14] rounded-2xl backdrop-blur-lg relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="p-8 flex flex-col justify-between h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4a9b8e] to-[#4a9b8e] rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Cơ bản</h3>
                    <p className="text-slate-400 text-sm">Indicator đơn giản</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-white">~3M</span>
                    <span className="text-slate-400">VNĐ</span>
                  </div>
                  <p className="text-slate-400 text-sm">Ước tính: 3-5 ngày</p>
                  <div className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs mt-2 inline-block">
                    Chỉ mang tính chất tham khảo
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "1 indicator theo yêu cầu",
                    "Alert cơ bản",
                    "Source code đầy đủ",
                    "Hướng dẫn sử dụng",
                    "Bảo hành 1 tháng",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-[#4a9b8e]" />
                      <span className="text-[#94a3b8] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full inline-flex items-center justify-center text-sm text-[#00E5A1] font-semibold px-4 py-2 whitespace-nowrap border border-[#00E5A1]/50 bg-[#1e293b]/30 rounded-xl hover:bg-[#00E5A1] hover:text-black cursor-pointer transition-all duration-300"
                >
                  <span className="font-semibold">Tư vấn miễn phí</span>
                </button>
              </div>
            </div>

            {/* Professional Example */}
            <div className="bg-gradient-to-br from-[#00E5A1]/10 to-[#64FFDA]/5 border border-[#00E5A1]/20 rounded-2xl backdrop-blur-lg relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="p-8 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00E5A1] to-[#64FFDA] rounded-xl flex items-center justify-center">
                      <Settings className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        Trung bình
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Strategy hoàn chỉnh
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-white">~8M</span>
                    <span className="text-slate-400">VNĐ</span>
                  </div>
                  <p className="text-slate-400 text-sm">Ước tính: 5-7 ngày</p>
                  <div className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs mt-2 inline-block">
                    Chỉ mang tính chất tham khảo
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "Strategy trading hoàn chỉnh",
                    "Risk management tích hợp",
                    "Multi-timeframe analysis",
                    "Backtesting report",
                    "Optimization parameters",
                    "Bảo hành 3 tháng",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-[#00E5A1]" />
                      <span className="text-[#94a3b8] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full inline-flex items-center justify-center gap-2 font-semibold bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] hover:from-[#64FFDA]/80 hover:via-[#00E5A1]/80 hover:to-[#64FFDA]/80 text-black border-0 rounded-xl px-4 py-2 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  <span className="font-semibold">Tư vấn miễn phí</span>
                </button>
              </div>
            </div>

            {/* Enterprise Example */}
            <div className="bg-gradient-to-br from-[#64FFDA]/10 via-[#00E5A1]/10 to-[#64FFDA]/5 border border-[#64FFDA]/20 rounded-2xl backdrop-blur-lg relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="p-8 flex flex-col justify-between h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Cao</h3>
                    <p className="text-slate-400 text-sm">System cao cấp</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-white">~18M</span>
                    <span className="text-slate-400">VNĐ</span>
                  </div>
                  <p className="text-slate-400 text-sm">Ước tính: 7-10 ngày</p>
                  <div className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs mt-2 inline-block">
                    Chỉ mang tính chất tham khảo
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "Multi-strategy system",
                    "AI-powered optimization",
                    "Advanced risk management",
                    "Portfolio management",
                    "Real-time monitoring",
                    "Custom dashboard",
                    "Bảo hành VIP 6 tháng",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-[#64FFDA]" />
                      <span className="text-[#94a3b8] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full inline-flex items-center justify-center gap-2 font-semibold bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] hover:from-[#64FFDA]/80 hover:via-[#00E5A1]/80 hover:to-[#64FFDA]/80 text-black border-0 rounded-xl px-4 py-2 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  <span className="font-semibold">Tư vấn miễn phí</span>
                </button>
              </div>
            </div>

            {/* Custom Example */}
            <div className="bg-gradient-to-br from-[#1a202c]/80 to-[#101828]/60 border border-[#64FFDA14] rounded-2xl backdrop-blur-lg relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="p-8 flex flex-col justify-between h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4a9b8e] to-[#4a9b8e] rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Yêu cầu đặc biệt
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Tùy chỉnh hoàn toàn
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-white">
                      Tư vấn
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Thời gian: Tùy độ phức tạp
                  </p>
                  <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs mt-2 inline-block">
                    Báo giá chi tiết sau tư vấn
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "Phân tích yêu cầu chi tiết",
                    "Thiết kế giải pháp tối ưu",
                    "Báo giá minh bạch",
                    "Timeline cụ thể",
                    "Hỗ trợ dài hạn",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-[#4a9b8e]" />
                      <span className="text-[#94a3b8] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full inline-flex items-center justify-center text-sm text-[#00E5A1] font-semibold px-4 py-2 whitespace-nowrap border border-[#00E5A1]/50 bg-[#1e293b]/30 rounded-xl hover:bg-[#00E5A1] hover:text-black cursor-pointer transition-all duration-300"
                >
                  <span className="font-semibold">Tư vấn miễn phí</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-[#1a202c]/60 to-[#101828]/40 border border-[#64FFDA14] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Dịch vụ bổ sung & Support
              </h3>
              <p className="text-[#94a3b8] mb-6 max-w-2xl mx-auto">
                Các dịch vụ khác với giá ước tính. Giá chính xác sẽ được báo sau
                khi tư vấn chi tiết.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Target className="w-8 h-8 text-[#00E5A1] mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">Tối ưu hóa</h4>
                  <p className="text-[#94a3b8] text-sm">
                    Cải thiện bot hiện có
                  </p>
                  <p className="text-[#00E5A1] font-bold mt-2">~2M - 5M VNĐ</p>
                </div>
                <div className="text-center">
                  <Cloud className="w-8 h-8 text-[#00E5A1] mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">Chuyển đổi</h4>
                  <p className="text-[#94a3b8] text-sm">MQL4/5 → Pine Script</p>
                  <p className="text-[#00E5A1] font-bold mt-2">~3M - 7M VNĐ</p>
                </div>
                <div className="text-center">
                  <HeadphonesIcon className="w-8 h-8 text-[#00E5A1] mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">Đào tạo</h4>
                  <p className="text-[#94a3b8] text-sm">1-on-1 Pine Script</p>
                  <p className="text-[#00E5A1] font-bold mt-2">~800K/giờ</p>
                </div>
              </div>
            </div>
            <p className="text-[#94a3b8] text-sm mt-6">
              <span className="font-semibold text-amber-400">
                * Lưu ý quan trọng:
              </span>{" "}
              Tất cả mức giá trên chỉ mang tính chất{" "}
              <span className="font-semibold">ước tính và tham khảo</span>.
              <br />
              Giá chính xác sẽ được báo chi tiết sau khi tư vấn miễn phí về yêu
              cầu cụ thể của bạn.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/5 via-[#00E5A1]/5 to-[#64FFDA]/5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-full px-4 py-2 mb-6">
              <MessageCircle className="w-4 h-4" style={{ color: "#64FFDA" }} />
              <span className="text-sm text-white/80">Liên hệ tư vấn</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Sẵn sàng thiết kế
              <br />
              <span className="bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] bg-clip-text text-transparent">
                bot riêng cho bạn?
              </span>
            </h2>
            <p className="text-xl text-[#94a3b8] max-w-3xl mx-auto">
              Hãy chia sẻ ý tưởng giao dịch của bạn với chúng tôi. Chúng tôi sẽ
              tư vấn miễn phí và báo giá chi tiết cho dự án của bạn.
            </p>
          </div>

          {/* Main Content - 2-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Cam kết & Liên hệ trực tiếp */}
            <div className="space-y-8">
              {/* Benefits/Commitments Card */}
              <div className="bg-gradient-to-br from-[#1a202c]/80 to-[#101828]/60 border border-[#64FFDA14] rounded-2xl backdrop-blur-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#64FFDA] mr-3" />
                  Cam kết của chúng tôi
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: CheckCircle,
                      text: "Tư vấn miễn phí 100%",
                      desc: "Không thu phí tư vấn, báo giá chi tiết trước khi thực hiện",
                      color: "text-[#64FFDA]",
                    },
                    {
                      icon: Clock,
                      text: "Phản hồi trong 2 giờ",
                      desc: "Đội ngũ hỗ trợ 24/7, phản hồi nhanh chóng mọi thắc mắc",
                      color: "text-[#00E5A1]",
                    },
                    {
                      icon: Shield,
                      text: "Bảo đảm chất lượng 100%",
                      desc: "Cam kết chất lượng code, bảo hành và hỗ trợ dài hạn",
                      color: "text-[#64FFDA]",
                    },
                    {
                      icon: ThumbsUp,
                      text: "Hài lòng hoặc hoàn tiền",
                      desc: "Nếu không hài lòng, chúng tôi hoàn tiền 100%",
                      color: "text-[#00E5A1]",
                    },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <div
                        className={`w-10 h-10 ${
                          benefit.color === "text-[#64FFDA]"
                            ? "bg-[#64FFDA]/20"
                            : "bg-[#00E5A1]/20"
                        } rounded-full flex items-center justify-center mt-1`}
                      >
                        <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold mb-1">
                          {benefit.text}
                        </h4>
                        <p className="text-[#94a3b8] text-sm leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Channels */}
              <div className="bg-gradient-to-br from-[#1a202c]/80 to-[#101828]/60 border border-[#64FFDA14] rounded-2xl backdrop-blur-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 text-[#64FFDA] mr-3" />
                  Liên hệ trực tiếp
                </h3>
                <div className="space-y-4">
                  {contactChannels.map((channel, index) => (
                    <button
                      key={index}
                      onClick={channel.action}
                      className={`w-full ${channel.bgColor} border border-slate-700/30 rounded-xl p-4 text-left hover:scale-105 transition-all duration-300 group`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 ${
                            channel.bgColor
                          } rounded-full flex items-center justify-center border-2 ${
                            channel.color === "text-[#64FFDA]"
                              ? "border-[#64FFDA]/50"
                              : "border-[#00E5A1]/50"
                          }`}
                        >
                          <channel.icon
                            className={`w-6 h-6 ${channel.color}`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white font-bold">
                              {channel.name}
                            </span>
                            <ArrowRight
                              className={`w-4 h-4 ${channel.color} group-hover:translate-x-1 transition-transform`}
                            />
                          </div>
                          <p className="text-[#94a3b8] text-sm mb-1">
                            {channel.description}
                          </p>
                          <p className={`text-sm font-bold ${channel.color}`}>
                            {channel.contact}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#64FFDA]/10 to-[#00E5A1]/5 border border-[#64FFDA]/20 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-[#64FFDA] mb-2">
                    500+
                  </div>
                  <div className="text-[#94a3b8] text-sm">Dự án hoàn thành</div>
                </div>
                <div className="bg-gradient-to-br from-[#00E5A1]/10 to-[#64FFDA]/5 border border-[#00E5A1]/20 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-[#00E5A1] mb-2">
                    98%
                  </div>
                  <div className="text-[#94a3b8] text-sm">
                    Khách hàng hài lòng
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#64FFDA]/10 to-[#00E5A1]/5 border border-[#64FFDA]/20 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-[#64FFDA] mb-2">
                    5+
                  </div>
                  <div className="text-[#94a3b8] text-sm">Năm kinh nghiệm</div>
                </div>
                <div className="bg-gradient-to-br from-[#00E5A1]/10 to-[#64FFDA]/5 border border-[#00E5A1]/20 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-[#00E5A1] mb-2">
                    24/7
                  </div>
                  <div className="text-[#94a3b8] text-sm">Hỗ trợ kỹ thuật</div>
                </div>
              </div> */}
            </div>

            {/* Right Column - Form & Hero Visual */}
            <div className="space-y-8">
              {/* Contact Form */}
              <div className="bg-gradient-to-br from-[#1a202c]/80 to-[#101828]/60 border border-[#64FFDA14] rounded-2xl backdrop-blur-lg p-8">
                <form onSubmit={onContactSubmit}>
                  <div className="space-y-6 p-0">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-white"
                        >
                          Họ và tên
                        </label>
                        <input
                          id="name"
                          name="name"
                          required
                          placeholder="Nhập họ và tên"
                          className="w-full px-3 py-2 md:text-sm bg-[#101828]/50 border border-[#64FFDA14] text-white placeholder:text-slate-400 focus:border-[#64FFDA] h-12 rounded-xl outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-white"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="email@example.com"
                          className="w-full px-3 py-2 md:text-sm bg-[#101828]/50 border border-[#64FFDA14] text-white placeholder:text-slate-400 focus:border-[#64FFDA] h-12 rounded-xl outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="project"
                        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-white"
                      >
                        Độ phức tạp dự kiến
                      </label>
                      <select
                        name="project"
                        className="w-full h-12 bg-[#101828]/50 border border border-[#64FFDA14] text-white text-sm rounded-xl px-3 focus:border-[#64FFDA] outline-none"
                        title="Chọn mức độ phức tạp"
                      >
                        <option value="">Chọn mức độ phức tạp dự kiến</option>
                        <option value="basic">
                          Cơ bản - Indicator đơn giản (~3M VNĐ)
                        </option>
                        <option value="professional">
                          Trung bình - Strategy hoàn chỉnh (~8M VNĐ)
                        </option>
                        <option value="enterprise">
                          Cao - System nâng cao (~18M VNĐ)
                        </option>
                        <option value="custom">
                          Yêu cầu đặc biệt - Tư vấn chi tiết
                        </option>
                        <option value="optimization">
                          Tối ưu hóa bot hiện tại
                        </option>
                        <option value="conversion">
                          Chuyển đổi từ platform khác
                        </option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-white"
                      >
                        Mô tả chi tiết ý tưởng bot
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Mô tả chiến lược giao dịch, indicators mong muốn, tính năng đặc biệt và mục tiêu của bot..."
                        rows={4}
                        className="w-full px-3 py-2 text-sm bg-[#101828]/50 border border-[#64FFDA14] text-white placeholder:text-slate-400 focus:border-[#64FFDA] rounded-xl outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 font-semibold bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] hover:from-[#64FFDA]/80 hover:via-[#00E5A1]/80 hover:to-[#64FFDA]/80 text-black border-0 rounded-xl px-4 py-2 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer group"
                    >
                      <span className="font-semibold">
                        {isSubmitting ? "Đang gửi..." : "Nhận tư vấn miễn phí"}
                      </span>
                      {!isSubmitting && (
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Hero Contact Visual - Match height with left column */}
              <div className="h-[500px]">
                <ContactVisual />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
