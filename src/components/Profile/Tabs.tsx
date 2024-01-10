import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';

import profileStyles from '@/styles/profile';
import {BottomSheet, PrimaryButton, ProfileFeed} from '@/components';
import {COLORS, PROFILE_TABS} from '@/constants';
import {NewChatIcon} from '@/assets/icons';
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
import useUserManagement from '@/hooks/useUserManagement';

const Tabs = ({
  user,
  usersProfileID,
  handleOpen,
  setSelectedTab,
  selectedTab,
  setIsEditProfileVisible,
}: {
  user: UserInterface;
  usersProfileID: string;
  handleOpen: () => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  selectedTab: string;
  setIsEditProfileVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [comments, setComments] = useState({
    postId: '',
    loading: false,
    comments: [] as FeedCommentsResponse[],
    showComments: false,
  });

  const value = useUserManagement();

  const openBottomSheet = () => {
    setIsEditProfileVisible(true);
  };

  return (
    <>
      <View style={profileStyles.tabsContainer}>
        <View style={profileStyles.tabsHeader}>
          <View style={profileStyles.tabButtonContainer}>
            {PROFILE_TABS.map(tab => (
              <PrimaryButton
                key={tab}
                title={tab}
                backgroundColor={'#F4F4F4'}
                textColor={COLORS.black}
                style={
                  selectedTab === tab
                    ? profileStyles.selectedPrimaryButtonStyles
                    : profileStyles.PrimaryButtonStyles
                }
                onPress={() => {
                  setSelectedTab(tab);
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
              usersProfileID === value.user?.id && (
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
              bio={user.description as string}
              photo={user.photoUrl as string}
              id={user.id}
              handleOpen={handleOpen}
            />
          ) : selectedTab === PROFILE_TABS[1] ? (
            <CareerTab careerList={user.employmentList as EmploymentProps[]} />
          ) : (
            <EducationTab
              educationList={user.educationList as EducationProps[]}
            />
          )}
        </View>
      </View>

      {selectedTab === PROFILE_TABS[0] && (
        <View style={[styles.feedContainer, {paddingTop: 20}]}>
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
