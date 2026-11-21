import type { APIGatewayProxyHandlerV2, APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({});
const FROM_ADDRESS = process.env.SES_FROM_ADDRESS!;
const TO_ADDRESS = process.env.TO_ADDRESS!;

interface Enquiry {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  website?: string; // honeypot
}

const LIMITS = { name: 120, phone: 30, email: 254, service: 120, message: 5000 };

function json(statusCode: number, body: unknown): APIGatewayProxyStructuredResultV2 {
  return { statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
// Strip CR/LF so values can't inject extra headers into the subject line.
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ");

function validate(input: Record<string, unknown>): { values?: Enquiry; errors?: Record<string, string> } {
  const values: Enquiry = {
    name: oneLine(str(input.name)),
    phone: oneLine(str(input.phone)),
    email: oneLine(str(input.email)),
    service: oneLine(str(input.service)),
    message: str(input.message),
    website: str(input.website),
  };
  const errors: Record<string, string> = {};
  if (values.name.length < 2) errors.name = "Name is required.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) errors.phone = "A valid phone number is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.email = "A valid email is required.";
  if (!values.service) errors.service = "Service is required.";
  for (const [key, max] of Object.entries(LIMITS)) {
    if ((values as unknown as Record<string, string>)[key].length > max) errors[key] = "Too long.";
  }
  return Object.keys(errors).length ? { errors } : { values };
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  let payload: Record<string, unknown>;
  try {
    const raw = event.isBase64Encoded && event.body ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
    payload = raw ? JSON.parse(raw) : {};
    if (typeof payload !== "object" || payload === null || Array.isArray(payload)) throw new Error("not an object");
  } catch {
    return json(400, { message: "Invalid request body." });
  }

  const { values, errors } = validate(payload);
  if (!values) return json(400, { message: "Invalid submission.", errors });

  // Honeypot tripped: pretend success so bots learn nothing.
  if (values.website) return json(200, { ok: true });

  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
  const text = [
    "New enquiry from the VL Bizbridge website",
    "",
    `Name:     ${values.name}`,
    `Phone:    ${values.phone}`,
    `Email:    ${values.email}`,
    `Service:  ${values.service}`,
    `Received: ${submittedAt} IST`,
    "",
    "Message:",
    values.message || "(no message)",
    "",
    "—",
    "Reply to this email to respond directly to the enquirer.",
  ].join("\n");

  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: FROM_ADDRESS,
        Destination: { ToAddresses: [TO_ADDRESS] },
        ReplyToAddresses: [values.email],
        Content: {
          Simple: {
            Subject: { Data: `New enquiry: ${values.service} — ${values.name}`.slice(0, 200), Charset: "UTF-8" },
            Body: { Text: { Data: text, Charset: "UTF-8" } },
          },
        },
      }),
    );
    return json(200, { ok: true });
  } catch (error) {
    console.error("contact-handler: SES send failed", error);
    return json(500, { message: "Something went wrong. Please try again later." });
  }
};
