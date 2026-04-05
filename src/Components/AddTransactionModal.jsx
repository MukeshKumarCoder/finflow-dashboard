import React, { useState } from "react";
import { X, DollarSign, FileText, Calendar, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddTransactionModal = ({ isOpen, onClose, onAdd, role }) => {
  const [formData, setFormData] = useState({
    note: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role !== "admin") {
      alert("Permission Denied: Viewers cannot create transactions.");
      return;
    }

    if (!formData.amount || !formData.note) return;

    onAdd({
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
    });

    setFormData({
      note: "",
      amount: "",
      category: "Food",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden z-10 relative border border-slate-100"
          >
            <div className="p-8 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-800">
                  Add Entry
                </h3>
                <p className="text-slate-400 text-sm font-medium">
                  Record a new financial activity
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {role !== "admin" && (
              <div className="mx-8 mb-4 p-3 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3 text-amber-700">
                <AlertCircle size={18} />
                <p className="text-xs font-bold uppercase tracking-tight">
                  Viewing Mode Only
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-8 pt-2 space-y-5">
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                    Amount
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 transition-colors group-focus-within:bg-blue-600 group-focus-within:text-white">
                      <DollarSign size={16} />
                    </div>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-[1.25rem] font-bold text-lg focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all disabled:opacity-50"
                      value={formData.amount}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || parseFloat(val) >= 0) {
                          setFormData({ ...formData, amount: val });
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          ["e", "E", "-", "ArrowUp", "ArrowDown"].includes(
                            e.key,
                          )
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                    Description
                  </label>
                  <div className="relative">
                    <FileText
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      required
                      disabled={role !== "admin"}
                      placeholder="What was this for?"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all disabled:opacity-50"
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                      Category
                    </label>
                    <select
                      disabled={role !== "admin"}
                      className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-sm font-bold outline-none focus:bg-white transition-all appearance-none cursor-pointer disabled:opacity-50"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      {[
                        "Food",
                        "Rent",
                        "Transport",
                        "Salary",
                        "Freelance",
                        "Entertainment",
                      ].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                      Type
                    </label>
                    <select
                      disabled={role !== "admin"}
                      className={`w-full p-3.5 border rounded-[1.25rem] text-sm font-black outline-none transition-all appearance-none cursor-pointer disabled:opacity-50 ${
                        formData.type === "income"
                          ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                          : "bg-rose-50 border-rose-100 text-rose-600"
                      }`}
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    >
                      <option value="expense">EXPENSE</option>
                      <option value="income">INCOME</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                    Transaction Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="date"
                      disabled={role !== "admin"}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-sm font-medium outline-none focus:bg-white transition-all disabled:opacity-50"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 font-bold cursor-pointer text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={role !== "admin"}
                  className="flex-2 py-4 bg-blue-600 cursor-pointer text-white rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:bg-slate-200 disabled:shadow-none"
                >
                  Create Transaction
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionModal;
