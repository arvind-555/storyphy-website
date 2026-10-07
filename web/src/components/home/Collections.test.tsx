import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Collections } from "./Collections";
import { collections } from "@/content/home";

describe("Collections", () => {
  it("renders one card per collection", () => {
    render(<Collections />);
    for (const c of collections) {
      expect(screen.getByRole("heading", { name: c.title })).toBeInTheDocument();
    }
  });
  it("sends the order to WhatsApp with the book title", () => {
    render(<Collections />);
    const links = screen.getAllByRole("link", { name: "Order this book" });
    expect(links).toHaveLength(5);
    expect(links[1].getAttribute("href")).toContain(encodeURIComponent("Bedtime Stories"));
  });
  it("shows price placeholders, never a real amount", () => {
    render(<Collections />);
    expect(screen.getAllByText(/\[PRICE-STANDARD\]/).length).toBe(5);
  });
  it("has a notify-me card for coming-soon", () => {
    render(<Collections />);
    expect(screen.getByRole("link", { name: "Notify me" })).toBeInTheDocument();
  });
});
