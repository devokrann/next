import IconNotification from '@/components/common/icons/notification';
import { notifications } from '@mantine/notifications';
import { capitalizeWord, linkify } from './formatters/string';
import { Variant } from '@/enums/notification';
import { timeout } from '@/data/constants';

export const showNotification = (
  notification: { variant: Variant; title?: string; desc?: string },
  response?: Response,
  result?: any
) => {
  try {
    const title =
      notification.title ||
      response?.statusText ||
      capitalizeWord(notification.variant);
    const message =
      notification.desc ||
      (notification.variant == Variant.SUCCESS
        ? result.message
        : result.error) ||
      null;

    notifications.show({
      id: linkify(
        `${notification.variant}-${response?.status || '500'}-${message}`
      ),
      icon: IconNotification({ variant: notification.variant }),
      title,
      message,
      variant: notification.variant,
      autoClose: timeout.redirect,
      withBorder: false,
    });
  } catch (error) {
    console.error('---> notification error (show notification)', error);
    throw error;
  }
};
