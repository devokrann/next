import React from 'react';

import LayoutPage from '@/components/layout/page';
import LayoutSection from '@/components/layout/section';

import { typeParams } from '../layout';
import { postGet } from '@/handlers/requests/database/post';
import {
  Anchor,
  Center,
  Divider,
  Flex,
  Group,
  NumberFormatter,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import {
  IconCircleFilled,
  IconEye,
  IconMessageCircle,
  IconSlash,
} from '@tabler/icons-react';
import MenuShare from '@/components/common/menus/share';
import IntroPage from '@/components/layout/intro/page';
import { iconSize, iconStrokeWidth } from '@/data/constants';
import CardBlogAuthor from '@/components/common/cards/blog/author';
import PartialComments from '@/components/partial/comments';
import ImageDefault from '@/components/common/images/default';
import { PostRelations } from '@/types/static';
import Link from 'next/link';
import { getRegionalDate } from '@/utilities/formatters/date';

export default async function Post({ params }: { params: typeParams }) {
  const [postId] = params['postId-postTitle'].split('-');

  const { post }: { post: PostRelations } = await postGet({ postId: postId });

  return (
    <LayoutPage>
      <IntroPage
        props={{
          path: (
            <Anchor
              component={Link}
              href={`/blog/categories/${post.category?.id}`}
              underline="never"
              inherit
              ta={'center'}
              fw={'bold'}
              c={'pri.6'}
              tt={'uppercase'}
              fz={'sm'}
            >
              {post.category?.title}
            </Anchor>
          ),
          title: post.title,
          desc: post.excerpt,
        }}
      />

      <LayoutSection
        id={'page-post-links'}
        margined
        mb={'xl'}
        containerized={'sm'}
      >
        <Flex
          direction={{ base: 'column', xs: 'row' }}
          align={'center'}
          justify={{ xs: 'center' }}
          gap={'md'}
          fz={'sm'}
        >
          <Group justify="center">
            <Text inherit>{getRegionalDate(post.createdAt).date}</Text>
          </Group>

          <Center visibleFrom="xs">
            <IconSlash size={iconSize} stroke={iconStrokeWidth} />
          </Center>

          <Group justify="center">
            <Tooltip label={'Views'} withArrow>
              <Group gap={6}>
                <IconEye size={iconSize - 2} stroke={iconStrokeWidth} />

                <Text component="span" inherit>
                  <NumberFormatter
                    value={post._count.comments}
                    thousandSeparator
                  />
                </Text>
              </Group>
            </Tooltip>

            <IconCircleFilled size={4} />

            <Anchor inherit href="#page-post-comment">
              <Tooltip label={'Comments'} withArrow>
                <Group gap={6}>
                  <IconMessageCircle
                    size={iconSize - 4}
                    stroke={iconStrokeWidth}
                  />

                  <Text component="span" inherit>
                    <NumberFormatter
                      value={post._count.comments}
                      thousandSeparator
                    />
                  </Text>
                </Group>
              </Tooltip>
            </Anchor>
          </Group>
        </Flex>
      </LayoutSection>

      <LayoutSection
        id={'page-post-content'}
        margined
        mt={'xl'}
        containerized={'sm'}
      >
        <Stack gap={'xl'}>
          <ImageDefault
            src={post.image}
            alt={post.title}
            height={{ base: 240, xs: 320, md: 360, lg: 400 }}
            radius={'sm'}
            priority
          />

          <Text>{post.excerpt}</Text>

          <Text>{post.content}</Text>
        </Stack>
      </LayoutSection>

      <LayoutSection id={'page-post-author'} margined containerized={'sm'}>
        <Divider my={'lg'} />

        <Group justify="space-between">
          <CardBlogAuthor
            props={{
              name: !post.user
                ? 'Anonymous'
                : post.user.profile?.name || 'No Name',
              date: post.createdAt,
            }}
          />

          {/* <Text fw={'bold'}>
            Tags:{' '}
            <Text component="span" inherit fw={'normal'}>
              {post.tags.map(
                (t) =>
                  `${t.title}${post.tags.indexOf(t) == post.tags.length - 1 ? '' : ', '}`
              )}
            </Text>
          </Text> */}

          <MenuShare props={{ postTitle: post.title }} />
        </Group>

        <Divider my={'lg'} />
      </LayoutSection>

      <PartialComments props={{ post }} />
    </LayoutPage>
  );
}
