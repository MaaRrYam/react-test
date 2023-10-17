import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {EducationProps} from '@/interfaces';
import {Checkbox, Input, Button, CareerCard} from '@/components';
import {COLORS, FONTS} from '@/constants';

interface EditEducationProps {
  educationList: Array<EducationProps>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  addNew: boolean;
  setAddNew: (value: boolean) => void;
}

const EditEducationForm = ({
  educationList,
  isEditing,
  setIsEditing,
  addNew,
  setAddNew,
}: EditEducationProps) => {
  const [educationDetails, setEducationDetails] = useState({
    instituteName: '',
    degreeName: '',
    startYear: '',
    endYear: '',
    isCurrentlyStudying: false,
  });

  const [isNewData, setIsNewData] = useState(false);

  useEffect(() => {
    if (addNew) {
      setEducationDetails({
        instituteName: '',
        degreeName: '',
        startYear: '',
        endYear: '',
        isCurrentlyStudying: false,
      });
      setIsNewData(true);
    } else {
      setIsNewData(false);
      const itemToEdit = educationList[0];
      if (itemToEdit) {
        setEducationDetails({
          instituteName: itemToEdit.instituteName || '',
          degreeName: itemToEdit.degree || '',
          startYear: itemToEdit.startYear || '',
          endYear: itemToEdit.currentlyStudying
            ? 'Present'
            : itemToEdit.endYear || '',
          isCurrentlyStudying: itemToEdit.currentlyStudying || false,
        });
      }
    }
  }, [addNew, educationList]);

  const handleEdit = (item: EducationProps) => {
    setIsEditing(true);
    if (!addNew) {
      setEducationDetails({
        instituteName: item.instituteName || '',
        degreeName: item.degree || '',
        startYear: item.startYear || '',
        endYear: item.currentlyStudying ? 'Present' : item.endYear || '',
        isCurrentlyStudying: item.currentlyStudying || false,
      });
    }
  };

  return (
    <ScrollView>
      {isEditing || isNewData ? (
        <View style={styles.paddedContainer}>
          <Text style={styles.sectionHeader}>Education Details</Text>
          <Input
            onChangeText={text =>
              setEducationDetails({...educationDetails, instituteName: text})
            }
            placeholder="Institute Name"
            value={educationDetails.instituteName}
            style={styles.textInput}
          />
          <Input
            onChangeText={text =>
              setEducationDetails({...educationDetails, degreeName: text})
            }
            placeholder="Degree Name"
            value={educationDetails.degreeName}
            style={styles.textInput}
          />
          <View style={styles.yearInputContainer}>
            <Input
              onChangeText={text =>
                setEducationDetails({...educationDetails, startYear: text})
              }
              placeholder="Start Year"
              value={educationDetails.startYear}
              style={styles.yearInput}
            />
            <Input
              onChangeText={text =>
                setEducationDetails({...educationDetails, endYear: text})
              }
              placeholder="End Year"
              value={educationDetails.endYear}
              style={[styles.yearInput, {marginLeft: 11}]}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              onPress={() =>
                setEducationDetails({
                  ...educationDetails,
                  isCurrentlyStudying: !educationDetails.isCurrentlyStudying,
                })
              }
              isChecked={educationDetails.isCurrentlyStudying}
            />
            <Text style={styles.checkboxText}>Currently Studying?</Text>
          </View>
        </View>
      ) : (
        educationList.map((item, index) => (
          <View
            key={index}
            style={[
              styles.careerItem,
              {
                borderBottomColor:
                  index === educationList.length - 1
                    ? 'transparent'
                    : COLORS.border,
              },
            ]}>
            <CareerCard
              title={item.degree}
              company={item.instituteName}
              startDate={item.startYear}
              endDate={item.currentlyStudying ? 'Present' : item.endYear}
              editable
              key={index}
              onEdit={() => handleEdit(item)}
            />
          </View>
        ))
      )}
      {isEditing && (
        <View style={styles.footer}>
          <Button
            title="Save"
            onPress={() => {
              setIsEditing(false);
              setAddNew(true);
            }}
            style={styles.saveButton}
          />
        </View>
      )}
    </ScrollView>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  yearInput: {
    width: 156,
  },
  textInput: {
    width: 323,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    color: COLORS.black,
    marginLeft: 10,
  },
  careerItem: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  footer: {
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    marginTop: 260,
  },
  saveButton: {
    marginTop: 10,
  },
});

export default EditEducationForm;
