import {useState, useCallback, useEffect} from 'react';

import {useAppSelector} from './useAppSelector';
import NetworkService from '@/services/network';
import ToastService from '@/services/toast';
import {formatFirebaseTimestamp} from '@/utils';
import {NetworkResponse, UserInterface} from '@/interfaces';
import FirebaseService from '@/services/Firebase';

const useProfile = (usersProfileID: string, user: UserInterface) => {
  const loggedInUser = useAppSelector(state => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<NetworkResponse[]>([]);
  const [alreadySentConnectionRequest, setAlreadySentConnectionRequest] =
    useState<NetworkResponse[]>([]);
  const [connectionRequestReceived, setConnectionRequestReceived] = useState<
    NetworkResponse[]
  >([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [connectionsResponse, pendingRequestsResponse, sentRequestsRequests] =
      await Promise.all([
        NetworkService.getAllConnections(usersProfileID),
        NetworkService.getPendingConnectionRequests(usersProfileID),
        NetworkService.getPendingConnectionRequests(loggedInUser.id),
      ]);

    setConnections(connectionsResponse);
    setAlreadySentConnectionRequest(pendingRequestsResponse);
    setConnectionRequestReceived(sentRequestsRequests);
    setLoading(false);
  }, [loggedInUser.id, usersProfileID]);

  useEffect(() => {
    fetchData();
  }, [usersProfileID, fetchData]);

  const [buttonLoading, setButtonLoading] = useState(false);

  const isAlreadyPendingRequest = alreadySentConnectionRequest.some(
    conn => conn.id === loggedInUser.id,
  );
  const isConnectionRequestReceived = connectionRequestReceived.some(
    conn => conn.id === loggedInUser.id,
  );
  const isAlreadyConnected = connections.some(
    conn => conn.id === loggedInUser.id,
  );

  const handleConnect = async () => {
    setButtonLoading(true);
    const result = await NetworkService.connectWithSomeone(usersProfileID);
    if (result) {
      setAlreadySentConnectionRequest(prev => [
        ...prev,
        {
          ...user,
          requestTime: formatFirebaseTimestamp(
            FirebaseService.serverTimestamp(),
            'dateTime',
          ),
          id: loggedInUser.id,
        },
      ]);
      ToastService.showSuccess('Connection request sent');
    } else {
      ToastService.showError('Something went wrong');
    }
    setButtonLoading(false);
  };

  const handleRemoveConnectionRequest = async () => {
    setButtonLoading(true);
    await NetworkService.removeConnectionRequest(usersProfileID);
    setAlreadySentConnectionRequest(prev =>
      prev.filter(conn => conn.id !== loggedInUser.id),
    );
    ToastService.showSuccess('Connection request removed');
    setButtonLoading(false);
  };

  const handleAcceptConnection = async () => {
    setButtonLoading(true);
    await NetworkService.acceptConnectionRequest(usersProfileID);
    setConnectionRequestReceived(prev =>
      prev.filter(conn => conn.id !== user.id),
    );
    setConnections(prev => [
      ...prev,
      {
        ...user,
        requestTime: formatFirebaseTimestamp(
          FirebaseService.serverTimestamp(),
          'dateTime',
        ),
      },
    ]);
    ToastService.showSuccess('Connection request accepted');
    setButtonLoading(false);
  };

  return {
    loading,
    buttonLoading,
    isAlreadyPendingRequest,
    isConnectionRequestReceived,
    isAlreadyConnected,
    handleConnect,
    handleRemoveConnectionRequest,
    handleAcceptConnection,
    loggedInUser,
    connections,
  };
};

export default useProfile;
