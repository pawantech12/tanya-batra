"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import {
  Code2,
  Braces,
  Workflow,
  Server,
  Database,
  GitBranch,
  Box,
  Send,
  Zap,
  RefreshCw,
  Layers,
  FileCode2,
} from "lucide-react";

// ---------------------------------------------
// SKILL ICON METADATA
// ---------------------------------------------

const skillMetadata = {
  laravel: {
    icon: Code2,
    iconText: "L",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50",
  },
  php: {
    icon: Code2,
    iconText: "P",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
  },
  "rest apis": {
    icon: Workflow,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  node: {
    icon: Server,
    iconText: "N",
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
  },
  "node.js": {
    icon: Server,
    iconText: "N",
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
  },
  vue: {
    icon: Code2,
    iconText: "V",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  "vue.js": {
    icon: Code2,
    iconText: "V",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  javascript: {
    icon: Braces,
    iconText: "JS",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  "tailwind css": {
    icon: Layers,
    iconText: "TW",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  tailwindcss: {
    icon: Layers,
    iconText: "TW",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  html: {
    icon: FileCode2,
    iconText: "H5",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
  css: {
    icon: FileCode2,
    iconText: "H5",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
  "html / css": {
    icon: FileCode2,
    iconText: "H5",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
  mysql: {
    icon: Database,
    iconText: "My",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  postgresql: {
    icon: Database,
    iconText: "PG",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
  },
  redis: {
    icon: Database,
    iconText: "Rd",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
  },
  git: {
    icon: GitBranch,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
  docker: {
    icon: Box,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  postman: {
    icon: Send,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
};

// ---------------------------------------------
// CATEGORY ORDER
// ---------------------------------------------

const categoryOrder = [
  "Backend Development",
  "Frontend Development",
  "Databases",
  "Tools & Infrastructure",
  "Additional Skills",
];

// ---------------------------------------------
// GET SKILL METADATA
// ---------------------------------------------

function getSkillMetadata(skill) {
  // Safely handle missing or invalid skill objects
  const normalizedName = (skill?.name || "").trim().toLowerCase();

  const iconMetadata = skillMetadata[normalizedName] || {
    icon: Code2,
    iconColor: "text-[#496CBF]",
    iconBg: "bg-[#EEF2FF]",
  };

  return {
    ...iconMetadata,

    // Category and description come from MongoDB
    category: categoryOrder.includes(skill?.category)
      ? skill.category
      : "Additional Skills",

    description: skill?.description?.trim() || "Development Technology",
  };
}

// ---------------------------------------------
// SKILL CARD
// ---------------------------------------------

function SkillCard({ skill }) {
  const metadata = getSkillMetadata(skill);
  const Icon = metadata.icon;

  return (
    <div className="group flex min-h-[72px] min-w-0 items-center gap-[14px] rounded-[12px] border border-[#DFE6F1] bg-white px-[15px] py-[12px] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#496CBF]/50 hover:shadow-[0_8px_24px_rgba(73,108,191,0.08)]">
      <div
        className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[11px] ${metadata.iconBg} ${metadata.iconColor}`}
      >
        {metadata.iconText ? (
          <span className="font-body text-[14px] font-bold">
            {metadata.iconText}
          </span>
        ) : (
          <Icon size={19} strokeWidth={1.8} />
        )}
      </div>

      <div className="min-w-0">
        <h3 className="truncate font-heading text-[13px] font-semibold leading-[19px] text-[#182238]">
          {skill?.name || "Unnamed Skill"}
        </h3>

        <p className="mt-[2px] truncate font-mono text-[10px] leading-[15px] text-[#667A9A]">
          {metadata.description}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------
// CATEGORY HEADING
// ---------------------------------------------

function CategoryHeading({ title, className = "" }) {
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <div className="h-[18px] w-[3px] shrink-0 rounded-full bg-[#496CBF]" />

      <h3 className="shrink-0 font-heading text-[15px] font-semibold tracking-[-0.3px] text-[#182238]">
        {title}
      </h3>

      <div className="h-px min-w-0 flex-1 bg-[#DFE6F1]" />
    </div>
  );
}

// ---------------------------------------------
// LOADING SKELETON
// ---------------------------------------------

function SkillLoader() {
  return (
    <div className="mt-[63px] rounded-[12px] border border-[#DFE6F1] bg-white px-[30px] py-[30px]">
      <div className="flex items-center gap-[10px]">
        <div className="h-[16px] w-[3px] rounded-full bg-[#DFE6F1]" />

        <div className="h-[14px] w-[140px] animate-pulse rounded-[4px] bg-[#F1F5F9]" />
      </div>

      <div className="mt-[16px] grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex h-[68px] items-center gap-3 rounded-[12px] border border-[#DFE6F1] bg-[#F8FAFC] px-[19px]"
          >
            <div className="h-[36px] w-[36px] shrink-0 animate-pulse rounded-[11px] bg-[#EEF2FF]" />

            <div className="space-y-[7px]">
              <div className="h-[11px] w-[85px] animate-pulse rounded bg-[#E2E8F0]" />
              <div className="h-[9px] w-[55px] animate-pulse rounded bg-[#F1F5F9]" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[16px] flex items-center gap-[9px] font-mono text-[11px] text-[#8CA0C0]">
        <RefreshCw size={13} className="animate-spin" />
        Fetching skills from /api/skills...
      </div>
    </div>
  );
}

// ---------------------------------------------
// MAIN TECH STACK SECTION
// ---------------------------------------------

export default function TechStackSection() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------------------
  // FETCH SKILLS
  // -------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get("/api/skills");

        // Ensure API returns an array
        setSkills(
          Array.isArray(res.data)
            ? res.data.filter(
                (skill) =>
                  skill &&
                  typeof skill === "object" &&
                  typeof skill.name === "string",
              )
            : [],
        );
      } catch (error) {
        console.error("Error while fetching skills:", error);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // -------------------------------------------
  // GROUP SKILLS DYNAMICALLY
  // -------------------------------------------

  const groupedSkills = categoryOrder.map((category) => ({
    title: category,

    skills: skills.filter(
      (skill) => getSkillMetadata(skill).category === category,
    ),
  }));

  // -------------------------------------------
  // GET INDIVIDUAL GROUPS
  // -------------------------------------------

  const backendSkills = groupedSkills.find(
    (group) => group.title === "Backend Development",
  );

  const frontendSkills = groupedSkills.find(
    (group) => group.title === "Frontend Development",
  );

  const databaseSkills = groupedSkills.find(
    (group) => group.title === "Databases",
  );

  const toolSkills = groupedSkills.find(
    (group) => group.title === "Tools & Infrastructure",
  );

  const additionalSkills = groupedSkills.find(
    (group) => group.title === "Additional Skills",
  );

  // -------------------------------------------
  // RENDER
  // -------------------------------------------

  return (
    <section
      id="tech-stack"
      aria-label="Technical expertise and technology stack"
      className="relative overflow-hidden bg-white py-[90px] max-sm:py-[60px]"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-0">
        {/* HEADER */}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-[55px]">
          <div>
            <div className="flex items-center gap-[10px]">
              <span className="h-[2px] w-[28px] bg-[#496CBF]" />

              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2px] text-[#496CBF]">
                Technical Expertise
              </span>
            </div>

            <h2 className="mt-[24px] font-heading text-[34px] font-bold leading-[1.2] tracking-[-1.2px] text-[#182238] sm:text-[40px] lg:text-[43px]">
              The technologies behind my work.
            </h2>
          </div>

          <div className="pt-0 lg:pt-[1px]">
            <p className="max-w-[455px] font-body text-[15px] font-normal leading-[27px] text-[#667A9A]">
              A modern development stack focused on performance, scalability,
              and clean architecture. Production-ready tools and technologies.
            </p>

            <div className="mt-[16px] inline-flex min-h-[31px] items-center gap-[9px] rounded-[8px] border border-[#C7D2FE] bg-[#EEF2FF] px-[12px] py-[6px]">
              <Zap size={13} className="shrink-0 text-[#496CBF]" />

              <span className="font-mono text-[10px] tracking-[0.1px] text-[#385EB8] sm:text-[11px]">
                Skills fetched live from /api/skills
              </span>
            </div>
          </div>
        </div>

        {/* SKILLS CONTENT */}

        {loading ? (
          <SkillLoader />
        ) : skills.length > 0 ? (
          <div className="mt-[63px] space-y-[45px]">
            {/* BACKEND */}

            {backendSkills.skills.length > 0 && (
              <div>
                <CategoryHeading title="Backend Development" />

                <div className="mt-[20px] grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
                  {backendSkills.skills.map((skill) => (
                    <SkillCard key={skill._id || skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            )}

            {/* FRONTEND */}

            {frontendSkills.skills.length > 0 && (
              <div>
                <CategoryHeading title="Frontend Development" />

                <div className="mt-[20px] grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
                  {frontendSkills.skills.map((skill) => (
                    <SkillCard key={skill._id || skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            )}

            {/* DATABASES AND TOOLS */}

            {(databaseSkills.skills.length > 0 ||
              toolSkills.skills.length > 0) && (
              <div className="grid grid-cols-1 gap-x-[48px] gap-y-[40px] lg:grid-cols-2">
                {/* DATABASES */}

                {databaseSkills.skills.length > 0 && (
                  <div className="min-w-0">
                    <CategoryHeading title="Databases" />

                    <div className="mt-[20px] grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-3">
                      {databaseSkills.skills.map((skill) => (
                        <SkillCard
                          key={skill._id || skill.name}
                          skill={skill}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* TOOLS */}

                {toolSkills.skills.length > 0 && (
                  <div className="min-w-0">
                    <CategoryHeading title="Tools & Infrastructure" />

                    <div className="mt-[20px] grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-3">
                      {toolSkills.skills.map((skill) => (
                        <SkillCard
                          key={skill._id || skill.name}
                          skill={skill}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ADDITIONAL SKILLS */}

            {additionalSkills.skills.length > 0 && (
              <div>
                <CategoryHeading title="Additional Skills" />

                <div className="mt-[20px] grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
                  {additionalSkills.skills.map((skill) => (
                    <SkillCard key={skill._id || skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // EMPTY STATE

          <div className="mt-[63px] rounded-[12px] border border-[#DFE6F1] bg-[#F8FAFC] px-6 py-12 text-center">
            <Code2 size={25} className="mx-auto text-[#496CBF]" />

            <p className="mt-3 font-heading text-[15px] font-semibold text-[#182238]">
              No skills available yet
            </p>

            <p className="mt-1 font-body text-[13px] text-[#667A9A]">
              Technical skills will appear here once added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
