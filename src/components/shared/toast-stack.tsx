"use client";

import { useEffect } from "react";

import { useToastStore } from "@/store/useToastStore";

export function ToastStack() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    if (!toasts.length) return;

    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        removeToast(toast.id);
      }, 2800),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [removeToast, toasts]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[80] space-y-3">
      {toasts.map((toast) => (
        <div key={toast.id} className="panel pointer-events-auto w-[320px] rounded-[24px] p-4">
          <p className="text-sm font-medium text-[var(--veloura-text)]">{toast.title}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--veloura-muted)]">{toast.description}</p>
        </div>
      ))}
    </div>
  );
}
