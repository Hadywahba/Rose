import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendContactEmailProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: SendContactEmailProps) {
  return resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: process.env.COMPANY_EMAIL!,
    subject: `New Contact Form - ${subject}`,
    replyTo: email,

    html: `
      <div style="font-family:sans-serif">
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <hr />

        <p>${message}</p>
      </div>
    `,
  });
}
