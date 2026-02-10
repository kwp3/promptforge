interface ForgeButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export default function ForgeButton({
  onClick,
  isLoading,
  disabled,
}: ForgeButtonProps) {
  return (
    <div className="w-full flex justify-center mt-6 mb-8">
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`
          btn btn-primary btn-lg gap-2 text-lg font-bold
          w-full sm:w-auto sm:min-w-[200px]
          transition-all duration-300
          ${
            isLoading || disabled
              ? "opacity-50 cursor-not-allowed"
              : "shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-105"
          }
        `}
      >
        {isLoading ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          <>
            <span className="text-xl">🔥</span> Forge It
          </>
        )}
      </button>
    </div>
  );
}
