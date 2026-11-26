"use client";

import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

const LoginClientPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setErrorMessage("");

      const res = await axios.post("/api/admin/login", data);

      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/admin");
      }
    } catch (error) {
      console.log("Error: ", error);

      setErrorMessage("Something Went wrong please try again later");
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] px-4 py-12 sm:px-6">
      <div className="group/login w-full max-w-[465px]">
        <div className="mb-[36px] flex flex-col items-center text-center">
          <div className="mb-[15px] flex h-[52px] w-[52px] items-center justify-center rounded-[13px] border border-[#DCE5FA] bg-[#EEF2FF] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-[#B9C9F4] hover:bg-[#E6ECFF] hover:shadow-[0_8px_20px_rgba(73,108,191,0.13)]">
            <ShieldCheck
              size={23}
              strokeWidth={1.8}
              className="text-[#496CBF] transition-transform duration-300 hover:scale-110"
            />
          </div>

          <h1 className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold leading-[1.3] tracking-[-0.035em] text-[#182238] transition-colors duration-300 sm:text-[25px]">
            Secure Admin Login
          </h1>

          <p className="mt-[7px] max-w-[340px] font-['Inter'] text-[13px] font-normal leading-[1.6] text-[#647795] sm:text-[14px]">
            Authentication required to access dashboard, manage content, and
            control backend systems.
          </p>
        </div>

        <div
          className={`relative w-full overflow-hidden rounded-[16px] border bg-white p-[24px] shadow-[0_5px_20px_rgba(24,34,56,0.06)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(24,34,56,0.09)] sm:p-[38px] ${
            errorMessage
              ? "border-[#F8D7DE]"
              : "border-[#E7ECF3] hover:border-[#D4DFF4]"
          }`}
        >
          <div className="absolute left-0 top-0 h-[3px] w-0 rounded-r-full bg-[#496CBF] transition-all duration-500 group-hover/login:w-full" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-[19px]">
            {errorMessage && (
              <div
                role="alert"
                className="flex min-h-[42px] items-center gap-[9px] rounded-[8px] border border-[#F8D7DE] bg-[#FFF1F2] px-[13px] py-[9px] transition-all duration-300 hover:border-[#F1B8C3] hover:bg-[#FFEDEF]"
              >
                <AlertCircle
                  size={14}
                  strokeWidth={2}
                  className="shrink-0 text-[#E34D68] transition-transform duration-300 hover:scale-110"
                />

                <p className="font-['Inter'] text-[12px] font-medium leading-[1.5] text-[#D94360] sm:text-[13px]">
                  {errorMessage}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-[8px] block font-['Inter'] text-[12px] font-semibold leading-[1.5] text-[#182238] transition-colors duration-200 sm:text-[13px]"
              >
                Email Address
              </label>

              <div className="group/input relative">
                <Mail
                  size={15}
                  strokeWidth={1.8}
                  className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#9AA7B7] transition-all duration-300 group-focus-within/input:scale-110 group-focus-within/input:text-[#496CBF]"
                />

                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="admin@portfolio.com"
                  aria-invalid={!!errors.email}
                  className={`h-[46px] w-full rounded-[9px] border bg-white pl-[39px] pr-[13px] font-['Inter'] text-[13px] text-[#182238] outline-none transition-all duration-300 placeholder:text-[#9AAFD2] hover:border-[#C7D5FF] hover:shadow-[0_2px_8px_rgba(73,108,191,0.04)] focus:border-[#496CBF] focus:ring-[2px] focus:ring-[#496CBF]/10 sm:text-[14px] ${
                    errors.email ? "border-[#F1A8B5]" : "border-[#E1E8F3]"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-1 font-['Inter'] text-[12px] text-[#D94360]">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-[8px] block font-['Inter'] text-[12px] font-semibold leading-[1.5] text-[#182238] transition-colors duration-200 sm:text-[13px]"
              >
                Password
              </label>

              <div className="group/input relative">
                <Lock
                  size={15}
                  strokeWidth={1.8}
                  className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#9AA7B7] transition-all duration-300 group-focus-within/input:scale-110 group-focus-within/input:text-[#496CBF]"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  aria-invalid={!!errors.password}
                  className={`h-[46px] w-full rounded-[9px] border bg-white pl-[39px] pr-[42px] font-['Inter'] text-[13px] tracking-[1px] text-[#182238] outline-none transition-all duration-300 placeholder:tracking-[2px] placeholder:text-[#9AAFD2] hover:border-[#C7D5FF] hover:shadow-[0_2px_8px_rgba(73,108,191,0.04)] focus:border-[#496CBF] focus:ring-[2px] focus:ring-[#496CBF]/10 sm:text-[14px] ${
                    errors.password ? "border-[#F1A8B5]" : "border-[#E1E8F3]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-[12px] top-1/2 -translate-y-1/2 rounded-md p-1 text-[#AAB5C5] transition-all duration-300 hover:scale-110 hover:bg-[#EEF2FF] hover:text-[#496CBF] focus:outline-none focus:ring-2 focus:ring-[#496CBF]/20 active:scale-95"
                >
                  {showPassword ? (
                    <EyeOff size={15} strokeWidth={1.8} />
                  ) : (
                    <Eye size={15} strokeWidth={1.8} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 font-['Inter'] text-[12px] text-[#D94360]">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group/button flex h-[48px] w-full items-center justify-center gap-[9px] rounded-[9px] bg-[#496CBF] font-['Inter'] text-[14px] font-semibold text-white shadow-[0_4px_10px_rgba(73,108,191,0.18)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:bg-[#3E5FAE] hover:shadow-[0_8px_18px_rgba(73,108,191,0.26)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Authenticate
                  <ArrowRight
                    size={16}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover/button:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          <div className="my-[26px] h-px w-full bg-[#EDF0F5] transition-colors duration-300 group-hover/login:bg-[#DCE5F5]" />

          <div className="flex justify-center">
            <Link
              href="/"
              className="group/back inline-flex items-center gap-[7px] rounded-md font-['Inter'] text-[12px] font-medium text-[#496CBF] transition-all duration-300 hover:-translate-x-0.5 hover:text-[#304F9C] sm:text-[13px]"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover/back:-translate-x-1"
              />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginClientPage;
