import { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable main page container wrapper for consistent layout padding & flex structure.
 */
export default function MainContainer({
  children,
  className = "",
}: MainContainerProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-8 pb-40 sm:px-6 lg:px-8">
      <div className={`flex flex-1 flex-col space-y-6 ${className}`}>
        {children}
      </div>
    </main>
  );
}
