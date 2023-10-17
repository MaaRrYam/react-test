import {StyleSheet} from 'react-native';
import {COLORS, BORDER_RADIUS, PADDING, FONTS, MARGINS} from '@/constants';

export const styles = StyleSheet.create({
  postReactions: {
    flexDirection: 'row',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 3 / 5,
    marginLeft: MARGINS.general,
  },
  reactionButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: COLORS.lightGrayBackground,
    borderRadius: BORDER_RADIUS.general * 2,
  },
  like: {
    paddingTop: 8,
    marginHorizontal: MARGINS.general / 2,
    color: COLORS.black,
    fontSize: FONTS.bodySmall,
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
    marginBottom: 8,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
    objectFit: 'cover',
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
    fontSize: FONTS.bodyRegular,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  authorTagline: {
    fontSize: FONTS.bodySmall,
    color: 'gray',
  },
  postTime: {
    fontSize: FONTS.bodySmall,
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
    color: COLORS.lightGrayBackground,
  },
  showMoreText: {
    color: COLORS.primary,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  articleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  commentsContainer: {
    flex: 1,
  },
  comments: {
    marginTop: MARGINS.general / 2,
    paddingHorizontal: PADDING.general,
  },
  comment: {
    marginBottom: MARGINS.general,
    backgroundColor: COLORS.lightGrayBackground,
    borderRadius: BORDER_RADIUS.general,
    padding: PADDING.general / 2,
  },
  commentImage: {
    width: 34,
    height: 34,
    borderRadius: 12,
    marginRight: 8,
  },
  author: {
    flexDirection: 'row',
  },
  commentText: {
    marginTop: MARGINS.general / 3,
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
    marginLeft: 48,
  },
  commentAuthorName: {
    fontSize: FONTS.bodySmall,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  commentAuthorTagline: {
    fontSize: FONTS.bodySmall,
    color: 'gray',
  },
});