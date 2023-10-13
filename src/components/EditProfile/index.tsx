import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {EducationProps, EmploymentProps, UserInterface} from '@/interfaces';
import {Cross} from '@/assets/icons';
import {
  SecondaryButton,
  EditBasicInfoForm,
  EditCareerForm,
  EditEducationForm,
  BottomSheet,
} from '@/components';
import {COLORS} from '@/constants';

interface EditProfileProps {
  isVisible: boolean;
  onClose: () => void;
  user: UserInterface;
  tabItem: string;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  addNew: boolean;
  editingIndex: number | null;
  setEditingIndex: (value: number | null) => void;
}

const EditProfile = ({
  isVisible,
  onClose,
  tabItem,
  isEditing,
  user,
  setIsEditing,
  editingIndex,
  setEditingIndex,
}: EditProfileProps) => {
  const [addNew, setAddNew] = useState(false);
  const renderForm = () => {
    switch (tabItem) {
      case 'Profile':
        return (
          <EditBasicInfoForm
            user={user as UserInterface}
            onClose={handleOnClose}
          />
        );
      case 'Career':
        return (
          <EditCareerForm
            careerList={user?.employmentList as Array<EmploymentProps>}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            addNew={addNew}
            setAddNew={setAddNew}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
          />
        );
      case 'Education':
        return (
          <EditEducationForm
            educationList={user?.educationList as Array<EducationProps>}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            addNew={addNew}
            setAddNew={setAddNew}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
          />
        );
      default:
        return null;
    }
  };

  const handleOnClose = () => {
    if (isEditing) {
      setIsEditing(false);
      setAddNew(false);
      setEditingIndex(null);
    } else {
      onClose();
    }
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      indicatorVisible={false}
      snapPoints={['20%', '100%']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleOnClose}>
              <Cross />
            </TouchableOpacity>
          </View>
          <View>
            {tabItem !== 'Profile' && (
              <SecondaryButton
                title={`Add New ${
                  tabItem === 'Education' ? 'Education' : 'Experience'
                }`}
                style={!isEditing ? styles.addButton : {display: 'none'}}
                onPress={async () => {
                  setAddNew(true);
                  setIsEditing(true);
                }}
              />
            )}
          </View>
        </View>
        <View style={styles.contentContainer}>{renderForm()}</View>
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
    borderBottomColor: COLORS.border,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  closeButtonContainer: {
    backgroundColor: COLORS.lightBackground,
    width: 42,
    height: 42,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
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
    paddingTop: 20,
    flex: 1,
  },
});

export default EditProfile;
