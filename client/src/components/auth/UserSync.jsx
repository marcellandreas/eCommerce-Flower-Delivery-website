import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { useApi } from '../../lib/axios';
import { setUser } from '../../store/slices/userSlice';

const UserSync = () => {
    const dispatch = useDispatch();
    const api = useApi();
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();

    useEffect(() => {
        const syncUser = async () => {
            if (isLoaded && isSignedIn && user) {
                try {
                    // This endpoint (GET /users/me) in the backend checks if user exists,
                    // and creates it if not (based on the controller logic we saw).
                    const response = await api.get('/users/me');
                    console.log('User synced with backend');
                    console.log('Backend user data:', response.data.data);

                    // Update Redux store
                    dispatch(setUser(response.data.data));
                } catch (error) {
                    console.error('Failed to sync user:', error);
                }
            }
        };

        syncUser();
    }, [isLoaded, isSignedIn, user, api, dispatch]);

    return null; // This component doesn't render anything
};

export default UserSync;
