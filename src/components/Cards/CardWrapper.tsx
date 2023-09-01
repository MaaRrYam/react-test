import React from 'react';
import {View, StyleSheet} from 'react-native';

import {BORDER_RADIUS, COLORS, MARGINS, PADDING} from '../../constants';
import {CardWrapperProps} from 'interfaces';

const CardWrapper: React.FC<CardWrapperProps> = ({children}) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.general,
    padding: PADDING.general,
    marginBottom: MARGINS.general,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});

export default CardWrapper;
