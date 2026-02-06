import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"
import * as XLSX from "xlsx"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const from = searchParams.get("from")
  const to = searchParams.get("to")

  if (!from || !to) {
    return NextResponse.json({ error: "Invalid range" }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db("salesDB")

  const sales = await db
    .collection("sales")
    .find({ date: { $gte: from, $lte: to } })
    .toArray()

  const ws = XLSX.utils.json_to_sheet(sales)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Sales")

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" })

  return new NextResponse(buffer, {
    headers: {
      "Content-Disposition": "attachment; filename=sales.xlsx",
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  })
}