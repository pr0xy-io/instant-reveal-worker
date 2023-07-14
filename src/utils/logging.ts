import util from "util";
import path from "path";
import fs, { WriteStream } from "fs";

/**
 * @title Improved Logging
 * @description Allows for logging to both the console and to a designated file (if supplied). This
 * allows us to record logs to a file for later reference and/or debugging.
 */
export default (file: string = null) => {
  let logStdout: any = process.stdout;
  let logFile: WriteStream;

  if (file) {
    logFile = fs.createWriteStream(
      path.join(
        process.env.NETWORK_DRIVE,
        `art-generation`,
        `logs/art-generation-${Date.now()}.log`
      ),
      { flags: "w" }
    );
  }

  // overrides the existing `console.log` function; please note, this removes the ability
  // to specify multiple arguments that are traditionally concatenated together
  console.log = function (d: any) {
    if (file) logFile.write(util.format(d) + "\n");
    logStdout.write(`Instant Reveal - ${Date.now()} | ${util.format(d)}\n`);
  };
};
