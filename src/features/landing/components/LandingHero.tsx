import { Suspense } from "react";
import ParkLiveStatus from "./ParkLiveStatus";
import HeroTop from "./hero/HeroTop";
import HeroBottom from "./hero/HeroBottom";
import { ParkLiveStatusSkeleton } from "./LandingSkeleton";
import { getHeroActivities } from "../actions/heroActions";

export default async function LandingHero() {
  const data = await getHeroActivities();

  return (
    <section
      id="hero"
      className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col p-4 lg:h-[calc(100vh-5rem)] lg:p-8"
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-emerald-200/80 bg-[#F4FBF7] text-emerald-950 shadow-2xl shadow-emerald-950/5">
        <HeroTop />
        <Suspense fallback={<ParkLiveStatusSkeleton />}>
          <ParkLiveStatus />
        </Suspense>
        <HeroBottom nearest={data.nearest} latest={data.latest} />
      </div>
    </section>
  );
}
