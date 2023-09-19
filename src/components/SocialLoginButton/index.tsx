import {COLORS} from '@/constants';
import {SocialLoginButtonProps} from '@/interfaces';
import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';

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
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: 'black',
    fontWeight: '400',
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
