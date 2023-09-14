import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {homeStyles} from '@/styles/home';
import {Button, Header, NetworkItem} from '@/components';
import {NetworkScreenProps} from '@/types';
import {COLORS, NETWORK_TABS, NETWORK_REQUESTS} from '@/constants';
import {FlatList} from 'react-native';

const Network: React.FC<NetworkScreenProps> = ({navigation}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>(NETWORK_TABS[0]);

  return (
    <View style={homeStyles.outerContainer}>
      <SafeAreaView style={homeStyles.container}>
        <Header navigation={navigation} />

        <View style={styles.subHeader}>
          <Button
            title={NETWORK_TABS[0]}
            onPress={() => setSelectedTab(NETWORK_TABS[0])}
            backgroundColor={'#F4F4F4'}
            textColor={COLORS.black}
            style={
              selectedTab === NETWORK_TABS[0]
                ? styles.selectedButtonStyles
                : styles.buttonStyles
            }
          />
          <Button
            title={NETWORK_TABS[1]}
            onPress={() => setSelectedTab(NETWORK_TABS[1])}
            backgroundColor={'#F4F4F4'}
            textColor={COLORS.black}
            style={
              selectedTab === NETWORK_TABS[1]
                ? styles.selectedButtonStyles
                : styles.buttonStyles
            }
          />
          <Button
            title={NETWORK_TABS[2]}
            onPress={() => setSelectedTab(NETWORK_TABS[2])}
            backgroundColor={'#F4F4F4'}
            textColor={COLORS.black}
            style={
              selectedTab === NETWORK_TABS[2]
                ? styles.selectedButtonStyles
                : styles.buttonStyles
            }
          />
        </View>

        <FlatList
          data={NETWORK_REQUESTS}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <NetworkItem item={item} />}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  buttonStyles: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  selectedButtonStyles: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.lightBlueBackground,
    paddingVertical: 10,
  },
});

export default Network;
