"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Folder,
  Star,
  Layers,
  Wrench,
  Briefcase,
  GraduationCap,
  X,
  Layout,
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/admin", icon: Layout },
  { name: "Projects", href: "/admin/projects", icon: Folder },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Services", href: "/admin/services", icon: Layers },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  {
    name: "Experiences",
    href: "/admin/experiences",
    icon: Briefcase,
  },
  {
    name: "Educations",
    href: "/admin/educations",
    icon: GraduationCap,
  },
];

export function Sidebar({ onMenuClick }) {
  const pathname = usePathname();

  return (
    <aside
      id="admin-sidebar"
      className="flex h-full min-h-0 w-full flex-col border-r border-[#E1E8F3] bg-white"
    >
      <div className="flex min-h-[84px] shrink-0 items-center justify-between border-b border-[#E1E8F3] px-5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] bg-[#496CBF] font-['Inter'] text-[13px] font-bold text-white">
            TB
          </div>

          <div className="min-w-0">
            <h2 className="font-['Plus_Jakarta_Sans'] text-[14px] font-bold leading-[1.35] tracking-[-0.025em] text-[#182238]">
              Admin Panel
            </h2>

            <p className="mt-[3px] font-['Inter'] text-[11px] font-normal text-[#8994A5]">
              Portfolio Manager
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Close sidebar"
          className="ml-2 flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] border border-[#E1E8F3] bg-white text-[#718096] transition-colors duration-200 hover:border-[#C7D5FF] hover:bg-[#EEF2FF] hover:text-[#496CBF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/20 lg:hidden"
        >
          <X size={16} strokeWidth={1.8} />
        </button>
      </div>

      <nav className="flex-1 space-y-[7px] overflow-y-auto px-4 py-4">
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onMenuClick}
              className={`group relative flex min-h-[51px] items-center gap-[11px] rounded-[9px] border px-[10px] py-[8px] font-['Inter'] text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/20 ${
                active
                  ? "border-[#D5DDF6] bg-[#EEF2FF] text-[#496CBF]"
                  : "border-transparent bg-white text-[#66758B] hover:bg-[#F7F9FC] hover:text-[#496CBF]"
              }`}
            >
              {active && (
                <span className="absolute bottom-[10px] left-0 top-[10px] w-[3px] rounded-r-full bg-[#496CBF]" />
              )}

              <span
                className={`flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[7px] transition-colors duration-200 ${
                  active
                    ? "bg-[#E3EAFE] text-[#496CBF]"
                    : "bg-transparent text-[#9AA8B9] group-hover:text-[#496CBF]"
                }`}
              >
                <item.icon size={16} strokeWidth={1.8} />
              </span>

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex min-h-[52px] shrink-0 items-center border-t border-[#E1E8F3] px-5 sm:px-6">
        <p className="font-['JetBrains_Mono'] text-[10px] font-normal text-[#A0A9B6]">
          © {new Date().getFullYear()} Tanya Batra
        </p>
      </div>
    </aside>
  );
}
