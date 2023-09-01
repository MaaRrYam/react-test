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
  keyboardType?: 'numeric' | 'default';
  error?: string;
  touched?: boolean;
}
