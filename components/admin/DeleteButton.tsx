"use client";

import { btnDanger } from "@/lib/admin-ui";

// Section 55 of the Phase 1 audit: destructive admin actions must confirm
// before submitting. The server action itself is the real authorization
// boundary (Section 57) — this is purely a "did you mean to?" UX guard.
export default function DeleteButton({
  confirmText = "This action cannot be undone.",
  label = "Delete",
}: {
  confirmText?: string;
  label?: string;
}) {
  return (
    <button
      type="submit"
      className={btnDanger}
      onClick={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      {label}
    </button>
  );
}
