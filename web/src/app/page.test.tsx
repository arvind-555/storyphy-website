import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";
import { nav } from "@/config/site";

describe("Home page", () => {
  it("has exactly one h1", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
  it("resolves every on-page nav anchor", () => {
    const { container } = render(<Home />);
    for (const item of nav) {
      if (item.href.startsWith("/#")) {
        const id = item.href.slice(2);
        expect(container.querySelector(`#${id}`), `missing #${id}`).toBeInTheDocument();
      }
    }
  });
  it("renders sections in journey order", () => {
    const { container } = render(<Home />);
    const ids = ["see-it", "collections", "how-it-works", "look-inside", "families", "gifts", "for-schools", "safety", "faq", "start"];
    const positions = ids.map((id) => {
      const el = container.querySelector(`#${id}`);
      expect(el, `missing #${id}`).toBeInTheDocument();
      return Array.from(container.querySelectorAll("section")).indexOf(el as HTMLElement);
    });
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });
});
