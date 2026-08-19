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
      className={`flex cursor-pointer items-center justify-between border p-3 text-left shadow-2xs transition-all sm:p-4 ${
        isActive
          ? "border-slate-900 bg-slate-50/80 ring-1 ring-slate-900"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors sm:size-10 ${
            isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
          }`}
        >
          <IconComponent className="size-4 sm:size-5" />
        </div>
        <div>
          <span className="block text-base leading-tight font-black text-slate-900 sm:text-xl">
            {count}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 sm:text-xs">
            {agenda.title}
          </span>
        </div>
      </div>
    </button>
  );
}
