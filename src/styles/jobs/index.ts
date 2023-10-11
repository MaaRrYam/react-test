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

export const jobQuestionFormStyles = StyleSheet.create({
  questionHeading: {
    fontSize: 20,
    marginBottom: 19,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});

export const jobDetailFormStyles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  companyName: {
    fontSize: 15,
    fontWeight: 'normal',
    paddingLeft: 20,
    marginTop: 3,
    color: 'black',
  },
  basicDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  basicDetailItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 15,
    marginLeft: 4,
    color: 'black',
  },
  recruiterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  recruiterImage: {
    width: 40,
    marginTop: 30,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  recruiterDetail: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 25,
    color: 'black',
  },
  applyButtonContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 40,
  },
  jobDetailContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  jobDetailHeading: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 18,
    color: 'black',
  },
  JobsDetailText: {
    fontSize: 15,
    color: 'black',
    paddingRight: 30,
  },
});

export const jobsFilterFormStyles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  inputfield: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  checkboxValues: {
    fontSize: 15,
    fontWeight: 'normal',
    paddingLeft: 10,
    marginTop: 10,
    color: 'black',
  },
  applyButtonContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 40,
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
