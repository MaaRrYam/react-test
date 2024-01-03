import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ToastProps} from 'react-native-toast-notifications/lib/typescript/toast';

const CustomToast = ({toast}: {toast: ToastProps}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{toast.message}</Text>
      <TouchableOpacity onPress={() => toast.onHide()} style={styles.cross}>
        <Text style={styles.crossText}>x</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '85%',
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 8,
    borderLeftColor: '#00C851',
    borderLeftWidth: 6,
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  message: {color: '#a3a3a3', marginRight: 16},
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
