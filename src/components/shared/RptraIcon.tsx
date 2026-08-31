import { TreesIcon } from "lucide-react";

export default function RptraIcon({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-emerald-500 shadow-sm transition-transform hover:scale-105 ${className}`}
    >
      <TreesIcon className="size-6 text-white" />
    </div>
  );
}
