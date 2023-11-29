import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const BackButton = ({
  onPress,
  isBgWhite,
  style,
}: {
  onPress?: () => void;
  isBgWhite?: boolean;
  style?: object;
}) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.goBack();
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, isBgWhite && styles.whiteBackground, style]}
      onPress={handleNavigation}>
      <FastImage
        source={require('../../assets/images/back.png')}
        style={styles.icon}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    width: 50,
    borderRadius: 12,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default BackButton;
