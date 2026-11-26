import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      aria-label="Hero section"
      className="relative overflow-hidden bg-white"
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-center px-5 py-16 sm:px-8 lg:px-0 lg:py-24">
        <div className="flex w-full max-w-[850px] flex-col items-center text-center">
          <div className="group inline-flex h-[30px] items-center gap-[9px] rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-[13px] transition-all duration-300 hover:border-[#86EFAC] hover:bg-[#E8FCEF] hover:shadow-[0_4px_14px_rgba(34,197,94,0.10)]">
            <span className="relative flex h-[8px] w-[8px] items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-30" />
              <span className="relative h-[8px] w-[8px] rounded-full bg-[#22C55E] transition-transform duration-300 group-hover:scale-125" />
            </span>

            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35px] text-[#15803D] transition-colors duration-300">
              Available for Opportunities
            </span>
          </div>

          <h1 className="mt-8 max-w-[850px] font-heading text-[36px] font-bold leading-[1.18] tracking-[-1.5px] text-[#182238] sm:text-[48px] sm:leading-[1.2] sm:tracking-[-1.8px] lg:text-[62px] lg:leading-[1.15] lg:tracking-[-2.5px]">
            Building{" "}
            <span className="inline-block text-[#496CBF] transition-all duration-300 hover:-translate-y-[2px] hover:text-[#304F9B]">
              scalable
            </span>{" "}
            systems for modern web applications.
          </h1>

          <p className="mt-7 max-w-[680px] font-body text-[14px] font-normal leading-[26px] text-[#667A9A] transition-colors duration-300 hover:text-[#526783] sm:text-[15px] sm:leading-[28px] lg:text-[16px]">
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
              className="group inline-flex h-[52px] w-full items-center justify-center gap-[11px] rounded-[10px] bg-[#496CBF] px-7 text-[14px] font-semibold text-white shadow-[0_3px_8px_rgba(73,108,191,0.12)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:bg-[#3D5FAE] hover:shadow-[0_10px_22px_rgba(73,108,191,0.22)] active:translate-y-0 active:shadow-none sm:w-auto"
            >
              Let's Discuss the Role
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-[4px]"
              />
            </Link>

            <Link
              href="/projects"
              className="group inline-flex h-[52px] w-full items-center justify-center gap-[9px] rounded-[10px] border border-[#DFE6F1] bg-white px-[23px] text-[14px] font-medium text-[#182238] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#496CBF] hover:bg-[#F8FAFF] hover:shadow-[0_8px_18px_rgba(24,34,56,0.06)] active:translate-y-0 active:shadow-none sm:w-auto"
            >
              View Projects
              <ArrowUpRight
                size={16}
                className="text-[#64748B] transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-[#496CBF]"
              />
            </Link>
          </div>

          <div className="mt-12 flex w-full max-w-[490px] items-center justify-center">
            <div className="group flex flex-1 flex-col items-center gap-[1px] rounded-xl py-2 transition-all duration-300 hover:-translate-y-[3px]">
              <span className="font-heading text-[28px] font-bold leading-[38px] tracking-[-0.7px] text-[#182238] transition-colors duration-300 group-hover:text-[#496CBF] sm:text-[31px]">
                1.5+
              </span>
              <span className="font-body text-[11px] text-[#667A9A] transition-colors duration-300 group-hover:text-[#496CBF] sm:text-[12px]">
                Years Experience
              </span>
            </div>

            <div className="h-[45px] w-px shrink-0 bg-[#DFE6F1]" />

            <div className="group flex flex-1 flex-col items-center gap-[1px] rounded-xl py-2 transition-all duration-300 hover:-translate-y-[3px]">
              <span className="font-heading text-[28px] font-bold leading-[38px] tracking-[-0.7px] text-[#182238] transition-colors duration-300 group-hover:text-[#496CBF] sm:text-[31px]">
                10+
              </span>
              <span className="font-body text-[11px] text-[#667A9A] transition-colors duration-300 group-hover:text-[#496CBF] sm:text-[12px]">
                Projects Shipped
              </span>
            </div>

            <div className="h-[45px] w-px shrink-0 bg-[#DFE6F1]" />

            <div className="group flex flex-1 flex-col items-center gap-[1px] rounded-xl py-2 transition-all duration-300 hover:-translate-y-[3px]">
              <span className="font-heading text-[28px] font-bold leading-[38px] tracking-[-0.7px] text-[#182238] transition-colors duration-300 group-hover:text-[#496CBF] sm:text-[31px]">
                API
              </span>
              <span className="font-body text-[11px] text-[#667A9A] transition-colors duration-300 group-hover:text-[#496CBF] sm:text-[12px]">
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
