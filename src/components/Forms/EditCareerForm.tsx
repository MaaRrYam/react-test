import React, {useEffect, FC, useRef} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {useFormik} from 'formik';
import {CareerFormProps} from '@/interfaces';
import {Input, Checkbox, PrimaryButton, CareerCard} from '@/components';
import {careerSchema} from '@/utils/schemas/profile';
import ProfileService from '@/services/profile';
import {editFormStyles as styles} from '@/components/Forms/styles';
import { COLORS } from '@/constants';

const EditCareerForm: FC<CareerFormProps> = ({
  careerList,
  isEditing,
  setIsEditing,
  addNew,
  setAddNew,
  editingIndex,
  setEditingIndex,
}) => {
  const formik = useFormik({
    initialValues: {
      companyName: '',
      role: '',
      startYear: '',
      endYear: '',
      isCurrentlyWorking: false,
    },
    validationSchema: careerSchema,
    onSubmit: async formValues => {
      await ProfileService.handleCareerInfoEdit(
        formValues,
        formik.setSubmitting,
        setEditingIndex,
        editingIndex,
        careerList,
      );
      ProfileService.toggleCareerEditForm(
        setIsEditing,
        setAddNew,
        isEditing,
        formik.resetForm,
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
      const itemToEdit = careerList[editingIndex as number];
      if (itemToEdit) {
        formik.setValues({
          companyName: itemToEdit.companyName || '',
          role: itemToEdit.role || '',
          startYear: itemToEdit.startYear || '',
          endYear: itemToEdit.currentlyWorking ? '' : itemToEdit.endYear || '',
          isCurrentlyWorking: itemToEdit.currentlyWorking || false,
        });
      }
    }

    previousAddNew.current = addNew;
    previousEditingIndex.current = editingIndex;
  }, [addNew, editingIndex, careerList, formik]);
  return (
    <View style={{flex: 1}}>
      {isEditing ? (
        <>
          <KeyboardAvoidingView style={styles.paddedContainer}>
            <Text style={styles.sectionHeader}>Job Details</Text>
            <Input
              onChangeText={formik.handleChange('companyName')}
              placeholder="Current Company"
              value={formik.values.companyName}
              setFieldTouched={formik.setFieldTouched}
              style={styles.textInput}
              error={formik.errors.companyName}
            />
            <Input
              onChangeText={formik.handleChange('role')}
              placeholder="Designation"
              value={formik.values.role}
              setFieldTouched={formik.setFieldTouched}
              style={styles.textInput}
              error={formik.errors.role}
            />
            <View style={styles.yearInputContainer}>
              <Input
                onChangeText={formik.handleChange('startYear')}
                placeholder="Start Year"
                value={formik.values.startYear}
                setFieldTouched={formik.setFieldTouched}
                style={styles.yearInput}
                error={formik.errors.startYear}
                keyboardType="numeric"
              />
              <Input
                onChangeText={formik.handleChange('endYear')}
                placeholder="End Year"
                value={formik.values.endYear}
                style={[styles.yearInput, styles.leftMargin]}
                setFieldTouched={formik.setFieldTouched}
                error={formik.errors.endYear}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                onPress={() =>
                  formik.setFieldValue(
                    'isCurrentlyWorking',
                    !formik.values.isCurrentlyWorking,
                  )
                }
                isChecked={formik.values.isCurrentlyWorking}
              />
              <Text style={styles.checkboxText}>Currently Working?</Text>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.footer}>
          <PrimaryButton
            title={editingIndex !== null ? 'Update' : 'Save'}
            onPress={formik.handleSubmit}
            style={[styles.saveButton]}
            isLoading={formik.isSubmitting}
          />
          </View>
        </>
      ) : (
        careerList?.map((item, index) => (
          <View
            key={index}
            style={[
              styles.careerItem,
              index === careerList.length - 1
                ? styles.borderTransparent
                : styles.borderColored,
            ]}>
            <CareerCard
              title={item.role}
              company={item.companyName}
              startDate={item.startYear}
              endDate={item.currentlyWorking ? 'Present' : item.endYear}
              editable
              onEdit={async () => {
                await ProfileService.toggleCareerEditForm(
                  setIsEditing,
                  setAddNew,
                  isEditing,
                  formik.resetForm,
                );
                await setEditingIndex(index);
              }}
              onDelete={() => ProfileService.deleteCareer(index, careerList)}
            />
          </View>
        ))
      )}
    </View>
  );
};

export default EditCareerForm;
