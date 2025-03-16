import { NextResponse } from "next/server";
import multer from "multer";
import { Request } from "express";

import { db, users } from "@/services/db";
import { eq } from "drizzle-orm";
import { verifySession } from "@/libs/dal";

const avatar_path = "avatars";
const uploadDir = `${process.env.STORAGE_ROOT}/${avatar_path}`;
const storage_server = process.env.STORAGE_URL;

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, uploadDir);
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const userId = (req as any).session?.userId;
    const fileName = `${userId}-${Date.now()}-${file.originalname.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    )}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export async function POST(req: Request) {
  try {
    const session = await verifySession();

    if (!session.isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.userId;

    return new Promise((resolve) => {
      upload.single("file")(req as any, {} as any, async function (err) {
        if (err instanceof multer.MulterError) {
          resolve(
            NextResponse.json(
              { message: "Multer error", error: err.message },
              { status: 500 }
            )
          );
          return;
        } else if (err) {
          resolve(
            NextResponse.json(
              { message: "Error uploading file", error: err.message },
              { status: 500 }
            )
          );
          return;
        }

        const file = (req as any).file;
        if (!file) {
          resolve(
            NextResponse.json({ error: "No avatar uploaded" }, { status: 400 })
          );
          return;
        }

        const fileUrl = `${storage_server}/${avatar_path}/${file.filename}`;

        await db
          .update(users)
          .set({ avatar: fileUrl })
          .where(eq(users.id, userId as string));

        resolve(
          NextResponse.json({
            message: "Avatar uploaded successfully",
            fileName: file.filename,
            path: file.path,
            url: fileUrl,
          })
        );
      });
    });
  } catch (err) {
    console.error("Avatar upload error:", err);
    return NextResponse.json(
      { message: "Avatar upload failed", error: (err as Error).message },
      { status: 500 }
    );
  }
}
