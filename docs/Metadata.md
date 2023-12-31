# 📃 Metadata Information

![pr0xy Banner](https://cdn.pr0xy.io/branding/pr0xy-github-banner.png)

The `Instant Reveal Server` requires formatted metadata to be provided, which is eventually uploaded to a Google Cloud Storage Bucket.

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
    edition?: number,       // index of the token (alternative to tokenId)
    tokenId?: number,       // index of the token (alternative to edition)
    attributes: [
        {
            trait_type: string,  // the name of the attribute category
            value: string,       // the name of the trait
        },
    ]
}
```

There should be a singular file for each token, denoted as `metadata/${tokenId}.json`.
