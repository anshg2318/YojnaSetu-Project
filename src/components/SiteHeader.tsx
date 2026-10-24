import { BadgeCheck, Landmark, Volume2, VolumeX } from "lucide-react";

export type Lang = "en" | "hi";

export function SiteHeader({
  lang,
  setLang,
  audio,
  setAudio,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  audio: boolean;
  setAudio: (a: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-20 bg-card shadow-sm">
      <div className="tricolor h-2 w-full" aria-hidden />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <a href="/" className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Landmark className="h-8 w-8" aria-hidden />
          </span>
          <span className="flex flex-col">
            <span className="font-display text-2xl font-extrabold leading-tight text-primary">
              YojnaSetu <span className="text-secondary">|</span> योजनासेतु
            </span>
            <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-sm font-semibold text-success">
              <BadgeCheck className="h-4 w-4" aria-hidden />
              भारत सरकार सेवा संगत (Govt Schemes Portal)
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <div role="group" aria-label="Language / भाषा" className="flex h-[60px] rounded-2xl border-2 border-primary p-1">
            {(["en", "hi"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-xl px-4 text-lg font-bold transition-colors ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-primary hover:bg-muted"
                }`}
              >
                {l === "en" ? "English" : "हिंदी"}
              </button>
            ))}
          </div>
          <button
            onClick={() => setAudio(!audio)}
            aria-pressed={audio}
            className={`flex h-[60px] items-center gap-2 rounded-2xl px-4 text-lg font-bold transition-colors ${
              audio ? "bg-secondary text-secondary-foreground" : "border-2 border-secondary text-secondary hover:bg-accent"
            }`}
          >
            {audio ? <Volume2 className="h-6 w-6" aria-hidden /> : <VolumeX className="h-6 w-6" aria-hidden />}
            <span className="flex flex-col text-left leading-tight">
              <span>Audio Help</span>
              <span className="text-sm">आवाज़ सहायता</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
