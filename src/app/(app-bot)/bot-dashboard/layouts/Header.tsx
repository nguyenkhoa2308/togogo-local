import { useState } from "react";
import {
  Bell,
  Search,
  User,
  ChevronDown,
  Settings,
  LogOut,
  Menu,
  X,
  //   Filter,
  Command,
} from "lucide-react";

interface HeaderProps {
  isMobile: boolean;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({
  isMobile,
  sidebarOpen,
  onToggleSidebar,
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Bot VNINDEX-MOMENTUM đạt mục tiêu +12.5%",
      time: "5 phút trước",
      type: "success",
      unread: true,
    },
    {
      id: 2,
      title: "Cảnh báo: VN30F-240X vượt ngưỡng rủi ro",
      time: "12 phút trước",
      type: "warning",
      unread: true,
    },
    {
      id: 3,
      title: "Nạp tiền thành công: 50,000,000 VND",
      time: "1 giờ trước",
      type: "info",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const searchSuggestions = [
    { type: "bot", name: "VNINDEX-MOMENTUM", desc: "Bot giao dịch VN30F" },
    { type: "strategy", name: "Mean Reversion", desc: "Chiến lược đảo chiều" },
    { type: "symbol", name: "VN30F-240X", desc: "Phái sinh VN30" },
    { type: "command", name: "Tạo bot mới", desc: "Khởi tạo bot trading" },
  ];

  const filteredSuggestions = searchValue
    ? searchSuggestions.filter(
        (s) =>
          s.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          s.desc.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  return (
    <header className="bg-gray-900 border-b border-gray-700 relative z-2">
      <div className="h-17 px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <button
              onClick={onToggleSidebar}
              className="p-2 text-white hover:bg-gray-700 rounded"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}

          {isMobile && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VN</span>
              </div>
              <h1 className="text-white font-semibold text-sm">
                VN DERIVATIVES
              </h1>
            </div>
          )}

          {!isMobile && (
            <div className="relative">
              <div
                className={`flex items-center border border-gray-600 rounded-lg transition-all duration-300 ${
                  searchFocused ? "w-96" : "w-80"
                } bg-gray-800`}
              >
                <div className="absolute left-3 flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  {!searchValue && (
                    <Command className="w-3 h-3 text-gray-500" />
                  )}
                </div>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  placeholder="Tìm kiếm bot, chiến lược... (Ctrl+K)"
                  className="w-full pl-10 pr-4 py-2 bg-transparent text-white focus:outline-none"
                />
                {searchValue && (
                  <button
                    onClick={() => setSearchValue("")}
                    className="absolute right-2 h-6 w-6 text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {searchFocused && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 hover:bg-gray-700 cursor-pointer border-b border-gray-600"
                      onClick={() => {
                        setSearchValue(suggestion.name);
                        setSearchFocused(false);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`text-xs px-2 py-1 border rounded ${
                            suggestion.type === "bot"
                              ? "border-blue-500 text-blue-400"
                              : suggestion.type === "strategy"
                              ? "border-purple-500 text-purple-400"
                              : suggestion.type === "symbol"
                              ? "border-orange-500 text-orange-400"
                              : "border-green-500 text-green-400"
                          }`}
                        >
                          {suggestion.type}
                        </span>
                        <div>
                          <div className="font-medium text-sm text-white">
                            {suggestion.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {suggestion.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isMobile && (
            <button className="p-2 text-white hover:bg-gray-700 rounded">
              <Search className="w-5 h-5" />
            </button>
          )}

          {!isMobile && (
            <div className="hidden xl:flex items-center space-x-4 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg">
              <div className="text-center">
                <div className="text-xs text-gray-400">P&L Hôm nay</div>
                <div className="text-sm font-semibold text-green-400">
                  +₫7.45M
                </div>
              </div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Bot Active</div>
                <div className="text-sm font-semibold text-white">5/10</div>
              </div>
            </div>
          )}

          <div className="relative">
            <button className="p-2 text-white hover:bg-gray-700 rounded relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          <div className="relative group">
            <button className="flex items-center space-x-2 px-2 py-1 text-white hover:bg-gray-700 rounded">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">TN</span>
              </div>
              {!isMobile && (
                <>
                  <div className="text-left">
                    <div className="text-sm font-medium">Trader Nam</div>
                    <div className="text-xs text-gray-400">Premium</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </>
              )}
            </button>
            <div className="absolute right-0 w-full h-4 top-full"> </div>
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-600 rounded-lg shadow-xl hidden group-hover:block z-50">
              <div className="p-3 border-b border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">TN</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Trader Nam</div>
                    <div className="text-sm text-gray-400">
                      trader.nam@vnderivatives.com
                    </div>
                    <span className="inline-block text-xs mt-1 px-2 py-0.5 bg-blue-600 text-white rounded">
                      Premium
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button className="w-full text-left flex items-center space-x-2 px-3 py-2 text-white hover:bg-gray-700 rounded">
                  <User className="w-4 h-4" />
                  <span>Hồ sơ cá nhân</span>
                </button>
                <button className="w-full text-left flex items-center space-x-2 px-3 py-2 text-white hover:bg-gray-700 rounded">
                  <Settings className="w-4 h-4" />
                  <span>Cài đặt tài khoản</span>
                </button>
              </div>
              <div className="border-t border-gray-600 p-2">
                <button className="w-full text-left flex items-center space-x-2 px-3 py-2 text-red-500 hover:bg-gray-700 rounded">
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>

          {!isMobile && (
            <div className="hidden lg:flex items-center space-x-3 px-4 py-2 bg-[#00e5a1]/20 border border-[#00e5a1] rounded-lg">
              <div className="text-right">
                <div className="text-xs text-gray-400">Số dư khả dụng</div>
                <div className="text-sm font-semibold text-[#00e5a1]">
                  ₫261.1M
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
