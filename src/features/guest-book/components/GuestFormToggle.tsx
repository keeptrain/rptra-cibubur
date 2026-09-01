"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

export default function GuestFormToggle({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        className="w-full sm:hidden"
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
            {children}
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
