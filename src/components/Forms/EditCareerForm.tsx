import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {EmploymentProps} from '@/interfaces';
import {CareerCard} from '../Cards';
import {FONTS} from '@/constants';
import {Input, Checkbox} from '../Inputs';
import {PrimaryButton} from '../Buttons';

interface CareerFormProps {
  careerList: Array<EmploymentProps>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  addNew: boolean;
  setAddNew: (value: boolean) => void;
}

const EditCareerForm: React.FC<CareerFormProps> = ({
  careerList,
  isEditing,
  setIsEditing,
  addNew,
  setAddNew,
}) => {
  const [jobDetails, setJobDetails] = useState({
    companyName: '',
    role: '',
    startYear: '',
    endYear: '',
    isCurrentlyWorking: false,
  });

  const [isNewData, setIsNewData] = useState(false);

  useEffect(() => {
    if (addNew) {
      setJobDetails({
        companyName: null as unknown as string,
        role: null as unknown as string,
        startYear: null as unknown as string,
        endYear: null as unknown as string,
        isCurrentlyWorking: false,
      });
      setIsNewData(true);
    } else {
      setIsNewData(false);

      const itemToEdit = careerList[0];
      if (itemToEdit) {
        setJobDetails({
          companyName: itemToEdit.companyName || '',
          role: itemToEdit.role || '',
          startYear: itemToEdit.startYear || '',
          endYear: itemToEdit.currentlyWorking
            ? 'Present'
            : itemToEdit.endYear || '',
          isCurrentlyWorking: itemToEdit.currentlyWorking || false,
        });
      }
    }
  }, [addNew, careerList]);

  const toggleEditForm = () => {
    setIsEditing(!isEditing);
    setAddNew(false);
  };

  return (
    <View>
      {isEditing || isNewData ? (
        <View style={styles.paddedContainer}>
          <Text style={styles.sectionHeader}>Job Details</Text>
          <Input
            onChangeText={text =>
              setJobDetails({...jobDetails, companyName: text})
            }
            placeholder="Current Company"
            value={jobDetails.companyName}
          />
          <Input
            onChangeText={text => setJobDetails({...jobDetails, role: text})}
            placeholder="Designation"
            value={jobDetails.role}
          />
          <View style={styles.yearInputContainer}>
            <Input
              onChangeText={text =>
                setJobDetails({...jobDetails, startYear: text})
              }
              placeholder="Start Year"
              value={jobDetails.startYear}
              style={styles.yearInput}
            />
            <Input
              onChangeText={text =>
                setJobDetails({...jobDetails, endYear: text})
              }
              placeholder="End Year"
              value={jobDetails.endYear}
              style={styles.yearInput}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              onPress={() =>
                setJobDetails({
                  ...jobDetails,
                  isCurrentlyWorking: !jobDetails.isCurrentlyWorking,
                })
              }
              isChecked={jobDetails.isCurrentlyWorking}
            />
            <Text style={styles.checkboxText}>Currently Studying?</Text>
          </View>
        </View>
      ) : (
        careerList?.map((item, index) => (
          <View
            key={index}
            style={[
              styles.careerItem,
              {
                borderBottomColor:
                  index === careerList.length - 1 ? 'transparent' : '#E4E4E4',
              },
            ]}>
            <CareerCard
              title={item.role}
              company={item.companyName}
              startDate={item.startYear}
              endDate={item.currentlyWorking ? 'Present' : item.endYear}
              editable
              onEdit={() => toggleEditForm()}
            />
          </View>
        ))
      )}
      {isEditing && (
        <View style={styles.footer}>
          <PrimaryButton
            title="Save"
            onPress={() => toggleEditForm()}
            style={styles.saveButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paddedContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    color: 'black',
    marginBottom: 24,
    fontWeight: 'bold',
    fontSize: FONTS.largeLabel,
  },
  yearInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yearInput: {
    width: 156,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    color: 'black',
    marginLeft: 20,
  },
  careerItem: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  footer: {
    borderTopColor: '#E4E4E4',
    borderTopWidth: 1,
    paddingHorizontal: 20,
    marginTop: 260,
  },
  saveButton: {
    marginTop: 10,
  },
});

export default EditCareerForm;
