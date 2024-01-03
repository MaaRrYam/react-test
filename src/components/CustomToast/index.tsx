import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ToastProps} from 'react-native-toast-notifications/lib/typescript/toast';

import {COLORS} from '@/constants';

const CustomToast = ({toast}: {toast: ToastProps}) => {
  return (
    <TouchableOpacity onPress={() => toast.onHide()}>
      <View style={styles.container}>
        <Text style={styles.message}>{toast.message}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '40%',
    maxWidth: '85%',
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    marginVertical: 4,
    borderRadius: 8,
    borderLeftColor: '#00C851',
    borderLeftWidth: 6,
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  message: {color: COLORS.black, marginRight: 16},
  cross: {
    marginLeft: 'auto',
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossText: {color: '#fff', fontWeight: '500', marginBottom: 2.5},
});

export default CustomToast;
