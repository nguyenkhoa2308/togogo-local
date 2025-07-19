# TOGOGO - Ứng dụng Bot giao dịch tự động (Next.js)

Đây là phiên bản Next.js của ứng dụng TOGOGO, được chuyển đổi từ dự án React (Vite) ban đầu. Ứng dụng này sử dụng App Router của Next.js và giữ nguyên 100% thiết kế giao diện của phiên bản gốc.

## Tính năng

- Trang chủ giới thiệu về các dịch vụ bot giao dịch
- Trang About giới thiệu về công ty
- Trang DesignBot với tính năng tabs (Mission, Vision, Values)
- Hỗ trợ animation và hiệu ứng AOS
- Responsive design cho mobile và desktop
- Các component tùy chỉnh (ShinyButton, GradientText)

## Cấu trúc thư mục

```
togogo-next/
├── public/
│   └── images/           # Hình ảnh từ dự án gốc
├── src/
│   ├── app/              # Pages theo App Router của Next.js
│   ├── components/       # React components
│   │   ├── magicui/      # Custom UI components
│   │   ├── providers/    # Providers (AOS, etc.)
│   │   └── specific/     # Specific components
│   ├── layouts/          # Layout components
│   └── lib/              # Utility functions
└── ...
```

## Cài đặt

1. Clone repository
2. Cài đặt dependencies:

```bash
npm install
```

3. Chạy server development:

```bash
npm run dev
```

4. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

## Chức năng Tabs

Tính năng tabs được triển khai trong trang DesignBot và hoạt động như sau:

1. Sử dụng state để theo dõi tab đang active
2. Mỗi tab hiển thị nội dung tương ứng từ object content
3. Styling được áp dụng cho tab đang active để phân biệt với các tab khác

## Deployment

Để build ứng dụng cho production:

```bash
npm run build
```

Sau đó, bạn có thể chạy ứng dụng ở môi trường production:

```bash
npm start
```

## Công nghệ sử dụng

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Font Awesome](https://fontawesome.com/) - Icon library
- [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll library
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with type checking
