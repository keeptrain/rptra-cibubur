import { FilterManagementAgenda } from "../../constants/agendas";
import { AgendaStatus } from "../../constants/agendas";

interface FilterCardProps {
  isPending: boolean;
  agenda: FilterManagementAgenda;
  count: number;
  isActive: boolean;
  onSelect: (tab: AgendaStatus) => void;
}

export default function FilterCard({
  isPending,
  agenda,
  count,
  isActive,
  onSelect,
}: FilterCardProps) {
  const IconComponent = agenda.icon;

  return (
    <button
      disabled={isPending}
      type="button"
      onClick={() => onSelect(agenda.activeTab)}
      className={`flex cursor-pointer items-center justify-between border p-3 text-left shadow-2xs transition-all ${
        isActive
          ? "border-slate-400 bg-slate-50/80"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
        <div
          className={`flex size-9 shrink-0 items-center justify-center sm:size-10`}
        >
          <IconComponent className={`size-4 sm:size-5`} />
        </div>
        <div className="min-w-0 flex-1">
          <span className="block text-base leading-tight font-black sm:text-xl">
            {count}
          </span>
          <span
            title={agenda.title}
            className="block truncate text-xs font-semibold"
          >
            {agenda.title}
          </span>
        </div>
      </div>
    </button>
  );
}
