import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative isolate overflow-hidden py-24 max-sm:py-16"
      aria-label="Hero section"
    >
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-8rem] h-[42rem] w-[42rem] 
          -translate-x-1/2 rounded-full
          bg-[#496cbf]/25 blur-[140px]"
        />
        <div
          className="absolute right-0 bottom-0 h-[28rem] w-[28rem]
          rounded-full bg-indigo-600/10 blur-[120px]"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Status Badge */}
            <div
              className="inline-flex items-center gap-3
  rounded-2xl
  border border-neutral-200
  bg-white/60 dark:bg-neutral-900/60
  backdrop-blur-xl
  px-5 py-2
  text-sm font-medium
  text-neutral-700 dark:text-neutral-200
  shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
            >
              {/* Left Accent Line */}
              <span className="absolute left-0 h-6 w-[3px] rounded-r-full bg-[#496cbf]" />

              {/* Status Dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#496cbf] opacity-70 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#496cbf]" />
              </span>

              {/* Text */}
              <span className="tracking-tight">
                <span className="font-semibold text-[#496cbf]">Available</span>{" "}
                for Freelance & Remote Roles
              </span>
            </div>

            {/* Headline */}
            <h1
              className="mt-8 max-w-2xl
  text-4xl sm:text-5xl lg:text-6xl
  font-semibold tracking-tight
  text-neutral-900 dark:text-white"
            >
              Building
              <span className="relative mx-2 inline-block text-[#496cbf]">
                scalable systems
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-full
      bg-[#496cbf]/30"
                />
              </span>
              <br />
              for modern web applications
            </h1>

            <p
              className="mt-7 max-w-xl text-base leading-relaxed
  text-neutral-600 dark:text-neutral-300
  border-l-2 border-[#496cbf]/40 pl-4"
            >
              Laravel backend developer with 1.5+ years of hands-on experience
              building scalable business applications at{" "}
              <span className="font-medium text-neutral-800 dark:text-white">
                Buildupnet
              </span>
              . I design secure RESTful APIs, structure efficient MySQL schemas,
              and implement clean backend architectures that support real-world
              products — including e-commerce platforms and full-scale salon
              management systems.
            </p>

            {/* CTA Row */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              {/* Primary CTA */}
              <Link href="/contact">
                <Button
                  className="relative group isolate overflow-hidden
                    rounded-xl px-6 py-3 border-[2px] h-full border-[#496cbf]
                    font-medium tracking-tight text-[#496cbf] hover:bg-[#496cbf] hover:text-white
                    bg-[#496cbf]/10
                    transition-all duration-300
                    hover:-translate-y-[1px]"
                >
                  {/* Edge Glow Border */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-xl
                      ring-1 ring-[#496cbf]/40
                      group-hover:ring-[#496cbf]/70
                      transition-all duration-300"
                  />

                  {/* Subtle Code Gradient Sweep */}
                  <span
                    className="pointer-events-none absolute -left-full top-0 h-full w-full
                      bg-gradient-to-r from-transparent via-white/20 to-transparent
                      group-hover:left-full
                      transition-all duration-700 ease-out"
                  />

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Let’s Discuss the Role</span>
                    <span
                      className="inline-flex h-5 w-5 items-center justify-center
                        rounded-md group-hover:bg-white/15 bg-[#496cbf] text-white text-xs
                        transition-transform duration-300
                        group-hover:translate-x-1"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </span>
                </Button>
              </Link>

              {/* Secondary CTA */}
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="group relative isolate overflow-hidden
    rounded-xl px-7 py-3 h-full
    border-[2px] border-neutral-300/70 dark:border-neutral-700/70
    bg-white/70 dark:bg-neutral-900/60
    backdrop-blur-xl
    text-neutral-800 dark:text-neutral-200
    shadow-sm
    transition-all duration-300
    hover:-translate-y-[2px]
    hover:border-[#496cbf]/60
    hover:shadow-[0_10px_30px_rgba(73,108,191,0.12)]"
                >
                  {/* Soft Background Highlight */}
                  <span
                    className="absolute inset-0 rounded-xl
      bg-gradient-to-r from-[#496cbf]/5 to-indigo-600/5
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300"
                  />

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-3 font-medium tracking-tight">
                    <span>View Live Projects</span>

                    <span
                      className="inline-flex items-center justify-center
        h-6 w-6 rounded-lg
        border border-neutral-300 dark:border-neutral-600
        bg-white dark:bg-neutral-800
        transition-all duration-300
        group-hover:border-[#496cbf]/60
        group-hover:bg-[#496cbf]/10"
                    >
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#496cbf]"
                      />
                    </span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative flex justify-center">
            {/* Main Developer Panel */}
            <div
              className="relative w-[440px] rounded-xl
      border border-neutral-200/20
      bg-[#1e1e2f] dark:bg-[#0f111a]
      shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden"
            >
              {/* Top Gradient Accent */}
              <div className="h-[4px] w-full bg-gradient-to-r from-[#496cbf] via-indigo-500 to-[#496cbf] animate-gradient-x" />

              {/* Header / Fake Tab Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-700">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-neutral-400 font-mono">
                  developer.profile.ts
                </span>
              </div>

              {/* Code Section */}
              <div className="px-6 py-6 font-mono text-sm leading-relaxed relative overflow-x-auto">
                {/* Line Numbers */}
                <div className="absolute top-6 left-4 flex flex-col items-end gap-1 text-neutral-500 select-none font-mono text-xs">
                  {[...Array(12)].map((_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </div>

                {/* Syntax Highlighted Code */}
                <pre className="ml-12 text-neutral-200 dark:text-neutral-100">
                  <code>
                    <span className="text-[#8be9fd]">const</span> developer =
                    &#123;{"\n"}
                    &nbsp;&nbsp;<span className="text-[#ff79c6]">
                      name
                    </span>:{" "}
                    <span className="text-[#f1fa8c]">"Tanya Batra"</span>,{"\n"}
                    &nbsp;&nbsp;<span className="text-[#ff79c6]">
                      role
                    </span>:{" "}
                    <span className="text-[#f1fa8c]">"Laravel Developer"</span>,
                    {"\n"}
                    &nbsp;&nbsp;
                    <span className="text-[#ff79c6]">experience</span>:{" "}
                    <span className="text-[#f1fa8c]">"1.5 Years"</span>,{"\n"}
                    &nbsp;&nbsp;<span className="text-[#ff79c6]">
                      company
                    </span>:{" "}
                    <span className="text-[#f1fa8c]">"Buildupnet"</span>,
                    {"\n\n"}
                    &nbsp;&nbsp;<span className="text-[#8be9fd]">stack</span>: [
                    <span className="text-[#f1fa8c]">
                      "Laravel", "PHP", "MySQL", "REST APIs"
                    </span>
                    ],{"\n\n"}
                    &nbsp;&nbsp;<span className="text-[#8be9fd]">focus</span>: [
                    <span className="text-[#f1fa8c]">
                      "Clean Architecture", "Scalable Systems", "Structured
                      Workflows"
                    </span>
                    ]{"\n"}
                    &#125;;{"\n\n"}
                    <span className="text-[#50fa7b]">export default</span>{" "}
                    developer;
                  </code>
                </pre>
              </div>
            </div>

            {/* Layered Glow Backgrounds */}
            <div
              className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full
      bg-[#496cbf]/30 blur-[140px] animate-pulse-slow"
            />
            <div
              className="absolute -top-20 -left-16 h-48 w-48 rounded-full
      bg-indigo-500/25 blur-[120px] animate-pulse-slow"
            />

            {/* Holographic Accent */}
            <div
              className="absolute -top-10 right-0 h-[220px] w-[220px] rounded-full
      bg-gradient-to-tr from-[#496cbf]/40 to-indigo-500/20 blur-[180px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
