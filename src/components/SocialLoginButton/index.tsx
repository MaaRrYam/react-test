import { COLORS } from '@/constants';
import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface SocialLoginButtonProps {
  text: string;
  logoSource: ImageSourcePropType;
  onPress: () => void;
  marginTop?: number;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  text,
  logoSource,
  onPress,
  marginTop = 0,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.socialsButtonContainer, {marginTop}]}>
      <View style={styles.iconContainer}>
        <Image source={logoSource} style={styles.icon} />
      </View>
      <Text style={styles.signinButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialsButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Customize the button background color
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border, // Customize the button border color
    color: 'black', // Customize the text color
    fontWeight: '400', // Customize the text font weight
  },
  iconContainer: {
    marginRight: 10,
  },
  signinButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default SocialLoginButton;
