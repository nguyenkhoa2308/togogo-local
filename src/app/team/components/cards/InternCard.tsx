import Image from "next/image";
import { Intern } from "../../types";
import { motion } from "framer-motion";

interface InternCardProps {
  intern: Intern;
  onClick: () => void;
  isPreview?: boolean;
  isActive?: boolean;
}

export default function InternCard({
  intern,
  onClick,
  isPreview = false,
}: InternCardProps) {
  const baseClass =
    "flex flex-col items-center bg-[#112240] rounded-xl border shadow-md cursor-pointer transition-all duration-300 overflow-hidden select-none";

  const previewClass =
    "w-[200px] h-[280px] p-4 opacity-50 flex items-center justify-center  border-[#233554]";

  const activeClass =
    "w-[320px] max-w-[90vw] md:w-[400px] p-10 z-10 border-[#64FFDA] shadow-lg hover:shadow-xl";

  return (
    <motion.div
      onClick={onClick}
      className={`${baseClass} ${isPreview ? previewClass : activeClass}`}
      whileHover={
        isPreview ? undefined : { scale: 1.05, borderColor: "#64FFDA" }
      }
    >
      <Image
        src={intern.avatar || "/default-avatar.png"}
        alt={intern.name}
        width={isPreview ? 80 : 110}
        height={isPreview ? 80 : 110}
        className="rounded-full object-cover aspect-square"
      />

      <h3
        className={`${
          isPreview ? "mt-3 text-base font-semibold" : "mt-5 text-2xl font-bold"
        } text-white text-center truncate`}
      >
        {intern.name}
      </h3>

      {!isPreview && (
        <>
          <p className="text-base text-[#64FFDA] font-medium text-center">
            {intern.position}
          </p>

          {intern.university && (
            <p className="text-sm text-gray-400 mt-2 text-center">
              {intern.university}
            </p>
          )}

          {intern.skills?.[0] && (
            <span className="mt-4 px-4 py-1 rounded-full text-sm font-semibold bg-[#1F2937] text-[#64FFDA]">
              {intern.skills[0]}
            </span>
          )}
        </>
      )}
    </motion.div>
  );
}
