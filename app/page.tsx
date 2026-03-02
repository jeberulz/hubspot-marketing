"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/marketing/messages");
  }, [router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#F5F8FA]">
      <div className="w-8 h-8 border-2 border-[#00A4BD] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
