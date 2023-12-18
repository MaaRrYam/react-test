import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown, TextArea} from '../Inputs';
import {
  BORDER_RADIUS,
  COLORS,
  FONTS,
  MARGINS,
  feedbackCategories,
} from '@/constants';
import {CameraIcon} from '@/assets/icons';
import {PrimaryButton} from '../Buttons';
import {Asset, FeedbackInterface, ImageInterface} from '@/interfaces';
import {launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native';
import ToastService from '@/services/toast';
import FirebaseService from '@/services/Firebase';
import ProfileService from '@/services/profile';
import useUserManagement from '@/hooks/useUserManagement';

const Feedback = () => {
  const [issueType, setIssueType] = useState('Select a type of Issue');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    ImageInterface | Asset | null
  >(null);

  const {user} = useUserManagement();

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      response => {
        if (response.errorCode) {
          console.log('Image picker error: ', response.errorMessage);
        } else {
          if (response.assets && response.assets.length) {
            let imageUri = response.assets[0];
            setSelectedImage(imageUri);
          }
        }
      },
    );
  };

  const handleSubmitFeedback = async () => {
    setLoading(true);
    const UID = user!.id;
    let imageUrl = '';
    if (selectedImage?.uri) {
      imageUrl = (await FirebaseService.uploadToStorage(
        selectedImage,
      )) as string;
    }
    const payload: FeedbackInterface = {
      id: FirebaseService.generateUniqueId(),
      applicantId: UID,
      referenceImage: imageUrl,
      timeStamp: FirebaseService.serverTimestamp(),
      experience: feedback,
      feedbackCategory: issueType,
    };

    const response = await ProfileService.createFeedback(payload);
    setLoading(false);
    setFeedback('');
    setSelectedImage(null);
    if (response) {
      ToastService.showSuccess('Post created successfully');
    } else {
      ToastService.showError('Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Dropdown
          options={feedbackCategories}
          onOptionSelect={option => setIssueType(option)}
          selectedOption={issueType ? issueType : 'Select type of issue'}
        />
        <View style={styles.feedbackTextContainer}>
          <TextArea
            onChangeText={setFeedback}
            placeholder="Write Feedback"
            value={feedback}
          />
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.text}>Attach Screenshot (optional)</Text>
          <>
            {selectedImage ? (
              <>
                <TouchableOpacity
                  onPress={() => setSelectedImage(null)}
                  style={styles.crossButton}>
                  <Text style={styles.crossText}>X</Text>
                </TouchableOpacity>
                <Image
                  style={styles.selectedImage}
                  source={{uri: selectedImage.uri}}
                  resizeMode="cover"
                />
              </>
            ) : (
              <TouchableOpacity
                style={styles.cameraIconContainer}
                onPress={() => openImagePicker()}>
                <CameraIcon />
              </TouchableOpacity>
            )}
          </>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Submit"
          onPress={handleSubmitFeedback}
          isLoading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.67,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  text: {
    color: 'black',
  },
  imageContainer: {
    marginTop: 20,
    height: Dimensions.get('window').height * 0.2,
  },
  cameraIconContainer: {
    backgroundColor: COLORS.lightBlueBackground,
    width: 94,
    height: 94,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: MARGINS.general * 1.5,
  },
  feedbackTextContainer: {
    marginTop: 50,
  },
  buttonContainer: {
    marginTop: 120,
  },
  crossButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossText: {
    color: 'white',
    fontSize: FONTS.bodySmall,
  },
  selectedImage: {
    height: 200,
    width: '100%',
    borderRadius: BORDER_RADIUS.general,
    marginTop: MARGINS.general,
  },
});
