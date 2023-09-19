import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FONTS, COLORS} from '@/constants';
import {RoundedButton} from '../Buttons';
import {NetworkResponse} from '@/interfaces';

const NetworkItem = ({item}: {item: NetworkResponse}) => {
  return (
    <TouchableOpacity>
      <View style={styles.networkItem}>
        <View style={styles.networkItemImage}>
          <Image
            source={
              item.photoUrl
                ? {uri: item.photoUrl}
                : require('@/assets/images/user.png')
            }
            style={styles.networkItemImage}
          />
        </View>
        <View style={styles.networkItemContent}>
          <View style={styles.networkItemHeader}>
            <Text style={styles.networkItemName}>{item.name}</Text>
            <Text style={styles.networkItemMessage}>{item.tagline}</Text>
          </View>
          <View style={styles.networkItemMessage}>
            <RoundedButton text="Connect" onPress={() => console.log('LOL')} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  networkItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  networkItemImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 8,
  },
  networkItemContent: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
  },

  networkItemHeader: {
    flex: 1,
    justifyContent: 'center',
  },
  networkItemName: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  networkItemTime: {
    color: COLORS.text,
    fontSize: FONTS.bodySmall,
  },
  networkItemMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default NetworkItem;
