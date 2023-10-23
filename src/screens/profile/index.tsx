import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Loading, About, ProfileTabs} from '@/components';
import ProfileService from '@/services/profile';
import {ProfileProps, UserInterface} from '@/interfaces';
import profileStyles from '@/styles/profile';

const Profile = ({navigation, route}: ProfileProps) => {
  const {setIsVisible, setTabItem, UID} = route.params;
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<UserInterface>({} as UserInterface);

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
    <SafeAreaView style={profileStyles.safeArea}>
      <ScrollView>
        <About
          navigation={navigation}
          usersProfileID={UID}
          user={user}
          setUser={setUser}
        />
        <ProfileTabs
          setTabItem={setTabItem}
          setIsVisible={setIsVisible}
          user={user}
          usersProfileID={UID}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
