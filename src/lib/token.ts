import { v4 as uuidV4 } from "uuid";
import crypto from "crypto";

import { getVerificationTokenByEmail } from "@/data/verification-token";
import db from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 999_999).toString();
  const expiresAt = new Date(new Date().getTime() + 15 * 60 * 1000); // 15 minutes

  const existingToken = await db.twoFactorToken.findFirst({
    where: { email },
  });
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidV4();
  const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4();
  const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
  return verificationToken;
};
