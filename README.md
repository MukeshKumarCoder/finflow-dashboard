🚀 FinFlow – Interactive Finance Dashboard
FinFlow is a modern, responsive finance management interface built to help users track spending patterns, visualize balance trends, and manage transactions with a focus on Role-Based Access Control (RBAC).

🔗 Live Demo | 📁 GitHub Repository
🛠️ Tech Stack
Framework: React.js (Vite)

Styling: Tailwind CSS (Bento Grid & Glassmorphism)

Animations: Framer Motion

Charts: Recharts (Area & Pie Charts)

Icons: Lucide-React

State Management: React Hooks (useState, useMemo, useEffect)

Deployment: Netlify

✨ Key Features

1. Advanced Role-Based UI (RBAC)
   The application simulates two distinct user roles to demonstrate secure UI logic:

Admin: Full access to add, edit, and delete transactions.

Viewer: Read-only access. Functional buttons (e.g., "New Transaction") and actions (Delete icon) are dynamically hidden or disabled.

2. Intelligent Data Insights
   Top Expense Category: Automatically identifies the highest spending area.

Savings Rate: Real-time calculation of remaining income vs. expenses.

Balance Trends: Smoothly animated Area Charts visualizing financial history.

3. High-End UX & Robust Inputs
   Input Sanitization: Custom logic to block negative values, exponential notation ("e"), and keyboard arrow-key increments.

Clean UI: Custom CSS to hide browser-default number steppers for a premium feel.

Persistence: Data is synced with localStorage to ensure it survives page refreshes.

4. Responsive & Animated Design
   Fully Responsive: Includes a custom mobile navigation drawer for a seamless experience on all devices.

Micro-interactions: Staggered card entrances and spring-based modal transitions.

🏗️ Architectural Decisions
Modular Components: Separated the Sidebar, Stat Cards, and Modals into reusable functional components for scalability.

Performance: Utilized useMemo for heavy data derivations (totals and chart formatting) to minimize unnecessary re-renders.

Security-First UX: Implemented a double-layer of protection where features are hidden visually for Viewers and blocked logically at the code level.

🚀 Getting Started
Clone the repo:

Bash
git clone https://github.com/MukeshKumarCoder/finflow-dashboard.git
Install dependencies:

Bash
npm install
Run the project:

Bash
npm run dev
📝 Author
Mukesh Kumar Frontend Developer Intern Applicant 📧 mg328790@gmail.com

🔗 GitHub Profile
