import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FACILITIES } from "../constants/facilities";

export default function FacilitiesSection() {
  return (
    <section
      id="zona-taman"
      className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="text-center">
        <span className="text-primary inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest">
          <span className="bg-primary size-2" /> FASILITAS
        </span>
        <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Lima zona{" "}
          <span className="text-primary font-semibold italic">
            untuk tumbuh
          </span>{" "}
          bersama
        </h2>
      </div>
      <FacilityShowcase />
    </section>
  );
}

const ASSETS: Record<string, string> = {
  playground: "/assets/undraw_toy-car_on9j.svg",
  literacy: "/assets/undraw_open-book_pet1.svg",
  sports: "/assets/undraw_goal_v712.svg",
  nature: "/assets/undraw_gardening_jck1.svg",
  community: "/assets/undraw_casual-chat_4byz.svg",
};

export function FacilityShowcase() {
  return (
    <div className="grid gap-4 lg:grid-cols-6">
      {FACILITIES.map((item, idx) => {
        const isBottom = idx >= 3;
        return (
          <Card
            key={item.id}
            className={`relative min-h-30 overflow-hidden md:min-h-50 ${isBottom ? "lg:col-span-3" : "lg:col-span-2"}`}
          >
            <CardHeader className="relative space-y-2 p-6">
              <CardTitle className="max-w-[60%] text-base leading-tight">
                {item.title}
              </CardTitle>
              <p className="text-muted-foreground line-clamp-3 max-w-[55%] text-xs leading-relaxed">
                {item.desc}
              </p>
            </CardHeader>
            <div className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 sm:h-44 sm:w-44">
              <Image
                src={ASSETS[item.id] || "/assets/undraw_open-book_pet1.svg"}
                alt={item.title}
                fill
                className="object-contain object-bottom-right p-2"
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
