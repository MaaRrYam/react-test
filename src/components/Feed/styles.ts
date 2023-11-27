import {StyleSheet} from 'react-native';
import {BORDER_RADIUS, COLORS, FONTS, MARGINS, PADDING} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING.general,
    paddingBottom: 0,
    marginTop: MARGINS.general,
    justifyContent: 'space-between',
  },
  createPostText: {
    fontSize: FONTS.largeLabel,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  authorContainer: {
    marginTop: MARGINS.general,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: BORDER_RADIUS.general,
    marginRight: MARGINS.general,
  },
  authorName: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
    fontWeight: '700',
  },
  imageListContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: PADDING.general,
  },
  image: {
    width: 71,
    height: 71,
    marginRight: 10,
    borderRadius: 10,
  },
  postContent: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.text,
    marginTop: MARGINS.general,
    height: 250,
    justifyContent: 'space-between',
  },
  input: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
    textAlignVertical: 'top',
  },
  selectedImage: {
    height: 200,
    width: '100%',
    borderRadius: BORDER_RADIUS.general,
    marginTop: MARGINS.general,
  },
  crossButton: {
    position: 'absolute',
    right: 0,
    top: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossText: {
    color: 'white',
    fontSize: FONTS.bodySmall,
  },
});
