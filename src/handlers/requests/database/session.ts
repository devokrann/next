import { Request as EnumRequest } from '@/enums/request';
import { apiUrl, headers } from '@/data/constants';
import { SessionCreate } from '@/types/models/session';
import { authHeaders } from '@/utilities/helpers/auth';
import { SessionUpdate } from '@/types/bodies/request';

const baseRequestUrl = `${apiUrl}/sessions`;

export const sessionsGet = async () => {
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
    console.error('---> handler error - (get sessions):', error);
    throw error;
  }
};

export const sessionGet = async (slug: { sessionToken: string }) => {
  try {
    const request = new Request(`${baseRequestUrl}/${slug.sessionToken}`, {
      method: EnumRequest.GET,
      credentials: 'include',
      headers: await authHeaders(headers.withoutBody),
    });

    const response = await fetch(request);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('---> handler error - (get session):', error);
    throw error;
  }
};

export const sessionCreate = async (session: SessionCreate) => {
  try {
    const request = new Request(`${baseRequestUrl}/create`, {
      method: EnumRequest.POST,
      credentials: 'include',
      headers: await authHeaders(headers.withBody),
      body: JSON.stringify(session),
    });

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (create session):', error);
    throw error;
  }
};

export const sessionUpdate = async (requestBody: SessionUpdate) => {
  try {
    const request = new Request(`${baseRequestUrl}/${requestBody.session.id}`, {
      method: EnumRequest.PUT,
      credentials: 'include',
      headers: await authHeaders(headers.withBody),
      body: JSON.stringify(requestBody),
    });

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (update session):', error);
    throw error;
  }
};

export const sessionDelete = async (slug: { sessionId: string }) => {
  try {
    const request = new Request(`${baseRequestUrl}/${slug.sessionId}`, {
      method: EnumRequest.DELETE,
      credentials: 'include',
      headers: await authHeaders(headers.withoutBody),
    });

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (delete session):', error);
    throw error;
  }
};
