import React from 'react';

import LayoutPage from '@/components/layout/page';
import LayoutSection from '@/components/layout/section';

import { typeParams } from '../layout';
import { postGet } from '@/handlers/requests/database/post';
import {
  Anchor,
  Center,
  Flex,
  Group,
  NumberFormatter,
  Stack,
  Text,
} from '@mantine/core';
import { getRegionalDate } from '@/utilities/formatters/date';
import { IconCircleFilled, IconMessageCircle } from '@tabler/icons-react';
import MenuShare from '@/components/common/menus/share';
import Link from 'next/link';
import IntroPage from '@/components/layout/intro/page';
import { iconSize, iconStrokeWidth } from '@/data/constants';
import CardBlogAuthor from '@/components/common/cards/blog/author';
import PartialComments from '@/components/partial/comments';
import ImageDefault from '@/components/common/images/default';
import { PostRelations } from '@/types/static';

export default async function Post({ params }: { params: typeParams }) {
  const [postId] = params['postId-postTitle'].split('-');

  const { post }: { post: PostRelations } = await postGet({ postId: postId });

  return (
    <LayoutPage>
      <IntroPage props={{ title: post.title }} />

      <LayoutSection id={'page-post'} margined mb={0} containerized={'sm'}>
        <Stack gap={'xl'}>
          <Flex
            direction={{ base: 'column', xs: 'row' }}
            align={'center'}
            justify={{ xs: 'center' }}
            gap={'md'}
            fz={'sm'}
          >
            <Group justify="center">
              <Text inherit>{getRegionalDate(post.createdAt)}</Text>

              <IconCircleFilled size={4} />

              <Anchor
                component={Link}
                href={`/blog/categories/${post.category?.id}`}
                underline="never"
                inherit
              >
                {post.category?.title}
              </Anchor>
            </Group>

            <Center visibleFrom="xs">
              <IconCircleFilled size={4} />
            </Center>

            <Group justify="center">
              <MenuShare props={{ postTitle: post.title }} />

              <IconCircleFilled size={4} />

              <Anchor inherit href="#page-post-comment">
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
              </Anchor>
            </Group>
          </Flex>

          <ImageDefault
            src={post.image}
            alt={post.title}
            height={{ base: 240, xs: 320, md: 360, lg: 400 }}
            radius={'sm'}
            priority
          />

          <Text>{post.excerpt}</Text>

          <Text>{post.content}</Text>

          <Group justify="space-between" mt={'xl'}>
            <CardBlogAuthor
              props={{
                name: !post.user
                  ? 'Anonymous'
                  : post.user.profile?.name || 'No Name',
                date: post.createdAt,
              }}
            />

            <Text fw={'bold'}>
              Tags:{' '}
              <Text component="span" inherit fw={'normal'}>
                {post.tags.map(
                  (t) =>
                    `${t.title}${post.tags.indexOf(t) == post.tags.length - 1 ? '' : ', '}`
                )}
              </Text>
            </Text>
          </Group>
        </Stack>
      </LayoutSection>

      <PartialComments props={{ post }} />
    </LayoutPage>
  );
}
