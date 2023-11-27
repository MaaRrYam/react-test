import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import {BackButton, PrimaryButton, Link, RoleCard} from '@/components';
import {ROLES_DATA, SCREEN_NAMES} from '@/constants';
import {RootStackParamList, SelectRoleScreenProps} from '@/types';
import {commonStyles} from '@/styles/onboarding';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlashList} from '@shopify/flash-list';

const SelectRole: React.FC<SelectRoleScreenProps> = () => {
  const [selectedRole, setSelectedRole] = useState(ROLES_DATA[0].value);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleContinue = () => {
    navigation.navigate(SCREEN_NAMES.RequestAccessForm, {role: selectedRole});
  };

  const handleSignIn = () => {
    navigation.navigate(SCREEN_NAMES.Signin);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
        <Text style={commonStyles.title}>Choose Your Role</Text>

        <FlashList
          data={ROLES_DATA}
          renderItem={({item}) => (
            <RoleCard
              key={item.id.toString()}
              id={item.id}
              title={item.title}
              description={item.description}
              selected={item.value === selectedRole}
              value={item.value}
              onPress={(newRole: string) => setSelectedRole(newRole)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          estimatedItemSize={10}
        />
      </View>
      <View style={commonStyles.footer}>
        <PrimaryButton title="Continue" onPress={handleContinue} />
        <Link text="Already have an account? Sign In" onPress={handleSignIn} />
      </View>
    </SafeAreaView>
  );
};

export default SelectRole;
