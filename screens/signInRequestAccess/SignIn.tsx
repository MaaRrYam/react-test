import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';

const SignIn: React.FC = () => {
  const handleSignIn = async () => {
    console.log('Trying to Sign In');
  };

  return (
    <View style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imagesContainer}>
          <Image
            source={require('../../assets/images/whiteLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/images/people.png')}
            style={styles.peopleImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>Where Professionals Connect & Grow</Text>
          <Text style={styles.description}>
            Say goodbye to irrelevant spam and hello to a world of content
            that's tailored to your career interests and goals
          </Text>
        </View>

        <View style={styles.btnContainer}>
          <Button
            title="Google Sign-In"
            onPress={() => console.log('Google Sign')}
          />
          <View style={styles.divider} />
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign Up or Request Access</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imagesContainer: {
    height: '20%',
  },
  gradient: {
    flex: 1,
    backgroundColor: '#ffa500',
  },
  logo: {
    width: 300,
    height: 150,
  },
  peopleImage: {
    width: 300,
    height: 400,
    marginTop: -100,
  },
  textContainer: {
    width: '80%',
    marginTop: 100,
  },
  text: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  btnContainer: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '50%',
    marginBottom: 10,
  },
});

export default SignIn;
