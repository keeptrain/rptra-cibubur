import LandingHero from "./components/LandingHero";
import HighlightTicker from "./components/HighlightTicker";
import FacilitiesSection from "./components/FacilitiesSection";
import ParkRulesSection from "./components/ParkRulesSection";
import SocialFollowSection from "./components/SocialFollowSection";

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col bg-emerald-50">
      <LandingHero />
      <HighlightTicker />
      <FacilitiesSection />
      <ParkRulesSection />
      <SocialFollowSection />
    </main>
  );
}
