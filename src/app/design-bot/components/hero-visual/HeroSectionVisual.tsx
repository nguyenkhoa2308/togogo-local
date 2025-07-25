import { Bot, Code, TrendingUp, Zap } from "lucide-react";

export default function HeroSectionVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main circle */}
      <div className="relative w-80 h-80 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/20 via-[#00E5A1]/15 to-[#64FFDA]/5 rounded-full backdrop-blur-sm border border-slate-700/30"></div>

        {/* Center bot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#64FFDA] via-[#00E5A1] to-[#64FFDA] rounded-2xl flex items-center justify-center">
            <Bot className="w-10 h-10 text-black" />
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-8 right-12 w-12 h-12 bg-gradient-to-br from-[#00E5A1]/20 to-[#64FFDA]/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-slate-700/30 animate-pulse">
          <Code className="w-6 h-6" style={{ color: "#00E5A1" }} />
        </div>

        <div
          className="absolute bottom-16 left-8 w-14 h-14 bg-gradient-to-br from-[#64FFDA]/20 to-[#00E5A1]/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-slate-700/30 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <TrendingUp className="w-7 h-7" style={{ color: "#64FFDA" }} />
        </div>

        <div
          className="absolute top-20 left-4 w-10 h-10 bg-gradient-to-br from-[#64FFDA]/15 to-[#00E5A1]/5 rounded-lg flex items-center justify-center backdrop-blur-sm border border-slate-700/30 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          <Zap className="w-5 h-5" style={{ color: "#64FFDA" }} />
        </div>

        {/* Orbiting dots */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "20s" }}
        >
          <div className="absolute top-4 left-1/2 w-2 h-2 bg-[#64FFDA] rounded-full -translate-x-1/2"></div>
          <div className="absolute bottom-4 left-1/2 w-2 h-2 bg-[#00E5A1] rounded-full -translate-x-1/2"></div>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#64FFDA]/5 via-[#00E5A1]/5 to-[#64FFDA]/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
