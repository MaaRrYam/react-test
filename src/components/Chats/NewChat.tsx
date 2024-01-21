import React, {useCallback, useEffect} from 'react';
import {Text} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

import {BottomSheet, Empty} from '@/components';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getAllUsers} from '@/store/features/chatsSlice';
import UserCard from './UserCard';

const NewChat = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {isUsersFetched, users} = useAppSelector(state => state.chats);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    if (!isUsersFetched) {
      dispatch(getAllUsers());
    }
  }, [dispatch, isUsersFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      {!isUsersFetched ? (
        <Text>Loading ...</Text>
      ) : (
        <>
          {users.length ? (
            <BottomSheetFlatList
              data={users}
              renderItem={({item}) => (
                <UserCard item={item} onClose={onClose} />
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <Empty text="Chats" />
          )}
        </>
      )}
    </BottomSheet>
  );
};

export default NewChat;
