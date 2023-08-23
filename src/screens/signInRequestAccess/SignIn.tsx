import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Input, Link, Button} from 'components';
import {COLORS} from '../../constants';

const windowWidth = Dimensions.get('window').width;
const containerWidth = windowWidth - 50;

const SignIn: React.FC = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    console.log('Trying to Sign In');
  };

  return (
    <View style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imagesContainer}>
          <Image
            source={require('assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Image
            source={require('assets/images/people.png')}
            style={styles.peopleImage}
            resizeMode="contain"
          />
        </View>

        <View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Username"
              value={username}
              onChangeText={setUserName}
              keyboardType="default"
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              keyboardType="default"
            />
          </View>
          <Link
            text="Forgot Password"
            onPress={() => console.log('ForgotPassword')}
            style={{
              fontSize: 14,
              color: COLORS.black,
              textAlign: 'right',
            }}
          />
          <Button
            title="Sign-In"
            onPress={() => console.log('Sign In')}
            style={{marginVertical: 20}}
          />
        </View>

        <View style={styles.btnContainer}>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>
              New to the platform? Request Access
            </Text>
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
    width: containerWidth,
    marginHorizontal: 20,
  },
  imagesContainer: {
    height: '30%',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
  },
  logo: {
    width: windowWidth - 180,
    height: '30%',
    marginTop: 50,
  },
  peopleImage: {
    width: windowWidth - 80,
    height: '70%',
    marginLeft: 30,
  },
  inputContainer: {
    width: containerWidth,
  },
  btnContainer: {
    alignItems: 'center',
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
    fontSize: 16,
  },
  divider: {},
});

export default SignIn;
