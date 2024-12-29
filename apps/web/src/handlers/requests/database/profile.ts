import { Request as EnumRequest } from '@repo/enums';
import { API_URL, HEADERS } from '@/data/constants';
import { ProfileCreate, ProfileUpdate } from '@repo/types/models';

const baseRequestUrl = `${API_URL}/profiles`;

export const profileGet = async (slug: { profileId: string }) => {
  try {
    const request = new Request(`${baseRequestUrl}/${slug.profileId}`, {
      method: EnumRequest.GET,
      credentials: 'include',
      headers: HEADERS.WITHOUT_BODY,
    });

    const response = await fetch(request);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('---> handler error - (get profile):', error);
    throw error;
  }
};

export const profileCreate = async (profile: ProfileCreate) => {
  try {
    const request = new Request(`${baseRequestUrl}/create`, {
      method: EnumRequest.POST,
      credentials: 'include',
      headers: HEADERS.WITH_BODY,
      body: JSON.stringify(profile),
    });

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (create profile):', error);
    throw error;
  }
};

export const profileUpdate = async (profile: ProfileUpdate) => {
  try {
    const request = new Request(`${baseRequestUrl}/${profile.id}`, {
      method: EnumRequest.PUT,
      credentials: 'include',
      headers: HEADERS.WITH_BODY,
      body: JSON.stringify(profile),
    });

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (update profile):', error);
    throw error;
  }
};

export const avatarUpload = async (formData: FormData) => {
  try {
    const request = new Request(`${API_URL}/upload/avatar`, {
      method: EnumRequest.PUT,
      credentials: 'include',
      headers: {},
      body: formData,
    });

    const response = await fetch(request);

    return response;
  } catch (error) {
    console.error('---> handler error - (upload avatar):', error);
    throw error;
  }
};
