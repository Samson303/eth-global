# ETH Global NFT Hack

### Setup nevermined locally and run the demo

1. Start the nevermined stack locally. You should only need docker and docker-compose for this step

```bash
$ git clone git@github.com:nevermined-io/tools.git
$ cd tools
$ /start_nevermined.sh --no-marketplace --spree-embedded-contracts --latest
```

2. Run the demo that publishes and consumes an asset
```bash
$ cd nevermined-demo

# wait for the nevermined stack to be up and running and get the contract
# addresses
$ ./wait-nevermined.sh

# export a seed password to be used to generate accounts
$ export SEED_WORDS="taxi music thumb unique chat sand crew more leg another off lamp"

# install dependencies
$ npm i

# run the demo
$ node demo.js
```