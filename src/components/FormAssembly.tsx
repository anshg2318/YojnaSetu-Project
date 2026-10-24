import { useEffect, useRef, useState } from "react";
import { Check, Download, FileCheck2, LoaderCircle, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadDraft, type Profile, type Scheme } from "@/lib/welfare-demo";
import type { Lang } from "@/components/SiteHeader";
import { StateChips } from "@/components/StateChips";

const fields: { key: keyof Profile; en: string; hi: string }[] = [
  { key: "name", en: "Full name", hi: "पूरा नाम" }, { key: "state", en: "State", hi: "राज्य" },
  { key: "category", en: "Category / occupation", hi: "श्रेणी / व्यवसाय" }, { key: "age", en: "Age", hi: "उम्र" },
  { key: "income", en: "Annual income (₹)", hi: "वार्षिक आय (₹)" },
];

export function FormAssembly({ profile, setProfile, scheme, lang, speak }: { profile: Profile; setProfile: (p: Profile) => void; scheme: Scheme; lang: Lang; speak: (text: string) => void }) {
  const [filled, setFilled] = useState(0);
  const [assembling, setAssembling] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const en = lang === "en";
  const ready = filled === fields.length && !assembling;
  const valid = fields.every(({ key }) => profile[key].trim()) && Number(profile.age) > 0 && Number(profile.age) <= 120 && Number(profile.income) >= 0;
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);
  function assemble() {
    setError(""); setFilled(0); setAssembling(true);
    let index = 0;
    timer.current = setInterval(() => {
      index += 1; setFilled(index);
      if (index === fields.length) { if (timer.current) clearInterval(timer.current); setAssembling(false); }
    }, 350);
  }
  async function download() {
    setDownloading(true); setError("");
    try { await downloadDraft(profile, scheme); } catch { setError(en ? "Download failed. Please try again." : "डाउनलोड नहीं हुआ। फिर कोशिश करें।"); }
    finally { setDownloading(false); }
  }
  return <>
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <section>
        <div className="mb-5 flex items-center gap-3"><FileCheck2 className="size-6 text-success" /><h2 className="text-2xl font-bold text-primary">{en ? "Your information" : "आपके विवरण"}</h2></div>
        <p className="mb-5 text-muted-foreground">{en ? "Check your sample details before making the form." : "फ़ॉर्म बनाने से पहले नमूना विवरण जाँचें।"}</p>
        <div className="space-y-4">{fields.map(({ key, en: label, hi }) => key === "state" ? <StateChips key={key} value={profile.state} lang={lang} disabled={assembling} onChange={state => { setProfile({ ...profile, state }); setFilled(0); }} /> : <label key={key} className="block text-base font-semibold" htmlFor={`profile-${key}`}>
          {en ? label : hi}
          <input id={`profile-${key}`} value={profile[key]} disabled={assembling} type={key === "age" || key === "income" ? "number" : "text"} min={key === "age" ? 1 : 0} max={key === "age" ? 120 : undefined} maxLength={80} onChange={e => { setProfile({ ...profile, [key]: e.target.value }); setFilled(0); }} className="mt-1 block min-h-12 w-full rounded-md border border-input bg-card px-3 text-lg font-normal text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </label>)}</div>
        <Button size="lg" className="mt-6 h-auto min-h-14 w-full whitespace-normal text-lg font-bold" disabled={assembling || !valid} onClick={assemble}>{assembling ? <LoaderCircle className="animate-spin" /> : ready ? <Check /> : <FileCheck2 />}{assembling ? (en ? "Making your form…" : "फ़ॉर्म बन रहा है…") : (en ? "Make My Form" : "फ़ॉर्म तैयार करें")}</Button>
      </section>
      <section aria-label="Application draft preview" className="min-w-0">
        <div className="mb-3 text-sm text-muted-foreground">{en ? "Your form" : "आपका फ़ॉर्म"}</div>
        <div className="pdf-sheet border border-border bg-card p-5 shadow-sm sm:p-8">
          <div className="border-b-2 border-primary pb-4"><p className="font-display text-2xl font-bold text-primary">YojnaSetu <span className="text-secondary">/</span> योजनासेतु</p><p className="mt-1 font-bold">{scheme.name}</p><p className="mt-2 text-xs font-bold text-secondary">APPLICATION DRAFT · NOT AN OFFICIAL FORM</p></div>
          <p className="my-5 text-sm text-muted-foreground">{en ? "Your details" : "आपके विवरण"}</p>
          <div className="space-y-4">{fields.map(({ key, en: label, hi }, index) => <div key={key}><p className="mb-1 text-xs text-muted-foreground">{label} / {hi}</p><div className="flex min-h-11 items-center overflow-hidden border border-border px-3 text-base">{filled > index ? <span className="fill-value break-all">{profile[key]}</span> : <span className="text-muted-foreground">—</span>}</div></div>)}</div>
          <div className="mt-8 flex justify-between gap-4 border-t border-border pt-4 text-xs text-muted-foreground"><span>Applicant signature / हस्ताक्षर</span><span>________________</span></div>
          <p className="mt-5 text-sm text-muted-foreground">{en ? "This is a draft, not a submitted application. Check the scheme's rules and apply on its official website. The saved form is in English." : "यह केवल प्रारूप है, जमा किया हुआ आवेदन नहीं। योजना के नियम जाँचें और उसकी आधिकारिक वेबसाइट पर आवेदन करें। सहेजा गया फ़ॉर्म अंग्रेज़ी में है।"}</p>
        </div>
      </section>
    </div>
    <div className="mt-8 border-t border-border pt-6">
      <p aria-live="polite" className="mb-3 text-center font-semibold text-success">{ready ? (en ? "Your filled draft is ready." : "आपका भरा हुआ प्रारूप तैयार है।") : assembling ? (en ? `Filling ${filled} of 5 fields…` : `${filled} / 5 विवरण भरे जा रहे हैं…`) : ""}</p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row"><Button variant="success" size="lg" className="h-auto min-h-16 whitespace-normal px-6 text-xl font-bold" disabled={!ready || downloading} onClick={download}>{downloading ? <LoaderCircle className="animate-spin" /> : <Download />}{en ? "Download Filled PDF" : "भरा हुआ फ़ॉर्म डाउनलोड करें"}</Button><Button variant="outline" size="lg" className="h-auto min-h-16 whitespace-normal text-lg" onClick={() => speak(`${en ? "Application draft for" : "आवेदन का प्रारूप"} ${en ? scheme.name : scheme.hindi}. ${fields.map(f => `${en ? f.en : f.hi}: ${profile[f.key]}`).join(". ")}`)}><Volume2 />{en ? "Read Form Out Loud" : "फ़ॉर्म पढ़कर सुनाएं"}</Button></div>
      {error && <p role="alert" className="mt-3 text-center text-secondary">{error}</p>}
    </div>
  </>;
}