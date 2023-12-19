import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {homeStyles} from '@/styles/home';
import {PrimaryButton, Header} from '@/components';
import {NetworkScreenProps} from '@/types';
import {COLORS, NETWORK_TABS} from '@/constants';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getRecommendedConnections} from '@/store/features/networkSlice';
import Connections from '@/screens/network/Connections';
import Followings from '@/screens/network/Followings';
import Explore from '@/screens/network/Explore';

/**
 *
 * @param navigation
 * @description This function renders the network screen
 * @returns JSX.Element
 */
const Network: React.FC<NetworkScreenProps> = ({navigation}) => {
  const {isRecommendationsFetched} = useAppSelector(state => state.network);

  const [selectedTab, setSelectedTab] = useState(NETWORK_TABS[0]);
  const [searchText, setSearchText] = useState('');

  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    if (!isRecommendationsFetched) {
      dispatch(getRecommendedConnections());
    }
  }, [dispatch, isRecommendationsFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={homeStyles.outerContainer}>
      <SafeAreaView style={homeStyles.container}>
        <Header
          navigation={navigation}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <View style={styles.subHeader}>
          {NETWORK_TABS.map(tab => (
            <PrimaryButton
              key={tab}
              title={tab}
              onPress={() => setSelectedTab(tab)}
              backgroundColor={'#F4F4F4'}
              textColor={COLORS.black}
              style={
                selectedTab === tab
                  ? styles.selectedPrimaryButtonStyles
                  : styles.PrimaryButtonStyles
              }
            />
          ))}
        </View>

        {selectedTab === NETWORK_TABS[0] ? (
          <Explore searchText={searchText} />
        ) : selectedTab === NETWORK_TABS[1] ? (
          <Connections searchText={searchText} />
        ) : (
          <Followings searchText={searchText} />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  PrimaryButtonStyles: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  selectedPrimaryButtonStyles: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.lightBlueBackground,
    color: COLORS.black,
    paddingVertical: 10,
  },
});

export default Network;
