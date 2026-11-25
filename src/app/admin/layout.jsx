"use client";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { Sidebar } from "@/components/admin/Sidebar";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  const openSidebar = () => {
    setOpen(true);
  };

  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <div className="flex h-dvh min-h-screen w-full overflow-hidden bg-[#F8FAFC]">
      {open && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-[#182238]/35 lg:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 h-dvh w-[260px] transform transition-transform duration-300 ease-in-out sm:w-[272px] lg:static lg:z-10 lg:h-dvh lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onMenuClick={closeSidebar} />
      </div>

      <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col">
        <AdminHeader onMenuClick={openSidebar} />

        <main className="min-h-0 flex-1 overflow-y-auto bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
}
