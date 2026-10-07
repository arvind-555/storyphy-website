import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders an internal link", () => {
    render(<Button href="/schools">For Schools</Button>);
    const el = screen.getByRole("link", { name: "For Schools" });
    expect(el).toHaveAttribute("href", "/schools");
    expect(el).not.toHaveAttribute("target");
  });
  it("opens external links safely", () => {
    render(<Button href="https://wa.me/1">Chat</Button>);
    const el = screen.getByRole("link", { name: "Chat" });
    expect(el).toHaveAttribute("target", "_blank");
    expect(el).toHaveAttribute("rel", "noopener noreferrer");
  });
  it("does not open tel/mailto in a new tab", () => {
    render(<Button href="tel:+911">Call</Button>);
    expect(screen.getByRole("link", { name: "Call" })).not.toHaveAttribute("target");
  });
  it("renders a button without href", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button", { name: "Go" })).toHaveAttribute("type", "button");
  });
});
