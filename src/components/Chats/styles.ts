import {BORDER_RADIUS, COLORS, FONTS} from '@/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  chatItemImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 8,
  },
  chatItemContent: {
    marginLeft: 10,
    flex: 1,
  },

  chatItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  chatItemName: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  chatItemTime: {
    color: COLORS.text,
    fontSize: FONTS.bodySmall,
  },
  chatItemMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatItemLastMessage: {
    color: COLORS.text,
    fontSize: FONTS.bodyRegular,
    maxWidth: '80%',
  },
  chatItemUnreadMessage: {
    width: 12,
    height: 12,
    borderRadius: 1000,
    backgroundColor: COLORS.primary,
  },
  userItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: BORDER_RADIUS.general,
    marginRight: 10,
  },
  userItemContent: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
  },
  userItemHeader: {
    flex: 1,
    justifyContent: 'center',
  },
  userItemName: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  userItemTagline: {
    color: COLORS.text,
    fontSize: FONTS.bodySmall,
  },
});
