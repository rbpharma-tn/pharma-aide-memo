
import React from "react";

export function ErrorWithDetails({
  error,
  rawError,
}: {
  error: string | null;
  rawError: any;
}) {
  if (!error) return null;
  return (
    <div className="text-center text-red-500 bg-red-50 rounded px-2 py-1 text-sm font-inter">
      {error}
      {rawError && (
        <pre className="mt-2 text-xs text-left text-gray-800 bg-gray-100 border rounded p-2 max-h-60 overflow-auto font-mono">
          {typeof rawError === "string"
            ? rawError
            : JSON.stringify(rawError, null, 2)}
        </pre>
      )}
    </div>
  );
}
