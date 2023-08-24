import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {BackButton, Button} from '../../components';
import Input from '../../components/Inputs/Input';
import {commonStyles} from 'styles/onboarding';

const GetStarted = () => {
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
        <Text style={commonStyles.title}>Let's get you started,</Text>

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
        <View style={commonStyles.footer}>
          <Button
            title="Continue"
            onPress={() => console.log('Next button pressed')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
