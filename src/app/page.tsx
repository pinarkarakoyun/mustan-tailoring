import { Button } from "@/components/ui/Button";

// Temporary placeholder page for step 1 (project setup).
// In step 2 this is replaced by the real, translated home page.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-8 px-5 py-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Kledingreparatie Mustan</h1>
        <p className="text-muted">Prototype — design basics</p>
      </div>

      <div className="flex flex-col gap-4">
        <Button>Primary button</Button>
        <Button variant="secondary">Secondary button</Button>
      </div>
    </main>
  );
}
