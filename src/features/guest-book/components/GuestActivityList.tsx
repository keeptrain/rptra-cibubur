import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function anon(contact: string) {
  const c = contact.trim();
  if (!c) return "Anonim";
  if (c.includes("@")) {
    const [local, domain] = c.split("@");
    return `${local.slice(0, 3)}****@${domain}`;
  }
  return `${c.slice(0, 3)}****`;
}

const MOCK_GUEST_IDEAS = [
  {
    id: "1",
    guest_contact: "081234567890",
    description: "Senam setiap Sabtu pagi untuk lansia, butuh instruktur.",
    created_at: "1 jam lalu",
  },
  {
    id: "2",
    guest_contact: "budi@gmail.com",
    description: "Mengaji sore untuk anak 6-12 tahun, 2x seminggu.",
    created_at: "3 jam lalu",
  },
  {
    id: "3",
    guest_contact: "082198765432",
    description: "Edukasi olah sampah jadi kerajinan, untuk remaja.",
    created_at: "kemarin",
  },
  {
    id: "4",
    guest_contact: "",
    description: "Mini turnamen antar RT, lapangan RPTRA.",
    created_at: "2 hari lalu",
  },
];

export default function GuestActivityList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Ide Kegiatan Warga</CardTitle>
        <Badge variant="secondary">{MOCK_GUEST_IDEAS.length} ide</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {MOCK_GUEST_IDEAS.map((item) => (
          <div key={item.id} className="space-y-2 rounded-xl border p-4">
            <div className="flex items-start justify-between">
              <Badge variant="outline" className="mt-1">
                oleh {anon(item.guest_contact)}{" "}
              </Badge>
              <span className="text-muted-foreground shrink-0 text-xs">
                {item.created_at}
              </span>
            </div>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {item.description}
            </p>
          </div>
        ))}
        <p className="text-muted-foreground pt-2 text-center text-xs">
          Menampilkan 4 ide terbaru — guest book.
        </p>
      </CardContent>
    </Card>
  );
}
