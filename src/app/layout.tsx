"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import AOSProvider from "@/components/providers/AOSProvider";
import ScrollToTopButton from "@/components/specific/ScrollToTopButton";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// Metadata đã được di chuyển hoặc xử lý ở nơi khác do 'use client'
// export const metadata: Metadata = {
//   title: "TOGOGO - Bot giao dịch tự động",
//   description: "TOGOGO cung cấp các giải pháp bot giao dịch tự động, thiết kế theo yêu cầu và tư vấn chiến lược giao dịch.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");
  const isUserPage = pathname.startsWith("/user");

  return (
    <html lang="vi" className="scrollbar-hide">
      <body className={inter.className}>
        <AOSProvider>
          {!isBlogPage && !isUserPage && <Header />}
          <main className="min-h-screen">{children}</main>
          {!isBlogPage && !isUserPage && <Footer />}
          <ScrollToTopButton />
        </AOSProvider>
      </body>
    </html>
  );
}
