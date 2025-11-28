import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import api from '../../lib/axios';

const UserSync = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();

    useEffect(() => {
        const syncUser = async () => {
            if (isLoaded && isSignedIn && user) {
                try {
                    // This endpoint (GET /users/me) in the backend checks if user exists,
                    // and creates it if not (based on the controller logic we saw).
                    await api.get('/users/me');
                    console.log('User synced with backend');
                } catch (error) {
                    console.error('Failed to sync user:', error);
                }
            }
        };

        syncUser();
    }, [isLoaded, isSignedIn, user]);

    return null; // This component doesn't render anything
};

export default UserSync;
