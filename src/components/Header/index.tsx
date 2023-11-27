import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {homeStyles} from '@/styles/home';
import {Chats, Filter} from '@/assets/icons';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {HeaderProps} from '@/types';
import {SearchButton} from '@/components';
import {refreshFeed, setFeedFetchedToFalse} from '@/store/features/homeSlice';

const Header = ({navigation, setJobsFilterBottomSheet}: HeaderProps) => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (route.name === 'Home') {
      dispatch(refreshFeed());
      dispatch(setFeedFetchedToFalse());
    } else {
      navigation.navigate('Home');
    }
  };
  return (
    <View style={homeStyles.header}>
      <TouchableOpacity onPress={handleClick}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={homeStyles.logo}
        />
      </TouchableOpacity>
      <View style={homeStyles.headerIcons}>
        <SearchButton onPress={() => {}} style={homeStyles.searchIcon} />
        {route.name === 'Jobs' ? (
          <TouchableOpacity
            style={[homeStyles.searchIcon, homeStyles.messageIcon]}
            onPress={() => setJobsFilterBottomSheet(prev => !prev)}>
            <Filter />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[homeStyles.searchIcon, homeStyles.messageIcon]}
            onPress={() => navigation.navigate('Chats')}>
            <Chats />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
