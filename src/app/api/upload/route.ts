import { writeFile } from "fs/promises"
import { NextResponse } from "next/server"
import path from "path"

export async function POST(req: Request) {
  try {
    const data = await req.formData()

    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return NextResponse.json(
        { error: "Файл не знайдено" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileName = `${Date.now()}-${file.name}`

    const uploadPath = path.join(
      process.cwd(),
      "public/uploads",
      fileName
    )

    await writeFile(uploadPath, buffer)

    return NextResponse.json({
      url: `/uploads/${fileName}`,
    })

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Помилка upload" },
      { status: 500 }
    )
  }
}