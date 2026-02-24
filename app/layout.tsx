import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { ToastProvider } from "@/components/ui/Toast";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Marketing Hub — Message Strategy (Demo)",
  description: "AI Message Strategy & Optimizer for Marketing Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexendDeca.className} bg-[#F5F8FA] text-[#33475B] h-screen w-screen overflow-hidden flex antialiased`}
      >
        <ToastProvider>
          <Sidebar />
          <main className="flex-1 flex flex-col min-w-0 bg-[#F5F8FA]">
            <TopNav />
            <div className="flex-1 overflow-y-auto flex flex-col">
              {children}
            </div>
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
