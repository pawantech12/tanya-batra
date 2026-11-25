"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";

import {
  ArrowRight,
  ArrowUpRight,
  ShoppingCart,
  Scissors,
  Network,
  Code2,
  Zap,
} from "lucide-react";

const projectThemes = [
  {
    icon: ShoppingCart,
    background: "from-[#C8D3FF] to-[#DFE7FA]",
    iconColor: "text-[#496CBF]",
    numberColor: "text-[#496CBF]",
    labelColor: "text-[#496CBF]",
    tagColor: "bg-[#EEF2FF] text-[#496CBF]",
  },
  {
    icon: Scissors,
    background: "from-[#A5F2D1] to-[#D0F8E8]",
    iconColor: "text-[#00A875]",
    numberColor: "text-[#00A875]",
    labelColor: "text-[#009B70]",
    tagColor: "bg-[#EAFBF4] text-[#009B70]",
  },
  {
    icon: Network,
    background: "from-[#FFC078] to-[#FFD9AC]",
    iconColor: "text-[#F05A18]",
    numberColor: "text-[#F05A18]",
    labelColor: "text-[#F05A18]",
    tagColor: "bg-[#FFF3E8] text-[#E85B1A]",
  },
];

function getProjectTheme(index) {
  return projectThemes[index % projectThemes.length];
}

function getProjectIcon(project, index) {
  if (project?.icon && LucideIcons[project.icon]) {
    return LucideIcons[project.icon];
  }

  return getProjectTheme(index).icon || Code2;
}

function getProjectKeywords(project) {
  if (!Array.isArray(project?.keywords)) {
    return [];
  }

  return project.keywords.filter(
    (keyword) => typeof keyword === "string" && keyword.trim(),
  );
}

function ProjectCard({ project, index }) {
  const theme = getProjectTheme(index);
  const Icon = getProjectIcon(project, index);
  const keywords = getProjectKeywords(project);

  return (
    <Link
      href={`/projects/${project._id}`}
      className="group relative block min-w-0 overflow-hidden rounded-[13px] border border-[#E1E8F3] bg-white transition-all duration-300 hover:-translate-y-[3px] hover:border-[#C7D2FE] hover:shadow-[0_14px_35px_rgba(24,34,56,0.07)]"
    >
      <div
        className={`relative flex h-[210px] items-center justify-center overflow-hidden bg-gradient-to-br ${theme.background}`}
      >
        {project?.image && (
          <img
            src={project.image}
            alt={project.title || "Project preview"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-white/10 transition-colors duration-300 group-hover:bg-white/20" />
      </div>

      <div className="px-[22px] pb-[21px] pt-[20px]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="min-w-0 truncate font-heading text-[15px] font-semibold leading-[22px] tracking-[-0.35px] text-[#182238]">
            {project?.title || "Untitled Project"}
          </h3>

          <ArrowUpRight
            size={17}
            strokeWidth={1.7}
            className="shrink-0 text-[#C5CFDC] transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-[#496CBF]"
            aria-hidden="true"
          />
        </div>

        <p className="mt-[7px] font-body text-[13px] font-normal leading-[20px] text-[#667A9A]">
          {project?.description?.length > 150
            ? `${project.description.slice(0, 150)}...`
            : project?.description || "Explore this development project."}
        </p>

        <div className="mt-[10px] border-t border-[#E7ECF3] pt-[11px]">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3">
            <div className="flex min-w-0 flex-wrap items-center gap-[6px]">
              {keywords.slice(0, 4).map((keyword, keywordIndex) => (
                <span
                  key={`${keyword}-${keywordIndex}`}
                  className={`inline-flex items-center rounded-[5px] px-[9px] py-[4px] font-mono text-[9px] leading-[12px] ${
                    keywordIndex === 2
                      ? theme.tagColor
                      : "bg-[#F1F5F9] text-[#52647E]"
                  }`}
                >
                  {keyword}
                </span>
              ))}
            </div>

            <span className="inline-flex shrink-0 items-center gap-[5px] font-body text-[12px] font-semibold text-[#496CBF] transition-colors duration-200 group-hover:text-[#294B9C]">
              View case
              <ArrowRight size={13} strokeWidth={1.8} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ProjectSkeleton() {
  return (
    <div className="overflow-hidden rounded-[13px] border border-[#E1E8F3] bg-white">
      <div className="h-[210px] animate-pulse bg-[#F0F4F9]" />

      <div className="px-[22px] pb-[21px] pt-[23px]">
        <div className="h-[13px] w-[62%] animate-pulse rounded-[4px] bg-[#E2E8F0]" />

        <div className="mt-[13px] space-y-[8px]">
          <div className="h-[8px] w-full animate-pulse rounded bg-[#F1F5F9]" />
          <div className="h-[8px] w-full animate-pulse rounded bg-[#F1F5F9]" />
          <div className="h-[8px] w-[78%] animate-pulse rounded bg-[#F1F5F9]" />
        </div>

        <div className="mt-[13px] border-t border-[#E7ECF3] pt-[13px]">
          <div className="flex items-center gap-[6px]">
            <div className="h-[19px] w-[49px] animate-pulse rounded-[5px] bg-[#F1F5F9]" />
            <div className="h-[19px] w-[41px] animate-pulse rounded-[5px] bg-[#F1F5F9]" />
            <div className="h-[19px] w-[57px] animate-pulse rounded-[5px] bg-[#F1F5F9]" />
            <div className="ml-auto h-[10px] w-[55px] animate-pulse rounded bg-[#EEF2FF]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get("/api/projects");

        setProjects(
          Array.isArray(res.data)
            ? res.data.filter(
                (project) =>
                  project &&
                  typeof project === "object" &&
                  typeof project.title === "string",
              )
            : [],
        );
      } catch (error) {
        console.error("Error while fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const featuredProjects = projects.slice(0, 3);

  return (
    <section
      id="projects"
      aria-label="Selected development projects"
      className="relative overflow-hidden bg-[#F8FAFC] py-[85px] sm:py-[95px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-0">
        <div className="grid grid-cols-1 items-start gap-7 md:grid-cols-[1.55fr_1fr] md:gap-[55px]">
          <div>
            <div className="flex items-center gap-[10px]">
              <span className="h-[2px] w-[23px] bg-[#496CBF]" />

              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25px] text-[#496CBF]">
                Selected Work
              </span>
            </div>

            <h2 className="mt-[20px] font-heading text-[34px] font-bold leading-[1.18] tracking-[-1.3px] text-[#182238] sm:text-[40px] lg:text-[44px]">
              Selected projects.
              <br />
              Real <span className="text-[#496CBF]">engineering.</span>
            </h2>
          </div>

          <div className="pt-0 md:pt-[2px]">
            <p className="max-w-[455px] font-body text-[15px] font-normal leading-[27px] text-[#667A9A] sm:text-[16px]">
              A showcase of my development projects demonstrating modern
              technology stacks, clean architecture, and practical solutions.
              Each project represents real-world engineering work.
            </p>

            <div className="mt-[16px] inline-flex min-h-[27px] items-center gap-[8px] rounded-[7px] border border-[#C7D2FE] bg-[#EEF2FF] px-[11px] py-[5px]">
              <Zap
                size={13}
                strokeWidth={1.8}
                className="shrink-0 text-[#496CBF]"
              />

              <span className="font-mono text-[10px] tracking-[0.1px] text-[#385EB8]">
                Projects from /api/projects
              </span>
            </div>
          </div>
        </div>

        <div className="mt-[44px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))
          ) : featuredProjects.length > 0 ? (
            featuredProjects.map((project, index) => (
              <ProjectCard
                key={project._id || project.title || index}
                project={project}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full flex min-h-[260px] flex-col items-center justify-center rounded-[13px] border border-[#E1E8F3] bg-white px-6 py-12 text-center">
              <Code2 size={26} className="text-[#496CBF]" />

              <h3 className="mt-3 font-heading text-[15px] font-semibold text-[#182238]">
                No projects available yet
              </h3>

              <p className="mt-1 font-body text-[13px] leading-[20px] text-[#667A9A]">
                Featured projects will appear here once they have been added.
              </p>
            </div>
          )}
        </div>

        <div className="mt-[60px] border-t border-[#E2E8F0] pt-[39px]">
          <div className="flex flex-col items-center justify-center gap-[13px] sm:flex-row sm:gap-[13px]">
            <Link
              href="/projects"
              className="group inline-flex min-h-[48px] items-center justify-center gap-[12px] rounded-[8px] border border-[#E1E8F3] bg-white px-[28px] py-[10px] font-body text-[14px] font-medium text-[#182238] transition-all duration-300 hover:border-[#C7D2FE] hover:bg-[#F8FAFF]"
            >
              Explore All Projects
              <ArrowRight
                size={14}
                strokeWidth={1.8}
                className="text-[#496CBF] transition-transform duration-300 group-hover:translate-x-[3px]"
              />
            </Link>

            {!loading && projects.length > 0 && (
              <span className="inline-flex items-center gap-[7px] font-mono text-[12px] tracking-[0.1px] text-[#8CA0C0]">
                <span className="h-[4px] w-[4px] rounded-full bg-[#496CBF]" />
                Showing {featuredProjects.length} of {projects.length} projects
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
