"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TurnstileWidget from "@/components/TurnstileWidget";

export default function GuestProposedActivityForm() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDone(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setDone(false), 2500);
    }, 700);
  };

  return (
    <>
      <Button
        variant="outline"
        className="mx-4 mb-4 sm:hidden"
        onClick={() => setShow(!show)}
      >
        {show ? "Tutup Form" : "Ajukan Ide Kegiatan"}
      </Button>
      <div className={`${show ? "block" : "hidden"} sm:block`}>
        <CardContent className="space-y-4">
          {done && (
            <Alert className="border-green-200 bg-green-50 text-green-900">
              <CheckCircle2Icon />
              <AlertTitle>Berhasil mengajukan ide</AlertTitle>
            </Alert>
          )}
          <form
            id="guest-activity"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="guest_contact">Kontak *</Label>
              <Input
                disabled={isLoading}
                id="guest_contact"
                name="guest_contact"
                placeholder="nomor wa atau email"
              />
              <p className="text-xs text-neutral-500">
                * Otomatis kami anonimkan di daftar ide kegiatan warga.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Ide *</Label>
              <Textarea
                disabled={isLoading}
                id="description"
                name="description"
                rows={3}
                placeholder="Ceritakan ide kegiatan, target peserta, kebutuhan..."
              />
            </div>
            <TurnstileWidget
              hidden
              action="guest-propose-activity"
              resetKey={done ? "done-reset" : "dont-reset"}
            />
          </form>
        </CardContent>
        <CardFooter className="mt-4">
          <Button
            form="guest-activity"
            type="submit"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? "Mengirim..." : "Kirim Ide"}
          </Button>
        </CardFooter>
      </div>
    </>
  );
}
