import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {
  Header,
  PrimaryButton,
  RoundedButton,
  SecondaryButton,
} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {RootState} from '@/store';
import {getUser} from '@/store/features/authSlice';
import {homeStyles} from '../../styles/home';
import {ThreeDots, NewChat} from '@/assets/icons';
import ProfileTab from './ProfileTab';
import profileStyles from '@/styles/profile'; // Import the styles

const Profile = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((authState: RootState) => authState.auth);
  const [selectedTab, setSelectedTab] = useState('Profile');

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  return (
    <SafeAreaView style={profileStyles.safeArea}>
      <View>
        <Header />
        <View>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
            style={profileStyles.headerImage}
          />
        </View>

        <View style={profileStyles.container}>
          <View style={profileStyles.avatarContainer}>
            <Image
              source={{
                uri: user.photoUrl,
              }}
              style={profileStyles.avatarImage}
            />
          </View>
          <View style={profileStyles.userInfoContainer}>
            <View>
              <Text style={profileStyles.userName}>{user.name}</Text>
              <Text style={profileStyles.userTagline}>{user.tagline}</Text>
              <Text style={profileStyles.userLocation}>
                {user.city}, {user.countryDetails.name}
              </Text>
              <Text style={profileStyles.connectionsLink}>26 connections</Text>
            </View>
            <View style={profileStyles.buttonContainer}>
              <PrimaryButton
                title="Connect"
                style={profileStyles.connectButton}
              />
              <SecondaryButton
                title="Message"
                style={profileStyles.messageButton}
              />
              <TouchableOpacity
                style={[
                  homeStyles.searchIcon,
                  homeStyles.messageIcon,
                  profileStyles.optionsButton,
                ]}>
                <View style={{paddingTop: 0}}>
                  <ThreeDots />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={profileStyles.tabsContainer}>
          <View style={profileStyles.tabsHeader}>
            <View style={profileStyles.tabButtonContainer}>
              <RoundedButton
                text="Profile"
                style={
                  selectedTab === 'Profile'
                    ? profileStyles.selectedTabButton
                    : profileStyles.tabButton
                }
                onPress={() => setSelectedTab('Profile')}
              />
              <RoundedButton
                text="Career"
                style={
                  selectedTab === 'Career'
                    ? profileStyles.selectedTabButton
                    : profileStyles.tabButton
                }
                onPress={() => setSelectedTab('Career')}
              />
              <RoundedButton
                text="Education"
                style={
                  selectedTab === 'Education'
                    ? profileStyles.selectedTabButton
                    : {borderRadius: 10}
                }
                onPress={() => setSelectedTab('Education')}
              />
            </View>
            <View>
              <TouchableOpacity
                style={[
                  homeStyles.searchIcon,
                  homeStyles.messageIcon,
                  {marginTop: -2},
                ]}>
                <View style={{paddingTop: 0}}>
                  <NewChat />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {selectedTab === 'Profile' ? (
              <ProfileTab bio={user.description as string} />
            ) : selectedTab === 'Career' ? (
              <View>
                <Text>Career</Text>
              </View>
            ) : (
              <View>
                <Text>Education</Text>
              </View>
            )}
          </View>
        </View>

        <View>
          <Text style={profileStyles.postsHeader}>Posts</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
