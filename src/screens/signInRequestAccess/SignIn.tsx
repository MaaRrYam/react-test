import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useFormik} from 'formik';
import {
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {Input, Link, Button, IconButton} from '@/components';
import {COLORS} from '@/constants';
import {SignInScreenProps} from '@/types';
import {signInSchema} from '@/utils/schemas/schemas';
import {_signInWithGoogle} from '@/services/auth/Google';
import checkIfUserIsWhitelisted from '@/hooks/useCheckIfUserIsWhitelisted';

const windowWidth = Dimensions.get('window').width;
const containerWidth = windowWidth - 50;

const auth = getAuth();

const SignIn: React.FC<SignInScreenProps> = ({navigation}) => {
  const [user, setUser] = useState<UserCredential>();
  const {
    values,
    touched,
    handleChange,
    handleSubmit,
    errors,
    setFieldTouched,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: formValues => {
      handleSignIn(formValues);
    },
  });

  const handleSignIn = async (formValues: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formValues.email.toLowerCase(),
        formValues.password,
      );
      console.log(response);

      // navigation.navigate('GetStarted');
    } catch (error: any) {
      if (error.message === 'Firebase: Error (auth/user-not-found).') {
        Alert.alert('Invalid Email or Password');
      } else {
        Alert.alert('Invalid Email or Password');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRequestAccess = () => {
    navigation.navigate('SelectRole');
  };

  const handleGoogleSign = async () => {
    await _signInWithGoogle(setUser);
    console.log('user', user);
    try {
      await checkIfUserIsWhitelisted(user as UserCredential, navigation); // Pass the 'navigation' object here
      // Continue with your logic after the user is whitelisted.
    } catch (error) {
      console.log(error);
    }
    // console.log('FROM SIGN IN SCREEN', data);
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
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              touched={touched.email}
              error={errors.email}
              name="email"
              setFieldTouched={setFieldTouched}
            />
            <Input
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              touched={touched.password}
              error={errors.password}
              secureTextEntry
              name="password"
              setFieldTouched={setFieldTouched}
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
            isLoading={isSubmitting}
            activityIndicatorColor={COLORS.white}
          />
        </View>

        <View style={styles.socialAuth}>
          <IconButton
            imageSource={require('@/assets/images/x.png')}
            onPress={() => console.log("I'm clicked")}
          />

          <IconButton
            imageSource={require('@/assets/images/google.png')}
            onPress={() => handleGoogleSign()}
            style={{marginHorizontal: 30}}
          />

          <IconButton
            imageSource={require('@/assets/images/apple.png')}
            onPress={() => console.log("I'm clicked")}
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
  socialAuth: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default SignIn;
