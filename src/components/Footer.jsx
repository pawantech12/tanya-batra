import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#DFE6F1] bg-white">
      <div className="mx-auto max-w-[1280px] px-5 pb-[76px] pt-[65px] sm:px-8 sm:pt-[75px] lg:px-0">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[1.55fr_0.8fr_1fr] lg:gap-[70px]">
          <div className="min-w-0">
            <Link
              href="/"
              aria-label="Tanya Batra home"
              className="group/logo inline-flex items-center"
            >
              <Image
                src="/logo.png"
                alt="Tanya Batra portfolio logo"
                width={184}
                height={48}
                sizes="184px"
                className="h-10 w-auto object-contain transition-all duration-300 ease-out group-hover/logo:scale-[1.04] group-hover/logo:opacity-90"
                priority
              />
            </Link>

            <p className="mt-[19px] max-w-[390px] font-body text-[14px] leading-[18px] text-[#667A9A] transition-colors duration-300 hover:text-[#526783] sm:text-[15px] sm:leading-[19px]">
              Crafting scalable web applications with clean architecture,
              performance-first engineering, and production-grade standards.
            </p>

            <div className="group/role mt-[32px] inline-flex max-w-full flex-wrap items-center gap-x-[12px] gap-y-1 rounded-[8px] border border-[#DFE6F1] bg-[#F8FAFC] px-[12px] py-[7px] transition-all duration-300 hover:border-[#C6D4ED] hover:bg-[#EEF2FF] hover:shadow-[0_4px_14px_rgba(73,108,191,0.07)]">
              <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#496CBF] transition-all duration-300 group-hover/role:scale-125 group-hover/role:shadow-[0_0_8px_rgba(73,108,191,0.45)]" />

              <span className="font-mono text-[10px] leading-[14px] tracking-[0.1px] text-[#8CA0C0] transition-colors duration-300 group-hover/role:text-[#496CBF]">
                Laravel Backend Developer
              </span>

              <span className="px-[2px] font-mono text-[10px] text-[#8CA0C0]">
                ·
              </span>

              <span className="font-mono text-[10px] leading-[14px] tracking-[0.1px] text-[#8CA0C0] transition-colors duration-300 group-hover/role:text-[#496CBF]">
                Full Stack Engineer
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2px] text-[#182238] transition-colors duration-300 hover:text-[#496CBF]">
              Explore
            </h3>

            <div className="mt-[12px] h-[2px] w-[24px] origin-left bg-[#496CBF] transition-all duration-300 hover:w-[42px]" />

            <nav aria-label="Footer navigation" className="mt-[21px]">
              <ul className="space-y-[10px]">
                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "/about" },
                  { name: "Projects", href: "/projects" },
                  { name: "Services", href: "/services" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group/nav inline-flex items-center gap-2 font-body text-[14px] leading-[20px] text-[#667A9A] transition-all duration-300 hover:translate-x-[4px] hover:text-[#496CBF]"
                    >
                      <span className="h-[4px] w-0 rounded-full bg-[#496CBF] transition-all duration-300 group-hover/nav:w-[4px]" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="min-w-0">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2px] text-[#182238] transition-colors duration-300 hover:text-[#496CBF]">
              Let's Connect
            </h3>

            <div className="mt-[12px] h-[2px] w-[24px] origin-left bg-[#496CBF] transition-all duration-300 hover:w-[42px]" />

            <p className="mt-[21px] max-w-[390px] font-body text-[14px] leading-[18px] text-[#667A9A] transition-colors duration-300 hover:text-[#526783] sm:text-[15px] sm:leading-[19px]">
              Open for freelance collaborations and full-time engineering
              opportunities.
            </p>

            <Link
              href="mailto:batraofficial.02@gmail.com"
              className="group/email mt-[27px] inline-flex max-w-full items-center gap-[11px] font-body text-[13px] font-medium text-[#182238] transition-all duration-300 hover:translate-x-[2px] hover:text-[#496CBF] sm:text-[14px]"
            >
              <Mail
                size={16}
                strokeWidth={1.7}
                className="shrink-0 text-[#667A9A] transition-all duration-300 group-hover/email:scale-110 group-hover/email:text-[#496CBF]"
              />
              <span className="break-all transition-colors duration-300">
                batraofficial.02@gmail.com
              </span>
            </Link>

            <div className="mt-[19px]">
              <Link
                href="/contact"
                className="group/contact inline-flex min-h-[44px] items-center justify-center gap-[10px] rounded-[9px] border border-[#DFE6F1] bg-white px-[19px] font-body text-[13px] font-semibold text-[#496CBF] shadow-[0_2px_6px_rgba(24,34,56,0.02)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-[#496CBF] hover:bg-[#EEF2FF] hover:shadow-[0_7px_18px_rgba(73,108,191,0.12)] active:translate-y-0 active:scale-[0.98]"
              >
                Get in Touch
                <ArrowRight
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover/contact:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#DFE6F1] transition-colors duration-300 hover:border-[#C6D4ED]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-5 px-5 py-[19px] sm:flex-row sm:px-8 lg:px-0">
          <p className="font-mono text-[10px] leading-[16px] tracking-[0.1px] text-[#8CA0C0] transition-colors duration-300 hover:text-[#667A9A] sm:text-[11px]">
            © {new Date().getFullYear()} Tanya Batra. All rights reserved.
          </p>

          <div className="flex items-center gap-[10px]">
            <Link
              href="https://github.com/tanya-batra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group/social flex h-[36px] w-[36px] items-center justify-center rounded-[9px] border border-[#DFE6F1] bg-[#F8FAFC] text-[#667A9A] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:scale-105 hover:border-[#496CBF] hover:bg-[#EEF2FF] hover:text-[#496CBF] hover:shadow-[0_6px_15px_rgba(73,108,191,0.13)] active:translate-y-0 active:scale-95"
            >
              <Github
                size={16}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover/social:rotate-[-6deg]"
              />
            </Link>

            <Link
              href="https://www.linkedin.com/in/tanyabatra7814"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group/social flex h-[36px] w-[36px] items-center justify-center rounded-[9px] border border-[#DFE6F1] bg-[#F8FAFC] text-[#667A9A] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:scale-105 hover:border-[#496CBF] hover:bg-[#EEF2FF] hover:text-[#496CBF] hover:shadow-[0_6px_15px_rgba(73,108,191,0.13)] active:translate-y-0 active:scale-95"
            >
              <Linkedin
                size={16}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover/social:rotate-[-6deg]"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
