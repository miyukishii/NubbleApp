import { ToastService } from './toastTypes';
import { useToastZustand } from './useToastZustand';

export function useToast(): ToastService {
  return useToastZustand();
}
