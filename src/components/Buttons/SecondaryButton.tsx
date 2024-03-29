/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {COLORS} from '@/constants';
import {ButtonProps} from '@/interfaces';
import {ForwardArrow} from '@/assets/icons';

const SecondaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  backgroundColor = COLORS.lightBackground,
  textColor = 'black',
  borderWidth = 0,
  borderColor = 'transparent',
  icon = null,
  iconPosition = 'left',
  disabled = false,
  isLoading = false,
  activityIndicatorSize = 'small',
  activityIndicatorColor = COLORS.primary,
}) => {
  const renderButtonContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size={activityIndicatorSize}
          color={activityIndicatorColor}
        />
      );
    }
    if (iconPosition === 'left') {
      return (
        <View style={styles.buttonContent}>
          {icon && (
            <FontAwesome5
              name={icon}
              size={20}
              color={textColor}
              style={styles.icon}
            />
          )}
          <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
        </View>
      );
    } else if (iconPosition === 'right') {
      return (
        <View style={styles.buttonContent}>
          <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
          {icon && icon === 'arrow-right' ? (
            <ForwardArrow style={{marginLeft: 5}} />
          ) : (
            <FontAwesome5
              name={icon}
              size={20}
              color={textColor}
              style={styles.icon}
            />
          )}
        </View>
      );
    } else {
      return (
        <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
      );
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: disabled ? 'gray' : backgroundColor},
        {borderWidth},
        {borderColor},
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {renderButtonContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default SecondaryButton;
