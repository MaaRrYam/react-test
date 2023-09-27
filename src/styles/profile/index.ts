import {StyleSheet} from 'react-native';
import {COLORS, FONTS, MARGINS, PADDING} from '@/constants';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.white,
  },
  headerImage: {
    width: '100%',
    height: 110,
    objectFit: 'cover',
  },
  avatarContainer: {
    position: 'absolute',
    paddingHorizontal: PADDING.general,
    top: -55,
    zIndex: 50,
  },
  avatarImage: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 25,
  },
  userInfoContainer: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: PADDING.general,
  },
  userName: {
    marginTop: 54,
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: FONTS.largeLabel,
  },
  userTagline: {
    color: COLORS.black,
    fontSize: FONTS.bodyRegular,
  },
  userLocation: {
    color: COLORS.text,
    fontSize: FONTS.bodyRegular,
  },
  connectionsLink: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
    fontSize: FONTS.bodyRegular,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
    marginLeft: -3,
  },
  connectButton: {
    paddingHorizontal: 55,
    paddingVertical: 10,
    borderRadius: 1000,
  },
  messageButton: {
    paddingHorizontal: 34,
    paddingVertical: 10,
    borderRadius: 1000,
  },
  optionsButton: {
    backgroundColor: COLORS.lightGrayBackground,
    padding: 10,
    borderRadius: 1000,
    marginTop: -2,
  },
  tabsContainer: {
    backgroundColor: COLORS.white,
    marginTop: 3,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  tabsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  tabButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedTabButton: {
    backgroundColor: COLORS.lightBlueBackground,
    color: COLORS.black,
    marginRight: 15,
    borderRadius: 10,
  },
  tabButton: {
    marginRight: 15,
    borderRadius: 10,
  },
  postsHeader: {
    color: COLORS.black,
    paddingHorizontal: 10,
  },
  editIcon: {
    backgroundColor: COLORS.lightGrayBackground,
    padding: 10,
    borderRadius: 1000,
    marginTop: -2,
  },
  moreIcon: {

  }
});
