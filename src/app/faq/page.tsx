"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Định nghĩa kiểu dữ liệu
interface FAQItem {
  question: string;
  answer: string;
  relatedQuestions?: RelatedQuestion[];
}

interface RelatedQuestion {
  question: string;
  categoryId: string;
  questionIndex: number;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  faqs: FAQItem[];
}

export default function FAQ() {
  // State cho danh mục đang được chọn
  const [activeCategory, setActiveCategory] = useState("general");
  // State cho câu hỏi đang mở
  const [openQuestions, setOpenQuestions] = useState<{[key: string]: boolean}>({});
  // State cho feedback
  const [feedback, setFeedback] = useState<{[key: string]: 'helpful' | 'not-helpful' | null}>({});
  // State cho form phản hồi
  const [showFeedbackForm, setShowFeedbackForm] = useState<{[key: string]: boolean}>({});
  // State cho giá trị form phản hồi
  const [feedbackText, setFeedbackText] = useState<{[key: string]: string}>({});
  // Ref cho phần back to top
  const topRef = useRef<HTMLDivElement>(null);
  // Ref cho các section
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  // State cho sticky contact
  const [showStickyContact, setShowStickyContact] = useState(false);

  // Toggle câu hỏi
  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Scroll to top function
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle feedback
  const handleFeedback = (questionId: string, isHelpful: boolean) => {
    setFeedback(prev => ({
      ...prev,
      [questionId]: isHelpful ? 'helpful' : 'not-helpful'
    }));

    if (!isHelpful) {
      setShowFeedbackForm(prev => ({
        ...prev,
        [questionId]: true
      }));
    }
  };

  // Submit feedback
  const submitFeedback = (questionId: string) => {
    // Here you would typically send the feedback to your backend
    console.log(`Feedback for ${questionId}:`, feedbackText[questionId]);
    
    // Clear and close form
    setFeedbackText(prev => ({
      ...prev,
      [questionId]: ''
    }));
    
    setShowFeedbackForm(prev => ({
      ...prev,
      [questionId]: false
    }));
  };

  // Handle related question click
  const handleRelatedQuestionClick = (categoryId: string, questionIndex: number) => {
    setActiveCategory(categoryId);
    
    // Close all questions first
    setOpenQuestions({});
    
    // Wait for category change to apply then open the specific question
    setTimeout(() => {
      const questionId = `${categoryId}-${questionIndex}`;
      setOpenQuestions(prev => ({
        ...prev,
        [questionId]: true
      }));
      
      // Scroll to the question
      const element = document.getElementById(questionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handle scroll for sticky contact
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setShowStickyContact(true);
      } else {
        setShowStickyContact(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Danh sách các danh mục FAQ
  const faqCategories: FAQCategory[] = [
    {
      id: "general",
      title: "Thông tin chung",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ),
      faqs: [
        {
          question: "TOGOGO là gì?",
          answer: "TOGOGO là nền tảng cung cấp các giải pháp bot giao dịch tự động cho thị trường tiền điện tử. Chúng tôi phát triển các bot giao dịch cao cấp được thiết kế để tối ưu hóa lợi nhuận và giảm thiểu rủi ro cho nhà đầu tư.",
          relatedQuestions: [
            { question: "TOGOGO có an toàn không?", categoryId: "general", questionIndex: 2 },
            { question: "TOGOGO cung cấp những loại bot nào?", categoryId: "bots", questionIndex: 0 }
          ]
        },
        {
          question: "Tại sao nên sử dụng bot giao dịch tự động?",
          answer: "Bot giao dịch tự động giúp bạn giao dịch 24/7 không cần can thiệp thủ công, loại bỏ yếu tố cảm xúc trong quyết định giao dịch, thực hiện nhiều giao dịch cùng lúc với tốc độ cao và tuân thủ nghiêm ngặt chiến lược đã thiết lập trước.",
          relatedQuestions: [
            { question: "Bot Grid Trading hoạt động như thế nào?", categoryId: "bots", questionIndex: 1 },
            { question: "Bot có cần máy tính của tôi bật 24/7 không?", categoryId: "technical", questionIndex: 1 }
          ]
        },
        {
          question: "TOGOGO có an toàn không?",
          answer: "Có, TOGOGO rất chú trọng đến bảo mật. Chúng tôi sử dụng công nghệ mã hóa tiên tiến, không lưu trữ khóa rút tiền, và thực hiện kiểm tra bảo mật định kỳ. Bot của chúng tôi chỉ thực hiện giao dịch mà không có quyền rút tiền từ tài khoản của bạn.",
          relatedQuestions: [
            { question: "Làm thế nào để kết nối bot với sàn giao dịch?", categoryId: "technical", questionIndex: 0 },
            { question: "TOGOGO là gì?", categoryId: "general", questionIndex: 0 }
          ]
        }
      ]
    },
    {
      id: "bots",
      title: "Thông tin về Bot",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      faqs: [
        {
          question: "TOGOGO cung cấp những loại bot nào?",
          answer: "TOGOGO cung cấp nhiều loại bot như Grid Trading Bot (bot lưới), DCA Bot (bot trung bình chi phí), Futures Trading Bot (bot giao dịch hợp đồng tương lai), và các bot tùy chỉnh theo yêu cầu của khách hàng.",
          relatedQuestions: [
            { question: "Bot Grid Trading hoạt động như thế nào?", categoryId: "bots", questionIndex: 1 },
            { question: "Chi phí sử dụng bot của TOGOGO là bao nhiêu?", categoryId: "pricing", questionIndex: 0 }
          ]
        },
        {
          question: "Bot Grid Trading hoạt động như thế nào?",
          answer: "Bot Grid Trading tạo ra một lưới các lệnh mua và bán trong một biên độ giá. Khi giá tăng, bot bán và khi giá giảm, bot mua. Chiến lược này tạo ra lợi nhuận từ biến động giá trong thị trường sideway (đi ngang).",
          relatedQuestions: [
            { question: "Tôi có thể tùy chỉnh cài đặt của bot không?", categoryId: "bots", questionIndex: 2 },
            { question: "Làm thế nào để kết nối bot với sàn giao dịch?", categoryId: "technical", questionIndex: 0 }
          ]
        },
        {
          question: "Tôi có thể tùy chỉnh cài đặt của bot không?",
          answer: "Có, tất cả các bot của TOGOGO đều cho phép tùy chỉnh các thông số quan trọng như khoảng cách lưới, số lượng lệnh, quản lý vốn và các chiến lược thoát lệnh để phù hợp với mục tiêu đầu tư cá nhân của bạn.",
          relatedQuestions: [
            { question: "Bot Grid Trading hoạt động như thế nào?", categoryId: "bots", questionIndex: 1 },
            { question: "Chi phí sử dụng bot của TOGOGO là bao nhiêu?", categoryId: "pricing", questionIndex: 0 }
          ]
        }
      ]
    },
    {
      id: "pricing",
      title: "Giá cả & Thanh toán",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      faqs: [
        {
          question: "Chi phí sử dụng bot của TOGOGO là bao nhiêu?",
          answer: "TOGOGO cung cấp nhiều gói dịch vụ với mức giá khác nhau tùy thuộc vào nhu cầu của khách hàng. Chúng tôi có các gói Cơ bản, Nâng cao và Chuyên nghiệp với mức giá từ 29 USD/tháng đến 199 USD/tháng. Vui lòng xem trang 'Bảng giá' để biết thông tin chi tiết.",
          relatedQuestions: [
            { question: "TOGOGO có thu phí giao dịch không?", categoryId: "pricing", questionIndex: 1 },
            { question: "Có thể dùng thử trước khi mua không?", categoryId: "pricing", questionIndex: 2 }
          ]
        },
        {
          question: "TOGOGO có thu phí giao dịch không?",
          answer: "TOGOGO không thu thêm phí giao dịch. Các khoản phí bạn trả chỉ là phí thuê bao hàng tháng hoặc hàng năm để sử dụng bot. Tuy nhiên, sàn giao dịch bạn sử dụng sẽ tính phí giao dịch theo chính sách của họ.",
          relatedQuestions: [
            { question: "Chi phí sử dụng bot của TOGOGO là bao nhiêu?", categoryId: "pricing", questionIndex: 0 },
            { question: "Có thể dùng thử trước khi mua không?", categoryId: "pricing", questionIndex: 2 }
          ]
        },
        {
          question: "Có thể dùng thử trước khi mua không?",
          answer: "Có, TOGOGO cung cấp giai đoạn dùng thử miễn phí 7 ngày cho các khách hàng mới, cho phép bạn trải nghiệm đầy đủ tính năng của bot trước khi quyết định đăng ký gói dịch vụ.",
          relatedQuestions: [
            { question: "Chi phí sử dụng bot của TOGOGO là bao nhiêu?", categoryId: "pricing", questionIndex: 0 },
            { question: "TOGOGO cung cấp những loại bot nào?", categoryId: "bots", questionIndex: 0 }
          ]
        }
      ]
    },
    {
      id: "technical",
      title: "Hỗ trợ kỹ thuật",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
      faqs: [
        {
          question: "Làm thế nào để kết nối bot với sàn giao dịch?",
          answer: "Để kết nối bot với sàn giao dịch, bạn cần tạo API keys trên sàn giao dịch của mình với quyền đọc và giao dịch (không cần quyền rút tiền), sau đó nhập các keys này vào bảng điều khiển TOGOGO. Chúng tôi có hướng dẫn chi tiết cho từng sàn giao dịch trong phần 'Hướng dẫn' trên trang web.",
          relatedQuestions: [
            { question: "Bot có cần máy tính của tôi bật 24/7 không?", categoryId: "technical", questionIndex: 1 },
            { question: "TOGOGO có an toàn không?", categoryId: "general", questionIndex: 2 }
          ]
        },
        {
          question: "Bot có cần máy tính của tôi bật 24/7 không?",
          answer: "Không, bot của TOGOGO chạy trên máy chủ đám mây của chúng tôi nên không yêu cầu máy tính của bạn phải bật 24/7. Bạn chỉ cần truy cập vào bảng điều khiển để thiết lập, giám sát và điều chỉnh bot khi cần thiết.",
          relatedQuestions: [
            { question: "Làm thế nào để kết nối bot với sàn giao dịch?", categoryId: "technical", questionIndex: 0 },
            { question: "Làm thế nào để giải quyết các vấn đề kỹ thuật?", categoryId: "technical", questionIndex: 2 }
          ]
        },
        {
          question: "Làm thế nào để giải quyết các vấn đề kỹ thuật?",
          answer: "Nếu bạn gặp vấn đề kỹ thuật, bạn có thể kiểm tra phần 'Hướng dẫn' hoặc 'Trung tâm hỗ trợ' trên trang web của chúng tôi. Nếu vấn đề vẫn tồn tại, hãy liên hệ với đội ngũ hỗ trợ kỹ thuật qua email support@togogo.com hoặc chat trực tuyến trên trang web của chúng tôi.",
          relatedQuestions: [
            { question: "Bot có cần máy tính của tôi bật 24/7 không?", categoryId: "technical", questionIndex: 1 },
            { question: "Chi phí sử dụng bot của TOGOGO là bao nhiêu?", categoryId: "pricing", questionIndex: 0 }
          ]
        }
      ]
    }
  ];

  return (
    <div 
      className="min-h-screen text-white pt-32 md:pt-44 relative mb-40" 
      style={{
        background: "linear-gradient(to bottom, rgb(16, 24, 40), rgb(11, 17, 31))",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Background Semi-circles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Top semi-circle background */}
        <div className="absolute w-[1600px] h-[1600px] rounded-full border border-[#64FFDA]/10 top-0 left-1/2 -translate-x-1/2 -translate-y-[65%]"></div>
        <div className="absolute w-[1400px] h-[1400px] rounded-full border border-[#64FFDA]/10 top-0 left-1/2 -translate-x-1/2 -translate-y-[65%]"></div>
        <div className="absolute w-[1200px] h-[1200px] rounded-full border border-[#64FFDA]/10 top-0 left-1/2 -translate-x-1/2 -translate-y-[65%]"></div>
        <div className="absolute w-[1000px] h-[1000px] rounded-full border border-[#64FFDA]/10 top-0 left-1/2 -translate-x-1/2 -translate-y-[65%]"></div>
        <div className="absolute w-[800px] h-[800px] rounded-full border border-[#64FFDA]/10 top-0 left-1/2 -translate-x-1/2 -translate-y-[65%]"></div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#64FFDA] text-[#0A192F] flex items-center justify-center shadow-lg hover:bg-[#64FFDA]/90 transition-all duration-300 transform hover:-translate-y-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* Sticky Contact Section */}
      <AnimatePresence>
        {showStickyContact && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-[#0A192F] to-[#112240] border-t border-[#233554] py-4 px-4 shadow-xl"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-white">Không tìm thấy câu trả lời?</h3>
                <p className="text-[#8892B0]">Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn</p>
              </div>
              <div className="flex space-x-4">
                <a
                  href="mailto:support@togogo.com"
                  className="px-5 py-2 rounded-lg bg-[#0A1529] border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 transition-all duration-300"
                >
                  Email chúng tôi
                </a>
                <button
                  className="px-5 py-2 rounded-lg bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 transition-all duration-300"
                >
                  Chat ngay
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={topRef} className="relative px-4 md:px-0 z-10" id="top">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-block rounded-full border border-[#64FFDA]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-6">
              <span className="text-[#64FFDA] font-medium tracking-wide text-lg">
                CÂU HỎI THƯỜNG GẶP
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-[#64FFDA]">Giải đáp thắc mắc của bạn</span>
            </h1>
            
            <p className="text-[#8892B0] text-xl mb-8 max-w-2xl mx-auto">
              Tìm hiểu thêm về TOGOGO và các giải pháp giao dịch tự động của chúng tôi
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl"
            >
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm câu hỏi..." 
                  className="w-full px-5 py-4 rounded-lg bg-[#112240] border border-[#233554] focus:border-[#64FFDA] outline-none text-white placeholder-[#8892B0]"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64FFDA]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Anchor Links */}
      <section className="px-4 md:px-0 relative z-10 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category) => (
              <button
                key={`anchor-${category.id}`}
                onClick={() => {
                  setActiveCategory(category.id);
                  scrollToSection(category.id);
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                  activeCategory === category.id
                    ? "bg-[#64FFDA] text-[#0A192F]"
                    : "bg-[#112240] text-[#8892B0] hover:bg-[#233554] hover:text-white"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                <span>{category.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories Section */}
      <section className="py-10 px-4 md:px-0 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            {faqCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.97 }}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-br from-[#112240] to-[#0A192F] border-[#64FFDA] text-white"
                    : "bg-[#0A1529]/30 border-[#233554] text-[#8892B0] hover:border-[#64FFDA]/50"
                }`}
                onClick={() => {
                  setActiveCategory(category.id);
                  scrollToSection(category.id);
                }}
              >
                <div className="flex items-center mb-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    activeCategory === category.id
                      ? "bg-[#64FFDA]/20 text-[#64FFDA]"
                      : "bg-[#233554]/50 text-[#8892B0]"
                  }`}>
                    {category.icon}
                  </div>
                  <h3 className={`font-bold text-lg ${
                    activeCategory === category.id
                      ? "text-white"
                      : "text-[#8892B0]"
                  }`}>
                    {category.title}
                  </h3>
                </div>
                <p className="text-sm opacity-80 ml-12">
                  {category.faqs.length} câu hỏi
                </p>
              </motion.div>
            ))}
          </div>

          {/* FAQ Questions and Answers */}
          <div 
            id={activeCategory} 
            ref={el => sectionRefs.current[activeCategory] = el}
            className="bg-gradient-to-br from-[#112240] to-[#0A192F] rounded-xl border border-[#233554] p-8 mb-20"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">
              {faqCategories.find(c => c.id === activeCategory)?.title}
              <div className="text-sm font-normal text-[#8892B0] mt-1">
                Nhấp vào câu hỏi để xem câu trả lời
              </div>
            </h2>

            <div className="space-y-4">
              {faqCategories
                .find(c => c.id === activeCategory)
                ?.faqs.map((faq, index) => {
                  const questionId = `${activeCategory}-${index}`;
                  return (
                    <motion.div
                      key={questionId}
                      id={questionId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border border-[#233554] rounded-lg overflow-hidden"
                    >
                      <div
                        className="flex justify-between items-center p-5 cursor-pointer bg-[#0A1529]/50 hover:bg-[#0A1529]"
                        onClick={() => toggleQuestion(questionId)}
                      >
                        <h3 className="font-medium text-lg text-white">{faq.question}</h3>
                        <button className="text-[#64FFDA] p-1 rounded-full hover:bg-[#64FFDA]/10 transition-colors">
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
                            className={`transition-transform duration-300 ${
                              openQuestions[questionId] ? "rotate-180" : ""
                            }`}
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                      </div>

                      <AnimatePresence>
                        {openQuestions[questionId] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-[#233554] bg-[#112240]/30"
                          >
                            <div className="p-5">
                              <p className="text-[#8892B0] mb-6">{faq.answer}</p>
                              
                              {/* Back to top link inside answer */}
                              <div className="flex justify-end mb-6">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    scrollToTop();
                                  }}
                                  className="text-[#64FFDA] text-sm flex items-center hover:underline"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                  </svg>
                                  Lên đầu trang
                                </button>
                              </div>
                              
                              {/* Related questions */}
                              {faq.relatedQuestions && faq.relatedQuestions.length > 0 && (
                                <div className="mt-4 p-4 bg-[#0A1529] rounded-lg border border-[#233554]">
                                  <h4 className="text-white font-medium mb-3">Câu hỏi liên quan:</h4>
                                  <div className="space-y-2">
                                    {faq.relatedQuestions.map((relatedQ, idx) => (
                                      <button
                                        key={`related-${questionId}-${idx}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRelatedQuestionClick(relatedQ.categoryId, relatedQ.questionIndex);
                                        }}
                                        className="text-[#64FFDA] hover:underline text-left block w-full"
                                      >
                                        {relatedQ.question}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Feedback buttons */}
                              <div className="mt-6 border-t border-[#233554] pt-4">
                                <p className="text-sm text-[#8892B0] mb-2">Câu trả lời này có hữu ích không?</p>
                                <div className="flex space-x-3">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleFeedback(questionId, true);
                                    }}
                                    className={`px-3 py-1 rounded-lg flex items-center text-sm ${
                                      feedback[questionId] === 'helpful'
                                        ? 'bg-[#64FFDA]/20 text-[#64FFDA] border border-[#64FFDA]'
                                        : 'bg-[#0A1529] text-[#8892B0] border border-[#233554] hover:border-[#64FFDA]/50'
                                    }`}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                    </svg>
                                    Hữu ích
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleFeedback(questionId, false);
                                    }}
                                    className={`px-3 py-1 rounded-lg flex items-center text-sm ${
                                      feedback[questionId] === 'not-helpful'
                                        ? 'bg-red-400/20 text-red-400 border border-red-400'
                                        : 'bg-[#0A1529] text-[#8892B0] border border-[#233554] hover:border-[#64FFDA]/50'
                                    }`}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                                    </svg>
                                    Không hữu ích
                                  </button>
                                </div>
                                
                                {/* Feedback form */}
                                <AnimatePresence>
                                  {showFeedbackForm[questionId] && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="mt-4"
                                    >
                                      <p className="text-sm text-[#8892B0] mb-2">Bạn muốn hỏi gì thêm?</p>
                                      <textarea
                                        value={feedbackText[questionId] || ''}
                                        onChange={(e) => setFeedbackText(prev => ({
                                          ...prev,
                                          [questionId]: e.target.value
                                        }))}
                                        className="w-full px-3 py-2 rounded-lg bg-[#0A1529] border border-[#233554] focus:border-[#64FFDA] outline-none text-white placeholder-[#8892B0] mb-3"
                                        placeholder="Nhập câu hỏi của bạn..."
                                        rows={3}
                                      />
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          submitFeedback(questionId);
                                        }}
                                        className="px-4 py-2 rounded-lg bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 transition-all duration-300"
                                      >
                                        Gửi phản hồi
                                      </button>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
            </div>

            {/* Load more button */}
            <div className="text-center mt-8">
              <button className="px-6 py-3 rounded-lg border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 transition-all duration-300">
                Xem thêm câu hỏi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-0 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block rounded-full border border-[#00E5A1]/30 bg-[#0A1529] shadow-lg px-5 py-2 mb-4">
            <span className="text-[#00E5A1] font-medium tracking-wide text-lg">
              KHÔNG TÌM THẤY CÂU TRẢ LỜI?
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vẫn còn thắc mắc?{" "}
            <span className="text-[#64FFDA]">Liên hệ với chúng tôi</span>
          </h2>
          <p className="text-[#8892B0] text-lg mb-10 max-w-2xl mx-auto">
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn
            qua email, chat trực tuyến hoặc qua điện thoại.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-[#112240] to-[#0A192F] p-6 rounded-xl border border-[#233554] hover:border-[#64FFDA] transition-all"
            >
              <div className="w-12 h-12 bg-[#0A1529] rounded-full flex items-center justify-center mb-4 text-[#64FFDA] mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Email</h3>
              <p className="text-[#8892B0] text-center mb-4">
                Gửi email và nhận phản hồi trong vòng 24 giờ
              </p>
              <a
                href="mailto:support@togogo.com"
                className="text-[#64FFDA] hover:underline block text-center"
              >
                support@togogo.com
              </a>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-[#112240] to-[#0A192F] p-6 rounded-xl border border-[#233554] hover:border-[#64FFDA] transition-all"
            >
              <div className="w-12 h-12 bg-[#0A1529] rounded-full flex items-center justify-center mb-4 text-[#64FFDA] mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Live Chat</h3>
              <p className="text-[#8892B0] text-center mb-4">
                Chat trực tiếp với đội ngũ hỗ trợ của chúng tôi
              </p>
              <button className="text-[#64FFDA] hover:underline block text-center mx-auto">
                Bắt đầu chat ngay
              </button>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-[#112240] to-[#0A192F] p-6 rounded-xl border border-[#233554] hover:border-[#64FFDA] transition-all"
            >
              <div className="w-12 h-12 bg-[#0A1529] rounded-full flex items-center justify-center mb-4 text-[#64FFDA] mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Điện thoại</h3>
              <p className="text-[#8892B0] text-center mb-4">
                Gọi cho chúng tôi trong giờ làm việc
              </p>
              <a
                href="tel:+84123456789"
                className="text-[#64FFDA] hover:underline block text-center"
              >
                +84 123 456 789
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
