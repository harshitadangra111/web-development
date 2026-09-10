import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-primary/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container z-10">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container">
          <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
