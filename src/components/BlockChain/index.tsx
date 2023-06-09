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
    // create a new block
    const newBlock: IBlock = {
      blockId: blocks.length + 1,
      previousHash: blocks.length <= 1 ? '0'.repeat(64) : previousBlock.hash,
      hash: sha256(JSON.stringify(`currentBlockId + "" + ${blocks.length <= 1 ? '0'.repeat(64) : previousBlock.previousHash} + 0`))
    }
    toast.success('Successfully added!');
    return setBlocks([...blocks, newBlock]);
  };

  /**
   * Complete this function
   * onDelete should delete the last block
   * Should only need to pass to the last block
   */

  // This is my first thought when i read the requirements above the comments.
  // I updated the block deletion according to latest requirement :only blocks that can be deleted (i.e. the last block) should have a delete button visible.
  const onDelete = () => {
    if (blocks.length > 0) {
      // delete the last block
      let prevBlock = [...blocks]
      // setBlocks(prevBlock.slice(0, blocks.length - 1))
      prevBlock.splice(blocks.length - 1, 1)
      setBlocks(prevBlock)
      toast.success('Successfully deleted!');
    } else {
      toast("The GenesisBlock is back!", {
        icon: '🔥',
      });
      return;
    }
  };

  // I tried another way to make the last block to be deleted.(I am not sure if i understand the requirements correctly this time.)
  // const onDelete = (targetBlock: number) => {
  //   const targetIndex = targetBlock - 1;
  //   let previousBlock: IBlock;
  //   const newBlocks = blocks.reduce((prev, block, index) => {
  //     if (index < targetIndex) {
  //       prev.push(block);
  //       previousBlock = block;
  //       return prev;
  //     } else if (index === targetIndex) {
  //       return prev;
  //     } else {
  //       // update others hash
  //       const next = {
  //         ...block,
  //         blockId: previousBlock ? previousBlock.blockId + 1 : 1,
  //         previousHash: previousBlock ? previousBlock.hash : '0'.repeat(64),
  //         hash: sha256(JSON.stringify(block.blockId + "" + '0'.repeat(64) + 0))
  //       }
  //       previousBlock = next;
  //       prev.push(next);
  //       toast.success('Successfully deleted!');
  //       return prev;
  //     }
  //   }, [] as IBlock[])

  //   // create a initial block
  //   if (newBlocks.length === 0) {
  //     toast("The GenesisBlock is coming...", {
  //       icon: '🔥',
  //     });
  //     newBlocks.push(GenisisBlock);
  //   }
  //   setBlocks(newBlocks)
  // };


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
        {blocks.map((block, index) => (<Block
          key={`blockid-${block.blockId}`}
          blockId={block.blockId}
          previousHash={block.previousHash}
          hash={block.hash}
          onHash={onHash}
          onDelete={index === blocks.length - 1 ? onDelete : undefined} />)
        )}
      </div>
      <button className={styles.button} type="button" onClick={() => onAdd()}>Add Block</button>
    </div>
  );
}

export default BlockChain;