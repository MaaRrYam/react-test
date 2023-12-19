import React, {useState} from 'react';
import {View, TouchableOpacity, Image, TextInput} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {homeStyles} from '@/styles/home';
import {Chats, Filter} from '@/assets/icons';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {HeaderProps} from '@/types';
import {SearchButton} from '@/components';
import {refreshFeed, setFeedFetchedToFalse} from '@/store/features/homeSlice';

/**
 * @description This function checks if the search icon should be shown
 * @param routeName string
 * @returns boolean
 */
const shouldShowSearch = (routeName: string) => {
  return routeName === 'Jobs' || routeName === 'Network';
};

const Header = ({
  navigation,
  setSearchText,
  searchText,
  setJobsFilterBottomSheet,
}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const route = useRoute();

  const [searchVisible, setSearchVisible] = useState(false);

  /**
   * @description This function handles the click event on the logo
   * @returns void
   */
  const handleClick = () => {
    if (route.name === 'Home') {
      dispatch(refreshFeed());
      dispatch(setFeedFetchedToFalse());
    } else {
      navigation.navigate('Home');
    }
  };

  /**
   * @returns JSX.Element
   */
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
        <TextInput
          onChangeText={setSearchText}
          placeholder="Search"
          value={`${searchText}`}
          style={homeStyles.searchInput}
          placeholderTextColor={'gray'}
        />
      )}

      <View style={homeStyles.headerIcons}>
        {shouldShowSearch(route.name) && (
          <TouchableOpacity
            onPress={() => {
              if (route.name === 'Jobs' || route.name === 'Network') {
                setSearchVisible(!searchVisible);
              }
            }}>
            <SearchButton
              onPress={() => {
                if (route.name === 'Jobs' || route.name === 'Network') {
                  setSearchVisible(!searchVisible);
                }
              }}
              style={homeStyles.searchIcon}
            />
          </TouchableOpacity>
        )}

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
