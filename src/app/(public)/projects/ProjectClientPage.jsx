"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, ArrowUpRight } from "lucide-react";
import axios from "axios";

const ProjectClientPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get("/api/projects");
        setProjects(res.data);
      } catch (error) {
        console.log("Error while fetching projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="w-full overflow-hidden bg-white dark:bg-[#0b1120]">
      <section className="border-b border-[#edf1f7] bg-white px-5 pb-14 pt-16 transition-colors duration-300 dark:border-neutral-800 dark:bg-[#0b1120] sm:px-8 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="group/hero max-w-[720px]">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#c7d5ff] bg-[#eef2ff] px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#496cbf]/60 hover:shadow-[0_5px_15px_rgba(73,108,191,0.1)] dark:border-[#496cbf]/40 dark:bg-[#496cbf]/10">
              <span className="h-[7px] w-[7px] rounded-full bg-[#496cbf] transition-all duration-300 group-hover/hero:scale-125 group-hover/hero:shadow-[0_0_8px_rgba(73,108,191,0.5)]" />

              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.025em] text-[#345bb4] transition-colors duration-300 group-hover/hero:text-[#182238] dark:group-hover/hero:text-[#a8bdf5] sm:text-[11px]">
                Projects
              </span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-[36px] font-bold leading-[1.2] tracking-[-0.045em] text-[#182238] transition-colors duration-300 dark:text-white sm:text-[44px] lg:text-[52px]">
              My Work &amp;{" "}
              <span className="inline-block text-[#496cbf] transition-all duration-300 group-hover/hero:translate-x-1 group-hover/hero:text-[#36569f] dark:group-hover/hero:text-[#8da8f2]">
                Projects
              </span>
            </h1>

            <div className="mt-5 h-[3px] w-14 rounded-full bg-[#e2e8f0] transition-all duration-300 group-hover/hero:w-24 group-hover/hero:bg-[#496cbf] dark:bg-neutral-800" />

            <p className="mt-6 max-w-[650px] font-['Inter'] text-[15px] font-normal leading-[1.4] text-[#647795] transition-colors duration-300 group-hover/hero:text-[#526681] dark:text-neutral-300 dark:group-hover/hero:text-neutral-200 sm:text-[16px]">
              I focus on delivering production-ready applications that solve
              real-world problems. These projects showcase my experience with
              Laravel, PHP, Next.js, MySQL, and structured development
              workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-7 transition-colors duration-300 dark:bg-[#0b1120] sm:px-8 sm:py-8 lg:px-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="group/search relative">
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search projects by title or category"
              className="h-[50px] w-full rounded-[9px] border border-[#e3eaf4] bg-white py-3 pl-4 pr-11 font-['Inter'] text-[13px] text-[#182238] outline-none transition-all duration-300 placeholder:text-[#a2b0c6] hover:border-[#cbd8ff] hover:shadow-[0_3px_12px_rgba(73,108,191,0.05)] focus:border-[#496cbf] focus:ring-[3px] focus:ring-[#496cbf]/10 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500 dark:hover:border-[#496cbf]/50"
            />

            <Search
              size={16}
              strokeWidth={1.7}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#91a2bc] transition-all duration-300 group-focus-within/search:scale-110 group-focus-within/search:text-[#496cbf]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc] px-5 py-12 transition-colors duration-300 dark:bg-[#0d1423] sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="group/heading mb-9 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-7 bg-[#496cbf] transition-all duration-300 group-hover/heading:w-11" />

              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.02em] text-[#496cbf] transition-colors duration-300 group-hover/heading:text-[#36569f] sm:text-[11px]">
                All Projects
              </span>
            </div>
          </div>

          {loading ? (
            <div
              className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
              aria-label="Loading projects"
              aria-busy="true"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex min-w-0 animate-pulse flex-col overflow-hidden rounded-[13px] border border-[#e1e8f3] bg-white dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="h-[190px] w-full shrink-0 bg-[#e9eef6] dark:bg-neutral-800 sm:h-[200px] lg:h-[205px]" />

                  <div className="flex flex-1 flex-col px-5 pb-4 pt-5 sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="h-5 w-3/5 rounded-md bg-[#e9eef6] dark:bg-neutral-800" />
                      <div className="h-4 w-4 rounded bg-[#e9eef6] dark:bg-neutral-800" />
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="h-3 w-full rounded bg-[#edf1f6] dark:bg-neutral-800" />
                      <div className="h-3 w-[90%] rounded bg-[#edf1f6] dark:bg-neutral-800" />
                      <div className="h-3 w-[65%] rounded bg-[#edf1f6] dark:bg-neutral-800" />
                    </div>

                    <div className="mt-5 border-t border-[#edf1f6] pt-3 dark:border-neutral-800">
                      <div className="flex min-h-[36px] flex-wrap gap-1.5">
                        <div className="h-[25px] w-16 rounded-[5px] bg-[#edf1f6] dark:bg-neutral-800" />
                        <div className="h-[25px] w-20 rounded-[5px] bg-[#edf1f6] dark:bg-neutral-800" />
                        <div className="h-[25px] w-14 rounded-[5px] bg-[#edf1f6] dark:bg-neutral-800" />
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <div className="h-4 w-20 rounded bg-[#e9eef6] dark:bg-neutral-800" />
                      <div className="h-3 w-16 rounded bg-[#edf1f6] dark:bg-neutral-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="group/empty flex min-h-[350px] flex-col items-center justify-center px-4 py-16 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[11px] border border-[#cbd8ff] bg-[#eef2ff] text-[#496cbf] transition-all duration-300 group-hover/empty:scale-110 group-hover/empty:border-[#496cbf] group-hover/empty:bg-[#496cbf] group-hover/empty:text-white group-hover/empty:shadow-[0_8px_20px_rgba(73,108,191,0.15)] dark:border-[#496cbf]/30 dark:bg-[#496cbf]/10">
                <Search
                  size={21}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover/empty:rotate-[-8deg]"
                />
              </div>

              <span className="mb-3 inline-flex items-center rounded-full border border-[#cbd8ff] bg-[#eef2ff] px-4 py-1.5 font-['Inter'] text-[12px] font-semibold text-[#496cbf] transition-all duration-300 group-hover/empty:border-[#496cbf]/60 group-hover/empty:shadow-[0_4px_12px_rgba(73,108,191,0.08)] dark:border-[#496cbf]/30 dark:bg-[#496cbf]/10">
                No Projects Found
              </span>

              <p className="max-w-[360px] font-['Inter'] text-[13px] font-normal leading-[1.6] text-[#91a2bc] transition-colors duration-300 group-hover/empty:text-[#647795] dark:text-neutral-400 sm:text-[14px]">
                No projects match your search. Try a different keyword.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {filteredProjects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project._id}`}
                  className="group/project relative flex min-w-0 flex-col overflow-hidden rounded-[13px] border border-[#e1e8f3] bg-white shadow-[0_2px_8px_rgba(24,34,56,0.015)] transition-all duration-300 ease-out hover:-translate-y-[4px] hover:border-[#496cbf]/50 hover:shadow-[0_14px_32px_rgba(24,34,56,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496cbf] focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-[#496cbf]/50 dark:hover:shadow-[0_14px_32px_rgba(0,0,0,0.25)]"
                >
                  <div className="relative h-[190px] w-full shrink-0 overflow-hidden bg-[#eef2f8] dark:bg-neutral-800 sm:h-[200px] lg:h-[205px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/project:scale-[1.06]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#182238]/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/project:opacity-100" />

                    <div className="pointer-events-none absolute inset-0 border-[3px] border-[#496cbf]/0 transition-colors duration-300 group-hover/project:border-[#496cbf]/20" />
                  </div>

                  <div className="relative flex flex-1 flex-col px-5 pb-4 pt-5 sm:px-5 sm:pb-4">
                    <div className="pointer-events-none absolute left-5 right-5 top-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#496cbf] transition-transform duration-500 ease-out group-hover/project:scale-x-100" />

                    <div className="flex min-w-0 items-center justify-between gap-3">
                      <h2 className="min-w-0 flex-1 truncate font-['Plus_Jakarta_Sans'] text-[17px] font-bold leading-[1.4] tracking-[-0.025em] text-[#182238] transition-colors duration-300 group-hover/project:text-[#496cbf] dark:text-white dark:group-hover/project:text-[#8da8f2] sm:text-[18px]">
                        {project.title}
                      </h2>

                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.8}
                        className="shrink-0 text-[#91a2bc] transition-all duration-300 group-hover/project:-translate-y-0.5 group-hover/project:translate-x-0.5 group-hover/project:text-[#496cbf]"
                      />
                    </div>

                    <p className="mt-3 font-['Inter'] text-[13px] font-normal leading-[1.5] text-[#647795] transition-colors duration-300 group-hover/project:text-[#526681] dark:text-neutral-400 dark:group-hover/project:text-neutral-300 sm:text-[13.5px]">
                      {project.description?.length > 150
                        ? `${project.description.slice(0, 150)}...`
                        : project.description}
                    </p>

                    <div className="mt-3 border-t border-[#edf1f6] pt-3 transition-colors duration-300 group-hover/project:border-[#d6e0f2] dark:border-neutral-800 dark:group-hover/project:border-[#496cbf]/30">
                      <div className="flex min-h-[36px] flex-wrap content-start gap-1.5">
                        {project.keywords?.slice(0, 4).map((keyword, index) => (
                          <span
                            key={`${keyword}-${index}`}
                            className="inline-flex max-w-full items-center rounded-[5px] bg-[#f0f4f9] px-2.5 py-[6px] font-['JetBrains_Mono'] text-[9px] font-medium leading-none text-[#71829e] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e5ecfa] hover:text-[#496cbf] dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-[#496cbf]/15 dark:hover:text-[#a8bdf5]"
                          >
                            <span className="truncate">{keyword}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto flex min-w-0 items-center justify-between gap-2 pt-3 dark:border-neutral-800">
                      <span className="inline-flex shrink-0 items-center gap-1.5 font-['Inter'] text-[12px] font-semibold text-[#496cbf] transition-colors duration-300 group-hover/project:text-[#3455a3] dark:text-[#8da8f2]">
                        View case
                        <ArrowRight
                          size={14}
                          strokeWidth={2}
                          className="transition-transform duration-300 group-hover/project:translate-x-1"
                        />
                      </span>

                      {project.category && (
                        <span className="min-w-0 truncate font-['JetBrains_Mono'] text-[10px] text-[#b1bfd3] transition-colors duration-300 group-hover/project:text-[#71829e] dark:text-neutral-500 dark:group-hover/project:text-neutral-300">
                          {project.category}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProjectClientPage;
