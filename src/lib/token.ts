import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidV4 } from "uuid";
import db from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

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
