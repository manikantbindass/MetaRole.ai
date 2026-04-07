import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'MetaRole AI (Next.js)',
    timestamp: new Date().toISOString(),
  });
}
