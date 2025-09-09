import { Button } from "@/components/ui/button";
import { Layout } from "@/components/site/Layout";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_50%),radial-gradient(ellipse_at_bottom_right,theme(colors.emerald.400/10),transparent_40%)]" />
        <div className="container grid lg:grid-cols-2 gap-8 py-16 md:py-24 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-primary bg-primary/5">
              FHIR‑compliant terminology service
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Dual Coding Integration for Ayush & ICD‑11
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-prose">
              Search NAMASTE & ICD‑11 TM2 terminology with a clean, modern interface. Built for clinicians and developers with healthcare‑grade UX and accessibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="">
                <Link to="/search">Search Terminology</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/lookup">Lookup by Code</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> NAMASTE</div>
              <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> ICD‑11 TM2</div>
            </div>
          </div>
          <div className="relative">
            <div className="mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-primary/5 p-4">
                    <p className="text-sm text-muted-foreground">Latency</p>
                    <p className="text-2xl font-bold">~300ms</p>
                  </div>
                  <div className="rounded-lg bg-emerald-500/10 p-4">
                    <p className="text-sm text-muted-foreground">Coverage</p>
                    <p className="text-2xl font-bold">NAMASTE + ICD‑11</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 p-4">
                    <p className="text-sm text-muted-foreground">Standards</p>
                    <p className="text-2xl font-bold">FHIR R4</p>
                  </div>
                  <div className="rounded-lg bg-emerald-500/10 p-4">
                    <p className="text-sm text-muted-foreground">Security</p>
                    <p className="text-2xl font-bold">ABHA OAuth2.0</p>
                  </div>
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  Fully responsive, accessible UI with Shadcn components.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
