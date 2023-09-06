import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import {Button, Link, RoleCard} from '@/components';
import {ROLES_DATA} from '@/constants';
import {SelectRoleScreenProps} from '@/types';
import {commonStyles} from '@/styles/onboarding';

const SelectRole: React.FC<SelectRoleScreenProps> = ({navigation}) => {
  const [selectedRole, setSelectedRole] = useState(ROLES_DATA[0].id);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Choose Your Role</Text>

        {ROLES_DATA.map(item => (
          <RoleCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            selected={item.id === selectedRole}
            onPress={(newRole: number) => setSelectedRole(newRole)}
          />
        ))}
      </View>
      <View style={commonStyles.footer}>
        <Button
          title="Continue"
          onPress={() => navigation.navigate('RequestAccess')}
        />
        <Link
          text="Already have an account? Sign In"
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectRole;
