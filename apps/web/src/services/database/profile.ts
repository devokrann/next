'use server';

import prisma from '@/libraries/prisma';
import { ProfileCreate, ProfileGet, ProfileUpdate } from '@repo/types';

export const profileGet = async (id: string): Promise<ProfileGet | null> => {
  try {
    const transactions = await prisma.$transaction(async (prisma) => {
      const profile = await prisma.profile.findUnique({
        where: { id },
      });

      if (!profile) {
        throw new Error("Profile doesn't exist");
      }

      return { profile };
    });

    return transactions.profile;
  } catch (error) {
    console.error('---> service error - (create profile):', error);
    return null;
  }
};

export const profileCreate = async (params: ProfileCreate) => {
  try {
    const transaction = await prisma.$transaction(async (prisma) => {
      const profile = await prisma.profile.findUnique({
        where: { id: params.id },
      });

      if (profile) {
        return { profile };
      }

      return { profile: await prisma.profile.create({ data: params }) };
    });

    return transaction.profile;
  } catch (error) {
    console.error('---> service error - (create profile):', error);
  }
};

export const profileUpdate = async (params: ProfileUpdate) => {
  try {
    await prisma.$transaction(async (prisma) => {
      const profile = await prisma.profile.findUnique({
        where: { id: params.id as string },
      });

      if (!profile) {
        throw new Error("Profile doesn't exist");
      }

      await prisma.profile.update({
        where: { id: params.id as string },
        data: params,
      });
    });
  } catch (error) {
    console.error('---> service error - (create profile):', error);
  }
};
