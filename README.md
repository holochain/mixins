# Holochain App Mix-Ins

This repository is a sort of "library" of mix-in modules that you can use in building holochain applications. In some cases, a mix-in is just a commonly used pattern that you can include in your app so you don't have to code it. In other cases, a mix-in is a kind of bridge to a separate holochain application which you may rely on for services.

## Names and Descriptions of included Mix-ins

Anchors
 : Provides functions for easy storage anchor types and anchors. These anchors are used as a quick lookup to linked entries in the DHT. Example: An anchor type of hashtags, might use the text "blockchain" to link to all posts with the tag "blockchain."
 
Notate (pending)
 : Provides abilities to tag, rate, comment, and annotate other DHT entries.

Holodex (pending)
 : Integrates with indexing services of the external [Holodex application](https://github.com/holochain/holodex).

DPKI (pending)
 : Integrates with key management and identity services of the external [Distributed Public Key Infrastructure application](https://github.com/holochain/dpki).
 
HCHC (pending)
 : Connects to the "holochain of holochains" -- the App store or [directory of holochain applications[(https://github.com/holochain/hchc) available to install

## Example Zomes (code patterns as chromosomes in the application DNA)

### Anchors: A common pattern
Since holochain data is shared to a distributed hash table (DHT) which is spread across many computers in a sparse key/value store, sometimes you want to link a bunch of data elements together with a way to find them easily. The holochain DHT lets you place *links* between entries, so you can hang a bunch of links off of a predictable anchor. For example, you could create an Anchor Type for hashtags, and then link to all the posts which are tagged with "blockchain" from an anchor text of "blockchain" (AnchorType="hashtag" and AnchorText="blockchain") See documentation for this zome [in this repo's wiki](https://github.com/holochain/mixin/wiki).

### Holodex: An application bridge
A module that takes the anchor links even further is the holodex mixin which allows a node to communicate with whatever nodes volunteer to be index servers. These index servers install the a Holodex **app** which builds keyword indexes of holochain content and automatically synchronizes data between indexing nodes. This holodex **mix-in** acts as a bridge to the outside application enables everyone send queries to index nodes, and lets index nodes bridge to the Holodex **app** for building indexes and servicing queries.

Hopefully, you can see how the above examples would be frequent needs for people building distributed applications on holochain, which is why we provide this library of common mix-ins. 

## Installation
Soon, we expect our App Wizard to be able to pull these right into your app-building process.  At the moment, you'll need to copy the contents of one of these Mix-ins, into the place where you're doing app development and copy over the DNA files, and pull the gene.json into your main DNA file for your app.

## Contributing
If you have built pluggable zomes which you think others may want to use, please submit a pull request so we can review your zome and integrate it into the repo.

## License
At the moment, mixins are shared under the GPL 3.0 License.
