import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import Navbar from "@/components/dashboard/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="fixed top-0  z-50">
          <SidebarTrigger />
        </div>
        <Navbar />
        <section className="w-full h-full p-0 bg-[#f5f7fa]">
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
}
