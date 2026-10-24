import { describe, expect, it } from "vitest";
import { maskAadhaar, sampleProfile, schemes } from "./welfare-demo";

describe("Sample privacy and benefits", () => {
  it("masks exactly the first eight Aadhaar digits", () => {
    expect(maskAadhaar("1234 5678 9012")).toBe("•••• •••• 9012");
    expect(maskAadhaar("123456789012")).not.toContain("12345678");
  });
  it("does not reveal malformed identifiers", () => {
    expect(maskAadhaar("1234567")).toBe("•••• •••• ••••");
  });
  it("uses the requested fictional applicant", () => {
    expect(sampleProfile).toEqual({ name: "Ram Kumar", state: "Uttar Pradesh", category: "OBC / Farmer", age: "42", income: "250000" });
  });
  it("shows the requested PM-Kisan annual benefit", () => {
    expect(schemes.find(scheme => scheme.id === "pm-kisan")).toMatchObject({ benefit: "₹6,000", unit: "per year" });
  });
  it("shows the requested Ayushman health cover", () => {
    expect(schemes.find(scheme => scheme.id === "ayushman")).toMatchObject({ benefit: "₹5 Lakh", unit: "health cover" });
  });
});