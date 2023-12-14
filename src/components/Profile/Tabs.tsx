import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';

import profileStyles from '@/styles/profile';
import {BottomSheet, PrimaryButton, ProfileFeed} from '@/components';
import EditProfile from '@/components/EditProfile';
import {COLORS, PROFILE_TABS} from '@/constants';
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
  user,
  usersProfileID,
  handleOpen,
}: {
  user: UserInterface;
  usersProfileID: string;
  handleOpen: () => void;
}) => {
  const [selectedTab, setSelectedTab] = useState(PROFILE_TABS[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
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
              bio={user.description as string}
              photo={user.photoUrl as string}
              id={user.id}
              loggedInID={loggedInUser.id}
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

      {isVisible && (
        <EditProfile
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          tabItem={selectedTab}
          user={user}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
        />
      )}
    </>
  );
};

export default Tabs;
