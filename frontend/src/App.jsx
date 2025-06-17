import { useEffect, useState } from "react";
import PlayerForm from "./components/PlayerForm";
import PlayerList from "./components/PlayerList";
import Navbar from "./components/Navbar";
import api from "./api";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:5000");

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    api
      .get("/players")
      .then((res) => setPlayers(res.data))
      .catch(() => toast.error("Failed to fetch players"))
      .finally(() => setLoading(false));

    socket.on("playerAdded", (player) => {
      setPlayers((prev) => {
        const exists = prev.some((p) => p.id === player.id);
        return exists ? prev : [...prev, player];
      });
    });

    socket.on("playerDeleted", (id) =>
      setPlayers((prev) => prev.filter((p) => p.id !== id))
    );

    socket.on("playerUpdated", (updatedPlayer) => {
      setPlayers((prev) =>
        prev.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
      );
    });

    return () => {
      socket.off("playerAdded");
      socket.off("playerDeleted");
      socket.off("playerUpdated");
    };
  }, []);

  const handleAddPlayer = (newPlayer) => {
    setPlayers((prev) => {
      const ids = new Set(prev.map((p) => p.id));
      return ids.has(newPlayer.id) ? prev : [...prev, newPlayer];
    });
  };

  const handleDeletePlayer = async (id) => {
    setDeletingId(id);
    try {
      await api.delete(`/players/${id}`);
      setPlayers((prev) => prev.filter((p) => p.id !== id));
      toast.success("Player deleted successfully");
    } catch {
      toast.error("Failed to delete player");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdatePlayer = async (updatedPlayer) => {
    setUpdatingId(updatedPlayer.id);
    try {
      await api.put(`/players/${updatedPlayer.id}`, updatedPlayer);
      setPlayers((prev) =>
        prev.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
      );
      toast.success("Player updated successfully");
    } catch {
      toast.error("Failed to update player");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-green-100 via-blue-100 to-blue-200 min-h-screen w-screen ">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
      />

      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-6 text-green-900">
        Teen Titans FC.
      </h1>
      <PlayerForm onAdd={handleAddPlayer} />
      {loading ? (
        <div className="text-center text-gray-600 text-lg mt-4">
          Loading players...
        </div>
      ) : (
        <PlayerList
          players={players}
          onDelete={handleDeletePlayer}
          onUpdate={handleUpdatePlayer}
          deletingId={deletingId}
          updatingId={updatingId}
        />
      )}
    </div>
  );
}

export default App;
