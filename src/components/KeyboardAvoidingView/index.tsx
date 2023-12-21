import React from 'react';
import {KeyboardAvoidingView as KeyboardAvoid, Platform} from 'react-native';

const KeyboardAvoidingView = ({children}: {children: React.ReactNode}) => {
  return (
    <KeyboardAvoid
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      {children}
    </KeyboardAvoid>
  );
};

export default KeyboardAvoidingView;
