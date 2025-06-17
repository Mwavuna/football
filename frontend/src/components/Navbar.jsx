export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-4 py-3 shadow mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-xl font-semibold">Teen Titans FC Manager</h2>
        <span className="text-sm italic">
          Manage and simulate field positions
        </span>
      </div>
    </nav>
  );
}
