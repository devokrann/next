import { Request as EnumRequest } from '@/enums/request';
import { apiUrl, headers } from '@/data/constants';
import { authHeaders } from '@/utilities/helpers/auth';
import { ReplyCommentCreate } from '@/types/bodies/request';
import { ReplyUpdate } from '@/types/models/reply';

const baseRequestUrl = `${apiUrl}/replies/comment`;

export const repliesCommentGet = async () => {
  try {
    const request = new Request(baseRequestUrl, {
      method: EnumRequest.GET,
      credentials: 'include',
      headers: await authHeaders(headers.withoutBody),
    });

    const response = await fetch(request);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('---> handler error - (get comment replies):', error);
    throw error;
  }
};

export const replyCommentCreate = async (requestBody: ReplyCommentCreate) => {
  try {
    const request = new Request(`${baseRequestUrl}/${requestBody.commentId}`, {
      method: EnumRequest.POST,
      credentials: 'include',
      headers: await authHeaders(headers.withBody),
      body: JSON.stringify(requestBody),
    });

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (create comment reply):', error);
    throw error;
  }
};

export const replyCommentUpdate = async (
  requestBody: Omit<ReplyUpdate, 'id'> & { id: string }
) => {
  try {
    const request = new Request(`${baseRequestUrl}/${requestBody.id}`, {
      method: EnumRequest.PUT,
      credentials: 'include',
      headers: await authHeaders(headers.withBody),
      body: JSON.stringify(requestBody),
    });

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (update comment reply):', error);
    throw error;
  }
};

export const replyCommentDelete = async (slug: { replyId: string }) => {
  try {
    const request = new Request(`${baseRequestUrl}/${slug.replyId}`, {
      method: EnumRequest.DELETE,
      credentials: 'include',
      headers: await authHeaders(headers.withoutBody),
    });

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (delete comment reply):', error);
    throw error;
  }
};
