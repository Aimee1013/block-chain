import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import BlockChain from './';

/**
 * Block Chain Testing
 * These have already been completed for you.
 * This test will be correct if the BlockChain component is correct
 */

it('Block chain should be empty', () => {
  const { getByText } = render(<BlockChain />);
  expect(getByText("Total Blocks: 0")).toBeInTheDocument();
});

it('Add block works correctly', () => {
  const { getByText } = render(<BlockChain />);
  userEvent.click(getByText('Add Block'));
  expect(getByText("Total Blocks: 1")).toBeInTheDocument();
  expect(getByText("Not Valid")).toBeInTheDocument();
});

it('Multiple blocks works correctly', () => {
  const { getAllByText, getByText } = render(<BlockChain />);
  userEvent.click(getByText('Add Block'));
  userEvent.click(getByText('Add Block'));
  expect(getByText("Total Blocks: 2")).toBeInTheDocument();
  expect(getAllByText("Not Valid").length).toBe(2);
});

it('Hash continues from block 1 to block 2', () => {
  const { getAllByText, getByText } = render(<BlockChain />);
  // Click twice for 2 blocks
  userEvent.click(getByText('Add Block'));
  userEvent.click(getByText('Add Block'));
  const hash = getAllByText('Hash')[0].children[0].textContent || '';
  expect(getAllByText(hash).length).toBe(2);
});

it('Mining multiple blocks works correctly', () => {
  const { getAllByText, getByText } = render(<BlockChain />);
  userEvent.click(getByText('Add Block'));
  userEvent.click(getByText('Add Block'));
  // Mine the first block
  userEvent.click(getAllByText('Mine')[0]);
  // Hash contents of first block
  const hash1 = getAllByText('Hash')[0].children[0].textContent || '';
  expect(hash1.substring(0, 3)).toBe('000');
  // This hash should exists in 2 places, block 1's hash and block 2's previousHash
  expect(getAllByText(hash1).length).toBe(2);
  expect(getByText("Not Valid")).toBeInTheDocument();
  expect(getByText("Valid")).toBeInTheDocument();
  // Mine the second block
  userEvent.click(getAllByText('Mine')[1]);
  // Hash contents of second block
  const hash2 = getAllByText('Hash')[1].children[0].textContent || '';
  expect(hash2.substring(0, 3)).toBe('000');
  // Both blocks are now valid
  expect(getAllByText("Valid").length).toBe(2);
});

it('On delete works correctly', () => {
  const { getByText } = render(<BlockChain />);
  userEvent.click(getByText('Add Block'));
  userEvent.click(getByText('Add Block'));
  expect(getByText("Total Blocks: 2")).toBeInTheDocument();
  userEvent.click(getByText('Delete'));
  expect(getByText("Total Blocks: 1")).toBeInTheDocument();
});