"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";

import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Zap,
  Server,
  Workflow,
  Database,
  Layers,
} from "lucide-react";

const serviceThemes = [
  {
    icon: Server,
    iconColor: "text-[#496CBF]",
    iconBg: "bg-[#EEF2FF]",
  },
  {
    icon: Workflow,
    iconColor: "text-[#00A875]",
    iconBg: "bg-[#EAFBF4]",
  },
  {
    icon: Database,
    iconColor: "text-[#F97316]",
    iconBg: "bg-[#FFF5EB]",
  },
  {
    icon: Layers,
    iconColor: "text-[#8B35FF]",
    iconBg: "bg-[#F4EEFF]",
  },
];

function getServiceTheme(service, index) {
  const title = (service?.title || "").toLowerCase();

  if (title.includes("backend")) return serviceThemes[0];
  if (title.includes("api")) return serviceThemes[1];
  if (title.includes("database")) return serviceThemes[2];

  if (title.includes("full stack") || title.includes("fullstack")) {
    return serviceThemes[3];
  }

  return serviceThemes[index % serviceThemes.length];
}

function getServiceIcon(service, index) {
  const theme = getServiceTheme(service, index);

  if (service?.icon && LucideIcons[service.icon]) {
    return LucideIcons[service.icon];
  }

  return theme.icon || Code2;
}

function getServiceTags(service) {
  const tags =
    service?.technologies ||
    service?.techStack ||
    service?.tags ||
    service?.technology;

  if (Array.isArray(tags)) {
    return tags.filter(Boolean).slice(0, 3).join(" · ");
  }

  if (typeof tags === "string" && tags.trim()) {
    return tags;
  }

  return "";
}

function ServiceCard({ service, index }) {
  const theme = getServiceTheme(service, index);
  const Icon = getServiceIcon(service, index);
  const tags = getServiceTags(service);

  return (
    <article className="group relative flex min-h-[232px] flex-col overflow-hidden rounded-[12px] border border-[#E1E8F3] bg-white p-[24px] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#C7D2FE] hover:shadow-[0_12px_30px_rgba(24,34,56,0.06)]">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-[36px] w-[36px] items-center justify-center rounded-[11px] ${theme.iconBg}`}
        >
          <Icon
            size={19}
            strokeWidth={1.8}
            className={theme.iconColor}
            aria-hidden="true"
          />
        </div>

        <ArrowUpRight
          size={17}
          strokeWidth={1.7}
          className="text-[#C5CFDC] transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-[#496CBF]"
          aria-hidden="true"
        />
      </div>

      <div className="mt-[15px]">
        <h3 className="font-heading text-[15px] font-semibold leading-[22px] tracking-[-0.3px] text-[#182238]">
          {service?.title || "Development Service"}
        </h3>

        <p className="mt-[6px] font-body text-[13px] font-normal leading-[20px] text-[#667A9A] sm:text-[14px] sm:leading-[22px]">
          {service?.description || "Professional development solutions."}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-3 pt-[17px]">
        {tags ? (
          <span className="inline-flex max-w-[70%] items-center truncate rounded-[5px] bg-[#F1F5F9] px-[10px] py-[4px] font-mono text-[10px] leading-[13px] text-[#667A9A]">
            {tags}
          </span>
        ) : (
          <span />
        )}

        <Link
          href="/services"
          className="inline-flex shrink-0 items-center gap-[5px] font-body text-[12px] font-medium text-[#496CBF] transition-colors duration-200 hover:text-[#304F9B]"
        >
          Learn more
          <ArrowRight size={13} strokeWidth={1.8} />
        </Link>
      </div>
    </article>
  );
}

function ServiceSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="min-h-[232px] animate-pulse rounded-[12px] border border-[#E1E8F3] bg-[#F8FAFC] p-[24px]"
        >
          <div className="h-[36px] w-[36px] rounded-[11px] bg-[#EEF2FF]" />

          <div className="mt-[19px] h-[12px] w-[65%] rounded-[4px] bg-[#E2E8F0]" />

          <div className="mt-[11px] space-y-[7px]">
            <div className="h-[8px] w-full rounded bg-[#F1F5F9]" />
            <div className="h-[8px] w-full rounded bg-[#F1F5F9]" />
            <div className="h-[8px] w-[72%] rounded bg-[#F1F5F9]" />
          </div>

          <div className="mt-[19px] h-[17px] w-[62px] rounded-[5px] bg-[#E2E8F0]" />
        </div>
      ))}
    </div>
  );
}

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get("/api/services");

        setServices(
          Array.isArray(res.data)
            ? res.data.filter(
                (service) =>
                  service &&
                  typeof service === "object" &&
                  typeof service.title === "string",
              )
            : [],
        );
      } catch (error) {
        console.error("Error while fetching services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      id="services"
      aria-label="Services and capabilities"
      className="relative overflow-hidden bg-white py-[85px] sm:py-[90px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-0">
        <div className="grid grid-cols-1 items-start gap-7 md:grid-cols-[1.55fr_1fr] md:gap-[55px]">
          <div>
            <div className="flex items-center gap-[10px]">
              <span className="h-[2px] w-[28px] bg-[#496CBF]" />

              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25px] text-[#496CBF]">
                Services &amp; Capabilities
              </span>
            </div>

            <h2 className="mt-[25px] max-w-[570px] font-heading text-[34px] font-bold leading-[1.18] tracking-[-1.3px] text-[#182238] sm:text-[40px] lg:text-[44px]">
              Engineering solutions
              <br className="hidden sm:block" /> that move businesses
              <br className="hidden sm:block" /> forward.
            </h2>
          </div>

          <div className="pt-0 md:pt-[2px] lg:pt-[1px]">
            <p className="max-w-[455px] font-body text-[15px] font-normal leading-[27px] text-[#667A9A] sm:text-[16px]">
              I provide developer-focused services with modern tech stacks,
              scalable architecture, and professional implementations. Clean,
              efficient, and production-ready solutions.
            </p>

            <div className="mt-[17px] inline-flex min-h-[31px] items-center gap-[8px] rounded-[7px] border border-[#C7D2FE] bg-[#EEF2FF] px-[11px] py-[6px]">
              <Zap
                size={13}
                strokeWidth={1.8}
                className="shrink-0 text-[#496CBF]"
              />

              <span className="font-mono text-[10px] tracking-[0.1px] text-[#385EB8] sm:text-[11px]">
                Services from /api/services
              </span>
            </div>
          </div>
        </div>

        <div className="mt-[48px] sm:mt-[50px]">
          {loading ? (
            <ServiceSkeleton />
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
              {services.slice(0, 4).map((service, index) => (
                <ServiceCard
                  key={service._id || service.id || service.title || index}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[12px] border border-[#E1E8F3] bg-[#F8FAFC] px-6 py-12 text-center">
              <Code2 size={25} className="text-[#496CBF]" />

              <h3 className="mt-3 font-heading text-[15px] font-semibold text-[#182238]">
                No services available yet
              </h3>

              <p className="mt-1 font-body text-[13px] leading-[20px] text-[#667A9A]">
                Services will appear here once they have been added.
              </p>
            </div>
          )}
        </div>

        <div className="mt-[58px] flex justify-center sm:mt-[64px]">
          <Link
            href="/services"
            className="group inline-flex min-h-[48px] items-center justify-center gap-[12px] rounded-[8px] border border-[#E1E8F3] bg-white px-[28px] py-[11px] font-body text-[14px] font-medium text-[#182238] transition-all duration-300 hover:border-[#C7D2FE] hover:bg-[#F8FAFF]"
          >
            Explore All Services
            <ArrowRight
              size={14}
              strokeWidth={1.8}
              className="text-[#496CBF] transition-transform duration-300 group-hover:translate-x-[3px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
