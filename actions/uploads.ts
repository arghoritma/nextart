"use server"; // Menandakan bahwa ini adalah Server Action

import { writeFile } from "fs/promises";
import path from "path";

interface prevProp {
  error: boolean;
  data: string;
  success: boolean;
}

export async function uploadAvatar(
  prev: prevProp,
  formData: FormData
): Promise<prevProp> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      console.log("No file uploaded");
      return { success: false, error: true, data: "No file uploaded" };
    }

    // Konversi file ke buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File converted to buffer");

    // Tentukan lokasi penyimpanan lokal
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, file.name);
    console.log("Upload path:", filePath);

    // Simpan file ke sistem lokal
    await writeFile(filePath, buffer);
    console.log("File saved to local system");

    return {
      success: true,
      data: `File ${file.name} uploaded successfully`,
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
