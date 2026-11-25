"use client";

import axios from "axios";
import { ExternalLink, LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AdminHeader({ onMenuClick }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout");
      toast.success("Logged out successfully");
      router.replace("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full shrink-0 border-b border-[#E1E8F3] bg-white">
      <div className="flex min-h-[68px] w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            aria-controls="admin-sidebar"
            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[9px] border border-[#E1E8F3] bg-[#F8FAFC] text-[#496CBF] transition-colors duration-200 hover:border-[#C7D5FF] hover:bg-[#EEF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/20 lg:hidden"
          >
            <Menu size={18} strokeWidth={1.9} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate font-['Plus_Jakarta_Sans'] text-[15px] font-bold leading-[1.35] tracking-[-0.035em] text-[#182238] sm:text-[16px]">
              Admin Dashboard
            </h1>

            <div className="mt-[3px] flex items-center gap-[6px]">
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#42B883]" />
              <span className="truncate font-['JetBrains_Mono'] text-[10px] font-normal text-[#8994A5]">
                Portfolio Management
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-[10px]">
          <button
            type="button"
            onClick={() => window.open("/", "_blank")}
            aria-label="Open portfolio"
            className="flex h-[37px] w-[37px] items-center justify-center rounded-[9px] border border-[#E1E8F3] bg-white text-[#496CBF] shadow-[0_1px_3px_rgba(24,34,56,0.025)] transition-colors duration-200 hover:border-[#C7D5FF] hover:bg-[#EEF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/20"
          >
            <ExternalLink size={16} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            className="flex h-[37px] w-[37px] items-center justify-center rounded-[9px] border border-[#F3D8DE] bg-[#FFF6F7] text-[#D94B62] transition-colors duration-200 hover:border-[#F0BBC5] hover:bg-[#FFF0F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E34D68]/20"
          >
            <LogOut size={16} strokeWidth={1.8} />
          </button>

          <div className="ml-[2px] flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#496CBF] font-['Inter'] text-[12px] font-semibold text-white">
            TB
          </div>
        </div>
      </div>
    </header>
  );
}
