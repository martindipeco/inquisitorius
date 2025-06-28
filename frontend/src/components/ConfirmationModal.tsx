import * as Dialog from '@radix-ui/react-dialog';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, description }: ConfirmationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
          <Dialog.Portal forceMount>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
            </motion.div>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 w-[90vw] max-w-md z-50"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Icon icon="mdi:help-circle-outline" className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4 text-left flex-grow">
                    <Dialog.Title className="text-lg font-semibold text-gray-900">
                      {title}
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-gray-600">
                      {description}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <Icon icon="mdi:close" className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                  </Dialog.Close>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
                    onClick={onConfirm}
                  >
                    Confirmar
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
}; 