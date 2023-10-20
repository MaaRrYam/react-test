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
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginLeft: 5,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  postInfo: {
    padding: 16,
  },
  feedContent: {
    fontSize: FONTS.largeLabel,
    marginVertical: MARGINS.general,
  },
  media: {
    width: '100%',
    height: 300,
    marginBottom: 12,
    borderRadius: BORDER_RADIUS.general,
  },
  postReactions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff40',
    paddingHorizontal: PADDING.general,
    paddingVertical: 5,
    borderRadius: BORDER_RADIUS.general,
  },
  like: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
    flex: 1 / 2,
    justifyContent: 'flex-end',
  },
  report: {
    marginLeft: 10 * 3,
  },
});

export default styles;
