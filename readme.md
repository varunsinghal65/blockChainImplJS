# A BASIC BLOCKCHAIN implementation in Javascript in 150 lines

This is a node project and gives a clear demonstration of block chain and its advantages
.The blockchain is a very basic but it perfectly demonstrates the true nature of blockchain

# Features

1. This blockchain allows you to add blocks
2. It uses crypto JS for generating hash for each block
3. The blockchain implements a ``isChainValid()`` function that
can be used to check the validity of the chain, in case the data has been tampered

# How to run this ?

1. Clone the project.
2. Import in favorite IDE (I use Webstorm).
3. Run main.js

# What will be the output of the run of main.js ?

Output when you run main.js

````
  Invalid block received for addition -->  Array(1)

  Before data tamper : is chain valid ? -->>> true
  
  Tampering genesis block..............
  
  Chain invalid because hash mismatch detected in genesis block
  
  After data tamper : is chain valid ? -->>> false
  
  Restoring data...
  
  After data restore : is chain valid ? -->>> true
  
  Tampering genesis block + recalculating hash
  
  Chain invalid because hash mismatch between current and previous block
  
  After data tamper : is chain valid ? -->>> false
  
  Restoring data...
  
  After data restore : is chain valid ? -->>> true
  
  Tampering non-genesis block + recalculating hash
  
  Chain invalid because hash mismatch between current and previous block
  
  After data tamper : is chain valid ? -->>> false
  
  ````

 # Inspiration
 
 [
Simply Explained - Savjee
](https://www.youtube.com/watch?v=zVqczFZr124)
 