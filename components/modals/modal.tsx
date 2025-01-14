"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import ActionButton from "@/components/action-button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body: React.ReactElement;
  footer: React.ReactElement;
  actionLabel: string;
  disabled: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}
const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSeccondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none  bg-neutral-800/70
                "
      >
        <div
          className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-3/6 lg:h-auto md:h-auto
                    "
        >
          {/* Constent */}
          <div
            className={`translate duration-300 h-full
                            ${showModal ? "translate-y-0" : "translate-y-full"}
                            ${showModal ? "opacity-100" : "opacity-0"}
                        `}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  onClick={handleClose}
                >
                  <X />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <ActionButton
                      label={secondaryActionLabel}
                      outline
                      disabled={disabled}
                      onClick={secondaryAction}
                    />
                  )}
                  <ActionButton
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
