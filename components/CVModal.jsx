"use client";

import { useEffect } from "react";
import { X, Download } from "lucide-react";

export function CVModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="relative flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Curriculum Vitae
          </h2>
          <div className="flex items-center gap-2">
            <a
              href="/Abhishek%20CV.pdf"
              download="Abhishek-Yadav-CV.pdf"
              className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download CV</span>
            </a>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-neutral-100 dark:bg-neutral-950 p-2 sm:p-4">
          <object
            data="/Abhishek%20CV.pdf#toolbar=0"
            type="application/pdf"
            className="h-full w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white"
            aria-label="CV Viewer"
          >
            <p className="p-4 text-center text-neutral-500">
              Your browser does not support PDFs. 
              <a href="/Abhishek%20CV.pdf" className="text-blue-500 hover:underline">Download the PDF</a> instead.
            </p>
          </object>
        </div>
      </div>
    </div>
  );
}
