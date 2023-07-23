import BlocknativeSdk from "bnc-sdk";
import logger from "./logger";
import WebSocket from "ws";

let networkId: number;
if (process.env.ETHEREUM_NETWORK === "eth-mainnet") {
  networkId = 1;
} else if (process.env.ETHEREUM_NETWORK === "eth-rinkeby") {
  networkId = 4;
} else {
  throw new Error("Invalid network supplied in `.env` file.");
}

console.log(`Connected to ${process.env.ETHEREUM_NETWORK}`);

/**
 * @title Blocknative SDK
 * @description An instance giving access to the Blocknative SDK.
 *
 * @resource https://github.com/blocknative/sdk
 */
class Blocknative {
  blocknative: BlocknativeSdk;

  constructor() {
    this.blocknative = new BlocknativeSdk({
      dappId: process.env.BLOCKNATIVE_API_KEY,
      networkId,
      ws: WebSocket,
      onerror: (error: any) => {
        logger.error(error);
      },
    });
  }

  listen(address: string) {
    const { emitter } = this.blocknative.account(address);
    logger.info(`Listening to address ${address}`);

    return emitter;
  }
}

export default new Blocknative();
