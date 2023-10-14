import React, {useEffect, useRef, useState} from 'react';
import {Text, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {useFormik} from 'formik';
import {EditEducationProps} from '@/interfaces';
import {Checkbox, Input, PrimaryButton, CareerCard} from '@/components';
import {educationSchema} from '@/utils/schemas/profile';
import ProfileService from '@/services/profile';
import {editFormStyles as styles} from '@/components/Forms/styles';

const EditEducationForm = ({
  educationList,
  isEditing,
  setIsEditing,
  addNew,
  setAddNew,
}: EditEducationProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
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
      await ProfileService.handleEducationEdit(
        values,
        formik.setSubmitting,
        editingIndex,
        educationList,
        setEditingIndex,
        setAddNew,
        setIsEditing,
        isEditing,
      );
    },
  });

  const previousAddNew = useRef(addNew);
  const previousEditingIndex = useRef(editingIndex);

  useEffect(() => {
    if (
      addNew !== previousAddNew.current ||
      editingIndex !== previousEditingIndex.current
    ) {
      if (addNew) {
        formik.resetForm();
      } else {
        const itemToEdit = educationList[editingIndex];
        if (itemToEdit) {
          const newValues = {
            instituteName: itemToEdit.instituteName || '',
            degreeName: itemToEdit.degree || '',
            startYear: itemToEdit.startYear || '',
            endYear: itemToEdit.currentlyStudying
              ? ''
              : itemToEdit.endYear || '',
            isCurrentlyStudying: itemToEdit.currentlyStudying || false,
          };

          formik.setValues(newValues);
        }
      }
    }
    previousAddNew.current = addNew;
    previousEditingIndex.current = editingIndex;
  }, [addNew, editingIndex, educationList, formik]);

  return (
    <View style={{flex: 1}}>
      {isEditing ? (
        <KeyboardAvoidingView style={styles.paddedContainer}>
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
              style={[styles.yearInput, styles.leftMargin]}
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
        </KeyboardAvoidingView>
      ) : (
        educationList.map((item, index) => (
          <View
            key={index}
            style={[
              styles.careerItem,
              index === educationList.length - 1
                ? styles.borderTransparent
                : styles.borderColored,
            ]}>
            <CareerCard
              title={item.degree}
              company={item.instituteName}
              startDate={item.startYear}
              endDate={item.currentlyStudying ? 'Present' : item.endYear}
              editable
              key={index}
              onEdit={async () => {
                await ProfileService.editEducation(
                  setIsEditing,
                  setAddNew,
                  isEditing,
                  setEditingIndex,
                  index,
                );
              }}
              onDelete={() => {
                ProfileService.deleteEducation(index, educationList);
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
    </View>
  );
};

export default EditEducationForm;
