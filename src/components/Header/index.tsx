import React from 'react';
import {View, Image} from 'react-native';

import {homeStyles} from '@/styles/home';
import {IconButton} from '@/components';

const Header = ({navigation}: {navigation: any}) => {
  return (
    <View style={homeStyles.header}>
      <Image
        source={require('@/assets/images/apple.png')}
        style={homeStyles.logo}
      />
      <View style={homeStyles.headerIcons}>
        <IconButton
          imageSource={require('@/assets/images/searchIcon.png')}
          onPress={() => console.log('Search Icon Pressed')}
          style={{marginLeft: 20, backgroundColor: '#F4F4F4'}}
        />
        <IconButton
          imageSource={require('@/assets/images/messages.png')}
          onPress={() => navigation.navigate('Chats')}
          style={{marginLeft: 20, backgroundColor: '#F4F4F4'}}
        />
      </View>
    </View>
  );
};

export default Header;
