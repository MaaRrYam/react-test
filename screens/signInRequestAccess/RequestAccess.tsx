import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {BackButton, Button, Link} from '../../components';
import {COLORS, FONTS, PADDING} from '../../constants';
import Input from '../../components/Inputs/Input';

const RequestAccess = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentDesignation, setCurrentDesignation] = useState('');
  const [contactNo, setContactNo] = useState('');

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
          <Button
            title="Continue"
            onPress={() => console.log('Next button pressed')}
          />
          <Link
            text="Already have an account? Sign In"
            onPress={() => console.log('Sign In')}
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
    marginVertical: 40,
  },
  footer: {
    borderTopColor: COLORS.borderGray,
    borderTopWidth: 1,
    paddingTop: PADDING.general,
    width: '100%',
  },
});

export default RequestAccess;
