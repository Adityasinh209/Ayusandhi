import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const BASE_URL = "https://namaste-te4u.onrender.com/api/v1/terminology";

function useDebounced<T>(value: T, delay = 400) {
  const [v, setV] = useState(value);
  useMemo(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

function normalizeResults(json: any): any[] {
  if (!json) return [];
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.results)) return json.results;
  if (Array.isArray(json?.data)) return json.data;
  return [];
}

function getVal(obj: any, keys: string[], fallback = "–") {
  for (const k of keys) {
    const parts = k.split(".");
    let cur: any = obj;
    let ok = true;
    for (const p of parts) {
      if (cur && p in cur) cur = cur[p];
      else {
        ok = false;
        break;
      }
    }
    if (ok && cur != null && cur !== "") return cur;
  }
  return fallback;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const q = useDebounced(query.trim(), 350);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["search", q],
    enabled: q.length > 0,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const items = normalizeResults(data);

  return (
    <Layout>
      <section className="container py-10 md:py-12">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold">Search Terminology</h1>
          <p className="text-muted-foreground mt-2">
            Search NAMASTE and ICD‑11 TM2 terms. Start typing to see results.
          </p>
        </div>
        <div className="mt-6 max-w-3xl">
          <Label htmlFor="q" className="sr-only">Search</Label>
          <Input
            id="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search NAMASTE / ICD terms…"
            className="h-12 text-base"
          />
        </div>

        <div className="mt-6">
          {q.length === 0 && (
            <p className="text-muted-foreground">Type a term to begin searching.</p>
          )}
          {isError && (
            <p className="text-destructive">There was an error fetching results.</p>
          )}
          {isFetching && q.length > 0 && (
            <p className="text-muted-foreground">Searching…</p>
          )}

          {q.length > 0 && !isFetching && items.length === 0 && (
            <p className="text-muted-foreground">No matches found.</p>
          )}

          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any, idx: number) => {
              const displayName = getVal(item, [
                "displayName",
                "display_name",
                "name",
                "title",
              ]);
              const englishName = getVal(item, [
                "englishName",
                "english_name",
                "en",
                "labels.en",
              ], "");
              const hindiName = getVal(item, [
                "hindiName",
                "hindi_name",
                "hi",
                "labels.hi",
              ], "");
              const synonymsRaw = getVal(item, [
                "synonyms",
                "syns",
                "altLabels",
                "alt_labels",
              ], [] as any);
              const synonyms = Array.isArray(synonymsRaw)
                ? synonymsRaw.join(", ")
                : (typeof synonymsRaw === "string" ? synonymsRaw : "");
              const code = getVal(item, [
                "namasteCode",
                "namaste_code",
                "code",
                "id",
              ]);

              return (
                <Card key={idx} className="border hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-base line-clamp-2">{displayName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {englishName && (
                      <div>
                        <p className="text-muted-foreground">English</p>
                        <p className="font-medium">{englishName}</p>
                      </div>
                    )}
                    {hindiName && (
                      <div>
                        <p className="text-muted-foreground">Hindi</p>
                        <p className="font-medium">{hindiName}</p>
                      </div>
                    )}
                    {synonyms && (
                      <div>
                        <p className="text-muted-foreground">Synonyms</p>
                        <p className="font-medium line-clamp-3" title={synonyms}>{synonyms}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-muted-foreground">NAMASTE Code</p>
                      <p className="font-semibold text-primary">{code}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
