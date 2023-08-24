import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomSheet} from 'react-native-paper';

interface BottomDrawerProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  snapPoints?: Array<string | number>;
  containerStyle?: object;
  contentContainerStyle?: object;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  visible,
  onDismiss,
  children,
  snapPoints = ['25%', '50%', '75%'],
  containerStyle,
  contentContainerStyle,
}) => {
  return (
    <BottomSheet
      visible={visible}
      onDismiss={onDismiss}
      // You can customize the snap points and other styles here
      snapPoints={snapPoints}
      style={containerStyle}>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
});

export default BottomDrawer;
