import { ArrowUpRight, ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOCIALS = [
  { label: "facebook", href: "https://facebook.com" },
  { label: "instagram", href: "https://instagram.com" },
  { label: "youtube", href: "https://youtube.com" },
];

export default function SocialFollowSection() {
  return (
    <section className="bg-slate-50 py-5 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-none py-4 sm:flex-row sm:py-6">
          <h2 className="flex items-center gap-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            <span className="border-b-2 border-black pb-1">Ikuti Kami</span>
            <ArrowUpRightIcon />
          </h2>

          <div className="flex items-center gap-2 sm:gap-3">
            {SOCIALS.map((s) => (
              <Button
                key={s.label}
                asChild
                className="bg-accent h-10 rounded-full px-4 text-xs font-bold tracking-widest text-black uppercase hover:bg-[#E5FF00]/90 sm:h-12 sm:px-5"
              >
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
