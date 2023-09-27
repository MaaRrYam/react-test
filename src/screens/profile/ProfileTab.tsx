import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface TabDataInterface {
  bio: string;
}

const ProfileTab: FC<TabDataInterface> = ({bio}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About</Text>
      <Text style={styles.text}>{bio || 'About'}</Text>
    </View>
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
});

export default ProfileTab;
