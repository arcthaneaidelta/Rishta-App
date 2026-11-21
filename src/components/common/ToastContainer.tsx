import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#FAF4EA] border border-[#E8DCC3] text-[#2B2118] p-4 rounded-xl shadow-lg flex items-start gap-3 transition-all transform translate-y-0 opacity-100"
            style={{
              boxShadow: '0 10px 25px -5px rgba(43, 33, 24, 0.12), 0 8px 10px -6px rgba(43, 33, 24, 0.08)'
            }}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#C99A2E]" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-[#A34D28]" />}
              {!isSuccess && !isWarning && <Info className="w-5 h-5 text-[#2B2118]" />}
            </div>
            <div className="flex-1 text-sm">
              <h4 className="font-semibold text-xs tracking-wide uppercase text-[#2B2118] mb-0.5">
                {toast.title}
              </h4>
              <p className="text-xs text-[#756353] leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#756353] hover:text-[#2B2118] p-1 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
