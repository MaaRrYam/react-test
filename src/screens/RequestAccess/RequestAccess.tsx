import React, {useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, ScrollView, TextInput} from 'react-native';
import {useFormik} from 'formik';
import PhoneInput from 'react-native-phone-number-input';

import {
  BackButton,
  PrimaryButton,
  Input,
  KeyboardAvoidingView,
} from '@/components';
import {RequestAccessScreenProps} from '@/types';
import {commonStyles} from '@/styles/onboarding';
import {requestAccessSchema} from '@/utils/schemas/schemas';
import {requestAccessFormValues} from '@/interfaces';
import {submitRequestAccess} from '@/services/requestAccess';
import {COLORS} from '@/constants';
import {styles} from '@/styles/signinScreen';
import ToastService from '@/services/toast';
import {inputStyles} from '@/components/Inputs/styles';
import StorageService from '@/services/Storage';

const RequestAccess: React.FC<RequestAccessScreenProps> = ({
  route,
  navigation,
}) => {
  const {role} = route.params;

  const phoneInput = useRef<PhoneInput>(null);
  const linkedInUrlInput = useRef<TextInput>(null);
  const currentCompanyInput = useRef<TextInput>(null);
  const currentDesignationInput = useRef<TextInput>(null);

  const {
    values,
    touched,
    handleChange,
    handleSubmit,
    errors,
    setFieldTouched,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    setFieldError,
  } = useFormik({
    initialValues: {
      name: '',
      linkedInUrl: 'https://www.linkedin.com/in/',
      currentCompany: '',
      currentDesignation: '',
      phoneNo: '',
    },
    validationSchema: requestAccessSchema,
    onSubmit: formValues => {
      handleSubmitRequestAccess(formValues);
    },
  });

  const handleSubmitRequestAccess = async (
    formValues: requestAccessFormValues,
  ) => {
    if (!phoneInput.current?.isValidNumber(values.phoneNo)) {
      setFieldTouched('phoneNo', true);
      setFieldError('phoneNo', 'Invalid phone number');

      return;
    }

    const payload = {
      ...formValues,
      selectedRole: role,
    };
    const data = await submitRequestAccess(payload);
    ToastService.showSuccess(data.message);
    setSubmitting(false);
    if (data.success) {
      navigation.navigate('Signin');
    }
  };

  const handleSignInClick = () => {
    navigation.navigate('Signin');
  };

  useEffect(() => {
    if (values.phoneNo) {
      const isValid = phoneInput.current?.isValidNumber(values.phoneNo);
      if (!isValid) {
        setFieldTouched('phoneNo', true);
        setFieldError('phoneNo', 'Invalid phone number');
      } else {
        setFieldError('phoneNo', '');
      }
    }
  }, [setFieldError, setFieldTouched, values.phoneNo]);

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <KeyboardAvoidingView>
        <View style={commonStyles.container}>
          <BackButton onPress={() => console.log('Back button pressed')} />
          <Text style={commonStyles.title}>Request Access</Text>

          <ScrollView>
            <Input
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange('name')}
              touched={touched.name}
              error={errors.name}
              name="name"
              setFieldTouched={setFieldTouched}
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => linkedInUrlInput.current?.focus()}
            />
            <Input
              placeholder="LinkedIn User Name"
              value={values.linkedInUrl}
              onChangeText={handleChange('linkedInUrl')}
              touched={touched.linkedInUrl}
              error={errors.linkedInUrl}
              name="linkedInUrl"
              setFieldTouched={setFieldTouched}
              forwardedRef={linkedInUrlInput}
              returnKeyType="next"
              onSubmitEditing={() => currentCompanyInput.current?.focus()}
            />
            <Input
              placeholder="Current Company"
              value={values.currentCompany}
              onChangeText={handleChange('currentCompany')}
              touched={touched.currentCompany}
              error={errors.currentCompany}
              name="currentCompany"
              setFieldTouched={setFieldTouched}
              forwardedRef={currentCompanyInput}
              returnKeyType="next"
              onSubmitEditing={() => currentDesignationInput.current?.focus()}
            />
            <Input
              placeholder="Current Designation"
              value={values.currentDesignation}
              onChangeText={handleChange('currentDesignation')}
              touched={touched.currentDesignation}
              error={errors.currentDesignation}
              name="currentDesignation"
              setFieldTouched={setFieldTouched}
              forwardedRef={currentDesignationInput}
            />
            <PhoneInput
              ref={phoneInput}
              defaultValue={values.phoneNo}
              defaultCode="US"
              onChangeFormattedText={text => {
                setFieldValue('phoneNo', text);
              }}
              containerStyle={inputStyles.fullWidth}
              textContainerStyle={inputStyles.phoneTextContainer}
              countryPickerButtonStyle={inputStyles.phoneCountryPickerButton}
            />
          </ScrollView>
          <View style={commonStyles.footer}>
            <PrimaryButton
              title="Continue"
              onPress={handleSubmit}
              isLoading={isSubmitting}
              activityIndicatorColor={COLORS.white}
            />
            <View style={[styles.alreadyHaveAnAccount, {marginTop: 0}]}>
              <Text style={styles.text}>Already have an account? </Text>
              <Text style={styles.signUpText} onPress={handleSignInClick}>
                Sign In
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RequestAccess;
