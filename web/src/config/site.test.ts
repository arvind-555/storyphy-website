import { describe, it, expect } from "vitest";
import { whatsappLink, orderMessage, site } from "./site";

describe("whatsappLink", () => {
  it("links to the business number without a message", () => {
    expect(whatsappLink()).toBe("https://wa.me/917892129651");
  });
  it("url-encodes a prefilled message", () => {
    expect(whatsappLink("Hi & hello")).toBe(
      "https://wa.me/917892129651?text=Hi%20%26%20hello",
    );
  });
});

describe("orderMessage", () => {
  it("mentions the book when given", () => {
    expect(orderMessage("Bedtime Stories")).toContain("Bedtime Stories");
  });
  it("has a generic fallback", () => {
    expect(orderMessage()).toContain("order");
  });
});

describe("site", () => {
  it("states the delivery window", () => {
    expect(site.deliveryDays).toBe("7-10");
  });
});
