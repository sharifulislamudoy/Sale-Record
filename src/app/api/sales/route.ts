import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { DailySales } from "@/types/sales";

export async function POST(req: Request) {
  const body = (await req.json()) as DailySales;

  if (!body?.date || !body?.sales) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("daily_sales");
  const collection = db.collection("sales");

  await collection.insertOne({
    ...body,
    createdAt: new Date()
  });

  return NextResponse.json({ success: true });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return NextResponse.json({ error: "Missing date range" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("daily_sales");
  const collection = db.collection("sales");

  const data = await collection
    .find({
      date: { $gte: from, $lte: to }
    })
    .toArray();

  return NextResponse.json(data);
}
