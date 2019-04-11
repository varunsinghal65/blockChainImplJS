let SHA256 = require("crypto-js/sha256");

function Block(index, data, previousHash) {
    this.index = index;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = "";
};

Block.prototype.hasHashChanged = function() {
  return this.hash !== this.calculateHash();
};

Block.prototype.calculateHash = function() {
    let secureHash = SHA256(this.index + JSON.stringify(this.data) + this.previousHash);
    if (secureHash) {
        return secureHash.toString();
    } else {
        console.warn("Crypto SHA 256 could not hash the input params");
    }
};

Block.prototype.calculateAndSetHash = function () {
  this.hash = this.calculateHash();
};

function BlockChainApi (genesisBlock) {
    this.chain = [];
    this.chain.push(genesisBlock);
}

BlockChainApi.prototype.getLatestBlock = function () {
  return this.chain[this.chain.length - 1];
};

BlockChainApi.prototype.isValidBlock = function isValidBlock(block) {
    let chainLength = this.chain.length;
    return block && block.data && block.previousHash
        && block.hash && block.previousHash === this.chain[chainLength-1].hash;
};

BlockChainApi.prototype.add = function (block) {
    if (this.isValidBlock(block)) {
        this.chain.push(block);
    } else {
        console.warn("Invalid block received for addition --> ", [block]);
    }
};

BlockChainApi.prototype.isChainValid = function () {
    let chain = this.chain;
    let chainLength = chain.length;
    for (let i = 0; i < chainLength; i++) {
        let currentBlock = chain[i];
        let previousBlock = chain[i - 1];
        if (currentBlock.hasHashChanged()) {
            console.warn("Chain invalid because hash mismatch detected " +
                "in genesis block");
            return false;
        } else if (previousBlock && previousBlock.hash !== currentBlock.previousHash) {
            console.warn("Chain invalid because hash mismatch between current" +
                " and previous block");
            return false;
        }
    }
    return true;
};

////BLOCKS AND BLOCKCHAIN CREATION//////////////////////

//chain creation with genesis block
let genesisBlock = new Block(0, {"money":"0rupee"}, 0);
genesisBlock.calculateAndSetHash();
let blockChainApi = new BlockChainApi(genesisBlock);
let chain = blockChainApi.chain;
//add first block
let block1 = new Block(chain.length, {"money":"1rupee"}, blockChainApi.getLatestBlock().hash);
block1.calculateAndSetHash();
blockChainApi.add(block1);
//add second block
let block2 = new Block(chain.length, {"money":"2rupee"}, blockChainApi.getLatestBlock().hash);
block2.calculateAndSetHash();
blockChainApi.add(block2);
//add third block
let block3 = new Block(chain.length, {"money":"3rupee"}, blockChainApi.getLatestBlock().hash);
block3.calculateAndSetHash();
blockChainApi.add(block3);
//try adding an invalid block with wrong previous hash
let invalidBlock = new Block(chain.length, {"money":"3rupee"}, "Hash Value");
blockChainApi.add(invalidBlock);

///////HACKER TRIES TO HACK BLOCKCHAIN/////////////////////////

//check chain validity before tampering of data
console.log("Before data tamper : is chain valid ? -->>> " + blockChainApi.isChainValid());

//GENESIS BLOCK TAMPER
//tamper genesis block
console.log("Tampering genesis block..............");
chain[0].data = {"money": "1000000000000"};
console.log("After data tamper : is chain valid ? -->>> " + blockChainApi.isChainValid());
//restore
console.log("Restoring data...");
chain[0].data = {"money":"0rupee"};
console.log("After data restore : is chain valid ? -->>> " + blockChainApi.isChainValid());

//tamper genesis block + recalculate hash of tampered block
console.log("Tampering genesis block + recalculating hash");
chain[0].data = {"money": "1000000000000"};
chain[0].calculateAndSetHash();
console.log("After data tamper : is chain valid ? -->>> " + blockChainApi.isChainValid());
//restore
console.log("Restoring data...");
chain[0].data = {"money":"0rupee"};
chain[0].calculateAndSetHash();
console.log("After data restore : is chain valid ? -->>> " + blockChainApi.isChainValid());

//NON-GENESIS BLOCK TAMPER
console.log("Tampering non-genesis block + recalculating hash");
chain[1].data = {"money":"1000000000000000000000000000000"};
chain[1].calculateAndSetHash();
console.log("After data tamper : is chain valid ? -->>> " + blockChainApi.isChainValid());
