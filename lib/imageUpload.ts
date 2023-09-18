import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";

export default async function uploadImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/uploads"; // Define the directory to save uploads

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error uploading file" });
    }

    const { file } = files;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { path: tempPath, name } = file;
    const newPath = `./public/uploads/${name}`;

    fs.rename(tempPath, newPath, (renameError) => {
      if (renameError) {
        return res.status(500).json({ error: "Error saving file" });
      }

      const imageUrl = `/uploads/${name}`;
      res.status(200).json({ imageUrl });
    });
  });
}
