
import React, {FC} from 'react';
import {View, Text, SafeAreaView, Image, Alert} from 'react-native';
import {useFormik} from 'formik';
import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from '@firebase/auth';
import {Input, Button} from '@/components';
import {COLORS, SCREEN_NAMES} from '@/constants';
import {SignupWithEmailProps} from '@/types';
import SigninService from '@/services/signin';
import {styles} from '@/styles/signupWithEmail';
import {getErrorMessageByCode} from '@/utils/functions';
import {signUpSchema} from '@/utils/schemas/schemas';
import ToastService from '@/services/toast';

const SignupWithEmail: FC<SignupWithEmailProps> = ({navigation}) => {
  const auth = getAuth();
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
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: formValues => {
      handleSignIn(formValues);
    },
  });
  const handleSignIn = async (formValues: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const userCredentials: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          formValues.email,
          formValues.password,
        );

      await SigninService.checkIfUserIsWhitelisted(userCredentials, navigation);
      console.log('Sign-in successful');
    } catch (error: any) {
      const errorMessage =
        getErrorMessageByCode(error.code) ||
        'An error occurred during sign-in.';

      await ToastService.showError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.headingTitle}>Create Account</Text>
        </View>

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
          <Input
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            touched={touched.confirmPassword}
            error={errors.confirmPassword}
            secureTextEntry
            name="confirmPassword"
            setFieldTouched={setFieldTouched}
          />
        </View>
        <Button
          title="Sign up"
          onPress={handleSubmit}
          style={styles.signUpButtonContainer}
          isLoading={isSubmitting}
          activityIndicatorColor={COLORS.white}
          textColor={COLORS.white}
        />
        <View style={styles.dontHaveAccount}>
          <Text style={styles.mainText}>Already have an Account? </Text>
          <Text
            style={styles.signInText}
            onPress={() => navigation.navigate(SCREEN_NAMES.Signin)}>
            Sign in
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupWithEmail;
