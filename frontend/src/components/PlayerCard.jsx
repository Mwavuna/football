export default function PlayerCard({ player }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold">{player.name}</h2>
      <p>Position: {player.position}</p>
      <p>Number: #{player.number}</p>
      <p>Rating: {player.rating}</p>
    </div>
  );
}
