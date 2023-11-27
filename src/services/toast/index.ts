import {BORDER_WIDTH, COLORS, FONTS} from '@/constants';
import {Toast} from 'react-native-toast-notifications';

const ToastService = {
  showSuccess(message: string) {
    Toast.show(message, {
      type: 'success',
      style: {
        backgroundColor: COLORS.white,
        borderLeftWidth: BORDER_WIDTH.general * 3,
        borderLeftColor: 'green',
      },
      textStyle: {
        color: COLORS.black,
        fontSize: FONTS.regularLabel,
      },
    });
  },
  showWarning(message: string) {
    Toast.show(message, {
      type: 'warning',
      style: {
        backgroundColor: COLORS.white,
        borderLeftWidth: BORDER_WIDTH.general * 3,
        borderLeftColor: 'yellow',
      },
      textStyle: {
        color: COLORS.black,
        fontSize: FONTS.regularLabel,
      },
    });
  },

  showError(message: string) {
    Toast.show(message, {
      type: 'danger',
      style: {
        backgroundColor: COLORS.white,
        borderLeftWidth: BORDER_WIDTH.general * 3,
        borderLeftColor: 'red',
      },
      textStyle: {
        color: COLORS.black,
        fontSize: FONTS.regularLabel,
      },
    });
  },
};

export default ToastService;
