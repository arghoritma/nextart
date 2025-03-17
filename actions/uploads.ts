"use server"; // Menandakan bahwa ini adalah Server Action

import { writeFile } from "fs/promises";
import path from "path";
import { db, users } from "@/services/db";
import { eq } from "drizzle-orm";
import { verifySession } from "@/libs/dal";

interface prevProp {
  error: boolean;
  data: string;
  success: boolean;
}

const storageUrl = process.env.STORAGE_URL!;
const storageRoot = process.env.STORAGE_ROOT!;

export async function uploadAvatar(
  prev: prevProp,
  formData: FormData
): Promise<prevProp> {
  try {
    const session = await verifySession();

    const file = formData.get("file") as File;

    if (!file) {
      console.log("No file uploaded");
      return { success: false, error: true, data: "No file uploaded" };
    }

    // Konversi file ke buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File converted to buffer");

    // Format nama file
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const formattedFileName = `avatar_${session.userId}_${timestamp}${fileExtension}`;

    // Tentukan lokasi penyimpanan lokal
    const uploadDir = path.join(process.cwd(), `${storageRoot}/avatars`);
    const filePath = path.join(uploadDir, formattedFileName);
    console.log("Upload path:", filePath);

    // Simpan file ke sistem lokal
    await writeFile(filePath, buffer);
    console.log("File saved to local system");

    // Update avatar path in database
    await db
      .update(users)
      .set({
        avatar: `${storageUrl}/avatars/${formattedFileName}`,
        updated_at: new Date(),
      })
      .where(eq(users.id, session.userId as string));

    return {
      success: true,
      data: `File ${formattedFileName} uploaded successfully`,
      error: false,
    };
  } catch (error: unknown) {
    console.error("Error occurred:", error);
    return {
      success: false,
      data: `Error uploading file: ${
        error instanceof Error ? error.message : String(error)
      }`,
      error: true,
    };
  }
}
