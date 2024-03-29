import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {PrimaryButton, SecondaryButton, Loading} from '@/components';
import {RootStackParamList} from '@/types';
import profileStyles from '@/styles/profile';
import {UserInterface} from '@/interfaces';
import ChatsService from '@/services/chats';
import FirebaseService from '@/services/Firebase';
import useProfile from '@/hooks/useProfile';

const About = ({user}: {user: UserInterface}) => {
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
  } = useProfile(user.id, user);
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

  if (loading) {
    return (
      <View style={{width, height}}>
        <Loading />
      </View>
    );
  }

  const shouldMessageButtonHaveMarginLeft =
    (!isAlreadyConnected &&
      !isAlreadyPendingRequest &&
      !isConnectionRequestReceived) ||
    (isAlreadyPendingRequest && !isAlreadyConnected) ||
    isConnectionRequestReceived;

  return (
    <>
      <FastImage
        source={require('@/assets/images/background.jpg')}
        resizeMode={FastImage.resizeMode.cover}
        style={profileStyles.headerImage}
      />

      <View style={profileStyles.container}>
        <View style={profileStyles.avatarContainer}>
          <FastImage
            source={{
              uri: user?.photoUrl,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={profileStyles.avatarImage}
          />
        </View>
        <View style={profileStyles.userInfoContainer}>
          <Text style={profileStyles.userName}>{user?.name}</Text>
          {user.tagline && (
            <Text style={profileStyles.userTagline}>{user.tagline}</Text>
          )}
          <Text style={profileStyles.userLocation}>
            {user?.city}, {user?.country}
          </Text>
          {user?.allowEveryoneToSeeMyConnections !== false && (
            <Text style={profileStyles.connectionsLink}>
              {connections.length} connections
            </Text>
          )}

          <View style={profileStyles.buttonContainer}>
            {user.id !== loggedInUser.id && (
              <>
                {/* connect button */}
                {!isAlreadyConnected &&
                  !isAlreadyPendingRequest &&
                  !isConnectionRequestReceived && (
                    <PrimaryButton
                      title="Connect"
                      style={[profileStyles.connectButton]}
                      isLoading={buttonLoading}
                      onPress={handleConnect}
                    />
                  )}

                {/* accept button */}
                {isConnectionRequestReceived && (
                  <PrimaryButton
                    title="Accept"
                    style={profileStyles.connectButton}
                    onPress={handleAcceptConnection}
                    isLoading={buttonLoading}
                  />
                )}

                {/* request sent button */}
                {isAlreadyPendingRequest && !isAlreadyConnected && (
                  <SecondaryButton
                    title="Request Sent"
                    style={profileStyles.messageButton}
                    onPress={handleRemoveConnectionRequest}
                    isLoading={buttonLoading}
                  />
                )}

                {(user.allowEveryoneToSendMessage !== false ||
                  isAlreadyConnected) && (
                  <SecondaryButton
                    title="Message"
                    style={[
                      profileStyles.messageButton,
                      profileStyles.messageButtonMargin,
                      isAlreadyConnected &&
                        shouldMessageButtonHaveMarginLeft &&
                        profileStyles.messageMargin,
                    ]}
                    onPress={handleMessage}
                  />
                )}
              </>
            )}
            {/* <TouchableOpacity
              style={[
                profileStyles.optionsButton,
                usersProfileID === loggedInUser.id &&
                  profileStyles.moreButtonMargin,
              ]}>
              <View>
                <ThreeDots />
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </>
  );
};

export default About;
