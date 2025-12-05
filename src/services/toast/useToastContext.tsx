import React, { createContext, useContext, useState } from 'react';

import { Toast, ToastService } from './toastTypes';


const ToastContext = createContext({} as ToastService);

export function ToastProvider({ children }: React.PropsWithChildren): React.JSX.Element {
  const [toast, setToast] = useState<ToastService['toast']>(null);

  const showToast = (toastValue:Toast): void => setToast(toastValue);

  const hideToast = (): void => setToast(null);
  return (
    <ToastContext.Provider value={{
      toast,
      showToast,
      hideToast,
    }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext(): ToastService {
  const {
    toast,
    showToast,
    hideToast,
  } = useContext(ToastContext);

  return {
    toast,
    showToast,
    hideToast,
  };
}
