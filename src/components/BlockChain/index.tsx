import React, { useState } from 'react';

import Block from '../Block';

import styles from './styles.module.css';
import sha256 from 'sha256';
import toast from 'react-hot-toast';


/**
 * Block Chain Component
 * This component adds, delete and contains the hashes for the block chain
 * A single block is already done
 */

interface IBlock {
  blockId: number;
  previousHash: string;
  hash: string;
}

// set an initial block 
const GenisisBlock = {
  blockId: 1,
  previousHash: '0'.repeat(64),
  hash: sha256(JSON.stringify(1 + "" + '0'.repeat(64) + 0)),
}


const BlockChain = () => {
  // Contains all blocks
  const [blocks, setBlocks] = useState<IBlock[]>([GenisisBlock]);


  /**
   * Complete this function
   * onAdd should create a new block
   */
  const onAdd = () => {
    const previousBlock = blocks[blocks.length - 1];
    const currentBlockId = blocks.length + 1;
    // create a new block
    const newBlock: IBlock = {
      blockId: blocks.length + 1,
      previousHash: previousBlock.hash,
      hash: sha256(JSON.stringify(currentBlockId + "" + previousBlock.previousHash + 0))
    }
    toast.success('Successfully added!');
    return setBlocks([...blocks, newBlock]);
  };

  /**
   * Complete this function
   * onDelete should delete the last block
   * Should only need to pass to the last block
   */
  const onDelete = () => {
    if (blocks.length > 1) {
      // delete the last block
      let prevBlock = [...blocks]
      setBlocks(prevBlock.slice(0, blocks.length - 1))
      toast.success('Successfully deleted!');
    } else {
      toast("The GenesisBlock should not be deleted", {
        icon: '🔥',
      });
      return;
    }
  };

  /**
   * Complete this function
   * onHash should update the corresponding index in the state 'hashes'
   * E.g., block 1 should update its corresponding index in the state 'hashes'
   */
  const onHash = (targetBlockId: number, hash: string) => {
    const targetindex = targetBlockId - 1;
    let previousBlock: IBlock;
    const newBlocks = blocks.map((block, index) => {
      if (index < targetindex) {
        return block;
      } else if (index === targetindex) {
        // update current block hash
        const current = {
          ...block,
          hash
        }
        previousBlock = current;
        return current;
      } else {
        // update the next others hash according to the previous blocks updated
        const next = {
          ...block,
          previousHash: previousBlock.hash,
          hash: sha256(JSON.stringify(block.blockId + " " + previousBlock.previousHash + 0))
        }
        previousBlock = next;
        return next;
      }
    })
    setBlocks(newBlocks)
  };


  /**
   * Fix the return statement
   * Currently we only show one block, this is incorrect.
   * We need to be able to show multiple blocks as a block chain should.
   * You'll most likely need to add more functions or states to fix the render. Figure out a way you can go about this.
   * Total Blocks is also incorrect.
   */
  return (
    <div className={styles.blockChain}>
      <h1 className={styles.title}>Block Chain Demo</h1>
      <div className={styles.total}>Total Blocks: {blocks.length}</div>
      <div className={styles.blocks}>
        {blocks.map(block => (<Block
          key={`blockid-${block.blockId}`}
          blockId={block.blockId}
          previousHash={block.previousHash}
          hash={block.hash}
          onHash={onHash}
          onDelete={onDelete} />)
        )}
      </div>
      <button className={styles.button} type="button" onClick={() => onAdd()}>Add Block</button>
    </div>
  );
}

export default BlockChain;