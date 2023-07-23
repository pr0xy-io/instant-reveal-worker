import { initializeAlchemy, Network } from "@alch/alchemy-sdk";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import logger from "./logger";
import path from "path";
import fs from "fs";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: process.env.ETHEREUM_NETWORK as Network,
  maxRetries: 10,
};

const abi = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../abi.json")).toString()
);

/**
 * @title Alchemy Class
 * @description An instance giving access to several Alchemy functions, Web3,
 * and contract interactions for the provided address.
 */
class Alchemy {
  web3: any;
  alchemy: any;
  contract: any;

  constructor(contractAddress: string) {
    this.web3 = createAlchemyWeb3(
      `https://${process.env.ETHEREUM_NETWORK}.g.alchemy.com/v2/${settings.apiKey}`
    );
    this.alchemy = initializeAlchemy(settings);
    this.contract = new this.web3.eth.Contract(abi, contractAddress);
  }
}

export default new Alchemy(process.env.ADDRESS_TO_WATCH);
