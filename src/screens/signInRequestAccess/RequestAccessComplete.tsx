import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BackButton} from 'components';
import {PADDING} from '../../constants';

const windowWidth = Dimensions.get('window').width;

const RequestAccessComplete: React.FC = () => {
  return (
    <LinearGradient colors={['#EC6570', '#F7CB94']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.backBtnContainer}>
          <BackButton
            onPress={() => console.log('Back Button Pressed')}
            isBgWhite
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Request Access</Text>
            <Text style={styles.description}>
              Thank you for submitting your request 🙌 We will send you an email
              once your request has been approved.
            </Text>
          </View>
        </View>

        <View style={styles.imgContainer}>
          <Image
            source={require('../../assets/images/requestSuccess.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: PADDING.general,
  },
  backBtnContainer: {
    height: '50%',
    paddingTop: PADDING.general,
    justifyContent: 'space-between',
  },
  gradient: {
    flex: 1,
  },
  logo: {},
  textContainer: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    color: 'white',
    marginBottom: 10,
  },
  description: {
    color: 'white',
    fontSize: 18,
  },
  imgContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 50,
    width: windowWidth,
  },
});

export default RequestAccessComplete;
