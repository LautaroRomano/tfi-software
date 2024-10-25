export default function Sidebar() {
  return (
    <div className="flex flex-col items-start justify-start w-64 h-screen shadow-lg text-black">
      <h1>Medical clinic</h1>
      <div className="font-bold text-center text-lg hover:opacity-8">Pacientes</div>
      <div className="font-bold text-center text-lg hover:opacity-8">Usuarios</div>
    </div>
  );
}
