import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Section, SectionHeading } from "./Section";

describe("Section", () => {
  it("renders children inside a section with the id", () => {
    const { container } = render(
      <Section id="gifts"><p>hello</p></Section>,
    );
    expect(container.querySelector("section#gifts")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});

describe("SectionHeading", () => {
  it("renders eyebrow, h2 and body", () => {
    render(<SectionHeading eyebrow="THE PROCESS" title="How it works" body="Four steps" />);
    expect(screen.getByText("THE PROCESS")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "How it works" })).toBeInTheDocument();
    expect(screen.getByText("Four steps")).toBeInTheDocument();
  });
});
