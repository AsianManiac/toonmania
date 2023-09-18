import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();

      // Specify the directory to save uploaded files
      const uploadDir = path.join(process.cwd(), "public/uploads");

      form.uploadDir = uploadDir;
      form.keepExtensions = true;

      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(500).json({ error: "Error parsing the form" });
          return;
        }

        const filePath = files.file.path;
        const fileName = files.file.name;

        // Move the uploaded file to the final destination
        const newFilePath = path.join(uploadDir, fileName);
        await fs.rename(filePath, newFilePath);

        // Respond with the filename or any other relevant data
        res.status(200).json({ filename: fileName });
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Error uploading image" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
