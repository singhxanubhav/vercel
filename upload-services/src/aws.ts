import { S3 } from "aws-sdk";
import { response } from "express";
import fs from "fs";
import log from "simple-git/dist/src/lib/tasks/log";

const s3 = new S3({
    accessKeyId: "7ea9c3f8c7f0f26f0d21c5ce99d1ad6a",
    secretAccessKey: "b4df203781dd711223ce931a2d7ca269cdbf81bb530de4548474584951b798be",
    endpoint: "https://e21220f4758c0870ba9c388712d42ef2.r2.cloudflarestorage.com"
})

// fileName => output/12312/src/App.jsx
// filePath => /Users/anubhavsingh/vercel/dist/output/12312/src/App.jsx


const upload = async(fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath)
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise()
    console.log(response);
    
}