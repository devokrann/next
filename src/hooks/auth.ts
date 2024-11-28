'use client';

import { useState } from 'react';
import { signOut } from '@/handlers/events/auth';
import { showNotification } from '@/utilities/notifications';
import { NotificationVariant } from '@/types/enums';

export const useSignOut = (redirectUrl?: string) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSignOut = async () => {
    try {
      setSubmitted(true);

      const response = await signOut();
      const result = await response.json();

      if (!result) throw new Error('No response from server');

      if (!result.error) {
        window.location.replace(redirectUrl || '/');
        return;
      }

      if (response.status == 401) {
        showNotification(
          { variant: NotificationVariant.WARNING },
          response,
          result
        );
        return null;
      }

      showNotification(
        { variant: NotificationVariant.FAILED },
        response,
        result
      );
      return;
    } catch (error) {
      showNotification({
        variant: NotificationVariant.FAILED,
        desc: (error as Error).message,
      });
      return null;
    } finally {
      setSubmitted(false);
    }
  };

  return { signOut: handleSignOut, loading: submitted };
};
