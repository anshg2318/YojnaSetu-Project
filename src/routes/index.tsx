import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, type Lang } from "@/components/SiteHeader";
import { WelfareWizard } from "@/components/WelfareWizard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YojnaSetu | योजनासेतु — Find Government Schemes" },
      { name: "description", content: "An independent student-built welfare guide with a bilingual sample discovery journey and downloadable application drafts." },
      { property: "og:title", content: "YojnaSetu | योजनासेतु" },
      { property: "og:description", content: "Explore sample welfare matches and assemble application drafts in an independent, non-governmental guide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [lang, setLang] = useState<Lang>("hi");
  const [audio, setAudio] = useState(false);

  return (
    <>
      <SiteHeader lang={lang} setLang={setLang} audio={audio} setAudio={setAudio} />
      <WelfareWizard lang={lang} audio={audio} />
    </>
  );
}
