import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const BASE_URL = "https://namaste-te4u.onrender.com/api/v1/terminology";

function getVal(obj: any, keys: string[], fallback: any = "–") {
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
        {Array.isArray(value)
          ? value.join(", ")
          : typeof value === "object"
          ? JSON.stringify(value)
          : String(value)}
      </div>
    </div>
  );
}

export default function LookupPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  function normalizeCode(s: string) {
    const raw = s.trim();
    return { raw, upper: raw.toUpperCase(), stripped: raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase() };
  }

  function extractCode(obj: any): string | null {
    const c = getVal(obj, ["namasteCode", "namaste_code", "code", "id", "Code", "CODE"], null);
    return typeof c === "string" ? c : null;
  }

  function flattenStrings(obj: any, depth = 0): string[] {
    if (depth > 3 || obj == null) return [];
    if (typeof obj === "string") return [obj];
    if (Array.isArray(obj)) return obj.flatMap((v) => flattenStrings(v, depth + 1));
    if (typeof obj === "object") return Object.values(obj).flatMap((v) => flattenStrings(v, depth + 1));
    return [];
  }

  function pickByCode(results: any[], input: string) {
    const n = normalizeCode(input);
    for (const it of results) {
      const c = extractCode(it);
      if (c) {
        const cn = normalizeCode(String(c));
        if (cn.upper === n.upper || cn.stripped === n.stripped) return it;
      }
      const strings = flattenStrings(it);
      for (const s of strings) {
        const sn = normalizeCode(String(s));
        if (sn.upper === n.upper || sn.stripped === n.stripped) return it;
      }
    }
    return results[0] ?? null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = normalizeCode(code);
    if (!n.raw) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      let res = await fetch(`${BASE_URL}/lookup/${encodeURIComponent(n.upper)}`);
      let json = await res.json().catch(() => null);
      if (!res.ok || !json) {
        const s = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(n.upper)}`);
        const sJson = await s.json().catch(() => null);
        const arr = Array.isArray(sJson) ? sJson : Array.isArray(sJson?.results) ? sJson.results : Array.isArray(sJson?.data) ? sJson.data : [];
        const picked = pickByCode(arr, n.upper);
        if (picked) setData(picked); else setError(json?.error || "Code not found");
      } else {
        setData(json);
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  const displayName = data && getVal(data, ["displayName", "display_name", "name", "title"], "–");
  const englishName = data && getVal(data, ["englishName", "english_name", "en", "labels.en"], "");
  const hindiName = data && getVal(data, ["hindiName", "hindi_name", "hi", "labels.hi"], "");
  const synonymsRaw = data && getVal(data, ["synonyms", "syns", "altLabels", "alt_labels"], []);
  const synonyms = Array.isArray(synonymsRaw) ? synonymsRaw.join(", ") : typeof synonymsRaw === "string" ? synonymsRaw : "";
  const codeVal = data && getVal(data, ["namasteCode", "namaste_code", "code", "id"], "–");

  const shownKeys = new Set(["displayName", "display_name", "name", "title", "englishName", "english_name", "en", "labels", "hindiName", "hindi_name", "hi", "synonyms", "syns", "altLabels", "alt_labels", "namasteCode", "namaste_code", "code", "id"]);
  const extraEntries = data
    ? Object.entries(data as Record<string, any>).filter(([k]) => !shownKeys.has(k))
    : [];

  return (
    <Layout>
      <section className="container py-10 md:py-12">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold">Lookup</h1>
          <p className="text-muted-foreground mt-2">Enter a NAMASTE code to view the full record.</p>
        </div>

        <div className="mt-6 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lookup by Code</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={onSubmit}>
                <Label htmlFor="code" className="sr-only">Code</Label>
                <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter NAMASTE code (e.g., NAMASTE1234)" className="h-12 text-base" />
                <Button type="submit" disabled={loading}>{loading ? "Looking…" : "Lookup"}</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="mt-6 max-w-3xl">
            <Card className="border-destructive/30">
              <CardContent className="p-6 text-destructive">{error}</CardContent>
            </Card>
          </div>
        )}

        {data && (
          <div className="mt-6 max-w-3xl">
            <Card className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-lg">{displayName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Entry label="English Name" value={englishName || "–"} />
                    <Entry label="Hindi Name" value={hindiName || "–"} />
                    <Entry label="Synonyms" value={synonyms || "–"} />
                  </div>
                  <div className="space-y-2">
                    <Entry label="NAMASTE Code" value={codeVal} />
                  </div>
                </div>
                {extraEntries.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">Additional Metadata</h3>
                    <div className="divide-y mt-2">
                      {extraEntries.map(([k, v]) => (
                        <Entry key={k} label={k} value={v} />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </Layout>
  );
}
