import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      aria-label="Hero section"
      className="relative overflow-hidden bg-white"
    >
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[1280px] items-center justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-0 lg:py-24">
        <div className="flex w-full max-w-[850px] flex-col items-center text-center">
          <div className="inline-flex h-[30px] items-center gap-[9px] rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-[13px]">
            <span className="h-[8px] w-[8px] rounded-full bg-[#22C55E]" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35px] text-[#15803D]">
              Available for Opportunities
            </span>
          </div>

          <h1 className="mt-8 max-w-[850px] font-heading text-[36px] font-bold leading-[1.18] tracking-[-1.5px] text-[#182238] sm:text-[48px] sm:leading-[1.2] sm:tracking-[-1.8px] lg:text-[62px] lg:leading-[1.15] lg:tracking-[-2.5px]">
            Building <span className="text-[#496CBF]">scalable</span> systems
            for modern web applications.
          </h1>

          <p className="mt-7 max-w-[680px] font-body text-[14px] font-normal leading-[26px] text-[#667A9A] sm:text-[15px] sm:leading-[28px] lg:text-[16px]">
            Laravel backend developer with 1.5+ years of hands-on experience
            building scalable business applications at Buildupnet. I design
            secure RESTful APIs, structure efficient MySQL schemas, and
            implement clean backend architectures that support real-world
            products — including e-commerce platforms and full-scale salon
            management systems.
          </p>

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-[14px]">
            <Link
              href="/contact"
              className="inline-flex h-[52px] w-full items-center justify-center gap-[11px] rounded-[10px] bg-[#496CBF] px-7 text-[14px] font-semibold text-white transition-colors hover:bg-[#3D5FAE] sm:w-auto"
            >
              Let's Discuss the Role
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/projects"
              className="inline-flex h-[52px] w-full items-center justify-center gap-[9px] rounded-[10px] border border-[#DFE6F1] bg-white px-[23px] text-[14px] font-medium text-[#182238] transition-colors hover:border-[#496CBF] hover:bg-[#F8FAFF] sm:w-auto"
            >
              View Projects
              <ArrowUpRight size={16} className="text-[#64748B]" />
            </Link>
          </div>

          <div className="mt-12 flex w-full max-w-[490px] items-center justify-center">
            <div className="flex flex-1 flex-col items-center gap-[1px]">
              <span className="font-heading text-[28px] font-bold leading-[38px] tracking-[-0.7px] text-[#182238] sm:text-[31px]">
                1.5+
              </span>
              <span className="font-body text-[11px] text-[#667A9A] sm:text-[12px]">
                Years Experience
              </span>
            </div>

            <div className="h-[45px] w-px shrink-0 bg-[#DFE6F1]" />

            <div className="flex flex-1 flex-col items-center gap-[1px]">
              <span className="font-heading text-[28px] font-bold leading-[38px] tracking-[-0.7px] text-[#182238] sm:text-[31px]">
                10+
              </span>
              <span className="font-body text-[11px] text-[#667A9A] sm:text-[12px]">
                Projects Shipped
              </span>
            </div>

            <div className="h-[45px] w-px shrink-0 bg-[#DFE6F1]" />

            <div className="flex flex-1 flex-col items-center gap-[1px]">
              <span className="font-heading text-[28px] font-bold leading-[38px] tracking-[-0.7px] text-[#182238] sm:text-[31px]">
                API
              </span>
              <span className="font-body text-[11px] text-[#667A9A] sm:text-[12px]">
                Backend Architect
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
