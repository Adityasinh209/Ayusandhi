import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export function LookupQuick() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  async function onLookup(c?: string) {
    const value = (c ?? code).trim();
    if (!value) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(`${BASE_URL}/lookup/${encodeURIComponent(value)}`);
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setError(json?.error || "Code not found");
      } else {
        setData(json);
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setCode(""); setError(null); setData(null);} }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Lookup by Code</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg md:max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lookup by Code</DialogTitle>
          <DialogDescription>Enter a NAMASTE code to view full details.</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col sm:flex-row gap-2"
          onSubmit={(e) => { e.preventDefault(); onLookup(); }}
        >
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter NAMASTE code (e.g., NAMASTE1234)"
            className="h-12 text-base"
          />
          <Button type="submit" disabled={loading}>{loading ? "Opening…" : "Open Details"}</Button>
        </form>
        <div className="mt-4 divide-y">
          {error && <p className="text-destructive py-2">{error}</p>}
          {data && Object.entries(data as Record<string, any>).map(([k, v]) => (
            <Entry key={k} label={k} value={v} />
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
