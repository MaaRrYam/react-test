import {BORDER_RADIUS, COLORS, PADDING} from '@/constants';
import {StyleSheet} from 'react-native';

export const jobMainStyles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingHorizontal: PADDING.general,
    flexDirection: 'row',
  },
  filterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  filterText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export const jobCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 18,
    paddingVertical: 17,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    marginLeft: 15,
    justifyContent: 'center',
    backgroundColor: COLORS.lightGrayBackground,
    borderRadius: BORDER_RADIUS.general,
  },
  icon: {
    width: 35,
    height: 35,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  company: {
    color: COLORS.text,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  date: {
    color: COLORS.text,
  },
});
