import React from 'react';
import { useSnackbar } from 'notistack';

function useToast() {
  const { enqueueSnackbar } = useSnackbar();
  const toast = React.useMemo(
    () => ({
      default: (message, options) => enqueueSnackbar(message, { ...options }),
      success: (message, options) =>
        enqueueSnackbar(message, { variant: 'success', ...options }),
      error: (message, options) =>
        enqueueSnackbar(message, { variant: 'error', ...options }),
      warning: (message, options) =>
        enqueueSnackbar(message, { variant: 'warning', ...options }),
      info: (message, options) =>
        enqueueSnackbar(message, { variant: 'info', ...options }),
    }),
    [enqueueSnackbar]
  );
  return toast;
}

export default useToast;
