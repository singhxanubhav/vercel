import fs from "fs";
import path from "path";

export const getAllFiles = (folderPath: string): string[] => {
  let response: string[] = [];

  if (!fs.existsSync(folderPath)) {
    console.warn(`⚠️ Folder not found: ${folderPath}`);
    return response;
  }

  let allFilesAndFolders: string[];
  try {
    allFilesAndFolders = fs.readdirSync(folderPath);
  } catch (err) {
    console.error(`❌ Error reading folder: ${folderPath}`, err);
    return response;
  }

  allFilesAndFolders.forEach((file) => {
    const fullFilePath = path.join(folderPath, file);
    try {
      if (fs.statSync(fullFilePath).isDirectory()) {
        response = response.concat(getAllFiles(fullFilePath));
      } else {
        response.push(fullFilePath);
      }
    } catch (err) {
      console.error(`❌ Error accessing file/folder: ${fullFilePath}`, err);
    }
  });

  return response;
};
