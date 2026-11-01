import type React from "react";

/**
 * Props that make a clickable card behave like a checkbox for keyboard and
 * screen-reader users (Tab to focus, Space/Enter to toggle, checked state announced).
 * Used for cards whose content (headings, paragraphs) cannot live inside a <button>.
 */
export function checkboxCardProps(checked: boolean, onToggle: () => void, label: string) {
  return {
    role: "checkbox",
    "aria-checked": checked,
    "aria-label": label,
    tabIndex: 0,
    onClick: onToggle,
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onToggle();
      }
    },
  } as const;
}

/** Visible focus ring shared by keyboard-focusable cards. */
export const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
