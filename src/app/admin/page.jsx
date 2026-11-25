"use client";

import { Folder, Star, Layers, Wrench, GraduationCap, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardSkeleton } from "@/components/admin/DashboardSkeleton";

const statsConfig = [
  {
    key: "projects",
    title: "Projects",
    icon: Folder,
  },
  {
    key: "testimonials",
    title: "Testimonials",
    icon: Star,
  },
  {
    key: "services",
    title: "Services",
    icon: Layers,
  },
  {
    key: "skills",
    title: "Skills",
    icon: Wrench,
  },
  {
    key: "education",
    title: "Education",
    icon: GraduationCap,
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);

      try {
        const res = await axios.get("/api/admin/analytics");
        setStats(res.data);
      } catch (error) {
        console.error("Analytics fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-full w-full bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <main className="min-h-full w-full bg-[#F8FAFC] px-4 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-8">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-[2px] w-5 rounded-full bg-[#496CBF]" />
            <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.04em] text-[#496CBF]">
              Overview
            </span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold leading-[1.3] tracking-[-0.04em] text-[#182238] sm:text-[23px]">
            Content Analytics
          </h2>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-[9px] border border-[#D7E0F5] bg-[#EEF2FF] px-3 py-[7px]">
          <Zap size={12} strokeWidth={1.8} className="text-[#496CBF]" />
          <span className="font-['JetBrains_Mono'] text-[10px] font-normal text-[#6078B5]">
            GET /api/admin/analytics
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {statsConfig.map((item) => (
          <div
            key={item.key}
            className="group flex  flex-col justify-between rounded-[14px] border border-[#E1E8F3] bg-white p-5 shadow-[0_2px_9px_rgba(24,34,56,0.035)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#D1DCF5] hover:shadow-[0_6px_18px_rgba(24,34,56,0.06)] sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-['Inter'] text-[13px] font-medium text-[#667A9A]">
                  {item.title}
                </h3>
                <div className="mt-[6px] h-[2px] w-6 rounded-full bg-[#E1E8F3] transition-colors duration-200 group-hover:bg-[#496CBF]/40" />
              </div>

              <div className="flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-[10px] border border-[#EEF2FF] bg-[#F0F3FF] text-[#496CBF] transition-colors duration-200 group-hover:bg-[#496CBF] group-hover:text-white">
                <item.icon size={19} strokeWidth={1.8} />
              </div>
            </div>

            <div className="mt-7">
              <div className="flex min-w-0 items-baseline gap-2">
                <p className="min-w-0 break-words font-['Plus_Jakarta_Sans'] text-[30px] font-bold leading-[1.15] tracking-[-0.045em] text-[#182238] sm:text-[34px]">
                  {stats[item.key]}
                </p>

                <span className="shrink-0 font-['Inter'] text-[11px] font-normal text-[#9AA5B5]">
                  total
                </span>
              </div>

              <p className="mt-[7px] font-['JetBrains_Mono'] text-[10px] font-normal tracking-[-0.02em] text-[#A0A9B6]">
                Updated automatically
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
