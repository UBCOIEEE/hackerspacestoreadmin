import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {email, name, message, subject} = body;
    const data = await resend.emails.send({
      from: 'Hackerspace Store <hackerspacestore@ubcoieee.org>',
      to: email,
      subject: subject,
      react: EmailTemplate({ firstName: name, message: message }) as React.ReactElement,
    });
    return NextResponse.json({data});
  } catch (error) {
    return NextResponse.json({error});
  }
}