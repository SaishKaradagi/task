import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb/connect";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("taskmanager");
    const tasks = await db.collection("tasks").find({}).toArray();

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("taskmanager");
    const task = await request.json();

    const result = await db.collection("tasks").insertOne(task);
    return NextResponse.json({
      _id: result.insertedId,
      ...task,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
