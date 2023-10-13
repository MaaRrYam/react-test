import React, {useEffect, FC, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import {EmploymentProps} from '@/interfaces';
import {COLORS, FONTS} from '@/constants';
import {Input, Checkbox, PrimaryButton, CareerCard} from '@/components';
import {careerSchema} from '@/utils/schemas/profile';
import ProfileService from '@/services/profile';

interface CareerFormProps {
  careerList: Array<EmploymentProps>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  addNew: boolean;
  setAddNew: (value: boolean) => void;
  editingIndex: number | null;
  setEditingIndex: (value: number | null) => void;
}

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
      !addNew &&
      editingIndex !== null &&
      (addNew !== previousAddNew.current ||
        editingIndex !== previousEditingIndex.current)
    ) {
      const itemToEdit = careerList[editingIndex];
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
    <View>
      {isEditing ? (
        <View style={styles.paddedContainer}>
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
              style={[styles.yearInput, {marginLeft: 11}]}
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
          <PrimaryButton
            title={editingIndex !== null ? 'Update' : 'Save'}
            onPress={formik.handleSubmit}
            style={styles.saveButton}
            isLoading={formik.isSubmitting}
          />
        </View>
      ) : (
        careerList?.map((item, index) => (
          <View
            key={index}
            style={[
              styles.careerItem,
              {
                borderBottomColor:
                  index === careerList.length - 1
                    ? 'transparent'
                    : COLORS.border,
              },
            ]}>
            <CareerCard
              title={item.role}
              company={item.companyName}
              startDate={item.startYear}
              endDate={item.currentlyWorking ? 'Present' : item.endYear}
              editable
              onEdit={async () => {
                await ProfileService.editCareer(
                  setIsEditing,
                  setAddNew,
                  isEditing,
                  formik.resetForm,
                  setEditingIndex,
                  index,
                );
              }}
              onDelete={() => ProfileService.deleteCareer(index, careerList)}
            />
          </View>
        ))
      )}
    </View>
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
  saveButton: {
    marginTop: 270,
  },
});

export default EditCareerForm;
