import parseTokenMints from "./create/handleTransfer";
import Alchemy from "./services/Alchemy";
import Blocknative from "./services/Blocknative";
import sanityCheck from "./sanity/index";

require("./utils/logging").default();
require("dotenv").config();

const emitter = Blocknative.listen(process.env.ADDRESS_TO_WATCH);

sanityCheck();

/**
 * @title On Transaction Confirm
 * @description Triggers when a transaction is confirmed. The process parses which tokens (if any)
 * were minted, and then uploads the corresponding metadata to a Google Cloud Storage Bucket.
 */
emitter.on("txConfirmed", (transaction: any) => {
  console.log(`Transaction is confirmed: ${transaction.hash}`);

  try {
    parseTokenMints(Alchemy.web3, transaction.hash);
  } catch (error) {
    console.log(`An unknown error occurred: ${error.message}`);
  }
});
