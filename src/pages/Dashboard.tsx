import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Pie } from "react-chartjs-2";
import DashboardLayout from "./DashboardLayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
);

interface MonthlySummary {
  year: number;
  month: number;
  totalAmount: number;
}

interface CategorySummary {
  category: string;
  totalAmount: number;
}

export default function Dashboard() {
  const [monthly, setMonthly] = useState<MonthlySummary[]>([]);
  const [category, setCategory] = useState<CategorySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const monthlyRes = await api.get("/api/analytics/monthly");
        const categoryRes = await api.get("/api/analytics/category");

        setMonthly(monthlyRes.data);
        setCategory(categoryRes.data);
      } catch (err) {
        console.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const totalExpenses = monthly.reduce((sum, m) => sum + m.totalAmount, 0);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const thisMonth =
    monthly.find((m) => m.month === currentMonth && m.year === currentYear)
      ?.totalAmount || 0;

  // 📊 Line Chart Data
  const lineData = {
    labels: monthly.map((m) => `${m.month}/${m.year}`),
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthly.map((m) => m.totalAmount),
        borderColor: "#2563eb",
        backgroundColor: "#93c5fd",
      },
    ],
  };

  // 🥧 Pie Chart Data
  const pieData = {
    labels: category.map((c) => c.category),
    datasets: [
      {
        data: category.map((c) => c.totalAmount),
        backgroundColor: [
          "#3b82f6",
          "#ef4444",
          "#22c55e",
          "#f59e0b",
          "#a855f7",
        ],
      },
    ],
  };

  return (
    <DashboardLayout>
      {loading ? (
        <p>Loading analytics...</p>
      ) : (
        <div>
          <h3 className="text-2xl font-bold mb-6">Welcome Back 👋</h3>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-gray-500">Total Expenses</h4>
              <p className="text-2xl font-bold mt-2">₹ {totalExpenses}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-gray-500">This Month</h4>
              <p className="text-2xl font-bold mt-2">₹ {thisMonth}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-gray-500">Categories</h4>
              <p className="text-2xl font-bold mt-2">{category.length}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-4">
                Monthly Expenses Trend
              </h4>
              <Line data={lineData} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-4">Category Breakdown</h4>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
