// components/dashboard/SaveButton.tsx
"use client";

interface SaveButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function SaveButton({
  onClick,
  loading = false,
  disabled = false,
}: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-lg bg-[#9c6dfc] px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-[#8c5dec] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <>
          <svg
            className="h-5 w-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Salvando...
        </>
      ) : (
        <>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Salvar Alterações
        </>
      )}
    </button>
  );
}