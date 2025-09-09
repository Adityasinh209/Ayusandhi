import { PropsWithChildren } from "react";
import { Header } from "./Header";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
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
