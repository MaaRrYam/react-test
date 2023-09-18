import {DocumentData, Timestamp, WhereFilterOp} from 'firebase/firestore';
import {ReactNode} from 'react';
import {SvgProps} from 'react-native-svg';

export interface EducationCardProps {
  id: number;
  instituteName: string;
  degree: string;
  cgpa: string;
  startingYear: string;
  endingYear?: string;
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
  disabled?: boolean;
}

export interface StorageServiceProps {
  setItem<T>(key: string, value: T): Promise<void>;
  getItem<T>(key: string): Promise<T | null>;
  removeItem(key: string): Promise<void>;
  nuke(): Promise<void>;
}
export interface FirebaseServiceProps {
  addDocument(collectionName: string, data: DocumentData): Promise<string>;
  getAllDocuments(collectionName: string): Promise<DocumentData[]>;
  getDocumentsByQuery(
    collectionName: string,
    field: string,
    operator: WhereFilterOp,
    value: any,
  ): Promise<DocumentData[]>;
  checkDuplicateRequest(
    collectionName: string,
    fieldName: string,
    value: any,
  ): Promise<boolean>;
  serverTimestamp(): Timestamp;
  generateUniqueId(): string;
  getDocument(collectionName: string, id: string): Promise<DocumentData | null>;
}

export interface requestAccessFormValues {
  name: string;
  email: string;
  linkedInUrl: string;
  currentCompany: string;
  currentDesignation: string;
  phoneNo: string;
}

export interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  snapPoints?: string[];
  children: ReactNode;
  containerStyle?: object;
  contentContainerStyle?: object;
}

export interface EducationState {
  id: number;
  instituteName: string;
  degree: string;
  cgpa: string;
  startingYear: string;
  endingYear?: string;
  currentlyWorking?: boolean;
}

export interface CheckboxProps {
  onPress: (isChecked: boolean) => void;
  size?: number;
  color?: string;
  style?: any;
  text?: string;
  fillColor?: string;
  unfillColor?: string;
  iconStyle?: any;
  innerIconStyle?: any;
}

export interface ExperienceState {
  id: number;
  currentCompany: string;
  designation: string;
  startingYear: number;
  endingYear?: number;
  currentlyWorking?: boolean;
}

export interface RoundedButtonProps {
  onPress: () => void;
  text: string;
  style?: object;
}

export interface IconProps extends SvgProps {
  isFocused?: boolean;
}
