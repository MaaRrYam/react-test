import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import {Button} from '@components';
import React from 'react';
import Location from '../../assets/icons/Location';
import user from '../../assets/images/user.png';

const JobsDetailForm = () => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.SafeAreaView}>
        <View>
          <Text style={styles.jobTitle}>Security Sales Specialist</Text>
          <Text style={styles.companyName}>Google</Text>

          <View style={styles.basicDetails}>
            <View style={styles.basicDetailItem}>
              <Location />
              <Text style={styles.basicDetailItem}>In-office: Singapore</Text>
            </View>
            <View style={styles.basicDetailItem}>
              <Location />
              <Text style={styles.basicDetailItem}>Total Compensation: L</Text>
            </View>
            <View style={styles.basicDetailItem}>
              <Location />
              <Text style={styles.basicDetailItem}>Base Salary: S</Text>
            </View>
          </View>
          <View style={styles.recruiterContainer}>
            <Image style={styles.recruiterImage} source={user} />
            <Text style={styles.recruiterDetail}>
              Muaaz Saeed is hiring for this position
            </Text>
          </View>
          <View style={styles.applyButtonContainer}>
            <Button title="Apply" />
          </View>
          <View style={styles.jobDetailContainer}>
            <Text style={styles.jobDetailHeading}>Summary</Text>
            <Text style={styles.JobsDetailText}>
              As a Security Sales Specialist, you will help us grow our
              cybersecurity business by building and expanding relationships
              with customers. In this role, you will work with customers to
              deliver true business value, demonstrate product functionality,
              and provide a comprehensive overview of key business use cases.
              You will lead day-to-day relationships with external customer
              stakeholders, leading with empathy, while identifying innovative
              ways to multiply your impact and the impact of the team as a
              whole.
            </Text>
            <Text style={styles.jobDetailHeading}>Responsibilites</Text>
            <Text style={styles.JobsDetailText}>
              As a Security Sales Specialist, you will help us grow our
              cybersecurity business by building and expanding relationships
              with customers. In this role, you will work with customers to
              deliver true business value, demonstrate product functionality,
              and provide a comprehensive overview of key business use cases.
              You will lead day-to-day relationships with external customer
              stakeholders, leading with empathy, while identifying innovative
              ways to multiply your impact and the impact of the team as a
              whole.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  companyName: {
    fontSize: 15,
    fontWeight: 'normal',
    paddingLeft: 20,
    marginTop: 3,
    color: 'black',
  },
  basicDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  basicDetailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: 'black',
  },
  recruiterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  recruiterImage: {
    width: 40,
    marginTop: 30,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  recruiterDetail: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 25,
    color: 'black',
  },
  applyButtonContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 40,
  },
  jobDetailContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  jobDetailHeading: {
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop: 7,
    fontSize: 18,
    color: 'black',
  },
  JobsDetailText: {
    fontSize: 15,
    color: 'black',
  },
});

export default JobsDetailForm;
