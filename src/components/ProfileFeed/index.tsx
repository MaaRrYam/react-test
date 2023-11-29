import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';

import FeedItem from '@/components/Feed/FeedItem';
import {FeedItem as FeedInterface, ProfileFeedInterface} from '@/interfaces';
import HomeService from '@/services/home';
import ProfileService from '@/services/profile';
import Loading from '../Loading';
import {FlashList} from '@shopify/flash-list';

const ProfileFeed = ({setComments, uid}: ProfileFeedInterface) => {
  const [feedData, setFeedData] = useState<FeedInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await ProfileService.getFeed(uid);
    setFeedData(data);
    setLoading(false);
  }, [uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchPostComments = async (postId: string) => {
    setComments(prev => ({...prev, loading: true, showComments: true, postId}));
    const response = await HomeService.fetchPostComments(postId);
    setComments(prev => ({...prev, loading: false, comments: response}));
  };

  if (loading) {
    return (
      <View style={{height: 200}}>
        <Loading />
      </View>
    );
  }
  return (
    <>
      <FlashList
        data={feedData}
        renderItem={({item}) => (
          <FeedItem item={item} fetchPostComments={fetchPostComments} />
        )}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        estimatedItemSize={100}
      />
    </>
  );
};

export default ProfileFeed;
