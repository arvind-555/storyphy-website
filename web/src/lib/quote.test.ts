import { describe, it, expect } from "vitest";
import { validateQuote, buildQuoteMessage, type QuoteInput } from "./quote";

const valid: QuoteInput = {
  school: "Sunflower Preschool",
  city: "Pune",
  contactName: "Vandana",
  role: "Coordinator",
  children: "25",
  occasion: "Graduation day",
  targetDate: "2026-12-10",
  phone: "+91 78921 29651",
  email: "school@example.com",
};

describe("validateQuote", () => {
  it("accepts a complete valid request", () => {
    expect(validateQuote(valid)).toEqual({});
  });
  it("requires school, city, contact name and phone", () => {
    const errors = validateQuote({ ...valid, school: "", city: " ", contactName: "", phone: "" });
    expect(Object.keys(errors).sort()).toEqual(["city", "contactName", "phone", "school"]);
  });
  it("rejects a malformed phone number", () => {
    expect(validateQuote({ ...valid, phone: "12345" }).phone).toBeTruthy();
  });
  it("accepts a phone with spaces, dashes and country code", () => {
    expect(validateQuote({ ...valid, phone: "91-78921-29651" }).phone).toBeUndefined();
  });
  it("treats email as optional but validates it when present", () => {
    expect(validateQuote({ ...valid, email: "" }).email).toBeUndefined();
    expect(validateQuote({ ...valid, email: "not-an-email" }).email).toBeTruthy();
  });
  it("has no minimum order: 1 child is fine, 0 or text is not", () => {
    expect(validateQuote({ ...valid, children: "1" }).children).toBeUndefined();
    expect(validateQuote({ ...valid, children: "" }).children).toBeUndefined();
    expect(validateQuote({ ...valid, children: "0" }).children).toBeTruthy();
    expect(validateQuote({ ...valid, children: "many" }).children).toBeTruthy();
  });
});

describe("buildQuoteMessage", () => {
  it("includes the filled fields", () => {
    const msg = buildQuoteMessage(valid);
    expect(msg).toContain("Sunflower Preschool");
    expect(msg).toContain("Pune");
    expect(msg).toContain("25");
    expect(msg).toContain("Graduation day");
  });
  it("skips empty optional fields", () => {
    const msg = buildQuoteMessage({ ...valid, role: "", email: "", occasion: "" });
    expect(msg).not.toMatch(/Role:|Email:|Occasion:/);
  });
});
