import { signInSchema } from '@/utils/schemas/schemas';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { Input, Button } from '@/components';
import { COLORS, FONTS } from '@/constants';
import { SigninWithEmailProps } from '@/types';
import SigninService from '@/services/signin';
import { KeyboardAvoidingView } from 'react-native';

const auth = getAuth();
const windowWidth = Dimensions.get('window').width;
const containerWidth = windowWidth - 50;
const SigninWithEmail: FC<SigninWithEmailProps> = ({ navigation }) => {
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
      )
        .then(async userCredential => {
          await SigninService.checkIfUserIsWhitelisted(
            userCredential,
            navigation,
          );
        })
        .catch(error => {
          let errorMessage = 'An unknown error occurred. Please try again.';

          switch (error.code) {
            case 'auth/user-not-found':
              errorMessage =
                'User not found. Please check your email or sign up.';
              break;
            case 'auth/wrong-password':
              errorMessage = 'Incorrect password. Please try again.';
              break;
            case 'auth/too-many-requests':
              errorMessage =
                'Too many sign-in attempts. Please try again later.';
              break;
            case 'auth/invalid-email':
              errorMessage =
                'Invalid email address. Please check your email format.';
              break;
            case 'auth/network-request-failed':
              errorMessage =
                'Network request failed. Please check your internet connection.';
              break;
            case 'auth/weak-password':
              errorMessage = 'Weak password. Password should be stronger.';
              break;
            case 'auth/user-disabled':
              errorMessage = 'This user account has been disabled.';
              break;
            case 'auth/operation-not-allowed':
              errorMessage =
                'Email and password sign-in is not allowed for this app.';
              break;
            case 'auth/missing-verification-code':
              errorMessage =
                'Email verification is required. Please check your email for a verification link.';
              break;
            case 'auth/invalid-verification-code':
              errorMessage =
                'Invalid email verification code. Please check the code.';
              break;
            // Add more cases for other Firebase authentication errors as needed

            default:
              break;
          }

          Alert.alert('Authentication Error', errorMessage);
        });
      console.log(response);
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.mainContainer}>
      <SafeAreaView>

        <Image
          source={require('assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.headingTitle}>Sign in</Text>
        </View>

        <View style={[styles.inputContainer, { marginTop: 35 }]}>
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
        <Button
          title="Sign in"
          onPress={handleSubmit}
          style={[
            styles.signinButtonContainer,
            { marginVertical: 20, fontWeight: 300 },
          ]}
          isLoading={isSubmitting}
          activityIndicatorColor={COLORS.white}
          textColor={COLORS.white}
        />

        <View style={{ marginTop: 210, marginLeft: 8, flexDirection: 'row' }}>
          <Text style={{ color: 'black' }}>Don't have an Account? </Text>
          <Text
            style={{ color: COLORS.primary }}
            onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
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
  mainContainer: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 20,
  },
  mainText: {
    color: 'black',
  },
  logo: {
    width: windowWidth - 180,
    height: 97,
    marginTop: 80,
  },
  headingTitle: {
    fontSize: FONTS.heading,
    color: 'black',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: containerWidth,
  },
  signinButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: 'black',
    fontWeight: '400',
  },
});

export default SigninWithEmail;
