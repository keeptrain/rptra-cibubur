"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function VisitForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    purposeNotes: "",
  });
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValidPhone = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    return (
      cleaned.length >= 10 &&
      cleaned.length <= 15 &&
      (cleaned.startsWith("08") || cleaned.startsWith("628"))
    );
  };

  const handleEmailChange = (val: string) => {
    setFormData((prev) => ({ ...prev, email: val }));
    if (val && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(val.trim())) {
      setEmailError("Hanya menerima email @gmail.com");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (val: string) => {
    setFormData((prev) => ({ ...prev, phone: val }));
    if (val && !isValidPhone(val)) {
      setPhoneError("Nomor WhatsApp harus dimulai dengan 08 atau 628");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError || phoneError || !formData.email || !formData.phone) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="size-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Pengajuan Berhasil</h3>
            <p className="text-muted-foreground text-sm">
              Bukti pendaftaran dikirim ke{" "}
              <span className="text-foreground font-medium">
                {formData.email}
              </span>
            </p>
          </div>
          <Card className="bg-muted/50 w-full text-left">
            <CardContent className="space-y-2 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pemohon</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">WhatsApp</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal</span>
                <span className="font-medium">{formData.date}</span>
              </div>
              {formData.purposeNotes && (
                <p className="text-muted-foreground pt-2">
                  {formData.purposeNotes}
                </p>
              )}
              <div className="flex justify-between border-t pt-2">
                <span className="text-muted-foreground">Biaya</span>
                <span className="font-semibold text-emerald-600">Gratis</span>
              </div>
            </CardContent>
          </Card>
          <div className="flex w-full gap-2">
            <Button asChild className="flex-1">
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Pengelola RPTRA Cibubur, saya ${formData.name} ingin konfirmasi kunjungan pada ${formData.date}.`)}`}
                target="_blank"
                rel="noreferrer"
              >
                Konfirmasi WhatsApp <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Kembali</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulir Rencana Kunjungan</CardTitle>
        <CardDescription>Isi data kunjungan.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                required
                placeholder="nama"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
 d
            <div className="space-y-2">
              <Label htmlFor="date">Rencana Tanggal Kunjungan *</Label>
              <Input
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email (@gmail.com) *</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="nama@gmail.com"
                value={formData.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                aria-invalid={!!emailError}
              />
              {emailError && (
                <p className="text-destructive text-xs">{emailError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">No. WhatsApp *</Label>
              <Input
                id="phone"
                type="tel"
                required
                placeholder="081234567890"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                aria-invalid={!!phoneError}
              />
              {phoneError && (
                <p className="text-destructive text-xs">{phoneError}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Tujuan / Catatan</Label>
            <Textarea
              id="purpose"
              rows={3}
              placeholder="Instansi, jumlah rombongan, keperluan (opsional)"
              value={formData.purposeNotes}
              onChange={(e) =>
                setFormData({ ...formData, purposeNotes: e.target.value })
              }
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !!emailError}
            className="flex"
          >
            {isLoading ? "Mengirim..." : "Kirim Rencana Kunjungan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
