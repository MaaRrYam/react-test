import {signInSchema} from '@/utils/schemas/schemas';
import {getAuth, signInWithEmailAndPassword} from '@firebase/auth';
import {useFormik} from 'formik';
import React, {FC} from 'react';
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
import {Input, Button} from '@/components';
import {COLORS, FONTS} from '@/constants';
import { SigninWithEmailProps } from '@/types';

const auth = getAuth();

 {}
const windowWidth = Dimensions.get('window').width;
const containerWidth = windowWidth - 50;
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
      const response = await signInWithEmailAndPassword(
        auth,
        formValues.email.toLowerCase(),
        formValues.password,
      ).then(() => {
        Alert.alert('Successfully Signed in');
        navigation.navigate('MyTabs');
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
          <Text style={styles.headingTitle}>Sign in</Text>
        </View>

        <View style={[styles.inputContainer, {marginTop: 20}]}>
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
            {marginVertical: 20, fontWeight: 300},
          ]}
          isLoading={isSubmitting}
          activityIndicatorColor={COLORS.white}
          textColor={COLORS.white}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
  },
  mainContainer: {
    color: 'black',
    paddingLeft: 25,
    paddingRight: 20,
  },
  mainText: {
    color: 'black',
  },
  logo: {
    width: windowWidth - 180,
    height: '30%',
    marginTop: 50,
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
