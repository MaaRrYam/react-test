import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const RoleCard = ({
  title,
  selected,
  onPress,
  description,
  id,
}: {
  id: number;
  title: string;
  selected: boolean;
  onPress: (newRole: number) => void;
  description: string;
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, selected ? styles.selectedCard : null]}
      onPress={() => onPress(id)}>
      <Text style={[styles.cardText, styles.title]}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCard: {
    borderColor: COLORS.primary,
  },
  cardText: {
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
  },
});

export default RoleCard;
