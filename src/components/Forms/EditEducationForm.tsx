import React, {useEffect, FC, useRef, useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useFormik} from 'formik';
import {CareerFormProps, EducationProps} from '@/interfaces';
import {
  Input,
  Checkbox,
  PrimaryButton,
  CareerCard,
  YearDropdown,
} from '@/components';
import {educationSchema} from '@/utils/schemas/profile';
import ProfileService from '@/services/profile';
import {editFormStyles as styles} from '@/components/Forms/styles';
import ToastService from '@/services/toast';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {updateUserData} from '@/store/features/authSlice';
import FirebaseService from '@/services/Firebase';
const EditEducationForm: FC<CareerFormProps> = ({
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
    return (user.educationList || []) as EducationProps[];
  }, [user.educationList]);

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
      instituteName: '',
      degreeName: '',
      startYear: '2000',
      endYear: '2010',
      isCurrentlyStudying: false,
    },
    validationSchema: educationSchema,
    onSubmit: async () => {
      if (values.id) {
        await updateCareer(values.id);
      } else {
        await addCareer();
      }
      setIsEditing(false);
      setSubmitting(false);
    },
  });

  const deleteCareer = useCallback(
    async (id: string) => {
      const updatedCareers = careerList.filter(career => career.id !== id);
      const response = await ProfileService.updateEducation(updatedCareers);
      if (response) {
        ToastService.showSuccess('Education Deleted');
        dispatch(updateUserData({...user, educationList: updatedCareers}));
      }
    },
    [careerList, dispatch, user],
  );

  const addCareer = useCallback(async () => {
    const updatedCareers = [
      ...careerList,
      {
        id: FirebaseService.generateUniqueId(),
        instituteName: values.instituteName,
        degree: values.degreeName,
        startYear: values.startYear,
        endYear: values.endYear,
        currentlyStudying: values.isCurrentlyStudying,
      },
    ];

    const response = await ProfileService.updateEducation(updatedCareers);
    if (response) {
      ToastService.showSuccess('Education Added Successfully');
      dispatch(
        updateUserData({
          ...user,
          educationList: updatedCareers,
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
            instituteName: values.instituteName,
            degree: values.degreeName,
            startYear: values.startYear,
            endYear: values.endYear,
            currentlyStudying: values.isCurrentlyStudying,
          };
        }

        return career;
      });

      const response = await ProfileService.updateEducation(updatedCareers);
      if (response) {
        ToastService.showSuccess('Education Updated Successfully');
        dispatch(
          updateUserData({
            ...user,
            educationList: updatedCareers,
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
        const itemToEdit = careerList[editingIndex as number];
        if (itemToEdit) {
          const newValues = {
            id: itemToEdit.id,
            instituteName: itemToEdit.instituteName || '',
            degreeName: itemToEdit.degree || '',
            startYear: itemToEdit.startYear || years[0],
            endYear: itemToEdit.currentlyStudying
              ? ''
              : itemToEdit.endYear || years[3],
            isCurrentlyStudying: itemToEdit.currentlyStudying || false,
          };

          setValues(newValues);
        }
      }
    }
    previousAddNew.current = addNew;
    previousEditingIndex.current = editingIndex;
  }, [addNew, editingIndex, careerList, years, resetForm, setValues]);

  return (
    <View style={styles.flexStyle}>
      {isEditing ? (
        <>
          <View style={[styles.paddedContainer]}>
            <Text style={styles.sectionHeader}>Job Details</Text>
            <Input
              onChangeText={handleChange('instituteName')}
              placeholder="Institution Name"
              value={values.instituteName}
              setFieldTouched={setFieldTouched}
              style={styles.textInput}
              error={errors.instituteName}
            />
            <Input
              onChangeText={handleChange('degreeName')}
              placeholder="Degree Name"
              value={values.degreeName}
              setFieldTouched={setFieldTouched}
              style={styles.textInput}
              error={errors.degreeName}
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
                    'isCurrentlyStudying',
                    !values.isCurrentlyStudying,
                  )
                }
                isChecked={values.isCurrentlyStudying}
              />
              <Text style={styles.checkboxText}>I currently study here ?</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <PrimaryButton
              title={editingIndex ? 'Update' : 'Save'}
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
              title={item.degree}
              company={item.instituteName}
              startDate={item.startYear}
              endDate={item.currentlyStudying ? 'Present' : item.endYear}
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

export default EditEducationForm;
