import { NextResponse } from 'next/server';

/**
 * Receives messages from the contact form.
 * Currently logs on the server. Connect an email service here to go live.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    console.log('[contact message]', JSON.stringify(body));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
