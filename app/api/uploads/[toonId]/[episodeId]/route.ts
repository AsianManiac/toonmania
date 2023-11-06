import makeURLFriendly from "@/helpers/makeurl";
import db from "@/lib/db";
import AdmZip from "adm-zip";
import { existsSync, promises as fs, mkdirSync, unlink } from "fs";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(
  request: NextRequest,
  { params }: { params: { toonId: string; episodeId: string } }
) {
  const data = await request.formData();
  const file = data.get("file") as File;
  const toonOwner = await db.webtoon.findUnique({
    where: {
      id: params.toonId,
    },
  });
  const toon = makeURLFriendly(toonOwner?.title);
  console.log(toon);
  const FOLDER = path.join(process.cwd(), `/public/webtoon/originals/${toon}`);
  if (!existsSync(FOLDER)) {
    mkdirSync(FOLDER, { recursive: true });
  }

  if (
    !file ||
    (file.type !== "application/x-zip-compressed" &&
      file.type !== "application/x-rar-compressed" &&
      file.type !== "application/x-rar-compressed" &&
      file.type !== "apllication/x-7z-ompressed")
  ) {
    return NextResponse.json({}, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const parts = file.name.split(".");
  const originalName = parts[0] + "_" + Date.now().toString();
  const extension = makeURLFriendly(parts[1]);
  const fileName = originalName + "." + extension;

  const name = fileName;
  const dir = path.join(`${FOLDER}/${name}`);
  try {
    await fs.readdir(FOLDER);
  } catch (error) {
    return NextResponse.json({ message: "Could not find directory" });
  }
  try {
    await writeFile(dir, buffer);
    const zip = new AdmZip(dir);
    zip.extractAllTo(FOLDER, true);
    // createReadStream(dir).pipe(unzipper.Extract({ path: FOLDER }));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  } finally {
    const oldName = `${FOLDER}/${parts[0]}`;
    const newName = `${FOLDER}/${originalName}`;
    setTimeout(() => {
      unlink(dir, (err) => {
        if (err) throw err;
        console.log(`${fileName} was deleted`);
      });
      fs.rename(oldName, newName);
    }, 10000);
  }

  // console.log(`open ${name} to see the uploaded file`);
  const loc = originalName;

  return NextResponse.json({ success: true, source: loc, destination: buffer });
}
