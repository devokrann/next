'use server';

import { fetchIp } from '@/services/api/geo';
import { IpData } from '@/types/bodies/response';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { cookieName, key } from '@/data/constants';
import { isProduction, decrypt, encrypt } from '@repo/utils/helpers';
import { getExpiry } from '@/utilities/time';

const getGeoDataCookie = async (): Promise<string | null> => {
  const geoDataCookieValue = cookies().get(cookieName.geo)?.value;
  return geoDataCookieValue || null;
};

export const getGeoData = async (): Promise<IpData | null> => {
  const geoDataCookieValue = await getGeoDataCookie();
  const geoData = !geoDataCookieValue
    ? null
    : await decrypt(geoDataCookieValue, key);

  return geoData;
};

export const setGeoData = async (
  request: NextRequest,
  response?: NextResponse
) => {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.ip;

  const geoData = await fetchIp(
    isProduction() ? ip : process.env.NEXT_PUBLIC_SAMPLE_IP
  );

  (response ? response.cookies : cookies()).set(
    cookieName.geo,
    await encrypt(
      {
        ip: geoData.ip,
        city: geoData.city,
        country_name: geoData.country_name,
        country_code: geoData.country_code,
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        timezone: geoData.timezone,
        utc_offset: geoData.utc_offset,
        country_calling_code: geoData.country_calling_code,
        currency: geoData.currency,
        currency_name: geoData.currency_name,
        languages: geoData.languages,
      },
      key
    ),
    {
      expires: getExpiry(true).millisec,
      sameSite: 'strict',
      secure: isProduction(),
      httpOnly: true,
    }
  );

  return response;
};

export const updateGeoData = async (
  request: NextRequest,
  response: NextResponse,
  geoData?: string
): Promise<NextResponse> => {
  if (!geoData) {
    return (await setGeoData(request, response)) as NextResponse;
  }

  const parsed: IpData = await decrypt(geoData, key);

  const expiry = getExpiry(true).millisec;
  const expires = new Date(Date.now() + expiry);

  parsed.expires = expires;

  response.cookies.set(cookieName.geo, geoData, {
    name: cookieName.geo,
    value: await encrypt(parsed, key, getExpiry(true).sec),
    expires: expires,
    sameSite: 'strict',
    secure: isProduction(),
    httpOnly: true,
  });

  return response;
};
