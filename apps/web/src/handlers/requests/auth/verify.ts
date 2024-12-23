import { API_URL, HEADERS } from '@/data/constants';
import { Verify, VerifyResend } from '@/types/bodies/request';
import { Request as EnumRequest } from '@repo/enums';

export const verifyEmail = async (params: {
  tokenHash: string;
  type: string;
  next: string;
}) => {
  try {
    const request = new Request(
      `${API_URL}/auth/confirm?token_hash=${params.tokenHash}&type=${params.type}&next=${params.next}`,
      {
        method: EnumRequest.GET,
        credentials: 'include',
      }
    );

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (verify email):', error);
    throw error;
  }
};

export const verify = async (requestBody: Verify) => {
  try {
    const request = new Request(`${API_URL}/auth/verify`, {
      method: EnumRequest.POST,
      credentials: 'include',
      headers: HEADERS.WITH_BODY,
      body: JSON.stringify(requestBody),
    });

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (verify):', error);
    throw error;
  }
};

export const verifyResend = async (requestBody: VerifyResend) => {
  try {
    const request = new Request(
      `${API_URL}/auth/verify/resend/${requestBody.userId}`,
      {
        method: EnumRequest.POST,
        credentials: 'include',
        headers: HEADERS.WITH_BODY,
        body: JSON.stringify({
          token: requestBody.token,
          options: requestBody.options,
        }),
      }
    );

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (verify resend):', error);
    throw error;
  }
};
