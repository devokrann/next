'use client';

import { Alert, Center, Text } from '@mantine/core';
import React, { useState } from 'react';
import WrapperTransition from '@/components/wrapper/transition';
import { IconInfoCircle } from '@tabler/icons-react';
import { iconSize, iconStrokeWidth } from '@/data/constants';

import classes from './main.module.scss';

export default function Main() {
  const [mounted, setMounted] = useState(true);

  return (
    <WrapperTransition mounted={mounted} transition={'fade-down'}>
      <Alert
        variant="filled"
        withCloseButton
        onClick={() => setMounted(false)}
        icon={
          <Center>
            <IconInfoCircle size={iconSize} stroke={iconStrokeWidth} />
          </Center>
        }
        classNames={classes}
      >
        <Text component="span" inherit fw={'bold'}>
          GeneriCon 2023
        </Text>{' '}
        | Join us in Denver from June 7 – 9 to see what&apos;s coming next
      </Alert>
    </WrapperTransition>
  );
}
