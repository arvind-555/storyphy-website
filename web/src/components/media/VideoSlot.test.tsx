import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VideoSlot } from "./VideoSlot";

describe("VideoSlot", () => {
  it("renders a placeholder without src", () => {
    const { container } = render(<VideoSlot id="VID-02" label="Unboxing" title="Watch the book" />);
    expect(container.querySelector('[data-slot="VID-02"]')).toBeInTheDocument();
    expect(screen.getByText("Watch the book")).toBeInTheDocument();
  });
  it("renders a video element with src", () => {
    const { container } = render(
      <VideoSlot id="VID-02" label="x" title="Watch" src="/media/a.mp4" poster="/media/a.jpg" />,
    );
    const v = container.querySelector("video");
    expect(v).toHaveAttribute("src", "/media/a.mp4");
    expect(v).toHaveAttribute("poster", "/media/a.jpg");
    expect(v).toHaveAttribute("controls");
  });
});
