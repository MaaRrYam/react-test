import {StyleSheet} from 'react-native';
import {COLORS, FONTS, MARGINS, PADDING} from '@/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.lightBlueBackground,
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.lightBlueBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginVertical: MARGINS.general - 8,
    backgroundColor: COLORS.lightGrayBackground,
    padding: PADDING.general / 2,
    // borderRadius: 9999,
    borderRadius: 100,
  },
  backIcon: {
    marginLeft: 5,
    marginHorizontal: 20,
    color: COLORS.primary,
  },
  backButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  shareButton: {
    marginRight: 20,
  },
  postInfo: {
    padding: 16,
  },
  feedContent: {
    fontSize: FONTS.regularLabel,
    marginVertical: MARGINS.general,
    color: COLORS.black,
  },
  media: {
    width: '100%',
    height: 275,
    marginBottom: 12,
    borderRadius: 5,
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  commentsContainer: {
    backgroundColor: COLORS.white,
    marginVertical: 10,
    paddingBottom: 10,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 9999,
    paddingVertical: 5,
    paddingHorizontal: 19,
    padding: 7,
  },
  like: {
    fontWeight: '400',
    fontSize: FONTS.regularLabel,
    color: COLORS.text,
    marginHorizontal: 10,
    marginTop: 8,
  },
  iconsContainer: {
    flexDirection: 'row',
    flex: 1 / 2,
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 29,
  },
  postContainer: {
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
});

export default styles;
