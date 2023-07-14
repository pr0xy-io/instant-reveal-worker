import axios from "axios";
import Alchemy from "../services/Alchemy";
import _ from "lodash";
import upload from "../create/upload";

require("dotenv").config();

/**
 * @title Sanity Check
 * @description The sanity check ensures existing tokens are uploaded once the program
 * is started. If the program goes down or misses a token, restarting it will upload
 * all previously minted tokens.
 */
const sanityCheck = async () => {
  console.log(`Performing sanity check for already minted tokens.`);

  const { contract } = Alchemy;

  let totalSupply = await contract.methods.totalSupply().call();

  console.log(`${totalSupply} tokens have been minted so far.`);

  let tokenId = 0;
  while (totalSupply > 0) {
    try {
      const tokenUri = await contract.methods.tokenURI(tokenId).call();
      const { data: uploaded } = await axios.get(tokenUri);
      const metadata = require(`../../metadata/${tokenId}.json`);

      if (!_.isEqual(metadata, uploaded)) {
        console.log(`Metadata for token ${tokenId} is out of sync, uploading.`);
        await upload(tokenId, metadata);
      }

      totalSupply--;
      tokenId++;
    } catch (error) {
      if (error.message.includes("execution reverted")) {
        console.log(`${tokenId} does not exist, skipping sanity check.`);
        tokenId++;
      }
    }
  }
};

export default sanityCheck;
