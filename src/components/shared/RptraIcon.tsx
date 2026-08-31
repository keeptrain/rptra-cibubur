import { TreesIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function RptraIcon({ className }: { className?: string }) {
  return (
    <Button
      size="icon-lg"
      variant="outline"
      className={cn("rounded-full p-4 sm:p-6", className)}
    >
      <TreesIcon className="size-8" />
    </Button>
  );
}
