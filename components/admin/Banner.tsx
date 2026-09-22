// Reads ?success= / ?error= from the URL and renders a dismissable-by-navigation
// banner. Server actions in this app redirect back to the page with one of
// these set instead of using client-side toast state (Section 20: "success
// feedback" / "error feedback" is required, not *how* it's delivered — this
// keeps every admin form a plain, JS-optional <form action={...}>).
export default function Banner({ success, error }: { success?: string; error?: string }) {
  if (!success && !error) return null;
  if (error) {
    return (
      <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
        {error}
      </div>
    );
  }
  return (
    <div className="mb-5 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700" role="status">
      {success}
    </div>
  );
}
