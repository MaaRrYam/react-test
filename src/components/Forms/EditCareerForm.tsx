import React, {useState, useEffect, FC} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import {EmploymentProps} from '@/interfaces';
import {COLORS, FONTS} from '@/constants';
import {Input, Checkbox, PrimaryButton, CareerCard} from '@/components';
import {careerSchema} from '@/utils/schemas/profile';
import FirebaseService from '@/services/Firebase';
import {areCareersEqual, getUID} from '@/utils/functions';

interface CareerFormProps {
  careerList: Array<EmploymentProps>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  addNew: boolean;
  setAddNew: (value: boolean) => void;
}

const EditCareerForm: FC<CareerFormProps> = ({
  careerList,
  isEditing,
  setIsEditing,
  addNew,
  setAddNew,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const handleSave = async (values: {
    companyName: string;
    role: string;
    startYear: string;
    isCurrentlyWorking: boolean;
    endYear: string;
  }) => {
    console.log('Form submitted with values:', values);
    const uid = await getUID();
    const newEmployment: EmploymentProps = {
      companyName: values.companyName,
      role: values.role,
      startYear: values.startYear,
      endYear: values.isCurrentlyWorking
        ? new Date().getFullYear().toString()
        : values.endYear,
      currentlyWorking: values.isCurrentlyWorking,
      id: FirebaseService.generateUniqueId(),
    };

    if (editingIndex !== null) {
      const updatedExperience = [...careerList];
      updatedExperience[editingIndex] = newEmployment;
      setEditingIndex(null);

      await FirebaseService.updateDocument('users', uid as string, {
        employmentList: updatedExperience,
      });
    } else {
      const isDuplicate = careerList.some(career =>
        areCareersEqual(career, newEmployment),
      );
      if (!isDuplicate) {
        await FirebaseService.updateDocument('users', uid as string, {
          employmentList: [...careerList, newEmployment],
        });
      }
    }
    await formik.setSubmitting(false);
    toggleEditForm();
  };

  const deleteCareer = async (indexToRemove: number) => {
    const updatedCareerList = [...careerList];
    updatedCareerList.splice(indexToRemove, 1);
    const uid = await getUID();
    if (uid) {
      FirebaseService.updateDocument('users', uid as string, {
        employmentList: updatedCareerList,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      companyName: '',
      role: '',
      startYear: '',
      endYear: '',
      isCurrentlyWorking: false,
    },
    validationSchema: careerSchema,
    onSubmit: formValues => {
      formik.setSubmitting(true);
      handleSave(formValues);
    },
  });

  const toggleEditForm = () => {
    setIsEditing(!isEditing);
    setAddNew(false);
    formik.resetForm();
  };

  useEffect(() => {
    if (!addNew && editingIndex !== null) {
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
  }, [addNew, editingIndex]);

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
              onEdit={() => {
                toggleEditForm();
                setEditingIndex(index);
              }}
              onDelete={() => deleteCareer(index)}
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
