import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Search } from "lucide-react";
import { SiteHeader, type Lang } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YojnaSetu | योजनासेतु — Find Government Schemes" },
      { name: "description", content: "Discover welfare schemes you qualify for and fill forms easily, in Hindi and English." },
      { property: "og:title", content: "YojnaSetu | योजनासेतु" },
      { property: "og:description", content: "Easy government welfare scheme discovery and form filling for every Indian." },
    ],
  }),
  component: Index,
});

function speak(text: string, on: boolean) {
  if (!on || typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "hi-IN";
  window.speechSynthesis.speak(u);
}

function Index() {
  const [lang, setLang] = useState<Lang>("hi");
  const [audio, setAudio] = useState(false);
  const t = (en: string, hi: string) => (lang === "en" ? [en, hi] : [hi, en]);
  const [h1a, h1b] = t("Find schemes made for you", "आपके लिए बनी योजनाएँ खोजें");

  const actions = [
    { icon: Search, en: "Check my eligibility", hi: "मेरी पात्रता जाँचें", cls: "bg-secondary text-secondary-foreground" },
    { icon: FileText, en: "Fill a form", hi: "फ़ॉर्म भरें", cls: "bg-primary text-primary-foreground" },
  ];

  return (
    <>
      <SiteHeader lang={lang} setLang={setLang} audio={audio} setAudio={setAudio} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-extrabold text-primary">{h1a}</h1>
        <p className="mt-1 text-2xl font-semibold text-muted-foreground">{h1b}</p>
        <div className="mt-8 grid gap-4">
          {actions.map((a) => {
            const [x, y] = t(a.en, a.hi);
            return (
              <button
                key={a.en}
                onClick={() => speak(a.hi, audio)}
                className={`flex min-h-16 items-center gap-4 rounded-2xl px-6 py-3 text-left shadow-md transition-transform active:scale-[0.98] ${a.cls}`}
              >
                <a.icon className="h-8 w-8 shrink-0" aria-hidden />
                <span className="flex flex-col">
                  <span className="text-xl font-bold">{x}</span>
                  <span className="text-lg opacity-90">{y}</span>
                </span>
              </button>
            );
          })}
        </div>
      </main>
    </>
  );
}
