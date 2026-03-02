"use client";

import {
  Home,
  Bookmark,
  UserSquare2,
  Megaphone,
  FileText,
  Inbox,
  Wallet,
  BellRing,
  Database,
  GitMerge,
  BarChart2,
  Sparkles,
  Code2,
  Layers,
} from "lucide-react";

function HubSpotLogo() {
  return (
    <svg viewBox="0 0 512 512" className="w-7 h-7" fill="#FF7A59">
      <path d="M267.4 211.6c-25.1 23.7-40.8 57.3-40.8 94.6 0 29.3 9.7 56.3 26 78L203.1 434c-4.4-1.6-9.1-2.5-14-2.5-10.8 0-20.9 4.2-28.5 11.8-7.6 7.6-11.8 17.8-11.8 28.6s4.2 20.9 11.8 28.5c7.6 7.6 17.8 11.8 28.5 11.8 10.8 0 20.9-4.2 28.6-11.8 7.6-7.6 11.8-17.8 11.8-28.5 0-4.2-.6-8.2-1.9-12.1l50-50.2c22 16.9 49.4 26.9 79.3 26.9 71.9 0 130-58.3 130-130.2 0-65.2-47.7-119.2-110.2-128.7V116c17.6-7.3 29.9-24.7 29.9-44.9 0-26.8-21.7-48.5-48.5-48.5-26.8 0-48.5 21.7-48.5 48.5 0 20.2 12.3 37.6 29.9 44.9v51.3c-29.6 4.5-55.9 18.4-75.8 38.3zM357.9 306.2c0 37.4-30.4 67.8-67.8 67.8-37.4 0-67.8-30.4-67.8-67.8 0-37.4 30.4-67.8 67.8-67.8 37.4 0 67.8 30.4 67.8 67.8z" />
    </svg>
  );
}

const navItems = [
  { icon: Home, active: false },
  { icon: Bookmark, active: false },
  "divider" as const,
  { icon: UserSquare2, active: false },
  { icon: Megaphone, active: true },
  { icon: FileText, active: false },
  { icon: Inbox, active: false },
  { icon: Wallet, active: false },
  { icon: BellRing, active: false },
  { icon: Database, active: false },
  { icon: GitMerge, active: false },
  { icon: BarChart2, active: false },
  { icon: Sparkles, active: false },
  { icon: Code2, active: false },
];

export function Sidebar() {
  return (
    <aside className="w-[56px] bg-[#2D3E50] flex flex-col items-center py-4 border-r border-white/5 shrink-0 z-20">
      {/* Logo */}
      <div className="mb-6 w-full flex justify-center">
        <HubSpotLogo />
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col gap-3 w-full px-2 flex-1">
        {navItems.map((item, i) => {
          if (item === "divider") {
            return (
              <div
                key={`divider-${i}`}
                className="w-6 h-px bg-white/10 mx-auto my-1"
              />
            );
          }

          const Icon = item.icon;

          if (item.active) {
            return (
              <a
                key={i}
                href="#"
                className="relative bg-[#425b76] rounded-md p-2 flex justify-center w-full transition-colors"
              >
                <Icon size={20} strokeWidth={1.5} className="text-[#00A4BD]" />
              </a>
            );
          }

          return (
            <a
              key={i}
              href="#"
              className="p-2 flex justify-center w-full hover:bg-white/10 rounded-md transition-colors text-[#cbd6e2]"
            >
              <Icon size={20} strokeWidth={1.5} />
            </a>
          );
        })}
      </nav>

      {/* Systems Strategy Link */}
      <div className="w-full px-2 pb-2">
        <div className="w-6 h-px bg-white/10 mx-auto mb-3" />
        <a
          href="/systems"
          title="Systems Strategy"
          className="p-2 flex justify-center w-full hover:bg-[#FF7A59]/20 rounded-md transition-colors text-[#FF7A59]"
        >
          <Layers size={20} strokeWidth={1.5} />
        </a>
      </div>
    </aside>
  );
}
