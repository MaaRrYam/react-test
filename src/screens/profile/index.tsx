import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  Header,
  PrimaryButton,
  RoundedButton,
  SecondaryButton,
} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {RootState} from '@/store';
import {getUser} from '@/store/features/authSlice';
import {getConnections} from '@/store/features/networkSlice';
import {ThreeDots, NewChatIcon as NewChat} from '@/assets/icons';
import ProfileTab from '@/screens/Profile/ProfileTab';
import profileStyles from '@/styles/profile';
import {BORDER_RADIUS, COLORS, PADDING, PROFILE_TABS} from '@/constants';
import {Comment, Dislike, Like, Report, Share} from '@/assets/icons';
import CareerTab from '@/screens/Profile/CareerTab';
import EducationTab from '@/screens/Profile/EducationTab';

interface ProfileProps {
  navigation: any;
  route: {
    params: {
      setTabItem: React.Dispatch<React.SetStateAction<string>>;
      setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
      tabItem: string;
      isEditing: boolean;
    };
  };
}

const Profile = ({navigation, route}: ProfileProps) => {
  const {setIsVisible, setTabItem, isEditing} = route.params;
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((authState: RootState) => authState.auth);
  const {connections, isConnectionsFetched} = useAppSelector(
    (networkState: RootState) => networkState.network,
  );
  const [selectedTab, setSelectedTab] = useState(PROFILE_TABS[0]);
  const openBottomSheet = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  const fetchData = useCallback(() => {
    if (!isConnectionsFetched) {
      dispatch(getConnections());
    }
  }, [dispatch, isConnectionsFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const feedData = [
    {
      id: '1',
      title: 'Post 1',
      content: 'This is the content of the first post.',
      author: {
        name: user?.name,
        tagline: user.tagline,
        avatar: {uri: user.photoUrl},
      },
      media: require('@/assets/images/post.png'),
      time: '2 hours ago',
      likes: 20,
      comments: 2,
    },
    {
      id: '12',
      title: 'Post 1',
      content: 'This is the content of the first post.',
      author: {
        name: user.name,
        tagline: user.tagline,
        avatar: {uri: user.photoUrl},
      },
      media: require('@/assets/images/post.png'),
      time: '2 hours ago',
      likes: 20,
      comments: 2,
    },
    {
      id: '21',
      title: 'Post 1',
      content: 'This is the content of the first post.',
      author: {
        name: user.name,
        tagline: user.tagline,
        avatar: {uri: user.photoUrl},
      },
      time: '2 hours ago',
      likes: 20,
      comments: 2,
    },
    {
      id: '112',
      title: 'Post 1',
      content: 'This is the content of the first post.',
      author: {
        name: user.name,
        tagline: user.tagline,
        avatar: {uri: user.photoUrl},
      },
      time: '2 hours ago',
      likes: 20,
      comments: 2,
    },
  ];

  return (
    <>
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
                    uri: user.photoUrl,
                  }}
                  style={profileStyles.avatarImage}
                />
              </View>
              <View style={profileStyles.userInfoContainer}>
                <View>
                  <Text style={profileStyles.userName}>{user.name}</Text>
                  <Text style={profileStyles.userTagline}>{user.tagline}</Text>
                  <Text style={profileStyles.userLocation}>
                    {user.city}, {user.countryDetails.name}
                  </Text>
                  <Text style={profileStyles.connectionsLink}>
                    {connections.length} connections
                  </Text>
                </View>
                <View style={profileStyles.buttonContainer}>
                  <PrimaryButton
                    title="Connect"
                    style={profileStyles.connectButton}
                  />
                  <SecondaryButton
                    title="Message"
                    style={profileStyles.messageButton}
                  />
                  <TouchableOpacity style={profileStyles.optionsButton}>
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
                          ? {borderRadius: 10}
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
                  <TouchableOpacity
                    style={profileStyles.editIcon}
                    onPress={openBottomSheet}>
                    <NewChat />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                {selectedTab === PROFILE_TABS[0] ? (
                  <ProfileTab
                    bio={user.description as string}
                    photo={user.photoUrl as string}
                  />
                ) : selectedTab === PROFILE_TABS[1] ? (
                  <CareerTab
                    careerList={user.employmentList}
                    isEditing={isEditing}
                  />
                ) : (
                  <EducationTab
                    educationList={user.educationList}
                    isEditing={isEditing}
                  />
                )}
              </View>
            </View>

            {selectedTab === PROFILE_TABS[0] && (
              <View style={styles.feedContainer}>
                <FlatList
                  data={feedData}
                  renderItem={({item}) => (
                    <View style={styles.feedItem}>
                      <View style={styles.authorInfo}>
                        <Image
                          source={item.author.avatar}
                          style={styles.userImage}
                        />
                        <View style={{marginLeft: 10}}>
                          <Text style={styles.authorName}>
                            {item.author.name}
                          </Text>
                          <Text style={styles.authorTagline}>
                            {item.author.tagline}
                          </Text>
                          <Text style={styles.authorTagline}>{item.time}</Text>
                        </View>
                      </View>
                      <Text style={styles.feedContent}>{item.content}</Text>
                      {item.media && (
                        <Image source={item.media} style={styles.media} />
                      )}
                      <View style={styles.postReactions}>
                        <View style={styles.reactionButton}>
                          <Like />
                        </View>
                        <Text style={styles.like}>{item.likes}</Text>
                        <View style={styles.reactionButton}>
                          <Dislike />
                        </View>

                        <View style={styles.iconsContainer}>
                          <TouchableOpacity>
                            <Comment />
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Share />
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Report />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  postReactions: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 3 / 4,
    marginLeft: 15,
  },
  reactionButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#F4F4F4',
    borderRadius: BORDER_RADIUS.general * 2,
  },
  like: {
    paddingTop: 7,
    marginHorizontal: 8,
    color: COLORS.black,
  },
  subheader: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: PADDING.general,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    maxHeight: 100,
  },
  searchBar: {
    flex: 1,
    borderRadius: BORDER_RADIUS.general * 2,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: 10,
    paddingVertical: PADDING.general - 6,
    marginLeft: 10,
    color: COLORS.black,
  },
  searchIcon: {
    marginRight: 10,
  },
  userImage: {
    width: 43,
    height: 43,
    borderRadius: 15,
  },
  feedContainer: {
    flex: 1,
    backgroundColor: COLORS.lightBlueBackground,
    paddingTop: PADDING.general,
  },
  feedItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    elevation: 2,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  feedContent: {
    fontSize: 13,
    color: COLORS.black,
    marginTop: 10,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorText: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  authorTagline: {
    fontSize: 14,
    color: 'gray',
  },
  postTime: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  moreIcon: {
    alignSelf: 'flex-end',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: 'gray',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: 'white',
    padding: 16,
  },
});

export default Profile;
