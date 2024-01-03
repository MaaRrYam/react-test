import {BORDER_WIDTH, COLORS, FONTS} from '@/constants';
import {Toast} from 'react-native-toast-notifications';

const ToastService = {
  showSuccess(message: string) {
    Toast.show(message, {
      type: 'with_close_button',
    });
  },
  showWarning(message: string) {
    Toast.show(message, {
      type: 'with_close_button',
    });
  },

  showError(message: string) {
    Toast.show(message, {
      type: 'with_close_button',
    });
  },
};

export default ToastService;
