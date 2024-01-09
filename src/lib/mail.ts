import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const baseUrl = process.env.NEXT_URL || null;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${baseUrl}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: "Authy-App <onboarding@resend.dev>",
    to: email,
    subject: "Verify your email address",
    html: `<p>Hi there,</p><p>Please verify your email address by clicking on the link below:</p><p><a href="${confirmLink}">Click here</a></p>`,
  });
};
