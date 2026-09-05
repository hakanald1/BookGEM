import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { setAuthTokenGetter } from '../../lib/api/axios';

export function ClerkAxiosBridge() {
  const { getToken, userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    setAuthTokenGetter(async () => {
      try {
        const token = await getToken();
        return {
          token: token || null,
          userId: userId || user?.id || null,
        };
      } catch (err) {
        console.warn('Error fetching Clerk token', err);
        return {
          token: null,
          userId: userId || user?.id || null,
        };
      }
    });
  }, [getToken, userId, user]);

  return null;
}
