"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import {
  MessageSquareQuote,
  Quote,
  Zap,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const avatarThemes = [
  {
    background: "bg-[#EEF2FF]",
    border: "border-[#DCE5FF]",
    color: "text-[#496CBF]",
  },
  {
    background: "bg-[#EAFBF4]",
    border: "border-[#C9F5E2]",
    color: "text-[#00A875]",
  },
  {
    background: "bg-[#FFF5EB]",
    border: "border-[#FFD9B5]",
    color: "text-[#F05A18]",
  },
];

function getInitials(name) {
  if (!name || typeof name !== "string") return "CL";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function getAvatarTheme(index) {
  return avatarThemes[index % avatarThemes.length];
}

// ---------------------------------------------
// TESTIMONIAL CARD
// ---------------------------------------------

function TestimonialCard({ testimonial, index }) {
  const theme = getAvatarTheme(index);

  return (
    <article
      itemScope
      itemType="https://schema.org/Review"
      className="flex h-full min-h-[310px] flex-col rounded-[14px] border border-[#E1E8F3] bg-[#F8FAFC] px-[24px] pb-[24px] pt-[25px] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#C7D2FE] hover:shadow-[0_12px_28px_rgba(24,34,56,0.05)] sm:px-[28px]"
    >
      <div className="flex items-start justify-between gap-3">
        <Quote
          size={38}
          strokeWidth={0}
          fill="#D7E0F4"
          className="shrink-0 rotate-180 text-[#D7E0F4]"
          aria-hidden="true"
        />

        <div className="mt-[5px] inline-flex shrink-0 items-center gap-[6px] rounded-full bg-[#EEF2FF] px-[9px] py-[4px]">
          <Zap size={10} strokeWidth={1.9} className="text-[#496CBF]" />

          <span className="font-mono text-[9px] leading-[12px] text-[#496CBF]">
            via /api/testimonials
          </span>
        </div>
      </div>

      <p
        itemProp="reviewBody"
        className="mt-[10px] flex-1 font-body text-[14px] font-normal leading-[24px] text-[#182238] sm:text-[15px] sm:leading-[26px]"
      >
        "{testimonial?.content || "Client feedback."}"
      </p>

      <div className="mt-[22px] border-t border-[#E1E8F3] pt-[22px]">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-[12px]">
            <div
              className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border ${theme.background} ${theme.border}`}
            >
              <span
                className={`font-body text-[10px] font-semibold ${theme.color}`}
              >
                {getInitials(testimonial?.name)}
              </span>
            </div>

            <div className="min-w-0">
              <p
                itemProp="author"
                className="truncate font-heading text-[12px] font-semibold leading-[18px] text-[#182238] sm:text-[13px]"
              >
                {testimonial?.name || "Client"}
              </p>

              <p className="mt-[1px] truncate font-mono text-[10px] leading-[15px] text-[#71839F]">
                {testimonial?.role || "Collaborator"}
              </p>
            </div>
          </div>

          <span className="max-w-[115px] shrink-0 truncate rounded-[5px] bg-[#F1F5F9] px-[9px] py-[5px] font-mono text-[10px] leading-[13px] text-[#71839F]">
            {testimonial?.type || "Client"}
          </span>
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------
// LOADING SKELETON
// ---------------------------------------------

function TestimonialSkeleton() {
  return (
    <div className="min-h-[310px] animate-pulse rounded-[14px] border border-[#E1E8F3] bg-[#F8FAFC] px-[24px] pb-[24px] pt-[29px] sm:px-[28px]">
      <div className="h-[17px] w-[24px] rounded-[3px] bg-[#E2E8F0]" />

      <div className="mt-[20px] space-y-[9px]">
        <div className="h-[10px] w-full rounded bg-[#E2E8F0]" />
        <div className="h-[10px] w-full rounded bg-[#F1F5F9]" />
        <div className="h-[10px] w-full rounded bg-[#F1F5F9]" />
        <div className="h-[10px] w-[85%] rounded bg-[#F1F5F9]" />
      </div>

      <div className="mt-[21px] border-t border-[#E1E8F3] pt-[20px]">
        <div className="flex items-center gap-[10px]">
          <div className="h-[34px] w-[34px] rounded-full bg-[#E2E8F0]" />

          <div className="space-y-[6px]">
            <div className="h-[9px] w-[92px] rounded bg-[#E2E8F0]" />
            <div className="h-[8px] w-[68px] rounded bg-[#F1F5F9]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------
// MAIN TESTIMONIAL SECTION
// ---------------------------------------------

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------------------
  // FETCH TESTIMONIALS
  // -------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get("/api/testimonials");

        setTestimonials(
          Array.isArray(res.data)
            ? res.data.filter(
                (testimonial) => testimonial && typeof testimonial === "object",
              )
            : [],
        );
      } catch (error) {
        console.error("Error while fetching testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // -------------------------------------------
  // RENDER
  // -------------------------------------------

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-white py-[85px] sm:py-[95px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-0">
        {/* SECTION HEADER */}

        <div className="mx-auto max-w-[650px] text-center">
          <div className="flex items-center justify-center gap-[10px]">
            <span className="h-[2px] w-[28px] bg-[#496CBF]" />

            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25px] text-[#496CBF]">
              Client Feedback
            </span>
          </div>

          <h2
            id="testimonials-heading"
            className="mt-[22px] font-heading text-[34px] font-bold leading-[1.2] tracking-[-1.3px] text-[#182238] sm:text-[40px] lg:text-[44px] lg:leading-[1.18]"
          >
            What people say about
            <br className="hidden sm:block" />
            working together.
          </h2>

          <p className="mx-auto mt-[16px] max-w-[590px] font-body text-[15px] font-normal leading-[27px] text-[#667A9A] sm:text-[16px]">
            Real feedback from clients and collaborators highlighting my
            approach to clean code, scalability, and professional delivery.
          </p>
        </div>

        {/* TESTIMONIAL CONTENT */}

        <div className="mt-[48px]">
          {loading ? (
            <>
              <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <TestimonialSkeleton key={item} />
                ))}
              </div>

              <div className="mt-[88px] flex flex-col items-center justify-center text-center">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] border border-[#E1E8F3] bg-[#F1F5F9]">
                  <MessageSquare
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#8CA0C0]"
                  />
                </div>

                <p className="mt-[13px] font-heading text-[14px] font-semibold text-[#182238]">
                  Testimonials loading
                </p>

                <p className="mt-[5px] font-mono text-[10px] leading-[16px] text-[#8CA0C0]">
                  Client feedback will appear here once loaded from{" "}
                  /api/testimonials
                </p>

                <RefreshCw
                  size={13}
                  className="mt-[14px] animate-spin text-[#496CBF]"
                />
              </div>
            </>
          ) : testimonials.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              className="testimonial-swiper !pb-[48px]"
              spaceBetween={20}
              slidesPerView={1}
              loop={testimonials.length > 3}
              autoplay={
                testimonials.length > 1
                  ? {
                      delay: 3500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              pagination={{
                clickable: true,
                dynamicBullets: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide
                  key={testimonial._id || testimonial.id || index}
                  className="!h-auto"
                >
                  <TestimonialCard testimonial={testimonial} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[14px] border border-[#E1E8F3] bg-[#F8FAFC] px-6 py-12 text-center">
              <MessageSquareQuote
                size={27}
                strokeWidth={1.6}
                className="text-[#496CBF]"
              />

              <h3 className="mt-4 font-heading text-[15px] font-semibold text-[#182238]">
                No testimonials available yet
              </h3>

              <p className="mt-2 font-body text-[13px] leading-[21px] text-[#667A9A]">
                Client feedback will appear here once testimonials have been
                added.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SWIPER PAGINATION STYLES */}

      <style jsx global>{`
        .testimonial-swiper .swiper-pagination {
          bottom: 5px !important;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .testimonial-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          margin: 0 !important;
          background: #dce4f1;
          opacity: 1;
          transition: all 0.25s ease;
        }

        .testimonial-swiper .swiper-pagination-bullet-active {
          width: 7px;
          height: 7px;
          background: #496cbf;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
