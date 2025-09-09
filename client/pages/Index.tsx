import { Button } from "@/components/ui/button";
import { Layout } from "@/components/site/Layout";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, ShieldCheck, Zap, Layers3, ServerCog } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_50%),radial-gradient(ellipse_at_bottom_right,theme(colors.emerald.400/10),transparent_40%)]" />
        <div className="container grid lg:grid-cols-2 gap-10 py-16 md:py-24 items-center">
          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 text-primary bg-primary/5"
            >
              FHIR‑compliant terminology service
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Ayusandhi
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-prose">
              Dual‑coding integration for Ayush & ICD‑11 TM2. Search NAMASTE
              terms, review details in elegant dialogs, and integrate with
              confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link to="/search" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search Terminology
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" /> NAMASTE
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />{" "}
                ICD‑11 TM2
              </div>
            </div>
          </div>

          {/* Highlight Card */}
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

      {/* Key Capabilities */}
      <section className="container py-12 md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold">Key Capabilities</h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to search, review, and integrate terminology.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="transition hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Search className="h-4 w-4 text-primary" /> Instant Search
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Type to search NAMASTE & ICD‑11 TM2 with debounced API queries.
            </CardContent>
          </Card>
          <Card className="transition hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers3 className="h-4 w-4 text-primary" /> Rich Details
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Click any result to open a modern dialog with full record fields.
            </CardContent>
          </Card>
          <Card className="transition hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="h-4 w-4 text-primary" /> Standards‑First
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Built around FHIR R4, India EHR guidelines, and ABHA OAuth2.0.
            </CardContent>
          </Card>
          <Card className="transition hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4 text-primary" /> Responsive UI
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Shadcn + Tailwind for fast, accessible, mobile‑first design.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-12 md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Simple steps to find the right terminology.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="transition hover:shadow-md">
            <CardHeader>
              <Badge className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                1
              </Badge>
              <CardTitle className="text-base">Search</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Enter a term or NAMASTE code to query the service.
            </CardContent>
          </Card>
          <Card className="transition hover:shadow-md">
            <CardHeader>
              <Badge className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                2
              </Badge>
              <CardTitle className="text-base">Review</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Open the dialog to view English/Hindi names, synonyms, and codes.
            </CardContent>
          </Card>
          <Card className="transition hover:shadow-md">
            <CardHeader>
              <Badge className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                3
              </Badge>
              <CardTitle className="text-base">Integrate</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Use the data in your clinical apps and workflows.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reliability strip */}
      <section className="container py-12 md:py-16">
        <div className="rounded-2xl border p-6 md:p-8 bg-gradient-to-br from-primary/5 via-emerald-500/5 to-transparent">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div>
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-muted-foreground">Uptime target</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                <span className="text-primary">FHIR</span> R4
              </div>
              <div className="text-muted-foreground">Terminology‑ready</div>
            </div>
            <div>
              <div className="text-3xl font-bold flex items-center gap-2">
                <ServerCog className="h-6 w-6 text-primary" /> CDN
              </div>
              <div className="text-muted-foreground">Fast global delivery</div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-muted-foreground">
              Designed for doctors and developers building modern healthcare
              apps.
            </p>
            <Button asChild>
              <Link to="/search">Start searching</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
