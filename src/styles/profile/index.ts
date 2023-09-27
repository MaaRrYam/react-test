// ProfileStyles.js
import {StyleSheet} from 'react-native';
import {COLORS, PADDING} from '@/constants';

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
  },
  userTagline: {
    color: COLORS.black,
  },
  userLocation: {
    color: COLORS.black,
  },
  connectionsLink: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  connectButton: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 1000,
  },
  messageButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 1000,
  },
  optionsButton: {
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
});
