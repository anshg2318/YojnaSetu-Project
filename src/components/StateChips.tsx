import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lang } from "@/components/SiteHeader";

const states = [
  ["Andhra Pradesh", "आंध्र प्रदेश"], ["Arunachal Pradesh", "अरुणाचल प्रदेश"], ["Assam", "असम"], ["Bihar", "बिहार"], ["Chhattisgarh", "छत्तीसगढ़"], ["Goa", "गोवा"], ["Gujarat", "गुजरात"], ["Haryana", "हरियाणा"], ["Himachal Pradesh", "हिमाचल प्रदेश"], ["Jharkhand", "झारखंड"], ["Karnataka", "कर्नाटक"], ["Kerala", "केरल"], ["Madhya Pradesh", "मध्य प्रदेश"], ["Maharashtra", "महाराष्ट्र"], ["Manipur", "मणिपुर"], ["Meghalaya", "मेघालय"], ["Mizoram", "मिज़ोरम"], ["Nagaland", "नागालैंड"], ["Odisha", "ओडिशा"], ["Punjab", "पंजाब"], ["Rajasthan", "राजस्थान"], ["Sikkim", "सिक्किम"], ["Tamil Nadu", "तमिलनाडु"], ["Telangana", "तेलंगाना"], ["Tripura", "त्रिपुरा"], ["Uttar Pradesh", "उत्तर प्रदेश"], ["Uttarakhand", "उत्तराखंड"], ["West Bengal", "पश्चिम बंगाल"], ["Andaman and Nicobar Islands", "अंडमान और निकोबार द्वीपसमूह"], ["Chandigarh", "चंडीगढ़"], ["Dadra and Nagar Haveli and Daman and Diu", "दादरा और नगर हवेली और दमन और दीव"], ["Delhi", "दिल्ली"], ["Jammu and Kashmir", "जम्मू और कश्मीर"], ["Ladakh", "लद्दाख"], ["Lakshadweep", "लक्षद्वीप"], ["Puducherry", "पुदुच्चेरी"],
] as const;

export function StateChips({ value, onChange, lang, disabled }: { value: string; onChange: (value: string) => void; lang: Lang; disabled?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const en = lang === "en";
  const visible = expanded ? states : states.filter(([name]) => name === value || ["Uttar Pradesh", "Bihar", "Delhi"].includes(name));
  return <fieldset disabled={disabled}>
    <legend className="mb-2 text-base font-semibold">{en ? "State" : "राज्य"}</legend>
    <div className="flex flex-wrap gap-2" role="group" aria-label={en ? "Choose your state" : "अपना राज्य चुनें"}>
      {visible.map(([name, hi]) => <Button key={name} type="button" variant="outline" aria-pressed={value === name} disabled={disabled} onClick={() => onChange(name)} className={`h-auto min-h-12 max-w-full whitespace-normal border-2 px-3 py-2 text-left text-lg ${value === name ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "border-border"}`}>
        {value === name && <Check aria-hidden />}{en ? name : hi}
      </Button>)}
    </div>
    <Button type="button" disabled={disabled} variant="ghost" className="mt-2 min-h-12 whitespace-normal text-base" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? <ChevronUp /> : <ChevronDown />}{en ? expanded ? "Show fewer states" : "See all states" : expanded ? "कम राज्य दिखाएँ" : "सभी राज्य देखें"}</Button>
  </fieldset>;
}