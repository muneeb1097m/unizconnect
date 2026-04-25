import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Read the exact FormData payload sent by the frontend
    const formData = await req.formData();
    
    // Forward it directly to the GHL Webhook
    const ghlWebhookUrl = 'https://services.leadconnectorhq.com/hooks/B1KkpgABfPleeIPoYy8x/webhook-trigger/bJivOdKvcs65nQRqpR2B';
    
    const response = await fetch(ghlWebhookUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error('GHL Webhook failed with status:', response.status);
      return NextResponse.json(
        { error: 'Webhook failed to process' }, 
        { status: response.status }
      );
    }

    // Success response
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('API Webhook Proxy Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
