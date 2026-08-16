import { getLiveStatus } from "@/features/landing/api/getLiveStatus";
import CloseParkForm from "./CloseParkForm";

export default async function DashboardAdminSection() {
  const { isOpen } = await getLiveStatus();

  return (
    <div className="flex flex-col gap-4 py-6">
      <div className="rounded-md border p-4">
        <h3>Ubah Status Taman</h3>
        <CloseParkForm isOpen={isOpen} />
      </div>
      <div></div>
    </div>
  );
}
