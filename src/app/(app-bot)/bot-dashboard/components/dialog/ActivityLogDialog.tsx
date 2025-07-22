import { useEffect, useState } from "react";
import {
  //   Clock,
  User,
  Settings,
  Play,
  Pause,
  AlertTriangle,
  LogIn,
  LogOut,
  CreditCard,
  Wallet,
  Shield,
  FileText,
  Edit,
  Trash2,
  Eye,
  Download,
  X,
  CheckIcon,
  ChevronDown,
} from "lucide-react";

interface ActivityLogDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityLogDialog({ isOpen, onClose }: ActivityLogDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModule, setFilterModule] = useState("all");
  const [filterDropdown, setFilterDropdown] = useState(false);

  const allActivities = [
    {
      id: 1,
      action: "Đăng nhập hệ thống",
      target: "Web Dashboard",
      time: "15:42:32",
      date: "18/7/2025",
      status: "success" as const,
      icon: LogIn,
      module: "AUTH",
    },
    {
      id: 2,
      action: "Nạp tiền vào tài khoản",
      target: "50,000,000 VND",
      time: "15:35:15",
      date: "18/7/2025",
      status: "success" as const,
      icon: CreditCard,
      module: "PAYMENT",
    },
    {
      id: 3,
      action: "Khởi động bot giao dịch",
      target: "VNINDEX-MOMENTUM",
      time: "15:30:42",
      date: "18/7/2025",
      status: "success" as const,
      icon: Play,
      module: "BOT",
    },
    {
      id: 4,
      action: "Cập nhật cài đặt bảo mật",
      target: "Two-Factor Authentication",
      time: "15:25:18",
      date: "18/7/2025",
      status: "success" as const,
      icon: Shield,
      module: "SECURITY",
    },
    {
      id: 5,
      action: "Tải xuống báo cáo",
      target: "Báo cáo P&L tháng 6",
      time: "15:20:33",
      date: "18/7/2025",
      status: "success" as const,
      icon: Download,
      module: "REPORT",
    },
    {
      id: 6,
      action: "Dừng bot giao dịch",
      target: "HNX30E-ARBITRAGE",
      time: "15:15:28",
      date: "18/7/2025",
      status: "warning" as const,
      icon: Pause,
      module: "BOT",
    },
    {
      id: 7,
      action: "Thực hiện giao dịch",
      target: "MUA VN30F240X - 3 HĐ",
      time: "15:10:45",
      date: "18/7/2025",
      status: "success" as const,
      icon: User,
      module: "TRADING",
    },
    {
      id: 8,
      action: "Xem lịch sử giao dịch",
      target: "Báo cáo chi tiết",
      time: "15:08:12",
      date: "18/7/2025",
      status: "info" as const,
      icon: Eye,
      module: "HISTORY",
    },
    {
      id: 9,
      action: "Yêu cầu rút tiền",
      target: "10,000,000 VND",
      time: "14:55:20",
      date: "18/7/2025",
      status: "pending" as const,
      icon: Wallet,
      module: "PAYMENT",
    },
    {
      id: 10,
      action: "Tạo chiến lược mới",
      target: "VN30-SCALPING-V2",
      time: "14:45:33",
      date: "18/7/2025",
      status: "success" as const,
      icon: FileText,
      module: "STRATEGY",
    },
    {
      id: 11,
      action: "Sửa thông tin tài khoản",
      target: "Cập nhật địa chỉ email",
      time: "14:30:18",
      date: "18/7/2025",
      status: "success" as const,
      icon: Edit,
      module: "ACCOUNT",
    },
    {
      id: 12,
      action: "Xóa bot không sử dụng",
      target: "OLD-TEST-BOT-V1",
      time: "14:25:42",
      date: "18/7/2025",
      status: "success" as const,
      icon: Trash2,
      module: "BOT",
    },
    {
      id: 13,
      action: "Cập nhật chiến lược",
      target: "GRID-TRADING-STRATEGY",
      time: "14:20:15",
      date: "18/7/2025",
      status: "success" as const,
      icon: Settings,
      module: "STRATEGY",
    },
    {
      id: 14,
      action: "Kiểm tra tỷ lệ thắng",
      target: "Performance Analytics",
      time: "14:15:30",
      date: "18/7/2025",
      status: "info" as const,
      icon: User,
      module: "ANALYSIS",
    },
    {
      id: 15,
      action: "Cập nhật cài đặt rủi ro",
      target: "Max Daily Loss: 5%",
      time: "14:10:25",
      date: "18/7/2025",
      status: "success" as const,
      icon: AlertTriangle,
      module: "RISK",
    },
    {
      id: 16,
      action: "Đăng xuất khỏi hệ thống",
      target: "Mobile App",
      time: "13:45:12",
      date: "18/7/2025",
      status: "info" as const,
      icon: LogOut,
      module: "AUTH",
    },
    {
      id: 17,
      action: "Backup cài đặt bot",
      target: "All Bot Configurations",
      time: "13:30:08",
      date: "18/7/2025",
      status: "success" as const,
      icon: Download,
      module: "SYSTEM",
    },
    {
      id: 18,
      action: "Thay đổi mật khẩu",
      target: "Account Security",
      time: "13:15:45",
      date: "18/7/2025",
      status: "success" as const,
      icon: Shield,
      module: "SECURITY",
    },
    {
      id: 19,
      action: "Tạo bot mới",
      target: "MOMENTUM-TRADER-V3",
      time: "12:50:22",
      date: "18/7/2025",
      status: "success" as const,
      icon: Play,
      module: "BOT",
    },
    {
      id: 20,
      action: "Kiểm tra kết nối API",
      target: "VN Derivatives Exchange",
      time: "12:30:18",
      date: "18/7/2025",
      status: "success" as const,
      icon: Settings,
      module: "SYSTEM",
    },
  ];

  const filterOptions = [
    { value: "all", label: "Tất cả" },
    { value: "auth", label: "Xác thực" },
    { value: "payment", label: "Thanh toán" },
    { value: "bot", label: "Bot" },
  ];

  const filteredActivities = allActivities.filter((activity) => {
    const matchesSearch =
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule =
      filterModule === "all" || activity.module.toLowerCase() === filterModule;
    return matchesSearch && matchesModule;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
      case "pending":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  const getModuleBadgeColor = (module: string) => {
    switch (module) {
      case "AUTH":
        return "border-blue-500 text-blue-400";
      case "PAYMENT":
        return "border-green-500 text-green-400";
      case "BOT":
        return "border-purple-500 text-purple-400";
      default:
        return "border-gray-500 text-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return { text: "Thành công", className: "bg-green-600" };
      case "pending":
        return { text: "Đang chờ", className: "bg-orange-600" };
      case "warning":
        return { text: "Cảnh báo", className: "bg-yellow-600" };
      case "info":
        return { text: "Thông tin", className: "bg-blue-600" };
      default:
        return { text: "Lỗi", className: "bg-gray-600" };
    }
  };

  const handleSeclectFilter = (filter: string) => {
    setFilterModule(filter);
    setFilterDropdown(false);
  };

  const getLabelByValue = (
    options: { value: string; label: string }[],
    value: string
  ): string => {
    return options.find((opt) => opt.value === value)?.label || value;
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 z-50 bg-black opacity-80"></div>
      <div className="bg-[#0f172a] p-6 w-full max-w-2xl max-h-[90vh] rounded-xl shadow-lg flex flex-col overflow-hidden border border-[#64ffda14] relative z-50">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center sm:text-left border-b border-[#64ffda14] pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white text-xl">
                Lịch sử hoạt động hệ thống
              </h2>
              <p className="text-[#94a3b8] text-sm mt-1">
                Xem chi tiết các hoạt động và thao tác thực hiện trong hệ thống
                giao dịch
              </p>
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all px-3 h-8 rounded-md hover:bg-[#334155]/20"
              title="Đóng dialog"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 py-4 border-b border-[#64ffda14] flex-shrink-0">
          <input
            type="text"
            placeholder="Tìm kiếm hoạt động..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 text-xs rounded bg-gray-800 text-white border border-gray-600 placeholder:text-[#94a3b8] outline-none focus-visible:border-[#64ffda] focus-visible:ring-[#64ffda80]/50 focus-visible:ring-[3px]"
          />
          <div
            className="relative"
            tabIndex={0}
            onBlur={() => setTimeout(() => setFilterDropdown(false), 100)}
          >
            <button
              value={filterModule}
              onClick={() => setFilterDropdown(!filterDropdown)}
              className="h-9 w-[150px] flex items-center justify-between rounded-md border border-gray-700 bg-[#1E293B] text-white text-sm px-3"
            >
              {getLabelByValue(filterOptions, filterModule)}
              <ChevronDown
                className={`w-3 h-3 transition-all ${
                  filterDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {filterDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-[#0F172A] border border-white/10 rounded-md shadow-lg">
                {filterOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSeclectFilter(option.value)}
                    className={`block text-xs w-full text-left px-3 py-2 hover:bg-white/10 transition-colors ${
                      option.value === filterModule ? "bg-white/5" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-sm">
                        {option.label}
                      </div>

                      {option.value === filterModule ? (
                        <CheckIcon className="w-4 h-4" />
                      ) : (
                        ""
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
          {filteredActivities.length === 0 ? (
            <div className="text-gray-400 text-sm text-center mt-2">
              Không có hoạt động nào.
            </div>
          ) : (
            filteredActivities.map((activity) => {
              const Icon = activity.icon;
              const statusBadge = getStatusBadge(activity.status);

              return (
                <div
                  key={activity.id}
                  className="flex justify-between items-center p-3 rounded-md border border-[#00e5a114] hover:bg-[#334155]/20"
                >
                  <div className="flex items-center space-x-4">
                    <Icon
                      className={`w-5 h-5 ${getStatusColor(activity.status)}`}
                    />
                    <div>
                      <p className="text-white text-sm font-medium">
                        {activity.action}
                      </p>
                      <p className="text-gray-400 text-xs">{activity.target}</p>
                    </div>
                    <span
                      className={`ml-2 text-[10px] border rounded px-2 py-1 rounded-lg ${getModuleBadgeColor(
                        activity.module
                      )}`}
                    >
                      {activity.module}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xs text-white px-2 py-1 rounded-lg ${statusBadge.className}`}
                    >
                      {statusBadge.text}
                    </span>
                    <div className="text-right">
                      <p className="text-white text-sm">{activity.time}</p>
                      <p className="text-gray-400 text-xs">{activity.date}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#00e5a114] p-4 text-sm text-gray-400 flex justify-between items-center">
          <span>
            Hiển thị {filteredActivities.length} trong {allActivities.length}{" "}
            hoạt động
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#64ffda14] text-white bg-[#020617]/80 cursor-pointer hover:bg-[#020617]"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
