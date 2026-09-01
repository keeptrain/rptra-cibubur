"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { FACILITIES } from "../constants/facilities";

export default function FacilityShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const current = FACILITIES[activeTab];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
      {/* TAB SELECTION LIST (Compact 3-column Grid on Mobile, Vertical List on Desktop) */}
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 lg:col-span-5 lg:flex lg:flex-col lg:gap-0 lg:space-y-2">
        {FACILITIES.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === idx;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`group relative flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-center transition-all duration-200 lg:flex-row lg:items-center lg:gap-4 lg:rounded-xl lg:p-4 lg:text-left ${
                isActive
                  ? "border-emerald-500/80 bg-emerald-600 text-white shadow-md lg:border-emerald-200/80 lg:bg-white lg:text-emerald-950 lg:shadow-emerald-950/5"
                  : "border-emerald-200/60 bg-white/90 text-emerald-900/80 hover:border-emerald-300 hover:bg-emerald-100/50 hover:text-emerald-950 lg:border-transparent lg:bg-transparent"
              }`}
            >
              {/* Active Bar Indicator (Desktop Only) */}
              {isActive && (
                <span className="hidden lg:absolute lg:top-3 lg:bottom-3 lg:left-0 lg:block lg:w-1 lg:rounded-r-full lg:bg-emerald-600" />
              )}

              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors sm:size-11 ${
                  isActive
                    ? "bg-white/20 text-white lg:bg-emerald-600 lg:text-white lg:shadow-xs"
                    : "bg-emerald-100/80 text-emerald-800 group-hover:bg-emerald-200/80"
                }`}
              >
                <Icon className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <span className="hidden text-xs font-semibold tracking-wider text-emerald-700 uppercase lg:block">
                  {item.category}
                </span>
                <span className="line-clamp-1 block text-sm leading-tight font-medium tracking-tight sm:text-xs lg:line-clamp-none lg:text-base">
                  {item.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* RIGHT SIDE: Open Stage Showcase (Detail View) */}
      <div className="relative flex flex-col justify-between rounded-2xl border border-emerald-200/80 bg-white p-6 shadow-xs lg:col-span-7">
        <div className="space-y-6">
          {/* Stage Top Tag & Badge */}
          <div>
            <span className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">
              {current.category}
            </span>
          </div>

          {/* Stage Title & Tagline */}
          <div>
            <h3 className="text-2xl font-semibold text-emerald-950 sm:text-4xl">
              {current.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-emerald-700 sm:text-base">
              {current.tagline}
            </p>
          </div>

          {/* Narrative Description */}
          <p className="text-xs leading-relaxed font-medium text-emerald-900/80 sm:text-base">
            {current.desc}
          </p>

          {/* Feature Checklist */}
          <div className="pt-2">
            <h4 className="mb-3 text-xs font-semibold tracking-wider text-emerald-950 uppercase">
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
      </div>
    </div>
  );
}
