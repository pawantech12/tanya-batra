"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  MessageSquareQuote,
  X,
  AlertTriangle,
  LoaderCircle,
} from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const inputClass =
  "w-full rounded-[8px] border border-[#E1E8F3] bg-white px-[11px] py-[10px] font-['Inter'] text-[13px] font-normal text-[#182238] outline-none transition-all placeholder:text-[#A7B2C2] hover:border-[#C9D5E8] focus:border-[#496CBF] focus:ring-2 focus:ring-[#496CBF]/10";

const labelClass =
  "mb-[7px] block font-['Inter'] text-[12px] font-semibold text-[#344054]";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteTestimonial, setDeleteTestimonial] = useState(null);

  useEffect(() => {
    const loadTestimonialsData = async () => {
      setLoading(true);

      try {
        const res = await axios.get("/api/testimonials");
        setTestimonials(res.data);
      } catch (error) {
        console.log("Error while fetching testimonials: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonialsData();
  }, []);

  const handleAdd = (data) => {
    setTestimonials((prev) => [data, ...prev]);
    setAddOpen(false);
  };

  const handleUpdate = (data) => {
    setTestimonials((prev) =>
      prev.map((item) => (item._id === data._id ? data : item)),
    );

    setEditOpen(false);
    setEditingTestimonial(null);
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);

    try {
      await axios.delete(`/api/testimonials/${id}`);

      setTestimonials((prev) => prev.filter((item) => item._id !== id));
      setDeleteTestimonial(null);
      toast.success("Testimonials Deleted");
    } catch (error) {
      toast.error("Error while deleting testimonial");
    } finally {
      setDeleteLoading(false);
    }
  };

  const openAddModal = () => {
    setAddOpen(true);
  };

  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial);
    setEditOpen(true);
  };

  if (loading) {
    return <TestimonialsSkeleton />;
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
              Testimonials
            </h2>

            <p className="mt-1 font-['Inter'] text-[12px] font-normal text-[#667A9A]">
              Manage client feedback &amp; reviews
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-[39px] items-center justify-center gap-2 self-start rounded-[8px] bg-[#496CBF] px-4 font-['Inter'] text-[12px] font-medium text-white shadow-[0_2px_5px_rgba(73,108,191,0.2)] transition-colors hover:bg-[#3F60AE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/30 sm:self-auto"
          >
            <Plus size={15} strokeWidth={2} />
            Add Testimonial
          </button>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
            {testimonials.map((item) => (
              <article
                key={item._id}
                className="group relative flex min-w-0 flex-col rounded-[11px] border border-[#E1E8F3] bg-white p-4 shadow-[0_2px_8px_rgba(24,34,56,0.025)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#D1DCF5] hover:shadow-[0_6px_18px_rgba(24,34,56,0.06)] sm:p-[17px]"
              >
                <div className="mb-[14px] flex items-center justify-between">
                  <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#E1E8F3] bg-[#EEF2FF] text-[#496CBF]">
                    <MessageSquareQuote size={14} strokeWidth={1.8} />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Edit ${item.name}`}
                      onClick={() => openEditModal(item)}
                      className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#DCE5FA] bg-[#F1F4FF] text-[#496CBF] transition-colors hover:border-[#496CBF] hover:bg-[#496CBF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/20"
                    >
                      <Pencil size={13} strokeWidth={1.8} />
                    </button>

                    <button
                      type="button"
                      aria-label={`Delete ${item.name}`}
                      onClick={() => setDeleteTestimonial(item)}
                      className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#F3D8DE] bg-[#FFF5F6] text-[#D94B62] transition-colors hover:border-[#D94B62] hover:bg-[#D94B62] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94B62]/20"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>

                <p className="mb-[14px] min-h-[75px] whitespace-pre-line break-words font-['Inter'] text-[12px] font-normal leading-[1.55] text-[#66758B]">
                  “{item.content}”
                </p>

                <div className="mt-auto border-t border-[#E8EDF5] pt-3">
                  <div className="flex min-w-0 items-center gap-[9px]">
                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] bg-[#EEF2FF] font-['Inter'] text-[12px] font-semibold uppercase text-[#496CBF]">
                      {item.name?.trim()?.charAt(0) || "C"}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-['Inter'] text-[13px] font-semibold leading-[1.4] text-[#182238]">
                        {item.name}
                      </p>

                      <p className="mt-[2px] truncate font-['Inter'] text-[11px] font-normal text-[#667A9A]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-[44px] w-[44px] items-center justify-center rounded-[10px] border border-[#DCE5FA] bg-[#F0F3FF] text-[#496CBF]">
              <MessageSquareQuote size={20} strokeWidth={1.5} />
            </div>

            <p className="font-['Inter'] text-[13px] font-medium text-[#667A9A]">
              No Testimonials yet
            </p>

            <p className="mt-1 font-['Inter'] text-[11px] text-[#A0A9B6]">
              Add your first testimonial to get started
            </p>
          </div>
        )}
      </section>

      {addOpen && (
        <TestimonialModal
          title="Add Testimonial"
          onClose={() => setAddOpen(false)}
        >
          <TestimonialForm key="add-testimonial" onAdd={handleAdd} />
        </TestimonialModal>
      )}

      {editOpen && editingTestimonial && (
        <TestimonialModal
          title="Edit Testimonial"
          onClose={() => {
            setEditOpen(false);
            setEditingTestimonial(null);
          }}
        >
          <TestimonialForm
            key={editingTestimonial._id}
            testimonial={editingTestimonial}
            onUpdate={handleUpdate}
          />
        </TestimonialModal>
      )}

      {deleteTestimonial && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#182238]/35 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDeleteTestimonial(null);
            }
          }}
        >
          <div className="w-full max-w-[380px] rounded-[13px] border border-[#E1E8F3] bg-white p-5 shadow-[0_15px_50px_rgba(24,34,56,0.16)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] bg-[#FFF1F3] text-[#D94B62]">
                <AlertTriangle size={16} strokeWidth={1.8} />
              </div>

              <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold tracking-[-0.025em] text-[#182238]">
                Delete this testimonial?
              </h3>
            </div>

            <p className="mt-3 font-['Inter'] text-[12px] leading-[1.6] text-[#8994A5]">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2 border-t border-[#E8EDF5] pt-4">
              <button
                type="button"
                onClick={() => setDeleteTestimonial(null)}
                disabled={deleteLoading}
                className="h-[35px] rounded-[7px] border border-[#E1E8F3] bg-white px-4 font-['Inter'] text-[11px] font-medium text-[#66758B] transition-colors hover:bg-[#F8FAFC] disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteLoading}
                onClick={() => handleDelete(deleteTestimonial._id)}
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

function TestimonialModal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-[#182238]/35 px-3 py-5 backdrop-blur-[2px] sm:items-center sm:px-5 sm:py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section className="my-auto w-full max-w-[480px] overflow-hidden rounded-[13px] border border-[#E1E8F3] bg-white shadow-[0_15px_50px_rgba(24,34,56,0.14)]">
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

        <div className="max-h-[calc(100vh-115px)] overflow-y-auto p-4 sm:p-5">
          {children}
        </div>
      </section>
    </div>
  );
}

function TestimonialForm({ testimonial, onAdd, onUpdate }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: testimonial?.name || "",
      role: testimonial?.role || "",
      content: testimonial?.content || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (testimonial?._id) {
        const res = await axios.put(
          `/api/testimonials/${testimonial._id}`,
          data,
        );

        onUpdate?.(res.data);
        toast.success("Testimonial updated");
      } else {
        const res = await axios.post("/api/testimonials", data);

        onAdd?.(res.data);
        toast.success("Testimonial added");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={labelClass}>Client Name</label>

        <input
          type="text"
          placeholder="Enter client name"
          className={inputClass}
          {...register("name", { required: true })}
        />
      </div>

      <div>
        <label className={labelClass}>Role / Profession</label>

        <input
          type="text"
          placeholder="Startup Founder, Business Owner..."
          className={inputClass}
          {...register("role", { required: true })}
        />
      </div>

      <div>
        <label className={labelClass}>Testimonial Message</label>

        <textarea
          placeholder="Write client feedback..."
          rows={4}
          className={`${inputClass} min-h-[115px] resize-y leading-[1.6]`}
          {...register("content", { required: true })}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-[40px] w-full items-center justify-center gap-[7px] rounded-[8px] bg-[#496CBF] px-4 font-['Inter'] text-[12px] font-semibold text-white shadow-[0_2px_5px_rgba(73,108,191,0.18)] transition-colors hover:bg-[#3F60AE] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle size={14} className="animate-spin" />
            {testimonial ? "Updating..." : "Saving..."}
          </>
        ) : testimonial ? (
          "Update Testimonial"
        ) : (
          "Save Testimonial"
        )}
      </button>
    </form>
  );
}

function TestimonialsSkeleton() {
  return (
    <main className="min-h-full w-full bg-[#F8FAFC] px-4 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-8">
      <section className="min-h-[530px] rounded-[14px] border border-[#E1E8F3] bg-white p-4 shadow-[0_2px_9px_rgba(24,34,56,0.035)] sm:p-5 lg:p-6">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[2px] w-5 rounded-full bg-[#E1E8F3]" />

              <div className="h-[10px] w-[85px] animate-pulse rounded bg-[#E8EDF5]" />
            </div>

            <div className="h-[28px] w-[145px] animate-pulse rounded-[5px] bg-[#E8EDF5]" />

            <div className="mt-2 h-[10px] w-[185px] animate-pulse rounded bg-[#EEF1F6]" />
          </div>

          <div className="h-[39px] w-full animate-pulse rounded-[8px] bg-[#E8EDF5] sm:w-[150px]" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex min-h-[207px] flex-col rounded-[11px] border border-[#E1E8F3] bg-white p-4 sm:p-[17px]"
            >
              <div className="mb-[14px] flex items-center justify-between">
                <div className="h-[30px] w-[30px] animate-pulse rounded-[7px] bg-[#EEF2FA]" />

                <div className="flex gap-2">
                  <div className="h-[30px] w-[30px] animate-pulse rounded-[7px] bg-[#EEF2FA]" />

                  <div className="h-[30px] w-[30px] animate-pulse rounded-[7px] bg-[#FFF0F2]" />
                </div>
              </div>

              <div className="mb-[9px] h-[11px] w-full animate-pulse rounded bg-[#EDF1F7]" />

              <div className="mb-[9px] h-[11px] w-[92%] animate-pulse rounded bg-[#EDF1F7]" />

              <div className="mb-[9px] h-[11px] w-[78%] animate-pulse rounded bg-[#EDF1F7]" />

              <div className="mb-[17px] h-[11px] w-[55%] animate-pulse rounded bg-[#EDF1F7]" />

              <div className="mt-auto flex items-center gap-[9px] border-t border-[#E8EDF5] pt-3">
                <div className="h-[34px] w-[34px] animate-pulse rounded-[8px] bg-[#EEF2FA]" />

                <div className="flex-1 space-y-[7px]">
                  <div className="h-[11px] w-[100px] animate-pulse rounded bg-[#E7ECF5]" />

                  <div className="h-[9px] w-[70px] animate-pulse rounded bg-[#EEF1F6]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
