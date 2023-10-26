import {useEffect} from 'react';
import {UserInterface, UserManagement} from '@/interfaces';
import {useAppDispatch} from './useAppDispatch';
import {useAppSelector} from './useAppSelector';
import {RootState} from '@/store';
import StorageService from '@/services/Storage';
import {addUser, getUser} from '@/store/features/authSlice';

function useUserManagement(): UserManagement {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state: RootState) => state.auth);

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
    if (Object.keys(user).length === 0) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

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
  }, []);

  return {
    user,
  };
}

export default useUserManagement;
