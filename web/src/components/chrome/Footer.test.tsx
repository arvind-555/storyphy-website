import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("shows real contact details", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /storyphy25@gmail.com/ })).toHaveAttribute("href", "mailto:storyphy25@gmail.com");
    expect(screen.getByRole("link", { name: /\+91 78921 29651/ })).toHaveAttribute("href", "tel:+917892129651");
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute("href", "https://www.instagram.com/storyphyy");
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", expect.stringContaining("https://wa.me/917892129651"));
  });
  it("mentions secure payment", () => {
    render(<Footer />);
    expect(screen.getByText(/secure payments/i)).toBeInTheDocument();
  });
});
