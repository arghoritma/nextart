"use server";

import { db, files } from "@/services/drizzle";
import { desc } from "drizzle-orm";

export async function getFiles() {
  try {
    const fileList = await db
      .select()
      .from(files)
      .orderBy(desc(files.uploaded_at));

    return { success: true, data: fileList };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch files";
    return { success: false, error: errorMessage };
  }
}
