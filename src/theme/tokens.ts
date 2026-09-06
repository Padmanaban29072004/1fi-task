/**
 * Design tokens aligned with the 1Fi brand experience.
 * Primary purple matches 1Fi web/app theme-color (#712CDC).
 */
export const colors = {
  primary: "#712CDC",
  primaryHover: "#5b24b5",
  primarySoft: "#F3EBFF",
  primaryMuted: "#8c27fc",
  ink: "#111827",
  inkMuted: "#6B7280",
  inkSubtle: "#9CA3AF",
  surface: "#FFFFFF",
  canvas: "#F7F5FB",
  border: "#E5E7EB",
  success: "#059669",
  danger: "#DC2626",
  warning: "#D97706",
} as const;

export const spacing = {
  pageX: "1rem",
  sectionY: "1.25rem",
} as const;
