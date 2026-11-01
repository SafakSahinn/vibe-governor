import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { MotionGlobalConfig } from "framer-motion";

// jsdom does not implement scrolling.
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

// Step transitions are animated; finish them instantly in tests.
MotionGlobalConfig.skipAnimations = true;

// Monaco is loaded from a CDN in the browser; stub the dynamic import in jsdom.
vi.mock("next/dynamic", () => ({
  default: () => {
    const Stub = () => null;
    return Stub;
  },
}));

afterEach(() => {
  cleanup();
});
