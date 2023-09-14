import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';

import {SignIn, RequestAccess} from '@/screens';
import {COLORS} from '@/constants';
import {SelectRole, RequestAccessComplete} from '@/screens';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="RequestAccess" component={RequestAccess} />
        <Stack.Screen name="SelectRole" component={SelectRole} />
        <Stack.Screen
          name="RequestAccessComplete"
          component={RequestAccessComplete}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default AppNavigation;
