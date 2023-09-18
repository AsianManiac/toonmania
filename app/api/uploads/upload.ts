import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs";
import path from "path";

interface MulterRequest extends NextApiRequest {
  file: any;
}

const upload = multer({ dest: "/tmp" });

const handler = nextConnect()
  .use(upload.single("file"))
  .post((req: MulterRequest, res: NextApiResponse) => {
    fs.renameSync(
      req.file.path,
      path.resolve("./public/images", req.file.originalname)
    );
    res.status(200).json({ status: "ok" });
  });

export default handler;
