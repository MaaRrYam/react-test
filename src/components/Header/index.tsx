import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import {homeStyles} from '@/styles/home';
import {Search, Chats} from '@/assets/icons';
import StorageService from '@/services/Storage';
import {SCREEN_NAMES} from '@/constants';

const Header = ({navigation}: {navigation: any}) => {
  return (
    <View style={homeStyles.header}>
      <TouchableOpacity
        onPress={async () => {
          await StorageService.removeItem('uid');
          navigation.navigate(SCREEN_NAMES.Launch);
        }}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={homeStyles.logo}
        />
      </TouchableOpacity>
      <View style={homeStyles.headerIcons}>
        <TouchableOpacity style={homeStyles.searchIcon}>
          <Search />
        </TouchableOpacity>

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
