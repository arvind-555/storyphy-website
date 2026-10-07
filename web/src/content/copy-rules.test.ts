import { describe, it, expect } from "vitest";

const modules = import.meta.glob(
  ["./*.ts", "!./*.test.ts", "../config/*.ts", "!../config/*.test.ts"],
  { eager: true },
);

const corpus = JSON.stringify(Object.values(modules));

const forbidden: [string, RegExp][] = [
  ["star ratings / 4.9", /4\.9|\brated\b|\bratings?\b|★|⭐/i],
  ["minimum order", /\bMOQ\b|minimum (order|quantity)/i],
  ["redesign / revision limits", /redesign|revision|unlimited|until you (love|are happy)/i],
  ["refund promise", /refund|money[- ]back/i],
  ["school-served claims", /(schools?|preschools?) (we've|we have) (served|worked)|trusted by \d+ (pre)?schools?/i],
  ["fake urgency", /only \d+ left|hurry|countdown|ends (tonight|today)/i],
];

describe("copy rules from the spec", () => {
  it("scans at least the site config", () => {
    expect(Object.keys(modules).length).toBeGreaterThan(0);
  });

  it.each(forbidden)("has no %s", (_name, pattern) => {
    expect(corpus).not.toMatch(pattern);
  });

  it("uses no real price amounts", () => {
    expect(corpus).not.toMatch(/₹\s?\d|Rs\.?\s?\d|INR\s?\d/);
  });
});
