import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HowItWorks } from "./HowItWorks";

describe("HowItWorks", () => {
  it("lists four ordered steps", () => {
    render(<HowItWorks />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });
  it("states the approval promise and the 24 hour preview", () => {
    render(<HowItWorks />);
    expect(screen.getAllByText(/Nothing is printed until you say yes/).length).toBeGreaterThan(0);
    expect(screen.getByText(/preview in 24 hours/i)).toBeInTheDocument();
  });
  it("is anchored as #how-it-works", () => {
    const { container } = render(<HowItWorks />);
    expect(container.querySelector("section#how-it-works")).toBeInTheDocument();
  });
});
