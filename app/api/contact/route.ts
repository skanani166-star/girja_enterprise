import { NextRequest, NextResponse } from "next/server";
import { fetchContacts, saveContacts, syncQuoteToAdmin, ContactEntry } from "@/lib/data-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const contacts = await fetchContacts();
  return NextResponse.json(contacts, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required to request a quote." },
        { status: 400 }
      );
    }

    const contacts = await fetchContacts();

    // Check if email already exists
    const existing = contacts.find(
      (c: any) => (c.email || "").trim().toLowerCase() === email
    );

    if (existing) {
      return NextResponse.json(
        {
          error:
            "A quote request has already been submitted using this email address. Our team will get back to you shortly!",
        },
        { status: 400 }
      );
    }

    const entry: ContactEntry = {
      id: body.id || `contact_${Date.now()}`,
      name: body.name || "Anonymous",
      email: email,
      phone: body.phone || "",
      company: body.company || "",
      message: body.message || "",
      createdAt: body.createdAt || new Date().toISOString(),
      status: body.status || "new",
    };

    contacts.unshift(entry);
    await saveContacts(contacts);

    // Try cross-app direct API sync to Admin panel if ADMIN_API_URL is configured
    await syncQuoteToAdmin(entry);

    return NextResponse.json({ success: true, contact: entry });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to submit quote request. Please try again." },
      { status: 500 }
    );
  }
}
