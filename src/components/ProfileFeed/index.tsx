import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import FeedItem from '@/components/Feed/FeedItem';
import {FeedItem as FeedInterface, ProfileFeedInterface} from '@/interfaces';
import HomeService from '@/services/home';
import ProfileService from '@/services/profile';
import Loading from '../Loading';

const ProfileFeed = ({setComments, uid}: ProfileFeedInterface) => {
  const [feedData, setFeedData] = useState<FeedInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async () => {
    await setLoading(true);
    const data = await ProfileService.getFeed(uid);
    await setFeedData(data);
    await setLoading(false);
  }, [uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchPostComments = async (postId: string) => {
    setComments(prev => ({...prev, loading: true, showComments: true}));
    const response = await HomeService.fetchPostComments(postId);
    setComments(prev => ({...prev, loading: false, comments: response}));
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <FlatList
        data={feedData}
        renderItem={({item}) => (
          <FeedItem item={item} fetchPostComments={fetchPostComments} />
        )}
        keyExtractor={item => item._id}
      />
      {/* {!isFeedFetched && feed.length && (
        <ActivityIndicator color={COLORS.primary} size="large" />
      )} */}
    </>
  );
};

export default ProfileFeed;
