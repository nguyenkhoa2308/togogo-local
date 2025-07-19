import Image from "next/image";
import { Employee } from "../../types";
import { motion } from "framer-motion";

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
  onHover?: (e: React.MouseEvent) => void;
  onLeave?: () => void;
}

export default function EmployeeCard({
  employee,
  onClick,
  onHover,
  onLeave,
}: EmployeeCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="inline-flex flex-col items-center p-5 bg-[#112240] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#233554] w-[180px] sm:w-[200px] md:w-[220px] max-w-full"
      whileHover={{
        translateY: -5,
        borderColor: "#64FFDA",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Image
        src={employee.avatar || "/default-avatar.png"}
        alt={employee.name}
        width={90}
        height={90}
        className="rounded-full object-cover aspect-square"
      />
      <h3 className="mt-4 text-base md:text-lg font-semibold text-white text-center">
        {employee.name}
      </h3>
      <p className="text-sm text-[#64FFDA] font-medium text-center">
        {employee.position}
      </p>
    </motion.div>
  );
}
