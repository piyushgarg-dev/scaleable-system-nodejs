interface SendEmailPayload {
  from: string;
  to: string;
  subject: string;
  body: string;
}

export async function mockSendEmail(payload: SendEmailPayload) {
  const { from, to, subject, body } = payload;
  return new Promise((resolve, reject) => {
    console.log(`Sending Email to ${to}....`);
    setTimeout(() => resolve(1), 2 * 1000);
  });
}
