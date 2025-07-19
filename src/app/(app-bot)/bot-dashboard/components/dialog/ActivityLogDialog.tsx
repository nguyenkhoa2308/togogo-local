import { useState } from "react";
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
} from "lucide-react";

interface ActivityLogDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityLogDialog({ isOpen, onClose }: ActivityLogDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModule, setFilterModule] = useState("all");

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

  const filteredActivities = allActivities.filter((activity) => {
    const matchesSearch =
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule =
      filterModule === "all" || activity.module === filterModule;
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 z-0 bg-black opacity-70"></div>
      <div className="bg-white dark:bg-gray-900 w-full max-w-5xl max-h-[90vh] rounded shadow-lg flex flex-col overflow-hidden opacity-100 relative z-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-gray-100">
            Lịch sử hoạt động hệ thống
          </h2>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-700">
          <input
            type="text"
            placeholder="Tìm kiếm hoạt động..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
          />
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option value="all">Tất cả module</option>
            <option value="AUTH">Xác thực</option>
            <option value="PAYMENT">Thanh toán</option>
            <option value="BOT">Bot</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredActivities.map((activity) => {
            const Icon = activity.icon;
            const statusBadge = getStatusBadge(activity.status);

            return (
              <div
                key={activity.id}
                className="flex justify-between items-center p-3 rounded bg-gray-800 border border-gray-700 hover:bg-gray-700"
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
                    className={`ml-2 text-xs border rounded px-2 py-0 ${getModuleBadgeColor(
                      activity.module
                    )}`}
                  >
                    {activity.module}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-xs text-white px-2 py-0 rounded ${statusBadge.className}`}
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
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4 text-sm text-gray-400 flex justify-between items-center">
          <span>
            Hiển thị {filteredActivities.length} trong {allActivities.length}{" "}
            hoạt động
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-600 text-white hover:bg-gray-700"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
