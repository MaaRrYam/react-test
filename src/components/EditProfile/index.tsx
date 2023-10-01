import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import BottomSheet from '@/components/BottomSheet';
import {EducationProps, EmploymentProps, UserInterface} from '@/interfaces';
import {Cross} from '@/assets/icons';
import {
  SecondaryButton,
  EditBasicInfoForm,
  EditCareerForm,
  EditEducationForm,
  PrimaryButton,
} from '@/components';

interface EditProfileProps {
  isVisible: boolean;
  onClose: () => void;
  user: UserInterface;
  tabItem: string;
}

const EditProfile = ({isVisible, onClose, user, tabItem}: EditProfileProps) => {
  const renderForm = () => {
    switch (tabItem) {
      case 'Profile':
        return <EditBasicInfoForm user={user} />;
      case 'Career':
        return (
          <EditCareerForm
            careerList={user.employmentList as Array<EmploymentProps>}
          />
        );
      case 'Education':
        return (
          <EditEducationForm
            educationList={user.educationList as Array<EducationProps>}
          />
        );
      default:
        return null;
    }
  };

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose} profilePage>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Cross />
            </TouchableOpacity>
          </View>
          <View>
            {tabItem !== 'Profile' && (
              <SecondaryButton
                title={`Add New ${
                  tabItem === 'Education' ? 'Education' : 'Career'
                }`}
                style={styles.addButton}
                onPress={() => {}}
              />
            )}
          </View>
        </View>
        <View style={styles.contentContainer}>{renderForm()}</View>
        <View style={styles.footer}>
          <PrimaryButton
            title="Save"
            onPress={() => {}}
            style={
              tabItem === 'Profile' ? styles.saveButton : {display: 'none'}
            }
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  closeButtonContainer: {
    backgroundColor: '#F4F4F4',
    width: 42,
    height: 42,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    width: 30,
    height: 30,
  },
  addButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 1000,
    marginTop: 5,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  footer: {
    borderTopColor: '#E4E4E4',
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  saveButton: {
    marginTop: 10,
  },
});

export default EditProfile;
