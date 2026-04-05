import React, { useState } from "react";
import { LayoutDashboard, ShieldCheck, Wallet, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ role, setRole }) => {
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-200">
          <Wallet size={24} />
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-slate-800">
          FinFlow
        </span>
      </div>

      <nav className="space-y-2 flex-1">
        <button
          className={`flex items-center gap-3 w-full p-3.5 cursor-pointer rounded-2xl font-semibold transition-all duration-200 bg-blue-600 text-white shadow-md shadow-blue-100
          `}
        >
          <LayoutDashboard size={20} /> Dashboard
        </button>
      </nav>

      <div className="mt-auto p-3 bg-linear-to-br from-slate-50 to-slate-100 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck
            size={16}
            className={role === "admin" ? "text-blue-600" : "text-slate-400"}
          />
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
            Permission Level
          </span>
        </div>

        <div className="relative">
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              if (isOpen) setIsOpen(false);
            }}
            className="w-full appearance-none bg-white border border-slate-200 rounded-xl p-2 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer shadow-sm"
          >
            <option value="admin">Admin Access</option>
            <option value="viewer">Viewer Mode</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            ▼
          </div>
        </div>

        <p className="mt-3 text-[10px] leading-relaxed text-slate-400 font-medium">
          {role === "admin"
            ? "Full control: You can add, edit, and delete transactions."
            : "Read-only: You can view trends and history but cannot make changes."}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 flex items-center justify-between z-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <Wallet size={18} />
          </div>
          <span className="font-bold text-lg">FinFlow</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-slate-100 rounded-lg text-slate-600"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside className="w-72 bg-white border-r border-slate-200 hidden md:flex flex-col p-8 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-110 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-120 p-8 shadow-2xl md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
