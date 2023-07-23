import { LoggingWinston } from "@google-cloud/logging-winston";
import winston from "winston";
import path from "path";
import "dotenv/config";

// logging is always done to the console
const transports: Array<any> = [new winston.transports.Console()];

// enabling logging to google cloud when in production environments
if (process.env.ENVIRONMENT === "production") {
  const loggingWinston = new LoggingWinston({
    projectId: process.env.GOOGLE_PROJECT_ID,
    keyFilename: path.resolve(__dirname, process.env.GOOGLE_CLOUD_KEY_PATH),
    logName: `balance-tracker-${process.env.COLLECTION_SLUG}`,
  });

  transports.push(loggingWinston);
}

// Create a Winston logger that streams to Cloud Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
const logger = winston.createLogger({
  level: "info",
  transports,
});

export default logger;
