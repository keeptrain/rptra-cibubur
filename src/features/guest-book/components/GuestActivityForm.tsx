import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function GuestActivityForm() {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="guest_contact">Kontak *</Label>
        <Input id="guest_contact" name="guest_contact" placeholder="nomor wa atau email" />
        <p className="text-xs text-neutral-500">* Otomatis kami anonimkan di daftar ide kegiatan warga.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi Ide *</Label>
        <Textarea id="description" name="description" rows={3} placeholder="Ceritakan ide kegiatan, target peserta, kebutuhan..." />
      </div>
    </>
  );
}
