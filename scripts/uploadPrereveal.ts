import upload from "../src/create/upload";
import { globSync } from "glob";
import fs from "fs";

/**
 * @title Upload Prereveal
 * @author gimpey
 * @description Retrieves all JSON objects from the designated pre-reveal folder
 * and uploads them to the Google CDN.
 */
const main = async () => {
  // retrieving all json objects from the prereveal folder
  const paths = globSync("./prereveal/*.json");

  // iterates through the json objects and uploads them to the cdn
  for (const path of paths) {
    const metadata = JSON.parse(fs.readFileSync(path).toString());
    await upload(metadata.tokenId || metadata.edition, metadata);
  }
};

main();
