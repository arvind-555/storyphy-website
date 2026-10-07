import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QuoteForm } from "./QuoteForm";

describe("QuoteForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows errors and does not open WhatsApp when required fields are empty", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<QuoteForm />);
    await user.click(screen.getByRole("button", { name: /send on whatsapp/i }));
    expect(screen.getByText("Please enter your school's name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid 10-digit mobile number.")).toBeInTheDocument();
    expect(open).not.toHaveBeenCalled();
  });

  it("opens WhatsApp with the details and shows thanks when valid", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<QuoteForm />);
    await user.type(screen.getByLabelText(/school name/i), "Sunflower Preschool");
    await user.type(screen.getByLabelText(/city/i), "Pune");
    await user.type(screen.getByLabelText(/your name/i), "Vandana");
    await user.type(screen.getByLabelText(/mobile number/i), "7892129651");
    await user.type(screen.getByLabelText(/approx\. number of children/i), "5");
    await user.click(screen.getByRole("button", { name: /send on whatsapp/i }));
    expect(open).toHaveBeenCalledTimes(1);
    const url = String(open.mock.calls[0][0]);
    expect(url).toContain("https://wa.me/917892129651?text=");
    expect(url).toContain(encodeURIComponent("Sunflower Preschool"));
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();
  });

  it("offers an email fallback", () => {
    render(<QuoteForm />);
    expect(screen.getByRole("link", { name: /email us instead/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:storyphy25@gmail.com"),
    );
  });
});
