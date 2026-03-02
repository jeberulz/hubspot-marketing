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
    <svg viewBox="0 0 550 654" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_2024_2273" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="550" height="654">
        <path d="M549.199 0H0V653.258H549.199V0Z" fill="white"/>
      </mask>
      <g mask="url(#mask0_2024_2273)">
        <path fillRule="evenodd" clipRule="evenodd" d="M420.095 168.427V235.518H419.989C481.441 244.907 530.53 291.034 543.123 351.222C555.716 411.409 529.164 472.996 476.521 505.707C423.879 538.418 356.216 535.37 306.8 498.064L251.547 552.676C252.976 557.108 253.738 561.724 253.803 566.375C253.803 592.841 232.096 614.296 205.319 614.296C178.542 614.296 156.835 592.841 156.835 566.375C156.835 539.908 178.542 518.451 205.319 518.451C210.024 518.518 214.693 519.27 219.176 520.682L275.031 465.476C239.815 415.957 238.906 350.166 272.737 299.717L89.2038 158.494C64.5777 172.465 33.398 167.31 14.7129 146.178C-3.97232 125.046 -4.9661 93.8151 12.3387 71.5644C29.6435 49.3136 60.4338 42.2321 85.8993 54.6457C111.365 67.0596 124.422 95.5161 117.095 122.631L303.767 266.328C324.131 250.142 348.46 239.562 374.291 235.658V168.427C355.952 159.961 344.196 141.8 344.106 121.794V120.226C344.184 91.7121 367.55 68.6162 396.399 68.5395H397.987C426.833 68.6162 450.2 91.7121 450.278 120.226V121.794C450.19 141.8 438.434 159.961 420.095 168.427ZM320.832 380.867C320.762 422.577 354.902 456.456 397.103 456.554L397.278 456.59C439.499 456.59 473.725 422.758 473.725 381.028C473.745 339.315 439.564 305.478 397.361 305.433C355.161 305.388 320.905 339.154 320.832 380.867Z" fill="#FF4800"/>
      </g>
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
