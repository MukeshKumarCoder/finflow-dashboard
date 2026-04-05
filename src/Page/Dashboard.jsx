import React, { useState, useMemo, useEffect } from "react";
import { Search, Plus, Trash2, TrendingUp, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { INITIAL_DATA, CATEGORY_COLORS } from "../Data/MockData";
import Card from "../Components/Card";
import Sidebar from "../Components/Sidebar";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import AddTransactionModal from "../Components/AddTransactionModal";

const DashBoard = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("fin_data");
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  const [role, setRole] = useState("admin");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("fin_data", JSON.stringify(transactions));
  }, [transactions]);

  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === "income") acc.income += curr.amount;
        else acc.expense += curr.amount;
        acc.balance = acc.income - acc.expense;
        return acc;
      },
      { income: 0, expense: 0, balance: 0 },
    );
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categories = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      });
    return Object.keys(categories).map((key) => ({
      name: key,
      value: categories[key],
    }));
  }, [transactions]);

  const insights = useMemo(() => {
    if (categoryData.length === 0)
      return { highestCategory: "N/A", savingsRate: 0 };
    const highest = categoryData.reduce(
      (prev, curr) => (prev.value > curr.value ? prev : curr),
      categoryData[0],
    );
    const rate =
      totals.income > 0
        ? (((totals.income - totals.expense) / totals.income) * 100).toFixed(0)
        : 0;
    return { highestCategory: highest.name, savingsRate: rate };
  }, [categoryData, totals]);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return (filterType === "all" || t.type === filterType) && matchesSearch;
  });

  const handleAddTransaction = (newT) =>
    setTransactions([newT, ...transactions]);
  const deleteTransaction = (id) => {
    if (role !== "admin") return alert("Action restricted to Admin only.");
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <Sidebar role={role} setRole={setRole} />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Financial Overview
            </h1>
            <p className="text-slate-500">
              Welcome back! Manage your transactions and insights below.
            </p>
          </div>
          {role === "admin" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto flex items-center justify-center cursor-pointer gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
            >
              <Plus size={20} /> New Transaction
            </button>
          )}
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase">
                Top Expense
              </p>
              <p className="font-bold text-slate-800">
                {insights.highestCategory}
              </p>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase">
                Savings Rate
              </p>
              <p className="font-bold text-slate-800">
                {insights.savingsRate}% of income
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card
            title="Total Balance"
            val={`$${totals.balance.toLocaleString()}`}
            sub="Current available funds"
            color="text-blue-600"
          />
          <Card
            title="Total Income"
            val={`$${totals.income.toLocaleString()}`}
            sub="Earnings this period"
            color="text-emerald-600"
          />
          <Card
            title="Total Expenses"
            val={`$${totals.expense.toLocaleString()}`}
            sub="Spending this period"
            color="text-rose-600"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-100">
            <h3 className="font-bold mb-4">Balance Trend</h3>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart
                data={transactions.map((t) => ({
                  name: t.date,
                  amount: t.amount,
                }))}
              >
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#3B82F6"
                  fill="url(#colorAmt)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-100">
            <h3 className="font-bold mb-4">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={CATEGORY_COLORS[entry.name] || "#cbd5e1"}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="font-bold text-lg">Transactions History</h3>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search note or category..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm outline-none"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                  {filteredTransactions.map((t) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={t.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">{t.note}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-lg bg-slate-100 text-[10px] font-bold uppercase text-slate-600">
                          {t.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {t.date}
                      </td>
                      <td
                        className={`px-6 py-4 font-bold ${t.type === "income" ? "text-emerald-600" : "text-rose-600"}`}
                      >
                        {t.type === "income" ? "+" : "-"}$
                        {t.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className={`p-2 rounded-lg transition-all cursor-pointer ${role === "admin" ? "text-slate-400 hover:text-rose-600 hover:bg-rose-50" : "text-slate-200"}`}
                          disabled={role !== "admin"}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
        role={role}
      />
    </div>
  );
};

export default DashBoard;
