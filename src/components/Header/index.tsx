import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import {homeStyles} from '@/styles/home';
import {Search, Chats} from '@/assets/icons';

const Header = ({navigation}: {navigation: any}) => {
  return (
    <View style={homeStyles.header}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={homeStyles.logo}
      />
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
