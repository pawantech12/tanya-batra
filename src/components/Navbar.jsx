"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, FileText, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white transition-shadow duration-300 hover:shadow-[0_4px_18px_rgba(24,34,56,0.035)]">
      <div className="mx-auto flex h-[79px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-0">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex shrink-0 items-center"
        >
          <Image
            src="/logo.png"
            alt="Tanya Batra portfolio logo"
            width={190}
            height={48}
            priority
            className="h-12 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-[1.025]"
          />
        </Link>

        <nav className="hidden items-center gap-[37px] md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative flex h-[79px] items-center text-[14px] font-medium transition-colors duration-300 ${
                  active
                    ? "text-[#496CBF]"
                    : "text-[#596B8A] hover:text-[#496CBF]"
                }`}
              >
                {link.name}

                <span
                  className={`absolute bottom-[27px] left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#496CBF] transition-all duration-300 ease-out ${
                    active
                      ? "w-5 opacity-100"
                      : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-[42px] items-center gap-2 rounded-[10px] border border-[#DFE6F1] bg-white px-[17px] text-[14px] font-medium text-[#182238] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-[#496CBF] hover:bg-[#F7F9FD] hover:shadow-[0_5px_14px_rgba(73,108,191,0.10)] active:translate-y-0"
          >
            <FileText
              size={15}
              className="text-[#496CBF] transition-transform duration-300 group-hover:scale-110"
            />
            Resume
          </Link>

          <Link
            href="/contact"
            className="group inline-flex h-[42px] items-center gap-2 rounded-[10px] bg-[#496CBF] px-[22px] text-[14px] font-semibold text-white shadow-[0_2px_5px_rgba(73,108,191,0.12)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:bg-[#3D5FAE] hover:shadow-[0_7px_16px_rgba(73,108,191,0.22)] active:translate-y-0 active:shadow-none"
          >
            Let's Work
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-[3px]"
            />
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#182238] transition-all duration-300 hover:border-[#C7D2FE] hover:bg-[#F1F4FC] hover:text-[#496CBF] active:scale-95 md:hidden"
        >
          <span className="relative flex h-[21px] w-[21px] items-center justify-center">
            <Menu
              size={21}
              className={`absolute transition-all duration-300 ease-in-out ${
                open
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              size={21}
              className={`absolute transition-all duration-300 ease-in-out ${
                open
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!open}
        className={`absolute left-0 right-0 top-full overflow-hidden border-b border-[#E2E8F0] bg-white shadow-[0_12px_25px_rgba(15,23,42,0.06)] transition-all duration-300 ease-in-out md:hidden ${
          open
            ? "visible max-h-[420px] translate-y-0 opacity-100"
            : "invisible max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <div
          className={`px-5 pb-6 pt-3 transition-all duration-300 ease-in-out ${
            open ? "translate-y-0" : "-translate-y-2"
          }`}
        >
          <nav className="flex flex-col">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center justify-between border-b border-[#F0F3F8] py-4 text-[14px] font-medium transition-all duration-200 hover:pl-2 hover:text-[#496CBF] ${
                    active ? "text-[#496CBF]" : "text-[#596B8A]"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#496CBF] transition-transform duration-300 group-hover:scale-125" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="group flex h-11 items-center justify-center gap-2 rounded-lg border border-[#DFE6F1] text-[13px] font-medium text-[#182238] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#496CBF] hover:bg-[#F7F9FD] hover:shadow-[0_5px_12px_rgba(73,108,191,0.08)] active:translate-y-0"
            >
              <FileText
                size={15}
                className="text-[#496CBF] transition-transform duration-300 group-hover:scale-110"
              />
              Resume
            </Link>

            <Link
              href="/contact"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="group flex h-11 items-center justify-center gap-2 rounded-lg bg-[#496CBF] text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#3D5FAE] hover:shadow-[0_6px_14px_rgba(73,108,191,0.20)] active:translate-y-0"
            >
              Let's Work
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-[3px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
