# 🪄 Instant Reveal Server

![pr0xy Banner](https://cdn.pr0xy.io/branding/pr0xy-github-banner.png)

A worker that listens for token distribution (mints, airdrops, etc.) through a designated contract and assigns metadata dynamically - eliminating the need to leak unrevealed metadata. Dynamically uploaded, centralized metadata is important under two circumstances:

1. You wish to instant reveal; upon every mint the user is allocated their image to advert the typical pre-reveal and reveal mechanisms;
2. The project has not sold out, and you wish to partially reveal the tokens that have been minted, without revealing those that have not been.

## Setup & Environment Variables

The `Instant Reveal Server` requires a number of environment variables, assuming you're utilizing Google Cloud:

```env
ADDRESS_TO_WATCH=           the ethereum address to watch for newly minted tokens
ETHEREUM_NETWORK=           the ethereum network, i.e. eth-mainnet | eth-rinkeby

ALCHEMY_API_KEY=            required for decoding parameters and accessing contract methods
BLOCKNATIVE_API_KEY=        used for tracking transactions and mints from the contract

GOOGLE_CLOUD_PROJECT_SLUG=  subdirectory in the bucket for this particular project
GOOGLE_CLOUD_PROJECT_ID=    project id which is connected to through GCP credentials
GOOGLE_CLOUD_BUCKET=        bucket to which metadata is uploaded
GOOGLE_CLOUD_URL=           URL pointing to the bucket
```

Users will also need a `keys.json` consisting of their Google Cloud credentials for uploading to the CDN bucket. Finally, users must upload a series of `.json` files corresponding to the metadata that needs to be uploaded. These `.json` metadata files should be located in a `metadata` folder located in the root directory. Ultimately, users should create three files/directories: 1) `.env`, 2) `keys.json`, and 3) `metadata/*.json`.

## Building & Running the Worker

Once the relevant `.env` and `keys.json` files are in the root directory, users can build the project and deploy through the following instructions. First, build the project using:

```bash
$ yarn build
```

This `build` command creates an additional folder `dist` which contains the compiled JavaScript for the program. From here, the user can simply use their desired process manager, targetting the `dist/index.js` entry:

```bash
$ pm2 start dist/index.js
```
