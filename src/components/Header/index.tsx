import React, {useState} from 'react';
import {View, Image, TouchableOpacity, TextInput} from 'react-native';

import {homeStyles} from '@/styles/home';
import {BackArrow, Chats} from '@/assets/icons';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {logOut} from '@/store/features/authSlice';
import {HeaderProps} from '@/types';
import {Input, SearchButton} from '@/components';
import {COLORS} from '@/constants';

const Header = ({
  navigation,
  searchVisible,
  setSearchVisible,
  setSearchText,
  searchText,
}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigation.navigate('Launch');
  };
  return (
    <View style={homeStyles.header}>
      <TouchableOpacity onPress={handleLogout}>
        {!searchVisible ? (
          <Image
            source={require('@/assets/images/logo.png')}
            style={homeStyles.logo}
          />
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BackArrow />
            <Input
              placeholder="Search People"
              onChange={setSearchText}
              value={searchText as string}
            />
          </View>
        )}
      </TouchableOpacity>
      <View style={homeStyles.headerIcons}>
        <SearchButton
          onPress={() => {
            setSearchVisible(true);
          }}
          style={homeStyles.searchIcon}
        />
        <TouchableOpacity
          style={[homeStyles.searchIcon, homeStyles.messageIcon]}
          onPress={() => navigation.navigate('Chats')}>
          <Chats />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
