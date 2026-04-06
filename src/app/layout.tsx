import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/context/ProgressContext";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DM Study Hub — Discrete Mathematics MA2013 | KIIT",
  description: "Interactive study app for Discrete Mathematics (MA 2013) — KIIT University exam preparation with PYQs, quizzes, and progress tracking.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0f] text-[#f1f5f9] min-h-screen antialiased`}>
        <ProgressProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}
