import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import {EducationProps} from '@/interfaces';
import {Checkbox, Input, PrimaryButton, CareerCard} from '@/components';
import {COLORS, FONTS} from '@/constants';
import FirebaseService from '@/services/Firebase';
import {areEducationsEqual, getUID} from '@/utils/functions';
import {educationSchema} from '@/utils/schemas/profile';

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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const deleteEducation = async (indexToDelete: number) => {
    const uid = await getUID();
    const updatedEducationList = [...educationList];
    updatedEducationList.splice(indexToDelete, 1);
    await FirebaseService.updateDocument('users', uid as string, {
      educationList: updatedEducationList,
    });
  };
  const formik = useFormik({
    initialValues: {
      instituteName: '',
      degreeName: '',
      startYear: '',
      endYear: '',
      isCurrentlyStudying: false,
    },
    validationSchema: educationSchema,
    onSubmit: async values => {
      await formik.setSubmitting(true);
      console.log('Form submitted with values:', values);
      const uid = await getUID();

      const newEducation: EducationProps = {
        instituteName: values.instituteName,
        degree: values.degreeName,
        startYear: values.startYear,
        endYear: values.isCurrentlyStudying ? 'Present' : values.endYear,
        currentlyStudying: values.isCurrentlyStudying,
        id: FirebaseService.generateUniqueId(),
      };
      if (editingIndex !== null) {
        // If we are editing, update the existing career at the editing index
        const updatedEducation = [...educationList];
        updatedEducation[editingIndex] = newEducation;
        await FirebaseService.updateDocument('users', uid as string, {
          educationList: updatedEducation,
        });
        setEditingIndex(null);
        toggleEditForm();
      } else {
        const isDuplicate = educationList.some(education =>
          areEducationsEqual(education, newEducation),
        );

        if (!isDuplicate) {
          await FirebaseService.updateDocument('users', uid as string, {
            educationList: [...educationList, newEducation],
          });
          await formik.setSubmitting(false);
          toggleEditForm();
        }
      }
    },
  });

  useEffect(() => {
    if (addNew) {
      formik.resetForm();
    } else {
      const itemToEdit = educationList[0];
      if (itemToEdit) {
        const newValues = {
          instituteName: itemToEdit.instituteName || '',
          degreeName: itemToEdit.degree || '',
          startYear: itemToEdit.startYear || '',
          endYear: itemToEdit.currentlyStudying ? '' : itemToEdit.endYear || '',
          isCurrentlyStudying: itemToEdit.currentlyStudying || false,
        };

        formik.setValues(newValues);
      }
    }
  }, [addNew]);

  const toggleEditForm = () => {
    setIsEditing(!isEditing);
    setAddNew(false);
  };

  return (
    <ScrollView>
      {isEditing ? (
        <View style={styles.paddedContainer}>
          <Text style={styles.sectionHeader}>Education Details</Text>
          <Input
            onChangeText={formik.handleChange('instituteName')}
            placeholder="Institute Name"
            value={formik.values.instituteName}
            style={styles.textInput}
            error={formik.errors.instituteName}
          />
          <Input
            onChangeText={formik.handleChange('degreeName')}
            placeholder="Degree Name"
            value={formik.values.degreeName}
            style={styles.textInput}
            error={formik.errors.degreeName}
          />
          <View style={styles.yearInputContainer}>
            <Input
              onChangeText={formik.handleChange('startYear')}
              placeholder="Start Year"
              value={formik.values.startYear}
              style={styles.yearInput}
              error={formik.errors.startYear}
              keyboardType="numeric"
            />
            <Input
              onChangeText={formik.handleChange('endYear')}
              placeholder="End Year"
              value={formik.values.endYear}
              style={[styles.yearInput, {marginLeft: 11}]}
              error={formik.errors.endYear}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              onPress={() =>
                formik.setFieldValue(
                  'isCurrentlyStudying',
                  !formik.values.isCurrentlyStudying,
                )
              }
              isChecked={formik.values.isCurrentlyStudying}
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
              onEdit={() => {
                setEditingIndex(index);
                toggleEditForm();
              }}
               onDelete={() => {
                deleteEducation(index);
              }}
            />
          </View>
        ))
      )}
      {isEditing && (
        <View style={styles.footer}>
          <PrimaryButton
            title={editingIndex !== null ? 'Update' : 'Save'}
            onPress={formik.handleSubmit}
            style={styles.saveButton}
            isLoading={formik.isSubmitting}
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
    color: COLORS.black,
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
