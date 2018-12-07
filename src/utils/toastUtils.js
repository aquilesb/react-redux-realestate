import { toast } from 'react-toastify';

/**
 * Base toast configuration
 */
const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * Show a toast as error
 * @param {string} message menssage to be displayed as error
 */
export const error = message => toast.error(
  message,
  toastOptions,
);

/**
 * Show a toast as success
 * @param {string} message menssage to be displayed as success
 */
export const success = message => toast.success(
  message,
  toastOptions,
);

/**
 * Show a toast as warning
 * @param {string} message menssage to be displayed as warning
 */
export const warn = message => toast.warn(
  message,
  toastOptions,
);
