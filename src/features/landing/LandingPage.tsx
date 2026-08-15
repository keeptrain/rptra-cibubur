import LandingHero from "./components/LandingHero";

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col bg-emerald-50">
      <LandingHero />
      <LandingHero />
    </main>
  );
}
