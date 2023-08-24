import React from 'react';
import {View, StyleSheet} from 'react-native';

import {COLORS} from '../../constants';
import {CardWrapperProps} from 'interfaces';

const CardWrapper: React.FC<CardWrapperProps> = ({children}) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
});

export default CardWrapper;
