import {Unsubscribe, UserCredential} from 'firebase/auth';
import {DocumentData, Timestamp, WhereFilterOp} from 'firebase/firestore';
import {Dispatch, ReactNode, SetStateAction} from 'react';
import {ImageSourcePropType, TextStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '@/types';
export interface EducationCardProps {
  id: number;
  instituteName: string;
  degree: string;
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
  style?: StyleProp<ViewStyle>;
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
  style?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  keyboardType?: 'numeric' | 'default' | 'email-address';
  error?: string;
  touched?: boolean;
  onBlur?: Function;
  name?: string;
  setFieldTouched?: any;
  setFieldValue?: any;
  disabled?: boolean;
  maxLength?: number;
  onPress?: () => void;
}

export interface StorageServiceProps {
  setItem<T>(key: string, value: T): Promise<void>;
  getItem<T>(key: string): Promise<T | null>;
  removeItem(key: string): Promise<void>;
  nuke(): Promise<void>;
}
export interface FirebaseServiceProps {
  addDocument(collectionName: string, data: DocumentData): Promise<string>;
  setDoc(
    collectionName: string,
    docId: string,
    payload: DocumentData,
  ): Promise<void>;
  deleteDocument(collectionName: string, id: string): Promise<void>;
  updateDocument(
    collectionName: string,
    id: string,
    data: DocumentData,
  ): Promise<void>;
  updateDocument(
    collectionName: string,
    documentName: string,
    data: DocumentData,
  ): void;
  setDoc(
    collectionName: string,
    docId: string,
    payload: DocumentData,
  ): Promise<void>;
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
  uploadToStorage(
    file: Asset | ImageInterface,
    mime?: string,
  ): Promise<string | null>;
  serverTimestamp(): Timestamp;
  generateUniqueId(): string;
  getDocument(collectionName: string, id: string): Promise<DocumentData | null>;
  listenToDocument(
    collectionName: string,
    documentId: string,
    callback: (document: DocumentData | null) => void,
  ): Unsubscribe;
  listenToAllDocuments(
    collectionName: string,
    callback: (documents: DocumentData[]) => void,
  ): Promise<Unsubscribe>;
  generateUniqueFilename(): string;
}

export interface ImageInterface {
  filename: string | null;
  filepath: string | null;
  extension: string | null;
  uri: string;
  height: number;
  width: number;
  fileSize: number | null;
  playableDuration: number;
  orientation: number | null;
}

export interface SigninServiceProps {
  checkIfUserIsWhitelisted(
    loggedInUser: UserCredential,
    navigation: NavigationProp<RootStackParamList>,
    dispatch: any,
  ): Promise<void>;
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
  indicatorVisible?: boolean;
}

export interface EducationState {
  id: number;
  instituteName: string;
  degree: string;
  startYear: string;
  endYear?: string;
  currentlyStudying?: boolean;
}

export interface CheckboxProps {
  onPress: (isChecked: boolean) => void;
  isChecked?: boolean;
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
  companyName: string;
  role: string;
  startYear: number;
  endYear?: number;
  currentlyWorking?: boolean;
}

export interface RoundedButtonProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

export interface NavigationConfigProps {
  name: string;
  component: React.ComponentType<any>;
}

export interface IconProps extends SvgProps {
  isFocused?: boolean;
}

export interface ReactionIconProps extends SvgProps {
  isLiked: boolean;
}

export interface EducationProps {
  id: string;
  instituteName: string;
  degree: string;
  startYear: string;
  endYear?: string;
  currentlyStudying?: boolean;
  educationLevel?: string;
}

export interface EmploymentProps {
  id: string;
  companyName: string;
  role: string;
  startYear: string;
  endYear?: string;
  currentlyWorking?: boolean;
  workEmail?: string;
}
export interface UserInterface {
  id: string;
  name: string;
  email: string;
  country: string;
  countryDetails: string;
  city: string;
  cityDetails: Object;
  state: string;
  stateDetails: Object;
  username: string;
  selectedRole: string;
  previousRole?: string;
  onboarded: boolean;
  onboardingStep: number;
  photoUrl?: string;
  department?: string;
  currentCVC?: number;
  dailyCVC?: number;
  refferalCode?: string;
  lastDailyCVCUpdate?: string;
  totalEarnedCVC?: number;
  purchasedGifts?: Array<string>;
  time: Timestamp;
  educationList?: Array<EducationProps>;
  employmentList?: Array<EmploymentProps>;
  admin?: boolean;
  adminKey?: string;
  dailyCVCStreakPoints?: number;
  dailyCVCStreakCount?: number;
  tagline?: string;
  description?: string;
  jobTags: string[];
  dateOfBirth?: Timestamp;
  phoneNumber?: string;
  currentStatus?: string;
  minimumSalary: string;
  totalCompensation: number;
  readNotifications?: number;
  redeems?: Array<string>;
  contactNumber?: string;
  recoveryEmail?: string;
}

export interface whiteListedUser {
  name: string;
  email: string;
  photoUrl: string;
  onboarded: boolean;
  onboardingStep: number;
  currentCVC: number;
  totalEarnedCVC: number;
  selectedRole: string;
  time: Timestamp;
}

export interface JobInterface {
  baseSalary: string;
  employmentType: string;
  jobCompensation: string;
  jobLocation: string;
  jobSummary: string;
  jobTitle: string;
  keyQualifications: string;
  posterJobID: string;
  responsibilities: string;
  companyName?: string;
  companyLocation?: string;
  companyLogo?: string;
  skills?: Array<string>;
  customQuestions?: Array<string>;
  timeStamp: string;
  contributors?: Array<string>;
  workplaceType: string;
  isFeatured: boolean;
  id: string;
  isSaved: boolean;
}
export interface ApplicantInterface {
  applicantId: string;
  timeStamp: ResponseTimeStamp;
  isAccepted: boolean;
  isPending: boolean;
  feedback: string;
  customQuestions: Array<Object>;
  starred: boolean;
  rating: number;
  notes: string;
}

export interface JobsCardProps {
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  jobLocation: string;
  companyLocation: string;
  onPress: () => void;
}

interface ResponseTimeStamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface NetworkResponse extends UserInterface {
  requestTime: string;
}
export interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  containerStyles?: object;
  indicatorStyles?: object;
}
export interface SocialLoginButtonProps {
  text: string;
  logoSource: ImageSourcePropType;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export interface NotificationInterface {
  id: string;
  title: string;
  description: string;
  link: string | null;
  senderId: string;
  timestamp: any;
  sender: UserInterface;
  isUnRead?: boolean;
}

export interface NetworkItemProps {
  item: NetworkResponse;
  isExploring?: boolean;
  isConnection?: boolean;
  isFollowing?: boolean;
}

export interface ReactionInterface {
  likedBy: string;
  timestamp: Timestamp;
}

export interface ReactionPayload {
  id: string;
  reaction: ReactionInterface;
}

export interface FeedItem {
  id: string;
  creationTime: {
    seconds: number;
    nanoseconds: number;
  };
  hashtag: string;
  type: string;
  text?: string;
  authorId: string;
  author: UserInterface;
  media?: string;
  mediaType?: string;
  editedTime: Timestamp;
  edited: boolean;
  _id: string;
  feedType: string;
  postLikes?: ReactionInterface[];
  postDislikes?: ReactionInterface[];
  tags?: string[];
  title?: string;
  content?: string;
  views?: number;
  coverImage?: string;
  timestamp?: Timestamp;
}
export interface ScreenDimensions {
  width: number;
  height: number;
}

export interface UserManagement {
  user: UserInterface | null;
}

export interface SearchButtonProps {
  style: StyleProp<ViewStyle>;
  onPress: () => void;
}

export interface TabDataInterface {
  bio: string;
  photo: string;
  id?: string;
  loggedInID?: string;
  handleOpen: () => void;
}

export interface EducationTabProps {
  educationList: Array<EducationProps>;
}

export interface CareerTabProps {
  careerList: Array<EmploymentProps>;
}

export interface CacheServiceInterface {
  set<T>(key: string, data: T): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  isCacheValid: (timestamp: number) => boolean;
}

export interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export interface ReplyCommentInterface {
  dislikes: ReactionInterface[];
  likes: ReactionInterface[];
  id: string;
  text: string;
  timestamp: Timestamp;
  user: UserInterface;
  userId: string;
}

export interface FeedCommentsResponse {
  dislikes: ReactionInterface[];
  id: string;
  likes: ReactionInterface[];
  replies: ReplyCommentInterface[];
  user: UserInterface;
  userId: string;
  text: string;
  timestamp: Timestamp;
}

export interface FeedItemProps {
  item: FeedItem;
  fetchPostComments: (postId: string) => Promise<void>;
}

export interface PostCommentsProps {
  postId: string;
  loading: boolean;
  comments: FeedCommentsResponse[];
  showComments: boolean;
  setComments: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      comments: FeedCommentsResponse[];
      showComments: boolean;
      postId: string;
    }>
  >;
  isFromPost?: boolean;
}

export interface PostCommentInterface {
  postId: string;
  item: FeedCommentsResponse;
  setComments: React.Dispatch<
    React.SetStateAction<{
      postId: string;
      loading: boolean;
      comments: FeedCommentsResponse[];
      showComments: boolean;
    }>
  >;
  isFromPost?: boolean;
}

export interface ChatsInterface {
  id: string;
  userId: string;
  message: string;
  name: string;
  photoUrl: string;
  read: boolean;
  time: string | Timestamp;
  user: UserInterface;
}

export interface ChatMessageInterface {
  fileName: string;
  fileUrl: string;
  message: string;
  photoUrl: string;
  receiverId: string;
  senderId: string;
  time: Timestamp;
  type: 'text' | 'file' | 'picture';
}

export interface GroupedMessage {
  id: number;
  date: string;
  messages: {
    message: string;
    sender: string;
    time: string;
    fileUrl: string;
  }[];
}

export interface SendMessageInterface extends ChatMessageInterface {
  receiver: UserInterface;
  sender: UserInterface;
}
export interface Asset {
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  originalPath?: string;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
  bitrate?: number;
  timestamp?: string;
  id?: string;
}

export interface CreatePostInterface {
  id: string;
  authorId: string;
  media: string;
  mediaType: string | null;
  text: string;
  type: string;
  hashtag: string;
  creationTime: Timestamp;
  edited: boolean;
  editedTime: Timestamp;
}

export interface ProfileProps {
  navigation: NavigationProp<RootStackParamList, 'Profile'>;
  route: {
    params: {
      setTabItem: React.Dispatch<React.SetStateAction<string>>;
      setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
      tabItem: string;
      isEditing: boolean;
      UID: string;
    };
  };
}
export interface ProfileFeedInterface {
  setComments: Dispatch<
    SetStateAction<{
      postId: string;
      loading: boolean;
      comments: FeedCommentsResponse[];
      showComments: boolean;
    }>
  >;
  uid: string;
}
export interface CareerFormProps {
  careerList: Array<EmploymentProps>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  addNew: boolean;
  setAddNew: (value: boolean) => void;
  editingIndex: number | null;
  setEditingIndex: (value: number | null) => void;
}

export interface EditEducationProps {
  educationList: Array<EducationProps>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  addNew: boolean;
  setAddNew: (value: boolean) => void;
  editingIndex: number | null;
  setEditingIndex: (value: number | null) => void;
}

export interface UserInfoProps {
  user: UserInterface;
  onClose: () => void;
  setIsEdit?: (value: boolean) => void;
}

export interface CheckboxProps {
  onPress: (value: boolean) => void;
  isChecked?: boolean;
  size?: number;
  color?: string;
  style?: any;
  text?: string;
  fillColor?: string;
  unfillColor?: string;
  iconStyle?: any;
  innerIconStyle?: any;
}
export interface YearDropdownProps {
  selectedYear: string;
  years: string[];
  onYearSelect: (year: string) => void;
  setFieldTouched: (field: string, isTouched?: boolean) => void;
  name: string;
  label: string;
  style?: StyleProp<ViewStyle>;
}
export interface CareerCardProps {
  title?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface DrawerContentProps {
  state: any;
  descriptors: any;
  navigation: any;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  tabItem: string;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  user: UserInterface;
  editingIndex: number;
  setEditingIndex: Dispatch<SetStateAction<number>>;
  uid: string;
}

export interface JobsFilterFormInterface {
  selectedFilters: Array<String>;
  setSelectedFilters: Function;
  applyFilters: () => void;
  searchTerm: string;
  setSearchTerm: Function;
  setIsResetVisible: Function;
}
export interface JobsDetailFormInterface {
  selectedJob: JobInterface;
  setAllJobs: Function;
  setIsBottomSheetVisible: Function;
}

export interface JobQuestionsFormInterface {
  selectedJob: JobInterface;
  setIsQABottomSheetOpen: Function;
  setIsBottomSheetVisible: Function;
}

export interface JobsComponentInterface {
  jobFilterBottomSheet: boolean;
  setJobsFilterBottomSheet: Function;
  allJobs: JobInterface[];
  setAllJobs: Function;
  isLoading: boolean;
}

export interface allPastApplicationsAndJobsInterface {
  application: ApplicantInterface[];
  job: JobInterface;
}

export interface PastApplicationCardInterface {
  jobTitle: string;
  companyLogo: string;
  isAccepted: boolean;
  isPending: boolean;
  starred: boolean;
  feedback: string;
  rating: number;
  onPress: () => void;
}
export interface FeedbackInterface {
  id: string;
  applicantId?: string;
  experience?: string;
  feedbackCategory?: string;
  referenceImage?: string;
  timeStamp: Timestamp;
}
export interface SettingBasicInfoUpdateInterface {
  id: string;
  recoverEmail?: string;
  phoneNumber?: string;
  dateOfBirth?: Timestamp;
}
