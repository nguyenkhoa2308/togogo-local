"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faRobot,
  faServer,
  faUsers,
  faCoins,
  faChartBar,
  faShieldAlt,
  faLightbulb,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
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
];

// Stats Icons
const StatsIcon = ({ children }: { children: React.ReactNode }) => (
  <svg
    className="w-8 h-8 text-[#00E5A1]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {children}
  </svg>
);

const StatsItem = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: React.ReactNode;
}) => (
  <div className="flex items-start gap-2" data-aos="fade-right">
    {icon}
    <div>
      <div className="text-xl font-bold text-[#00E5A1]">{value}</div>
      <div className="text-xs text-white/70">{label}</div>
    </div>
  </div>
);

const BotCard = ({ id, image, tag, title, name, description }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-[#122042] rounded-lg overflow-hidden border border-[#233554] hover:border-[#00E5A1] transition-all h-full"
      data-aos="fade-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden bg-[#0A1529] flex items-center justify-center">
        <div
          className={`text-5xl text-[#00E5A1] transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        >
          <FontAwesomeIcon icon={faRobot} />
        </div>
        <div className="absolute top-2 left-2 bg-[#1a2b4b] text-[#00E5A1] text-xs font-medium px-2 py-1 rounded">
          {tag}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-white/70 mb-4 text-sm">{name}</p>
        <ul className="space-y-2 mb-6">
          {description.map((desc: string, idx: number) => (
            <li key={idx} className="text-xs text-white/60 flex">
              <span className="text-[#00E5A1] mr-2">›</span>
              {desc}
            </li>
          ))}
        </ul>
        <Link href={`/bots/${id}`} className="block w-full">
          <ShinyButton className="bg-[#00E5A1] hover:bg-[#00D194] text-[#0A1529] py-2 rounded text-center font-medium w-full">
            Xem chi tiết
          </ShinyButton>
        </Link>
      </div>
    </div>
  );
};

// Component cho các khối tính năng
const FeaturesCard = ({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) => (
  <div
    data-aos="fade-up"
    data-aos-delay={delay}
    className="bg-[#0F1A33] rounded-lg p-6 border border-[#233554] hover:border-[#00E5A1] transition-colors shadow-lg hover-float"
  >
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-[#0A1529] to-[#1a2b4b] rounded-full flex items-center justify-center mb-4 border border-[#00E5A1]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </div>
);

// Component cho các card đội ngũ
const TeamMemberCard = ({
  name,
  position,
  imageUrl,
  delay = 0,
}: {
  name: string;
  position: string;
  imageUrl: string;
  delay?: number;
}) => (
  <div
    data-aos="fade-up"
    data-aos-delay={delay}
    className="bg-[#0F1A33] border border-[#233554] rounded-lg overflow-hidden hover:border-[#00E5A1] transition-colors shadow-lg hover-float"
  >
    <div className="h-48 overflow-hidden bg-[#0A1529] flex items-center justify-center">
      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4 text-center">
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="text-[#00E5A1] text-sm">{position}</p>
    </div>
  </div>
);

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="bg-[#0A1529] text-white pt-24 md:pt-32 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-b from-[#0A1529] via-[#122042] to-[#1a2b4b] rounded-b-[40px] relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5A1]/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4079ff]/10 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              {/* Left Content */}
              <div className="w-full md:w-1/2 mb-10 md:mb-0" data-aos="fade-up">
                <div className="inline-block" data-aos="fade-up">
                  <div className="rounded-full border border-[#00E5A1]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-4">
                    <span className="text-[#00E5A1] font-medium tracking-wide text-lg">
                      CHỨNG KHOÁN PHÁI SINH
                    </span>
                  </div>
                </div>

                <h1
                  className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gradient"
                  data-aos="fade-up"
                >
                  Nền Tảng
                  <br />
                  Giao Dịch Đột Phá
                  <br />
                  Không Giới Hạn
                </h1>

                <div className="mb-8" data-aos="fade-up">
                  <ShinyButton className="bg-[#00E5A1] hover:bg-[#00D194] text-[#0A1529] py-3 px-8 rounded-full font-bold glow-teal">
                    Bắt đầu ngay
                  </ShinyButton>
                </div>

                <div
                  className="backdrop-blur-sm rounded-lg p-4 bg-gradient-to-r from-[#122042]/80 to-[#1a2b4b]/80 w-full md:w-3/4 relative mb-8"
                  data-aos="fade-up"
                >
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-2xl font-semibold text-[#00E5A1]">
                        Cùng trải nghiệm
                      </h3>
                      <p className="text-sm mt-1 text-white/90">
                        Thị trường chứng khoán phái sinh hiện đại
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-[#1a2b4b]/70 hover:bg-[#1a2b4b] transition-colors p-3 rounded-lg text-center">
                        <div className="text-[#00E5A1] text-3xl mb-1">
                          <FontAwesomeIcon icon={faChartLine} />
                        </div>
                        <span className="text-xs text-white/90">
                          Phân tích thị trường
                        </span>
                      </div>
                      <div className="bg-[#1a2b4b]/70 hover:bg-[#1a2b4b] transition-colors p-3 rounded-lg text-center">
                        <div className="text-[#00E5A1] text-3xl mb-1">
                          <FontAwesomeIcon icon={faRobot} />
                        </div>
                        <span className="text-xs text-white/90">
                          Bot tự động
                        </span>
                      </div>
                      <div className="bg-[#1a2b4b]/70 hover:bg-[#1a2b4b] transition-colors p-3 rounded-lg text-center">
                        <div className="text-[#00E5A1] text-3xl mb-1">
                          <FontAwesomeIcon icon={faShieldAlt} />
                        </div>
                        <span className="text-xs text-white/90">
                          Bảo mật cao
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="py-6 text-white">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <StatsItem
                        icon={
                          <StatsIcon>
                            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 14.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5Z" />
                          </StatsIcon>
                        }
                        value="1.82M"
                        label={
                          <>
                            Tài khoản <br /> giao dịch
                          </>
                        }
                      />
                    </div>

                    <div className="col-span-1">
                      <StatsItem
                        icon={
                          <StatsIcon>
                            <path d="m19.33 5.681-6.27-3.38c-.66-.36-1.46-.36-2.12 0l-6.27 3.38c-.46.25-.74.73-.74 1.28 0 .54.28 1.03.74 1.28l6.27 3.38c.33.18.7.27 1.06.27.36 0 .73-.09 1.06-.27l6.27-3.38c.46-.25.74-.73.74-1.28s-.28-1.03-.74-1.28Z" />
                          </StatsIcon>
                        }
                        value="30 công ty"
                        label={
                          <>
                            Hàng đầu
                            <br />
                            tại Việt Nam
                          </>
                        }
                      />
                    </div>

                    <div className="col-span-1">
                      <StatsItem
                        icon={
                          <StatsIcon>
                            <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2Z" />
                          </StatsIcon>
                        }
                        value="213.977"
                        label={
                          <>
                            Khối lượng
                            <br />
                            giao dịch
                          </>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content (Image) */}
              <div
                className="w-full md:w-1/2 flex justify-center"
                data-aos="zoom-in"
              >
                <div className="relative w-full h-auto max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00E5A1]/20 to-[#4079ff]/20 rounded-full blur-[50px] transform scale-110"></div>
                  <Image
                    src="/images/pig.png"
                    alt="Trading Robot"
                    width={500}
                    height={500}
                    className="w-full h-auto animate-float relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Logo Section */}
      {/* Partners Logo Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div data-aos="fade-right" className="w-full sm:w-5/12 text-center">
              <div className="bg-[#122042]/80 border border-[#233554] rounded-lg p-6">
                <div className="flex justify-center items-center h-12 md:h-16">
                  <img
                    src="/images/logo-DNSE.png" // Đường dẫn tới ảnh logo DNSE
                    alt="DNSE Logo"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="text-white/70 text-sm mt-2">
                  Đối tác chứng khoán
                </p>
              </div>
            </div>
            <div data-aos="fade-left" className="w-full sm:w-5/12 text-center">
              <div className="bg-[#122042]/80 border border-[#233554] rounded-lg p-6">
                <div className="flex justify-center items-center h-12 md:h-16">
                  <img
                    src="/images/togogo_logo.png" // Đường dẫn tới ảnh logo TOGO
                    alt="TOGO Logo"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="text-white/70 text-sm mt-2">
                  Công nghệ giao dịch
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Section */}
      <section className="bg-gradient-to-t from-[#0A1529] to-[#1a2b4b] rounded-[40px] py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Giao dịch tự động với Togogo
            </h2>
            <p className="text-base md:text-lg mx-auto max-w-3xl leading-relaxed text-white/80">
              Biến đổi khoản đầu tư của bạn bằng các công cụ và bot giao dịch
              tiên tiến của chúng tôi, được xây dựng dựa trên nhiều năm nghiên
              cứu các thuật toán chiến lược tiên tiến. Đầu tư chưa bao giờ dễ
              dàng và dễ tiếp cận đến thế với mọi người.
            </p>
          </div>

          <div data-aos="zoom-in" className="max-w-[500px] mx-auto my-10">
            <div className="relative h-[300px] w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E5A1]/20 to-[#4079ff]/20 rounded-full blur-[80px]"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="text-8xl text-[#00E5A1]">
                  <FontAwesomeIcon icon={faRobot} />
                </div>
              </div>
            </div>
          </div>

          <div
            data-aos="fade-up"
            className="max-w-[800px] mx-auto mt-10 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-white">
              Nhưng điều tốt nhất vẫn chưa đến...
            </h3>
            <p className="text-sm md:text-base text-white/80">
              Hệ sinh thái của chúng ta còn nhiều điều tuyệt vời hơn thế nữa.
            </p>
          </div>
        </div>
      </section>

      {/* Bot Trading Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div data-aos="fade-up" className="text-center">
              <div className="inline-block rounded-full border border-[#00E5A1]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-4">
                <span className="text-[#00E5A1] font-medium tracking-wide text-lg">
                  BOT GIAO DỊCH
                </span>
              </div>
            </div>

            <h2
              data-aos="fade-up"
              className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text mb-6"
            >
              Bot giao dịch của chúng tôi
            </h2>
          </div>

          <div
            data-aos="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {botsData.map((bot) => (
              <BotCard key={bot.id} {...bot} />
            ))}
          </div>

          <div className="text-center mt-12" data-aos="fade-up">
            <Link
              href="/bots"
              className="inline-block border border-[#00E5A1] text-[#00E5A1] px-8 py-3 rounded-full hover:bg-[#00E5A1]/10 transition-colors"
            >
              Xem tất cả Bot
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0A1529]">
        <div className="max-w-7xl mx-auto px-4">
          <div data-aos="fade-up" className="text-center mb-16">
            <div className="inline-block rounded-full border border-[#00E5A1]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-4">
              <span className="text-[#00E5A1] font-medium tracking-wide text-lg">
                TÍNH NĂNG NỔI BẬT
              </span>
            </div>
            <h2
              data-aos="fade-up"
              className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text mb-6"
            >
              Các tính năng nổi bật
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              TOGOGO cung cấp đa dạng các giải pháp bot giao dịch phù hợp với
              mọi nhu cầu từ nhà đầu tư cá nhân đến tổ chức
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <FeaturesCard
              icon={
                <FontAwesomeIcon
                  icon={faChartLine}
                  size="lg"
                  className="text-[#00E5A1]"
                />
              }
              title="Trải nghiệm người dùng tối ưu"
              description="Cung cấp giao diện trực quan, dễ sử dụng, phù hợp với mọi nhà giao dịch từ cơ bản đến chuyên nghiệp."
              delay={100}
            />

            <FeaturesCard
              icon={
                <FontAwesomeIcon
                  icon={faServer}
                  size="lg"
                  className="text-[#00E5A1]"
                />
              }
              title="Hệ sinh thái giao dịch đa dạng"
              description="Kết nối với nhiều sàn giao dịch, hỗ trợ phân tích Forex, chứng khoán, crypto và hàng hóa."
              delay={200}
            />

            <FeaturesCard
              icon={
                <FontAwesomeIcon
                  icon={faChartBar}
                  size="lg"
                  className="text-[#00E5A1]"
                />
              }
              title="Dịch vụ phân tích toàn diện"
              description="Cung cấp hàng trăm chỉ báo kỹ thuật, công cụ và biểu đồ nâng cao và dữ liệu thị trường theo thời gian thực."
              delay={300}
            />

            <FeaturesCard
              icon={
                <FontAwesomeIcon
                  icon={faLightbulb}
                  size="lg"
                  className="text-[#00E5A1]"
                />
              }
              title="Tích hợp trí tuệ nhân tạo (AI)"
              description="Sử dụng công nghệ AI để tối ưu hóa chiến lược giao dịch và dự báo xu hướng thị trường."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-gradient-to-t from-[#0A1529] to-[#122042]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div data-aos="fade-up" className="text-center">
              <div className="inline-block rounded-full border border-[#00E5A1]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-4">
                <span className="text-[#00E5A1] font-medium tracking-wide text-lg">
                  SỨ MỆNH CỦA CHÚNG TÔI
                </span>
              </div>
            </div>

            <h2
              data-aos="fade-up"
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Định hình tương lai{" "}
              <span className="text-[#00E5A1]">giao dịch tự động</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-300 mb-12">
              Chúng tôi cam kết mang đến cho người dùng những trải nghiệm giao
              dịch tốt nhất và hiệu quả nhất thông qua các giải pháp công nghệ
              tiên tiến.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-[#0F1A33] rounded-lg p-6 border border-[#233554] hover:border-[#00E5A1] transition-colors shadow-lg hover-float"
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 bg-[#00E5A1]/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-[#00E5A1] font-bold">01</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Đổi mới
                </h3>
                <p className="text-gray-400 text-sm flex-grow">
                  Không ngừng phát triển và cải tiến các công nghệ giao dịch tài
                  chính, tạo ra những giải pháp đột phá cho thị trường.
                </p>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-[#0F1A33] rounded-lg p-6 border border-[#233554] hover:border-[#00E5A1] transition-colors shadow-lg hover-float"
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 bg-[#00E5A1]/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-[#00E5A1] font-bold">02</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Tin cậy
                </h3>
                <p className="text-gray-400 text-sm flex-grow">
                  Xây dựng niềm tin với khách hàng thông qua sự minh bạch, bảo
                  mật và độ ổn định của hệ thống giao dịch.
                </p>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-[#0F1A33] rounded-lg p-6 border border-[#233554] hover:border-[#00E5A1] transition-colors shadow-lg hover-float"
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 bg-[#00E5A1]/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-[#00E5A1] font-bold">03</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Trao quyền
                </h3>
                <p className="text-gray-400 text-sm flex-grow">
                  Giúp nhà đầu tư ở mọi cấp độ tiếp cận và sử dụng được công
                  nghệ giao dịch tiên tiến một cách dễ dàng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Goals Section */}
      <section className="py-20 bg-[#0A1529]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div data-aos="fade-up" className="text-center">
              <div className="inline-block rounded-full border border-[#00E5A1]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-4">
                <span className="text-[#00E5A1] font-medium tracking-wide text-lg">
                  MỤC TIÊU KINH DOANH
                </span>
              </div>
            </div>

            <h2
              data-aos="fade-up"
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Chiến lược{" "}
              <span className="text-[#00E5A1]">phát triển bền vững</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-300 mb-12">
              Chúng tôi xây dựng lộ trình phát triển dựa trên các giá trị cốt
              lõi và định hướng thị trường.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              data-aos="fade-right"
              className="bg-[#0F1A33] rounded-lg p-6 border border-[#233554] hover:border-[#00E5A1] transition-colors shadow-lg hover-float"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0A1529] to-[#1a2b4b] rounded-full flex items-center justify-center shrink-0 border border-[#00E5A1]">
                  <FontAwesomeIcon
                    icon={faUsers}
                    size="lg"
                    className="text-[#00E5A1]"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Mở rộng cộng đồng
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Phát triển cộng đồng người dùng với đa dạng nhu cầu, từ nhà
                    đầu tư cá nhân đến tổ chức tài chính lớn, xây dựng một hệ
                    sinh thái giao dịch hoàn chỉnh.
                  </p>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-left"
              className="bg-[#0F1A33] rounded-lg p-6 border border-[#233554] hover:border-[#00E5A1] transition-colors shadow-lg hover-float"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0A1529] to-[#1a2b4b] rounded-full flex items-center justify-center shrink-0 border border-[#00E5A1]">
                  <FontAwesomeIcon
                    icon={faCoins}
                    size="lg"
                    className="text-[#00E5A1]"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Tối ưu hiệu suất đầu tư
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Nâng cao hiệu suất đầu tư cho người dùng thông qua việc liên
                    tục cải tiến các thuật toán giao dịch và chiến lược quản lý
                    rủi ro.
                  </p>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-right"
              className="bg-[#0F1A33] rounded-lg p-6 border border-[#233554] hover:border-[#00E5A1] transition-colors shadow-lg hover-float"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0A1529] to-[#1a2b4b] rounded-full flex items-center justify-center shrink-0 border border-[#00E5A1]">
                  <FontAwesomeIcon
                    icon={faServer}
                    size="lg"
                    className="text-[#00E5A1]"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Mở rộng hệ sinh thái
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Phát triển hệ sinh thái giao dịch đa dạng, kết nối với nhiều
                    sàn giao dịch và cung cấp nhiều loại sản phẩm tài chính khác
                    nhau.
                  </p>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-left"
              className="bg-[#0F1A33] rounded-lg p-6 border border-[#233554] hover:border-[#00E5A1] transition-colors shadow-lg hover-float"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0A1529] to-[#1a2b4b] rounded-full flex items-center justify-center shrink-0 border border-[#00E5A1]">
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    size="lg"
                    className="text-[#00E5A1]"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Nghiên cứu và phát triển
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Đầu tư vào R&D để liên tục cải tiến công nghệ giao dịch,
                    tích hợp các kỹ thuật AI và học máy tiên tiến nhất.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Bottom CTA Section */}
      <section className="rounded-[40px] bg-gradient-to-b from-[#0A1529] to-[#1a2b4b] text-center py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div data-aos="fade-right" className="text-left md:order-1 order-2">
              <h3 className="text-4xl font-bold mb-6 text-white">
                <span className="text-[#00E5A1]">Trải nghiệm hệ thống</span>
                <br />
                giao dịch Togogo
              </h3>
              <p className="text-white/80 mb-8 text-lg">
                Hãy bắt đầu ngay hôm nay và khám phá sức mạnh của tự động hóa
                giao dịch cùng Togogo
              </p>
              <div className="flex flex-wrap gap-4">
                <ShinyButton className="bg-[#00E5A1] hover:bg-[#00D194] text-[#0A1529] py-3 px-8 rounded-full font-bold">
                  Đăng ký ngay
                </ShinyButton>
                <Link
                  href="/bots"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-8 rounded-full font-medium transition-all"
                >
                  Tìm hiểu thêm
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="bg-[#122042]/50 border border-[#233554] rounded-lg p-4 backdrop-blur-sm">
                  <div className="font-bold text-2xl text-[#00E5A1]">24/7</div>
                  <div className="text-white/70 text-sm">Hỗ trợ liên tục</div>
                </div>
                <div className="bg-[#122042]/50 border border-[#233554] rounded-lg p-4 backdrop-blur-sm">
                  <div className="font-bold text-2xl text-[#00E5A1]">99.9%</div>
                  <div className="text-white/70 text-sm">Uptime hệ thống</div>
                </div>
              </div>
            </div>

            <div data-aos="zoom-in" className="md:order-2 order-1 relative">
              <div className="relative z-10 bg-[#0A1529]/80 backdrop-blur-sm p-6 rounded-lg border border-[#233554] shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-semibold text-white">
                    TOGOGO Trading Platform
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>

                <div className="h-60 w-full relative">
                  {/* Chart background grid */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

                  {/* Chart line */}
                  <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#00E5A1]/20 to-transparent"></div>
                    <svg
                      className="absolute bottom-0 left-0 w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,100 L20,90 L40,95 L60,80 L80,85 L100,70 L120,75 L140,60 L160,50 L180,55 L200,40 L220,45 L240,35 L260,40 L280,25 L300,30 L320,20 L340,15 L360,25 L380,10 L400,0"
                        fill="none"
                        stroke="#00E5A1"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        style={{ transform: "scaleY(1) translateY(20%)" }}
                      />
                    </svg>
                  </div>

                  {/* Price indicators */}
                  <div className="absolute top-2 right-2 bg-[#122042] px-2 py-1 rounded text-xs text-[#00E5A1] font-mono">
                    + 2.45%
                  </div>

                  {/* Data points */}
                  <div className="absolute bottom-[40%] right-[30%] w-3 h-3 bg-[#00E5A1] rounded-full shadow-lg shadow-[#00E5A1]/40"></div>
                  <div className="absolute bottom-[30%] right-[10%] w-3 h-3 bg-[#00E5A1] rounded-full shadow-lg shadow-[#00E5A1]/40"></div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-[#122042] p-2 rounded">
                    <div className="font-medium text-white/70">Mở</div>
                    <div className="text-[#00E5A1]">1245.67</div>
                  </div>
                  <div className="bg-[#122042] p-2 rounded">
                    <div className="font-medium text-white/70">Cao</div>
                    <div className="text-[#00E5A1]">1278.90</div>
                  </div>
                  <div className="bg-[#122042] p-2 rounded">
                    <div className="font-medium text-white/70">Thấp</div>
                    <div className="text-[#00E5A1]">1215.30</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-[#00E5A1] text-[#0A1529] px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                  Phiên bản mới 2025
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00E5A1]/20 rounded-full blur-[100px] -z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
