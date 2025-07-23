"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faCloud,
  faFire,
  faPenClip,
} from "@fortawesome/free-solid-svg-icons";
import { ShinyButton } from "@/components/magicui/shiny-button";
// import GradientText from "@/components/magicui/animated-shiny-text";

interface TabContent {
  title: string;
  description: string[];
}

interface ContentType {
  [key: string]: TabContent;
}

export default function DesignBot() {
  const [activeTab, setActiveTab] = useState("mission");

  const content: ContentType = {
    mission: {
      title:
        "Làm việc với một trong những công ty tư vấn kỹ thuật số phát triển nhanh nhất",
      description: [
        "Chúng tôi là một nhóm các chuyên gia tư vấn kinh doanh và chuyên gia công nghệ đầy nhiệt huyết, mong muốn giúp các công ty phát huy hết tiềm năng của mình.",
        "Bằng cách hiểu được tình trạng của khách hàng và tận dụng kinh nghiệm cũng như kiến ​​thức tốt nhất của mình, chúng tôi hỗ trợ cải cách bằng cách đề xuất các phương pháp và nguồn lực phù hợp nhất.",
      ],
    },
    vision: {
      title: "Tầm nhìn của chúng tôi hướng tới tương lai số hóa",
      description: [
        "Chúng tôi hướng tới việc trở thành đối tác tin cậy hàng đầu trong lĩnh vực chuyển đổi số cho các doanh nghiệp tại Việt Nam.",
        "Chúng tôi cam kết mang đến những giải pháp công nghệ tiên tiến và sáng tạo, góp phần vào sự phát triển bền vững của cộng đồng doanh nghiệp.",
      ],
    },
    values: {
      title: "Giá trị cốt lõi định hình văn hóa của chúng tôi",
      description: [
        "Chính trực - Luôn đặt sự trung thực và minh bạch lên hàng đầu trong mọi hoạt động.",
        "Sáng tạo - Không ngừng đổi mới và tìm kiếm giải pháp tốt nhất cho khách hàng.",
        "Cam kết - Luôn nỗ lực hết mình để đạt được mục tiêu đề ra.",
      ],
    },
  };

  const renderTab = (tabName: string) => {
    return (
      <button
        className={`px-4 py-2 rounded transition-colors duration-300 text-sm md:text-base ${
          activeTab === tabName
            ? "bg-blue-500 text-white"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
        onClick={() => setActiveTab(tabName)}
      >
        {`Our ${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`}
      </button>
    );
  };

  return (
    <div className="bg-[#101828] text-white px-4 sm:px-6 lg:px-8 w-screen pt-32 md:pt-44">
      {/* Header Section */}
      <header className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center md:text-left">
          {" "}
          {/* Added text-center for mobile */}
          <div
            className="inline-flex items-center bg-gray-800/50 rounded-full px-4 py-2 text-sm" // Smaller text on mobile
            data-aos="fade-down"
          >
            <span>Khuyến mãi sẽ kéo dài đến thứ sáu, $84,99/tháng</span>
            <div className="ml-3 animate-pulse">→</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div
            className="md:w-1/2 text-center md:text-left"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 pb-4 bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] bg-clip-text text-transparent leading-tight">
              {" "}
              {/* Adjusted text sizes */}
              Dịch vụ lập trình Pine Script
            </h1>
            <p className="mb-6 text-base sm:text-lg text-[#8892B0]">
              {" "}
              {/* Adjusted text sizes */}
              Tại TOGOGO, chúng tôi chuyên thiết kế, xây dựng, vận dụng và mở
              rộng quy mô các mô hình Bot giao dịch và dịch vụ thiết kế Bot giao
              dịch theo yêu cầu, một cách hữu ích và hiệu quả cao.
            </p>
            <div className="flex flex-col sm:flex-row mb-6 gap-2 sm:gap-0">
              {" "}
              {/* Flex-col for mobile, flex-row for sm+ */}
              <input
                type="email"
                className="w-full p-3 rounded-lg sm:rounded-r-none text-gray-900" // Rounded-lg on mobile, no right-round on sm+
                placeholder="TOGOGO@gmail.com"
              />
              <ShinyButton className="w-full sm:w-auto bg-[#00E5A1] text-black font-medium px-4 py-3 rounded-xl hover:bg-[#00E5A1]/80 transition-colors duration-300 cursor-pointer">
                {" "}
                {/* Full width on mobile, auto on sm+ */}
                Tư vấn miễn phí
              </ShinyButton>
            </div>
            <div className="flex justify-center md:justify-start space-x-4 text-sm sm:text-base">
              {" "}
              {/* Centered on mobile, left on md+ */}
              <span className="hover:text-[#00E5A1] transition-colors duration-300 cursor-pointer">
                FACEBOOK
              </span>
              <span className="hover:text-[#00E5A1] transition-colors duration-300 cursor-pointer">
                YOUTUBE
              </span>
              <span className="hover:text-[#00E5A1] transition-colors duration-300 cursor-pointer">
                TWITTER
              </span>
            </div>
          </div>
          <div
            className="md:w-1/2 flex justify-center"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {" "}
            {/* Centered on mobile */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-none rounded-full overflow-hidden animate-float">
              {" "}
              {/* Constrain width on mobile */}
              <Image
                src="/images/autotrading.png"
                alt="Business Consultant"
                width={600}
                height={400}
                className="w-full h-auto object-cover" // Ensure image scales well
              />
            </div>
          </div>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <section className="container mx-auto max-w-7xl mt-12 md:mt-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          {" "}
          {/* Adjusted gap */}
          <div className="md:w-1/2 space-y-6">
            {" "}
            {/* Increased space-y for better spacing */}
            <div
              className="text-white rounded-lg p-4 sm:p-6 shadow-lg border border-[#00e5a114]" // Adjusted padding
              data-aos="zoom-in"
              data-aos-delay="100"

              // rounded-lg border p-6 text-white flex flex-col gap-6 hover:shadow-lg transition-all duration-300 ease-in-out border-[#00e5a114]
            >
              <div className="flex items-center gap-2 w-full text-[#00E5A1] rounded-full mb-3 text-xl">
                {/* Adjusted icon size */}
                <FontAwesomeIcon icon={faPenClip} />
                <h4 className="font-bold text-lg sm:text-xl text-white">
                  Viết script theo yêu cầu
                </h4>
              </div>

              {/* Adjusted text sizes */}
              <p className="text-gray-500 text-sm sm:text-base">
                Xây dựng các chỉ báo (indicator) tùy chỉnh. Thiết lập chiến lược
                giao dịch (Strategy script).
              </p>
            </div>
            <div
              className="bg-white text-gray-900 rounded p-4 sm:p-6 shadow-lg"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-500 rounded-full mb-3 animate-pulse text-xl">
                <FontAwesomeIcon icon={faBullseye} />
              </div>
              <h4 className="font-bold text-lg sm:text-xl mb-2">
                Tối ưu hóa chiến lược hiện tại
              </h4>
              <p className="text-gray-500 text-sm sm:text-base">
                Backtest chiến lược và cải tiến hiệu quả giao dịch. Tối ưu hóa
                hiệu suất, giảm thiểu rủi ro.
              </p>
            </div>
            <div
              className="bg-white text-gray-900 rounded p-4 sm:p-6 shadow-lg"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-500 rounded-full mb-3 animate-pulse text-xl">
                <FontAwesomeIcon icon={faCloud} />
              </div>
              <h4 className="font-bold text-lg sm:text-xl mb-2">
                Chuyển đổi chiến lược từ các ngôn ngữ khác sang Pine Script
              </h4>
              <p className="text-gray-500 text-sm sm:text-base">
                Chuyển đổi từ Amibroker AFL, MetaTrader (MQL4, MQL5), Python
                sang Pine Script
              </p>
            </div>
          </div>
          <div
            className="md:w-1/2 text-center md:text-left"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <span className="text-yellow-500 pb-2 text-sm sm:text-base">
              • Tại sao nên chọn chúng tôi
            </span>{" "}
            {/* Adjusted text sizes */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 pb-4 bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] text-transparent bg-clip-text animate-gradient leading-tight">
              Chúng tôi cung cấp giải pháp tốt nhất cho dịch vụ thiết kế Bot tự
              động giao dịch theo yêu cầu
            </h2>
            <p className="mb-4 text-base sm:text-lg">
              Bằng cách hiểu được tình trạng của khách hàng và tận dụng kinh
              nghiệm cũng như kiến ​​thức của mình, chúng tôi hỗ trợ cải cách
              bằng cách đề xuất các phương pháp và nguồn lực phù hợp nhất.
            </p>
            <p className="mb-6 text-base sm:text-lg">
              Tại TOGOGO, chúng tôi chuyên thiết kế, xây dựng, vận chuyển và mở
              rộng quy mô các sản phẩm hữu ích với hiệu quả cao.
            </p>
            <ShinyButton className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors duration-300 text-base sm:text-lg">
              {" "}
              {/* Adjusted padding and text size */}
              Giới thiệu TOGOGO
            </ShinyButton>
          </div>
        </div>
      </section>

      {/* Services Section (Quy trình) */}
      <section className="container mx-auto max-w-7xl py-8 px-4 sm:px-6 bg-yellow-400 rounded-lg mt-12 md:mt-24">
        {" "}
        {/* Adjusted padding */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start">
          {" "}
          {/* Centered items on mobile */}
          <div
            className="md:w-1/2 text-center md:text-left"
            data-aos="fade-right"
          >
            <span className="text-gray-600 pb-2 text-sm sm:text-base">
              • Quy trình của chúng tôi
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 pb-4 bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] text-transparent bg-clip-text animate-gradient leading-tight">
              Quy trình làm việc chuyên nghiệp
            </h2>
            <div className="flex items-center justify-center md:justify-start w-28 h-28 border-2 border-gray-900 rounded-full animate-[spin_10s_linear_infinite] mx-auto md:mx-0">
              {" "}
              {/* Centered on mobile */}
              <Image
                src="/images/icon_round.png"
                alt="Service icon"
                width={96}
                height={96}
              />
            </div>
          </div>
          <div className="md:w-1/2 space-y-4 text-gray-900">
            {" "}
            {/* Added text-gray-900 to ensure readability */}
            <div
              className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 transition-colors duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-red-100 text-red-500 rounded-full mr-4 animate-pulse text-xl">
                <FontAwesomeIcon icon={faFire} />
              </div>
              <h4 className="text-base sm:text-lg">
                Tiếp nhận yêu cầu và tư vấn miễn phí.
              </h4>{" "}
              {/* Adjusted text size */}
            </div>
            <div
              className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 transition-colors duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-red-100 text-red-500 rounded-full mr-4 animate-pulse text-xl">
                <FontAwesomeIcon icon={faFire} />
              </div>
              <h4 className="text-base sm:text-lg">
                Báo giá và thống nhất yêu cầu rõ ràng trước khi tiến hành.
              </h4>
            </div>
            <div
              className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 transition-colors duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-red-100 text-red-500 rounded-full mr-4 animate-pulse text-xl">
                <FontAwesomeIcon icon={faFire} />
              </div>
              <h4 className="text-base sm:text-lg">
                Viết code, kiểm thử kỹ càng trước khi bàn giao.
              </h4>
            </div>
            <div
              className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 transition-colors duration-300"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-red-100 text-red-500 rounded-full mr-4 animate-pulse text-xl">
                <FontAwesomeIcon icon={faFire} />
              </div>
              <h4 className="text-base sm:text-lg">
                Bàn giao và hỗ trợ chỉnh sửa, bảo trì sau bàn giao.
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto max-w-7xl mt-12 md:mt-24">
        <div className="flex justify-center mb-6" data-aos="fade-up">
          {" "}
          {/* Increased margin bottom */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {" "}
            {/* Added flex-wrap and gap for better spacing on small screens */}
            {["mission", "vision", "values"].map((tab) => (
              <React.Fragment key={tab}>{renderTab(tab)}</React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-4 gap-8 md:gap-10">
          {" "}
          {/* Adjusted gap */}
          <div
            className="md:w-1/2 text-center md:text-left"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 pb-4 bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] text-transparent bg-clip-text animate-gradient leading-tight">
              {content[activeTab].title}
            </h2>
            {content[activeTab].description.map((paragraph, index) => (
              <p key={index} className="mb-4 text-base sm:text-lg">
                {" "}
                {/* Adjusted text size */}
                {paragraph}
              </p>
            ))}
          </div>
          <div
            className="md:w-1/2 flex justify-center md:justify-start"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {" "}
            {/* Centered on mobile */}
            <div className="flex-1 max-w-sm sm:max-w-md md:max-w-none bg-yellow-400 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              {" "}
              {/* Constrain width on mobile */}
              <Image
                src="/images/autotrading.png"
                alt="hello"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog and Contact Section */}
      <section className="container mx-auto max-w-7xl p-6 sm:p-8 mt-12 md:mt-24 bg-yellow-400 rounded-lg text-gray-900">
        {" "}
        {/* Adjusted padding and text color */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          {" "}
          {/* Adjusted gap */}
          <div
            className="md:w-1/2 text-center md:text-left"
            data-aos="fade-right"
          >
            <span className="text-gray-600 pb-2 text-sm sm:text-base">
              • Bảng giá
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 pb-4 bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] text-transparent bg-clip-text animate-gradient leading-tight">
              Ưu đãi
            </h2>
            <div className="space-y-4">
              <div
                className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 hover:bg-gray-100 p-4 rounded transition-colors duration-300" // Flex-col on mobile, flex-row on sm+
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg">
                  {" "}
                  {/* Adjusted sizes */}
                  <Image
                    src="/images/fire_icon.png"
                    alt="Blog post"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-pulse"
                  />
                </div>
                <div className="text-center sm:text-left">
                  {" "}
                  {/* Text alignment for content */}
                  <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs sm:text-sm">
                    SUPER HOT
                  </span>{" "}
                  {/* Adjusted text size */}
                  <h5 className="text-gray-900 mt-2 text-base sm:text-lg">
                    Bảng giá tham khảo, phân loại theo độ khó và tính phức tạp
                    của script.
                  </h5>
                </div>
              </div>
              <div
                className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 hover:bg-gray-100 p-4 rounded transition-colors duration-300"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg">
                  <Image
                    src="/images/fire_icon.png"
                    alt="Blog post"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-pulse"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs sm:text-sm">
                    HOT
                  </span>
                  <h5 className="text-gray-900 mt-2 text-base sm:text-lg">
                    Các chương trình ưu đãi giảm giá cho khách hàng thân thiết
                    và số lượng lớn.
                  </h5>
                </div>
              </div>
              <div
                className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 hover:bg-gray-100 p-4 rounded transition-colors duration-300"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg">
                  <Image
                    src="/images/fire_icon.png"
                    alt="Blog post"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-pulse"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs sm:text-sm">
                    HOT
                  </span>
                  <h5 className="text-gray-900 mt-2 text-base sm:text-lg">
                    Các chương trình ưu đãi giảm giá cho cộng tác viên theo
                    tháng và năm.
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div
            className="md:w-1/2 text-center md:text-left"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <span className="text-gray-600 pb-2 text-sm sm:text-base">
              • Liên hệ
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 pb-4 bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] text-transparent bg-clip-text animate-gradient leading-tight">
              Liên hệ với chúng tôi
            </h2>
            <div className="inline-block mb-6">
              {" "}
              {/* Increased margin bottom */}
              {/* <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={true}
                className="custom-class rounded-full px-5 py-2 text-sm font-medium" // Adjusted padding and text size
              >
                Điền vào mẫu
              </GradientText> */}
            </div>
            <form>
              <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
                {" "}
                {/* Increased margin bottom */}
                <input
                  type="text"
                  className="w-full p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" // Added focus styles
                  placeholder="Họ và tên"
                />
              </div>
              <div className="mb-4" data-aos="fade-up" data-aos-delay="200">
                <input
                  type="email"
                  className="w-full p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Nhập email"
                />
              </div>
              <div className="mb-6" data-aos="fade-up" data-aos-delay="300">
                <textarea
                  className="w-full p-3 rounded-lg text-gray-900 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" // Added min-height
                  rows={5}
                  placeholder="Nhập yêu cầu"
                ></textarea>
              </div>
              <ShinyButton
                className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors duration-300 text-base sm:text-lg" // Full width on mobile, auto on sm+
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                Send Message
              </ShinyButton>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
