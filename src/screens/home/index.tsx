import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';

import {Header, Feed, NewPost} from '@/components';
import {HomeScreenProps} from '@/types';
import {homeStyles} from '@/styles/home';
import {styles} from './styles';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getAllUsers} from '@/store/features/chatsSlice';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [isNewPostClicked, setIsNewPostClicked] = useState<boolean>(false);

  const {isUsersFetched} = useAppSelector(state => state.chats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isUsersFetched) {
      dispatch(getAllUsers());
    }
  }, [dispatch, isUsersFetched]);

  const handleClose = () => {
    setIsNewPostClicked(false);
  };

  return (
    <View style={homeStyles.outerContainer}>
      <SafeAreaView style={homeStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={homeStyles.container}>
          <Header navigation={navigation} setJobsFilterBottomSheet={() => {}} />

          <View style={styles.feedContainer}>
            <Feed setIsNewPostClicked={setIsNewPostClicked} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {isNewPostClicked && (
        <NewPost
          isVisible={isNewPostClicked}
          onClose={handleClose}
          isFromFeed={true}
        />
      )}
    </View>
  );
};

export default HomeScreen;
