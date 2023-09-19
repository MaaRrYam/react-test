import React, {useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {homeStyles} from '@/styles/home';
import {Button, Header} from '@/components';
import {NetworkScreenProps} from '@/types';
import {COLORS, NETWORK_TABS} from '@/constants';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getRecommendedConnections} from '@/store/features/networkSlice';
import Connections from '@/screens/network/Connections';
import Followings from '@/screens/network/Followings';
import Explore from '@/screens/network/Explore';

const Network: React.FC<NetworkScreenProps> = ({navigation}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>(NETWORK_TABS[0]);
  const {isRecommendationsFetched} = useAppSelector(state => state.network);

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

        {selectedTab === NETWORK_TABS[0] ? (
          <Explore />
        ) : selectedTab === NETWORK_TABS[1] ? (
          <Connections />
        ) : (
          <Followings />
        )}
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
    color: COLORS.black,
    paddingVertical: 10,
  },
});

export default Network;
