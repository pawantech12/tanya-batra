"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, ArrowUpRight, Code2 } from "lucide-react";
import axios from "axios";
import Loader from "@/components/loader";

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
      <section className="border-b border-[#edf1f7] bg-white px-5 pb-14 pt-16 dark:border-neutral-800 dark:bg-[#0b1120] sm:px-8 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="max-w-[720px]">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#c7d5ff] bg-[#eef2ff] px-4 py-2 dark:border-[#496cbf]/40 dark:bg-[#496cbf]/10">
              <span className="h-[7px] w-[7px] rounded-full bg-[#496cbf]" />

              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.025em] text-[#345bb4] sm:text-[11px]">
                Projects
              </span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-[36px] font-bold leading-[1.2] tracking-[-0.045em] text-[#182238] dark:text-white sm:text-[44px] lg:text-[52px]">
              My Work &amp; <span className="text-[#496cbf]">Projects</span>
            </h1>

            <div className="mt-5 h-[3px] w-14 rounded-full bg-[#e2e8f0] dark:bg-neutral-800" />

            <p className="mt-6 max-w-[650px] font-['Inter'] text-[15px] font-normal leading-[1.4] text-[#647795] dark:text-neutral-300 sm:text-[16px]">
              I focus on delivering production-ready applications that solve
              real-world problems. These projects showcase my experience with
              Laravel, PHP, Next.js, MySQL, and structured development
              workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-7 dark:bg-[#0b1120] sm:px-8 sm:py-8 lg:px-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search projects by title or category"
              className="h-[50px] w-full rounded-[9px] border border-[#e3eaf4] bg-white py-3 pl-4 pr-11 font-['Inter'] text-[13px] text-[#182238] outline-none transition-all duration-200 placeholder:text-[#a2b0c6] hover:border-[#cbd8ff] focus:border-[#496cbf] focus:ring-[3px] focus:ring-[#496cbf]/10 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500 dark:hover:border-[#496cbf]/50"
            />

            <Search
              size={16}
              strokeWidth={1.7}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#91a2bc]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc] px-5 py-12 dark:bg-[#0d1423] sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mb-9 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-7 bg-[#496cbf]" />

              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.02em] text-[#496cbf] sm:text-[11px]">
                All Projects
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cbd8ff] bg-[#eef2ff] px-3 py-1.5 font-['JetBrains_Mono'] text-[9px] font-medium text-[#496cbf] dark:border-[#496cbf]/30 dark:bg-[#496cbf]/10 sm:text-[10px]">
              <span className="h-[6px] w-[6px] rounded-full bg-[#496cbf]" />
              GET /api/projects
            </span>
          </div>

          {loading ? (
            <div className="flex min-h-[330px] items-center justify-center py-12">
              <Loader text="Loading Projects..." />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center px-4 py-16 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[11px] border border-[#cbd8ff] bg-[#eef2ff] text-[#496cbf] dark:border-[#496cbf]/30 dark:bg-[#496cbf]/10">
                <Search size={21} strokeWidth={1.7} />
              </div>

              <span className="mb-3 inline-flex items-center rounded-full border border-[#cbd8ff] bg-[#eef2ff] px-4 py-1.5 font-['Inter'] text-[12px] font-semibold text-[#496cbf] dark:border-[#496cbf]/30 dark:bg-[#496cbf]/10">
                No Projects Found
              </span>

              <p className="max-w-[360px] font-['Inter'] text-[13px] font-normal leading-[1.6] text-[#91a2bc] dark:text-neutral-400 sm:text-[14px]">
                No projects match your search. Try a different keyword.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {filteredProjects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project._id}`}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-[13px] border border-[#e1e8f3] bg-white shadow-[0_2px_8px_rgba(24,34,56,0.015)] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#496cbf]/40 hover:shadow-[0_12px_28px_rgba(24,34,56,0.07)] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-[#496cbf]/50"
                >
                  <div className="relative h-[190px] w-full shrink-0 overflow-hidden bg-[#eef2f8] sm:h-[200px] lg:h-[205px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#182238]/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="flex flex-1 flex-col px-5 pb-4 pt-5 sm:px-5 sm:pb-4">
                    <div className="flex min-w-0 items-center justify-between gap-3">
                      <h2 className="min-w-0 flex-1 truncate font-['Plus_Jakarta_Sans'] text-[17px] font-bold leading-[1.4] tracking-[-0.025em] text-[#182238] transition-colors duration-200 group-hover:text-[#496cbf] dark:text-white dark:group-hover:text-[#8da8f2] sm:text-[18px]">
                        {project.title}
                      </h2>

                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.8}
                        className="shrink-0 text-[#91a2bc] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#496cbf]"
                      />
                    </div>

                    <p className="mt-3 font-['Inter'] text-[13px] font-normal leading-[1.5] text-[#647795] dark:text-neutral-400 sm:text-[13.5px]">
                      {project.description?.length > 150
                        ? `${project.description.slice(0, 150)}...`
                        : project.description}
                    </p>

                    <div className="mt-3 border-t border-[#edf1f6] pt-3 dark:border-neutral-800">
                      <div className="flex min-h-[36px] flex-wrap content-start gap-1.5">
                        {project.keywords?.slice(0, 4).map((keyword, index) => (
                          <span
                            key={`${keyword}-${index}`}
                            className="inline-flex max-w-full items-center rounded-[5px] bg-[#f0f4f9] px-2.5 py-[6px] font-['JetBrains_Mono'] text-[9px] font-medium leading-none text-[#71829e] dark:bg-neutral-800 dark:text-neutral-300"
                          >
                            <span className="truncate">{keyword}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto flex min-w-0 items-center justify-between gap-2  pt-3 dark:border-neutral-800">
                      <span className="inline-flex shrink-0 items-center gap-1.5 font-['Inter'] text-[12px] font-semibold text-[#496cbf] transition-colors duration-200 group-hover:text-[#3455a3] dark:text-[#8da8f2]">
                        View case
                        <ArrowRight
                          size={14}
                          strokeWidth={2}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>

                      {project.category && (
                        <span className="min-w-0 truncate font-['JetBrains_Mono'] text-[10px] text-[#b1bfd3] dark:text-neutral-500">
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
