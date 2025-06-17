export default function PlayerList({
  players,
  onDelete,
  onUpdate,
  deletingId,
  updatingId,
}) {
  if (!players.length)
    return <p className="text-center text-gray-600">No players yet.</p>;

  const handleEdit = (player) => {
    const newName = prompt("Edit name:", player.name);
    const newNumber = prompt("Edit number:", player.number);
    const newRating = prompt("Edit rating:", player.rating);
    const newPosition = prompt("Edit position:", player.position);

    if (newName && newNumber && newRating && newPosition) {
      onUpdate({
        ...player,
        name: newName,
        number: newNumber,
        rating: newRating,
        position: newPosition,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {players.map((player) => (
        <div key={player.id} className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg">{player.name}</h3>
          <p>Position: {player.position}</p>
          <p>Number: {player.number}</p>
          <p>Rating: {player.rating}</p>
          <button
            onClick={() => onDelete(player.id)}
            disabled={deletingId === player.id}
            className="mt-2 mr-2 text-red-600 hover:underline disabled:opacity-50"
          >
            {deletingId === player.id ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={() => handleEdit(player)}
            disabled={updatingId === player.id}
            className="mt-2 text-blue-600 hover:underline disabled:opacity-50"
          >
            {updatingId === player.id ? "Updating..." : "Edit"}
          </button>
        </div>
      ))}
    </div>
  );
}
