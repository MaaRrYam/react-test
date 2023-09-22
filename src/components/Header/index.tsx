import React, {useCallback} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import {homeStyles} from '@/styles/home';
import {Search, Chats} from '@/assets/icons';
import {SCREEN_NAMES} from '@/constants';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {addUser, logOut} from '@/store/features/authSlice';

const Header = ({navigation}: {navigation: any}) => {
  const dispatch = useAppDispatch();
  // const user = useAppSelector((state: RootState) => state.auth.user);
  const addUserToRedux = useCallback(
    (token: any, userData: any) => {
      dispatch(addUser({token, user: userData}));
    },
    [dispatch],
  );

  const handleLogout = () => {
    addUserToRedux(null, {});
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
