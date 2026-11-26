"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import {
  ArrowUpRight,
  Briefcase,
  Layers,
  Rocket,
  GraduationCap,
  Code2,
  GitBranch,
  ShieldCheck,
  Gauge,
  Database,
  Server,
  CheckCircle2,
} from "lucide-react";
import { Clock3 } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { BookOpen } from "lucide-react";
import { LoaderCircle } from "lucide-react";

const ACCENT = "#496cbf";

const highlights = [
  {
    icon: Briefcase,
    title: "Production-Level Experience",
    description:
      "1.5+ years building and maintaining live systems used by real customers. Experienced with deployment cycles, bug resolution, and structured development workflows.",
  },
  {
    icon: Layers,
    title: "Scalable System Architecture",
    description:
      "Worked on e-commerce and management platforms handling dynamic data, authentication flows, REST APIs, and relational database design.",
  },
  {
    icon: Rocket,
    title: "Performance & Code Quality",
    description:
      "Focused on clean architecture, maintainable code, query optimization, and writing solutions that scale without technical debt.",
  },
];

const expertise = [
  {
    title: "Laravel & PHP Development",
    description:
      "Building structured, modular, and maintainable applications using modern Laravel practices.",
  },
  {
    title: "REST API Engineering",
    description:
      "Designing secure and scalable APIs with proper authentication, validation, and version control.",
  },
  {
    title: "Database Architecture (MySQL)",
    description:
      "Optimizing relational schemas, indexing strategies, and query performance.",
  },
  {
    title: "Security & Authentication",
    description:
      "Implementing authorization layers, secure session handling, and role-based access control.",
  },
  {
    title: "Production Optimization",
    description:
      "Debugging live systems, improving performance bottlenecks, and ensuring deployment stability.",
  },
];

const principles = [
  { icon: Code2, label: "Clean & Modular Architecture" },
  { icon: GitBranch, label: "Version Control Discipline" },
  { icon: Layers, label: "Long-Term Scalability" },
  { icon: ShieldCheck, label: "Production Reliability" },
  { icon: Gauge, label: "Performance Optimization" },
];

// Reusable section eyebrow
const SectionLabel = ({ children }) => (
  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#496cbf]/25 bg-[#496cbf]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#496cbf]">
    <span className="h-1.5 w-1.5 rounded-full bg-[#496cbf]" />
    {children}
  </div>
);

// Reusable section heading
const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  description,
  centered = false,
}) => (
  <div className={`mb-12 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
    <SectionLabel>{eyebrow}</SectionLabel>

    <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#182238] dark:text-white sm:text-4xl lg:text-[42px]">
      {title} {highlight && <span className="text-[#496cbf]">{highlight}</span>}
    </h2>

    <div
      className={`mt-5 h-[2px] w-14 bg-[#496cbf] ${centered ? "mx-auto" : ""}`}
    />

    {description && (
      <p className="mt-5 text-[15px] leading-7 text-[#64748b] dark:text-neutral-400 sm:text-base">
        {description}
      </p>
    )}
  </div>
);

// Loading skeleton for the education and experience section
const AboutDataSkeleton = () => (
  <div className="grid gap-14 lg:grid-cols-2 lg:gap-12">
    {[0, 1].map((column) => (
      <div key={column}>
        <div className="mb-10 space-y-4">
          <div className="h-7 w-36 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-9 w-3/4 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-12 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>

        <div className="space-y-5">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-4 h-3 w-28 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="mb-4 h-6 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-3 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const AboutClientPage = () => {
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [eduRes, expRes] = await Promise.all([
          axios.get("/api/education"),
          axios.get("/api/experiences"),
        ]);

        if (!isMounted) return;

        setEducations(Array.isArray(eduRes.data) ? eduRes.data : []);

        setExperiences(Array.isArray(expRes.data) ? expRes.data : []);
      } catch (error) {
        console.error("Error fetching about data:", error);

        if (isMounted) {
          setEducations([]);
          setExperiences([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="overflow-x-clip bg-white text-[#182238] dark:bg-[#090d16] dark:text-white">
      {/* =====================================================
            SECTION 01 — ABOUT HERO
        ====================================================== */}

      <section className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.9fr)] lg:gap-20 lg:px-0 lg:py-24">
        <div className="order-1 w-full max-w-[660px]">
          <div className="group/badge mb-10 inline-flex items-center gap-3 rounded-full border border-[#c7d5ff] bg-[#eef2ff] px-4 py-2 transition-all duration-300 hover:-translate-y-[2px] hover:border-[#496cbf]/60 hover:bg-[#e5ebff] hover:shadow-[0_6px_18px_rgba(73,108,191,0.10)] dark:border-[#496cbf]/40 dark:bg-[#496cbf]/10 dark:hover:bg-[#496cbf]/20">
            <span className="relative flex h-[7px] w-[7px] items-center justify-center">
              <span className="absolute h-full w-full rounded-full bg-[#496cbf] opacity-40 transition-transform duration-300 group-hover/badge:scale-[2]" />
              <span className="relative h-[7px] w-[7px] rounded-full bg-[#496cbf]" />
            </span>

            <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.025em] text-[#345bb4] transition-colors duration-300 group-hover/badge:text-[#182238] sm:text-[11px] dark:group-hover/badge:text-white">
              Backend Developer
            </span>

            <span className="mx-1 text-[10px] text-[#496cbf] transition-transform duration-300 group-hover/badge:scale-125">
              ·
            </span>

            <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.025em] text-[#345bb4] transition-colors duration-300 group-hover/badge:text-[#182238] sm:text-[11px] dark:group-hover/badge:text-white">
              1.5+ Years Experience
            </span>
          </div>

          <h1 className="max-w-[680px] font-['Plus_Jakarta_Sans'] text-[36px] font-bold leading-[1.2] tracking-[-0.045em] text-[#182238] transition-colors duration-300 sm:text-[44px] lg:text-[52px] dark:text-white">
            Building Reliable
            <br className="hidden sm:block" /> Backend Systems with
            <br className="hidden sm:block" />{" "}
            <span className="inline-block text-[#496cbf] transition-all duration-300 hover:-translate-y-[2px] hover:text-[#345bb4]">
              Laravel &amp; PHP
            </span>
          </h1>

          <div className="mt-9 max-w-[600px] space-y-6">
            <p className="border-l-[3px] border-[#496cbf] pl-4 font-['Inter'] text-[15px] font-normal leading-[1.3] text-[#647795] transition-all duration-300 hover:border-[#345bb4] hover:pl-5 hover:text-[#526783] sm:text-[16px] dark:text-neutral-300 dark:hover:text-neutral-100">
              I'm Tanya Batra, a backend-focused developer with 1.5+ years of
              hands-on engineering experience at Buildupnet. I specialize in
              building production-grade web applications — the kind that handle
              real users, real data, and real business logic.
            </p>

            <p className="font-['Inter'] text-[15px] font-normal leading-[1.3] text-[#647795] transition-colors duration-300 hover:text-[#526783] sm:text-[16px] dark:text-neutral-300 dark:hover:text-neutral-100">
              My work spans secure RESTful APIs, efficient MySQL schema design,
              and clean backend architectures built with Laravel and PHP. I've
              shipped full-scale platforms including an e-commerce system and a
              comprehensive salon management solution — both running in active
              production.
            </p>
          </div>
        </div>

        <div className="order-2 mx-auto w-full max-w-[440px] lg:ml-auto lg:mr-0">
          <div className="group/image rounded-[24px] bg-[#eef2ff] p-3 transition-all duration-500 ease-out hover:-translate-y-[4px] hover:bg-[#e5ebff] hover:shadow-[0_20px_45px_rgba(73,108,191,0.15)] dark:bg-[#496cbf]/15 dark:hover:bg-[#496cbf]/25">
            <div className="relative aspect-[4/5.35] overflow-hidden rounded-[16px] bg-[#c2ccdf]">
              <Image
                src="/about.jpeg"
                alt="Tanya Batra - Backend Developer"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 440px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover/image:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#182238]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/image:opacity-100" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="relative flex h-[7px] w-[7px] shrink-0 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-30" />
              <span className="relative h-[7px] w-[7px] rounded-full bg-[#22c55e]" />
            </span>

            <span className="font-['Inter'] text-[12px] font-normal text-[#647795] transition-colors duration-300 hover:text-[#345bb4] dark:text-neutral-400 dark:hover:text-neutral-200">
              Open to Full-Time &amp; Remote Roles
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
            SECTION 02 — EXPERIENCE HIGHLIGHTS
        ====================================================== */}

      <section className="mx-auto bg-[#f7f9fc] px-5 py-16 transition-colors duration-300 dark:bg-[#0b1120] sm:px-8 sm:py-20 lg:px-0 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="group/heading mb-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-7 origin-left bg-[#496cbf] transition-all duration-300 group-hover/heading:w-12" />

              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.02em] text-[#496cbf] transition-colors duration-300 group-hover/heading:text-[#345bb4]">
                Professional Journey
              </span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-bold leading-[1.2] tracking-[-0.045em] text-[#182238] transition-colors duration-300 dark:text-white sm:text-[40px] lg:text-[44px]">
              Experience &amp;{" "}
              <span className="inline-block text-[#496cbf] transition-all duration-300 hover:-translate-y-[2px] hover:text-[#345bb4]">
                Production Impact
              </span>
            </h2>

            <div className="mt-3 h-[3px] w-14 origin-left rounded-full bg-[#e2e8f0] transition-all duration-500 group-hover/heading:w-24 group-hover/heading:bg-[#496cbf] dark:bg-neutral-800" />

            <p className="mt-5 max-w-[650px] font-['Inter'] text-[14px] font-normal leading-[1.4] text-[#647795] transition-colors duration-300 hover:text-[#526783] dark:text-neutral-400 dark:hover:text-neutral-200 sm:text-[15px]">
              Real engineering work, deployed in production, serving real users.
              Each project I've built at Buildupnet reflects hands-on experience
              with scalable architectures, clean code practices, and reliable
              backend systems.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group/card relative min-h-[262px] overflow-hidden rounded-[20px] border border-[#e0e7f1] bg-white p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#496cbf]/40 hover:shadow-[0_16px_40px_rgba(73,108,191,0.10)] dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-[#496cbf]/50 dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)] sm:p-8"
                >
                  <div className="absolute left-0 top-0 h-[3px] w-0 bg-[#496cbf] transition-all duration-500 ease-out group-hover/card:w-full" />

                  <div className="mb-7 h-[3px] w-10 rounded-full bg-[#496cbf] transition-all duration-300 group-hover/card:w-16" />

                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#eef2ff] text-[#496cbf] transition-all duration-300 group-hover/card:scale-110 group-hover/card:bg-[#496cbf] group-hover/card:text-white group-hover/card:shadow-[0_6px_16px_rgba(73,108,191,0.20)] dark:bg-[#496cbf]/15 dark:group-hover/card:bg-[#496cbf]">
                      <Icon
                        size={20}
                        strokeWidth={1.9}
                        className="transition-transform duration-300 group-hover/card:rotate-[-6deg]"
                      />
                    </div>

                    <span className="font-['Plus_Jakarta_Sans'] text-[28px] font-bold leading-none tracking-[-0.04em] text-[#e4eaf3] transition-all duration-300 group-hover/card:scale-110 group-hover/card:text-[#496cbf]/30 dark:text-neutral-700 dark:group-hover/card:text-[#496cbf]/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mb-2 font-['Plus_Jakarta_Sans'] text-[17px] font-bold leading-[1.4] tracking-[-0.025em] text-[#182238] transition-colors duration-300 group-hover/card:text-[#496cbf] dark:text-white dark:group-hover/card:text-[#8da9ed] sm:text-[18px]">
                    {item.title}
                  </h3>

                  <p className="font-['Inter'] text-[13px] font-normal leading-[1.35] text-[#647795] transition-colors duration-300 group-hover/card:text-[#526783] dark:text-neutral-400 dark:group-hover/card:text-neutral-300 sm:text-[13.5px]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
            SECTION 03 — EDUCATION & EXPERIENCE
        ====================================================== */}

      <section className="border-y border-[#e8edf5] bg-white py-16 transition-colors duration-300 dark:border-neutral-800 dark:bg-[#0b1120] sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-0">
          <div className="group/heading mb-12 sm:mb-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-7 origin-left bg-[#496cbf] transition-all duration-300 group-hover/heading:w-12" />

              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.02em] text-[#496cbf] transition-colors duration-300 group-hover/heading:text-[#345bb4]">
                Background &amp; History
              </span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-bold leading-[1.2] tracking-[-0.045em] text-[#182238] transition-colors duration-300 dark:text-white sm:text-[40px] lg:text-[44px]">
              Education &amp;{" "}
              <span className="inline-block text-[#496cbf] transition-all duration-300 hover:-translate-y-[2px] hover:text-[#345bb4]">
                Professional Experience
              </span>
            </h2>

            <div className="mt-3 h-[3px] w-14 origin-left rounded-full bg-[#e2e8f0] transition-all duration-500 group-hover/heading:w-24 group-hover/heading:bg-[#496cbf] dark:bg-neutral-800" />

            <p className="mt-5 max-w-[650px] font-['Inter'] text-[14px] font-normal leading-[1.4] text-[#647795] transition-colors duration-300 hover:text-[#526783] dark:text-neutral-400 dark:hover:text-neutral-200 sm:text-[15px]">
              Academic background and professional work history, dynamically
              loaded from /api/education and /api/experiences — presenting the
              foundation and career journey that shapes my engineering practice
              today.
            </p>
          </div>

          {loading ? (
            <div className="py-5">
              <div className="mb-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 rounded-lg border border-[#e5ebf5] bg-white px-4 py-2 transition-all duration-300 hover:border-[#496cbf]/40 hover:shadow-[0_5px_16px_rgba(73,108,191,0.08)] dark:border-neutral-800 dark:bg-neutral-900">
                  <LoaderCircle
                    size={14}
                    className="animate-spin text-[#496cbf]"
                  />
                  <span className="font-['JetBrains_Mono'] text-[10px] font-medium text-[#496cbf]">
                    Loading About Data...
                  </span>
                </div>

                <p className="mt-3 font-['JetBrains_Mono'] text-[9px] text-[#9aabc3]">
                  Fetching records
                </p>
              </div>

              <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5 lg:border-r lg:border-[#e8edf5] lg:pr-14 dark:lg:border-neutral-800">
                  <div className="mb-7 animate-pulse">
                    <div className="mb-4 h-3 w-24 rounded bg-[#e8edf5] dark:bg-neutral-800" />
                    <div className="h-9 w-64 max-w-full rounded bg-[#e8edf5] dark:bg-neutral-800" />
                    <div className="mt-4 h-3 w-full max-w-[360px] rounded bg-[#f0f3f8] dark:bg-neutral-800" />
                    <div className="mt-2 h-3 w-4/5 rounded bg-[#f0f3f8] dark:bg-neutral-800" />
                  </div>

                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse rounded-xl border border-[#e7edf5] bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/70 sm:p-6"
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <div className="h-4 w-20 rounded bg-[#e8edf5] dark:bg-neutral-800" />
                        <div className="h-4 w-4 rounded bg-[#e8edf5] dark:bg-neutral-800" />
                      </div>

                      <div className="h-4 w-1/2 rounded bg-[#e8edf5] dark:bg-neutral-800" />
                      <div className="mt-4 h-3 w-full rounded bg-[#f0f3f8] dark:bg-neutral-800" />
                      <div className="mt-2 h-3 w-4/5 rounded bg-[#f0f3f8] dark:bg-neutral-800" />
                      <div className="mt-5 h-4 w-24 rounded bg-[#f0f3f8] dark:bg-neutral-800" />
                    </div>
                  ))}
                </div>

                <div className="animate-pulse">
                  <div className="mb-7">
                    <div className="mb-4 h-3 w-32 rounded bg-[#e8edf5] dark:bg-neutral-800" />
                    <div className="h-9 w-56 max-w-full rounded bg-[#e8edf5] dark:bg-neutral-800" />
                    <div className="mt-4 h-3 w-full max-w-[360px] rounded bg-[#f0f3f8] dark:bg-neutral-800" />
                    <div className="mt-2 h-3 w-4/5 rounded bg-[#f0f3f8] dark:bg-neutral-800" />
                  </div>

                  <div className="relative space-y-3 pl-7 before:absolute before:bottom-8 before:left-[7px] before:top-3 before:w-px before:bg-[#e8edf5] dark:before:bg-neutral-800">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="relative">
                        <span className="absolute -left-[27px] top-5 h-[13px] w-[13px] rounded-full bg-[#e2e8f0] ring-4 ring-[#f7f9fc] dark:bg-neutral-700 dark:ring-neutral-900" />

                        <div className="rounded-xl border border-[#e7edf5] bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/70 sm:p-6">
                          <div className="mb-4 flex items-center justify-between">
                            <div className="h-4 w-20 rounded bg-[#e8edf5] dark:bg-neutral-800" />
                            <div className="h-4 w-24 rounded bg-[#f0f3f8] dark:bg-neutral-800" />
                          </div>

                          <div className="h-4 w-1/2 rounded bg-[#e8edf5] dark:bg-neutral-800" />
                          <div className="mt-3 h-3 w-1/3 rounded bg-[#eef2ff] dark:bg-[#496cbf]/20" />
                          <div className="mt-5 h-3 w-full rounded bg-[#f0f3f8] dark:bg-neutral-800" />
                          <div className="mt-2 h-3 w-4/5 rounded bg-[#f0f3f8] dark:bg-neutral-800" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
              <div className="lg:border-r lg:border-[#e8edf5] lg:pr-14 dark:lg:border-neutral-800">
                <div className="group/subheading mb-7">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[#eef2ff] text-[#496cbf] transition-all duration-300 group-hover/subheading:scale-110 group-hover/subheading:bg-[#496cbf] group-hover/subheading:text-white dark:bg-[#496cbf]/15 dark:group-hover/subheading:bg-[#496cbf]">
                      <GraduationCap size={13} strokeWidth={2} />
                    </span>

                    <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.025em] text-[#496cbf] transition-colors duration-300">
                      Education
                    </span>
                  </div>

                  <h3 className="font-['Plus_Jakarta_Sans'] text-[28px] font-bold leading-[1.2] tracking-[-0.04em] text-[#182238] transition-colors duration-300 dark:text-white sm:text-[32px]">
                    Academic{" "}
                    <span className="inline-block text-[#496cbf] transition-colors duration-300 hover:text-[#345bb4]">
                      Foundation
                    </span>
                  </h3>

                  <div className="mt-3 h-[3px] w-9 origin-left rounded-full bg-[#e2e8f0] transition-all duration-300 group-hover/subheading:w-16 group-hover/subheading:bg-[#496cbf] dark:bg-neutral-800" />

                  <p className="mt-5 max-w-[420px] font-['Inter'] text-[14px] font-normal leading-[1.4] text-[#647795] transition-colors duration-300 hover:text-[#526783] dark:text-neutral-400 dark:hover:text-neutral-200 sm:text-[14px]">
                    Formal education and academic training that established the
                    technical fundamentals and problem-solving mindset
                    underlying my backend engineering work.
                  </p>
                </div>

                {educations.length > 0 ? (
                  <div className="space-y-3">
                    {educations.map((item, index) => (
                      <article
                        key={item._id || index}
                        className="group/education relative overflow-hidden rounded-xl border border-[#e5ebf4] bg-white p-5 transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#496cbf]/40 hover:shadow-[0_12px_30px_rgba(73,108,191,0.09)] dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-[#496cbf]/50 dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] sm:p-6"
                      >
                        <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#496cbf] transition-all duration-500 group-hover/education:w-full" />

                        <div className="mb-4 flex items-center justify-between gap-3">
                          <span className="rounded-md bg-[#eef2ff] px-2.5 py-1.5 font-['JetBrains_Mono'] text-[10px] font-medium text-[#496cbf] transition-all duration-300 group-hover/education:bg-[#496cbf] group-hover/education:text-white dark:bg-[#496cbf]/15 dark:group-hover/education:bg-[#496cbf]">
                            {item.period}
                          </span>

                          <BookOpen
                            size={15}
                            className="shrink-0 text-[#c6d5ff] transition-all duration-300 group-hover/education:scale-110 group-hover/education:rotate-[-8deg] group-hover/education:text-[#496cbf]"
                          />
                        </div>

                        <h4 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold leading-[1.4] tracking-[-0.025em] text-[#182238] transition-colors duration-300 group-hover/education:text-[#496cbf] dark:text-white dark:group-hover/education:text-[#8da9ed] sm:text-[17px]">
                          {item.degree}
                        </h4>

                        <div className="my-4 h-px origin-left bg-[#f0f3f8] transition-all duration-300 group-hover/education:bg-[#cbd8f0] dark:bg-neutral-800 dark:group-hover/education:bg-neutral-700" />

                        <p className="font-['Inter'] text-[13px] font-normal leading-[1.5] text-[#647795] transition-colors duration-300 group-hover/education:text-[#526783] dark:text-neutral-400 dark:group-hover/education:text-neutral-300 sm:text-[13.5px]">
                          {item.description}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="group/empty flex min-h-[160px] flex-col items-center justify-center rounded-xl border border-[#e5ebf4] bg-[#f8fafd] px-5 py-8 text-center transition-all duration-300 hover:border-[#496cbf]/30 hover:bg-[#f2f5fc] hover:shadow-[0_8px_24px_rgba(73,108,191,0.06)] dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-900">
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff] text-[#bdceff] transition-all duration-300 group-hover/empty:scale-110 group-hover/empty:text-[#496cbf] dark:bg-[#496cbf]/15">
                      <GraduationCap size={19} />
                    </span>

                    <p className="font-['Plus_Jakarta_Sans'] text-[14px] font-bold text-[#344056] transition-colors duration-300 group-hover/empty:text-[#496cbf] dark:text-neutral-200">
                      No education records found
                    </p>

                    <p className="mt-2 font-['JetBrains_Mono'] text-[9px] leading-relaxed text-[#9aabc3]">
                      Education data will appear once loaded
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="group/subheading mb-7">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[#eef2ff] text-[#496cbf] transition-all duration-300 group-hover/subheading:scale-110 group-hover/subheading:bg-[#496cbf] group-hover/subheading:text-white dark:bg-[#496cbf]/15 dark:group-hover/subheading:bg-[#496cbf]">
                      <BriefcaseBusiness size={13} strokeWidth={2} />
                    </span>

                    <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.025em] text-[#496cbf] transition-colors duration-300">
                      Professional Experience
                    </span>
                  </div>

                  <h3 className="font-['Plus_Jakarta_Sans'] text-[28px] font-bold leading-[1.2] tracking-[-0.04em] text-[#182238] transition-colors duration-300 dark:text-white sm:text-[32px]">
                    Work{" "}
                    <span className="inline-block text-[#496cbf] transition-colors duration-300 hover:text-[#345bb4]">
                      Timeline
                    </span>
                  </h3>

                  <div className="mt-3 h-[3px] w-9 origin-left rounded-full bg-[#e2e8f0] transition-all duration-300 group-hover/subheading:w-16 group-hover/subheading:bg-[#496cbf] dark:bg-neutral-800" />

                  <p className="mt-5 max-w-[420px] font-['Inter'] text-[14px] font-normal leading-[1.4] text-[#647795] transition-colors duration-300 hover:text-[#526783] dark:text-neutral-400 dark:hover:text-neutral-200 sm:text-[14px]">
                    Professional work history loaded dynamically — a record of
                    real-world engineering roles, company engagements, and the
                    production systems I've contributed to.
                  </p>
                </div>

                {experiences.length > 0 ? (
                  <div className="relative space-y-3 pl-7 before:absolute before:bottom-8 before:left-[7px] before:top-2 before:w-px before:bg-[#dce5f5] dark:before:bg-neutral-700">
                    {experiences.map((item, index) => (
                      <article
                        key={item._id || index}
                        className="group/experience relative"
                      >
                        <span className="absolute -left-[27px] top-5 z-10 h-[13px] w-[13px] rounded-full border-[3px] border-white bg-[#496cbf] ring-2 ring-[#496cbf]/15 transition-all duration-300 group-hover/experience:scale-125 group-hover/experience:ring-4 group-hover/experience:ring-[#496cbf]/20 dark:border-[#0b1120]" />

                        <div className="relative overflow-hidden rounded-xl border border-[#e5ebf4] bg-white p-5 transition-all duration-300 ease-out group-hover/experience:-translate-y-[3px] group-hover/experience:border-[#496cbf]/40 group-hover/experience:shadow-[0_12px_30px_rgba(73,108,191,0.09)] dark:border-neutral-800 dark:bg-neutral-900/60 dark:group-hover/experience:border-[#496cbf]/50 dark:group-hover/experience:shadow-[0_12px_30px_rgba(0,0,0,0.2)] sm:p-6">
                          <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#496cbf] transition-all duration-500 group-hover/experience:w-full" />

                          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                            <span className="rounded-md bg-[#f0f4fa] px-2.5 py-1.5 font-['JetBrains_Mono'] text-[10px] font-medium text-[#71829e] transition-all duration-300 group-hover/experience:bg-[#eef2ff] group-hover/experience:text-[#496cbf] dark:bg-neutral-800 dark:text-neutral-300 dark:group-hover/experience:bg-[#496cbf]/15 dark:group-hover/experience:text-[#8da9ed]">
                              {item.period}
                            </span>
                          </div>

                          <h4 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold leading-[1.4] tracking-[-0.025em] text-[#182238] transition-colors duration-300 group-hover/experience:text-[#496cbf] dark:text-white dark:group-hover/experience:text-[#8da9ed] sm:text-[17px]">
                            {item.title}
                          </h4>

                          <p className="mt-1.5 font-['Inter'] text-[13px] font-semibold text-[#496cbf] transition-colors duration-300 group-hover/experience:text-[#345bb4] sm:text-[13.5px]">
                            <span className="mr-1">•</span>
                            {item.company}
                          </p>

                          <div className="my-4 h-px origin-left bg-[#f0f3f8] transition-all duration-300 group-hover/experience:bg-[#cbd8f0] dark:bg-neutral-800 dark:group-hover/experience:bg-neutral-700" />

                          <p className="font-['Inter'] text-[13px] font-normal leading-[1.5] text-[#647795] transition-colors duration-300 group-hover/experience:text-[#526783] dark:text-neutral-400 dark:group-hover/experience:text-neutral-300 sm:text-[13.5px]">
                            {item.description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="group/empty flex min-h-[160px] flex-col items-center justify-center rounded-xl border border-[#e5ebf4] bg-[#f8fafd] px-5 py-8 text-center transition-all duration-300 hover:border-[#496cbf]/30 hover:bg-[#f2f5fc] hover:shadow-[0_8px_24px_rgba(73,108,191,0.06)] dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-900">
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff] text-[#bdceff] transition-all duration-300 group-hover/empty:scale-110 group-hover/empty:text-[#496cbf] dark:bg-[#496cbf]/15">
                      <Clock3 size={18} />
                    </span>

                    <p className="font-['Plus_Jakarta_Sans'] text-[14px] font-bold text-[#344056] transition-colors duration-300 group-hover/empty:text-[#496cbf] dark:text-neutral-200">
                      No experience records found
                    </p>

                    <p className="mt-2 font-['JetBrains_Mono'] text-[9px] leading-relaxed text-[#9aabc3]">
                      Experience data will appear once loaded
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
            SECTION 04 — TECHNICAL EXPERTISE
        ====================================================== */}

      <section className="bg-[#f7f9fc] py-16 transition-colors duration-300 dark:bg-[#0b1120] sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-0">
          <div className="group/section mb-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-7 bg-[#496cbf] transition-all duration-300 group-hover/section:w-11" />

              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.02em] text-[#496cbf] transition-colors duration-300 group-hover/section:text-[#36569f] dark:group-hover/section:text-[#7897e3]">
                Technical Expertise
              </span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-bold leading-[1.2] tracking-[-0.045em] text-[#182238] transition-colors duration-300 dark:text-white sm:text-[40px] lg:text-[44px]">
              Backend Engineering &amp;{" "}
              <span className="inline-block text-[#496cbf] transition-all duration-300 group-hover/section:translate-x-1 group-hover/section:text-[#36569f] dark:group-hover/section:text-[#7897e3]">
                System Architecture
              </span>
            </h2>

            <div className="mt-3 h-[3px] w-14 rounded-full bg-[#e2e8f0] transition-all duration-300 group-hover/section:w-24 group-hover/section:bg-[#496cbf] dark:bg-neutral-800" />

            <p className="mt-5 max-w-[650px] font-['Inter'] text-[14px] font-normal leading-[1.4] text-[#647795] transition-colors duration-300 group-hover/section:text-[#526681] dark:text-neutral-400 dark:group-hover/section:text-neutral-300 sm:text-[15px]">
              Five core capability areas that define my backend engineering
              practice — from structured Laravel application architecture and
              production-ready REST APIs to relational database design, security
              systems, and live deployment optimization. Each discipline is
              applied directly in real-world production environments.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_0.98fr] lg:gap-[60px]">
            {/* LEFT: EXPERTISE CARDS */}
            <div className="relative isolate min-w-0">
              <div className="mb-3 hidden items-start gap-2 rounded-lg border border-[#cbd8ff] bg-[#eef2ff] px-3 py-2 transition-all duration-300 hover:border-[#496cbf]/50 hover:bg-[#e8edff] hover:shadow-[0_4px_14px_rgba(73,108,191,0.07)] dark:border-[#496cbf]/30 dark:bg-[#496cbf]/10 dark:hover:bg-[#496cbf]/15 lg:flex">
                <Layers
                  size={13}
                  className="mt-0.5 shrink-0 text-[#496cbf] transition-transform duration-300 hover:rotate-6"
                />

                <span className="font-['JetBrains_Mono'] text-[9px] leading-[1.4] text-[#496cbf]">
                  Cards stack progressively as you scroll — each capability
                  slides beneath the next on desktop.
                </span>
              </div>

              <div className="relative space-y-4 lg:space-y-3">
                {expertise.map((item, index) => (
                  <article
                    key={item.title}
                    style={{
                      "--card-top": `${6 + index * 0.875}rem`,
                    }}
                    className="group/expertise relative z-auto w-full min-w-0 rounded-[16px] border border-[#e3eaf4] bg-white p-5 shadow-[0_3px_10px_rgba(24,34,56,0.025)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#496cbf]/50 hover:shadow-[0_14px_35px_rgba(73,108,191,0.11)] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-[#496cbf]/50 dark:hover:shadow-[0_14px_35px_rgba(0,0,0,0.2)] sm:rounded-[18px] sm:p-7 lg:sticky lg:top-[var(--card-top)] lg:p-8"
                  >
                    <div className="pointer-events-none absolute left-5 right-5 top-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#496cbf] transition-transform duration-300 ease-out group-hover/expertise:scale-x-100 sm:left-7 sm:right-7 lg:left-8 lg:right-8" />

                    <div className="flex min-w-0 items-start gap-3">
                      <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[11px] bg-[#eef2ff] font-['Plus_Jakarta_Sans'] text-[18px] font-bold tracking-[-0.04em] text-[#496cbf] transition-all duration-300 group-hover/expertise:scale-105 group-hover/expertise:bg-[#496cbf] group-hover/expertise:text-white group-hover/expertise:shadow-[0_5px_14px_rgba(73,108,191,0.2)] dark:bg-[#496cbf]/15 sm:h-[45px] sm:w-[45px] sm:rounded-[12px] sm:text-[19px]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1 pt-1">
                        <h3 className="break-words font-['Plus_Jakarta_Sans'] text-[16px] font-bold leading-[1.4] tracking-[-0.025em] text-[#182238] transition-colors duration-300 group-hover/expertise:text-[#496cbf] dark:text-white dark:group-hover/expertise:text-[#8ba5ed] sm:text-[18px]">
                          {item.title}
                        </h3>

                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#22c55e] transition-all duration-300 group-hover/expertise:scale-125 group-hover/expertise:shadow-[0_0_7px_rgba(34,197,94,0.5)]" />

                          <span
                            className={`font-['JetBrains_Mono'] text-[9px] transition-colors duration-300 ${
                              index === 4
                                ? "text-[#496cbf] group-hover/expertise:text-[#36569f] dark:group-hover/expertise:text-[#8ba5ed]"
                                : "text-[#8192ad] group-hover/expertise:text-[#496cbf] dark:group-hover/expertise:text-[#8ba5ed]"
                            }`}
                          >
                            {index === 4
                              ? "Currently focusing on"
                              : "Active in production"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 break-words font-['Inter'] text-[12.5px] font-normal leading-[1.6] text-[#647795] transition-colors duration-300 group-hover/expertise:text-[#526681] dark:text-neutral-400 dark:group-hover/expertise:text-neutral-300 sm:mt-5 sm:text-[13.5px]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* RIGHT: DEVELOPER PHILOSOPHY */}
            <aside className="relative z-0 min-w-0 self-start">
              <div className="relative lg:sticky lg:top-24">
                <div className="group/philosophy relative overflow-hidden rounded-[18px] border border-[#cbd8ff] bg-white p-5 shadow-[0_10px_30px_rgba(73,108,191,0.06)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#496cbf]/60 hover:shadow-[0_18px_40px_rgba(73,108,191,0.12)] dark:border-[#496cbf]/40 dark:bg-neutral-900 dark:hover:border-[#496cbf]/60 dark:hover:shadow-[0_18px_40px_rgba(0,0,0,0.2)] sm:rounded-[21px] sm:p-9 lg:p-9">
                  <div className="pointer-events-none absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-[#496cbf] transition-transform duration-500 group-hover/philosophy:scale-x-100" />

                  <div className="relative">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eef2ff] text-[#496cbf] transition-all duration-300 group-hover/philosophy:rotate-[-5deg] group-hover/philosophy:bg-[#496cbf] group-hover/philosophy:text-white group-hover/philosophy:shadow-[0_4px_12px_rgba(73,108,191,0.2)] dark:bg-[#496cbf]/15">
                        <Code2 size={16} strokeWidth={1.8} />
                      </span>

                      <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.02em] text-[#496cbf] transition-colors duration-300 group-hover/philosophy:text-[#36569f] dark:group-hover/philosophy:text-[#8ba5ed]">
                        Developer Philosophy
                      </span>
                    </div>

                    <h3 className="max-w-[370px] font-['Plus_Jakarta_Sans'] text-[22px] font-bold leading-[1.22] tracking-[-0.035em] text-[#182238] transition-colors duration-300 group-hover/philosophy:text-[#496cbf] dark:text-white dark:group-hover/philosophy:text-[#8ba5ed] sm:text-[25px]">
                      Systems-First Engineering Mindset
                    </h3>

                    <div className="my-3 h-[3px] w-9 bg-[#496cbf] transition-all duration-300 group-hover/philosophy:w-16" />

                    <p className="font-['Inter'] text-[12.5px] font-normal leading-[1.6] text-[#647795] transition-colors duration-300 group-hover/philosophy:text-[#526681] dark:text-neutral-400 dark:group-hover/philosophy:text-neutral-300 sm:text-[14px]">
                      Every architectural decision I make is grounded in
                      long-term maintainability, production reliability, and
                      clean separation of concerns. I build backend systems the
                      way they should run — quietly, correctly, and at scale.
                    </p>

                    <div className="my-6 h-px bg-[#e8edf5] transition-colors duration-300 group-hover/philosophy:bg-[#cbd8ff] dark:bg-neutral-800 dark:group-hover/philosophy:bg-[#496cbf]/30 sm:my-7" />

                    <div className="space-y-0">
                      {principles.map((principle, index) => {
                        const descriptions = [
                          "Code that reads clearly and extends without friction.",
                          "Structured commits, branch hygiene, and clean history.",
                          "Designing for traffic, teams, and features that don't exist yet.",
                          "Systems that hold up under real-world conditions and load.",
                          "Profiling, indexing, and removing every avoidable bottleneck.",
                        ];

                        return (
                          <div
                            key={principle.label}
                            className="group/principle flex min-w-0 items-start gap-3 border-b border-[#edf1f6] py-3.5 transition-all duration-300 last:border-b-0 hover:translate-x-1 hover:border-[#cbd8ff] dark:border-neutral-800 dark:hover:border-[#496cbf]/30"
                          >
                            <span
                              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] font-['JetBrains_Mono'] text-[10px] font-semibold transition-all duration-300 group-hover/principle:scale-110 group-hover/principle:shadow-[0_3px_10px_rgba(73,108,191,0.15)] ${
                                index === 4
                                  ? "bg-[#496cbf] text-white group-hover/principle:bg-[#36569f]"
                                  : "bg-[#eef2ff] text-[#496cbf] group-hover/principle:bg-[#496cbf] group-hover/principle:text-white dark:bg-[#496cbf]/15"
                              }`}
                            >
                              {index + 1}
                            </span>

                            <div className="min-w-0 flex-1">
                              <h4 className="break-words font-['Plus_Jakarta_Sans'] text-[13px] font-bold leading-[1.4] text-[#182238] transition-colors duration-300 group-hover/principle:text-[#496cbf] dark:text-white dark:group-hover/principle:text-[#8ba5ed] sm:text-[14px]">
                                {principle.label}
                              </h4>

                              <p className="mt-0.5 break-words font-['Inter'] text-[11px] leading-[1.45] text-[#71829e] transition-colors duration-300 group-hover/principle:text-[#526681] dark:text-neutral-400 dark:group-hover/principle:text-neutral-300 sm:text-[12px]">
                                {principle.description ||
                                  descriptions[index] ||
                                  ""}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-[#e8edf5] pt-4 transition-colors duration-300 group-hover/philosophy:border-[#cbd8ff] dark:border-neutral-800 dark:group-hover/philosophy:border-[#496cbf]/30 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-2">
                        <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#22c55e] transition-all duration-300 group-hover/philosophy:scale-125 group-hover/philosophy:shadow-[0_0_8px_rgba(34,197,94,0.5)]" />

                        <span className="font-['JetBrains_Mono'] text-[9px] text-[#8192ad] transition-colors duration-300 group-hover/philosophy:text-[#496cbf] dark:group-hover/philosophy:text-[#8ba5ed]">
                          Applied across all Buildupnet projects
                        </span>
                      </div>

                      <span className="font-['JetBrains_Mono'] text-[9px] text-[#91a2bc] transition-colors duration-300 group-hover/philosophy:text-[#496cbf] dark:group-hover/philosophy:text-[#8ba5ed]">
                        <span className="text-[12px] font-bold text-[#496cbf]">
                          {principles.length}
                        </span>{" "}
                        core principles
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
            SECTION 05 — CAREER DIRECTION
        ====================================================== */}

      <section className="bg-white pb-20 pt-12 transition-colors duration-300 dark:bg-[#090d16] sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-0">
          <div className="mb-12 flex flex-col items-start justify-between gap-5 sm:mb-16 lg:flex-row lg:items-end">
            <div className="group/career">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[2px] w-7 bg-[#496cbf] transition-all duration-300 group-hover/career:w-11" />
                <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.025em] text-[#496cbf] transition-colors duration-300 group-hover/career:text-[#36569f] dark:group-hover/career:text-[#8ba5ed]">
                  Career Focus
                </span>
              </div>

              <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-bold leading-[1.15] tracking-[-0.045em] text-[#182238] transition-colors duration-300 dark:text-white sm:text-[40px] lg:text-[46px]">
                Career Direction &amp;{" "}
                <span className="inline-block text-[#496cbf] transition-all duration-300 group-hover/career:translate-x-1 group-hover/career:text-[#36569f] dark:group-hover/career:text-[#8ba5ed]">
                  Opportunities
                </span>
              </h2>

              <div className="mt-4 h-[3px] w-14 rounded-full bg-[#e3e9f2] transition-all duration-300 group-hover/career:w-24 group-hover/career:bg-[#496cbf] dark:bg-neutral-800" />
            </div>

            <div className="group/status inline-flex shrink-0 items-center gap-2 rounded-full border border-[#a7f3c2] bg-[#f0fdf5] px-4 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#16c45b] hover:bg-[#e5fbed] hover:shadow-[0_6px_18px_rgba(22,196,91,0.12)] dark:border-[#166534]/50 dark:bg-[#052e16]/30 dark:hover:bg-[#052e16]/50">
              <span className="h-[7px] w-[7px] rounded-full bg-[#16c45b] transition-all duration-300 group-hover/status:scale-125 group-hover/status:shadow-[0_0_9px_rgba(22,196,91,0.6)]" />
              <span className="font-['JetBrains_Mono'] text-[9px] font-medium uppercase tracking-[0.025em] text-[#07833b] transition-colors duration-300 group-hover/status:text-[#056b30]">
                Actively Seeking New Opportunities
              </span>
            </div>
          </div>

          <div className="group/direction relative overflow-hidden rounded-[24px] border border-[#e0e8f3] bg-[#f7f9fc] px-6 py-9 shadow-[0_2px_12px_rgba(24,34,56,0.015)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#cbd8ff] hover:shadow-[0_16px_40px_rgba(73,108,191,0.08)] dark:border-neutral-800 dark:bg-[#101827] dark:hover:border-[#496cbf]/40 dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] sm:px-10 sm:py-12 lg:px-16 lg:py-14">
            <div className="pointer-events-none absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-[#496cbf] transition-transform duration-500 group-hover/direction:scale-x-100" />

            <div className="relative ml-1 border-l-[2px] border-[#e0e7f0] pl-7 transition-colors duration-300 group-hover/direction:border-[#cbd8ff] sm:ml-0 sm:pl-12 lg:pl-20">
              <div className="absolute left-[-2px] top-0 h-[200px] w-[3px] rounded-full bg-[#496cbf] transition-all duration-300 group-hover/direction:w-[4px] group-hover/direction:shadow-[0_0_10px_rgba(73,108,191,0.25)] sm:h-[200px]" />

              <div className="group/objective border-b border-[#e0e8f1] pb-8 transition-colors duration-300 hover:border-[#cbd8ff] sm:pb-9">
                <div className="mb-5 flex items-center gap-2">
                  <span className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#edf2ff] font-['JetBrains_Mono'] text-[10px] font-medium text-[#496cbf] transition-all duration-300 group-hover/objective:scale-110 group-hover/objective:bg-[#496cbf] group-hover/objective:text-white group-hover/objective:shadow-[0_4px_10px_rgba(73,108,191,0.18)] dark:bg-[#496cbf]/15">
                    01
                  </span>

                  <span className="font-['JetBrains_Mono'] text-[9px] font-medium uppercase tracking-[0.025em] text-[#496cbf] transition-colors duration-300 group-hover/objective:text-[#36569f] dark:group-hover/objective:text-[#8ba5ed]">
                    Primary Objective
                  </span>
                </div>

                <p className="max-w-[750px] font-['Inter'] text-[15px] font-normal leading-[1.4] text-[#182238] transition-colors duration-300 group-hover/objective:text-[#345078] dark:text-neutral-200 dark:group-hover/objective:text-white sm:text-[16px]">
                  I am actively seeking a Laravel Developer or Full Stack PHP
                  Developer role where I can contribute to meaningful products,
                  solve real-world engineering problems, and collaborate with
                  experienced teams. I'm looking for an environment that values
                  clean architecture, production-grade development, and
                  long-term technical growth.
                </p>
              </div>

              <div className="group/preferences border-b border-[#e0e8f1] py-8 transition-colors duration-300 hover:border-[#cbd8ff] sm:py-9">
                <div className="mb-5 flex items-center gap-2">
                  <span className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#edf2ff] font-['JetBrains_Mono'] text-[10px] font-medium text-[#496cbf] transition-all duration-300 group-hover/preferences:scale-110 group-hover/preferences:bg-[#496cbf] group-hover/preferences:text-white group-hover/preferences:shadow-[0_4px_10px_rgba(73,108,191,0.18)] dark:bg-[#496cbf]/15">
                    02
                  </span>

                  <span className="font-['JetBrains_Mono'] text-[9px] font-medium uppercase tracking-[0.025em] text-[#496cbf] transition-colors duration-300 group-hover/preferences:text-[#36569f] dark:group-hover/preferences:text-[#8ba5ed]">
                    Engagement Preferences
                  </span>
                </div>

                <p className="max-w-[750px] font-['Inter'] text-[15px] font-normal leading-[1.4] text-[#182238] transition-colors duration-300 group-hover/preferences:text-[#345078] dark:text-neutral-200 dark:group-hover/preferences:text-white sm:text-[16px]">
                  I am equally open to freelance and remote opportunities that
                  prioritize quality over speed, long-term collaboration over
                  short-term delivery, and production-ready practices over quick
                  patches. If you're building something that needs a backend
                  engineer who takes reliability seriously, I'd like to hear
                  about it.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-6 sm:mt-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-7">
                <div className="group/role inline-flex cursor-default items-center gap-2 rounded-[7px] border border-[#c5d4ff] bg-[#eef2ff] px-3 py-1.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#496cbf] hover:bg-[#e3eaff] hover:shadow-[0_5px_14px_rgba(73,108,191,0.12)] dark:border-[#496cbf]/40 dark:bg-[#496cbf]/10 dark:hover:bg-[#496cbf]/20">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#496cbf] transition-all duration-300 group-hover/role:scale-125 group-hover/role:shadow-[0_0_7px_rgba(73,108,191,0.5)]" />
                  <span className="font-['JetBrains_Mono'] text-[10px] font-medium text-[#345bb4] transition-colors duration-300 group-hover/role:text-[#182238] dark:group-hover/role:text-[#a8bdf5]">
                    Laravel Developer
                  </span>
                </div>

                <span className="hidden h-5 w-px bg-[#e0e8f1] sm:block" />

                <div className="group/fullstack inline-flex cursor-default items-center gap-2 rounded-[7px] border border-[#c5d4ff] bg-[#eef2ff] px-3 py-1.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#496cbf] hover:bg-[#e3eaff] hover:shadow-[0_5px_14px_rgba(73,108,191,0.12)] dark:border-[#496cbf]/40 dark:bg-[#496cbf]/10 dark:hover:bg-[#496cbf]/20">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#496cbf] transition-all duration-300 group-hover/fullstack:scale-125 group-hover/fullstack:shadow-[0_0_7px_rgba(73,108,191,0.5)]" />
                  <span className="font-['JetBrains_Mono'] text-[10px] font-medium text-[#345bb4] transition-colors duration-300 group-hover/fullstack:text-[#182238] dark:group-hover/fullstack:text-[#a8bdf5]">
                    Full Stack PHP Developer
                  </span>
                </div>

                <span className="hidden h-5 w-px bg-[#e0e8f1] sm:block" />

                <div className="group/remote inline-flex cursor-default items-center gap-2 rounded-[7px] border border-[#a7f3c2] bg-[#f0fdf5] px-3 py-1.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#16c45b] hover:bg-[#e5fbed] hover:shadow-[0_5px_14px_rgba(22,196,91,0.12)] dark:border-[#166534]/50 dark:bg-[#052e16]/30 dark:hover:bg-[#052e16]/50">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#16c45b] transition-all duration-300 group-hover/remote:scale-125 group-hover/remote:shadow-[0_0_7px_rgba(22,196,91,0.5)]" />
                  <span className="font-['JetBrains_Mono'] text-[10px] font-medium text-[#07833b] transition-colors duration-300 group-hover/remote:text-[#056b30]">
                    Remote &amp; Freelance
                  </span>
                </div>
              </div>

              <div className="group/work flex items-center gap-2 lg:shrink-0 lg:justify-end">
                <span className="h-px w-5 bg-[#d9e2ef] transition-all duration-300 group-hover/work:w-9 group-hover/work:bg-[#496cbf]" />
                <span className="font-['JetBrains_Mono'] text-[9px] text-[#91a2bc] transition-colors duration-300 group-hover/work:text-[#496cbf] dark:group-hover/work:text-[#8ba5ed]">
                  Open to meaningful work
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutClientPage;
