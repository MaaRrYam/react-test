import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {homeStyles} from '@/styles/home';
import {Chats, Filter, SettingsIcon} from '@/assets/icons';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {logOut} from '@/store/features/authSlice';
import {HeaderProps} from '@/types';
import {SearchButton} from '@/components';

const Header = ({
  navigation,
  setJobsFilterBottomSheet,
  setIsSettingsClicked,
}: HeaderProps) => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigation.navigate('Launch');
  };
  return (
    <View style={homeStyles.header}>
      <TouchableOpacity onPress={handleLogout}>
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
        ) : route.name === 'Profile' ? (
          <TouchableOpacity
            style={[homeStyles.searchIcon, homeStyles.messageIcon]}
            onPress={() => setIsSettingsClicked(true)}>
            <SettingsIcon />
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
