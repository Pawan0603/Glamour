import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import FeaturedSalons from "@/components/FeaturedSalons";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <SearchBar />
        <FeaturedSalons />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
