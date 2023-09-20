import {signUpSchema} from '@/utils/schemas/schemas';
import {createUserWithEmailAndPassword, getAuth} from '@firebase/auth';
import {useFormik} from 'formik';
import React, {FC} from 'react';
import {View, Text, SafeAreaView, Image, Alert} from 'react-native';
import {Input, Button} from '@/components';
import {COLORS} from '@/constants';
import {SignupWithEmailProps} from '@/types';
import SigninService from '@/services/signin';
import {styles} from '@/styles/signupWithEmail';
import {getErrorMessageByCode} from '@/utils/functions';

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
      const response = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password,
      ).then(async userCredentials => {
        await SigninService.checkIfUserIsWhitelisted(
          userCredentials,
          navigation,
        ).catch(error => {
          const errorMessage = getErrorMessageByCode(error.code);
          Alert.alert('Sign-Up Error', errorMessage);
        });
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
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Image
          source={require('assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.headingTitle}>Create Account</Text>
        </View>

        <View style={[styles.inputContainer, {marginTop: 44}]}>
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
          style={[
            styles.signinButtonContainer,
            {marginVertical: 20, fontWeight: 300},
          ]}
          isLoading={isSubmitting}
          activityIndicatorColor={COLORS.white}
          textColor={COLORS.white}
        />
        <View style={{marginTop: 130, marginLeft: 8, flexDirection: 'row'}}>
          <Text style={{color: 'black'}}>Already have an Account? </Text>
          <Text
            style={{color: COLORS.primary}}
            onPress={() => navigation.navigate('Signin')}>
            Sign in
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupWithEmail;
