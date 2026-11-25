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
    <header className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white">
      <div className="mx-auto flex h-[79px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-0">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center"
        >
          <Image
            src="/logo.png"
            alt="Tanya Batra portfolio logo"
            width={190}
            height={48}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-[37px] md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex h-[79px] items-center text-[14px] font-medium transition-colors duration-200 ${
                  active
                    ? "text-[#496CBF]"
                    : "text-[#596B8A] hover:text-[#496CBF]"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-[27px] left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#496CBF] transition-all duration-200 ${
                    active ? "w-5 opacity-100" : "w-0 opacity-0"
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
            className="inline-flex h-[42px] items-center gap-2 rounded-[10px] border border-[#DFE6F1] bg-white px-[17px] text-[14px] font-medium text-[#182238] transition-colors hover:border-[#496CBF] hover:bg-[#F7F9FD]"
          >
            <FileText size={15} className="text-[#496CBF]" />
            Resume
          </Link>

          <Link
            href="/contact"
            className="inline-flex h-[42px] items-center gap-2 rounded-[10px] bg-[#496CBF] px-[22px] text-[14px] font-semibold text-white transition-colors hover:bg-[#3D5FAE]"
          >
            Let's Work
            <ArrowRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#182238] transition-colors duration-200 hover:bg-[#F7F9FC] md:hidden"
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
                  className={`flex items-center justify-between border-b border-[#F0F3F8] py-4 text-[14px] font-medium transition-colors ${
                    active ? "text-[#496CBF]" : "text-[#596B8A]"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#496CBF]" />
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
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#DFE6F1] text-[13px] font-medium text-[#182238]"
            >
              <FileText size={15} className="text-[#496CBF]" />
              Resume
            </Link>

            <Link
              href="/contact"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#496CBF] text-[13px] font-semibold text-white"
            >
              Let's Work
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
