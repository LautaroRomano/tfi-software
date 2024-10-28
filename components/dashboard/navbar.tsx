import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <div className="flex w-full top-0 left-0 h-24 px-10 items-center justify-between">
      <div className="flex">
        <h1 className="dashboard-title">Pacientes</h1>
      </div>
      <div className="flex">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
