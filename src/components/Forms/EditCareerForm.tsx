import React, {useEffect, FC, useRef} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {useFormik} from 'formik';
import {CareerFormProps} from '@/interfaces';
import {
  Input,
  Checkbox,
  PrimaryButton,
  CareerCard,
  YearDropdown,
} from '@/components';
import {careerSchema} from '@/utils/schemas/profile';
import ProfileService from '@/services/profile';
import {editFormStyles as styles} from '@/components/Forms/styles';
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
  const years = Array.from(
    {length: new Date().getFullYear() - 1999},
    (_, index) => (2000 + index).toString(),
  );
  useEffect(() => {
    if (
      addNew !== previousAddNew.current ||
      editingIndex !== previousEditingIndex.current
    ) {
      if (addNew) {
        formik.resetForm();
      } else {
        const itemToEdit = careerList[editingIndex || 0];
        if (itemToEdit) {
          const newValues = {
            companyName: itemToEdit.companyName || '',
            role: itemToEdit.role || '',
            startYear: itemToEdit.startYear || years[0],
            endYear: itemToEdit.currentlyWorking
              ? ''
              : itemToEdit.endYear || years[0],
            isCurrentlyWorking: itemToEdit.currentlyWorking || false,
          };

          formik.setValues(newValues);
        }
      }
    }
    previousAddNew.current = addNew;
    previousEditingIndex.current = editingIndex;
  }, [addNew, editingIndex, careerList, formik, years]);

  return (
    <View style={styles.flexStyle}>
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
              <YearDropdown
                onYearSelect={formik.handleChange('startYear')}
                selectedYear={formik.values.startYear}
                years={years}
                setFieldTouched={formik.setFieldTouched}
                name="startYear"
                label="Start Year"
              />
              <YearDropdown
                onYearSelect={formik.handleChange('endYear')}
                selectedYear={formik.values.endYear}
                years={years}
                setFieldTouched={formik.setFieldTouched}
                name="endYear"
                label="End Year"
                style={{marginLeft: 10}}
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
