import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Input, Link, Button} from 'components';
import {COLORS} from '../../constants';
import {SignInScreenProps} from 'types';
import {useFormik} from 'formik';
import {signInSchema} from 'utils/schemas';

const windowWidth = Dimensions.get('window').width;
const containerWidth = windowWidth - 50;

const SignIn: React.FC<SignInScreenProps> = ({navigation}) => {
  const {values, touched, handleChange, handleSubmit, errors} = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: values => {
      handleSignIn(values);
    },
  });

  const handleSignIn = async (values: {username: string; password: string}) => {
    console.log(values);
    navigation.navigate('SelectRole');
  };

  const handleRequestAccess = () => {
    navigation.navigate('RequestAccess');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.safeArea}>
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
              value={values.username}
              onChangeText={handleChange('username')}
              touched={touched.username}
              error={errors.username}
            />
            <Input
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              touched={touched.password}
              error={errors.password}
              secureTextEntry
            />
          </View>
          <Link
            text="Forgot Password"
            onPress={() => console.log('ForgotPassword')}
            style={{textAlign: 'right'}}
          />
          <Button
            title="Sign-In"
            onPress={handleSubmit}
            style={{marginVertical: 20}}
          />
        </View>

        <View style={styles.btnContainer}>
          <View style={styles.divider} />
          <Link
            text="New to the platform? Request Access"
            onPress={handleRequestAccess}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  imagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    maxHeight: '45%',
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
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
  },
});

export default SignIn;
