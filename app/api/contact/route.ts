import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '../../lib/schema';
import { rateLimiter, isAllowedDomain } from '../../lib/rateLimit';
import { sendMail } from '../../lib/mailService';

export async function POST(req: NextRequest) {
    try {
        // CORS check
        const origin = req.headers.get('origin');
        if (!isAllowedDomain(origin)) {
            return new NextResponse(JSON.stringify({ error: 'Unauthorized domain' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Rate limiting
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        try {
            await rateLimiter.consume(ip);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
                status: 429,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Parse and validate request body
        const body = await req.json();
        const validatedData = contactFormSchema.parse(body);

        // Send email
        await sendMail(validatedData);

        return new NextResponse(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin || '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    } catch (error) {
        console.error('API Error:', error);
        return new NextResponse(
            JSON.stringify({
                error: error instanceof Error ? error.message : 'Internal server error'
            }), {
            status: error instanceof Error ? 400 : 500,
            headers: { 'Content-Type': 'application/json' },
        }
        );
    }
}

export async function OPTIONS(req: NextRequest) {
    const origin = req.headers.get('origin');

    if (!isAllowedDomain(origin)) {
        return new NextResponse(null, { status: 204 });
    }

    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
} 