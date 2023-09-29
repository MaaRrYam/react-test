import React, {FC} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {BORDER_RADIUS, COLORS, PADDING} from '@/constants';
import {BottomSheet} from '@/components';
interface TabDataInterface {
  bio: string;
  photo: string;
  bottomSheetVisible?: boolean;
  setBottomSheetVisible?: (value: boolean) => void;
}

const ProfileTab: FC<TabDataInterface> = ({bio, photo}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.text}>{bio || 'About'}</Text>

        <View style={styles.subheader}>
          <Image
            source={photo ? {uri: photo} : require('@/assets/images/user.png')}
            style={styles.userImage}
          />

          <TextInput
            style={styles.searchBar}
            placeholder="Start a Post"
            editable={false}
            placeholderTextColor={COLORS.black}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    marginTop: 6,
    fontSize: 14,
    color: 'black',
  },
  userImage: {
    width: 43,
    height: 43,
    borderRadius: 15,
    marginTop: 5,
  },
  searchBar: {
    flex: 1,
    borderRadius: BORDER_RADIUS.general * 2,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: PADDING.general,
    paddingVertical: PADDING.general,
    marginLeft: 10,
    color: COLORS.black,
  },
  subheader: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: 0,
    maxHeight: 100,
    marginTop: 20,
  },
});

export default ProfileTab;
