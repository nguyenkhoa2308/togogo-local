export const BotMessages = {
  CREATE_SUCCESS: "Tạo bot thành công.",
  CREATE_FAILED: "Tạo bot thất bại. Vui lòng thử lại.",
  UPDATE_SUCCESS: "Cập nhật bot thành công.",
  UPDATE_FAILED: "Cập nhật bot thất bại. Vui lòng thử lại.",
  DELETE_SUCCESS: "Xóa bot thành công.",
  DELETE_FAILED: "Xóa bot thất bại. Vui lòng thử lại.",
  CONFIRM_DELETE: "Bạn có chắc chắn muốn xóa bot này không?",
  VALIDATION_FAILED: "Vui lòng điền đầy đủ thông tin trước khi tiếp tục.",
  FETCH_FAILED: "Không thể tải danh sách bot. Vui lòng thử lại sau.",
  UNKNOWN_ERROR: "Đã xảy ra lỗi không xác định.",
};

export const BotStatuses = {
  ACTIVE: "Đang hoạt động",
  INACTIVE: "Ngưng hoạt động",
};

export const DefaultBotSettings = {
  riskLevel: "medium",
  strategy: "trend-following",
  autoTrade: false,
  maxTradePerDay: 10,
};

export const ConfirmMessages = {
  DELETE_BOT: "Bạn có chắc chắn muốn xóa bot này?",
  DEACTIVATE_BOT: "Bạn có muốn ngừng hoạt động bot này?",
  ACTIVATE_BOT: "Bạn có muốn kích hoạt lại bot này?",
};