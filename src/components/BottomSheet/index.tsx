import React, {useRef} from 'react';
import {View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import {styles} from './styles';
import {BottomSheetProps} from '@/interfaces';

const CustomBottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  snapPoints = ['20%', '70%'],
  children,
  containerStyle,
  contentContainerStyle,
}) => {
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 1 : 0}
      snapPoints={snapPoints}
      style={styles.sheetStyles}
      onChange={index => {
        if (index === 0) {
          onClose();
        }
      }}>
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {children}
        </View>
      </View>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
