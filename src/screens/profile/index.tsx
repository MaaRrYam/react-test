import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, RefreshControl} from 'react-native';
import {Loading, About, ProfileTabs, NewPost} from '@/components';
import ProfileService from '@/services/profile';
import {ProfileProps, UserInterface} from '@/interfaces';
import profileStyles from '@/styles/profile';
import Settings from '../settings';
import {useAppSelector} from '@/hooks/useAppSelector';

const Profile = ({route}: ProfileProps) => {
  const {uid, user} = route.params;
  const currentLoggedInUser = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          <About
            user={profileUser}
            setIsSettingsClicked={setIsSettingsClicked}
          />
          <ProfileTabs
            user={profileUser}
            usersProfileID={uid}
            handleOpen={handleOpen}
          />
        </ScrollView>
      </SafeAreaView>
      {isNewPostClicked && (
        <NewPost isVisible={isNewPostClicked} onClose={handleClose} />
      )}
      {isSettingsClicked && (
        <Settings isVisible={isSettingsClicked} onClose={handleSettingsClose} />
      )}
    </>
  );
};

export default Profile;
