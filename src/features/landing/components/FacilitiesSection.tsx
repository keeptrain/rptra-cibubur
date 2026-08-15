import { Sparkles } from "lucide-react";
import FacilityShowcase from "./FacilityShowcase";

export default function FacilitiesSection() {
  return (
    <section
      id="zona-taman"
      className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="mb-14">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-100/80 px-3.5 py-1 text-xs font-black tracking-widest text-emerald-800 uppercase">
          <Sparkles className="size-3.5 text-emerald-600" />
          Fasilitas Unggulan Taman
        </span>
        <h2 className="text-3xl font-black tracking-tight text-emerald-950 uppercase sm:text-5xl">
          Eksplorasi <span className="text-emerald-600">5 Zona Ceria</span>
        </h2>
        <p className="mt-2 text-xs font-medium text-emerald-800/80 sm:text-base">
          Pilih zona di bawah ini untuk melihat detail fasilitas &amp;
          keunggulan RPTRA Cibubur.
        </p>
      </div>

      {/* Interactive Showcase Component */}
      <FacilityShowcase />
    </section>
  );
}
