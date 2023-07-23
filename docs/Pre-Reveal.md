# 📃 Pre-Reveal Metadata Information

![pr0xy Banner](https://cdn.pr0xy.io/branding/pr0xy-github-banner.png)

Users can upload a set of pre-reveal images to ensure any unrevealed images still display an image, even if just temperory. It's advised to upload this data prior, with the number of JSON tokens being equivalent to the maximum collection size. As tokens are minted, the reveal process will automatically replace any pre-reveal images with revealed images.

## Format & Example

Example metadata can be found below, common across the majority of NFT projects. Please note that a `?` denotes the field is likely optional - please consider your specific use case however:

```ts
{
    title: string,          // pr0xy Collection
    symbol: string,         // token symbol as denoted by the contract
    name: string,           // pr0xy #0001
    description: string,    // My NFT description.
    image: string,          // ipfs://Qm.../
    external_url?: string,  // https://pr0xy.io
    edition: number,        // index of the token
    attributes: [
        {
            trait_type: string,  // the name of the attribute category
            value: string,       // the name of the trait
        },
        // ...
    ]
}
```

There should be a singular file for each token, denoted as `prereveal/${tokenId}.json`.

## Uploading the Pre-Reveal Metadata

Users can upload the pre-reveal metadata using `yarn upload:prereveal`, which runs the script located at `scripts/uploadPrereveal.ts`. This script will index all available metadata files (JSON) in the `prereveal` directory and upload them to the specified Google CDN.
