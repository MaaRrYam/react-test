import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {BackButton, Button, Link, Input} from 'components';
import {COLORS, FONTS, PADDING} from '../../constants';
import {RequestAccessScreenProps} from 'types';

const RequestAccess: React.FC<RequestAccessScreenProps> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentDesignation, setCurrentDesignation] = useState('');
  const [contactNo, setContactNo] = useState('');

  const handleSubmit = () => {
    navigation.navigate('RequestAccessComplete');
  };

  const handleSignInClick = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
        <Text style={styles.title}>Request Access</Text>

        <ScrollView>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={setName}
            keyboardType="default"
          />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            placeholder="LinkedIn URL"
            value={linkedInUrl}
            onChangeText={setLinkedInUrl}
            keyboardType="default"
          />
          <Input
            placeholder="Current Company"
            value={currentCompany}
            onChangeText={setCurrentCompany}
            keyboardType="default"
          />
          <Input
            placeholder="Current Designation"
            value={currentDesignation}
            onChangeText={setCurrentDesignation}
            keyboardType="default"
          />
          <Input
            placeholder="Contact No"
            value={contactNo}
            onChangeText={setContactNo}
            keyboardType="phone-pad"
          />
        </ScrollView>
        <View style={styles.footer}>
          <Button title="Continue" onPress={handleSubmit} />
          <Link
            text="Already have an account? Sign In"
            onPress={handleSignInClick}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING.general,
  },
  title: {
    fontSize: FONTS.heading,
    fontWeight: 'bold',
    marginTop: 40,
  },
  footer: {
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingTop: PADDING.general,
    width: '100%',
  },
});

export default RequestAccess;
