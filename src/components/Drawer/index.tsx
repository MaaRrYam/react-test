import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {Home, Network, Notifications, Jobs} from '@/screens';
import {COLORS, SCREEN_NAMES, PROFILE_TABS, PADDING} from '@/constants';
import {getIcon} from '@/utils/IconsHelper';
import Profile from '@/screens/profile';
import EditProfile from '@/components/EditProfile';
import {getUID} from '@/utils/functions';
import {DrawerContentProps, UserInterface} from '@/interfaces';
import StorageService from '@/services/Storage';
import {refreshFeed, setFeedFetchedToFalse} from '@/store/features/homeSlice';
import useHandleLinking from '@/hooks/useHandleLinking';

const Tab = createBottomTabNavigator();
function SettingsScreen() {
  return (
    <View>
      <Text>Settings!</Text>
    </View>
  );
}

function DrawerContent({
  state,
  descriptors,
  navigation,
  isVisible,
  setIsVisible,
  tabItem,
  isEditing,
  setIsEditing,
  user,
  editingIndex,
  setEditingIndex,
  uid,
}: DrawerContentProps) {
  const dispatch = useAppDispatch();

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

            const onPress = () => {
              if (isFocused && route.name === 'Home') {
                dispatch(refreshFeed());
                dispatch(setFeedFetchedToFalse());
                return;
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
                {getIcon(
                  label,
                  isFocused,
                  navigation,
                  user?.photoUrl,
                  uid as string,
                )}
              </TouchableOpacity>
            );
          },
        )}
      </View>
      {isVisible && (
        <EditProfile
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          tabItem={tabItem}
          user={user}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
        />
      )}
    </>
  );
}

const Tabs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tabItem, setTabItem] = useState(PROFILE_TABS[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);
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

  return (
    <View style={{width, height}}>
      <Tab.Navigator
        screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
        tabBar={props => (
          <DrawerContent
            {...props}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            tabItem={tabItem}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            user={user}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            uid={UID}
          />
        )}>
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
            isVisible,
            setIsVisible,
            setTabItem,
            tabItem,
            isEditing,
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
