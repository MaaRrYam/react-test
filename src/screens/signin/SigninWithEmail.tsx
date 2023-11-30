import React, {FC} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';

import {signInSchema} from '@/utils/schemas/schemas';
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from '@firebase/auth';
import {useFormik} from 'formik';
import {Input, PrimaryButton} from '@/components';
import {COLORS, SCREEN_NAMES} from '@/constants';
import {SigninWithEmailProps} from '@/types';
import SigninService from '@/services/signin';
import {KeyboardAvoidingView} from 'react-native';
import {styles} from '@/styles/signinWithEmail';
import {getErrorMessageByCode} from '@/utils/functions';
import ToastService from '@/services/toast';
import {useAppDispatch} from '@/hooks/useAppDispatch';

const auth = getAuth();
const SigninWithEmail: FC<SigninWithEmailProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
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

      await SigninService.checkIfUserIsWhitelisted(
        userCredential,
        navigation,
        dispatch,
      );

      console.log('Sign-in successful');
    } catch (error: any) {
      const errorMessage =
        error.code && getErrorMessageByCode(error.code)
          ? getErrorMessageByCode(error.code)
          : 'An error occurred during sign-in.';

      ToastService.showError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={'padding'} style={styles.mainContainer}>
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
        <PrimaryButton
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SigninWithEmail;
