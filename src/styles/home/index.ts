import {StyleSheet} from 'react-native';
import {COLORS, FONTS, MARGINS, PADDING} from '@/constants';

export const homeStyles = StyleSheet.create({
  outerContainer: {
    backgroundColor: COLORS.lightBackground,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDING.general,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logo: {
    width: 180,
    height: 30,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 20,
  },
  subheader: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: PADDING.general,
    maxHeight: 100,
  },
  searchIcon: {
    backgroundColor: COLORS.lightGrayBackground,
    padding: 10,
    borderRadius: 1000,
  },
  messageIcon: {
    marginLeft: MARGINS.general / 2,
  },
  searchBar: {
    width: 230,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    color: COLORS.text,
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: 10,
    paddingVertical: PADDING.general - 6,
    marginLeft: 10,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  flexRow: {flexDirection: 'row', alignItems: 'center'},
  searchBarText: {
    color: COLORS.black,
    fontSize: FONTS.bodyRegular,
  },
});
