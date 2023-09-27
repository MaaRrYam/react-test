import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {Header, PrimaryButton, SecondaryButton} from '@/components';
import {getScreenDimensions} from '@/utils/functions';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {RootState} from '@/store';
import {getUser} from '@/store/features/authSlice';

const Profile = () => {
  const {width} = getScreenDimensions();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((authState: RootState) => authState.auth);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      dispatch(getUser());
    }
  }, [user, dispatch]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Header />

        <View>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
            style={{width: width, height: 110, objectFit: 'cover'}}
          />
        </View>

        <View style={{backgroundColor: 'white'}}>
          <View
            style={{
              position: 'absolute',
              paddingHorizontal: 10,
              top: -55,
              zIndex: 50,
            }}>
            <Image
              source={{
                uri: user.photoUrl,
              }}
              style={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                borderRadius: 25,
              }}
            />
          </View>
          <View style={{width: width, height: 'auto', paddingHorizontal: 15}}>
            <View>
              <Text style={{marginTop: 54, color: 'black', fontWeight: 'bold'}}>
                {user.name}
              </Text>
              <Text style={styles.text}>{user.tagline}</Text>
              <Text style={styles.text}>
                {user.city}, {user.countryDetails.name}
              </Text>
              <Text style={{color: '#1918FF', textDecorationLine: 'underline'}}>
                26 connections
              </Text>
            </View>
            <View style={{flexDirection: 'row', width: width}}>
              <PrimaryButton title="Connect" />
              <SecondaryButton title="Message"/>,
            </View>
          </View>
        </View>

        <View>
          <Text style={{color: 'black'}}>Posts</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  text: {
    color: 'black',
  },
});
