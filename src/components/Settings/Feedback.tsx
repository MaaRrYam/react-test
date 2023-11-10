import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {getScreenDimensions, getUID} from '@/utils/functions';
import FirebaseService from '@/services/Firebase';
import ProfileService from '@/services/profile';
import Loading from '../Loading';
const {height} = getScreenDimensions();
const Feedback = () => {
  const [issueType, setIssueType] = useState('Select a type of Issue');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    ImageInterface | Asset | null
  >(null);
  useEffect(() => {
    console.log(issueType);
  }, [issueType]);

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
    const UID = (await getUID()) as string;
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
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      ) : (
        <View>
          <View>
            <Dropdown
              options={feedbackCategories}
              onOptionSelect={option => setIssueType(option)}
              selectedOption={issueType ? issueType : 'Select type of issue'}
            />
          </View>
          <View style={styles.feedbackTextContainer}>
            <TextArea
              onChangeText={setFeedback}
              placeholder="Write Feedback"
              value={feedback}
            />
          </View>
          <View>
            <Text style={styles.text}>Attach Screenshot (optional)</Text>
          </View>
          <View>
            {selectedImage && (
              <Image
                style={styles.selectedImage}
                source={{uri: selectedImage.uri}}
                resizeMode="cover"
              />
            )}
            {selectedImage && (
              <TouchableOpacity
                onPress={() => setSelectedImage(null)}
                style={styles.crossButton}>
                <Text style={styles.crossText}>X</Text>
              </TouchableOpacity>
            )}
          </View>
          {!selectedImage && (
            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={() => openImagePicker()}>
              <CameraIcon />
            </TouchableOpacity>
          )}
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Submit"
              onPress={() => handleSubmitFeedback()}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  cameraIconContainer: {
    backgroundColor: COLORS.lightBlueBackground,
    width: 94,
    height: 94,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  feedbackTextContainer: {
    marginTop: 45,
  },
  buttonContainer: {
    marginTop: 120,
  },
  crossButton: {
    position: 'absolute',
    right: 0,
    top: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 20,
    height: 20,
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
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height - 300,
  },
});
