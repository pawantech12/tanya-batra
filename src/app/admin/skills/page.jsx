"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  LoaderCircle,
  Code2,
  FolderOpen,
} from "lucide-react";

const categories = [
  "Backend Development",
  "Frontend Development",
  "Databases",
  "Tools & Infrastructure",
  "Additional Skills",
];

const initialForm = {
  name: "",
  category: "Backend Development",
  description: "",
};

const inputClass =
  "w-full rounded-[8px] border border-[#E1E8F3] bg-white px-[11px] py-[10px] font-['Inter'] text-[12px] font-normal text-[#182238] outline-none transition-all placeholder:text-[#A7B2C2] hover:border-[#C9D5E8] focus:border-[#496CBF] focus:ring-2 focus:ring-[#496CBF]/10";

const labelClass =
  "mb-[7px] block font-['Inter'] text-[12px] font-semibold text-[#344054]";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteSkill, setDeleteSkill] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [form, setForm] = useState(initialForm);

  const loadSkills = async () => {
    setLoading(true);

    try {
      const res = await axios.get("/api/skills");
      setSkills(res.data);
    } catch (error) {
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const openAddModal = () => {
    setEditingSkill(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);

    setForm({
      name: skill.name || "",
      category: skill.category || "Additional Skills",
      description: skill.description || "Development Technology",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSaving(true);

    try {
      if (editingSkill) {
        const res = await axios.put(`/api/skills/${editingSkill._id}`, form);

        setSkills((prev) =>
          prev.map((skill) =>
            skill._id === editingSkill._id ? res.data : skill,
          ),
        );

        toast.success("Skill updated successfully");
      } else {
        const res = await axios.post("/api/skills", form);

        setSkills((prev) => [res.data, ...prev]);

        toast.success("Skill added successfully");
      }

      setModalOpen(false);
      setEditingSkill(null);
      setForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save skill");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);

    try {
      await axios.delete(`/api/skills/${id}`);

      setSkills((prev) => prev.filter((skill) => skill._id !== id));
      setDeleteSkill(null);

      toast.success("Skill deleted successfully");
    } catch (error) {
      toast.error("Failed to delete skill");
    } finally {
      setDeleteLoading(false);
    }
  };

  const groupedSkills = categories.map((category) => ({
    category,
    skills: skills.filter(
      (skill) => (skill.category || "Additional Skills") === category,
    ),
  }));

  if (loading) {
    return <SkillsSkeleton />;
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
              Skills
            </h2>

            <p className="mt-1 font-['Inter'] text-[12px] leading-[1.5] text-[#667A9A]">
              Manage your technical skill set and categories
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-[39px] items-center justify-center gap-2 self-start rounded-[8px] bg-[#496CBF] px-4 font-['Inter'] text-[12px] font-medium text-white shadow-[0_2px_5px_rgba(73,108,191,0.2)] transition-colors hover:bg-[#3F60AE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/30 sm:self-auto"
          >
            <Plus size={15} strokeWidth={2} />
            Add Skill
          </button>
        </div>

        {skills.length > 0 ? (
          <div className="space-y-7">
            {groupedSkills.map(
              ({ category, skills: categorySkills }) =>
                categorySkills.length > 0 && (
                  <div key={category}>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <div className="flex h-[29px] w-[29px] items-center justify-center rounded-[7px] border border-[#E1E8F3] bg-[#EEF2FF] text-[#496CBF]">
                        <FolderOpen size={14} strokeWidth={1.8} />
                      </div>

                      <h3 className="font-['Plus_Jakarta_Sans'] text-[14px] font-bold tracking-[-0.02em] text-[#182238]">
                        {category}
                      </h3>

                      <span className="rounded-full border border-[#DCE5FA] bg-[#EEF2FF] px-2 py-[3px] font-['Inter'] text-[10px] font-semibold tabular-nums text-[#496CBF]">
                        {categorySkills.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 sm:gap-4">
                      {categorySkills.map((skill) => (
                        <article
                          key={skill._id}
                          className="group flex min-w-0 items-center justify-between gap-3 rounded-[11px] border border-[#E1E8F3] bg-white p-3.5 shadow-[0_2px_8px_rgba(24,34,56,0.025)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#D1DCF5] hover:shadow-[0_6px_18px_rgba(24,34,56,0.06)] sm:p-4"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[9px] border border-[#E1E8F3] bg-[#EEF2FF] text-[#496CBF]">
                              <Code2 size={18} strokeWidth={1.8} />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-['Inter'] text-[12px] font-semibold leading-[1.45] text-[#182238]">
                                {skill.name}
                              </p>

                              <p className="mt-1 truncate font-['Inter'] text-[11px] font-normal text-[#667A9A]">
                                {skill.description || "Development Technology"}
                              </p>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditModal(skill)}
                              aria-label={`Edit ${skill.name}`}
                              className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#DCE5FA] bg-[#F1F4FF] text-[#496CBF] transition-colors hover:border-[#496CBF] hover:bg-[#496CBF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/20"
                            >
                              <Pencil size={13} strokeWidth={1.8} />
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeleteSkill(skill)}
                              aria-label={`Delete ${skill.name}`}
                              className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#F3D8DE] bg-[#FFF5F6] text-[#D94B62] transition-colors hover:border-[#D94B62] hover:bg-[#D94B62] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94B62]/20"
                            >
                              <Trash2 size={13} strokeWidth={1.8} />
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-[46px] w-[46px] items-center justify-center rounded-[11px] border border-[#E1E8F3] bg-[#EEF2FF] text-[#496CBF]">
              <Code2 size={21} strokeWidth={1.7} />
            </div>

            <p className="font-['Inter'] text-[13px] font-semibold text-[#182238]">
              No skills added yet
            </p>

            <p className="mt-1 font-['Inter'] text-[11px] text-[#8994A5]">
              Start by adding your first technical skill.
            </p>
          </div>
        )}
      </section>

      {modalOpen && (
        <SkillModal
          title={editingSkill ? "Edit Skill" : "Add New Skill"}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="skill-name">
                Skill Name
              </label>

              <input
                id="skill-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Laravel, React, MongoDB"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="skill-category">
                Skill Category
              </label>

              <select
                id="skill-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className={`${inputClass} h-[40px] appearance-none bg-white`}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="skill-description">
                Skill Description
              </label>

              <input
                id="skill-description"
                name="description"
                type="text"
                value={form.description}
                onChange={handleChange}
                placeholder="e.g. Progressive Framework"
                required
                className={inputClass}
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
                    Saving...
                  </>
                ) : editingSkill ? (
                  "Update Skill"
                ) : (
                  "Save Skill"
                )}
              </button>
            </div>
          </form>
        </SkillModal>
      )}

      {deleteSkill && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#182238]/35 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deleteLoading) {
              setDeleteSkill(null);
            }
          }}
        >
          <div className="w-full max-w-[380px] rounded-[13px] border border-[#E1E8F3] bg-white p-5 shadow-[0_15px_50px_rgba(24,34,56,0.16)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] bg-[#FFF1F3] text-[#D94B62]">
                <AlertTriangle size={16} strokeWidth={1.8} />
              </div>

              <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold tracking-[-0.025em] text-[#182238]">
                Delete this skill?
              </h3>
            </div>

            <p className="mt-3 font-['Inter'] text-[12px] leading-[1.6] text-[#8994A5]">
              Are you sure you want to delete "{deleteSkill.name}"? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2 border-t border-[#E8EDF5] pt-4">
              <button
                type="button"
                onClick={() => setDeleteSkill(null)}
                disabled={deleteLoading}
                className="h-[35px] rounded-[7px] border border-[#E1E8F3] bg-white px-4 font-['Inter'] text-[11px] font-medium text-[#66758B] transition-colors hover:bg-[#F8FAFC] disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteLoading}
                onClick={() => handleDelete(deleteSkill._id)}
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

function SkillModal({ title, onClose, children }) {
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

function SkillsSkeleton() {
  return (
    <main className="min-h-full w-full bg-[#F8FAFC] px-4 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-8">
      <section className="min-h-[530px] rounded-[14px] border border-[#E1E8F3] bg-white p-4 shadow-[0_2px_9px_rgba(24,34,56,0.035)] sm:p-5 lg:p-6">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[2px] w-5 rounded-full bg-[#E1E8F3]" />

              <div className="h-[10px] w-[85px] animate-pulse rounded bg-[#E8EDF5]" />
            </div>

            <div className="h-[28px] w-[95px] animate-pulse rounded-[5px] bg-[#E8EDF5]" />

            <div className="mt-2 h-[11px] w-[225px] animate-pulse rounded bg-[#EDF1F7]" />
          </div>

          <div className="h-[39px] w-full animate-pulse rounded-[8px] bg-[#E8EDF5] sm:w-[115px]" />
        </div>

        <div className="space-y-7">
          {categories.slice(0, 3).map((category, categoryIndex) => (
            <div key={category}>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-[29px] w-[29px] animate-pulse rounded-[7px] bg-[#EEF2FA]" />

                <div className="h-[13px] w-[145px] animate-pulse rounded bg-[#E7ECF5]" />

                <div className="h-[19px] w-[24px] animate-pulse rounded-full bg-[#EEF2FF]" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 sm:gap-4">
                {Array.from({ length: categoryIndex === 0 ? 3 : 2 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="flex min-h-[76px] items-center justify-between gap-3 rounded-[11px] border border-[#E1E8F3] bg-white p-3.5 sm:p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="h-[38px] w-[38px] shrink-0 animate-pulse rounded-[9px] bg-[#EEF2FA]" />

                        <div className="min-w-0 flex-1">
                          <div className="mb-2 h-[11px] w-[100px] animate-pulse rounded bg-[#E7ECF5]" />

                          <div className="h-[9px] w-[135px] max-w-full animate-pulse rounded bg-[#EDF1F7]" />
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-1.5">
                        <div className="h-[30px] w-[30px] animate-pulse rounded-[7px] bg-[#EEF2FA]" />

                        <div className="h-[30px] w-[30px] animate-pulse rounded-[7px] bg-[#FFF0F2]" />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
