import { PropsWithChildren } from "react";
import { Header } from "./Header";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="app-bg-gradient absolute inset-0" />
        <div className="app-bg-grid absolute inset-0" />
        <div className="app-bg-icons absolute inset-0" />
      </div>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t">
        <div className="container py-6 text-sm text-muted-foreground flex items-center justify-between">
          <p>© {new Date().getFullYear()} Ayush–ICD Integration</p>
          <p className="hidden sm:block">FHIR R4 • NAMASTE • ICD‑11 TM2</p>
        </div>
      </footer>
    </div>
  );
}
