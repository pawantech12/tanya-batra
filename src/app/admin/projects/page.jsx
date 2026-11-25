"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Folder,
  X,
  Upload,
  AlertTriangle,
  LayoutGrid,
} from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const inputClass =
  "w-full rounded-[8px] border border-[#E1E8F3] bg-white px-[11px] py-[10px] font-['Inter'] text-[13px] font-normal text-[#182238] outline-none transition-all placeholder:text-[#A7B2C2] hover:border-[#C9D5E8] focus:border-[#496CBF] focus:ring-2 focus:ring-[#496CBF]/10";

const labelClass =
  "mb-[7px] block font-['Inter'] text-[12px] font-semibold text-[#344054]";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteProject, setDeleteProject] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);

      try {
        const res = await axios.get("/api/projects");
        setProjects(res.data);
      } catch (error) {
        console.log("Error while fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleImagePreview = (file) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setDeleteProject(null);
      toast.success("Project Deleted");
    } catch (error) {
      toast.error("Error while deleting project");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setAddOpen(false);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === updatedProject._id ? updatedProject : p)),
    );
    setEditOpen(false);
    setEditingProject(null);
    setPreviewImage(null);
  };

  const openAddModal = () => {
    setPreviewImage(null);
    setAddOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setPreviewImage(project.image || null);
    setEditOpen(true);
  };

  if (loading) {
    return <ProjectsSkeleton />;
  }

  return (
    <main className="min-h-full w-full bg-[#F8FAFC] px-4 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-8">
      <section className="rounded-[14px] border border-[#E1E8F3] bg-white p-4 shadow-[0_2px_9px_rgba(24,34,56,0.035)] sm:p-5 lg:p-6">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[2px] w-5 rounded-full bg-[#496CBF]" />
              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.04em] text-[#496CBF]">
                Management
              </span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold leading-[1.3] tracking-[-0.04em] text-[#182238] sm:text-[23px]">
              Projects
            </h2>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-[39px] items-center justify-center gap-2 self-start rounded-[8px] bg-[#496CBF] px-4 font-['Inter'] text-[12px] font-medium text-white shadow-[0_2px_5px_rgba(73,108,191,0.2)] transition-colors hover:bg-[#3F60AE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/30 sm:self-auto"
          >
            <Plus size={15} strokeWidth={2} />
            Add Project
          </button>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
            {projects.map((project) => (
              <article
                key={project._id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-[11px] border border-[#E1E8F3] bg-white transition-all duration-200 hover:-translate-y-[2px] hover:border-[#D1DCF5] hover:shadow-[0_6px_18px_rgba(24,34,56,0.06)]"
              >
                <div className="relative h-[145px] overflow-hidden bg-[#EEF2FF] sm:h-[155px]">
                  {project.image ? (
                    <div className="scroll-on-hover h-full w-full">
                      <div className="scroll-on-hover-inner h-full w-full">
                        <Image
                          src={project.image}
                          alt={project.title || "Project image"}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#DCE4FF] to-[#D7E2F2]">
                      <div className="flex flex-col items-center gap-2 text-[#496CBF]">
                        <span className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-white/80">
                          <LayoutGrid size={19} strokeWidth={1.6} />
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#6078B5]">
                          project.image
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div>
                    <h3 className="line-clamp-1 font-['Plus_Jakarta_Sans'] text-[14px] font-semibold leading-[1.4] tracking-[-0.02em] text-[#182238]">
                      {project.title}
                    </h3>

                    <p className="mt-[6px] line-clamp-3 min-h-[48px] font-['Inter'] text-[12px] font-normal leading-[1.55] text-[#7C8798]">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-3 flex min-h-[20px] items-center gap-4">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-['Inter'] text-[11px] font-medium text-[#496CBF] transition-colors hover:text-[#304F9A]"
                      >
                        <Github size={12} strokeWidth={1.8} />
                        Source
                      </Link>
                    )}

                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-['Inter'] text-[11px] font-medium text-[#66758B] transition-colors hover:text-[#496CBF]"
                      >
                        <ExternalLink size={12} strokeWidth={1.8} />
                        Live
                      </Link>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-end gap-2 border-t border-[#E8EDF5] pt-3">
                    <button
                      type="button"
                      onClick={() => openEditModal(project)}
                      aria-label={`Edit ${project.title}`}
                      className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#DCE5FA] bg-[#F1F4FF] text-[#496CBF] transition-colors hover:border-[#496CBF] hover:bg-[#496CBF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/20"
                    >
                      <Pencil size={13} strokeWidth={1.8} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteProject(project)}
                      aria-label={`Delete ${project.title}`}
                      className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#F3D8DE] bg-[#FFF5F6] text-[#D94B62] transition-colors hover:border-[#D94B62] hover:bg-[#D94B62] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94B62]/20"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-[44px] w-[44px] items-center justify-center rounded-[10px] border border-[#DCE5FA] bg-[#F0F3FF] text-[#496CBF]">
              <Folder size={20} strokeWidth={1.5} />
            </div>

            <p className="font-['Inter'] text-[13px] font-medium text-[#667A9A]">
              No Projects Posted yet
            </p>

            <p className="mt-1 font-['Inter'] text-[11px] text-[#A0A9B6]">
              Add your first project to get started
            </p>
          </div>
        )}
      </section>

      {addOpen && (
        <ProjectModal
          title="Add New Project"
          onClose={() => {
            setAddOpen(false);
            setPreviewImage(null);
          }}
        >
          <ProjectForm
            key="add-project"
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            onFileSelect={handleImagePreview}
            onAdd={handleAddProject}
          />
        </ProjectModal>
      )}

      {editOpen && editingProject && (
        <ProjectModal
          title="Edit Project"
          onClose={() => {
            setEditOpen(false);
            setEditingProject(null);
            setPreviewImage(null);
          }}
        >
          <ProjectForm
            key={editingProject._id}
            project={editingProject}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            onFileSelect={handleImagePreview}
            onUpdate={handleUpdateProject}
          />
        </ProjectModal>
      )}

      {deleteProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#182238]/35 px-4 py-6 backdrop-blur-[2px]">
          <div className="w-full max-w-[380px] rounded-[13px] border border-[#E1E8F3] bg-white p-5 shadow-[0_15px_50px_rgba(24,34,56,0.16)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-[#FFF1F3] text-[#D94B62]">
                <AlertTriangle size={16} strokeWidth={1.8} />
              </div>

              <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold tracking-[-0.025em] text-[#182238]">
                Delete this project?
              </h3>
            </div>

            <p className="mt-3 font-['Inter'] text-[12px] leading-[1.6] text-[#8994A5]">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteProject(null)}
                className="h-[35px] rounded-[7px] border border-[#E1E8F3] bg-white px-4 font-['Inter'] text-[11px] font-medium text-[#66758B] transition-colors hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteLoading}
                onClick={() => handleDelete(deleteProject._id)}
                className="inline-flex h-[35px] items-center gap-1.5 rounded-[7px] border border-[#F3D8DE] bg-[#FFF3F5] px-4 font-['Inter'] text-[11px] font-medium text-[#D94B62] transition-colors hover:bg-[#D94B62] hover:text-white"
              >
                {deleteLoading ? (
                  <Loader2 size={16} />
                ) : (
                  <>
                    <Trash2 size={12} />
                    Delete{" "}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ProjectsSkeleton() {
  return (
    <main className="min-h-full w-full bg-[#F8FAFC] px-4 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-8">
      <section className="rounded-[14px] border border-[#E1E8F3] bg-white p-4 shadow-[0_2px_9px_rgba(24,34,56,0.035)] sm:p-5 lg:p-6">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[2px] w-5 rounded-full bg-[#E1E8F3]" />
              <div className="h-[10px] w-[85px] animate-pulse rounded bg-[#E8EDF5]" />
            </div>
            <div className="h-[28px] w-[130px] animate-pulse rounded-[5px] bg-[#E8EDF5]" />
          </div>

          <div className="h-[39px] w-[125px] animate-pulse rounded-[8px] bg-[#E8EDF5]" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[11px] border border-[#E1E8F3] bg-white"
            >
              <div className="h-[145px] animate-pulse bg-[#E8EDF5] sm:h-[155px]" />

              <div className="space-y-3 p-4">
                <div className="h-[14px] w-3/4 animate-pulse rounded bg-[#E8EDF5]" />
                <div className="space-y-2">
                  <div className="h-[10px] w-full animate-pulse rounded bg-[#EEF1F6]" />
                  <div className="h-[10px] w-[90%] animate-pulse rounded bg-[#EEF1F6]" />
                  <div className="h-[10px] w-[65%] animate-pulse rounded bg-[#EEF1F6]" />
                </div>

                <div className="flex gap-4 pt-1">
                  <div className="h-[11px] w-[48px] animate-pulse rounded bg-[#EEF1F6]" />
                  <div className="h-[11px] w-[35px] animate-pulse rounded bg-[#EEF1F6]" />
                </div>

                <div className="flex justify-end gap-2 border-t border-[#E8EDF5] pt-3">
                  <div className="h-[30px] w-[30px] animate-pulse rounded-[7px] bg-[#EEF1F6]" />
                  <div className="h-[30px] w-[30px] animate-pulse rounded-[7px] bg-[#EEF1F6]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProjectModal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-[#182238]/35 px-3 py-5 backdrop-blur-[2px] sm:items-center sm:px-5 sm:py-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section className="my-auto w-full max-w-[1000px] overflow-hidden rounded-[13px] border border-[#E1E8F3] bg-white shadow-[0_15px_50px_rgba(24,34,56,0.14)]">
        <div className="flex items-center justify-between border-b border-[#E8EDF5] px-4 py-4 sm:px-5">
          <div>
            <div className="mb-[5px] flex items-center gap-2">
              <span className="h-[2px] w-4 rounded-full bg-[#496CBF]" />
              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.04em] text-[#496CBF]">
                Project Form
              </span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans'] text-[19px] font-bold leading-[1.3] tracking-[-0.04em] text-[#182238]">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-[#E1E8F3] bg-white text-[#8994A5] transition-colors hover:border-[#C7D5FF] hover:bg-[#EEF2FF] hover:text-[#496CBF]"
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-115px)] overflow-y-auto p-4 sm:p-5 lg:p-6">
          {children}
        </div>
      </section>
    </div>
  );
}

function ProjectForm({
  project,
  previewImage,
  setPreviewImage,
  onFileSelect,
  onAdd,
  onUpdate,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      github: project?.github || "",
      demo: project?.demo || "",
      category: project?.category || "",
      designedBy: project?.designedBy || "",
      projectDate: project?.projectDate
        ? project.projectDate.split("T")[0]
        : "",
      keywords: project?.keywords?.join(", ") || "",
    },
  });

  const imageField = register("image");

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("github", data.github || "");
    formData.append("demo", data.demo || "");
    formData.append("category", data.category || "");
    formData.append("designedBy", data.designedBy || "");
    formData.append("projectDate", data.projectDate || "");
    formData.append("keywords", data.keywords || "");

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      if (project?._id) {
        const res = await axios.put(`/api/projects/${project._id}`, formData);
        onUpdate?.(res.data);
        toast.success("Project Updated");
      } else {
        const res = await axios.post("/api/projects", formData);
        onAdd?.(res.data);
        toast.success("Project Added");
        setPreviewImage(null);
        reset();
      }
    } catch (error) {
      console.error("Project save failed", error);
      toast.error("Error while add/edit project");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.9fr] lg:gap-8"
    >
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Project Title</label>
          <input
            placeholder="Enter project title"
            className={inputClass}
            {...register("title")}
          />
        </div>

        <div>
          <label className={labelClass}>Project Description</label>
          <textarea
            placeholder="Briefly describe the project"
            className={`${inputClass} min-h-[115px] resize-y leading-[1.6]`}
            {...register("description")}
          />
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <input
            placeholder="e.g. Web App, SaaS, E-commerce"
            className={inputClass}
            {...register("category")}
          />
        </div>

        <div>
          <label className={labelClass}>Designed & Developed By</label>
          <input
            placeholder="Your name or Team name"
            className={inputClass}
            {...register("designedBy")}
          />
        </div>

        <div>
          <label className={labelClass}>Project Date</label>
          <input
            type="text"
            placeholder="Project Date"
            className={inputClass}
            {...register("projectDate", { required: true })}
          />
        </div>

        <div>
          <label className={labelClass}>Keywords</label>
          <input
            placeholder="react, nextjs, mongodb (comma separated)"
            className={inputClass}
            {...register("keywords")}
          />
        </div>

        <div>
          <label className={labelClass}>GitHub Repository URL</label>
          <input
            placeholder="https://github.com/username/project"
            className={inputClass}
            {...register("github")}
          />
        </div>

        <div>
          <label className={labelClass}>Live Demo URL</label>
          <input
            placeholder="https://yourproject.com"
            className={inputClass}
            {...register("demo")}
          />
        </div>

        <div>
          <label className={labelClass}>Project Image</label>

          <label className="flex min-h-[40px] cursor-pointer items-center gap-2 rounded-[8px] border border-[#E1E8F3] bg-[#FAFBFD] px-3 py-2 font-['Inter'] text-[12px] text-[#8994A5] transition-colors hover:border-[#C7D5FF] hover:bg-[#F5F7FC]">
            <Upload size={14} strokeWidth={1.7} />

            <span>
              {project
                ? "Choose new image to replace..."
                : "Choose image file..."}
            </span>

            <input
              type="file"
              accept="image/*"
              className="sr-only"
              name={imageField.name}
              ref={imageField.ref}
              onBlur={imageField.onBlur}
              onChange={(e) => {
                imageField.onChange(e);
                onFileSelect(e.target.files?.[0]);
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-[40px] w-full items-center justify-center rounded-[8px] bg-[#496CBF] px-4 font-['Inter'] text-[12px] font-semibold text-white shadow-[0_2px_5px_rgba(73,108,191,0.18)] transition-colors hover:bg-[#3F60AE] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? project
              ? "Updating..."
              : "Adding..."
            : project
              ? "Update Project"
              : "Save Project"}
        </button>
      </div>

      <div className="space-y-3">
        <p className={labelClass}>Image Preview</p>

        <div className="relative h-[210px] overflow-hidden rounded-[9px] border border-[#DCE5F5] bg-[#F8FAFC] sm:h-[250px] lg:h-[280px]">
          {previewImage ? (
            <>
              <div className="scroll-on-hover h-full w-full">
                <div className="scroll-on-hover-inner h-full w-full">
                  <Image
                    src={previewImage}
                    alt="Project preview"
                    width={800}
                    height={600}
                    unoptimized={previewImage.startsWith("blob:")}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 to-transparent px-3 pb-3 pt-8">
                <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-white/90 px-2 py-1 font-['Inter'] text-[10px] font-medium text-[#496CBF]">
                  <ImageIcon size={11} />
                  Image selected
                </span>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[9px] border-2 border-dashed border-[#DCE5F5] bg-gradient-to-br from-[#FAFBFE] to-[#F0F3FF] px-5 text-center">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[11px] border border-[#DCE5FA] bg-white text-[#496CBF] shadow-[0_2px_8px_rgba(24,34,56,0.04)]">
                <ImageIcon size={21} strokeWidth={1.6} />
              </div>

              <div>
                <p className="font-['Inter'] text-[13px] font-medium text-[#667085]">
                  No image selected
                </p>

                <p className="mt-1 font-['Inter'] text-[11px] leading-[1.5] text-[#A0A9B6]">
                  Upload an image to see preview here
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[10px] text-[#A0A9B6]">
          <ImageIcon size={11} strokeWidth={1.5} />
          Image preview scrolls on hover
        </p>
      </div>
    </form>
  );
}
