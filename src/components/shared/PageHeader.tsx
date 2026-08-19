import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  backHref?: string;
  title: string;
  description?: string;
}

export default function PageHeader({
  backHref = "/dashboard",
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="p-4 text-left">
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          {description ? (
            <p className="text-xs font-medium text-slate-500">{description}</p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
