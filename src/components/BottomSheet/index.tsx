import React, {useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {BottomSheetProps} from '@/interfaces';

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  modalStyle,
}) => {
  const modalRef = useRef<Modalize | null>(null);

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <Modalize
          ref={modalRef}
          onClosed={onClose}
          modalStyle={[styles.modal, modalStyle]}
          modalTopOffset={0}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>{children}</View>
        </Modalize>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    alignItems: 'flex-end',
    padding: 16,
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  content: {
    padding: 16,
    backgroundColor: 'white',
  },
});

export default BottomSheet;
