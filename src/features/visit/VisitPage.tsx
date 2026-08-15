import VisitForm from "./components/VisitForm";

export default function VisitPage() {
  return (
    <main className="flex-1 bg-emerald-50 py-10 sm:py-16">
      <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Main Visit Form */}
        <VisitForm />
      </div>
    </main>
  );
}
