import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import clientPromise from "@/lib/mongodb/connect";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/auth/google/callback"
);

export async function POST(request: Request) {
  try {
    const { credential } = await request.json();
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("No payload");
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db("taskmanager");

    // Find or create user
    const user = await db.collection("users").findOneAndUpdate(
      { email: payload.email },
      {
        $set: {
          displayName: payload.name,
          photoURL: payload.picture,
          lastLogin: new Date(),
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}
