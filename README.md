## Mixins are zomes
* A zome can be thought of as a unit of functionality within the DNA of a Holochain App - [LINK?]
* Mixins are simply pre-coded zomes that can be dropped into DNA to provide functionality.
* Some Mixins are high level, userspace features, e.g. `Users`
* And some Mixins are lower level tools for aiding interaction with the Holochain infrastructure, e.g. `Anchors`
* All the Mixins in this repository have been vetted by the Holochain team, and should have tests and examples
* Where time has permitted Mixins are added to the Holochain Scaffolding Wizard - metacurrency/hc-scaffold (https://github.com/metacurrency/hc-scaffold), and can be added to your app DNA and configured from there.
## Pull Requests
* Please feel free to offer pull requests to this repo for new Mixins
* or to integrate a Mixin into hc-scaffold
* Documentation is always welcome
## Zomes
### Anchors
* This zome will create its own anchor to the DHT and it provided its own methords to link your new_anchors(i.e the anchor that you want to for your application).
#### anchor_type_create(anchor_type)
#### anchor_create(new_anchor)
#### anchor_type_list()
#### anchor_update()
* (to be done)
#### anchor_updatelink()
* (to be done)
