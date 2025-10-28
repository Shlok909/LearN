import Footer from "@/components/layout/footer";
import NavigationBar from "@/components/layout/navigation-bar";
import CoursesSection from "@/components/sections/courses-section";

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar />
      <main className="flex-grow py-12 md:py-20">
        <CoursesSection />
      </main>
      <Footer />
    </div>
  );
}
