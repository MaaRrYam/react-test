import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

import {Header, PrimaryButton, SecondaryButton} from '@/components';
import {RootStackParamList} from '@/types';
import profileStyles from '@/styles/profile';
import {useAppSelector} from '@/hooks/useAppSelector';
import ProfileService from '@/services/profile';
import {ThreeDots} from '@/assets/icons';
import NetworkService from '@/services/network';
import {NetworkResponse, UserInterface} from '@/interfaces';
import ChatsService from '@/services/chats';
import FirebaseService from '@/services/Firebase';

const About = ({
  navigation,
  usersProfileID,
  pendingRequests,
  sentRequests,
  connections,
  user,
}: {
  navigation: NavigationProp<RootStackParamList, 'Profile'>;
  usersProfileID: string;
  connections: NetworkResponse[];
  pendingRequests: NetworkResponse[];
  sentRequests: NetworkResponse[];
  user: UserInterface;
}) => {
  const loggedInUser = useAppSelector(state => state.auth.user);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleConnect = async () => {
    setButtonLoading(true);
    await NetworkService.connectWithSomeone(usersProfileID);
    setButtonLoading(false);
  };

  const handleAcceptConnection = async () => {
    setButtonLoading(true);
    await ProfileService.acceptRequest(usersProfileID, loggedInUser.id);
    setButtonLoading(false);
  };

  const handleMessage = async () => {
    const chatPayload = {
      id: user.id,
      userId: user.id,
      message: '',
      name: user.name,
      photoUrl: user.photoUrl || '',
      read: true,
      time: FirebaseService.serverTimestamp(),
      user,
    };
    const response = await ChatsService.addNewChat(
      loggedInUser.id,
      chatPayload,
    );
    if (response) {
      navigation.navigate('ChatDetails', {
        id: user.id,
        name: user?.name,
        user: user,
      });
    }
  };

  return (
    <>
      <Header navigation={navigation} />
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
              uri: user?.photoUrl,
            }}
            style={profileStyles.avatarImage}
          />
        </View>
        <View style={profileStyles.userInfoContainer}>
          <View>
            <Text style={profileStyles.userName}>{user?.name}</Text>
            <Text style={profileStyles.userTagline}>
              {user?.tagline || 'Tagline Not Available'}
            </Text>
            <Text style={profileStyles.userLocation}>
              {user?.city}, {user?.country}
            </Text>
            <Text style={profileStyles.connectionsLink}>
              {connections.length} connections
            </Text>
          </View>
          <View
            style={[
              profileStyles.buttonContainer,
              (usersProfileID === loggedInUser.id || usersProfileID === '') &&
                profileStyles.justifyEnd,
            ]}>
            {!usersProfileID ||
              (usersProfileID !== loggedInUser.id && (
                <>
                  {!connections.some(conn => conn.id === loggedInUser.id) &&
                  !pendingRequests.some(conn => conn.id === loggedInUser.id) &&
                  !sentRequests.some(conn => conn.id === loggedInUser.id) ? (
                    <PrimaryButton
                      title="Connect"
                      style={[profileStyles.connectButton]}
                      isLoading={buttonLoading}
                      onPress={handleConnect}
                    />
                  ) : pendingRequests.some(
                      conn => conn.id === loggedInUser.id,
                    ) ? (
                    <PrimaryButton
                      title="Accept"
                      style={profileStyles.connectButton}
                      onPress={handleAcceptConnection}
                      isLoading={buttonLoading}
                    />
                  ) : sentRequests.some(conn => conn.id === loggedInUser.id) &&
                    !connections.some(conn => conn.id === loggedInUser.id) ? (
                    <SecondaryButton
                      title="Request Sent"
                      style={profileStyles.messageButton}
                      onPress={async () => {
                        await ProfileService.acceptRequest(
                          usersProfileID,
                          loggedInUser.id,
                        );
                      }}
                    />
                  ) : null}
                  <SecondaryButton
                    title="Message"
                    style={[
                      profileStyles.messageButton,
                      connections.some(conn => conn.id === loggedInUser.id) &&
                        connections.some(conn => conn.id === loggedInUser.id) &&
                        profileStyles.messageMargin,
                    ]}
                    onPress={handleMessage}
                  />
                </>
              ))}
            <TouchableOpacity
              style={[
                profileStyles.optionsButton,
                usersProfileID === loggedInUser.id &&
                  profileStyles.moreButtonMargin,
              ]}>
              <View>
                <ThreeDots />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default About;
