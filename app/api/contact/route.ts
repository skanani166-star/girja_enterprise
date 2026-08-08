import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const candidatePaths = [
  process.env.ADMIN_CONTACTS_PATH,
  path.resolve(process.cwd(), '..', 'girja_enterprise_admin', 'data', 'contacts.json'),
  path.resolve(process.cwd(), '..', '..', 'girja_enterprise_admin', 'data', 'contacts.json'),
  path.join(process.cwd(), 'data', 'contacts.json'),
].filter(Boolean) as string[];

function getContactsPath(): string {
  for (const p of candidatePaths) {
    if (existsSync(p)) return p;
  }
  return path.join(process.cwd(), 'data', 'contacts.json');
}

function getContacts(): any[] {
  try {
    const targetPath = getContactsPath();
    const data = JSON.parse(readFileSync(targetPath, 'utf-8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveContactsToAll(contacts: any[]) {
  for (const p of candidatePaths) {
    try {
      const dir = path.dirname(p);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      writeFileSync(p, JSON.stringify(contacts, null, 2));
    } catch {}
  }
}

export async function GET() {
  const contacts = getContacts();
  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required to request a quote.' },
        { status: 400 }
      );
    }

    const contacts = getContacts();

    // Check if email already exists (One quote per email constraint)
    const existing = contacts.find(
      (c: any) => (c.email || '').trim().toLowerCase() === email
    );

    if (existing) {
      return NextResponse.json(
        {
          error:
            'A quote request has already been submitted using this email address. Our team will get back to you shortly!',
        },
        { status: 400 }
      );
    }

    const entry = {
      id: `contact_${Date.now()}`,
      name: body.name || 'Anonymous',
      email: email,
      phone: body.phone || '',
      company: body.company || '',
      message: body.message || '',
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    contacts.unshift(entry);
    saveContactsToAll(contacts);

    return NextResponse.json({ success: true, contact: entry });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to submit quote request. Please try again.' },
      { status: 500 }
    );
  }
}
