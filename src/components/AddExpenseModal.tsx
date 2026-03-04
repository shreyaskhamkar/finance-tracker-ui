import { useEffect, useState } from "react";
import api from "../api/axios";

interface Expense {
  id?: string;
  title: string;
  amount: number;
  date: string;
  category: number;
}

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  expense?: Expense; // optional for edit mode
}

export default function AddExpenseModal({
  onClose,
  onSuccess,
  expense,
}: Props) {
  const isEdit = !!expense;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill data if editing
  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setAmount(String(expense.amount));
      setDate(expense.date.split("T")[0]);
      setCategory(String(expense.category));
    }
  }, [expense]);

  const handleSubmit = async () => {
    setError("");

    if (!title || !amount || !date) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      if (isEdit && expense?.id) {
        await api.put(`/api/expenses/${expense.id}`, {
          title,
          amount: Number(amount),
          date,
          category: Number(category),
        });
      } else {
        await api.post("/api/expenses", {
          title,
          amount: Number(amount),
          date,
          category: Number(category),
        });
      }

      onSuccess();
      onClose();
    } catch {
      setError("Failed to save expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Expense" : "Add Expense"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-2 rounded mb-3"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 rounded mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="1">Food</option>
          <option value="2">Transport</option>
          <option value="3">Bills</option>
          <option value="4">Shopping</option>
          <option value="5">Other</option>
        </select>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 text-white rounded ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
                ? "Update"
                : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
