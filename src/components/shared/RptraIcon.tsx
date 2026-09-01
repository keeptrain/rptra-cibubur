import { TreesIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function RptraIcon({ className }: { className?: string }) {
  return (
    <Button
      size="icon-lg"
      variant="outline"
      className={cn("rounded-full border-none p-4 sm:p-6", className)}
    >
      <TreesIcon className="text-primary size-8" />
    </Button>
  );
}
