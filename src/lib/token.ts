import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidV4 } from "uuid";
import db from "@/lib/db";

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
  return verificationToken
};
