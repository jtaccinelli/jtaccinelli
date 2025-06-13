import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export const server = {
  sendContactRequest: defineAction({
    accept: "form",
    input: z.object({
      email: z.string(),
      name: z.string(),
      message: z.string(),
    }),
    async handler(input, context) {
      const { EMAIL } = context.locals.runtime.env;

      const body = `
        Name: ${input.name}
        Email: ${input.email}
        Message: ${input.message}
      `;

      const sender = "contact@email.jtaccinelli.com.au";
      const recipient = "info@jtaccinelli.com.au";
      const email = createMimeMessage();

      email.setRecipient(recipient);
      email.setSender({ name: "Porfolio Contact Form", addr: sender });
      email.setSubject("New contact form submission");
      email.addMessage({ contentType: "text/plain", data: body });

      const message = new EmailMessage(sender, recipient, email.asRaw());
      await EMAIL.send(message);

      return new Response("Tester");
    },
  }),
};
