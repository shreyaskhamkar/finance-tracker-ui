import { useEffect, useState } from "react";
import api from "../api/axios";
import AddExpenseModal from "../components/AddExpenseModal";
import DashboardLayout from "./DashboardLayout";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: number;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/api/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {
      await api.delete(`/api/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert("Failed to delete expense");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Expenses</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Expense
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : expenses.length === 0 ? (
        <p className="text-gray-500">No expenses found.</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{expense.title}</td>
                  <td className="p-4 font-medium">₹ {expense.amount}</td>
                  <td className="p-4">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">{expense.category}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setEditingExpense(expense)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchExpenses}
        />
      )}

      {/* Edit Modal */}
      {editingExpense && (
        <AddExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSuccess={fetchExpenses}
        />
      )}
    </DashboardLayout>
  );
}
