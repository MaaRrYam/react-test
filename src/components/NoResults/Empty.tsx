import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Empty} from '@/assets/icons';
import {COLORS, FONTS} from '@/constants';

const EmptyComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Empty />
      <Text style={styles.message}>No Results Found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: FONTS.largeLabel,
    color: COLORS.black,
  },
});

export default EmptyComponent;
