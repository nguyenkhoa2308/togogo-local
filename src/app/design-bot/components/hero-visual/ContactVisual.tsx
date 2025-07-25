"use client";

import { useState, useEffect } from "react";
import {
  Bot,
  Mail,
  MessageCircle,
  MessageSquare,
  CheckCircle,
  Clock,
  Shield,
  ThumbsUp,
  Zap,
  Star,
} from "lucide-react";

export default function ContactVisual() {
  const [rotation, setRotation] = useState(0);
  const [activeContact, setActiveContact] = useState(0);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation((prev) => prev + 0.3);
    }, 50);

    const contactInterval = setInterval(() => {
      setActiveContact((prev) => (prev + 1) % 4);
    }, 3000);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(contactInterval);
    };
  }, []);

  const contactChannels = [
    {
      icon: Mail,
      label: "Email",
      contact: "contact@togogo.vn",
      color: "#64FFDA",
      angle: 0,
    },
    {
      icon: MessageCircle,
      label: "Zalo",
      contact: "0901 234 567",
      color: "#00E5A1",
      angle: 90,
    },
    {
      icon: MessageSquare,
      label: "Messenger",
      contact: "m.me/TOGOGO.vn",
      color: "#64FFDA",
      angle: 180,
    },
    {
      icon: MessageCircle,
      label: "Telegram",
      contact: "@TOGOGO_VN",
      color: "#00E5A1",
      angle: 270,
    },
  ];

  const commitments = [
    {
      icon: Clock,
      text: "Hỗ trợ 24/7",
      color: "#64FFDA",
      position: "top-left",
    },
    {
      icon: CheckCircle,
      text: "Tư vấn free 100%",
      color: "#00E5A1",
      position: "top-right",
    },
    {
      icon: Zap,
      text: "Phản hồi nhanh",
      color: "#64FFDA",
      position: "bottom-left",
    },
    {
      icon: Shield,
      text: "Cam kết bảo hành",
      color: "#00E5A1",
      position: "bottom-right",
    },
    {
      icon: ThumbsUp,
      text: "98% hài lòng",
      color: "#4a9b8e",
      position: "middle-left",
    },
    {
      icon: Star,
      text: "500+ dự án",
      color: "#4a9b8e",
      position: "middle-right",
    },
  ];

  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden">
      {/* Simple Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/5 via-transparent to-[#00E5A1]/5 rounded-3xl">
        {/* Minimal Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${20 + ((i * 6) % 60)}%`,
              top: `${25 + (i % 4) * 15}%`,
              backgroundColor:
                i % 3 === 0
                  ? "#64FFDA40"
                  : i % 3 === 1
                  ? "#00E5A140"
                  : "#4a9b8e40",
              animationDelay: `${i * 0.8}s`,
              animationDuration: "4s",
              transform: `translateY(${Math.sin(rotation * 0.005 + i) * 8}px)`,
            }}
          />
        ))}

        {/* Subtle Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-[#64FFDA]/8 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-[#00E5A1]/8 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/2 w-12 h-12 bg-[#4a9b8e]/6 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div
        className="relative w-full h-full flex items-center justify-center p-8"
        style={{ zIndex: 10 }}
      >
        {/* Central Bot */}
        <div className="relative">
          {/* Bot Character */}
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-br from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 hover:scale-110">
              <div className="w-18 h-18 bg-[#101828] rounded-xl flex items-center justify-center relative">
                <Bot className="w-12 h-12 text-[#64FFDA]" />

                {/* Status Indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00E5A1] rounded-full border-2 border-[#101828] animate-pulse"></div>
              </div>
            </div>

            {/* Contact Icons Orbit */}
            {contactChannels.map((contact, index) => {
              const isActive = activeContact === index;
              const orbitRadius = 100;
              const angleOffset = rotation + contact.angle;
              const x = Math.cos((angleOffset * Math.PI) / 180) * orbitRadius;
              const y = Math.sin((angleOffset * Math.PI) / 180) * orbitRadius;

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 ${
                    isActive ? "scale-125 z-30" : "scale-100 z-20"
                  }`}
                  style={{
                    left: `calc(50% + ${x}px - 20px)`,
                    top: `calc(50% + ${y}px - 20px)`,
                  }}
                >
                  <div
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 transition-all duration-500 shadow-lg hover:scale-110"
                    style={{
                      borderColor: isActive
                        ? contact.color
                        : "rgba(255,255,255,0.2)",
                      backgroundColor: isActive
                        ? contact.color + "20"
                        : "rgba(255,255,255,0.08)",
                    }}
                  >
                    <contact.icon
                      className="w-5 h-5 transition-all duration-500"
                      style={{ color: contact.color }}
                    />
                  </div>

                  {/* Compact Tooltip with Contact Info */}
                  {isActive && (
                    <div
                      className="absolute transform pointer-events-none z-40"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(-50%, -50%) translate(${
                          x > 0 ? "55px" : "-55px"
                        }, ${y > 0 ? "55px" : "-55px"})`,
                      }}
                    >
                      <div
                        className="bg-[#101828]/95 backdrop-blur-sm border rounded-lg px-3 py-2 text-center shadow-xl min-w-[120px]"
                        style={{
                          borderColor: contact.color + "40",
                        }}
                      >
                        <div
                          className="font-bold text-xs mb-1"
                          style={{ color: contact.color }}
                        >
                          {contact.label}
                        </div>
                        <div className="text-white text-xs">
                          {contact.contact}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Simple Orbit Ring */}
            <div
              className="absolute border-2 rounded-full opacity-20 animate-ping"
              style={{
                width: "280px",
                height: "280px",
                left: "calc(50% - 140px)",
                top: "calc(50% - 140px)",
                borderColor: activeContact % 2 === 0 ? "#64FFDA" : "#00E5A1",
                animationDuration: "3s",
              }}
            ></div>
          </div>
        </div>

        {/* Balanced Commitments */}
        {commitments.map((commitment, index) => {
          const positionStyles = {
            "top-left": "absolute top-8 left-8",
            "top-right": "absolute top-8 right-8",
            "bottom-left": "absolute bottom-8 left-8",
            "bottom-right": "absolute bottom-8 right-8",
            "middle-left": "absolute top-1/2 left-8 transform -translate-y-1/2",
            "middle-right":
              "absolute top-1/2 right-8 transform -translate-y-1/2",
          };

          return (
            <div
              key={index}
              className={`${
                positionStyles[commitment.position]
              } transform hover:scale-105 transition-all duration-300`}
            >
              <div
                className="flex items-center space-x-2 border rounded-xl px-3 py-2 shadow-lg backdrop-blur-sm"
                style={{
                  backgroundColor: commitment.color + "15",
                  borderColor: commitment.color + "30",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: commitment.color + "25" }}
                >
                  <commitment.icon
                    className="w-3 h-3"
                    style={{ color: commitment.color }}
                  />
                </div>
                <div>
                  <div
                    className="font-bold text-xs"
                    style={{ color: commitment.color }}
                  >
                    {commitment.text}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
