import appData from '@/data/app';
import resend from '@/libraries/resend';

import EmailAuthPasswordForgot from '@/components/email/auth/password-forgot';
import EmailAuthPasswordChanged from '@/components/email/auth/password-changed';
import { isProduction } from '@/utilities/helpers/environment';
import { EmailInquiry } from '@/types/email';
import { render } from '@react-email/render';

export const emailSendAuthPasswordForgot = async (
  otl: string,
  options: EmailInquiry['to']
) => {
  const { data, error } = await resend.general.emails.send({
    from: `${appData.name.app} <${
      isProduction()
        ? process.env.NEXT_EMAIL_NOREPLY!
        : process.env.NEXT_RESEND_EMAIL!
    }>`,
    to: [isProduction() ? options : process.env.NEXT_EMAIL_NOREPLY!],
    subject: 'Reset Your Password',
    html: await render(EmailAuthPasswordForgot({ otl })),
    replyTo: process.env.NEXT_EMAIL_NOREPLY!,
  });
  if (!error) {
    return data;
  } else {
    console.error(
      '---> wrapper error - (email create (send) password forgot):',
      error
    );

    throw error;
  }
};

export const emailSendAuthPasswordChanged = async (
  options: EmailInquiry['to']
) => {
  const { data, error } = await resend.general.emails.send({
    from: `${appData.name.app} <${
      isProduction()
        ? process.env.NEXT_EMAIL_NOREPLY!
        : process.env.NEXT_RESEND_EMAIL!
    }>`,
    to: [isProduction() ? options : process.env.NEXT_EMAIL_NOREPLY!],
    subject: `Password Changed`,
    html: await render(EmailAuthPasswordChanged()),
    replyTo: process.env.NEXT_EMAIL_NOREPLY!,
  });
  if (!error) {
    return data;
  } else {
    console.error(
      '---> wrapper error - (email create (send) password changed):',
      error
    );

    throw error;
  }
};
