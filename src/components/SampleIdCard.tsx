import { ShieldCheck, UserRound } from "lucide-react";
import portrait from "@/assets/sample-portrait.jpg";
import { maskAadhaar } from "@/lib/welfare-demo";

export function SampleIdCard() {
  return (
    <div className="scan-viewport mx-auto w-full max-w-lg p-5 sm:p-8">
      <span className="scan-corner top-left" /><span className="scan-corner top-right" />
      <span className="scan-corner bottom-left" /><span className="scan-corner bottom-right" />
      <div className="sample-id relative overflow-hidden rounded-lg border border-border bg-card text-foreground shadow-sm">
        <div className="tricolor h-1" />
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
          <span className="font-bold text-primary">पहचान / Identity</span>
          <span className="text-xs font-bold text-secondary">SAMPLE · NOT VALID</span>
        </div>
        <div className="flex items-center gap-4 px-4 py-5">
          <img src={portrait} alt="Fictional sample applicant Ram Kumar" width={512} height={512} className="h-24 w-20 shrink-0 rounded-sm object-cover" />
          <div className="min-w-0 text-sm leading-relaxed">
            <p className="text-lg font-bold">राम कुमार / Ram Kumar</p>
            <p>Age / उम्र: 42</p><p>Uttar Pradesh</p><p className="text-muted-foreground">Fictional Aadhaar preview</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 border-t border-border px-3 py-4">
          <UserRound className="size-5 text-primary" />
          <span className="aadhaar-mask rounded bg-mask px-4 py-2 font-mono text-xl font-bold text-mask-foreground" aria-label="First eight digits masked; last four 1234">{maskAadhaar("000000001234")}</span>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 text-center text-sm font-bold text-success"><ShieldCheck className="size-5 shrink-0" /><span>On-Device Privacy Masked<br />आपका आधार नंबर सुरक्षित है</span></div>
    </div>
  );
}