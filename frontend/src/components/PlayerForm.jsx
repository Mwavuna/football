import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

export default function PlayerForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    position: "",
    number: "",
    rating: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const newPlayer = {
      ...form,
      number: Number(form.number),
      rating: Number(form.rating),
    };
    try {
      const { data } = await api.post("/players", newPlayer);
      onAdd(data);
      toast.success("Player added successfully");
      setForm({ name: "", position: "", number: "", rating: "" });
    } catch (err) {
      toast.error("Error adding player");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-3">Add New Player</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Player Name"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        name="position"
        value={form.position}
        onChange={handleChange}
        placeholder="Position"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        name="number"
        value={form.number}
        onChange={handleChange}
        type="number"
        placeholder="Jersey Number"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        name="rating"
        value={form.rating}
        onChange={handleChange}
        type="number"
        placeholder="Player Rating"
        className="border p-2 w-full mb-4"
        required
      />
      <button
        className="bg-gradient-to-r from-green-600 via-blue-500 to-blue-700 text-white px-4 py-2 rounded"
        disabled={submitting}
      >
        {submitting ? "Adding..." : "Add Player"}
      </button>
    </form>
  );
}
