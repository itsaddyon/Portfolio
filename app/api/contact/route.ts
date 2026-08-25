import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60 * 1000;

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || "";
    const referer = req.headers.get("referer") || "";
    const isValidOrigin = 
      origin.includes("itsaddyon.dev") || 
      referer.includes("itsaddyon.dev") ||
      origin.includes("localhost") || 
      referer.includes("localhost");

    if (!isValidOrigin) {
      return NextResponse.json({ error: "Unauthorized origin" }, { status: 403 });
    }

    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    
    if (now - rateData.timestamp < RATE_LIMIT_WINDOW) {
      rateData.count++;
      if (rateData.count > RATE_LIMIT_MAX) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
      }
    } else {
      rateData.count = 1;
      rateData.timestamp = now;
    }
    rateLimitMap.set(ip, rateData);

    const { name, email, subject, message } = await req.json();

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    
    if (message.length > 1000) {
      return NextResponse.json({ error: "Message is too long (max 1000 characters)" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Telegram env vars not configured.");
      return NextResponse.json({ error: "Server not configured." }, { status: 500 });
    }

    const text = [
      `📬 <b>New message from your portfolio</b>`,
      ``,
      `<b>Name:</b> ${escapeHtml(name)}`,
      `<b>Email:</b> ${escapeHtml(email)}`,
      subject ? `<b>Subject:</b> ${escapeHtml(subject)}` : null,
      ``,
      `<b>Message:</b>`,
      escapeHtml(message),
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram API error:", err);
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
