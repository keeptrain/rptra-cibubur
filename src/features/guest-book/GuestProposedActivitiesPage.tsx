import MainContainer from "@/components/container/MainContainer";
import GuestActivityList from "./components/GuestActivityList";
import GuestProposedActivityForm from "./components/GuestProposedActivityForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GuestProposedActivitiesPage() {
  return (
    <MainContainer>
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight">
          Ajukan Kegiatan
        </h1>
        <p className="text-muted-foreground text-sm">
          Ide kegiatan dari warga — guest book tanpa login.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form — Card header server, CardContent/Footer client */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Form Ajukan Kegiatan</CardTitle>
              <CardDescription className="text-sm">
                Tanpa login — ide langsung masuk daftar.
              </CardDescription>
            </CardHeader>
            <GuestProposedActivityForm />
          </Card>
        </div>

        {/* List — server rendered header/content */}
        <div className="lg:col-span-3">
          <GuestActivityList />
        </div>
      </div>
    </MainContainer>
  );
}
