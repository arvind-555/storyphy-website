import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MobileNav } from "./MobileNav";

describe("MobileNav", () => {
  it("is closed initially and toggles open and closed", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    const toggle = screen.getByRole("button", { name: /menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: "For Schools" })).not.toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "For Schools" })).toHaveAttribute("href", "/schools");

    await user.click(toggle);
    expect(screen.queryByRole("link", { name: "For Schools" })).not.toBeInTheDocument();
  });
});
