import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Camera, Check, CheckCheck, ChevronRight, FileText, HeartPulse, Leaf, Mic, ShieldCheck, Sparkles, Upload, Users, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SampleIdCard } from "@/components/SampleIdCard";
import { FormAssembly } from "@/components/FormAssembly";
import { sampleProfile, schemes, type Scheme } from "@/lib/welfare-demo";
import type { Lang } from "@/components/SiteHeader";

const steps = [{ en: "Choose a start", hi: "शुरुआत चुनें", icon: Mic }, { en: "Card Scan", hi: "कार्ड जांच", icon: ShieldCheck }, { en: "Scheme Check", hi: "योजना जांच", icon: Sparkles }, { en: "Get your form", hi: "फ़ॉर्म पाएँ", icon: FileText }];
const instructions = [
  { en: "Tap the orange microphone to try a sample voice recording, or tap Try a sample ID to see a card. This is a practice journey; your card is not sent or saved.", hi: "आवाज़ का नमूना सुनने के लिए नारंगी माइक दबाएँ। या नमूना पहचान पत्र देखें दबाएँ। यह अभ्यास है। आपका कार्ड भेजा या सहेजा नहीं जाता।" },
  { en: "Check the name, state and age on this sample card. The Aadhaar number is hidden. Tap Confirm and Find Schemes to continue.", hi: "नमूना कार्ड पर नाम, राज्य और उम्र जाँचें। आधार नंबर छिपा हुआ है। आगे बढ़ने के लिए पुष्टि करें और योजनाएँ खोजें दबाएँ।" },
  { en: "These are three sample schemes, not confirmed benefits. Read each benefit, then tap Auto-Fill Form Draft on the scheme you want.", hi: "ये तीन नमूना योजनाएँ हैं। लाभ मिलने की पुष्टि नहीं है। हर योजना का लाभ देखें। अपनी पसंद की योजना पर फ़ॉर्म का प्रारूप भरें दबाएँ।" },
  { en: "Check your name and tap your state. Fill your age and yearly income. Tap Make My Form, then Download Filled PDF. This is only a draft; apply through the scheme's official website.", hi: "अपना नाम जाँचें और अपना राज्य चुनें। उम्र और साल की आय भरें। फ़ॉर्म तैयार करें दबाएँ। फिर भरा हुआ फ़ॉर्म डाउनलोड करें दबाएँ। यह केवल प्रारूप है। आवेदन योजना की आधिकारिक वेबसाइट पर करें।" },
];

export function WelfareWizard({ lang, audio }: { lang: Lang; audio: boolean }) {
  const [step, setStep] = useState(1);
  const [recording, setRecording] = useState(false);
  const [transcribed, setTranscribed] = useState(false);
  const [profile, setProfile] = useState({ ...sampleProfile });
  const [scheme, setScheme] = useState<Scheme>(schemes[0]);
  const [notice, setNotice] = useState("");
  const [fileName, setFileName] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const en = lang === "en";
  const t = (english: string, hindi: string) => en ? english : hindi;
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => { if (step > 1) heading.current?.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: "instant" }); }, [step]);
  function speak(text: string) {
    if (!window.speechSynthesis) { setNotice(t("Audio isn't available in this browser.", "इस ब्राउज़र में आवाज़ उपलब्ध नहीं है।")); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text); utterance.lang = en ? "en-IN" : "hi-IN";
    window.speechSynthesis.speak(utterance);
  }
  function next(value: number) { const target = steps[value - 1]; if (!target) return; setNotice(""); setStep(value); if (audio) speak(t(target.en, target.hi)); }
  function record() {
    if (timer.current) clearTimeout(timer.current);
    if (recording) { setRecording(false); setTranscribed(true); return; }
    setRecording(true); setTranscribed(false);
    if (audio) speak(t("Listening. This is a sample voice preview.", "सुन रहे हैं। यह आवाज़ का नमूना है।"));
    timer.current = setTimeout(() => { setRecording(false); setTranscribed(true); }, 2200);
  }
  const title = step === 1 ? t("Namaste!", "नमस्ते!") : step === 2 ? t("Your privacy comes first.", "आपकी गोपनीयता सबसे पहले।") : step === 3 ? t("3 Schemes Found For You!", "आपके लिए ३ योजनाएं उपलब्ध हैं") : t("Your form, made simpler.", "आपका फ़ॉर्म, अब आसान।");
  return <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-7 sm:px-6 sm:pt-9">
    <nav aria-label="Welfare journey progress" className="mx-auto mb-8 max-w-4xl">
      <ol className="grid grid-cols-4">{steps.map(({ en: label, hi, icon: Icon }, index) => <li key={label} aria-current={step === index + 1 ? "step" : undefined} className="step-item relative flex flex-col items-center gap-2 text-center">
        <div className={`relative z-10 flex size-12 items-center justify-center rounded-full border-2 text-xl font-bold sm:size-14 sm:text-2xl ${step === index + 1 ? "border-secondary bg-secondary text-secondary-foreground ring-4 ring-secondary/10" : step > index + 1 ? "border-success bg-success text-success-foreground" : "border-border bg-background text-muted-foreground"}`}>{step > index + 1 ? <Check className="size-6" /> : index + 1}</div>
        <span className={`flex items-center justify-center gap-1.5 text-xs font-semibold sm:text-base ${step === index + 1 ? "text-primary" : "text-muted-foreground"}`}><Icon className="hidden size-4 sm:block" />{t(label, hi)}</span>
      </li>)}</ol>
    </nav>
    <div className="mb-7 flex items-center justify-between gap-4 text-sm">
      {step > 1 ? <Button variant="ghost" onClick={() => next(step - 1)} className="min-h-11 text-base"><ArrowLeft />{t("Back", "पीछे")}</Button> : <span className="flex items-center gap-2 text-success"><ShieldCheck className="size-4" />{t("Your details stay safe", "आपकी जानकारी सुरक्षित")}</span>}
      <span className="text-muted-foreground">{t("Step", "चरण")} <strong className="text-primary">{step}</strong> / 4</span>
    </div>
    <div className="mb-8 text-center"><h1 ref={heading} tabIndex={-1} className="scroll-mt-52 font-display text-3xl font-extrabold text-primary outline-none sm:text-4xl">{title}</h1>
      <p className="mt-2 text-xl text-muted-foreground">{step === 1 ? t("Find welfare schemes meant for your family.", "अपने परिवार के लिए सरकारी योजनाएं खोजें।") : step === 2 ? t("Check the sample details. Your ID stays with you.", "नमूना विवरण जाँचें। आपका पहचान पत्र आपके पास रहता है।") : step === 3 ? t("A little support can make a big difference.", "थोड़ी सी मदद, बड़ा बदलाव।") : t("Check your details, make your form and save a copy.", "विवरण जाँचें, फ़ॉर्म बनाएँ और एक प्रति सहेजें।")}</p>
      {step === 1 && <p className="mt-1 text-base text-muted-foreground">{t("नमस्ते! अपने परिवार के लिए सरकारी योजनाएं खोजें।", "Namaste! Find welfare schemes meant for your family.")}</p>}
    </div>
    {step === 1 && <>
      <div className="grid items-stretch gap-6 md:grid-cols-2">
        <section className="voice-card flex flex-col items-center rounded-lg border-2 border-secondary/60 bg-card px-5 py-8 text-center sm:px-8">
          <span className="mb-6 text-xs font-bold uppercase text-secondary">{t("Start with your voice", "अपनी आवाज़ से शुरू करें")}</span>
          <Button onClick={record} aria-label={t(recording ? "Stop sample recording" : "Speak in Your Language", recording ? "नमूना रिकॉर्डिंग रोकें" : "अपनी भाषा में बोलें")} variant="secondary" className={`mic-button size-20 shrink-0 rounded-full p-0 [&_svg]:size-9 ${recording ? "recording" : ""}`}><Mic /></Button>
          <h2 className="mt-6 text-2xl font-bold text-primary">{t("Speak in Your Language", "अपनी भाषा में बोलें")}</h2>
          <p className="mt-1 text-base text-muted-foreground">{t("अपनी भाषा में बोलें", "Speak in Your Language")}</p>
          <p className="mt-4 max-w-sm text-lg">{t("Tap the mic and speak in Hindi, Bhojpuri, or English", "माइक दबाएँ और हिंदी, भोजपुरी या अंग्रेज़ी में बोलें")}</p>
          <div aria-live="polite" className="mt-5 min-h-16 w-full">
            {recording && <div className="flex flex-col items-center gap-2"><span className="voice-wave flex h-6 items-center gap-1" aria-hidden>{[1,2,3,4,5,6,7].map(i => <i key={i} />)}</span><span className="font-bold text-secondary">{t("Listening… (सुन रहे हैं)", "सुन रहे हैं… (Listening)")}</span></div>}
            {transcribed && <div className="flex flex-wrap justify-center gap-2">{[t("Farmer", "किसान"), t("Uttar Pradesh", "उत्तर प्रदेश"), t("₹2.5 Lakhs income", "₹2.5 लाख आय")].map(value => <span key={value} className="rounded-md bg-accent px-3 py-1 text-base font-semibold">{value}</span>)}</div>}
            {!recording && !transcribed && <span className="text-sm text-muted-foreground">{t("Sample voice preview · No microphone access", "आवाज़ का नमूना · माइक तक पहुँच नहीं")}</span>}
          </div>
          {transcribed && <Button onClick={() => next(2)} variant="success" className="mt-3 h-auto min-h-12 w-full whitespace-normal text-lg">{t("Continue with sample details", "नमूना विवरण के साथ आगे बढ़ें")}<ArrowRight /></Button>}
        </section>
        <section className="flex flex-col items-center rounded-lg border-2 border-primary/50 bg-card px-5 py-8 text-center sm:px-8">
          <span className="mb-6 text-xs font-bold uppercase text-primary">{t("Start with an ID card", "पहचान पत्र से शुरू करें")}</span>
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary"><Camera className="size-10" /></div>
          <h2 className="mt-6 text-2xl font-bold text-primary">{t("Scan Your ID Card", "पहचान पत्र स्कैन करें")}</h2>
          <p className="mt-1 text-base text-muted-foreground">{t("पहचान पत्र स्कैन करें", "Scan Your ID Card")}</p>
          <p className="mt-4 text-lg">{t("Aadhaar Card, Ration Card, or Voter ID", "आधार कार्ड, राशन कार्ड या मतदाता पहचान पत्र")}</p>
          <Button onClick={() => input.current?.click()} className="mt-7 h-auto min-h-14 w-full whitespace-normal text-lg font-bold"><Upload />{t("Open Camera / Upload", "कैमरा खोलें / अपलोड करें")}</Button>
          <input ref={input} type="file" accept="image/*" capture="environment" className="hidden" aria-label="Upload ID image" onChange={event => {
            const file = event.target.files?.[0]; if (!file) return;
            if (!file.type.startsWith("image/")) { setNotice(t("Choose an image file.", "एक तस्वीर चुनें।")); return; }
            if (file.size > 10 * 1024 * 1024) { setNotice(t("Choose an image smaller than 10 MB.", "10 MB से छोटी तस्वीर चुनें।")); return; }
            setFileName(file.name); event.target.value = ""; next(2);
          }} />
          <Button variant="link" onClick={() => { setFileName(""); next(2); }} className="mt-3 h-auto min-h-11 whitespace-normal text-base">{t("Try a sample ID instead", "नमूना पहचान पत्र देखें")}<ChevronRight /></Button>
          <p className="mt-4 text-sm text-muted-foreground">{t("Demo scan only. Images are never uploaded or stored.", "केवल नमूना स्कैन। तस्वीर भेजी या सहेजी नहीं जाती।")}</p>
        </section>
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" />{t("No ID stored", "पहचान पत्र सहेजा नहीं जाता")}</span><span className="flex items-center gap-2"><Volume2 className="size-4 text-secondary" />{t("Hindi & English audio help", "हिंदी और अंग्रेज़ी में आवाज़ सहायता")}</span><span className="flex items-center gap-2"><Users className="size-4 text-primary" />{t("An independent student project", "एक स्वतंत्र छात्र परियोजना")}</span></div>
    </>}
    {step === 2 && <>
      <div className="mb-6 break-words rounded-md bg-muted px-4 py-3 text-center text-base text-muted-foreground">{fileName ? t(`You chose ${fileName}. We have not read, sent or saved it. The card below is a sample.`, `आपने ${fileName} चुना है। इसे पढ़ा, भेजा या सहेजा नहीं गया है। नीचे नमूना कार्ड है।`) : t("Card Scan · This is a made-up sample card, not a scan of your ID.", "कार्ड जांच · यह नमूना कार्ड है, आपके पहचान पत्र की जांच नहीं।")}</div>
      <div className="grid items-center gap-8 md:grid-cols-2"><SampleIdCard /><section><h2 className="mb-5 text-2xl font-bold text-primary">{t("Extracted details · Sample", "निकाले गए विवरण · नमूना")}</h2><dl className="grid grid-cols-2 gap-3">{[[t("Full Name", "पूरा नाम"), profile.name], [t("State", "राज्य"), profile.state], [t("Category", "श्रेणी"), profile.category], [t("Age", "उम्र"), profile.age]].map(([label, value]) => <div key={label} className="rounded-md bg-muted p-4"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 break-words text-xl font-bold text-primary">{value}</dd></div>)}</dl><p className="mt-5 flex items-start gap-2 text-base text-success"><ShieldCheck className="mt-1 size-5 shrink-0" />{t("Only sample details are used. No Aadhaar number is saved or added to your form.", "केवल नमूना विवरण उपयोग होते हैं। आधार नंबर सहेजा या फ़ॉर्म में जोड़ा नहीं जाता।")}</p><Button variant="success" onClick={() => next(3)} className="mt-6 h-auto min-h-16 w-full whitespace-normal px-4 text-xl font-bold">{t("Confirm & Find Schemes", "पुष्टि करें और योजनाएँ खोजें")}<ArrowRight /></Button></section></div>
    </>}
    {step === 3 && <>
      <p className="mb-6 rounded-md bg-accent px-4 py-3 text-center text-base">{t("Scheme Check · These are examples, not confirmed benefits. Check each scheme's rules before applying.", "योजना जांच · ये नमूने हैं, लाभ मिलने की पुष्टि नहीं। आवेदन से पहले योजना के नियम जाँचें।")}</p>
      <div className="grid gap-5 lg:grid-cols-3">{schemes.map(item => { const Icon = item.icon === "farmer" ? Leaf : item.icon === "health" ? HeartPulse : Users; return <article key={item.id} className="flex flex-col rounded-lg border border-border bg-card p-6"><div className="mb-5 flex items-center justify-between gap-2"><span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-6" /></span><span className="flex items-center gap-1 rounded-md bg-success/10 px-2 py-1 text-xs font-bold text-success"><CheckCheck className="size-4" />{t("Eligible · Sample", "पात्र · नमूना")}</span></div><h2 className="text-2xl font-bold text-primary">{t(item.name, item.hindi)}</h2><p className="mt-1 text-sm text-muted-foreground">{t(item.hindi, item.name)}</p><div className="my-6"><p className="text-3xl font-bold text-success">{item.benefit}</p><p className="text-base text-muted-foreground">{t(item.unit, item.unitHi)}</p></div><p className="mb-6 text-lg">{t(item.description, item.descriptionHi)}</p><Button className="mt-auto h-auto min-h-16 w-full whitespace-normal px-3 py-3 text-lg font-bold" onClick={() => { setScheme(item); next(4); }}>{t("Auto-Fill Form Draft", "फ़ॉर्म का प्रारूप भरें")}<ArrowRight /></Button></article>; })}</div>
    </>}
    {step === 4 && <FormAssembly key={scheme.id} profile={profile} setProfile={setProfile} scheme={scheme} lang={lang} speak={speak} />}
    {notice && <p role="alert" className="mt-5 text-center text-secondary">{notice}</p>}
    <div className="audio-help-dock fixed bottom-0 right-0 z-30 flex justify-end p-3 sm:p-4">
      <Button className="h-auto min-h-16 max-w-full gap-3 whitespace-normal rounded-lg border-2 border-primary-foreground/40 px-4 py-3 text-left shadow-lg [&_svg]:size-7" onClick={() => { const help = instructions[step - 1]; if (help) speak(t(help.en, help.hi)); }} aria-label="Need help? Tap to hear instructions (मदद चाहिए? आवाज़ सुनें)">
        <Volume2 aria-hidden /><span className="flex min-w-0 flex-col"><span className="text-lg font-bold">{t("Need help?", "मदद चाहिए?")}</span><span className="text-sm">{t("Tap to hear instructions", "आवाज़ सुनें")}</span><span className="text-sm opacity-90">{t("मदद चाहिए? आवाज़ सुनें", "Need help? Tap to hear instructions")}</span></span>
      </Button>
    </div>
  </main>;
}