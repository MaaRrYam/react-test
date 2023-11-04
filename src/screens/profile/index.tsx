import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Loading, About, ProfileTabs, NewPost, BottomSheet} from '@/components';
import ProfileService from '@/services/profile';
import {ProfileProps, UserInterface} from '@/interfaces';
import profileStyles from '@/styles/profile';

const Profile = ({navigation, route}: ProfileProps) => {
  const {setIsVisible, setTabItem, UID} = route.params;
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<UserInterface>({} as UserInterface);
  const [isNewPostClicked, setIsNewPostClicked] = useState(false);
  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const handleClose = () => {
    setIsNewPostClicked(false);
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
        <BottomSheet
          isVisible={isSettingsClicked}
          onClose={() => setIsSettingsClicked(false)}
          snapPoints={['10%', '100%']}
          indicatorVisible={false}>
          <View>
            <Text style={{color: 'black'}}>HELOO</Text>
          </View>
        </BottomSheet>
      )}
    </>
  );
};

export default Profile;
