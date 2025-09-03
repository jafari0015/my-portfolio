import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/libs/sanity";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { name, email, message } = req.body as {
    name: string;
    email: string;
    message: string;
  };

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    await client.create({
      _type: "contact",
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    await resend.emails.send({
      from: "mahdi@resend.dev",
      to: email,
      subject: "Thank you for contacting us!",
      html: `<p>Hi ${name},</p>
             <p>Thank you for reaching out. We received your message and will get back to you soon!</p>
             <p>Best regards,<br/>Mahdi Jafari</p>`,
    });

    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (err: unknown) {
    console.error("Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
