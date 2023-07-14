import upload from "../src/create/upload";
import fs from "fs";

// getting files from the designated prereveal directory and ensuring only the json
// files are selected, these follow a schema such as 0.json, 1000.json, etc.
const files = fs.readdirSync("./prereveal");
const metadatas = files.filter((file) => file.match(/^\d+\.json$/));
const paths = metadatas.map((metadata) => `./prereveal/${metadata}`);

// asynchronously uploading the files to google cdn
(async () => {
  for (const path of paths) {
    const metadata = JSON.parse(fs.readFileSync(path).toString());
    await upload(metadata.tokenId, metadata);
  }
})();
