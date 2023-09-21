import {BORDER_RADIUS, COLORS} from '@/constants';
import {SocialLoginButtonProps} from '@/interfaces';
import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  text,
  logoSource,
  onPress,
  style,
  textStyle,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      await onPress();
      setIsLoading(false);
    } catch (error) {
      // Handle errors here and stop loading
      setIsLoading(false);
      console.error('Error:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.socialsButtonContainer, style]}>
      <View style={styles.iconContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.black} />
        ) : (
          <Image source={logoSource} style={styles.icon} />
        )}
      </View>
      <Text style={[styles.signinButtonText, textStyle]}>
        {isLoading ? '' : text}
      </Text>
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
    borderRadius: BORDER_RADIUS.general,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.black,
    fontWeight: '400',
  },
  iconContainer: {
    marginRight: 10,
  },
  signinButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default SocialLoginButton;
