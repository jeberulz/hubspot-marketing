import {
  Search,
  Plus,
  ArrowUp,
  Phone,
  Store,
  HelpCircle,
  Settings,
  Bell,
  Sparkles,
  User,
  ChevronDown,
} from "lucide-react";

export function TopNav() {
  return (
    <header className="h-14 bg-[#2D3E50] flex items-center justify-between px-6 shrink-0 z-10 border-b border-white/5">
      {/* Left: Search */}
      <div className="flex items-center bg-[#1e2a38] rounded-md w-[480px] px-3 py-1.5 border border-white/10 focus-within:border-white/30 transition-colors">
        <Search size={18} strokeWidth={1.5} className="text-[#cbd6e2]" />
        <input
          type="text"
          placeholder="Search HubSpot"
          className="bg-transparent border-none outline-none text-white text-base ml-2 flex-1 placeholder-[#cbd6e2]/70"
        />
        <div className="flex items-center gap-1 opacity-70">
          <span className="border border-[#cbd6e2]/30 rounded px-1.5 py-0.5 text-xs text-[#cbd6e2] flex items-center justify-center font-medium">
            ⌘
          </span>
          <span className="border border-[#cbd6e2]/30 rounded px-1.5 py-0.5 text-xs text-[#cbd6e2] flex items-center justify-center font-medium">
            K
          </span>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-5">
        <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#cbd6e2] hover:text-white hover:bg-white/10 transition-colors">
          <Plus size={18} strokeWidth={1.5} />
        </button>
        <button className="flex items-center gap-2 text-[#FF7A59] hover:text-[#e86c4f] font-medium text-base transition-colors">
          <div className="w-5 h-5 rounded-full bg-[#FF7A59]/10 flex items-center justify-center">
            <ArrowUp size={12} strokeWidth={2.5} />
          </div>
          Upgrade
        </button>
        <div className="flex items-center gap-5 text-[#cbd6e2]">
          <Phone
            size={18}
            strokeWidth={1.5}
            className="hover:text-white cursor-pointer transition-colors"
          />
          <Store
            size={18}
            strokeWidth={1.5}
            className="hover:text-white cursor-pointer transition-colors"
          />
          <HelpCircle
            size={18}
            strokeWidth={1.5}
            className="hover:text-white cursor-pointer transition-colors"
          />
          <Settings
            size={18}
            strokeWidth={1.5}
            className="hover:text-white cursor-pointer transition-colors"
          />
          <Bell
            size={18}
            strokeWidth={1.5}
            className="hover:text-white cursor-pointer transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 text-[#cbd6e2] hover:text-white border border-white/20 hover:border-white/40 rounded px-3 py-1.5 hover:bg-white/5 transition-all">
          <Sparkles size={16} strokeWidth={1.5} className="text-[#FF7A59]" />
          <span className="text-base font-medium">Assistant</span>
        </button>
        <button className="flex items-center gap-2.5 text-[#cbd6e2] hover:text-white ml-2 border-l border-white/20 pl-6 transition-colors">
          <div className="w-7 h-7 rounded-full bg-[#cbd6e2] flex items-center justify-center overflow-hidden">
            <User size={16} strokeWidth={2} className="text-[#2D3E50]" />
          </div>
          <span className="text-base font-medium">Rulz &amp; Co.</span>
          <ChevronDown size={14} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
