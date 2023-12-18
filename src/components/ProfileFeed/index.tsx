import React, {useCallback, useEffect} from 'react';

import FeedItem from '@/components/Feed/FeedItem';
import {ProfileFeedInterface} from '@/interfaces';
import HomeService from '@/services/home';
import {PostsSkeleton} from '@/components';
import {useAppSelector} from '@/hooks/useAppSelector';
import {getProfileFeed} from '@/store/features/homeSlice';
import {useAppDispatch} from '@/hooks/useAppDispatch';

const ProfileFeed = ({setComments, uid}: ProfileFeedInterface) => {
  const {profileFeed, isProfileFeedFetched} = useAppSelector(
    state => state.home,
  );
  const dispatch = useAppDispatch();
  const fetchData = useCallback(async () => {
    dispatch(getProfileFeed(uid));
  }, [dispatch, uid]);

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
      {!isProfileFeedFetched ? (
        <PostsSkeleton />
      ) : (
        profileFeed.map((item, index) => (
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
