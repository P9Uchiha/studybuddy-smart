
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-study-neutral-100">
        <div className="container mx-auto px-4 md:px-6">
          <Dashboard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
