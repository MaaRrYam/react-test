import {useCallback, useEffect} from 'react';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {RootStackParamList} from '@/types';
import {StackNavigationProp} from '@react-navigation/stack';

const useHandleLinking = () => {
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleLinkingUrl = useCallback(
    (url: string) => {
      const route = url.split('/')[3];
      const id = url.split('/')[4];

      switch (route) {
        case 'post':
          navigate('Post', {
            id: id,
          });
          break;

        case 'article':
          navigate('Article', {
            id,
          });
          break;

        default:
          break;
      }
    },
    [navigate],
  );

  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleLinkingUrl(initialUrl);
      }
      Linking.addEventListener('url', ({url}) => {
        handleLinkingUrl(url);
      });
    })();
  }, [handleLinkingUrl]);
};

export default useHandleLinking;
