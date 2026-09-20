import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LookInside } from "./LookInside";
import { ParentStories } from "./ParentStories";
import { Gifting } from "./Gifting";
import { SchoolsBand } from "./SchoolsBand";
import { Safety } from "./Safety";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { faq } from "@/content/home";

describe("LookInside", () => {
  it("shows four sample-page slots and the close-up video slot", () => {
    const { container } = render(<LookInside />);
    expect(container.querySelectorAll('[data-slot^="IMG-"]')).toHaveLength(4);
    expect(container.querySelector('[data-slot="VID-03"]')).toBeInTheDocument();
    expect(screen.getAllByText(/sample book/i).length).toBeGreaterThan(0);
  });
});

describe("ParentStories", () => {
  it("is the #families anchor with three stories and the 500+ claim", () => {
    const { container } = render(<ParentStories />);
    expect(container.querySelector("section#families")).toBeInTheDocument();
    expect(container.querySelectorAll("blockquote")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Loved by 500+ families" })).toBeInTheDocument();
  });
});

describe("Gifting", () => {
  it("is the #gifts anchor with five occasions", () => {
    const { container } = render(<Gifting />);
    expect(container.querySelector("section#gifts")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });
});

describe("SchoolsBand", () => {
  it("links to the quote form and the sample kit", () => {
    render(<SchoolsBand />);
    expect(screen.getByRole("link", { name: "Get a school quote" })).toHaveAttribute("href", "/schools/quote");
    expect(screen.getByRole("link", { name: "Request a sample kit" })).toHaveAttribute("href", "/schools#sample-kit");
  });
  it("makes no claim about schools served", () => {
    const { container } = render(<SchoolsBand />);
    expect(container.textContent).not.toMatch(/trusted by|schools? (we've|we have)/i);
  });
});

describe("Safety", () => {
  it("lists the privacy promises", () => {
    render(<Safety />);
    expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(4);
  });
});

describe("Faq", () => {
  it("renders every question as a native disclosure", () => {
    const { container } = render(<Faq />);
    expect(container.querySelectorAll("details")).toHaveLength(faq.items.length);
    expect(screen.getByText("Can I see my book before it's printed?")).toBeInTheDocument();
  });
});

describe("FinalCta", () => {
  it("has an order link and a WhatsApp link", () => {
    render(<FinalCta />);
    expect(screen.getByRole("link", { name: "Order Their Book" })).toHaveAttribute("href", "/#collections");
    expect(screen.getByRole("link", { name: "Ask us on WhatsApp" })).toHaveAttribute("href", expect.stringContaining("wa.me/917892129651"));
  });
});
