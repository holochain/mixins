# Anchors

This mixin provides easy access to a very common pattern for Holochain apps, which
consists of creating an entry with a known hash, and then using that entry as a base
off of which to create links.

We need this pattern in the Holochain world, because you cannot reasonably search the
infinite space of hashes for data in the DHT.  Instead you have to put data in known
places and follow links from there.

## Installation & Setup

**NOTE: this, admittedly not so pretty, copy/paste installation process is a temporary while we build out our mixin packaging system**

To install this mixin into your application:

1. copy the `dna/anchors` folder into your application `dna` folder.  This folder contains the zome code.

2. Add the following snippet into your `dna.json` file in the `Zomes` array:

``` javascript
    {
      "Name": "anchors",
      "Description": "anchors mixin",
      "RibosomeType": "js",
      "CodeFile": "anchors.js",
      "Config": {
        "ErrorHandling": "throwErrors"
      },
      "Entries": [
        {
          "Name": "anchor",
          "DataFormat": "json",
          "SchemaFile": "anchor.json",
          "Sharing": "public"
        },
        {
          "Name": "anchor_link",
          "DataFormat": "links"
        }
      ],
      "Functions": [
        {
          "Name": "anchor",
          "CallingType": "json",
          "Exposure": "public"
        },
        {
          "Name": "exists",
          "CallingType": "json",
          "Exposure": "public"
        },
        {
          "Name": "anchors",
          "CallingType": "string",
          "Exposure": "public"
        }
      ]
    }
```

3. In any of your zome's code files that will call the anchors mixin, you can add the following helper functions just to make the calling a little easier.

``` javascript
function anchor(anchorType, anchorText) {
  return call('anchors', 'anchor', {
    anchorType: anchorType,
    anchorText: anchorText
  }).replace(/"/g, '');
}

function anchorExists(anchorType, anchorText) {
  return call('anchors', 'exists', {
    anchorType: anchorType,
    anchorText: anchorText
  });
}
```

## Zome Functions

The anchors mixin zome exposes three functions:

- `anchor(anchor)`: to find or reference an anchor (note: it creates it if it doesn't exist, and back-populates "parent" anchors so that the whole directory of anchors becomes browsable from a root anchor)
- `anchors(type)`: returns all anchors of a specified type
- `exists(anchor)`: checks to see if specified anchor exists (without creating it)
