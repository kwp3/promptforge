interface ToastProps {
  message: string;
  type: "success" | "error";
  visible: boolean;
}

export default function Toast({ message, type, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="toast toast-center toast-bottom z-50">
      <div 
        className={`alert ${type === "error" ? "alert-error" : "alert-success"} shadow-lg animate-fade-in-up`}
        role="alert"
      >
        <span>{message}</span>
      </div>
    </div>
  );
}
