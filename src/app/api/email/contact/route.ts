import { contactCreate } from '@/libraries/wrappers/email/contact';
import { NextRequest, NextResponse } from 'next/server';
import { EmailInquiry } from '@/types/email';

export async function POST(request: NextRequest) {
  try {
    const contact: EmailInquiry['from'] = await request.json();

    return NextResponse.json(
      {
        contact: await contactCreate(contact),
        message: 'Contact created successfully',
      },
      { status: 200, statusText: 'Contact Created' }
    );
  } catch (error) {
    console.error('---> route handler error (create contact):', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
