"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Loader from "@/components/loader";
import * as LucideIcons from "lucide-react";
import { ArrowRight, ArrowUpRight, Rocket } from "lucide-react";

function ServiceSkeleton() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {[1, 2, 3, 6, 5, 4].map((item) => (
        <div
          key={item}
          className="min-h-[232px] animate-pulse rounded-[12px] border border-[#E1E8F3] bg-white p-[24px] dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="flex items-center justify-between">
            <div className="h-[36px] w-[36px] rounded-[11px] bg-[#EEF2FF] dark:bg-[#496CBF]/15" />
            <div className="h-4 w-4 rounded bg-[#F1F5F9] dark:bg-neutral-800" />
          </div>

          <div className="mt-[19px] h-[13px] w-[65%] rounded-[4px] bg-[#E2E8F0] dark:bg-neutral-800" />

          <div className="mt-[12px] space-y-[8px]">
            <div className="h-[8px] w-full rounded bg-[#F1F5F9] dark:bg-neutral-800" />
            <div className="h-[8px] w-full rounded bg-[#F1F5F9] dark:bg-neutral-800" />
            <div className="h-[8px] w-[72%] rounded bg-[#F1F5F9] dark:bg-neutral-800" />
          </div>

          <div className="mt-[24px] flex justify-end">
            <div className="h-[12px] w-[72px] rounded bg-[#E2E8F0] dark:bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ServiceCard({ service }) {
  const Icon = LucideIcons[service.icon] || LucideIcons.HelpCircle;

  return (
    <article className="group flex min-h-[232px] min-w-0 flex-col rounded-[12px] border border-[#E1E8F3] bg-white p-[24px] shadow-[0_2px_8px_rgba(24,34,56,0.015)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#C7D2FE] hover:shadow-[0_12px_30px_rgba(24,34,56,0.06)] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-[#496CBF]/50">
      <div className="flex items-center justify-between">
        <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[11px] bg-[#EEF2FF] dark:bg-[#496CBF]/15">
          <Icon
            size={19}
            strokeWidth={1.8}
            className="text-[#496CBF] dark:text-[#8DA8F2]"
            aria-hidden="true"
          />
        </div>

        <ArrowUpRight
          size={17}
          strokeWidth={1.7}
          className="shrink-0 text-[#C5CFDC] transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-[#496CBF] dark:text-neutral-600 dark:group-hover:text-[#8DA8F2]"
          aria-hidden="true"
        />
      </div>

      <div className="mt-[15px] min-w-0">
        <h3 className="break-words font-['Plus_Jakarta_Sans'] text-[15px] font-semibold leading-[22px] tracking-[-0.3px] text-[#182238] dark:text-white">
          {service.title}
        </h3>

        <p className="mt-[6px] break-words font-['Inter'] text-[13px] font-normal leading-[20px] text-[#667A9A] dark:text-neutral-400 sm:text-[14px] sm:leading-[22px]">
          {service.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-end pt-[20px]">
        <Link
          href="/services"
          className="inline-flex shrink-0 items-center gap-[5px] font-['Inter'] text-[12px] font-medium text-[#496CBF] transition-colors duration-200 hover:text-[#304F9B] dark:text-[#8DA8F2] dark:hover:text-white"
        >
          Learn more
          <ArrowRight
            size={13}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:translate-x-[2px]"
          />
        </Link>
      </div>
    </article>
  );
}

const ServiceClientPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get("/api/services");
        setServices(res.data);
      } catch (error) {
        console.log("Error while fetching services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="w-full overflow-hidden bg-white dark:bg-[#0b1120]">
      <section className="border-b border-[#edf1f7] bg-white px-5 pb-14 pt-16 dark:border-neutral-800 dark:bg-[#0b1120] sm:px-8 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="max-w-[720px]">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#c7d5ff] bg-[#eef2ff] px-4 py-2 dark:border-[#496cbf]/40 dark:bg-[#496cbf]/10">
              <span className="h-[7px] w-[7px] rounded-full bg-[#496cbf]" />

              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.025em] text-[#345bb4] dark:text-[#8da8f2] sm:text-[11px]">
                Services
              </span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-[36px] font-bold leading-[1.2] tracking-[-0.045em] text-[#182238] dark:text-white sm:text-[44px] lg:text-[52px]">
              My <span className="text-[#496cbf]">Developer Services</span>
            </h1>

            <div className="mt-5 h-[3px] w-14 rounded-full bg-[#e2e8f0] dark:bg-neutral-800" />

            <p className="mt-6 max-w-[650px] font-['Inter'] text-[15px] font-normal leading-[1.6] text-[#647795] dark:text-neutral-300 sm:text-[16px]">
              I provide a wide range of development services for startups and
              businesses, delivering modern, scalable, and production-ready web
              applications using the latest technologies.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc] px-5 py-12 dark:bg-[#0d1423] sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto w-full max-w-[1280px]">
          {loading ? (
            <ServiceSkeleton />
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white px-5 py-14 dark:bg-[#0b1120] sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mx-auto w-full max-w-[760px] rounded-[13px] border border-[#C7D2FE] bg-[#F8FAFF] px-6 py-10 text-center dark:border-[#496CBF]/30 dark:bg-[#101a2d] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <h2 className="font-['Plus_Jakarta_Sans'] text-[28px] font-bold leading-[1.25] tracking-[-0.04em] text-[#182238] dark:text-white sm:text-[34px] lg:text-[38px]">
              Looking for a <span className="text-[#496cbf]">Developer?</span>
            </h2>

            <p className="mx-auto mt-5 max-w-[570px] font-['Inter'] text-[14px] font-normal leading-[1.7] text-[#647795] dark:text-neutral-300 sm:text-[15px]">
              I’m open to freelance or full-time opportunities where I can
              contribute to meaningful projects and build production-ready
              applications with structured workflows.
            </p>

            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex min-h-[48px] items-center justify-center gap-[10px] rounded-[8px] bg-[#496CBF] px-7 py-3 font-['Inter'] text-[14px] font-semibold text-white shadow-[0_5px_14px_rgba(73,108,191,0.18)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#385AA8] hover:shadow-[0_9px_22px_rgba(73,108,191,0.25)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#496CBF]/20"
              >
                Let’s Work Together
                <Rocket
                  size={16}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceClientPage;
