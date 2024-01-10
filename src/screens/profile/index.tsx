import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, RefreshControl} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {Loading, About, ProfileTabs, NewPost, Header} from '@/components';
import ProfileService from '@/services/profile';
import {ProfileProps, UserInterface} from '@/interfaces';
import profileStyles from '@/styles/profile';
import Settings from '../settings';
import {useAppSelector} from '@/hooks/useAppSelector';
import EditProfile from '@/components/EditProfile';
import {PROFILE_TABS} from '@/constants';
import {RootStackParamList} from '@/types';

const Profile = ({route}: ProfileProps) => {
  const {uid, user} = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const currentLoggedInUser = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState(PROFILE_TABS[0]);

  const [profileUser, setProfileUser] = useState<UserInterface>(
    currentLoggedInUser.id === uid
      ? currentLoggedInUser
      : user
      ? user
      : ({} as UserInterface),
  );

  const [isNewPostClicked, setIsNewPostClicked] = useState(false);
  const [isSettingsClicked, setIsSettingsClicked] = useState(false);

  const handleClose = () => {
    setIsNewPostClicked(false);
  };

  const handleSettingsClose = () => {
    setIsSettingsClicked(false);
  };
  const handleOpen = () => {
    setIsNewPostClicked(true);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);

    const [userProfile] = await Promise.all([
      ProfileService.getUsersProfile(uid),
    ]);

    setProfileUser(userProfile);
    setLoading(false);
  }, [uid]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchData();
    setIsRefreshing(false);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [uid, fetchData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <SafeAreaView style={profileStyles.safeArea}>
        <Header
          navigation={navigation}
          setJobsFilterBottomSheet={() => {}}
          setIsSettingsClicked={setIsSettingsClicked}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          <About user={profileUser} />
          <ProfileTabs
            user={profileUser}
            usersProfileID={uid}
            handleOpen={handleOpen}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
            setIsEditProfileVisible={setIsEditProfileVisible}
          />
        </ScrollView>
      </SafeAreaView>
      {isNewPostClicked && (
        <NewPost isVisible={isNewPostClicked} onClose={handleClose} />
      )}
      {isSettingsClicked && (
        <Settings isVisible={isSettingsClicked} onClose={handleSettingsClose} />
      )}

      {isEditProfileVisible && (
        <EditProfile
          isVisible={isEditProfileVisible}
          onClose={() => setIsEditProfileVisible(false)}
          tabItem={selectedTab}
          user={(user || currentLoggedInUser) as UserInterface}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
        />
      )}
    </>
  );
};

export default Profile;
