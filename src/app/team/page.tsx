"use client";

import dynamic from "next/dynamic";
import { Fragment, Suspense, useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Heart,
  Star,
  Zap,
  Shield,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
  Globe,
  Award,
  Rocket,
  Calendar,
  ArrowRight,
  CheckCircle,
  Badge,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import AOS from "aos";

// import InternSection from "./components/intern/InternSection";
import InternCard from "./components/cards/InternCard";
import { Intern } from "./types";

// Sử dụng dynamic import để tải component và tắt SSR
const OrganizationChart = dynamic(
  () => import("@/app/team/components/charts/OrganizationChart"),
  {
    ssr: false, // Quan trọng: Tắt Server-Side Rendering
  }
);

const interns: Intern[] = [
  {
    id: "i1",
    name: "Nguyễn Thị I",
    position: "Frontend Developer",
    avatar: "/intern1.jpg",
    university: "Đại học Bách Khoa",
    skills: ["React.js"],
  },
  {
    id: "i2",
    name: "Trần Văn J",
    position: "Backend Developer",
    avatar: "/intern2.jpg",
    university: "Đại học Công Nghệ",
    skills: ["Node.js"],
  },
  {
    id: "i3",
    name: "Lê Thị K",
    position: "UI/UX Designer",
    avatar: "/intern3.jpg",
    university: "Đại học Mỹ Thuật",
    skills: ["Figma"],
  },
  {
    id: "i4",
    name: "Phạm Văn L",
    position: "Data Analyst",
    avatar: "/intern4.jpg",
    university: "Đại học Kinh Tế",
    skills: ["Python"],
  },
  {
    id: "i5",
    name: "Hoàng Văn M",
    position: "Mobile Developer",
    avatar: "/intern5.jpg",
    university: "Đại học Giao Thông Vận Tải",
    skills: ["Flutter"],
  },
  {
    id: "i6",
    name: "Đặng Thị N",
    position: "Tester",
    avatar: "/intern6.jpg",
    university: "Đại học FPT",
    skills: ["Selenium"],
  },
  {
    id: "i7",
    name: "Nguyễn Văn O",
    position: "DevOps Intern",
    avatar: "/intern7.jpg",
    university: "Đại học Công Nghiệp",
    skills: ["Docker"],
  },
  {
    id: "i8",
    name: "Trịnh Thị P",
    position: "Business Analyst",
    avatar: "/intern8.jpg",
    university: "Đại học Ngoại Thương",
    skills: ["Excel"],
  },
  {
    id: "i9",
    name: "Bùi Văn Q",
    position: "AI Engineer",
    avatar: "/intern9.jpg",
    university: "Đại học Bách Khoa Hà Nội",
    skills: ["TensorFlow"],
  },
  {
    id: "i10",
    name: "Lý Thị R",
    position: "Marketing Intern",
    avatar: "/intern10.jpg",
    university: "Đại học Kinh Tế Quốc Dân",
    skills: ["Content Writing"],
  },
];

const philosophies = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Khách hàng là trung tâm",
    description:
      "Chúng tôi luôn đặt lợi ích và sự hài lòng của khách hàng lên hàng đầu trong mọi quyết định và hành động.",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    borderColor: "border-emerald-500/30",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Chất lượng vượt trội",
    description:
      "Cam kết cung cấp sản phẩm và dịch vụ với chất lượng cao nhất, không ngừng cải tiến và hoàn thiện.",
    gradient: "from-teal-500 to-emerald-600",
    bgGradient: "from-teal-500/10 to-emerald-600/10",
    borderColor: "border-teal-500/30",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Đổi mới sáng tạo",
    description:
      "Luôn khuyến khích tinh thần đổi mới, sáng tạo và áp dụng công nghệ tiên tiến vào công việc.",
    gradient: "from-emerald-600 to-teal-600",
    bgGradient: "from-emerald-600/10 to-teal-600/10",
    borderColor: "border-emerald-600/30",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Trách nhiệm xã hội",
    description:
      "Đóng góp tích cực cho cộng đồng và phát triển bền vững, tạo ra giá trị cho xã hội.",
    gradient: "from-teal-600 to-emerald-500",
    bgGradient: "from-teal-600/10 to-emerald-500/10",
    borderColor: "border-teal-600/30",
  },
];

const coreValues = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Sáng tạo",
    description: "Tư duy sáng tạo trong mọi giải pháp",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Hiệu quả",
    description: "Tập trung vào kết quả và hiệu suất",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Tận tâm",
    description: "Chăm sóc khách hàng và đồng nghiệp",
  },
];

const shortTermGoals = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Tăng trưởng doanh thu",
    description: "Đạt mức tăng trưởng 30% trong năm 2025",
    timeline: "2025",
    progress: 75,
    status: "Đang thực hiện",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Mở rộng đội ngũ",
    description: "Tuyển dụng thêm 20 nhân viên chất lượng cao",
    timeline: "Q2-Q4 2025",
    progress: 60,
    status: "Đang thực hiện",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Ra mắt sản phẩm mới",
    description: "Phát triển và triển khai 3 tính năng mới",
    timeline: "Q3 2025",
    progress: 40,
    status: "Lên kế hoạch",
  },
];

const longTermGoals = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Mở rộng thị trường",
    description: "Phát triển ra thị trường khu vực Đông Nam Á",
    timeline: "2025-2026",
    status: "Tương lai",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Trở thành leader",
    description: "Trở thành công ty hàng đầu trong lĩnh vực FinTech",
    timeline: "2027",
    status: "Tầm nhìn",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Đầu tư R&D",
    description: "Đầu tư 20% doanh thu vào nghiên cứu và phát triển",
    timeline: "2025-2030",
    status: "Chiến lược",
  },
];

const milestones = [
  { year: "2025", title: "Tăng trưởng mạnh", achieved: false },
  { year: "2026", title: "Mở rộng khu vực", achieved: false },
  { year: "2028", title: "Dẫn đầu thị trường", achieved: false },
  { year: "2030", title: "Tầm nhìn dài hạn", achieved: false },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Đang thực hiện":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/50";
    case "Lên kế hoạch":
      return "bg-teal-500/20 text-teal-300 border-teal-500/50";
    case "Tương lai":
      return "bg-emerald-600/20 text-emerald-300 border-emerald-600/50";
    case "Tầm nhìn":
      return "bg-teal-600/20 text-teal-300 border-teal-600/50";
    case "Chiến lược":
      return "bg-emerald-700/20 text-emerald-300 border-emerald-700/50";
    default:
      return "bg-slate-500/20 text-slate-300 border-slate-500/50";
  }
};

export default function TeamPage() {
  const [isChartLoaded, setIsChartLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const prevIntern = () => {
    setActiveIndex((prev) => (prev === 0 ? interns.length - 1 : prev - 1));
  };

  const nextIntern = () => {
    setActiveIndex((prev) => (prev === interns.length - 1 ? 0 : prev + 1));
  };

  const prevIndex = activeIndex === 0 ? interns.length - 1 : activeIndex - 1;
  const nextIndex = activeIndex === interns.length - 1 ? 0 : activeIndex + 1;

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#0A192F] text-white pt-30 relative overflow-hidden">
      {/* HeroBanner Section */}
      <section className="relative z-10 text-center">
        <section className="relative w-full py-20 px-4 bg-[#0a192f] text-white overflow-hidden">
          <div className="max-w-6xl mx-auto text-center z-10 relative">
            <h1
              className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
              data-aos="fade-up"
            >
              Đội ngũ{" "}
              <span className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text">
                TOGOGO
              </span>
            </h1>
            <p
              className="text-lg text-slate-300 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Khám phá cơ cấu tổ chức và những con người đứng sau sự vận hành và
              phát triển của TOGOGO. Mỗi vị trí là một mắt xích quan trọng trong
              hành trình tạo ra giá trị bền vững.
            </p>
          </div>
        </section>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E5A1]/20 to-[#4079ff]/20 rounded-full blur-[50px] transform scale-110"></div>
      </section>
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Top semi-circle background */}
        <div className="absolute w-[1600px] h-[1600px] rounded-full border border-[#64FFDA]/10 top-0 left-1/2 -translate-x-1/2 -translate-y-[65%]"></div>
        <div className="absolute w-[1400px] h-[1400px] rounded-full border border-[#64FFDA]/10 top-0 left-1/2 -translate-x-1/2 -translate-y-[65%]"></div>
        <div className="absolute w-[1200px] h-[1200px] rounded-full border border-[#64FFDA]/10 top-0 left-1/2 -translate-x-1/2 -translate-y-[65%]"></div>
        <div className="absolute w-[1000px] h-[1000px] rounded-full border border-[#64FFDA]/10 top-0 left-1/2 -translate-x-1/2 -translate-y-[65%]"></div>
        <div className="absolute w-[800px] h-[800px] rounded-full border border-[#64FFDA]/10 top-0 left-1/2 -translate-x-1/2 -translate-y-[65%]"></div>

        {/* Bottom semi-circle background */}
        <div className="absolute w-[1600px] h-[1600px] rounded-full border border-[#64FFDA]/10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[65%]"></div>
        <div className="absolute w-[1400px] h-[1400px] rounded-full border border-[#64FFDA]/10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[65%]"></div>
        <div className="absolute w-[1200px] h-[1200px] rounded-full border border-[#64FFDA]/10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[65%]"></div>
        <div className="absolute w-[1000px] h-[1000px] rounded-full border border-[#64FFDA]/10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[65%]"></div>
        <div className="absolute w-[800px] h-[800px] rounded-full border border-[#64FFDA]/10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[65%]"></div>
      </div>
      {/* Bọc component trong Suspense để hiển thị fallback UI trong khi tải */}
      <Suspense
        fallback={<div className="text-center p-10">Đang tải sơ đồ...</div>}
      >
        <OrganizationChart onLoaded={() => setIsChartLoaded(true)} />
      </Suspense>

      {isChartLoaded && (
        <Fragment>
          <section className="relative z-0 p-12 mb-12 w-full overflow-visible">
            <div className="absolute inset-0 bg-[#112240] opacity-50 z-0"></div>
            <div className="w-full mx-auto relative z-10 text-center">
              <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">
                Thực Tập Sinh <span className="text-[#64FFDA]">Của TOGOGO</span>
              </h2>
              <p
                className="text-[#8892B0] max-w-2xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Những tài năng trẻ đang phát triển cùng công ty
              </p>
            </div>

            <div
              className="relative mt-8 w-full max-w-6xl mx-auto h-[420px] flex items-center justify-center"
              data-aos="fade-up"
            >
              {/* Previous Card */}
              <motion.div
                key={interns[prevIndex].id + "-prev"}
                className="absolute left-[45%] transform -translate-x-[150%] z-10 opacity-50 scale-90"
                initial={{ opacity: 0, scale: 0.8, x: -50 }}
                animate={{ opacity: 0.5, scale: 0.9, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -50 }}
              >
                <InternCard
                  intern={interns[prevIndex]}
                  onClick={() => setActiveIndex(prevIndex)}
                  isPreview
                />
              </motion.div>

              {/* Active Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={interns[activeIndex].id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="z-20"
                >
                  <InternCard
                    intern={interns[activeIndex]}
                    onClick={() => {}}
                    isActive
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next Card */}
              <motion.div
                key={interns[nextIndex].id + "-next"}
                className="absolute right-[45%] transform translate-x-[150%] z-10 opacity-50 scale-90"
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 0.5, scale: 0.9, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 50 }}
              >
                <InternCard
                  intern={interns[nextIndex]}
                  onClick={() => setActiveIndex(nextIndex)}
                  isPreview
                />
              </motion.div>

              {/* Navigation Arrows */}

              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0A192F] rounded-full flex items-center justify-center border border-[#233554] hover:border-[#64FFDA] transition-colors text-[#64FFDA] z-20 shadow-lg size-6"
                onClick={prevIntern}
                title="Previous intern"
                aria-label="Previous intern"
                data-aos="fade-right"
              >
                <ChevronLeftIcon />
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0A192F] rounded-full flex items-center justify-center border border-[#233554] hover:border-[#64FFDA] transition-colors text-[#64FFDA] z-20 shadow-lg"
                onClick={nextIntern}
                title="Next intern"
                aria-label="Next intern"
                data-aos="fade-left"
              >
                <ChevronRightIcon />
              </button>
            </div>

            <div className="flex justify-center items-center gap-3 mt-8 relative z-10">
              {interns.map((_, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 hover:bg-[#64FFDA]/50 rounded-full ${
                    index === activeIndex
                      ? "bg-[#64FFDA] w-4 h-4"
                      : "bg-[#233554] w-3 h-3"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </section>
          <section className="relative z-0 py-6 px-12 mb-12 w-full overflow-visible">
            <div className="w-full mx-auto relative z-10 text-center">
              <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">
                Triết lý <span className="text-[#64FFDA]">Của TOGOGO</span>
              </h2>
              <p
                className="text-[#8892B0] max-w-2xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Những giá trị cốt lõi định hướng mọi hoạt động của công ty
              </p>
            </div>
            <div className="p-8">
              {/* Main Philosophy Cards */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {philosophies.map((philosophy, index) => (
                  <div
                    key={index}
                    className="group relative"
                    data-aos="fade-up"
                    data-aos-delay={`${index * 100}`}
                  >
                    <div
                      className={`relative z-10 p-8 rounded-2xl border-2 ${philosophy.borderColor} bg-gradient-to-br ${philosophy.bgGradient}backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-hover:border-opacity-100 bg-slate-800/30 h-full`}
                    >
                      {/* Icon */}
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${philosophy.gradient} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {philosophy.icon}
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-slate-100 transition-colors">
                          {philosophy.title}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {philosophy.description}
                        </p>
                      </div>

                      {/* Decorative element */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-xl"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Values Section */}
              <div className="relative">
                <div className="text-center mb-8" data-aos="fade-up">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Giá trị cốt lõi
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {coreValues.map((value, index) => (
                    <div
                      key={index}
                      className="text-center p-6 bg-slate-800/60 rounded-xl border border-slate-700/50 hover:shadow-lg hover:shadow-slate-500/20 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                      data-aos="fade-up"
                      data-aos-delay={`${index * 100}`}
                    >
                      <div className="inline-flex p-3 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl mb-4">
                        <div className="text-emerald-400">{value.icon}</div>
                      </div>
                      <h4 className="font-semibold text-white mb-2">
                        {value.title}
                      </h4>
                      <p className="text-sm text-slate-300">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission Statement */}
              <div className="relative" data-aos="fade-up">
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">Sứ mệnh</h3>
                    </div>
                    <p className="text-lg leading-relaxed text-white/95 italic">
                      &quot;Đem đến giải pháp công nghệ giúp nhà đầu tư tối ưu
                      hiệu quả giao dịch, giảm thiểu rủi ro và tiết kiệm thời
                      gian thông qua các bot giao dịch tự động.&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div
                  className="text-center p-6 bg-slate-800/60 rounded-xl border border-slate-700/50 backdrop-blur-sm"
                  data-aos="fade-up"
                >
                  <div className="text-3xl font-bold text-emerald-400 mb-2">
                    5+
                  </div>
                  <div className="text-sm text-slate-300">Năm kinh nghiệm</div>
                </div>
                <div
                  className="text-center p-6 bg-slate-800/60 rounded-xl border border-slate-700/50 backdrop-blur-sm"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="text-3xl font-bold text-teal-400 mb-2">
                    1000+
                  </div>
                  <div className="text-sm text-slate-300">
                    Khách hàng tin tưởng
                  </div>
                </div>
                <div
                  className="text-center p-6 bg-slate-800/60 rounded-xl border border-slate-700/50 backdrop-blur-sm"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    99%
                  </div>
                  <div className="text-sm text-slate-300">Mức độ hài lòng</div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative z-0 p-12 pb-18 w-full overflow-visible">
            <div className="absolute inset-0 bg-[#112240] opacity-50 z-0"></div>
            <div className="w-full mx-auto relative z-10 text-center">
              <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">
                Mục Tiêu <span className="text-[#64FFDA]">Của TOGOGO</span>
              </h2>
              <p
                className="text-[#8892B0] max-w-2xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Định hướng phát triển ngắn hạn và dài hạn
              </p>
            </div>

            <div className="p-8 relative z-10">
              {/* Timeline Milestones */}
              <div className="mb-12">
                <h3
                  className="text-xl font-semibold text-center mb-8 text-white"
                  data-aos="fade-up"
                >
                  Cột mốc phát triển
                </h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute top-6 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30"></div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="relative"
                        data-aos="fade-up"
                        data-aos-delay={`${index * 100}`}
                      >
                        <div className="bg-slate-800/60 rounded-xl p-4 border-2 border-slate-700/50 hover:border-emerald-500/50 transition-colors text-center backdrop-blur-sm">
                          <div
                            className={`w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center ${
                              milestone.achieved
                                ? "bg-emerald-500"
                                : "bg-gradient-to-r from-emerald-500 to-teal-500"
                            }`}
                          >
                            {milestone.achieved ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <div className="font-semibold text-white mb-1">
                            {milestone.year}
                          </div>
                          <div className="text-xs text-slate-300">
                            {milestone.title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Short-term Goals */}
              <div className="mb-12">
                <div
                  className="flex items-center gap-3 mb-8"
                  data-aos="fade-up"
                >
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Mục tiêu ngắn hạn
                    </h3>
                    <p className="text-sm text-slate-300">Kế hoạch năm 2025</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {shortTermGoals.map((goal, index) => (
                    <div
                      key={index}
                      className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/50 hover:shadow-xl hover:shadow-slate-500/20 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden backdrop-blur-sm"
                      data-aos="fade-up"
                      data-aos-delay={`${index * 100}`}
                    >
                      {/* Progress indicator */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-slate-700/50">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>

                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl">
                          <div className="text-emerald-400">{goal.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">
                            {goal.title}
                          </h4>
                          <Badge
                            className={`text-xs border ${getStatusColor(
                              goal.status
                            )}`}
                          >
                            {goal.status}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                        {goal.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-400">
                            {goal.timeline}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-emerald-400">
                          {goal.progress}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Long-term Goals */}
              <div className="mb-12">
                <div
                  className="flex items-center gap-3 mb-8"
                  data-aos="fade-up"
                >
                  <div className="p-2 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Mục tiêu dài hạn
                    </h3>
                    <p className="text-sm text-slate-300">Tầm nhìn 2025-2030</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {longTermGoals.map((goal, index) => (
                    <div
                      key={index}
                      className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/50 hover:shadow-xl hover:shadow-slate-500/20 transition-all duration-300 hover:-translate-y-1 relative backdrop-blur-sm"
                      data-aos="fade-up"
                      data-aos-delay={`${index * 100}`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-r from-teal-500/20 to-emerald-600/20 rounded-xl">
                          <div className="text-teal-400">{goal.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">
                            {goal.title}
                          </h4>
                          <Badge
                            className={`text-xs border ${getStatusColor(
                              goal.status
                            )}`}
                          >
                            {goal.status}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                        {goal.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-400">
                            {goal.timeline}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-teal-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision Statement */}
              <div className="relative" data-aos="fade-up">
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden">
                  {/* Background elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-white/20 rounded-xl">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold">
                          Tầm nhìn 2030
                        </h3>
                        <p className="text-white/80">Hướng tới tương lai</p>
                      </div>
                    </div>

                    <p className="text-lg leading-relaxed text-white/95 mb-6">
                      &quot;Trở thành công ty công nghệ tài chính hàng đầu tại
                      Việt Nam và khu vực, với hơn 1 triệu người dùng, đóng góp
                      tích cực vào sự phát triển của thị trường tài chính
                      số.&quot;
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold mb-1">1M+</div>
                        <div className="text-sm text-white/80">Người dùng</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold mb-1">#1</div>
                        <div className="text-sm text-white/80">Thị trường</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold mb-1">10+</div>
                        <div className="text-sm text-white/80">Quốc gia</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </main>
  );
}
