import React, {useState, useEffect, useCallback} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {Home, Network, Notifications, Jobs} from '@/screens';
import {COLORS, SCREEN_NAMES} from '@/constants';
import {getIcon} from '@/utils/IconsHelper';
import Profile from '@/screens/profile';
import {getUID} from '@/utils/functions';
import {DrawerContentProps, UserInterface} from '@/interfaces';
import StorageService from '@/services/Storage';
import {refreshFeed, setFeedFetchedToFalse} from '@/store/features/homeSlice';
import useHandleLinking from '@/hooks/useHandleLinking';
import {useAppSelector} from '@/hooks/useAppSelector';

const Tab = createBottomTabNavigator();

function DrawerContent({
  state,
  descriptors,
  navigation,
  user,
  uid,
}: DrawerContentProps) {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(storeState => storeState.auth.user);

  return (
    <>
      <View style={styles.tabBarContainer}>
        {state.routes.map(
          (
            route: {key: string | number; name: any},
            index: React.Key | null | undefined,
          ) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = async () => {
              if (isFocused && route.name === 'Home') {
                dispatch(refreshFeed());
                dispatch(setFeedFetchedToFalse());
                return;
              }

              if (route.name === 'Profile') {
                return navigation.navigate('Profile', {
                  uid,
                  user: loggedInUser,
                });
              }

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
                {getIcon(label, isFocused, user?.photoUrl)}
              </TouchableOpacity>
            );
          },
        )}
      </View>
    </>
  );
}

const Tabs = () => {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);
  const dispatch = useAppDispatch();
  const [UID, setUID] = useState('');

  useHandleLinking();

  useEffect(() => {
    const fetchUser = async () => {
      const userStorage = await StorageService.getItem('user');
      setUser(userStorage as UserInterface);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchUID() {
      const uid = await getUID();
      setUID(uid as string);
    }

    fetchUID();
  }, [dispatch]);
  const {width, height} = Dimensions.get('window');

  const renderDrawerContent = useCallback(
    (props: BottomTabBarProps) => {
      return <DrawerContent {...props} user={user} uid={UID} />;
    },
    [UID, user],
  );

  return (
    <View style={{width, height}}>
      <Tab.Navigator
        screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
        tabBar={props => renderDrawerContent(props)}>
        <Tab.Screen name={SCREEN_NAMES.Home} component={Home} />
        <Tab.Screen name={SCREEN_NAMES.Network} component={Network} />
        <Tab.Screen
          name={SCREEN_NAMES.Notifications}
          component={Notifications}
        />
        <Tab.Screen name={SCREEN_NAMES.Jobs} component={Jobs} />
        <Tab.Screen
          name={SCREEN_NAMES.Profile}
          component={Profile}
          initialParams={{
            UID,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.border,
    height: 80,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingBottom: 20,
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
