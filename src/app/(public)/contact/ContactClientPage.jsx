"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  UserRound,
  Send,
} from "lucide-react";
import { useForm } from "react-hook-form";

const ContactClientPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    const phoneNumber = "917814565015";

    const message = `
New Contact Form Message:

Name: ${data.name}
Email: ${data.email}
Message: ${data.message}
    `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
    reset();
  };

  return (
    <main className="w-full overflow-hidden bg-white">
      <section className="bg-white px-5 pb-14 pt-16 text-center sm:px-8 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="mx-auto w-full max-w-[720px]">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#c7d5ff] bg-[#eef2ff] px-4 py-2">
            <span className="h-[7px] w-[7px] rounded-full bg-[#496cbf]" />
            <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.025em] text-[#345bb4] sm:text-[11px]">
              Contact
            </span>
          </div>

          <h1 className="font-['Plus_Jakarta_Sans'] text-[36px] font-bold leading-[1.2] tracking-[-0.045em] text-[#182238] sm:text-[44px] lg:text-[52px]">
            Get in <span className="text-[#496cbf]">Touch</span> with Me
          </h1>

          <div className="mx-auto mt-5 h-[3px] w-14 rounded-full bg-[#e2e8f0]" />

          <p className="mx-auto mt-6 max-w-[650px] font-['Inter'] text-[15px] font-normal leading-[1.6] text-[#647795] sm:text-[16px]">
            Whether it's a freelance project, full-time collaboration, or a
            quick question about development, I'd love to hear from you. Fill
            out the form below or reach out via social links.
          </p>
        </div>
      </section>

      <section className="border-y border-[#e5ebf4] bg-[#f7f9fc] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 items-stretch gap-5 md:grid-cols-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex min-w-0 flex-col rounded-xl border border-[#e1e8f3] bg-white p-6 shadow-[0_4px_18px_rgba(24,34,56,0.045)] transition-shadow duration-300 hover:shadow-[0_8px_26px_rgba(24,34,56,0.07)] sm:p-7"
          >
            <h2 className="mb-6 text-center font-['Plus_Jakarta_Sans'] text-[22px] font-bold leading-[1.3] tracking-[-0.035em] text-[#182238] sm:text-[25px]">
              Get in <span className="text-[#496cbf]">Touch</span>
            </h2>

            <div className="flex flex-1 flex-col gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block font-['Inter'] text-[12px] font-semibold text-[#182238] sm:text-[13px]"
                >
                  Full Name <span className="text-[#496cbf]">*</span>
                </label>

                <div className="relative">
                  <UserRound
                    size={15}
                    strokeWidth={1.8}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8bce9]"
                  />
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Full Name"
                    {...register("name", { required: true })}
                    className="h-[44px] w-full rounded-lg border border-[#e1e8f3] bg-white pl-9 pr-3 font-['Inter'] text-[13px] text-[#182238] outline-none transition-all duration-200 placeholder:text-[#9aafd2] focus:border-[#496cbf] focus:ring-2 focus:ring-[#496cbf]/10 sm:text-[14px]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block font-['Inter'] text-[12px] font-semibold text-[#182238] sm:text-[13px]"
                >
                  Email Address <span className="text-[#496cbf]">*</span>
                </label>

                <div className="relative">
                  <Mail
                    size={15}
                    strokeWidth={1.8}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8bce9]"
                  />
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Email Address"
                    {...register("email", { required: true })}
                    className="h-[44px] w-full rounded-lg border border-[#e1e8f3] bg-white pl-9 pr-3 font-['Inter'] text-[13px] text-[#182238] outline-none transition-all duration-200 placeholder:text-[#9aafd2] focus:border-[#496cbf] focus:ring-2 focus:ring-[#496cbf]/10 sm:text-[14px]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-['Inter'] text-[12px] font-semibold text-[#182238] sm:text-[13px]"
                >
                  Your Message <span className="text-[#496cbf]">*</span>
                </label>

                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Your Message"
                  {...register("message", { required: true })}
                  className="min-h-[130px] w-full resize-none rounded-lg border border-[#e1e8f3] bg-white px-3 py-3 font-['Inter'] text-[13px] leading-6 text-[#182238] outline-none transition-all duration-200 placeholder:text-[#9aafd2] focus:border-[#496cbf] focus:ring-2 focus:ring-[#496cbf]/10 sm:text-[14px]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#496cbf] px-5 font-['Inter'] text-[14px] font-semibold text-white shadow-[0_5px_14px_rgba(73,108,191,0.18)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#385AA8] hover:shadow-[0_9px_22px_rgba(73,108,191,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={15} strokeWidth={1.8} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

          <div className="flex min-w-0 flex-col rounded-xl border border-[#e1e8f3] bg-white p-6 shadow-[0_4px_18px_rgba(24,34,56,0.045)] transition-shadow duration-300 hover:shadow-[0_8px_26px_rgba(24,34,56,0.07)] sm:p-7">
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold leading-[1.3] tracking-[-0.035em] text-[#182238] sm:text-[25px]">
                Get in <span className="text-[#496cbf]">Touch</span>
              </h2>

              <div className="mb-5 mt-2 h-[3px] w-10 rounded-full bg-[#e1e8f3]" />

              <p className="mb-6 font-['Inter'] text-[14px] leading-[1.7] text-[#647795] sm:text-[15px]">
                Reach out via email, phone, or social media. I'm always open to
                discuss projects, collaboration, or career opportunities.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:batraofficial.02@gmail.com"
                className="group flex min-h-[65px] items-center gap-3 rounded-[10px] border border-[#e1e8f3] bg-[#f7f9fc] px-3 transition-all duration-300 hover:border-[#c7d5ff] hover:bg-[#f1f4ff]"
              >
                <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg border border-[#c7d5ff] bg-[#eef2ff] text-[#496cbf] transition-colors duration-300 group-hover:bg-[#496cbf] group-hover:text-white">
                  <Mail size={17} strokeWidth={1.8} />
                </span>

                <span className="flex min-w-0 flex-col gap-1">
                  <span className="font-['Inter'] text-[12px] font-semibold text-[#496cbf]">
                    Email
                  </span>
                  <span className="break-all font-['Inter'] text-[13px] text-[#647795]">
                    batraofficial.02@gmail.com
                  </span>
                </span>
              </a>

              <a
                href="tel:+917814565015"
                className="group flex min-h-[65px] items-center gap-3 rounded-[10px] border border-[#e1e8f3] bg-[#f7f9fc] px-3 transition-all duration-300 hover:border-[#c7d5ff] hover:bg-[#f1f4ff]"
              >
                <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg border border-[#c7d5ff] bg-[#eef2ff] text-[#496cbf] transition-colors duration-300 group-hover:bg-[#496cbf] group-hover:text-white">
                  <Phone size={17} strokeWidth={1.8} />
                </span>

                <span className="flex flex-col gap-1">
                  <span className="font-['Inter'] text-[12px] font-semibold text-[#496cbf]">
                    Phone
                  </span>
                  <span className="font-['Inter'] text-[13px] text-[#647795]">
                    +91 7814565015
                  </span>
                </span>
              </a>

              <div className="group flex min-h-[65px] items-center gap-3 rounded-[10px] border border-[#e1e8f3] bg-[#f7f9fc] px-3 transition-all duration-300 hover:border-[#c7d5ff] hover:bg-[#f1f4ff]">
                <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg border border-[#c7d5ff] bg-[#eef2ff] text-[#496cbf] transition-colors duration-300 group-hover:bg-[#496cbf] group-hover:text-white">
                  <MapPin size={17} strokeWidth={1.8} />
                </span>

                <span className="flex flex-col gap-1">
                  <span className="font-['Inter'] text-[12px] font-semibold text-[#496cbf]">
                    Location
                  </span>
                  <span className="font-['Inter'] text-[13px] text-[#647795]">
                    Nabha, Punjab, India
                  </span>
                </span>
              </div>
            </div>

            <div className="mb-3 mt-6 flex items-center gap-2">
              <span className="h-px flex-1 bg-[#e1e8f3]" />
              <span className="px-1 font-['JetBrains_Mono'] text-[10px] text-[#9aafd2]">
                Connect
              </span>
              <span className="h-px flex-1 bg-[#e1e8f3]" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="https://github.com/tanya-batra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[38px] items-center gap-2 rounded-lg border border-[#e1e8f3] bg-[#f7f9fc] px-3 font-['Inter'] text-[12px] font-semibold text-[#496cbf] transition-all duration-200 hover:border-[#c7d5ff] hover:bg-[#eef2ff]"
              >
                <Github size={16} strokeWidth={1.8} />
                GitHub
              </Link>

              <Link
                href="https://www.linkedin.com/in/tanyabatra7814"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[38px] items-center gap-2 rounded-lg border border-[#e1e8f3] bg-[#f7f9fc] px-3 font-['Inter'] text-[12px] font-semibold text-[#496cbf] transition-all duration-200 hover:border-[#c7d5ff] hover:bg-[#eef2ff]"
              >
                <Linkedin size={16} strokeWidth={1.8} />
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto flex w-full max-w-[760px] flex-col items-center rounded-[13px] border border-[#C7D2FE] bg-[#F8FAFF] px-6 py-10 text-center sm:px-10 sm:py-12 lg:px-14 lg:py-14 lg:min-h-[362px] lg:justify-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#c7d5ff] bg-[#eef2ff] px-4 py-2">
            <span className="h-[7px] w-[7px] rounded-full bg-[#496cbf]" />
            <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.025em] text-[#345bb4] sm:text-[11px]">
              Let's Collaborate
            </span>
          </div>

          <h2 className="max-w-[550px] font-['Plus_Jakarta_Sans'] text-[28px] font-bold leading-[1.25] tracking-[-0.04em] text-[#182238] sm:text-[34px] lg:text-[38px]">
            Let's Build <span className="text-[#496cbf]">Something</span>{" "}
            Together
          </h2>

          <div className="mb-5 mt-5 h-[3px] w-14 rounded-full bg-[#e2e8f0]" />

          <p className="mb-8 max-w-[570px] font-['Inter'] text-[14px] font-normal leading-[1.7] text-[#647795] sm:text-[15px]">
            I'm open to freelance or full-time projects where we can create
            modern, scalable, and production-ready web applications.
          </p>

          <Link
            href="mailto:batraofficial.02@gmail.com"
            className="inline-flex min-h-[48px] items-center justify-center gap-[10px] rounded-[8px] bg-[#496CBF] px-7 py-3 font-['Inter'] text-[14px] font-semibold text-white shadow-[0_5px_14px_rgba(73,108,191,0.18)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#385AA8] hover:shadow-[0_9px_22px_rgba(73,108,191,0.25)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#496CBF]/20"
          >
            Contact Me
            <Mail size={16} strokeWidth={1.8} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ContactClientPage;
