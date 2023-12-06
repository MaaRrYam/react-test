import React, {useRef} from 'react';
import {
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
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
  indicatorVisible = true,
}) => {
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const renderBackdrop = (style: StyleProp<ViewStyle>) => (
    <TouchableWithoutFeedback onPress={() => onClose()}>
      <View style={[style, styles.backdrop]} />
    </TouchableWithoutFeedback>
  );

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
      }}
      backdropComponent={({style}) => renderBackdrop(style)}
      handleIndicatorStyle={!indicatorVisible && {display: 'none'}}>
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {children}
        </View>
      </View>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
