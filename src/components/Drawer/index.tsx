import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {RootState} from '@/store';
import {getUser} from '@/store/features/authSlice';
import {Home, Network, Notifications} from '@/screens';
import {COLORS, SCREEN_NAMES, PROFILE_TABS} from '@/constants';
import {getIcon} from '@/utils/IconsHelper';
import Profile from '@/screens/profile';
import {BottomSheet, SecondaryButton} from '@/components';
import {Cross} from '@/assets/icons';
import EditBasicInfoForm from '../Forms/EditBasicInfoForm';
import EditCareerForm from '../Forms/EditCareerForm';
import EditEducationForm from '../Forms/EditEducationForm';
const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View>
      <Text>Settings!</Text>
    </View>
  );
}

function Drawer({
  state,
  descriptors,
  navigation,
  isVisible,
  setIsVisible,
  tabItem,
}) {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((authState: RootState) => authState.auth);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

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
              {getIcon(label, isFocused, user.photoUrl)}
            </TouchableOpacity>
          );
        })}
      </View>
      {isVisible && (
        <BottomSheet
          isVisible={isVisible}
          onClose={() => {
            setIsVisible(false);
          }}
          profilePage>
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: '#E7E7E7',
                paddingHorizontal: 20,
                paddingBottom: 18,
              }}>
              <View
                style={{
                  backgroundColor: '#F4F4F4',
                  width: 42,
                  height: 42,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{width: 30, height: 30}}
                  onPress={() => setIsVisible(false)}>
                  <Cross />
                </TouchableOpacity>
              </View>
              <View>
                <SecondaryButton
                  title={
                    tabItem === 'Education'
                      ? 'Add New Education'
                      : tabItem === 'Career'
                      ? 'Add New Career'
                      : 'Profile'
                  }
                  style={
                    tabItem === 'Profile'
                      ? {
                          display: 'none',
                        }
                      : {
                          paddingHorizontal: 25,
                          paddingVertical: 7,
                          borderRadius: 1000,
                          marginTop: 5,
                          display: 'flex',
                        }
                  }
                />
              </View>
            </View>
            <View style={{paddingHorizontal: 20, paddingTop: 20}}>
              {tabItem === 'Profile' ? (
                <EditBasicInfoForm />
              ) : tabItem === 'Career' ? (
                <EditCareerForm />
              ) : (
                <EditEducationForm />
              )}
            </View>
          </View>
        </BottomSheet>
      )}
    </>
  );
}

const Tabs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tabItem, setTabItem] = useState(PROFILE_TABS[0]);
  return (
    <>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBar={props => (
          <Drawer
            {...props}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            tabItem={tabItem}
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
          initialParams={{isVisible, setIsVisible, setTabItem, tabItem}}
        />
      </Tab.Navigator>
    </>
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
