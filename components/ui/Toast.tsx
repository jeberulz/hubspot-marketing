"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { CheckCircle, AlertTriangle, X, Info } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextValue {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto animate-toast-in flex items-center gap-3 px-4 py-3 bg-white border border-[#EAF0F6] rounded-lg shadow-lg min-w-[320px] max-w-[480px]"
          >
            {toast.type === "success" && (
              <CheckCircle
                size={16}
                strokeWidth={2}
                className="text-emerald-500 shrink-0"
              />
            )}
            {toast.type === "error" && (
              <AlertTriangle
                size={16}
                strokeWidth={2}
                className="text-rose-500 shrink-0"
              />
            )}
            {toast.type === "info" && (
              <Info
                size={16}
                strokeWidth={2}
                className="text-[#0091AE] shrink-0"
              />
            )}
            <span className="text-sm text-[#33475B] font-medium flex-1">
              {toast.message}
            </span>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-[#cbd6e2] hover:text-[#516F90] transition-colors shrink-0"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
