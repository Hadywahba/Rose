type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactForm(data: ContactPayload) {
  const response = await fetch('/api/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error || 'Failed to send email');
  }

  return result;
}
