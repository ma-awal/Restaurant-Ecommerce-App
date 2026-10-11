import { NextResponse } from 'next/server';

/**
 * Receives orders from the checkout page.
 * Right now it validates the payload and logs it on the server.
 * To go live, send an email / save to a database / push to WooCommerce here.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const hasCustomer = body?.customer?.name && body?.customer?.phone;
    const hasItems = Array.isArray(body?.items) && body.items.length > 0;

    if (!hasCustomer || !hasItems) {
      return NextResponse.json({ error: 'Invalid order' }, { status: 400 });
    }

    const orderId = `FG-${Date.now().toString(36).toUpperCase()}`;
    console.log('[new order]', orderId, JSON.stringify(body));

    return NextResponse.json({ orderId });
  } catch (error) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
