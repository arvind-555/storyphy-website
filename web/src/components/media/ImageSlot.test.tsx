import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ImageSlot } from "./ImageSlot";

describe("ImageSlot", () => {
  it("renders a labelled placeholder without src", () => {
    render(<ImageSlot id="IMG-01" label="Hero covers" alt="Fanned storybook covers" />);
    const el = screen.getByRole("img", { name: "Fanned storybook covers" });
    expect(el).toHaveAttribute("data-slot", "IMG-01");
    expect(el).toHaveTextContent("IMG-01");
    expect(el).toHaveTextContent("Hero covers");
  });
  it("renders a real image with src", () => {
    render(<ImageSlot id="IMG-01" label="x" alt="Covers" src="/media/hero.jpg" />);
    expect(screen.getByAltText("Covers")).toBeInTheDocument();
  });
});
