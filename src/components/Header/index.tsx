import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import {homeStyles} from '@/styles/home';
import {Chats} from '@/assets/icons';
import Filter from '@/assets/icons/Filter';
import {SCREEN_NAMES} from '@/constants';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {logOut} from '@/store/features/authSlice';
import {HeaderProps} from '@/types';
import {SearchButton} from '@/components';

const Header = ({navigation, jobs, setJobsFilterBottomSheet}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigation.navigate(SCREEN_NAMES.Launch);
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
        {jobs ? (
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
