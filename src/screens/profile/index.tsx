import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Loading, About, ProfileTabs} from '@/components';
import ProfileService from '@/services/profile';
import NetworkService from '@/services/network';
import {NetworkResponse, ProfileProps, UserInterface} from '@/interfaces';
import profileStyles from '@/styles/profile';

const Profile = ({navigation, route}: ProfileProps) => {
  const {setIsVisible, setTabItem, UID} = route.params;
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<UserInterface>({} as UserInterface);
  const [connections, setConnections] = useState<NetworkResponse[]>([]);
  const [pendingRequests, setPendingRequests] = useState<NetworkResponse[]>([]);
  const [sentRequests, setSentRequests] = useState<NetworkResponse[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [
      userProfile,
      connectionsResponse,
      pendingRequestsResponse,
      sentRequestsRequests,
    ] = await Promise.all([
      ProfileService.getUsersProfile(UID),
      NetworkService.getAllConnections(UID),
      NetworkService.getPendingConnectionRequests(UID),
      NetworkService.getPendingRequests(UID),
    ]);

    setUser(userProfile);
    setConnections(connectionsResponse);
    setPendingRequests(pendingRequestsResponse);
    setSentRequests(sentRequestsRequests);
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
          pendingRequests={pendingRequests}
          sentRequests={sentRequests}
          user={user}
          connections={connections}
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
