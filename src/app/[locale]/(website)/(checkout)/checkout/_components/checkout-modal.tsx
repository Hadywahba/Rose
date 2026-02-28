import Modal from '@/components/ui/modal';
import { X } from 'lucide-react';
import React from 'react';

interface CheckOutModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
}

export default function CheckOutModal({
  openModal,
  setOpenModal,
}: CheckOutModalProps) {
  return (
    <Modal
      className="relative mx-4 flex w-full max-w-[34.875rem] flex-col gap-4 bg-white md:gap-6"
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
    >
      {/* Close button */}
      <div className="absolute right-[.875rem] top-[.875rem] cursor-pointer">
        <X size={18} onClick={() => setOpenModal(false)} />
      </div>

      <div className="mx-auto mt-8 flex w-full items-center justify-center rounded-full md:mt-12 md:h-28 md:w-60">
        <h1 className="w-full text-center text-2xl">welcome mostafa</h1>
      </div>
    </Modal>
  );
}
