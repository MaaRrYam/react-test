import {BORDER_RADIUS, COLORS, FONTS, MARGINS, PADDING} from '@/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  backButtonStyles: {
    borderWidth: 0,
    padding: 0,
  },
  searchInputStyles: {
    flex: 1,
    borderRadius: BORDER_RADIUS.general * 2,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: 10,
    paddingVertical: PADDING.general - 6,
    color: COLORS.black,
    marginRight: 30,
    marginLeft: -10,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: MARGINS.general / 3,
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: COLORS.lightGrayBackground,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    padding: 10,
  },
  backButton: {
    borderWidth: 0,
  },
  userImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 8,
  },
  userName: {
    flex: 1,
    fontSize: 18,
  },
  chatsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 10,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginRight: 10,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.text,
    marginRight: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  myMessageContainer: {
    flexDirection: 'row-reverse',
  },
  otherMessageContainer: {
    flexDirection: 'row',
  },
  myMessage: {
    backgroundColor: COLORS.lightBlueBackground,
    padding: 20,
    borderRadius: 10,
    width: '70%',
  },
  otherMessage: {
    backgroundColor: COLORS.lightGrayBackground,
    padding: 20,
    borderRadius: 10,
    width: '70%',
  },
  messageText: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
  },
  messageTime: {
    fontSize: FONTS.bodyRegular,
    alignSelf: 'flex-end',
    marginTop: 5,
    color: COLORS.black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadImageButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
    backgroundColor: COLORS.lightGrayBackground,
    padding: 20,
  },
});
