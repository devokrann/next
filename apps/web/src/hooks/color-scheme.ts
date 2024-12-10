import { useMantineColorScheme } from '@mantine/core';
import { cookieName } from '@/data/constants';
import { setCookie, getOSTheme } from '@repo/utils/helpers';
import { getExpiry } from '@/utilities/time';
import { useAppDispatch, useAppSelector } from './redux';
import { updateColorScheme } from '@/libraries/redux/slices/color-scheme';

export const useColorSchemeHandler = () => {
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });

  const session = useAppSelector((state) => state.session.value);
  const colorScheme = useAppSelector((state) => state.colorScheme.value);
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    // update in state
    dispatch(updateColorScheme(value));

    // update scheme state cookie
    setCookie(cookieName.colorSchemeState, value, {
      expiryInSeconds: getExpiry(session?.user.remember ?? false).sec,
    });

    const scheme =
      value == 'light' ? 'light' : value == 'dark' ? 'dark' : getOSTheme();

    // update scheme cookie
    setCookie(cookieName.colorScheme, scheme, {
      expiryInSeconds: getExpiry(session?.user.remember ?? false).sec,
    });

    // update mantine color scheme
    setColorScheme(scheme);
  };

  return { colorScheme, handleChange };
};
