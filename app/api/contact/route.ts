import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const candidatePaths = [
  process.env.ADMIN_CONTACTS_PATH,
  path.resolve(process.cwd(), '..', '..', 'girja_enterprise_admin', 'data', 'contacts.json'),
  path.resolve(process.cwd(), '..', 'girja_enterprise_admin', 'data', 'contacts.json'),
  path.join(process.cwd(), 'data', 'contacts.json'),
].filter(Boolean) as string[];

function getContactsPath(): string {
  for (const p of candidatePaths) {
    if (existsSync(p)) return p;
  }
  return path.join(process.cwd(), 'data', 'contacts.json');
}

function getContacts() {
  try {
    const targetPath = getContactsPath();
    return JSON.parse(readFileSync(targetPath, 'utf-8'));
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const contacts = getContacts();
    const entry = {
      id: `contact_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    contacts.unshift(entry);
    const targetPath = getContactsPath();
    writeFileSync(targetPath, JSON.stringify(contacts, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 });
  }
}
