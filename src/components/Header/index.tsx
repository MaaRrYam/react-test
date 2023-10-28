import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity, TextInput} from 'react-native';

import {homeStyles} from '@/styles/home';
import {BackArrow, Chats} from '@/assets/icons';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {logOut} from '@/store/features/authSlice';
import {HeaderProps} from '@/types';
import {SearchButton} from '@/components';
import {COLORS} from '@/constants';

const Header = ({
  navigation,
  searchVisible,
  setSearchVisible,
  setSearchText,
  searchText,
  isSearchEnabled,
}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigation.navigate('Launch');
  };
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };
  useEffect(() => {
    console.log(searchText);
  }, [searchText]);
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                if (isSearchEnabled) {
                  setSearchVisible(false);
                }
              }}>
              <BackArrow />
            </TouchableOpacity>
            <TextInput
              placeholder="Search People"
              onChangeText={handleSearchTextChange}
              value={searchText}
              style={{
                width: 230,
                borderWidth: 1,
                borderColor: COLORS.border,
                borderRadius: 10,
                color: COLORS.text,
              }}
              placeholderTextColor={COLORS.text}
            />
          </View>
        )}
      </TouchableOpacity>
      <View style={homeStyles.headerIcons}>
        <SearchButton
          onPress={() => {
            if (isSearchEnabled) {
              setSearchVisible(true);
            }
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
