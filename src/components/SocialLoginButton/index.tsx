import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '@/constants';
import {SocialLoginButtonProps} from '@/interfaces';
import {styles} from './styles';

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
        {!isLoading && text}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;
