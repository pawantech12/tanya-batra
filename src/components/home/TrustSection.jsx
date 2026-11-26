"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, FileText, ArrowUpRight } from "lucide-react";

const trustPoints = [
  "Active production deployments at Buildupnet",
  "Real-world e-commerce & SaaS systems shipped",
  "Secure REST API architecture across projects",
];

const statistics = [
  {
    value: 25,
    suffix: "+",
    label: "Projects Completed",
    description: "Across backend & full stack",
  },
  {
    value: 5,
    suffix: "+",
    label: "Certifications Earned",
    description: "Verified technical credentials",
  },
  {
    value: 20,
    suffix: "+",
    label: "Happy Clients",
    description: "Satisfied with delivered results",
  },
  {
    value: 1.5,
    suffix: "+",
    label: "Years of Experience",
    description: "Hands-on engineering work",
  },
];

const TrustSection = () => {
  const sectionRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 1800;
    let animationFrame;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);

      setProgress(easedProgress);

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted]);

  return (
    <section
      ref={sectionRef}
      id="trust"
      aria-label="Developer Trust Section"
      className="w-full bg-[#F8FAFC] py-16 transition-colors duration-300 sm:py-20 lg:py-[88px]"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-0">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-[1.2fr_0.8fr] md:gap-12 lg:gap-20">
          <div className="max-w-[590px]">
            <div className="group flex items-center gap-[11px]">
              <span className="h-[2px] w-[28px] origin-left bg-[#496CBF] transition-all duration-300 group-hover:w-[42px]" />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25px] text-[#496CBF] transition-colors duration-300 group-hover:text-[#304F9B]">
                Professional Experience
              </span>
            </div>

            <h2 className="mt-[25px] max-w-[510px] font-heading text-[34px] font-bold leading-[1.18] tracking-[-1.3px] text-[#182238] transition-colors duration-300 hover:text-[#304F9B] sm:text-[40px] lg:text-[44px] lg:leading-[1.18]">
              Experience built through real-world engineering.
            </h2>
          </div>

          <div className="pt-0 md:pt-[2px] lg:pl-[5px]">
            <p className="max-w-[480px] font-body text-[15px] font-normal leading-[27px] text-[#667A9A] transition-colors duration-300 hover:text-[#526783] sm:text-[16px]">
              Proven experience, multiple successful projects, and mastery of
              modern technologies. Clean code, scalable systems, and a
              developer-first approach.
            </p>

            <div className="mt-[17px] flex flex-col gap-[9px]">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="group flex items-start gap-[9px] rounded-md py-[3px] transition-all duration-300 hover:translate-x-[4px]"
                >
                  <CheckCircle2
                    size={15}
                    strokeWidth={1.8}
                    className="mt-[2px] shrink-0 text-[#16C76A] transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="font-body text-[13px] leading-[19px] text-[#667A9A] transition-colors duration-300 group-hover:text-[#182238] sm:text-[14px]">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[62px] h-px w-full origin-left bg-[#DFE6F1] transition-colors duration-300 sm:mt-[66px] lg:mt-[64px]" />

        <div className="grid grid-cols-2 gap-y-10 py-[65px] sm:py-[72px] lg:grid-cols-4 lg:gap-y-0 lg:py-[86px]">
          {statistics.map((stat, index) => {
            const currentValue = stat.value * progress;
            const displayValue = Number.isInteger(stat.value)
              ? Math.floor(currentValue)
              : currentValue.toFixed(1);

            return (
              <div
                key={stat.label}
                className={`group relative flex flex-col items-center justify-center rounded-xl py-3 text-center transition-all duration-300 hover:-translate-y-[5px] ${
                  index === 1 || index === 3 ? "border-l border-[#DFE6F1]" : ""
                } ${index === 2 ? "lg:border-l lg:border-[#DFE6F1]" : ""}`}
              >
                <h3 className="font-heading text-[44px] font-bold leading-[1.1] tracking-[-1.5px] text-[#182238] transition-colors duration-300 group-hover:text-[#496CBF] sm:text-[52px] lg:text-[56px]">
                  {displayValue}
                  <span className="ml-[3px] text-[#496CBF] transition-colors duration-300 group-hover:text-[#304F9B]">
                    {stat.suffix}
                  </span>
                </h3>

                <p className="mt-[9px] font-body text-[13px] font-semibold leading-[19px] text-[#182238] transition-colors duration-300 group-hover:text-[#496CBF] sm:text-[14px]">
                  {stat.label}
                </p>

                <span className="mt-[3px] font-body text-[11px] leading-[17px] text-[#667A9A] transition-colors duration-300 group-hover:text-[#526783] sm:text-[12px]">
                  {stat.description}
                </span>

                <span className="absolute bottom-0 h-[2px] w-0 rounded-full bg-[#496CBF] transition-all duration-300 group-hover:w-10" />
              </div>
            );
          })}
        </div>

        <div className="h-px w-full bg-[#DFE6F1]" />

        <div className="flex flex-col gap-5 pt-[37px] sm:pt-[42px] lg:flex-row lg:items-center lg:justify-between">
          <div className="group flex items-center gap-[10px]">
            <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#496CBF] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_0_4px_rgba(73,108,191,0.12)]" />
            <span className="font-body text-[12px] text-[#667A9A] transition-colors duration-300 group-hover:text-[#526783]">
              Currently engineering at
            </span>
            <span className="font-body text-[12px] font-bold text-[#182238] transition-colors duration-300 group-hover:text-[#496CBF]">
              Buildupnet
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-7">
            <div className="group flex items-center gap-[8px]">
              <span className="h-[7px] w-[7px] rounded-full bg-[#22C55E] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_0_4px_rgba(34,197,94,0.12)]" />
              <span className="font-body text-[12px] text-[#667A9A] transition-colors duration-300 group-hover:text-[#182238]">
                Open to new opportunities
              </span>
            </div>

            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-[8px] font-body text-[12px] font-medium text-[#496CBF] transition-all duration-300 hover:gap-[11px] hover:text-[#304F9C]"
            >
              <FileText
                size={14}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              Download Resume
              <ArrowUpRight
                size={13}
                className="transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
