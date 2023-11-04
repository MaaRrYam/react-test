import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Loading, About, ProfileTabs, NewPost} from '@/components';
import ProfileService from '@/services/profile';
import {ProfileProps, UserInterface} from '@/interfaces';
import profileStyles from '@/styles/profile';
import Settings from '../settings';

const Profile = ({navigation, route}: ProfileProps) => {
  const {setIsVisible, setTabItem, UID} = route.params;
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<UserInterface>({} as UserInterface);
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
      ProfileService.getUsersProfile(UID),
    ]);

    setUser(userProfile);
    setLoading(false);
  }, [UID]);

  useEffect(() => {
    fetchData();
  }, [UID, fetchData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <SafeAreaView style={profileStyles.safeArea}>
        <ScrollView>
          <About
            navigation={navigation}
            usersProfileID={UID}
            user={user}
            setUser={setUser}
            setIsSettingsClicked={setIsSettingsClicked}
          />
          <ProfileTabs
            setTabItem={setTabItem}
            setIsVisible={setIsVisible}
            user={user}
            usersProfileID={UID}
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
