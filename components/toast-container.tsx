"use client";

import { useToastStore } from "@/store/useToastStore";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto flex items-center justify-between w-full p-4 rounded-xl shadow-xl glass border border-white/10 dark:border-white/5 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && (
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 animate-bounce" />
              )}
              {toast.type === "error" && (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 animate-pulse" />
              )}
              {toast.type === "info" && (
                <Info className="w-5 h-5 text-indigo-500 shrink-0" />
              )}
              <span className="text-sm font-medium text-foreground">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
