import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form handler — forwards submissions to a Telegram bot.
 *
 * Required env vars (add to .env.local):
 *   TELEGRAM_BOT_TOKEN   — from BotFather
 *   TELEGRAM_CHAT_ID     — your personal chat ID
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Telegram env vars not configured.");
      return NextResponse.json({ error: "Server not configured." }, { status: 500 });
    }

    const text = [
      `📬 *New message from your portfolio*`,
      ``,
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      subject ? `*Subject:* ${subject}` : null,
      ``,
      `*Message:*`,
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
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
