import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {BORDER_RADIUS, COLORS, FONTS, MARGINS, PADDING} from '../../constants';

const RoleCard = ({
  title,
  selected,
  onPress,
  description,
  value,
}: {
  id: number;
  title: string;
  selected: boolean;
  onPress: (newRole: string) => void;
  description: string;
  value: string;
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, selected ? styles.selectedCard : null]}
      onPress={() => onPress(value)}>
      <Text style={[styles.title]}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.general,
    padding: PADDING.general,
    marginBottom: MARGINS.general,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCard: {
    borderColor: COLORS.primary,
  },
  title: {
    fontSize: FONTS.largeLabel,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
  },
});

export default RoleCard;
