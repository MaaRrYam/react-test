import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Header,
  PrimaryButton,
  RoundedButton,
  SecondaryButton,
  Loading,
  ProfileFeed,
  BottomSheet,
} from '@/components';
import {ThreeDots, NewChatIcon} from '@/assets/icons';
import ProfileTab from '@/screens/Profile/ProfileTab';
import CareerTab from '@/screens/Profile/CareerTab';
import EducationTab from '@/screens/Profile/EducationTab';
import {PROFILE_TABS} from '@/constants';
import {useUserDoc} from '@/hooks/useUserDoc';
import useGetSentRequests from '@/hooks/useGetSentRequests';
import useGetPendingRequests from '@/hooks/useGetPendingRequest';
import useConnections from '@/hooks/useGetUserConnection';
import {getUID} from '@/utils/functions';
import ProfileService from '@/services/profile';
import NetworkService from '@/services/network';
import {
  ChatsInterface,
  EducationProps,
  EmploymentProps,
  FeedCommentsResponse,
  ProfileProps,
} from '@/interfaces';
import {SCREEN_NAMES} from '@/constants';
import {styles} from '@/screens/home/styles';
import profileStyles from '@/styles/profile';
import PostComments from '@/components/Feed/PostComments';
import ChatsService from '@/services/chats';
import {useAppSelector} from '@/hooks/useAppSelector';

const Profile = ({navigation, route}: ProfileProps) => {
  const [filteredChats, setFilteredChats] = useState<ChatsInterface[]>([]);
  const {chats, isChatsFetched} = useAppSelector(state => state.chats);
  const {setIsVisible, setTabItem, UID} = route.params;
  const [userUID, setUserUID] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const user = useUserDoc(UID ? UID : userUID);
  const pendingRequests = useGetPendingRequests(UID);
  const connections = useConnections(UID);
  const sentRequests = useGetSentRequests(UID);
  const [selectedTab, setSelectedTab] = useState(PROFILE_TABS[0]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [comments, setComments] = useState({
    postId: '',
    loading: false,
    comments: [] as FeedCommentsResponse[],
    showComments: false,
  });
  const openBottomSheet = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    const fetchUID = async () => {
      try {
        const fetchedUID = await getUID();
        setUserUID(fetchedUID as string);
      } catch (error) {
        console.error('Error fetching UID:', error);
      }
    };
    fetchUID();

    if (user) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [user, UID, userUID]);

  useEffect(() => {
    setFilteredChats(chats);

    if (user.name) {
      setFilteredChats(
        chats.filter(chat =>
          chat.name.toLowerCase().includes(user.name.toLowerCase()),
        ),
      );
    } else {
      setFilteredChats(chats);
    }
  }, [chats, isChatsFetched, user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <SafeAreaView style={profileStyles.safeArea}>
            <View>
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
                      (UID === userUID || UID === '') &&
                        profileStyles.justifyEnd,
                    ]}>
                    {!UID ||
                      (UID !== userUID && (
                        <>
                          {!connections.some(conn => conn.id === userUID) &&
                          !pendingRequests.some(conn => conn.id === userUID) &&
                          !sentRequests.some(conn => conn.id === userUID) ? (
                            <PrimaryButton
                              title="Connect"
                              style={[profileStyles.connectButton]}
                              isLoading={buttonLoading}
                              onPress={async () => {
                                await setButtonLoading(true);
                                await NetworkService.connectWithSomeone(UID);
                                await setButtonLoading(false);
                              }}
                            />
                          ) : pendingRequests.some(
                              conn => conn.id === userUID,
                            ) ? (
                            <PrimaryButton
                              title="Accept"
                              style={profileStyles.connectButton}
                              onPress={async () => {
                                await setButtonLoading(true);
                                await ProfileService.acceptRequest(
                                  UID,
                                  userUID,
                                );
                                await setButtonLoading(false);
                              }}
                            />
                          ) : sentRequests.some(conn => conn.id === userUID) &&
                            !connections.some(conn => conn.id === userUID) ? (
                            <SecondaryButton
                              title="Request Sent"
                              style={profileStyles.messageButton}
                              onPress={async () => {
                                await ProfileService.acceptRequest(
                                  UID,
                                  userUID,
                                );
                              }}
                            />
                          ) : null}
                          <SecondaryButton
                            title="Message"
                            style={[
                              profileStyles.messageButton,
                              connections.some(conn => conn.id === userUID) &&
                                connections.some(conn => conn.id === userUID) &&
                                profileStyles.messageMargin,
                            ]}
                            onPress={async () => {
                              const response = await ChatsService.addNewChat(
                                user.id,
                                filteredChats[0],
                              );
                              if (response) {
                                navigation.navigate(SCREEN_NAMES.ChatDetails, {
                                  id: user.id,
                                  name: user?.name,
                                  user: user,
                                });
                              }
                            }}
                          />
                        </>
                      ))}
                    <TouchableOpacity
                      style={[
                        profileStyles.optionsButton,
                        UID === userUID && profileStyles.moreButtonMargin,
                      ]}>
                      <View>
                        <ThreeDots />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={profileStyles.tabsContainer}>
                <View style={profileStyles.tabsHeader}>
                  <View style={profileStyles.tabButtonContainer}>
                    {PROFILE_TABS.map((tab, index) => (
                      <RoundedButton
                        key={tab}
                        text={tab}
                        style={
                          selectedTab === tab
                            ? profileStyles.selectedTabButton
                            : index === PROFILE_TABS.length - 1
                            ? profileStyles.tabBorderRadius
                            : profileStyles.tabButton
                        }
                        onPress={() => {
                          setSelectedTab(tab);
                          setTabItem(tab);
                        }}
                      />
                    ))}
                  </View>
                  <View>
                    {!UID ? (
                      <TouchableOpacity
                        style={profileStyles.editIcon}
                        onPress={openBottomSheet}>
                        <NewChatIcon />
                      </TouchableOpacity>
                    ) : (
                      UID === userUID && (
                        <TouchableOpacity
                          style={profileStyles.editIcon}
                          onPress={openBottomSheet}>
                          <NewChatIcon />
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                </View>
                <View>
                  {selectedTab === PROFILE_TABS[0] ? (
                    <ProfileTab
                      bio={user?.description as string}
                      photo={user?.photoUrl as string}
                    />
                  ) : selectedTab === PROFILE_TABS[1] ? (
                    <CareerTab
                      careerList={user?.employmentList as EmploymentProps[]}
                    />
                  ) : (
                    <EducationTab
                      educationList={user?.educationList as EducationProps[]}
                    />
                  )}
                </View>
              </View>

              {selectedTab === PROFILE_TABS[0] && !loading && (
                <View style={styles.feedContainer}>
                  <ProfileFeed setComments={setComments} uid={UID || userUID} />
                </View>
              )}
            </View>
            {comments.showComments && (
              <BottomSheet
                isVisible={comments.showComments}
                snapPoints={['20%', '100%']}
                onClose={() =>
                  setComments(prev => ({...prev, showComments: false}))
                }>
                <PostComments
                  showComments={comments.showComments}
                  comments={comments.comments}
                  loading={comments.loading}
                  setComments={setComments}
                  postId={comments.postId}
                />
              </BottomSheet>
            )}
          </SafeAreaView>
        </ScrollView>
      )}
    </>
  );
};

export default Profile;
