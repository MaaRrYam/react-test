import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {homeStyles} from '@/styles/home';
import {Chats, Filter} from '@/assets/icons';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {HeaderProps} from '@/types';
import {Input, SearchButton} from '@/components';
import {refreshFeed, setFeedFetchedToFalse} from '@/store/features/homeSlice';
import {logOut} from '@/store/features/authSlice';

const Header = ({
  navigation,
  setSearchText,
  searchText,
  setJobsFilterBottomSheet,
}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const handleClick = () => {
    if (route.name === 'Home') {
      dispatch(refreshFeed());
      dispatch(setFeedFetchedToFalse());
    } else {
      navigation.navigate('Home');
    }
  };
  const [searchVisible, setSearchVisible] = useState(false);
  const handleSearchTextChange = (text: string) => {
    setSearchText!(text);
  };
  return (
    <View style={homeStyles.header}>
      {!searchVisible ? (
        <TouchableOpacity onPress={handleClick}>
          <Image
            source={require('@/assets/images/logo.png')}
            resizeMode={'contain'}
            style={homeStyles.logo}
          />
        </TouchableOpacity>
      ) : (
        <Input
          onChangeText={handleSearchTextChange}
          placeholder="Search"
          value={searchText as string}
        />
      )}
      <View style={homeStyles.headerIcons}>
        <SearchButton
          onPress={() => {
            if (route.name === 'Jobs' || route.name === 'Network') {
              setSearchVisible(!searchVisible);
            }
          }}
          style={homeStyles.searchIcon}
        />
        {route.name === 'Jobs' ? (
          <TouchableOpacity
            style={[homeStyles.searchIcon, homeStyles.messageIcon]}
            onPress={() => setJobsFilterBottomSheet((prev: boolean) => !prev)}>
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
