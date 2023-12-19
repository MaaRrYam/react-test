import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {Header, PrimaryButton, SecondaryButton, Loading} from '@/components';
import {RootStackParamList} from '@/types';
import profileStyles from '@/styles/profile';
import {UserInterface} from '@/interfaces';
import ChatsService from '@/services/chats';
import FirebaseService from '@/services/Firebase';
import useProfile from '@/hooks/useProfile';

const About = ({
  user,
  setIsSettingsClicked,
}: {
  user: UserInterface;
  setIsSettingsClicked: React.Dispatch<React.SetStateAction<boolean>>;
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

  return (
    <>
      <Header
        navigation={navigation}
        setJobsFilterBottomSheet={() => {}}
        setIsSettingsClicked={setIsSettingsClicked}
      />
      <View>
        <FastImage
          source={{
            uri: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={profileStyles.headerImage}
        />
      </View>

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
          <Text style={profileStyles.userTagline}>
            {user?.tagline || 'Tagline Not Available'}
          </Text>
          <Text style={profileStyles.userLocation}>
            {user?.city}, {user?.country}
          </Text>
          <Text style={profileStyles.connectionsLink}>
            {connections.length} connections
          </Text>

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
                <View>
                  <SecondaryButton
                    title="Message"
                    style={[
                      profileStyles.messageButton,
                      profileStyles.messageButtonMargin,
                      isAlreadyConnected && profileStyles.messageMargin,
                    ]}
                    onPress={handleMessage}
                  />
                </View>
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
