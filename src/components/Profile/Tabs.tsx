import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';

import profileStyles from '@/styles/profile';
import {BottomSheet, ProfileFeed, RoundedButton} from '@/components';
import {PROFILE_TABS} from '@/constants';
import {NewChatIcon} from '@/assets/icons';
import {useAppSelector} from '@/hooks/useAppSelector';
import {styles} from '@/screens/home/styles';
import {
  EmploymentProps,
  EducationProps,
  UserInterface,
  FeedCommentsResponse,
} from '@/interfaces';
import CareerTab from './CareerTab';
import EducationTab from './EducationTab';
import ProfileTab from './ProfileTab';
import PostComments from '../Feed/PostComments';

const Tabs = ({
  setTabItem,
  setIsVisible,
  user,
  usersProfileID,
}: {
  setTabItem: React.Dispatch<React.SetStateAction<string>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserInterface;
  usersProfileID: string;
}) => {
  const [selectedTab, setSelectedTab] = useState(PROFILE_TABS[0]);
  const [comments, setComments] = useState({
    postId: '',
    loading: false,
    comments: [] as FeedCommentsResponse[],
    showComments: false,
  });

  const loggedInUser = useAppSelector(state => state.auth.user);

  const openBottomSheet = () => {
    setIsVisible(true);
  };

  return (
    <>
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
            {!usersProfileID ? (
              <TouchableOpacity
                style={profileStyles.editIcon}
                onPress={openBottomSheet}>
                <NewChatIcon />
              </TouchableOpacity>
            ) : (
              usersProfileID === loggedInUser.id && (
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
            <CareerTab careerList={user?.employmentList as EmploymentProps[]} />
          ) : (
            <EducationTab
              educationList={user?.educationList as EducationProps[]}
            />
          )}
        </View>
      </View>

      {selectedTab === PROFILE_TABS[0] && (
        <View style={styles.feedContainer}>
          <ProfileFeed setComments={setComments} uid={usersProfileID} />
        </View>
      )}

      {comments.showComments && (
        <BottomSheet
          isVisible={comments.showComments}
          snapPoints={['20%', '100%']}
          onClose={() => setComments(prev => ({...prev, showComments: false}))}>
          <PostComments
            showComments={comments.showComments}
            comments={comments.comments}
            loading={comments.loading}
            setComments={setComments}
            postId={comments.postId}
          />
        </BottomSheet>
      )}
    </>
  );
};

export default Tabs;
