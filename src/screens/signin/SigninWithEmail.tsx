import React, {FC} from 'react';
import {View, Text, SafeAreaView, Image, Platform} from 'react-native';
import {useFormik} from 'formik';
import Toast from 'react-native-simple-toast';
import {signInSchema} from '@/utils/schemas/schemas';
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from '@firebase/auth';
import {Input, Button} from '@/components';
import {COLORS, SCREEN_NAMES} from '@/constants';
import {SigninWithEmailProps} from '@/types';
import SigninService from '@/services/signin';
import {KeyboardAvoidingView} from 'react-native';
import {styles} from '@/styles/signinWithEmail';
import {getErrorMessageByCode} from '@/utils/functions';

const auth = getAuth();
const SigninWithEmail: FC<SigninWithEmailProps> = ({navigation}) => {
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
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        formValues.email.toLowerCase(),
        formValues.password,
      );

      await SigninService.checkIfUserIsWhitelisted(userCredential, navigation);

      console.log('Sign-in successful');
    } catch (error: any) {
      const errorMessage =
        error.code && getErrorMessageByCode(error.code)
          ? getErrorMessageByCode(error.code)
          : 'An error occurred during sign-in.';

      Toast.show(errorMessage, Toast.LONG);
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
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.headingTitle}>Sign in</Text>
        </View>

        <View style={[styles.inputContainer, {marginTop: 35}]}>
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
          style={styles.signinButtonContainer}
          isLoading={isSubmitting}
          activityIndicatorColor={COLORS.white}
          textColor={COLORS.white}
        />

        <View style={styles.dontHaveAnAccount}>
          <Text style={styles.mainText}>Don't have an Account? </Text>
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate(SCREEN_NAMES.Signup)}>
            Sign up
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SigninWithEmail;
