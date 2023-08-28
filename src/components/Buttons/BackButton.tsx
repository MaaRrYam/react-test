import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const BackButton = ({
  onPress,
  isBgWhite,
}: {
  onPress?: () => void;
  isBgWhite?: boolean;
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
      style={[styles.button, isBgWhite && styles.whiteBackground]}
      onPress={handleNavigation}>
      <Image
        source={require('../../assets/images/back.png')}
        style={styles.icon}
        resizeMode="contain"
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
    borderRadius: 8,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default BackButton;
