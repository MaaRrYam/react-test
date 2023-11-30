import React, {useCallback, useEffect, useState} from 'react';

import FeedItem from '@/components/Feed/FeedItem';
import {FeedItem as FeedInterface, ProfileFeedInterface} from '@/interfaces';
import HomeService from '@/services/home';
import ProfileService from '@/services/profile';
import {PostsSkeleton} from '@/components';

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

  return (
    <>
      {loading ? (
        <PostsSkeleton />
      ) : (
        feedData.map((item, index) => (
          <FeedItem
            item={item}
            fetchPostComments={fetchPostComments}
            key={item.id || index}
          />
        ))
      )}
    </>
  );
};

export default ProfileFeed;
