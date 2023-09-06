import {StyleProp, ViewStyle} from 'react-native';

export interface EducationCardProps {
  id: number;
  instituteName: string;
  degree: string;
  cgpa: string;
  startingYear: number;
  endingYear?: number;
  currentlyWorking?: boolean;
  onPress: (id: number) => void;
}

export interface EducationData {
  id: number;
  instituteName: string;
  degree: string;
  cgpa: string;
  startingYear: number;
  endingYear?: number;
  currentlyWorking?: boolean;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  backgroundColor?: string;
  textColor?: string;
  borderWidth?: number;
  borderColor?: string;
  icon?: any;
  iconPosition?: string;
  disabled?: boolean;
  isLoading?: boolean;
  activityIndicatorSize?: 'small' | 'large';
  activityIndicatorColor?: string;
}

export interface ExperienceCardProps {
  id: number;
  currentCompany: string;
  designation: string;
  startingYear: number;
  endingYear?: number;
  currentlyWorking?: boolean;
  onPress?: (id: number) => void;
}

export interface CardWrapperProps {
  children: React.ReactNode;
  onPress?: Function;
}

export interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: any;
  secureTextEntry?: boolean;
  keyboardType?: 'numeric' | 'default' | 'email-address';
  error?: string;
  touched?: boolean;
  onBlur?: Function;
  name?: string;
  setFieldTouched?: any;
  setFieldValue?: any;
}

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalStyle?: StyleProp<ViewStyle>;
}

export interface StorageServiceProps {
  setItem<T>(key: string, value: T): Promise<void>;
  getItem<T>(key: string): Promise<T | null>;
  removeItem(key: string): Promise<void>;
  nuke(): Promise<void>;
}
