import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { format } from "date-fns"

export async function POST(req: Request) {
  const { amount, note } = await req.json()

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db("salesDB")

  const now = new Date()

  await db.collection("sales").insertOne({
    date: format(now, "yyyy-MM-dd"),
    time: format(now, "HH:mm"),
    amount,
    note: note || "",
  })

  return NextResponse.json({ success: true })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get("date")

  const client = await clientPromise
  const db = client.db("salesDB")

  const sales = await db
    .collection("sales")
    .find(date ? { date } : {})
    .sort({ time: 1 })
    .toArray()

  return NextResponse.json(sales)
}