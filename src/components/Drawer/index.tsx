import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {RootState} from '@/store';
import {listenToUserData, } from '@/store/features/authSlice';
import {Home, Network, Notifications} from '@/screens';
import {COLORS, SCREEN_NAMES, PROFILE_TABS} from '@/constants';
import {getIcon} from '@/utils/IconsHelper';
import Profile from '@/screens/profile';
import EditProfile from '@/components/EditProfile';
import {getUID} from '@/utils/functions'
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
}) {
  return (
    <>
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
              {getIcon(label, isFocused, navigation, user.photoUrl, user.id)}
            </TouchableOpacity>
          );
        })}
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

  const dispatch = useAppDispatch();
  const {user} = useAppSelector((authState: RootState) => authState.auth);

  useEffect(() => {
    // Start listening to user data updates when the component mounts
    const unsubscribe = dispatch(listenToUserData());

    // Unsubscribe from updates when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const [UID, setUID] = useState('');

  useEffect(() => {
    async function fetchUID() {
      const uid = await getUID();
      setUID(uid);
    }

    fetchUID();
  }, [dispatch]);

  return (
    <>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
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
          />
        )}>
        <Tab.Screen name={SCREEN_NAMES.Home} component={Home} />
        <Tab.Screen name={SCREEN_NAMES.Network} component={Network} />
        <Tab.Screen
          name={SCREEN_NAMES.Notifications}
          component={Notifications}
        />
        <Tab.Screen name={SCREEN_NAMES.Jobs} component={SettingsScreen} />
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
    </>
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
