import React, {useState} from 'react';
import {View, Image, TouchableOpacity, TextInput} from 'react-native';

import {homeStyles} from '@/styles/home';
import {BackArrow, Chats, Filter} from '@/assets/icons';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {logOut} from '@/store/features/authSlice';
import {HeaderProps} from '@/types';
import {SearchButton} from '@/components';
import {COLORS} from '@/constants';
import {useRoute} from '@react-navigation/native';

const Header = ({
  navigation,
  setSearchText,
  searchText,
  setJobsFilterBottomSheet,
}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const handleLogout = () => {
    dispatch(logOut());
    navigation.navigate('Launch');
  };
  const [searchVisible, setSearchVisible] = useState(false);
  const handleSearchTextChange = (text: string) => {
    setSearchText!(text);
  };
  return (
    <View style={homeStyles.header}>
      <TouchableOpacity>
        {!searchVisible ? (
          <TouchableOpacity onPress={handleLogout}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={homeStyles.logo}
            />
          </TouchableOpacity>
        ) : (
          <View style={homeStyles.flexRow}>
            <TouchableOpacity
              onPress={() => {
                if (route.name === 'Jobs' || route.name === 'Network') {
                  setSearchVisible(false);
                }
              }}>
              <BackArrow />
            </TouchableOpacity>
            <TextInput
              placeholder={`Search ${
                route.name === 'Jobs' ? 'Jobs' : 'People'
              }`}
              onChangeText={handleSearchTextChange}
              value={searchText}
              style={homeStyles.searchBar}
              placeholderTextColor={COLORS.text}
            />
          </View>
        )}
      </TouchableOpacity>
      <View style={homeStyles.headerIcons}>
        <SearchButton
          onPress={() => {
            if (route.name === 'Jobs' || route.name === 'Network') {
              setSearchVisible(true);
            }
          }}
          style={homeStyles.searchIcon}
        />
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
