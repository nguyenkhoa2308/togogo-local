"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Intern } from "../../types";
import InternCard from "../cards/InternCard";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

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

export default function InternSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevIntern = () => {
    setActiveIndex((prev) => (prev === 0 ? interns.length - 1 : prev - 1));
  };

  const nextIntern = () => {
    setActiveIndex((prev) => (prev === interns.length - 1 ? 0 : prev + 1));
  };

  const prevIndex = activeIndex === 0 ? interns.length - 1 : activeIndex - 1;
  const nextIndex = activeIndex === interns.length - 1 ? 0 : activeIndex + 1;

  return (
    <section className="relative z-0 p-12 pb-48 mb-24 w-full overflow-visible">
      <div className="absolute inset-0 bg-[#112240] opacity-50 z-0 p-12 mb-24"></div>
      <div
        className="w-full mx-auto relative z-10 text-center"
        data-aos="fade-up"
      >
        <h2 className="text-4xl font-bold mb-4">
          Thực Tập Sinh <span className="text-[#64FFDA]">Của TOGOGO</span>
        </h2>
        <p className="text-[#8892B0] max-w-2xl mx-auto">
          Những tài năng trẻ đang phát triển cùng công ty
        </p>
      </div>

      <div className="relative mt-8 w-full max-w-6xl mx-auto h-[420px] flex items-center justify-center">
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
  );
}
