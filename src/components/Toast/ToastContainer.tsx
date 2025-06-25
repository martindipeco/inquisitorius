import { useToast } from '../../contexts/ToastContext';
import { Toast } from './Toast';

export const ToastContainer = () => {
  const { toast, hideToast } = useToast();

  return (
    <Toast
      open={toast.open}
      onOpenChange={hideToast}
      title={toast.title}
      description={toast.description}
      type={toast.type}
    />
  );
}; 