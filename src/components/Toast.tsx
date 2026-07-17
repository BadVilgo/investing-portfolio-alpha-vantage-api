import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

function Toast({ message, onClose, actionLabel, onAction }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="app-toast" role="status" aria-live="polite">
      <span className="small">{message}</span>
      {actionLabel && onAction && (
        <button type="button" className="btn btn-sm btn-outline-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Dismiss notification"
      ></button>
    </div>
  );
}

export default Toast;
