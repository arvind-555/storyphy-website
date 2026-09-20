import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("shows the headline and primary CTA", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: /hero of their own story/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Order Their Book" })).toHaveAttribute("href", "/#collections");
  });
  it("routes schools to /schools", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /ordering for a school/i })).toHaveAttribute("href", "/schools");
  });
  it("shows the four trust points with 500+ families", () => {
    render(<Hero />);
    expect(screen.getByText("500+ families")).toBeInTheDocument();
    expect(screen.getByText("You approve before we print")).toBeInTheDocument();
    expect(screen.getByText("Photos handled securely")).toBeInTheDocument();
    expect(screen.getByText("Delivered in 7-10 days")).toBeInTheDocument();
  });
  it("has the hero image slot", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector('[data-slot="IMG-01"]')).toBeInTheDocument();
  });
});
