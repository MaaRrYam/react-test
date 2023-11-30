import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {BORDER_RADIUS, COLORS} from '@/constants';

const EmploymentSelectionField = ({
  text,
  isSelected,
  onPress,
}: {
  text: string;
  isSelected: boolean;
  onPress: (name: string) => void;
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(text)}>
      <View style={[styles.selectionField, isSelected && styles.selectedField]}>
        <Text style={styles.capitalizeOnLow1}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectionField: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: BORDER_RADIUS.general,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  selectedField: {
    borderColor: COLORS.primary,
  },
  capitalizeOnLow1: {
    marginLeft: 20,
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.black,
    zIndex: 1,
  },
});

export default React.memo(EmploymentSelectionField);
