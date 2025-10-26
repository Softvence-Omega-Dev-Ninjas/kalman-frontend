import React, { type ReactNode, useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  widthClass?: string;
  heightClass?: string;
  overflowYClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  widthClass,
  heightClass,
  overflowYClass,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setShouldRender(true);
    } else {
      timer = setTimeout(() => setShouldRender(false), 500);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!shouldRender) return null;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const backdropClasses = isOpen ? "opacity-100" : "opacity-0";

  return (
    <div
      className={`overflow-y-auto absolute inset-0 flex items-start justify-center z-50 transition-opacity duration-500 bg-gray-400/50 ${backdropClasses}`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-2xl w-full mx-4 mt-20 transition-all duration-500 transform
    ${widthClass || "max-w-xl"}
    ${heightClass || "max-h-[85vh]"}
    ${overflowYClass || "overflow-y-auto"}
    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
        onClick={handleModalClick}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        {/* Body */}
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
