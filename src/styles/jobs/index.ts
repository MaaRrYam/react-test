import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  COLORS,
  FONTS,
  ICON_HEIGHT,
  ICON_WIDTH,
  MARGINS,
  PADDING,
} from '@/constants';
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
    paddingVertical: PADDING.general,
    paddingHorizontal: PADDING.general,
  },
  filterText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: FONTS.text,
  },
});

export const jobQuestionFormStyles = StyleSheet.create({
  questionHeading: {
    fontSize: FONTS.text,
    marginBottom: MARGINS.general,
    marginTop: MARGINS.general,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});

export const jobDetailFormStyles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  jobTitle: {
    fontSize: FONTS.heading,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: MARGINS.general,
    color: COLORS.black,
  },
  companyName: {
    fontSize: FONTS.largeLabel,
    fontWeight: 'normal',
    paddingLeft: 20,
    marginTop: MARGINS.general,
    color: COLORS.black,
  },
  basicDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: MARGINS.general,
    marginTop: MARGINS.general,
  },
  basicDetailItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: FONTS.text,
    marginLeft: 4,
    color: COLORS.black,
  },
  recruiterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: MARGINS.general,
  },
  recruiterImage: {
    width: ICON_WIDTH.general,
    marginTop: MARGINS.general,
    height: ICON_HEIGHT.general,
    resizeMode: 'cover',
    borderRadius: BORDER_RADIUS.recruiterIcon,
  },
  recruiterDetail: {
    fontSize: FONTS.text,
    fontWeight: 'bold',
    paddingLeft: PADDING.general,
    marginTop: MARGINS.general,
    color: COLORS.black,
  },
  applyButtonContainer: {
    flex: 1,
    paddingLeft: PADDING.general,
    paddingRight: PADDING.general,
    marginTop: MARGINS.general,
  },
  jobDetailContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: MARGINS.general,
    marginTop: MARGINS.general,
    color: COLORS.black,
  },
  jobDetailHeading: {
    fontWeight: 'bold',
    fontSize: FONTS.text * 1.1,
    color: COLORS.black,
  },
  JobsDetailText: {
    fontSize: FONTS.text,
    color: COLORS.black,
    marginTop: MARGINS.general / 1.9,
    marginBottom: MARGINS.general,
    paddingRight: PADDING.general * 2.4,
  },
});

export const jobsFilterFormStyles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  inputfield: {
    marginTop: MARGINS.general,
    marginLeft: MARGINS.general,
    marginRight: MARGINS.general,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: MARGINS.general,
    marginBottom: MARGINS.general,
  },
  checkbox: {
    borderWidth: BORDER_WIDTH.general,
    borderRadius: BORDER_RADIUS.general,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: MARGINS.general,
    marginTop: MARGINS.general,
  },
  title: {
    fontSize: FONTS.text,
    fontWeight: 'bold',
    paddingLeft: PADDING.general,
    marginTop: MARGINS.general,
    color: COLORS.black,
  },
  checkboxValues: {
    fontSize: FONTS.text,
    fontWeight: 'normal',
    paddingLeft: PADDING.general,
    marginTop: MARGINS.general,
    color: COLORS.black,
  },
  applyButtonContainer: {
    flex: 1,
    paddingLeft: PADDING.general,
    paddingRight: PADDING.general,
    marginTop: MARGINS.general,
  },
});

export const jobCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: MARGINS.general,
    borderBottomWidth: BORDER_WIDTH.general,
    borderBottomColor: COLORS.border,
    paddingHorizontal: PADDING.general,
    paddingVertical: PADDING.general,
  },
  iconContainer: {
    width: ICON_WIDTH.general,
    height: ICON_HEIGHT.general,
    alignItems: 'center',
    marginLeft: MARGINS.general,
    justifyContent: 'center',
    backgroundColor: COLORS.lightGrayBackground,
    borderRadius: BORDER_RADIUS.general,
  },
  icon: {
    width: ICON_WIDTH.general / 1.3,
    height: ICON_HEIGHT.general / 1.3,
  },
  textContainer: {
    flex: 1,
    marginLeft: MARGINS.general,
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
