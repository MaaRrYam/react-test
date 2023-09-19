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
import { styles } from '@/styles/signinWithEmail';
import { getErrorMessageByCode } from '@/utils/functions';

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
          const errorMessage = getErrorMessageByCode(error.code);
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

        <View style={{ marginTop: 185, marginLeft: 8, flexDirection: 'row' }}>
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



export default SigninWithEmail;
