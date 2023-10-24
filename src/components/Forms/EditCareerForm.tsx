import React, {useEffect, FC, useRef, useCallback, useMemo} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {useFormik} from 'formik';
import {CareerFormProps, EmploymentProps} from '@/interfaces';
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
import ToastService from '@/services/toast';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {updateUserData} from '@/store/features/authSlice';
import FirebaseService from '@/services/Firebase';
const EditCareerForm: FC<CareerFormProps> = ({
  isEditing,
  setIsEditing,
  addNew,
  setAddNew,
  editingIndex,
  setEditingIndex,
}) => {
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const careerList = useMemo(() => {
    return (user.employmentList || []) as EmploymentProps[];
  }, [user.employmentList]);

  const {
    values,
    isSubmitting,
    setSubmitting,
    resetForm,
    handleChange,
    errors,
    handleSubmit,
    setFieldValue,
    setValues,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      id: '',
      companyName: '',
      role: '',
      startYear: '',
      endYear: '',
      isCurrentlyWorking: false,
    },
    validationSchema: careerSchema,
    onSubmit: async () => {
      if (values.id) {
        await updateCareer(values.id);
      } else {
        await addCareer();
      }
      setSubmitting(false);
    },
  });

  const deleteCareer = useCallback(
    async (id: string) => {
      const updatedCareers = careerList.filter(career => career.id !== id);
      const response = await ProfileService.updateEmployment(updatedCareers);
      if (response) {
        ToastService.showSuccess('Career Deleted');
        dispatch(updateUserData({...user, employmentList: updatedCareers}));
      }
    },
    [careerList, dispatch, user],
  );

  const addCareer = useCallback(async () => {
    const updatedCareers = [
      ...careerList,
      {
        id: FirebaseService.generateUniqueId(),
        companyName: values.companyName,
        role: values.role,
        startYear: values.startYear,
        endYear: values.endYear,
        currentlyWorking: values.isCurrentlyWorking,
      },
    ];

    const response = await ProfileService.updateEmployment(updatedCareers);
    if (response) {
      ToastService.showSuccess('Employment Added Successfully');
      dispatch(
        updateUserData({
          ...user,
          employmentList: updatedCareers,
        }),
      );
    }
  }, [careerList, dispatch, user, values]);

  const updateCareer = useCallback(
    async (id: string) => {
      const updatedCareers = careerList.map(career => {
        if (career.id === id) {
          return {
            ...career,
            companyName: values.companyName,
            role: values.role,
            startYear: values.startYear,
            endYear: values.endYear,
            currentlyWorking: values.isCurrentlyWorking,
          };
        }

        return career;
      });

      const response = await ProfileService.updateEmployment(updatedCareers);
      if (response) {
        ToastService.showSuccess('Employment Updated Successfully');
        dispatch(
          updateUserData({
            ...user,
            employmentList: updatedCareers,
          }),
        );
      }
    },
    [careerList, dispatch, user, values],
  );

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
        resetForm();
      } else {
        const itemToEdit = careerList[editingIndex || 0];
        if (itemToEdit) {
          const newValues = {
            id: itemToEdit.id,
            companyName: itemToEdit.companyName || '',
            role: itemToEdit.role || '',
            startYear: itemToEdit.startYear || years[0],
            endYear: itemToEdit.currentlyWorking
              ? ''
              : itemToEdit.endYear || years[0],
            isCurrentlyWorking: itemToEdit.currentlyWorking || false,
          };

          setValues(newValues);
        }
      }
    }
    previousAddNew.current = addNew;
    previousEditingIndex.current = editingIndex;
  }, [addNew, editingIndex, careerList, years, resetForm, setValues]);

  console.log(values.id, 'ID');

  return (
    <View style={styles.flexStyle}>
      {isEditing ? (
        <>
          <KeyboardAvoidingView style={styles.paddedContainer}>
            <Text style={styles.sectionHeader}>Job Details</Text>
            <Input
              onChangeText={handleChange('companyName')}
              placeholder="Current Company"
              value={values.companyName}
              setFieldTouched={setFieldTouched}
              style={styles.textInput}
              error={errors.companyName}
            />
            <Input
              onChangeText={handleChange('role')}
              placeholder="Designation"
              value={values.role}
              setFieldTouched={setFieldTouched}
              style={styles.textInput}
              error={errors.role}
            />
            <View style={styles.yearInputContainer}>
              <YearDropdown
                onYearSelect={handleChange('startYear')}
                selectedYear={values.startYear}
                years={years}
                setFieldTouched={setFieldTouched}
                name="startYear"
                label="Start Year"
              />
              <YearDropdown
                onYearSelect={handleChange('endYear')}
                selectedYear={values.endYear}
                years={years}
                setFieldTouched={setFieldTouched}
                name="endYear"
                label="End Year"
                style={{marginLeft: 10}}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                onPress={() =>
                  setFieldValue(
                    'isCurrentlyWorking',
                    !values.isCurrentlyWorking,
                  )
                }
                isChecked={values.isCurrentlyWorking}
              />
              <Text style={styles.checkboxText}>
                I currently work in this role?
              </Text>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.footer}>
            <PrimaryButton
              title={editingIndex !== null ? 'Update' : 'Save'}
              onPress={handleSubmit}
              style={[styles.saveButton]}
              isLoading={isSubmitting}
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
                setIsEditing(!isEditing);
                setAddNew(false);
                resetForm();
                setEditingIndex(index);
              }}
              onDelete={() => deleteCareer(item.id)}
            />
          </View>
        ))
      )}
    </View>
  );
};

export default EditCareerForm;
