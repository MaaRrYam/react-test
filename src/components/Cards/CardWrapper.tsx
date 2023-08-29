import React from 'react';
import {View, StyleSheet} from 'react-native';

import {BORDER_RADIUS, COLORS} from '../../constants';
import {CardWrapperProps} from 'interfaces';

const CardWrapper: React.FC<CardWrapperProps> = ({children}) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.general,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});

export default CardWrapper;
