import {COLORS, FONTS} from '@/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightBlueBackground,
  },
  media: {
    width: '100%',
    height: 275,
    borderRadius: 5,
    objectFit: 'contain',
    marginTop: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 44,
    paddingBottom: 8,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  closeButton: {
    backgroundColor: COLORS.lightGrayBackground,
    width: 41,
    height: 41,
    borderRadius: 9999,
  },
  shareButton: {
    backgroundColor: COLORS.lightGrayBackground,
    paddingHorizontal: 28,
    paddingVertical: 11,
    borderRadius: 9999,
  },
  articleContainer: {paddingHorizontal: 19, paddingTop: 23},
  articleTitle: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: FONTS.heading,
    alignItems: 'center',
    maxWidth: 346,
  },
  userInfoContainer: {
    marginVertical: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 43,
    height: 43,
    objectFit: 'contain',
    borderRadius: 10,
  },
  userInfoTextContainer: {marginLeft: 12},
  userName: {
    color: COLORS.black,
    fontSize: FONTS.largeLabel,
    fontWeight: 'bold',
  },
  userSubData: {color: COLORS.text, fontSize: FONTS.bodyRegular},
  articleContent: {color: COLORS.black},
});
