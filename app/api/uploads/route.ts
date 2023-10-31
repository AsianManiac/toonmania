import makeURLFriendly from "@/helpers/makeurl";
import {
  createReadStream,
  existsSync,
  promises as fs,
  mkdirSync,
  unlink,
} from "fs";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;
  const FOLDER = path.join(process.cwd(), `/public/webtoon/images`);
  if (!existsSync(FOLDER)) {
    mkdirSync(FOLDER, { recursive: true });
  }
  if (
    !file ||
    (file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif")
  ) {
    return NextResponse.json(
      { message: "Invalid audio format for the soundtrack" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const parts = file.name.split(".");

  const originalName = parts[0];
  const extension = makeURLFriendly(parts[1]);

  const fileName = originalName + Date.now().toString() + "." + extension;

  const name = fileName;
  const dir = path.join(`${FOLDER}/${name}`);
  try {
    await fs.readdir(FOLDER);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
  await writeFile(dir, buffer);
  console.log(`open ${dir} to see the uploaded file`);
  const loc = fileName;

  return NextResponse.json({ success: true, source: loc, destination: buffer });
}
