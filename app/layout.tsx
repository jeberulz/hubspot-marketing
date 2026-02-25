import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { OnboardingProvider } from "@/lib/onboarding/context";
import { AppShell } from "@/components/layout/AppShell";

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
        <OnboardingProvider>
          <ToastProvider>
            <AppShell>{children}</AppShell>
          </ToastProvider>
        </OnboardingProvider>
      </body>
    </html>
  );
}
