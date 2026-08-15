import LandingNavbar from "@/features/landing/components/navigation/LandingNavbar";
import LandingFooter from "@/features/landing/components/LandingFooter";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <LandingNavbar />
      {children}
      <LandingFooter />
    </div>
  );
};
