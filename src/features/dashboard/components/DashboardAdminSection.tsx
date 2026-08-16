import CloseParkForm from "./CloseParkForm";

export default function DashboardAdminSection() {
  return (
    <div className="flex flex-col gap-4 py-6">
      <div className="rounded-md border p-4">
        <h3>Ubah Status Taman</h3>
        <CloseParkForm />
      </div>
      <div></div>
    </div>
  );
}
