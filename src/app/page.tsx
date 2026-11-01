import { Wizard } from "@/components/wizard/Wizard";
import { UiLocaleProvider } from "@/components/wizard/UiLocale";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      <UiLocaleProvider>
        <Wizard />
      </UiLocaleProvider>
    </main>
  );
}
