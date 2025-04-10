import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";
import { getAllFiles } from "./file";
import path from "path";
// for redis
import { createClient } from "redis";
const publisher = createClient();
publisher.connect();

const app = express();
app.use(cors());
app.use(express.json())



// POSTMAN
app.post("/deploy", async (req, res)=>{
    const repoUrl = req.body.repoUrl
    const id = generate()
    await simpleGit().clone(repoUrl, `output/${id}`)

    const files = getAllFiles(path.join(__dirname, `output/${id}`));
    console.log(repoUrl);

    publisher.lPush("build-queue", id);

    res.json({
        id: id
    })
    
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Port is running ${PORT}`);
});
