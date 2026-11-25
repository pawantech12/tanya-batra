"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  BriefcaseBusiness,
  CalendarDays,
  Building2,
  LoaderCircle,
  Clock3,
} from "lucide-react";
import { AlertTriangle } from "lucide-react";

const initialForm = {
  title: "",
  company: "",
  period: "",
  description: "",
};

const inputClass =
  "w-full rounded-[8px] border border-[#E1E8F3] bg-white px-[11px] py-[10px] font-['Inter'] text-[12px] font-normal text-[#182238] outline-none transition-all placeholder:text-[#A7B2C2] hover:border-[#C9D5E8] focus:border-[#496CBF] focus:ring-2 focus:ring-[#496CBF]/10";

const labelClass =
  "mb-[7px] block font-['Inter'] text-[12px] font-semibold text-[#344054]";

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteExperience, setDeleteExperience] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const loadExperiencesData = async () => {
      setLoading(true);

      try {
        const res = await axios.get("/api/experiences");
        setExperiences(res.data);
      } catch (error) {
        console.log("Error while fetching experiences: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadExperiencesData();
  }, []);

  const openAddModal = () => {
    setEditingExperience(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (experience) => {
    setEditingExperience(experience);

    setForm({
      title: experience.title || "",
      company: experience.company || "",
      period: experience.period || "",
      description: experience.description || "",
    });

    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (data) => {
    setExperiences((prev) => [data, ...prev]);
  };

  const handleUpdate = (data) => {
    setExperiences((prev) =>
      prev.map((experience) =>
        experience._id === data._id ? data : experience,
      ),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.company.trim() ||
      !form.period.trim() ||
      !form.description.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setSaving(true);

    try {
      if (editingExperience?._id) {
        const res = await axios.put(
          `/api/experiences/${editingExperience._id}`,
          form,
        );

        handleUpdate(res.data);
        toast.success("Experience updated");
      } else {
        const res = await axios.post("/api/experiences", form);

        handleAdd(res.data);
        toast.success("Experience added");
      }

      setModalOpen(false);
      setEditingExperience(null);
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save experience");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);

    try {
      await axios.delete(`/api/experiences/${id}`);

      setExperiences((prev) =>
        prev.filter((experience) => experience._id !== id),
      );

      setDeleteExperience(null);

      toast.success("Experience Deleted");
    } catch (error) {
      toast.error("Failed to delete experience");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <ExperienceSkeleton />;
  }

  return (
    <main className="min-h-full w-full bg-[#F8FAFC] px-4 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-8">
      <section className="min-h-[530px] rounded-[14px] border border-[#E1E8F3] bg-white p-4 shadow-[0_2px_9px_rgba(24,34,56,0.035)] sm:p-5 lg:p-6">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[2px] w-5 rounded-full bg-[#496CBF]" />

              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.04em] text-[#496CBF]">
                Management
              </span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold leading-[1.3] tracking-[-0.04em] text-[#182238] sm:text-[23px]">
              Work Experience
            </h2>

            <p className="mt-1 font-['Inter'] text-[12px] leading-[1.5] text-[#667A9A]">
              Manage your professional journey and career history
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-[39px] items-center justify-center gap-2 self-start rounded-[8px] bg-[#496CBF] px-4 font-['Inter'] text-[12px] font-medium text-white shadow-[0_2px_5px_rgba(73,108,191,0.2)] transition-colors hover:bg-[#3F60AE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/30 sm:self-auto"
          >
            <Plus size={15} strokeWidth={2} />
            Add Experience
          </button>
        </div>

        {experiences.length > 0 ? (
          <div className="relative space-y-5 before:absolute before:bottom-5 before:left-[17px] before:top-5 before:w-px before:bg-[#E1E8F3] sm:space-y-6 sm:before:left-[19px]">
            {experiences.map((experience) => (
              <article
                key={experience._id}
                className="group relative pl-[46px] sm:pl-[54px]"
              >
                <div className="absolute left-[4px] top-[18px] z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full border-[3px] border-white bg-[#496CBF] text-white shadow-[0_0_0_1px_#DCE5FA] sm:left-[5px] sm:h-[30px] sm:w-[30px]">
                  <BriefcaseBusiness size={13} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 rounded-[11px] border border-[#E1E8F3] bg-white p-4 shadow-[0_2px_8px_rgba(24,34,56,0.025)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#D1DCF5] hover:shadow-[0_6px_18px_rgba(24,34,56,0.06)] sm:p-5">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-[#DCE5FA] bg-[#EEF2FF] px-2.5 py-[4px] font-['JetBrains_Mono'] text-[9px] font-medium uppercase tracking-[0.03em] text-[#496CBF]">
                          Experience
                        </span>
                      </div>

                      <h3 className="font-['Plus_Jakarta_Sans'] text-[15px] font-bold leading-[1.4] tracking-[-0.025em] text-[#182238] sm:text-[16px]">
                        {experience.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="inline-flex items-center gap-1.5 font-['Inter'] text-[11px] font-medium text-[#496CBF]">
                          <Building2 size={13} strokeWidth={1.8} />
                          {experience.company}
                        </span>

                        <span className="inline-flex items-center gap-1.5 font-['Inter'] text-[11px] text-[#667A9A]">
                          <CalendarDays size={13} strokeWidth={1.8} />
                          {experience.period}
                        </span>
                      </div>

                      <p className="mt-3 whitespace-pre-line break-words font-['Inter'] text-[12px] leading-[1.8] text-[#667A9A]">
                        {experience.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-start">
                      <button
                        type="button"
                        onClick={() => openEditModal(experience)}
                        aria-label={`Edit ${experience.title}`}
                        className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#DCE5FA] bg-[#F1F4FF] text-[#496CBF] transition-colors hover:border-[#496CBF] hover:bg-[#496CBF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/20"
                      >
                        <Pencil size={13} strokeWidth={1.8} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteExperience(experience)}
                        aria-label={`Delete ${experience.title}`}
                        className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#F3D8DE] bg-[#FFF5F6] text-[#D94B62] transition-colors hover:border-[#D94B62] hover:bg-[#D94B62] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94B62]/20"
                      >
                        <Trash2 size={13} strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-[46px] w-[46px] items-center justify-center rounded-[11px] border border-[#E1E8F3] bg-[#EEF2FF] text-[#496CBF]">
              <BriefcaseBusiness size={21} strokeWidth={1.7} />
            </div>

            <p className="font-['Inter'] text-[13px] font-semibold text-[#182238]">
              No experience added yet
            </p>

            <p className="mt-1 font-['Inter'] text-[11px] text-[#8994A5]">
              Start by adding your first professional experience.
            </p>
          </div>
        )}
      </section>

      {modalOpen && (
        <ExperienceModal
          key={editingExperience?._id || "new-experience"}
          title={editingExperience ? "Edit Experience" : "Add New Experience"}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="experience-title">
                Job Title
              </label>

              <input
                id="experience-title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="experience-company">
                Company
              </label>

              <input
                id="experience-company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Company name"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="experience-period">
                Employment Period
              </label>

              <div className="relative">
                <Clock3
                  size={14}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute left-[11px] top-1/2 -translate-y-1/2 text-[#8994A5]"
                />

                <input
                  id="experience-period"
                  name="period"
                  type="text"
                  value={form.period}
                  onChange={handleChange}
                  placeholder="e.g. Jan 2024 – Present"
                  required
                  className={`${inputClass} pl-[33px]`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="experience-description">
                Description
              </label>

              <textarea
                id="experience-description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your responsibilities and achievements"
                required
                className={`${inputClass} min-h-[105px] resize-y`}
              />
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-[#E8EDF5] pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="h-[38px] rounded-[7px] border border-[#E1E8F3] bg-white px-4 font-['Inter'] text-[11px] font-medium text-[#66758B] transition-colors hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-[38px] items-center justify-center gap-2 rounded-[7px] bg-[#496CBF] px-5 font-['Inter'] text-[11px] font-semibold text-white shadow-[0_2px_5px_rgba(73,108,191,0.18)] transition-colors hover:bg-[#3F60AE] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <LoaderCircle size={14} className="animate-spin" />
                    {editingExperience ? "Updating..." : "Saving..."}
                  </>
                ) : editingExperience ? (
                  "Update Experience"
                ) : (
                  "Save Experience"
                )}
              </button>
            </div>
          </form>
        </ExperienceModal>
      )}

      {deleteExperience && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#182238]/35 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deleteLoading) {
              setDeleteExperience(null);
            }
          }}
        >
          <div className="w-full max-w-[380px] rounded-[13px] border border-[#E1E8F3] bg-white p-5 shadow-[0_15px_50px_rgba(24,34,56,0.16)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] bg-[#FFF1F3] text-[#D94B62]">
                <AlertTriangle size={16} strokeWidth={1.8} />
              </div>

              <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold tracking-[-0.025em] text-[#182238]">
                Delete this experience?
              </h3>
            </div>

            <p className="mt-3 font-['Inter'] text-[12px] leading-[1.6] text-[#8994A5]">
              Are you sure you want to delete "{deleteExperience.title}"? This
              action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2 border-t border-[#E8EDF5] pt-4">
              <button
                type="button"
                onClick={() => setDeleteExperience(null)}
                disabled={deleteLoading}
                className="h-[35px] rounded-[7px] border border-[#E1E8F3] bg-white px-4 font-['Inter'] text-[11px] font-medium text-[#66758B] transition-colors hover:bg-[#F8FAFC] disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteLoading}
                onClick={() => handleDelete(deleteExperience._id)}
                className="inline-flex h-[35px] items-center gap-1.5 rounded-[7px] border border-[#F3D8DE] bg-[#FFF3F5] px-4 font-['Inter'] text-[11px] font-medium text-[#D94B62] transition-colors hover:bg-[#D94B62] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleteLoading ? (
                  <LoaderCircle size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={12} />
                )}

                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ExperienceModal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-[#182238]/35 px-3 py-5 backdrop-blur-[2px] sm:items-center sm:px-5 sm:py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section className="my-auto w-full max-w-lg rounded-[13px] border border-[#E1E8F3] bg-white shadow-[0_15px_50px_rgba(24,34,56,0.14)]">
        <div className="flex items-center justify-between border-b border-[#E8EDF5] px-4 py-4 sm:px-5">
          <div>
            <div className="mb-[5px] flex items-center gap-2">
              <span className="h-[2px] w-4 rounded-full bg-[#496CBF]" />

              <span className="font-['JetBrains_Mono'] text-[10px] font-medium uppercase tracking-[0.04em] text-[#496CBF]">
                Form
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

        <div className="p-4 sm:p-5">{children}</div>
      </section>
    </div>
  );
}

function ExperienceSkeleton() {
  return (
    <main className="min-h-full w-full bg-[#F8FAFC] px-4 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-8">
      <section className="min-h-[530px] rounded-[14px] border border-[#E1E8F3] bg-white p-4 shadow-[0_2px_9px_rgba(24,34,56,0.035)] sm:p-5 lg:p-6">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[2px] w-5 rounded-full bg-[#E1E8F3]" />

              <div className="h-[10px] w-[85px] animate-pulse rounded bg-[#E8EDF5]" />
            </div>

            <div className="h-[28px] w-[190px] animate-pulse rounded-[5px] bg-[#E8EDF5]" />

            <div className="mt-2 h-[11px] w-[235px] animate-pulse rounded bg-[#EDF1F7]" />
          </div>

          <div className="h-[39px] w-full animate-pulse rounded-[8px] bg-[#E8EDF5] sm:w-[145px]" />
        </div>

        <div className="relative space-y-5 before:absolute before:bottom-5 before:left-[17px] before:top-5 before:w-px before:bg-[#E8EDF5] sm:space-y-6 sm:before:left-[19px]">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="relative pl-[46px] sm:pl-[54px]">
              <div className="absolute left-[4px] top-[18px] z-10 h-[28px] w-[28px] animate-pulse rounded-full border-[3px] border-white bg-[#EEF2FA] sm:left-[5px] sm:h-[30px] sm:w-[30px]" />

              <div className="min-h-[155px] rounded-[11px] border border-[#E1E8F3] bg-white p-4 sm:p-5">
                <div className="mb-3 h-[18px] w-[75px] animate-pulse rounded-full bg-[#EEF2FF]" />

                <div className="h-[15px] w-[190px] max-w-full animate-pulse rounded bg-[#E7ECF5]" />

                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="h-[11px] w-[115px] animate-pulse rounded bg-[#EDF1F7]" />

                  <div className="h-[11px] w-[145px] animate-pulse rounded bg-[#EDF1F7]" />
                </div>

                <div className="mt-5 space-y-2">
                  <div className="h-[9px] w-full animate-pulse rounded bg-[#EDF1F7]" />

                  <div className="h-[9px] w-[85%] animate-pulse rounded bg-[#EDF1F7]" />

                  <div className="h-[9px] w-[60%] animate-pulse rounded bg-[#EDF1F7]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
