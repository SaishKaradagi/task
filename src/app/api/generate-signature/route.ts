import { NextRequest, NextResponse } from "next/server";
import { getCloudinarySignature } from "../../../services/cloudinary-service";

export async function POST(request: NextRequest) {
  try {
    const { token, folder } = await request.json();
    const data = await getCloudinarySignature(token, folder);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
