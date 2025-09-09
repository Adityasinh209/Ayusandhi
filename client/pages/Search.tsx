import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const BASE_URL = "https://namaste-te4u.onrender.com/api/v1/terminology";

function useDebounced<T>(value: T, delay = 400) {
  const [v, setV] = useState(value);
  useEffect(() => {
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

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const q = useDebounced(query.trim(), 350);
  const qLower = q.toLowerCase();
  const looksLikeCode = qLower.startsWith("namaste");

  const { data, isFetching, isError } = useQuery({
    queryKey: ["search", q],
    enabled: q.length > 0,
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/search?query=${encodeURIComponent(q)}`,
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const items = normalizeResults(data);

  const [isSugOpen, setIsSugOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [fallbackRecord, setFallbackRecord] = useState<any | null>(null);

  const codeSuggest = useQuery({
    queryKey: ["lookup_suggest", qLower],
    enabled: looksLikeCode,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/lookup/${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const selectedLookup = useQuery({
    queryKey: ["lookup", selectedCode],
    enabled: open && !!selectedCode,
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/lookup/${encodeURIComponent(selectedCode!)}`,
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const openDetails = (code?: string, record?: any) => {
    if (code) setSelectedCode(code);
    else setSelectedCode(null);
    setFallbackRecord(record ?? null);
    setOpen(true);
  };

  const closeDetails = () => {
    setOpen(false);
    setSelectedCode(null);
    setFallbackRecord(null);
  };

  const selectedRecord = selectedLookup.data ?? fallbackRecord ?? null;

  const suggestions = items.slice(0, 8);

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
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Search Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="q" className="sr-only">Search</Label>
              <Input
                id="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search NAMASTE / ICD terms or code…"
                className="h-12 text-base"
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          {q.length === 0 && (
            <p className="text-muted-foreground">
              Type a term to begin searching. You can also paste a NAMASTE code.
            </p>
          )}
          {isError && (
            <p className="text-destructive">
              There was an error fetching results.
            </p>
          )}
          {isFetching && q.length > 0 && (
            <p className="text-muted-foreground">Searching…</p>
          )}

          {looksLikeCode && codeSuggest.data && (
            <div className="mb-4 max-w-3xl">
              <Card
                className="border ring-1 ring-primary/20 cursor-pointer hover:shadow-md transition"
                onClick={() => openDetails(q)}
              >
                <CardHeader>
                  <CardTitle className="text-base">Code match: {q}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Open details for {q}
                </CardContent>
              </Card>
            </div>
          )}

          {q.length > 0 &&
            !isFetching &&
            items.length === 0 &&
            !codeSuggest.data && (
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
              const englishName = getVal(
                item,
                ["englishName", "english_name", "en", "labels.en"],
                "",
              );
              const hindiName = getVal(
                item,
                ["hindiName", "hindi_name", "hi", "labels.hi"],
                "",
              );
              const synonymsRaw = getVal(
                item,
                ["synonyms", "syns", "altLabels", "alt_labels"],
                [] as any,
              );
              const synonyms = Array.isArray(synonymsRaw)
                ? synonymsRaw.join(", ")
                : typeof synonymsRaw === "string"
                  ? synonymsRaw
                  : "";
              const code = getVal(item, [
                "namasteCode",
                "namaste_code",
                "code",
                "id",
              ]);

              return (
                <Card
                  key={idx}
                  className="border hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() =>
                    openDetails(
                      typeof code === "string" ? code : undefined,
                      item,
                    )
                  }
                >
                  <CardHeader>
                    <CardTitle className="text-base line-clamp-2">
                      {displayName}
                    </CardTitle>
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
                        <p
                          className="font-medium line-clamp-3"
                          title={synonyms}
                        >
                          {synonyms}
                        </p>
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

      <Dialog
        open={open}
        onOpenChange={(v) => (v ? setOpen(true) : closeDetails())}
      >
        <DialogContent className="max-w-md sm:max-w-lg md:max-w-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terminology Details</DialogTitle>
            <DialogDescription>Structured record view</DialogDescription>
          </DialogHeader>
          <div className="divide-y">
            {selectedCode && selectedLookup.isLoading && (
              <p className="text-muted-foreground py-2">Loading…</p>
            )}
            {selectedCode && selectedLookup.isError && (
              <p className="text-destructive py-2">Failed to load details.</p>
            )}
            {!selectedCode && !selectedRecord && (
              <p className="text-muted-foreground py-2">
                No details available.
              </p>
            )}
            {selectedRecord &&
              Object.entries(selectedRecord as Record<string, any>).map(
                ([k, v]) => <Entry key={k} label={k} value={v} />,
              )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
