"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays, Tag, UserRound, Zap, LoaderCircle } from "lucide-react";

const ProjectDetailsClient = ({ id }) => {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`/api/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.log("Error while fetching project details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <main className="w-full overflow-hidden bg-white">
      <section className="bg-white px-5 pb-14 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-[58px] lg:pt-16">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            {loading ? (
              <>
                <div className="h-[23px] w-[122px] animate-pulse rounded-full bg-[#eef2ff]" />
                <div className="h-[23px] w-[158px] animate-pulse rounded-md bg-[#f1f4f9]" />
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c7d5ff] bg-[#eef2ff] px-3 py-1.5 font-['JetBrains_Mono'] text-[10px] font-semibold text-[#496cbf]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#496cbf]" />
                  {project.category}
                </div>

                <div className="inline-flex items-center gap-2 rounded-md border border-[#e1e8f3] bg-[#f8faff] px-3 py-1.5 font-['JetBrains_Mono'] text-[9px] text-[#647795]">
                  <Zap size={11} className="text-[#496cbf]" />
                  GET /api/projects/{id}
                </div>
              </>
            )}
          </div>

          <div className="max-w-[690px]">
            {loading ? (
              <div className="space-y-3">
                <div className="h-10 w-full max-w-[590px] animate-pulse rounded-md bg-[#e9edf4]" />
                <div className="h-10 w-[78%] animate-pulse rounded-md bg-[#e9edf4]" />
                <div className="mt-5 h-[2px] w-11 bg-[#eef2f7]" />
                <div className="mt-6 space-y-2.5">
                  <div className="h-3 w-full animate-pulse rounded bg-[#f0f3f8]" />
                  <div className="h-3 w-full animate-pulse rounded bg-[#f0f3f8]" />
                  <div className="h-3 w-[88%] animate-pulse rounded bg-[#f0f3f8]" />
                  <div className="h-3 w-[70%] animate-pulse rounded bg-[#f0f3f8]" />
                </div>
              </div>
            ) : (
              <>
                <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] font-bold leading-[1.2] tracking-[-0.045em] text-[#182238] sm:text-[38px] md:text-[40px]">
                  {project.title}
                </h1>

                <div className="mb-4 mt-3 h-[2px] w-11 bg-[#e1e8f3]" />

                <p className="whitespace-pre-line font-['Inter'] text-[13px] leading-[1.85] text-[#647795] sm:text-[14px]">
                  {project.description}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-[58px]">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-[2px] w-[22px] bg-[#496cbf]" />
              <span className="font-['JetBrains_Mono'] text-[9px] font-semibold uppercase tracking-[0.025em] text-[#496cbf]">
                Project Details
              </span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold leading-tight tracking-[-0.035em] text-[#182238] sm:text-[25px]">
              Technical & Project Information
            </h2>

            <div className="mt-2.5 h-[2px] w-[38px] bg-[#e1e8f3]" />
          </div>

          {loading ? (
            <div className="space-y-7">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-lg border border-[#e1e8f3] bg-white px-4 py-2 font-['JetBrains_Mono'] text-[10px] text-[#496cbf]">
                  <LoaderCircle size={13} className="animate-spin" />
                  Loading Project Details...
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-6 w-20 animate-pulse rounded-full bg-[#eef2ff]" />

                <div className="space-y-2.5">
                  <div className="h-[18px] w-[50%] animate-pulse rounded bg-[#e4e9f1]" />
                  <div className="h-[18px] w-[35%] animate-pulse rounded bg-[#e4e9f1]" />
                  <div className="h-[2px] w-11 bg-[#eef2f7]" />
                </div>

                <div className="space-y-3">
                  <div className="h-[12px] w-full animate-pulse rounded bg-[#f0f3f8]" />
                  <div className="h-[12px] w-full animate-pulse rounded bg-[#f0f3f8]" />
                  <div className="h-[12px] w-[60%] animate-pulse rounded bg-[#f0f3f8]" />
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#e1e8f3] bg-white">
                <div className="grid grid-cols-1 divide-y divide-[#e1e8f3] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="px-6 py-6">
                      <div className="mb-3 h-2 w-16 animate-pulse rounded bg-[#f0f3f8]" />
                      <div className="h-3 w-28 animate-pulse rounded bg-[#e4e9f1]" />
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#e1e8f3] px-6 py-5">
                  <div className="mb-4 h-2 w-14 animate-pulse rounded bg-[#f0f3f8]" />
                  <div className="flex flex-wrap gap-2">
                    {[72, 58, 86, 64].map((width, index) => (
                      <div
                        key={index}
                        style={{ width }}
                        className="h-[23px] animate-pulse rounded-full bg-[#eef2ff]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[#e1e8f3] bg-white shadow-[0_5px_22px_rgba(24,34,56,0.045)]">
              <div className="grid grid-cols-1 divide-y divide-[#e1e8f3] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="flex min-w-0 flex-col gap-2 px-6 py-5 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[9px] font-medium uppercase tracking-[0.025em] text-[#9aafd2]">
                    <Tag size={11} strokeWidth={1.8} />
                    Category
                  </div>

                  <p className="break-words font-['Inter'] text-[13px] font-semibold text-[#182238]">
                    {project.category}
                  </p>
                </div>

                <div className="flex min-w-0 flex-col gap-2 px-6 py-5 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[9px] font-medium uppercase tracking-[0.025em] text-[#9aafd2]">
                    <UserRound size={11} strokeWidth={1.8} />
                    Designed & Developed By
                  </div>

                  <p className="break-words font-['Inter'] text-[13px] font-semibold text-[#182238]">
                    {project.designedBy}
                  </p>
                </div>

                <div className="flex min-w-0 flex-col gap-2 px-6 py-5 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[9px] font-medium uppercase tracking-[0.025em] text-[#9aafd2]">
                    <CalendarDays size={11} strokeWidth={1.8} />
                    Project Date
                  </div>

                  <p className="break-words font-['Inter'] text-[13px] font-semibold text-[#182238]">
                    {project.projectDate}
                  </p>
                </div>
              </div>

              <div className="border-t border-[#e1e8f3] px-6 py-5">
                <div className="mb-3 flex items-center gap-2 font-['JetBrains_Mono'] text-[9px] font-semibold uppercase tracking-[0.025em] text-[#496cbf]">
                  <span className="h-[2px] w-4 bg-[#496cbf]" />
                  Keywords
                </div>

                <div className="flex flex-wrap gap-2">
                  {project?.keywords?.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full border border-[#c7d5ff] bg-[#eef2ff] px-2.5 py-1 font-['JetBrains_Mono'] text-[9px] font-medium text-[#496cbf] transition-colors duration-200 hover:bg-[#e2e9ff]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProjectDetailsClient;
