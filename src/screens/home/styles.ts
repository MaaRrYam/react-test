import {StyleSheet} from 'react-native';
import {COLORS, BORDER_RADIUS, PADDING} from '@/constants';

export const styles = StyleSheet.create({
  postReactions: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 3 / 4,
    marginLeft: 15,
  },
  reactionButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: COLORS.lightGrayBackground,
    borderRadius: BORDER_RADIUS.general * 2,
  },
  like: {
    paddingTop: 7,
    marginHorizontal: 8,
    color: COLORS.black,
  },
  subheader: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: PADDING.general,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    maxHeight: 100,
  },
  searchBar: {
    flex: 1,
    borderRadius: BORDER_RADIUS.general * 2,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: 10,
    paddingVertical: PADDING.general - 6,
    marginLeft: 10,
    color: COLORS.black,
  },
  searchIcon: {
    marginRight: 10,
  },
  userImage: {
    width: 43,
    height: 43,
    borderRadius: 15,
  },
  feedContainer: {
    flex: 1,
    backgroundColor: COLORS.lightBlueBackground,
    paddingTop: PADDING.general,
  },
  feedItem: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    elevation: 2,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  feedContent: {
    fontSize: 13,
    color: COLORS.black,
    marginTop: 10,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorText: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  authorTagline: {
    fontSize: 14,
    color: 'gray',
  },
  postTime: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  moreIcon: {
    alignSelf: 'flex-end',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: 'gray',
  },
});
