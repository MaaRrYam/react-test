import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, View, RefreshControl} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {BottomSheet, FeedHeader, PostsSkeleton} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {
  getFeed,
  refreshFeed,
  setFeedFetchedToFalse,
  setIsRefreshingToFalse,
} from '@/store/features/homeSlice';
import FeedItem from './FeedItem';
import PostComments from './PostComments';
import HomeService from '@/services/home';
import {FeedCommentsResponse} from '@/interfaces';

const Feed = ({
  setIsNewPostClicked,
}: {
  setIsNewPostClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {feed, isFeedFetched, isRefreshing} = useAppSelector(
    state => state.home,
  );
  const dispatch = useAppDispatch();

  const [comments, setComments] = useState({
    postId: '',
    loading: false,
    comments: [] as FeedCommentsResponse[],
    showComments: false,
  });

  const fetchData = useCallback(() => {
    if (!isFeedFetched) {
      dispatch(getFeed());
    }
  }, [dispatch, isFeedFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (isFeedFetched) {
      dispatch(setIsRefreshingToFalse());
    }
  }, [dispatch, isFeedFetched]);

  const handleRefresh = () => {
    dispatch(refreshFeed());
    dispatch(setFeedFetchedToFalse());
  };

  const handleOpen = () => {
    setIsNewPostClicked(true);
  };

  const fetchPostComments = async (postId: string) => {
    setComments(prev => ({...prev, loading: true, showComments: true, postId}));
    const response = await HomeService.fetchPostComments(postId);
    setComments(prev => ({...prev, loading: false, comments: response}));
  };

  return (
    <>
      {isFeedFetched ? (
        <View style={{minHeight: Dimensions.get('screen').height}}>
          <FlashList
            data={feed}
            renderItem={({item}) => (
              <FeedItem item={item} fetchPostComments={fetchPostComments} />
            )}
            keyExtractor={item => item._id || item.id}
            estimatedItemSize={120}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<FeedHeader handleOpen={handleOpen} />}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        </View>
      ) : (
        <PostsSkeleton />
      )}

      {comments.showComments && (
        <BottomSheet
          isVisible={comments.showComments}
          snapPoints={['20%', '80%']}
          onClose={() => setComments(prev => ({...prev, showComments: false}))}>
          <PostComments
            showComments={comments.showComments}
            comments={comments.comments}
            loading={comments.loading}
            setComments={setComments}
            postId={comments.postId}
          />
        </BottomSheet>
      )}
    </>
  );
};

export default Feed;
