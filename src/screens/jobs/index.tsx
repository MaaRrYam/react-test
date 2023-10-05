import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Header, Button, BottomSheet} from '@/components';
import {COLORS} from '@/constants';
import JobsDetailForm from '../../components/Forms/JobsDetailForm';

const Jobs = ({navigation}: any) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.SafeAreaView}>
          <View>
            <Header navigation={navigation} />
            <View style={styles.cardView}>
              <Text style={styles.cardText}>Chabi Kahan hai?</Text>
              <Button
                title="Show Sheet"
                onPress={() => setIsBottomSheetVisible(true)}
                backgroundColor={COLORS.white}
                textColor={COLORS.black}
                borderWidth={1}
                borderColor={COLORS.border}
              />
              <Text style={styles.cardText}>I am card baby</Text>
              <Button
                title="Show Sheet"
                onPress={() => setIsBottomSheetVisible(true)}
                backgroundColor={COLORS.white}
                textColor={COLORS.black}
                borderWidth={1}
                borderColor={COLORS.border}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      {isBottomSheetVisible && (
        <BottomSheet
          isVisible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)}
          snapPoints={['20%', '90%']}>
          <JobsDetailForm />
        </BottomSheet>
      )}
    </>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  cardView: {
    padding: 5,
    marginTop: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  cardText: {
    marginTop: 10,
    marginBottom: 10,
  },
});
