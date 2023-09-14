import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';

import {COLORS} from '@/constants';
import MyTabs from '@/components/Drawer';
import {Chats} from '@/screens';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="Chats" component={Chats} />
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
