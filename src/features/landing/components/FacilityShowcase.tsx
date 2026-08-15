"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { FACILITIES } from "../constants/facilities";

export default function FacilityShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const current = FACILITIES[activeTab];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      {/* LEFT SIDE: Interactive Vertical Tab List */}
      <div className="flex flex-col space-y-2 lg:col-span-5">
        {FACILITIES.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === idx;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`group relative flex items-center gap-4 rounded-xl p-4 text-left transition-all duration-200 ${
                isActive
                  ? "bg-white text-emerald-950 shadow-md shadow-emerald-950/5"
                  : "text-emerald-900/70 hover:bg-emerald-100/50 hover:text-emerald-950"
              }`}
            >
              {/* Active Bar Indicator */}
              {isActive && (
                <span className="absolute top-3 bottom-3 left-0 w-1 rounded-r-full bg-emerald-600" />
              )}

              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-emerald-100/80 text-emerald-800 group-hover:bg-emerald-200/80"
                }`}
              >
                <Icon className="size-5" />
              </div>

              <div className="flex-1">
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                  {item.category}
                </span>
                <span className="block text-base font-bold tracking-tight">
                  {item.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* RIGHT SIDE: Open Stage Showcase */}
      <div className="relative flex flex-col justify-between rounded-2xl border border-emerald-200/80 bg-white p-6 shadow-xs sm:p-10 lg:col-span-7">
        <div className="space-y-6">
          {/* Stage Top Tag & Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700">
              {current.category}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${current.badgeColor}`}
            >
              {current.badge}
            </span>
          </div>

          {/* Stage Title & Tagline */}
          <div>
            <h3 className="text-2xl font-black text-emerald-950 sm:text-4xl">
              {current.title}
            </h3>
            <p className="mt-1 text-sm font-bold text-emerald-700 sm:text-base">
              {current.tagline}
            </p>
          </div>

          {/* Narrative Description */}
          <p className="text-xs font-medium leading-relaxed text-emerald-900/80 sm:text-base">
            {current.desc}
          </p>

          {/* Feature Checklist */}
          <div className="pt-2">
            <h4 className="mb-3 text-xs font-black uppercase tracking-wider text-emerald-950">
              Keunggulan &amp; Fasilitas Zona Ini:
            </h4>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {current.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2.5 text-xs font-semibold text-emerald-950 sm:text-sm"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="mt-8 border-t border-emerald-100 pt-8">
          <a
            href={current.ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-950 px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:scale-105 hover:bg-emerald-800"
          >
            <ShieldCheck className="size-4 text-lime-400" />
            {current.ctaText}
            <ArrowRight className="ml-1 size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
