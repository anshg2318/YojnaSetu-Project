export type Profile = { name: string; state: string; category: string; age: string; income: string };
export const sampleProfile: Profile = { name: "Ram Kumar", state: "Uttar Pradesh", category: "OBC / Farmer", age: "42", income: "250000" };
export function maskAadhaar(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 12 ? `•••• •••• ${digits.slice(-4)}` : "•••• •••• ••••";
}
export const schemes = [
  { id: "pm-kisan", name: "PM-Kisan Samman Nidhi", hindi: "पीएम-किसान सम्मान निधि", benefit: "₹6,000", unit: "per year", unitHi: "प्रति वर्ष", description: "Income support for eligible farmer families.", descriptionHi: "पात्र किसान परिवारों के लिए आर्थिक सहायता।", icon: "farmer" },
  { id: "ayushman", name: "Ayushman Bharat", hindi: "आयुष्मान भारत", benefit: "₹5 Lakh", unit: "health cover", unitHi: "स्वास्थ्य सुरक्षा", description: "Hospital care for eligible families.", descriptionHi: "पात्र परिवारों के लिए अस्पताल में इलाज।", icon: "health" },
  { id: "up-pension", name: "UP Shramik Pension", hindi: "यूपी श्रमिक पेंशन", benefit: "Pension", unit: "subject to scheme rules", unitHi: "योजना के नियमों के अनुसार", description: "Support for qualifying registered workers.", descriptionHi: "पात्र पंजीकृत श्रमिकों के लिए सहायता।", icon: "worker" },
] as const;
export type Scheme = (typeof schemes)[number];

export async function downloadDraft(profile: Profile, scheme: Scheme) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("YojnaSetu", 20, 25);
  doc.setFontSize(13);
  doc.text("APPLICATION DRAFT - NOT AN OFFICIAL FORM", 20, 37);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(scheme.name, 20, 49);
  const fields: [string, string][] = [["Full name", profile.name], ["State", profile.state], ["Category / occupation", profile.category], ["Age", profile.age], ["Annual income (INR)", profile.income]];
  fields.forEach(([label, value], index) => {
    const y = 67 + index * 25;
    doc.text(label, 20, y);
    doc.rect(20, y + 4, 170, 13);
    doc.text(doc.splitTextToSize(value.replace(/[^\x20-\x7E]/g, "?"), 160), 24, y + 13);
  });
  doc.text("Applicant signature: ______________________", 20, 215);
  doc.setFontSize(10);
  doc.text(doc.splitTextToSize("Independent, non-governmental student project. Sample matching is not an eligibility determination. Verify eligibility and use the scheme's official application process. No Aadhaar number is included. This PDF supports English text only.", 170), 20, 237);
  doc.save(`YojnaSetu-${scheme.id}-draft.pdf`);
}