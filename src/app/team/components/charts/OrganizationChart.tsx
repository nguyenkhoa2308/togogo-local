import { useRef, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { Building2 } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import EmployeeCard from "@/app/team/components/cards/EmployeeCard";
import { Employee, Department, MousePosition } from "../../types";
import EmployeeTooltipModal from "../modals/EmployeeTooltipModal";

interface OrganizationChartProps {
  onLoaded?: () => void;
}

const ceo: Employee = {
  id: "ceo",
  name: "Nguyễn Văn A",
  position: "Giám đốc điều hành",
  department: "Ban Giám Đốc",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0fKFfYeXvCTVXKladB4ZXR8SY8nSFJgvGKg&s",
  email: "nguyenvana@company.com",
  phone: "0901234567",
  joinDate: "01/2010",
  location: "Hà Nội",
  experience: "15 năm",
  skills: ["Quản lý", "Chiến lược", "Tài chính"],
  bio: "Lãnh đạo cấp cao, định hướng chiến lược cho toàn bộ công ty.",
};

const departments: Department[] = [
  {
    id: "pine",
    name: "Pine Script",
    gradient: "from-blue-500 to-cyan-500",
    manager: {
      id: "m1",
      name: "Trần Thị B",
      position: "Trưởng phòng",
      department: "Pine Script",
      avatar: "/pine-manager.jpg",
      email: "tranthib@company.com",
      phone: "0911111111",
      joinDate: "05/2016",
      location: "Hà Nội",
      experience: "7 năm",
      skills: ["Pine Script", "Phân tích kỹ thuật"],
      bio: "Quản lý bộ phận chuyên nghiên cứu và phát triển chiến lược giao dịch.",
    },
    employees: [
      {
        id: "e1",
        name: "Lê Văn C",
        position: "Chuyên viên",
        department: "Pine Script",
        avatar: "/pine1.jpg",
        email: "levanc@company.com",
        phone: "0900000001",
        joinDate: "07/2018",
        location: "Hà Nội",
        experience: "5 năm",
        skills: ["Pine Script"],
        bio: "Chuyên viết và tối ưu hóa các indicator giao dịch.",
      },
      {
        id: "e2",
        name: "Phạm Thị D",
        position: "Lập trình viên",
        department: "Pine Script",
        avatar: "/pine2.jpg",
        email: "phamthid@company.com",
        phone: "0900000002",
        joinDate: "03/2020",
        location: "TP. HCM",
        experience: "3 năm",
        skills: ["Pine Script", "TradingView"],
        bio: "Đảm nhiệm backtest và triển khai các chiến lược.",
      },
    ],
  },
  {
    id: "api",
    name: "API Togo",
    gradient: "from-green-500 to-teal-500",
    manager: {
      id: "m2",
      name: "Hoàng Văn E",
      position: "Trưởng phòng",
      department: "API Togo",
      avatar: "/api-manager.jpg",
      email: "hoangvane@company.com",
      phone: "0900000003",
      joinDate: "08/2017",
      location: "Đà Nẵng",
      experience: "6 năm",
      skills: ["REST API", "OAuth", "Redis"],
      bio: "Điều phối và phát triển nền tảng API phục vụ hệ thống giao dịch.",
    },
    employees: [
      {
        id: "e3",
        name: "Ngô Thị F",
        position: "Chuyên viên",
        department: "API Togo",
        avatar: "/api1.jpg",
        email: "ngothif@company.com",
        phone: "0900000004",
        joinDate: "11/2019",
        location: "Huế",
        experience: "4 năm",
        skills: ["Node.js", "PostgreSQL"],
        bio: "Chuyên phát triển API backend.",
      },
      {
        id: "e4",
        name: "Đỗ Văn G",
        position: "Lập trình viên",
        department: "API Togo",
        avatar: "/api2.jpg",
        email: "dovang@company.com",
        phone: "0900000005",
        joinDate: "04/2021",
        location: "TP. HCM",
        experience: "2 năm",
        skills: ["Swagger", "NestJS"],
        bio: "Tập trung vào testing và cấu trúc API service.",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    gradient: "from-pink-500 to-purple-500",
    manager: {
      id: "m3",
      name: "Vũ Thị H",
      position: "Trưởng phòng",
      department: "Marketing",
      avatar: "/mkt-manager.jpg",
      email: "vuthih@company.com",
      phone: "0900000006",
      joinDate: "02/2018",
      location: "TP. HCM",
      experience: "5 năm",
      skills: ["Digital Marketing", "SEO", "Content"],
      bio: "Quản lý và định hướng các chiến dịch marketing công ty.",
    },
    employees: [
      {
        id: "e5",
        name: "Bùi Văn I",
        position: "Chuyên viên",
        department: "Marketing",
        avatar: "/mkt1.jpg",
        email: "buivani@company.com",
        phone: "0900000007",
        joinDate: "05/2020",
        location: "Cần Thơ",
        experience: "3 năm",
        skills: ["SEO", "Design"],
        bio: "Tập trung thiết kế và tối ưu hóa landing page.",
      },
      {
        id: "e6",
        name: "Lý Thị K",
        position: "Nhân viên",
        department: "Marketing",
        avatar: "/mkt2.jpg",
        email: "lythik@company.com",
        phone: "0900000008",
        joinDate: "10/2021",
        location: "Nha Trang",
        experience: "1.5 năm",
        skills: ["Content", "Tiktok"],
        bio: "Chuyên xây dựng nội dung mạng xã hội.",
      },
    ],
  },
];

export default function OrganizationChart({
  onLoaded,
}: OrganizationChartProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (employee: Employee, event: React.MouseEvent) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Update mouse position
    setMousePosition({ x: event.clientX, y: event.clientY });
    setSelectedEmployee(employee);
  };

  const handleMouseLeave = () => {
    // Only close if not hovering tooltip
    if (!isTooltipHovered) {
      timeoutRef.current = setTimeout(() => {
        setSelectedEmployee(null);
      }, 150); // Small delay to prevent flickering
    }
  };

  const handleTooltipMouseEnter = () => {
    setIsTooltipHovered(true);
    // Clear timeout if hovering into tooltip
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleTooltipMouseLeave = () => {
    setIsTooltipHovered(false);
    // Close tooltip after small delay
    timeoutRef.current = setTimeout(() => {
      setSelectedEmployee(null);
    }, 150);
  };

  // Update mouse position on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (selectedEmployee) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (selectedEmployee) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [selectedEmployee]);

  useEffect(() => {
    // Sau khi tổ chức đã mount xong, thông báo về
    onLoaded?.();
  }, [onLoaded]);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="text-white relative p-4 mb-16 z-10">
      <div className="w-full mx-auto relative z-10 text-center mt-12">
        <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">
          Cơ Cấu Tổ Chức <span className="text-[#64FFDA]">Của TOGOGO</span>
        </h2>
        <p
          className="text-[#8892B0] max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Những con người giữ vai trò trọng yếu trong việc xây dựng chiến lược
          và điều phối hoạt động tại TOGOGO.
        </p>
      </div>
      {/* {selected && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <Image
              src={selected.avatar || ""}
              alt={selected.name}
              width={80}
              height={80}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{selected.name}</h3>
            <p className="text-sm text-gray-600">
              {selected.position}{" "}
              {selected.department ? `- ${selected.department}` : ""}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              📍 {selected.location} • 📞 {selected.phone} • 📧 {selected.email}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Gia nhập: {selected.joinDate} • Kinh nghiệm: {selected.experience}
            </p>
            <p className="mt-4 text-gray-700 text-sm">{selected.bio}</p>
            {selected.skills && selected.skills.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-1">Kỹ năng:</p>
                <ul className="flex flex-wrap justify-center gap-2 text-xs">
                  {selected.skills.map((skill, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-200 rounded-full px-3 py-1 text-gray-700"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )} */}

      <div className="flex justify-center mt-8" data-aos="fade-up">
        <Tree
          lineWidth={"2px"}
          lineColor={"#ccc"}
          lineBorderRadius={"10px"}
          label={
            <EmployeeCard
              employee={ceo}
              onClick={() => setSelectedEmployee(ceo)}
              onHover={(e) => handleMouseEnter(ceo, e)}
              onLeave={handleMouseLeave}
            />
          }
        >
          {departments.map((dept) => (
            <TreeNode
              key={dept.id}
              label={
                <div className="text-center p-4 bg-[#112240] border border-[#1f3a5f] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="inline-flex items-center gap-2 justify-center text-sm font-semibold text-cyan-300 tracking-wide">
                    <Building2 className="w-4 h-4 text-[#64FFDA]" />
                    {dept.name}
                  </div>
                </div>
              }
            >
              <TreeNode
                label={
                  <EmployeeCard
                    employee={dept.manager}
                    onClick={() => setSelectedEmployee(dept.manager)}
                    onHover={(e) => handleMouseEnter(dept.manager, e)}
                    onLeave={handleMouseLeave}
                  />
                }
              >
                {dept.employees.map((emp) => (
                  <TreeNode
                    key={emp.id}
                    label={
                      <EmployeeCard
                        employee={emp}
                        onClick={() => setSelectedEmployee(emp)}
                        onHover={(e) => handleMouseEnter(emp, e)}
                        onLeave={handleMouseLeave}
                      />
                    }
                  />
                ))}
              </TreeNode>
            </TreeNode>
          ))}
        </Tree>
        <EmployeeTooltipModal
          employee={selectedEmployee}
          mousePosition={mousePosition}
          onEnter={handleTooltipMouseEnter}
          onLeave={handleTooltipMouseLeave}
        />
      </div>
    </section>
  );
}
