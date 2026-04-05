import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const Card = ({ title, val, sub, color, index }) => {
  const getTrendIcon = () => {
    if (sub.includes("+"))
      return <TrendingUp size={14} className="text-emerald-500" />;
    if (sub.includes("-"))
      return <TrendingDown size={14} className="text-rose-500" />;
    return <Minus size={14} className="text-slate-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative bg-white p-6 rounded-4xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group overflow-hidden"
    >
      <div
        className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${color.replace("text", "bg")}`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            {title}
          </p>
          <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
            {getTrendIcon()}
          </div>
        </div>
        <h2 className={`text-3xl font-black mb-2 tracking-tight ${color}`}>
          {val}
        </h2>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-slate-400 leading-none">
            {sub}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
