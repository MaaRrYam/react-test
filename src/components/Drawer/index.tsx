import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {RootState} from '@/store';
import {getUser} from '@/store/features/authSlice';
import {Home, Network, Notifications} from '@/screens';
import {COLORS, SCREEN_NAMES} from '@/constants';
import {getIcon} from '@/utils/IconsHelper';
import Profile from '@/screens/profile';

const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View>
      <Text>Settings!</Text>
    </View>
  );
}

function Drawer({state, descriptors, navigation}) {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if(user === {}){
      dispatch(getUser());
    }
  }, [dispatch]);
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}>
            {getIcon(label, isFocused, user.photoUrl)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <Drawer {...props} />}>
      <Tab.Screen name={SCREEN_NAMES.Home} component={Home} />
      <Tab.Screen name={SCREEN_NAMES.Network} component={Network} />
      <Tab.Screen name={SCREEN_NAMES.Notifications} component={Notifications} />
      <Tab.Screen name={SCREEN_NAMES.Jobs} component={SettingsScreen} />
      <Tab.Screen name={SCREEN_NAMES.Profile} component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopColor: COLORS.border,
    height: 60,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default Tabs;
