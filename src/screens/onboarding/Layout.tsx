import React from 'react';
import {SafeAreaView, View, Text, Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import {useRoute} from '@react-navigation/native';

import {commonStyles} from '@/styles/onboarding';
import {KeyboardAvoidingView, BackButton} from '@/components';
import {COLORS} from '@/constants';
import {trackOnboardingProgress} from '@/utils';

const Layout = ({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  const route = useRoute();

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <KeyboardAvoidingView>
        <View style={commonStyles.container}>
          <Progress.Bar
            progress={trackOnboardingProgress(route.name)}
            width={Dimensions.get('window').width - 40}
            height={13}
            borderRadius={20}
            useNativeDriver={true}
            animationType="spring"
            animated={true}
            color={COLORS.primary}
            borderWidth={1}
            style={commonStyles.progressBar}
          />
          <Text style={{textAlign: 'center'}}>
            {trackOnboardingProgress(route.name) * 100}% completed
          </Text>
          <BackButton />
          <Text style={commonStyles.title}>{title}</Text>

          {children}
        </View>
        {footer && <View style={commonStyles.footer}>{footer}</View>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Layout;
