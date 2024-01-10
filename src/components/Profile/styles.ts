import {BORDER_RADIUS, COLORS, FONTS, PADDING} from '@/constants';
import {StyleSheet} from 'react-native';

export const profileTabStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: PADDING.general,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    marginTop: 6,
    fontSize: 14,
    color: 'black',
  },
  userImage: {
    width: 43,
    height: 43,
    borderRadius: 15,
    marginTop: 5,
  },
  searchBar: {
    flex: 1,
    borderRadius: BORDER_RADIUS.general * 2,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: PADDING.general,
    paddingVertical: PADDING.general,
    marginLeft: 10,
    color: COLORS.black,
  },
  subheader: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: 0,
    maxHeight: 100,
    marginVertical: 20,
  },
  searchBarText: {
    color: COLORS.text,
    fontSize: FONTS.bodyRegular,
    alignItems: 'center',
  },
});

export const editTabStyles = StyleSheet.create({
  tabItem: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  borderBottomTransparent: {
    borderBottomColor: 'transparent',
  },
  borderBottomColored: {
    borderBottomColor: COLORS.border,
  },
});
