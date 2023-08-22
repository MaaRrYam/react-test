import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {BackButton, Button} from '../../components';
import {COLORS, FONTS, PADDING} from '../../constants';
import Input from '../../components/Inputs/Input';

const GetStarted = () => {
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
        <Text style={styles.title}>Let's get you started,</Text>

        <ScrollView>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
          />
          <Input
            placeholder="City"
            value={city}
            onChangeText={setCity}
            keyboardType="default"
          />
          <Input
            placeholder="State"
            value={state}
            onChangeText={setState}
            keyboardType="default"
          />
        </ScrollView>
        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={() => console.log('Next button pressed')}
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

export default GetStarted;
