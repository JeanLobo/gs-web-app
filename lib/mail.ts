import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const confirmLink = `${domain}/auth/verify?token=${token}`;

  await resend.emails.send({
    from: "no-reply@gestaosimples.com",
    to: email,
    subject: "Confirme seu e-mail",
    html: `
      <h1>Olá ${name},</h1>
      <p>Clique no link abaixo para confirmar seu e-mail:</p>
      <a href="${confirmLink}">${confirmLink}</a>
    `
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "no-reply@gestaosimples.com",
    to: email,
    subject: "Redefinir senha",
    html: `
      <h1>Olá ${name},</h1>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetLink}">${resetLink}</a>
    `
  });
};

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: "no-reply@gestaosimples.com",
    to: email,
    subject: "Código de Verificação",
    html: `
      <h1>Código de Verificação</h1>
      <p>Seu código de verificação é: ${token}</p>
    `
  });
};