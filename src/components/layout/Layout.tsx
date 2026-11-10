import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main id="main" tabIndex={-1} className="flex-1 pt-12 focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
