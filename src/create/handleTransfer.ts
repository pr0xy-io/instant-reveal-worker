import constants from "../utils/constants";
import sleep from "../utils/sleep";
import upload from "./upload";
import path from "path";
import fs from "fs";

/**
 * @title Handle Transfer
 * @description This function awaits the receipt of the transaction and then iterates through
 * the event log to determine any events which denote a mint, characterized by the `TRANSFER` type
 * and being from the `NULL_ADDRESS`. If the type is not a `TRANSFER` then it is like an approval
 * or another excess event not related to minting. If this first check passes, but the from address
 * is not the `NULL_ADDRESS` then it is likely a transfer from one user to another. Once an event
 * is confirmed to be a mint, the corrolary metadata is uploaded to Google Cloud through `upload`.
 *
 * @param {any} web3 the web3 instance allowing for interactions with the blockchain
 * @param {string} hash the hash of the transaction for which the receipt is awaited
 *
 * @resource https://docs.alchemy.com/alchemy/apis/ethereum/eth-gettransactionreceipt
 */
export default async (web3: any, hash: string) => {
  let receipt: any;

  // the receipt is not necessarily ready when the transaction is confirmed, therefore a while
  // loop is necessary to ensure the receipt is retrieved; generally this takes just a few seconds
  // TODO: add a limit to the number of iterations while waiting for the receipt
  while (true) {
    try {
      // BUG: this used to throw an error but doesn't seem to anymore?
      receipt = await web3.eth.getTransactionReceipt(hash);
      if (!receipt) throw new Error("Receipt not found");
      break;
    } catch (error) {
      console.log(`Awaiting receipt for ${hash}`);
      await sleep(1_000);
    }
  }

  if (!receipt?.logs || receipt?.logs!.length === 0)
    return console.log(`No logs found for ${hash}`);

  // events are held in the logs, and denotes "sub-transactions" relating to core event emitters;
  // these events are parsed, and only valid "mint" events are considered for upload
  for (const transfer of receipt.logs) {
    const type = transfer.topics[0];
    const from = transfer.topics[1];
    const to = `0x${transfer.topics[2].slice(-40)}`;
    const id = parseInt(transfer.topics[3], 16);

    // this is likely an approval
    if (type !== constants.TRANSFER_EVENT) {
      console.log(`${hash} is not a transfer event`);
      continue;
    }

    // this is likely a transfer from one user to another
    if (from !== constants.NULL_ADDRESS) {
      console.log(`${hash} is not a mint`);
      continue;
    }

    // metadata is derived from the local file system, and parsed into a JSON object
    const metadata = JSON.parse(
      fs
        .readFileSync(path.resolve(__dirname, `../../metadata/${id}.json`))
        .toString()
    );

    console.log(`Token ${id} was minted from ${transfer.address} by ${to}`);
    await upload(id, metadata);
  }
};
