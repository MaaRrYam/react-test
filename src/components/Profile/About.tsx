import React, {useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

import {Header, PrimaryButton, SecondaryButton, Loading} from '@/components';
import {RootStackParamList} from '@/types';
import profileStyles from '@/styles/profile';
import {ThreeDots} from '@/assets/icons';
import {UserInterface} from '@/interfaces';
import ChatsService from '@/services/chats';
import FirebaseService from '@/services/Firebase';
import useProfile from '@/hooks/useProfile';

const About = ({
  navigation,
  usersProfileID,
  user,
  setUser,
}: {
  navigation: NavigationProp<RootStackParamList, 'Profile'>;
  usersProfileID: string;
  user: UserInterface;
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}) => {
  const {
    loading,
    buttonLoading,
    isAlreadyPendingRequest,
    isConnectionRequestReceived,
    isAlreadyConnected,
    handleConnect,
    handleRemoveConnectionRequest,
    handleAcceptConnection,
    loggedInUser,
    connections,
  } = useProfile(usersProfileID, user);
  const {width, height} = useWindowDimensions();

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

  useEffect(() => {
    if (usersProfileID === loggedInUser.id) {
      setUser(loggedInUser);
    }
  }, [loggedInUser, setUser, usersProfileID]);

  if (loading) {
    return (
      <View style={{width, height}}>
        <Loading />
      </View>
    );
  }

  return (
    <>
      <Header navigation={navigation} setJobsFilterBottomSheet={() => {}} />
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
                  {!isAlreadyConnected &&
                  !isAlreadyPendingRequest &&
                  !isConnectionRequestReceived ? (
                    <PrimaryButton
                      title="Connect"
                      style={[profileStyles.connectButton]}
                      isLoading={buttonLoading}
                      onPress={handleConnect}
                    />
                  ) : isConnectionRequestReceived ? (
                    <PrimaryButton
                      title="Accept"
                      style={profileStyles.connectButton}
                      onPress={handleAcceptConnection}
                      isLoading={buttonLoading}
                    />
                  ) : isAlreadyPendingRequest && !isAlreadyConnected ? (
                    <SecondaryButton
                      title="Request Sent"
                      style={profileStyles.messageButton}
                      onPress={handleRemoveConnectionRequest}
                      isLoading={buttonLoading}
                    />
                  ) : null}
                  <SecondaryButton
                    title="Message"
                    style={[
                      profileStyles.messageButton,
                      isAlreadyConnected && profileStyles.messageMargin,
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
