import React, {FC, useState, useEffect, useCallback} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  MentionInput,
  MentionSuggestionsProps,
} from 'react-native-controlled-mentions';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getAllUsers} from '@/store/features/chatsSlice';
import FastImage from 'react-native-fast-image';
import useDebounce from '@/hooks/useDebounce';

const RenderSuggestions: FC<MentionSuggestionsProps> = ({
  keyword,
  onSuggestionPress,
}) => {
  const [loading, setLoading] = useState(false);

  const {users, isUsersFetched} = useAppSelector(state => state.chats);
  const dispatch = useAppDispatch();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    await dispatch(getAllUsers());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!isUsersFetched) {
      fetchUsers();
    }
  }, [fetchUsers, isUsersFetched]);

  // useEffect(() => {
  //   (async () => {
  //     console.log({keyword});
  //     if (!keyword) {
  //       return;
  //     }

  //     console.log('HERE');
  //     setLoading(true);
  //     try {
  //       const result = (await FirebaseService.getDocumentsByQuery(
  //         'users',
  //         'name',
  //         '>=',
  //         keyword,
  //       )) as UserInterface[];

  //       setUsers(result);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [keyword]);

  if (keyword == null) {
    return null;
  }

  if (loading) {
    return (
      <View
        style={{
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'lightgray',
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
        }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.suggestionsContainer}>
      <>
        {users
          .filter(one =>
            one.name?.toLowerCase()?.includes(keyword.toLowerCase()),
          )
          .map((user, index) => (
            <Pressable
              key={`${user.id}_${index}`}
              onPress={() => onSuggestionPress(user)}
              style={styles.suggestionItem}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {user.photoUrl ? (
                  <FastImage
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      marginRight: 10,
                    }}
                    source={{
                      uri: user.photoUrl,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : (
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      marginRight: 10,
                    }}
                    source={require('@/assets/images/user.png')}
                  />
                )}
                <View>
                  <Text>{user.name}</Text>
                  {user.tagline && <Text>{user.tagline}</Text>}
                </View>
              </View>
            </Pressable>
          ))}
      </>
    </ScrollView>
  );
};

const MentionInputComponent = () => {
  const [query, , setQuery] = useDebounce('', 0);

  return (
    <View style={styles.container}>
      <MentionInput
        value={query}
        onChange={setQuery}
        placeholder="What do you want to post today?"
        placeholderTextColor={'black'}
        partTypes={[
          {
            trigger: '@',
            renderSuggestions: RenderSuggestions,
            textStyle: {fontWeight: 'bold', color: 'blue'},
          },
        ]}
        returnKeyType="done"
        containerStyle={{
          borderColor: 'lightgray',
          height: 50,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 99999,
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
});

export default MentionInputComponent;
