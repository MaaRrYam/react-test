import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import {
  MentionInput,
  MentionSuggestionsProps,
} from 'react-native-controlled-mentions';
import FastImage from 'react-native-fast-image';

import {useAppSelector} from '@/hooks/useAppSelector';
import {TouchableOpacity} from 'react-native-gesture-handler';

const RenderSuggestions: FC<MentionSuggestionsProps> = ({
  keyword,
  onSuggestionPress,
}) => {
  const {users} = useAppSelector(state => state.chats);

  if (!keyword) {
    return null;
  }

  return (
    <ScrollView style={styles.suggestionsContainer}>
      {users
        .filter(one => one.name?.toLowerCase()?.includes(keyword.toLowerCase()))
        .map((user, index) => (
          <TouchableOpacity
            key={`${user.id}_${index}`}
            onPress={() => onSuggestionPress(user)}
            style={styles.suggestionItem}>
            <View style={styles.authorContainer}>
              {user.photoUrl ? (
                <FastImage
                  style={styles.authorImage}
                  source={{
                    uri: user.photoUrl,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ) : (
                <Image
                  style={styles.authorImage}
                  source={require('@/assets/images/user.png')}
                />
              )}
              <View>
                <Text>{user.name}</Text>
                {user.tagline && <Text>{user.tagline}</Text>}
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const MentionInputComponent = ({
  text,
  setText,
  placeholder = 'What do you want to post today?',
}: {
  text: string;
  setText: React.Dispatch<string>;
  placeholder?: string;
}) => {
  return (
    <View style={styles.container}>
      <MentionInput
        value={text}
        onChange={setText}
        placeholder={placeholder}
        placeholderTextColor={'black'}
        partTypes={[
          {
            trigger: '@',
            renderSuggestions: RenderSuggestions,
            textStyle: {fontWeight: 'bold', color: 'blue'},
            isInsertSpaceAfterMention: true,
            isBottomMentionSuggestionsRender: true,
          },
        ]}
        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
        containerStyle={styles.containerStyles}
        blurOnSubmit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 99999,
    minHeight: 25,
  },
  containerStyles: {
    flex: 1,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
});

export default MentionInputComponent;
