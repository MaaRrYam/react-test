import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {BackButton, Button, Link, RoleCard} from '../../components';
import {COLORS, FONTS, PADDING, ROLES_DATA} from '../../constants';

const SelectRole = () => {
  const [selectedRole, setSelectedRole] = useState(ROLES_DATA[0].id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
        <Text style={styles.title}>Choose Your Role</Text>

        {
          <FlatList
            data={ROLES_DATA}
            renderItem={({item}) => (
              <RoleCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                selected={item.id === selectedRole}
                onPress={(newRole: number) => setSelectedRole(newRole)}
              />
            )}
          />
        }

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

export default SelectRole;
