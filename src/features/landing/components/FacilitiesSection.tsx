import FacilityShowcase from "./FacilityShowcase";

export default function FacilitiesSection() {
  return (
    <section
      id="zona-taman"
      className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:px-8"
    >
      {/* Section Header */}
      <h2 className="text-3xl font-black tracking-tight text-emerald-950 uppercase sm:text-5xl">
        Fasilitas <span className="text-emerald-600">5 Zona Ceria</span>
      </h2>

      {/* Interactive Showcase Component */}
      <FacilityShowcase />
    </section>
  );
}
