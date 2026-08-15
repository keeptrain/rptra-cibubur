import LandingHero from "./components/LandingHero";
import HighlightTicker from "./components/HighlightTicker";
import FacilitiesSection from "./components/FacilitiesSection";

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col bg-emerald-50">
      <LandingHero />
      <HighlightTicker />
      <FacilitiesSection />
    </main>
  );
}
