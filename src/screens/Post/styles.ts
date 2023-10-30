import {StyleSheet} from 'react-native';
import {BORDER_RADIUS, COLORS, FONTS, MARGINS, PADDING} from '@/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBlueBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
    backgroundColor: COLORS.white,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: COLORS.lightGrayBackground,
    justifyContent: 'center',
    padding: 7,
    borderRadius: 9999,
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
  shareButton: {},
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
    backgroundColor: COLORS.lightBackground,
    borderRadius: 9999,
    paddingVertical: 5,
    paddingHorizontal: 19,
  },
  like: {
    fontWeight: '400',
    fontSize: FONTS.regularLabel,
    color: COLORS.text,
    marginHorizontal: 10,
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
