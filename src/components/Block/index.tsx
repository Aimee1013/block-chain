import React, { useEffect, useState } from 'react';

import sha256 from 'sha256';
import styles from './styles.module.css';
import toast, { Toaster } from 'react-hot-toast';


interface Props {
  blockId: number;
  previousHash?: string;
  hash: string | undefined; // hash is undefined until set on initial render or hash updates via onHash

  onDelete?: (blockId: number) => void;
  onHash: (blockId: number, hash: string) => void;
}

/**
 * Block Component
 * Has all functionality for a block within a block chain.
 * You might need to add some things in here for step 2.
 * @param blockId number of this block
 * @param previousHash previous block's hash
 * @param hash the hash of the current block
 * @param onDelete deletion of this block
 * @param onHash hash change callback
 * @param validBlock showing when hash is valid
 * @param invalidBlock showing when hash is invalid
 */
const Block = ({ blockId, previousHash = '0'.repeat(64), hash, onHash, onDelete }: Props) => {
  const [nonce, setNonce] = useState<number>(0);
  const [data, setData] = useState('');

  // Every time the hash needs to be recalculated, call onHash
  useEffect(() => {
    onHash(blockId, sha256(blockId + data + previousHash + nonce))
  }, [blockId, data, previousHash, nonce]);

  // Checks if hash is valid
  const isValidHash = (hash: string) => hash.substring(0, 3) === '000';

  // Mine the block until we get a verified hash
  const onMine = (i = 1) => {
    while (!isValidHash(sha256(blockId + data + previousHash + i))) {
      i++
    }
    onHash(blockId, sha256(blockId + data + previousHash + i));
    setNonce(i)
    toast("Good job!", {
      icon: '👏',
    });
  };

  return (
    <div className={`${styles.block} ${hash && isValidHash(hash) ? styles.validBlock : styles.invalidBlock}`}>
      <div>
        Block <span>{blockId}</span>
      </div>
      <div>
        Nonce <span>{nonce}</span>
      </div>
      <div>
        <label htmlFor={`data-${blockId}`}>Data</label>
        <textarea id={`data-${blockId}`} onChange={(e) => setData(e.target.value)} />
      </div>
      <div>
        Previous Hash <span>{previousHash}</span>
      </div>
      <div>
        Hash <span>{hash}</span>
      </div>
      <div>
        Valid Block <span>{hash && isValidHash(hash) ? "Valid" : "Not Valid"}</span>
      </div>
      <button className={styles.button} type="button" onClick={() => onMine()} style={{ margin: '10px 0' }}>Mine</button>
      {onDelete && <button className={styles.button} type="button" onClick={() => onDelete(blockId)}>Delete</button>}
      <Toaster />
    </div>
  )
};

export default Block;