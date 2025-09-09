import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BASE_URL = "https://namaste-te4u.onrender.com/api/v1/terminology";

function Entry({ label, value }: { label: string; value: any }) {
  return (
    <div className="grid grid-cols-3 gap-2 py-2">
      <div className="col-span-1 text-sm text-muted-foreground">{label}</div>
      <div className="col-span-2 break-words font-medium text-sm">
        {typeof value === "object" ? JSON.stringify(value) : String(value)}
      </div>
    </div>
  );
}

export default function LookupPage() {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState("");

  const { data, isFetching, isError } = useQuery({
    queryKey: ["lookup", submitted],
    enabled: submitted.length > 0,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/lookup/${encodeURIComponent(submitted)}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const record = data ?? null;

  return (
    <Layout>
      <section className="container py-10 md:py-12 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold">Lookup by NAMASTE Code</h1>
        <p className="text-muted-foreground mt-2">
          Enter a NAMASTE code (e.g., NAMASTE1234) to retrieve detailed information.
        </p>

        <form
          className="mt-6 flex flex-col sm:flex-row gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(code.trim());
          }}
        >
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., NAMASTE1234"
            className="h-12 text-base"
          />
          <Button type="submit" className="h-12">Lookup</Button>
        </form>

        <div className="mt-6">
          {submitted.length === 0 && (
            <p className="text-muted-foreground">Submit a code to view details.</p>
          )}
          {isError && (
            <p className="text-destructive">There was an error fetching the record.</p>
          )}
          {isFetching && submitted.length > 0 && (
            <p className="text-muted-foreground">Loading…</p>
          )}

          {submitted && !isFetching && record && (
            <Card className="border">
              <CardHeader>
                <CardTitle>Record</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {Object.entries(record as Record<string, any>).map(([k, v]) => (
                    <Entry key={k} label={k} value={v} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {submitted && !isFetching && !record && (
            <p className="text-muted-foreground">No record found.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
