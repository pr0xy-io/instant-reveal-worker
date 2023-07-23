import { Storage } from "@google-cloud/storage";
import logger from "../services/logger";
import path from "path";

const subfolder = process.env.NODE_ENV === "production" ? "metadata" : "test";
const directory = `${process.env.GOOGLE_CLOUD_PROJECT_SLUG}/${subfolder}`;
const serviceKey = path.resolve(__dirname, "../../keys.json");

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

logger.info(`Writing metadata to Google Cloud Storage Directory: ${directory}`);

/**
 * @title Upload
 * @description Takes a token ID, `i`, and transfers the corresponding metadata
 * file from the local system to Google Cloud.
 *
 * @param {number} id the token ID corresponding to the minted NFT
 */
const upload = async (id: number, metadata: any) => {
  try {
    // setting up the Google Cloud Storage Bucket and assigning metadata to the
    // uploaded file no-store ensures we can update automatically without
    // needing to clear the cache, while inline (and the `contentType`) ensure
    // you can view the metadata in the browser
    const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET);
    const blob = bucket.file(`${directory}/${id}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentDisposition: "inline",
        contentType: "application/json; charset=utf-8",
        cacheControl: "no-store",
      },
      resumable: false,
    });

    // uploads the metadata to Google Cloud; end seems like a weird word choice
    blobStream.end(Buffer.from(JSON.stringify(metadata)));

    const filePath = `${process.env.GOOGLE_CLOUD_URL}/${directory}/${id}`;
    logger.info(`${metadata?.name} uploaded to Google Cloud (${filePath}).`);
  } catch (error) {
    logger.error(`Unable to upload metadata for ${id}: ${error.message}`);
  }
};

export default upload;
