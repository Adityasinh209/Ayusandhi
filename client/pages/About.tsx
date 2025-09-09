import { Layout } from "@/components/site/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Search, Layers3, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <Layout>
      <section className="container py-10 md:py-12">
        <div className="max-w-2xl mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">About</h1>
          <p className="mt-2 text-muted-foreground">
            Ayusandhi bridges NAMASTE codes with ICD‑11 TM2 and modern biomedicine, enabling dual‑coding workflows for Ayush systems.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <BookOpen className="h-5 w-5 text-primary" /> Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm md:text-base">
              <p>
                A fast, standards‑aligned terminology service and UI that lets clinicians and developers search, map, and integrate terminology with confidence.
              </p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Dual coding: NAMASTE ⇄ ICD‑11 TM2</li>
                <li>Modern, accessible, mobile‑first interface</li>
                <li>Clean dialogs for detailed record inspection</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <ShieldCheck className="h-5 w-5 text-primary" /> Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base">
              <ul className="space-y-2">
                <li>
                  <Badge variant="secondary" className="mr-2">FHIR</Badge>
                  R4 Terminology Services
                </li>
                <li>India EHR Standards</li>
                <li>ABHA OAuth2.0 (authorization ready)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-3 mt-4 md:mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Search className="h-5 w-5 text-primary" /> Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>Instant search with debounced API calls.</p>
              <p>Code search with automatic detection.</p>
              <p>Rich details via Shadcn Dialogs.</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Layers3 className="h-5 w-5 text-primary" /> Get Started
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm md:text-base">
              <p className="text-muted-foreground">
                Explore the terminology catalog and open detailed records in a click.
              </p>
              <Button asChild>
                <Link to="/search" className="flex items-center gap-2">
                  <Search className="h-4 w-4" /> Start Searching
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
