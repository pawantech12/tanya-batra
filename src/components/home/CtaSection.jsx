"use client";

import Link from "next/link";
import { ArrowRight, FileText, LayoutGrid } from "lucide-react";

const CtaSection = () => {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-[#F8FAFC] px-5 pb-[96px] pt-[96px] sm:px-8 sm:pt-[100px] lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex items-center justify-center gap-[10px]">
            <span className="h-[2px] w-[28px] bg-[#496CBF]" />

            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2px] text-[#496CBF]">
              Let's Work Together
            </span>
          </div>

          <h2
            id="cta-heading"
            className="mt-[22px] font-heading text-[34px] font-bold leading-[1.2] tracking-[-1.3px] text-[#182238] sm:text-[44px] lg:text-[52px]"
          >
            Have a project <span className="text-[#496CBF]">in mind?</span>
          </h2>

          <p className="mx-auto mt-[16px] max-w-[590px] font-body text-[15px] leading-[28px] text-[#667A9A] sm:text-[17px]">
            Let's discuss how I can help build reliable backend systems,
            scalable applications, and production-ready web solutions.
          </p>
        </div>

        <div className="mt-[56px] rounded-[20px] border border-[#DFE6F1] bg-white px-6 py-10 sm:px-10 sm:py-12 lg:px-[55px] lg:py-[51px]">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-[55px]">
            <div className="min-w-0">
              <div className="inline-flex min-h-[29px] items-center gap-[9px] rounded-full border border-[#A7F3C5] bg-[#F0FDF4] px-[12px] py-[5px]">
                <span className="h-[7px] w-[7px] rounded-full bg-[#16B86A]" />

                <span className="font-body text-[12px] font-medium text-[#168044]">
                  Currently open to new opportunities
                </span>
              </div>

              <h3 className="mt-[18px] max-w-[590px] font-heading text-[27px] font-bold leading-[1.35] tracking-[-0.8px] text-[#182238] sm:text-[31px]">
                Open for Freelance &amp; Full-Time Opportunities
              </h3>

              <p className="mt-[14px] max-w-[570px] font-body text-[14px] leading-[26px] text-[#667A9A] sm:text-[15px]">
                From business applications to production-grade platforms, I
                focus on maintainable code, clean architecture, and reliable
                engineering.
              </p>

              <div className="mt-[27px] h-px w-full max-w-[560px] bg-[#DFE6F1]" />

              <div className="mt-[28px] grid grid-cols-1 gap-y-5 sm:grid-cols-3 sm:gap-0">
                <div className="sm:border-r sm:border-[#DFE6F1] sm:pr-5">
                  <p className="font-mono text-[9px] font-medium uppercase tracking-[0.3px] text-[#8CA0C0]">
                    Response Time
                  </p>
                  <p className="mt-[5px] font-body text-[12px] font-semibold text-[#182238] sm:text-[13px]">
                    Within 24 hours
                  </p>
                </div>

                <div className="sm:border-r sm:border-[#DFE6F1] sm:px-8">
                  <p className="font-mono text-[9px] font-medium uppercase tracking-[0.3px] text-[#8CA0C0]">
                    Preferred Work
                  </p>
                  <p className="mt-[5px] font-body text-[12px] font-semibold text-[#182238] sm:text-[13px]">
                    Remote &amp; Hybrid
                  </p>
                </div>

                <div className="sm:pl-8">
                  <p className="font-mono text-[9px] font-medium uppercase tracking-[0.3px] text-[#8CA0C0]">
                    Engagement
                  </p>
                  <p className="mt-[5px] font-body text-[12px] font-semibold text-[#182238] sm:text-[13px]">
                    Full-time &amp; Freelance
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex min-w-0 flex-col items-center border-t border-[#DFE6F1] pt-9 text-center lg:min-h-[160px] lg:justify-center lg:border-l lg:border-t-0 lg:py-0 lg:pl-[55px]">
              <h3 className="font-heading text-[19px] font-bold tracking-[-0.4px] text-[#182238]">
                Ready to get started?
              </h3>

              <p className="mt-[7px] max-w-[310px] font-body text-[13px] leading-[23px] text-[#667A9A]">
                Drop me a message and let's talk about your project, role, or
                idea.
              </p>

              <Link
                href="/contact"
                className="mt-[20px] inline-flex min-h-[54px] w-full max-w-[248px] items-center justify-center gap-[11px] rounded-[12px] bg-[#496CBF] px-6 font-body text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#3E5FAE] hover:shadow-[0_10px_25px_rgba(73,108,191,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF] focus-visible:ring-offset-2"
              >
                Start a Conversation
                <ArrowRight
                  size={16}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <div className="mt-[28px] h-px w-full max-w-[280px] bg-[#DFE6F1]" />

              <p className="mt-[26px] font-mono text-[9px] font-medium uppercase tracking-[0.3px] text-[#8CA0C0]">
                Or Quick Access
              </p>

              <div className="mt-[13px] flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[8px] font-body text-[13px] font-medium text-[#496CBF] transition-colors duration-200 hover:text-[#304F9B]"
                >
                  <FileText size={14} strokeWidth={1.8} />
                  View Resume
                </Link>

                <span className="hidden h-[20px] w-px bg-[#DFE6F1] sm:block" />

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-[8px] font-body text-[13px] font-medium text-[#667A9A] transition-colors duration-200 hover:text-[#496CBF]"
                >
                  <LayoutGrid size={14} strokeWidth={1.8} />
                  Explore Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
