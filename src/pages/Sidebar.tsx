import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white shadow-md p-6">
      <h1 className="text-xl font-bold mb-8">FinanceTracker</h1>

      <nav className="space-y-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="block w-full text-left hover:text-blue-600"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/expenses")}
          className="block w-full text-left hover:text-blue-600"
        >
          Expenses
        </button>
      </nav>
    </div>
  );
}
