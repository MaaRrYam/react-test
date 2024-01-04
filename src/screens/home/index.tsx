import React, {useState} from 'react';
import {View, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';

import {Header, Feed, NewPost} from '@/components';
import {HomeScreenProps} from '@/types';
import {homeStyles} from '@/styles/home';
import {styles} from './styles';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [isNewPostClicked, setIsNewPostClicked] = useState<boolean>(false);

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
          {isNewPostClicked && (
            <NewPost
              isVisible={isNewPostClicked}
              onClose={handleClose}
              isFromFeed={true}
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
