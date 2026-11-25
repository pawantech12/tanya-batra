"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  LoaderCircle,
  Code,
  Server,
  Laptop,
  Shield,
  Settings,
  Zap,
  Briefcase,
  ShoppingCart,
  Upload,
  Globe,
  Layers,
  Database,
  Cloud,
  Monitor,
  Cpu,
  Lock,
  Rocket,
  Workflow,
  Wrench,
  Smartphone,
  Palette,
  BarChart3,
  Users,
  ChevronDown,
  Check,
} from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const icons = {
  Code,
  Server,
  Laptop,
  Database,
  Cloud,
  Cpu,
  Monitor,
  Shield,
  Lock,
  Settings,
  Workflow,
  Wrench,
  Zap,
  Rocket,
  BarChart3,
  Briefcase,
  Layers,
  Users,
  ShoppingCart,
  Smartphone,
  Palette,
  Upload,
  Globe,
};

const inputClass =
  "w-full rounded-[8px] border border-[#E1E8F3] bg-white px-[11px] py-[10px] font-['Inter'] text-[12px] font-normal text-[#182238] outline-none transition-all placeholder:text-[#A7B2C2] hover:border-[#C9D5E8] focus:border-[#496CBF] focus:ring-2 focus:ring-[#496CBF]/10";

const labelClass =
  "mb-[7px] block font-['Inter'] text-[12px] font-semibold text-[#344054]";

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteService, setDeleteService] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const loadServiceData = async () => {
      setLoading(true);

      try {
        const res = await axios.get("/api/services");
        setServices(res.data);
      } catch (error) {
        console.log("Error while fetching services: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadServiceData();
  }, []);

  const handleAdd = (data) => {
    setServices((prev) => [data, ...prev]);
    setAddOpen(false);
  };

  const handleUpdate = (data) => {
    setServices((prev) =>
      prev.map((service) => (service._id === data._id ? data : service)),
    );

    setEditOpen(false);
    setEditingService(null);
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);

    try {
      await axios.delete(`/api/services/${id}`);

      setServices((prev) => prev.filter((service) => service._id !== id));
      setDeleteService(null);
      toast.success("Services Deleted");
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const openAddModal = () => {
    setAddOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setEditOpen(true);
  };

  if (loading) {
    return <ServicesSkeleton />;
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
              Services
            </h2>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-[39px] items-center justify-center gap-2 self-start rounded-[8px] bg-[#496CBF] px-4 font-['Inter'] text-[12px] font-medium text-white shadow-[0_2px_5px_rgba(73,108,191,0.2)] transition-colors hover:bg-[#3F60AE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/30 sm:self-auto"
          >
            <Plus size={15} strokeWidth={2} />
            Add Service
          </button>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
            {services.map((service) => {
              const Icon = icons[service.icon];

              return (
                <article
                  key={service._id}
                  className="group flex min-w-0 flex-col rounded-[11px] border border-[#E1E8F3] bg-white p-4 shadow-[0_2px_8px_rgba(24,34,56,0.025)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#D1DCF5] hover:shadow-[0_6px_18px_rgba(24,34,56,0.06)] sm:p-[17px]"
                >
                  <div className="mb-[14px] flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[9px] border border-[#E1E8F3] bg-[#EEF2FF] text-[#496CBF]">
                        {Icon && <Icon size={18} strokeWidth={1.8} />}
                      </div>

                      <h3 className="min-w-0 break-words font-['Inter'] text-[13px] font-semibold leading-[1.45] text-[#182238]">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mb-5 line-clamp-3 min-h-[54px] whitespace-pre-line break-words font-['Inter'] text-[12px] font-normal leading-[1.55] text-[#667A9A]">
                    {service.description}
                  </p>

                  <div className="mt-auto flex justify-end gap-2 border-t border-[#E8EDF5] pt-3">
                    <button
                      type="button"
                      aria-label={`Edit ${service.title}`}
                      onClick={() => openEditModal(service)}
                      className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#DCE5FA] bg-[#F1F4FF] text-[#496CBF] transition-colors hover:border-[#496CBF] hover:bg-[#496CBF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496CBF]/20"
                    >
                      <Pencil size={13} strokeWidth={1.8} />
                    </button>

                    <button
                      type="button"
                      aria-label={`Delete ${service.title}`}
                      onClick={() => setDeleteService(service)}
                      className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#F3D8DE] bg-[#FFF5F6] text-[#D94B62] transition-colors hover:border-[#D94B62] hover:bg-[#D94B62] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94B62]/20"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center py-12 text-center">
            <p className="font-['Inter'] text-[13px] font-medium text-[#667A9A]">
              No Services Posted yet
            </p>
          </div>
        )}
      </section>

      {addOpen && (
        <ServiceModal title="Add Service" onClose={() => setAddOpen(false)}>
          <ServiceForm key="add-service" onAdd={handleAdd} />
        </ServiceModal>
      )}

      {editOpen && editingService && (
        <ServiceModal
          title="Edit Service"
          onClose={() => {
            setEditOpen(false);
            setEditingService(null);
          }}
        >
          <ServiceForm
            key={editingService._id}
            service={editingService}
            onUpdate={handleUpdate}
          />
        </ServiceModal>
      )}

      {deleteService && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#182238]/35 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deleteLoading) {
              setDeleteService(null);
            }
          }}
        >
          <div className="w-full max-w-[380px] rounded-[13px] border border-[#E1E8F3] bg-white p-5 shadow-[0_15px_50px_rgba(24,34,56,0.16)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] bg-[#FFF1F3] text-[#D94B62]">
                <AlertTriangle size={16} strokeWidth={1.8} />
              </div>

              <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold tracking-[-0.025em] text-[#182238]">
                Delete this service?
              </h3>
            </div>

            <p className="mt-3 font-['Inter'] text-[12px] leading-[1.6] text-[#8994A5]">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2 border-t border-[#E8EDF5] pt-4">
              <button
                type="button"
                onClick={() => setDeleteService(null)}
                disabled={deleteLoading}
                className="h-[35px] rounded-[7px] border border-[#E1E8F3] bg-white px-4 font-['Inter'] text-[11px] font-medium text-[#66758B] transition-colors hover:bg-[#F8FAFC] disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteLoading}
                onClick={() => handleDelete(deleteService._id)}
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

function ServiceModal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-[#182238]/35 px-3 py-5 backdrop-blur-[2px] sm:items-center sm:px-5 sm:py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section className="my-auto w-full max-w-3xl rounded-[13px] border border-[#E1E8F3] bg-white shadow-[0_15px_50px_rgba(24,34,56,0.14)]">
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

function ServiceForm({ service, onAdd, onUpdate }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: service?.title || "",
      description: service?.description || "",
      icon: service?.icon || "",
    },
  });

  const selectedIcon = watch("icon");

  const onSubmit = async (data) => {
    try {
      if (service?._id) {
        const res = await axios.put(`/api/services/${service._id}`, data);

        onUpdate?.(res.data);
        toast.success("Service updated");
      } else {
        const res = await axios.post("/api/services", data);

        onAdd?.(res.data);
        toast.success("Service added");
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save service");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={labelClass} htmlFor="service-title">
          Service Title
        </label>

        <input
          id="service-title"
          type="text"
          placeholder="e.g. Front-End Development"
          className={inputClass}
          {...register("title", { required: true })}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="service-description">
          Description
        </label>

        <textarea
          id="service-description"
          placeholder="Briefly describe this service..."
          rows={5}
          className={`${inputClass} min-h-[115px] resize-y leading-[1.6]`}
          {...register("description", { required: true })}
        />
      </div>

      <div>
        <label className={labelClass}>Icon</label>

        <IconSelector
          value={selectedIcon}
          onChange={(value) =>
            setValue("icon", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />

        <input type="hidden" {...register("icon")} />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-[44px] w-full items-center justify-center gap-[7px] rounded-[8px] bg-[#496CBF] px-4 font-['Inter'] text-[12px] font-semibold text-white shadow-[0_2px_5px_rgba(73,108,191,0.18)] transition-colors hover:bg-[#3F60AE] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle size={14} className="animate-spin" />
              {service ? "Updating..." : "Saving..."}
            </>
          ) : service ? (
            "Update Service"
          ) : (
            "Save Service"
          )}
        </button>
      </div>
    </form>
  );
}

function IconSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const SelectedIcon = icons[value];

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();

      const spaceBelow = window.innerHeight - rect.bottom - 12;
      const spaceAbove = rect.top - 12;

      const openUpward = spaceBelow < 220 && spaceAbove > spaceBelow;

      const availableHeight = Math.max(
        100,
        openUpward ? spaceAbove : spaceBelow,
      );

      setPosition({
        top: openUpward
          ? Math.max(8, rect.top - Math.min(220, availableHeight) - 6)
          : rect.bottom + 6,
        left: rect.left,
        width: rect.width,
        maxHeight: Math.min(220, availableHeight),
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event) => {
      if (
        !buttonRef.current?.contains(event.target) &&
        !dropdownRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[40px] w-full items-center justify-between rounded-[8px] border border-[#E1E8F3] bg-white px-[11px] font-['Inter'] text-[12px] text-[#182238] outline-none transition-all hover:border-[#C9D5E8] focus:border-[#496CBF] focus:ring-2 focus:ring-[#496CBF]/10"
      >
        {value && SelectedIcon ? (
          <span className="flex items-center gap-2">
            <SelectedIcon
              size={16}
              strokeWidth={1.8}
              className="text-[#496CBF]"
            />
            <span>{value}</span>
          </span>
        ) : (
          <span className="text-[#A7B2C2]">Choose an icon</span>
        )}

        <ChevronDown
          size={15}
          className={`text-[#8994A5] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open &&
        position &&
        createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            aria-label="Choose an icon"
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: position.width,
              maxHeight: position.maxHeight,
            }}
            className="z-[9999] overflow-y-auto rounded-[9px] border border-[#E1E8F3] bg-white p-1.5 shadow-[0_8px_24px_rgba(24,34,56,0.16)]"
          >
            {Object.keys(icons).map((iconName) => {
              const Icon = icons[iconName];
              const isSelected = value === iconName;

              return (
                <button
                  key={iconName}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(iconName);
                    setOpen(false);
                  }}
                  className={`flex min-h-[35px] w-full items-center justify-between rounded-[6px] px-2.5 font-['Inter'] text-[12px] transition-colors ${
                    isSelected
                      ? "bg-[#EEF2FF] font-medium text-[#496CBF]"
                      : "text-[#344054] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon
                      size={15}
                      strokeWidth={1.8}
                      className={
                        isSelected ? "text-[#496CBF]" : "text-[#667A9A]"
                      }
                    />
                    {iconName}
                  </span>

                  {isSelected && <Check size={14} className="text-[#496CBF]" />}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}

function ServicesSkeleton() {
  return (
    <main className="min-h-full w-full bg-[#F8FAFC] px-4 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-8">
      <section className="min-h-[530px] rounded-[14px] border border-[#E1E8F3] bg-white p-4 shadow-[0_2px_9px_rgba(24,34,56,0.035)] sm:p-5 lg:p-6">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[2px] w-5 rounded-full bg-[#E1E8F3]" />

              <div className="h-[10px] w-[85px] animate-pulse rounded bg-[#E8EDF5]" />
            </div>

            <div className="h-[28px] w-[115px] animate-pulse rounded-[5px] bg-[#E8EDF5]" />
          </div>

          <div className="h-[39px] w-full animate-pulse rounded-[8px] bg-[#E8EDF5] sm:w-[130px]" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex min-h-[180px] flex-col rounded-[11px] border border-[#E1E8F3] bg-white p-4 sm:p-[17px]"
            >
              <div className="mb-[14px] flex items-center gap-3">
                <div className="h-[38px] w-[38px] shrink-0 animate-pulse rounded-[9px] bg-[#EEF2FA]" />

                <div className="h-[12px] w-[55%] animate-pulse rounded bg-[#E7ECF5]" />
              </div>

              <div className="mb-[9px] h-[11px] w-full animate-pulse rounded bg-[#EDF1F7]" />

              <div className="mb-[9px] h-[11px] w-[92%] animate-pulse rounded bg-[#EDF1F7]" />

              <div className="mb-5 h-[11px] w-[72%] animate-pulse rounded bg-[#EDF1F7]" />

              <div className="mt-auto flex justify-end gap-2 border-t border-[#E8EDF5] pt-3">
                <div className="h-[30px] w-[30px] animate-pulse rounded-[7px] bg-[#EEF2FA]" />

                <div className="h-[30px] w-[30px] animate-pulse rounded-[7px] bg-[#FFF0F2]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
