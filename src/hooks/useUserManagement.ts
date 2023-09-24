import React, {useEffect} from 'react';
import {UserInterface, UserManagement} from '@/interfaces';
import {useAppDispatch} from './useAppDispatch';
import {useAppSelector} from './useAppSelector';
import {RootState} from '@/store';
import StorageService from '@/services/Storage';
import {addUser, getUser} from '@/store/features/authSlice';

function useUserManagement(): UserManagement {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);

  const addUserToRedux = (token: string, userData: UserInterface) => {
    dispatch(addUser({token, user: userData}));
  };

  const storeUserInStorage = async (userData: UserInterface) => {
    try {
      if (userData && Object.keys(userData).length) {
        await StorageService.setItem('user', userData);
      }
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    storeUserInStorage(user);
  }, [user]);

  useEffect(() => {
    const addToRedux = async () => {
      const accessToken: string | null = await StorageService.getItem(
        'accessToken',
      );
      addUserToRedux(accessToken as string, user);
    };

    addToRedux();
  }, [user]);

  return {
    user,
  };
}

export default useUserManagement;
