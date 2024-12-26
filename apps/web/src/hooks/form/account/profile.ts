import { hasLength, useForm } from '@mantine/form';
import { useState } from 'react';
import {
  avatarUpload,
  profileUpdate,
} from '@/handlers/requests/database/profile';
import { Variant } from '@repo/enums';
import { AUTH_URLS, BASE_URL, FILE_NAME, TIMEOUT } from '@/data/constants';
import { usePathname, useRouter } from 'next/navigation';
import { showNotification } from '@/utilities/notifications';
import { setRedirectUrl } from '@repo/utils/helpers';
import { useNetwork } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { capitalizeWords, segmentFullName } from '@repo/utils/formatters';
import { updateSession } from '@/libraries/redux/slices/session';

export const useFormUserProfile = () => {
  const router = useRouter();
  const networkStatus = useNetwork();
  const pathname = usePathname();

  const session = useAppSelector((state) => state.session.value);
  const dispatch = useAppDispatch();
  // const { signOut } = useSignOut();

  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    initialValues: {
      name: {
        first: segmentFullName(session?.user_metadata.name || '').first,
        last: segmentFullName(session?.user_metadata.name || '').last,
      },
      phone: {
        code: session?.phone?.split(' ')[0] || '',
        number: session?.phone?.split(' ')[1] || '',
      },
      avatar: session?.user_metadata.avatar_url || '',
    },
    validate: {
      name: {
        first: hasLength({ min: 2, max: 24 }, 'Between 2 and 24 characters'),
        last: hasLength({ min: 2, max: 24 }, 'Between 2 and 24 characters'),
      },
      phone: {
        code: (value, values) =>
          values.phone.number.trim().length > 0 && value?.trim().length < 1,
        number: (value) =>
          value.trim().length > 0 &&
          (value.trim().length < 7 || value.trim().length > 15),
      },
    },
  });

  const parseValues = () => {
    const firstName = form.values.name.first.trim();
    const lastName = form.values.name.last.trim();
    const code = form.values.phone.code.trim();
    const number = form.values.phone.number.trim();
    const avatar = form.values.avatar;

    return {
      name: capitalizeWords(`${firstName} ${lastName}`),
      phone: number && number.length > 0 ? `${code} ${number}` : '',
      avatar,
    };
  };

  const handleSubmit = async () => {
    if (form.isValid()) {
      try {
        if (!networkStatus.online) {
          showNotification({
            variant: Variant.WARNING,
            title: 'Network Error',
            desc: 'Please check your internet connection.',
          });
          return;
        }

        if (!form.isDirty()) {
          showNotification({
            variant: Variant.WARNING,
            title: 'Nothing Updated',
            desc: 'Update at least one form field',
          });
          return;
        }

        setSubmitted(true);

        const response = await profileUpdate({
          ...parseValues(),
          firstName: segmentFullName(parseValues().name).first,
          lastName: segmentFullName(parseValues().name).last,
          id: session?.id,
        });

        if (!response) throw new Error('No response from server');

        const result = await response.json();

        if (response.ok) {
          if (session) {
            dispatch(
              updateSession({
                ...session,
                phone: parseValues().phone,
                user_metadata: {
                  ...session.user_metadata,
                  name: parseValues().name,
                  full_name: parseValues().name,
                  picture: parseValues().avatar,
                  avatar_url: parseValues().avatar,
                },
              })
            );
          }

          window.location.reload();
          return;
        }

        form.reset();

        if (response.status === 401) {
          // redirect to sign in
          setTimeout(
            async () =>
              router.push(
                setRedirectUrl({
                  targetUrl: AUTH_URLS.SIGN_IN,
                  redirectUrl: `${BASE_URL}/${pathname}`,
                })
              ),
            TIMEOUT.REDIRECT
          );

          showNotification({ variant: Variant.WARNING }, response, result);

          return;
        }

        if (response.status === 404) {
          // // sign out
          // setTimeout(async () => await signOut(), TIMEOUT.REDIRECT);
          showNotification({ variant: Variant.FAILED }, response, result);
          return;
        }

        showNotification({ variant: Variant.FAILED }, response, result);
        return;
      } catch (error) {
        showNotification({
          variant: Variant.FAILED,
          desc: (error as Error).message,
        });
        return;
      } finally {
        setSubmitted(false);
      }
    }
  };

  return {
    form,
    submitted,
    handleSubmit,
    session,
  };
};

export const useFormUserAvatar = () => {
  const router = useRouter();
  const networkStatus = useNetwork();
  const pathname = usePathname();

  const session = useAppSelector((state) => state.session.value);

  // const { signOut } = useSignOut();

  const [submitted, setSubmitted] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      if (!networkStatus.online) {
        showNotification({
          variant: Variant.WARNING,
          title: 'Network Error',
          desc: 'Please check your internet connection.',
        });
        return;
      }

      // if (!form.isDirty()) {
      //   showNotification({
      //     variant: Variant.WARNING,
      //     title: 'Nothing Updated',
      //     desc: 'Update at least one form field',
      //   });
      //   return;
      // }

      setSubmitted(true);

      const formData = new FormData();

      if (!file) {
        throw new Error('No file selected');
      }

      formData.append(FILE_NAME.avatar, file);

      const response = await avatarUpload(formData);

      if (!response) throw new Error('No response from server');

      const result = await response.json();

      if (response.ok) {
        // await handleSubmitProfile({ avatar: result.file.path });
        return;
      }

      setFile(null);
      setPreview(null);

      if (response.status === 401) {
        // redirect to sign in
        setTimeout(
          async () =>
            router.push(
              setRedirectUrl({
                targetUrl: AUTH_URLS.SIGN_IN,
                redirectUrl: `${BASE_URL}/${pathname}`,
              })
            ),
          TIMEOUT.REDIRECT
        );

        showNotification({ variant: Variant.WARNING }, response, result);
        return;
      }

      if (response.status === 404) {
        // // sign out
        // setTimeout(async () => await signOut(), TIMEOUT.REDIRECT);

        showNotification({ variant: Variant.FAILED }, response, result);
        return;
      }

      showNotification({ variant: Variant.FAILED }, response, result);
      return;
    } catch (error) {
      showNotification({
        variant: Variant.FAILED,
        desc: (error as Error).message,
      });
      return;
    } finally {
      setSubmitted(false);
    }
  };

  return {
    submitted,
    handleSubmit,
    session,
    file,
    setFile,
    preview,
    setPreview,
  };
};
