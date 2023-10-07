import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import {EmploymentProps} from '@/interfaces';
import {COLORS, FONTS} from '@/constants';
import {Input, Checkbox, PrimaryButton, CareerCard} from '@/components';
import {careerSchema} from '@/utils/schemas/profile';
import FirebaseService from '@/services/Firebase';
import {getUID} from '@/utils/functions';

interface CareerFormProps {
  careerList: Array<EmploymentProps>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  addNew: boolean;
  setAddNew: (value: boolean) => void;
}

function areCareersEqual(
  career1: EmploymentProps,
  career2: EmploymentProps,
): boolean {
  return (
    career1.companyName === career2.companyName &&
    career1.role === career2.role &&
    career1.startYear === career2.startYear &&
    career1.endYear === career2.endYear &&
    career1.currentlyWorking === career2.currentlyWorking
  );
}

const EditCareerForm: React.FC<CareerFormProps> = ({
  careerList,
  isEditing,
  setIsEditing,
  addNew,
  setAddNew,
}) => {
  const [experience, setExperience] = useState<EmploymentProps[]>(careerList);
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

    const isDuplicate = careerList.some(career =>
      areCareersEqual(career, newEmployment),
    );
    if (!isDuplicate) {
      setExperience(prevExperience => [...prevExperience, newEmployment]);
    }

    await FirebaseService.updateDocument('users', uid as string, {
      employmentList: experience,
    });
    toggleEditForm();
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
    onSubmit: handleSave,
  });

  const toggleEditForm = () => {
    setIsEditing(!isEditing);
    setAddNew(false);
  };

  React.useEffect(() => {
    if (addNew) {
      formik.resetForm();
    } else {
      const itemToEdit = careerList[0];
      if (itemToEdit) {
        const newValues = {
          companyName: itemToEdit.companyName || '',
          role: itemToEdit.role || '',
          startYear: itemToEdit.startYear || '',
          endYear: itemToEdit.currentlyWorking ? '' : itemToEdit.endYear || '',
          isCurrentlyWorking: itemToEdit.currentlyWorking || false,
        };

        formik.setValues(newValues);
      }
    }
  }, [addNew]);
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
              onEdit={() => toggleEditForm()}
            />
          </View>
        ))
      )}
      {isEditing && (
        <View style={styles.footer}>
          <PrimaryButton
            title="Save"
            onPress={formik.handleSubmit}
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

export default EditCareerForm;
