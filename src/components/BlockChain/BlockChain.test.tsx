import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import BlockChain from './';

/**
 * Block Chain Testing
 * These have already been completed for you.
 * This test will be correct if the BlockChain component is correct
 */

it('Block chain should be empty', () => {
  render(<BlockChain />);
  userEvent.click(screen.getByText('Delete'));
  expect(screen.getByText("Total Blocks: 0")).toBeInTheDocument();
});

it('Add block works correctly', () => {
  render(<BlockChain />);
  userEvent.click(screen.getByText('Add Block'));
  expect(screen.getByText("Total Blocks: 2")).toBeInTheDocument();
  expect(screen.getAllByText("Not Valid")).toBeTruthy();
});

it('Multiple blocks works correctly', () => {
  render(<BlockChain />);
  userEvent.click(screen.getByText('Add Block'));
  userEvent.click(screen.getByText('Add Block'));
  expect(screen.getByText("Total Blocks: 3")).toBeInTheDocument();
  expect(screen.getAllByText("Not Valid").length).toBe(3);
});

it('Hash continues from block 1 to block 2', () => {
  render(<BlockChain />);
  // Click twice for 2 blocks
  userEvent.click(screen.getByText('Add Block'));
  userEvent.click(screen.getByText('Add Block'));
  const hash = screen.getAllByText('Hash')[0].children[0].textContent || '';
  expect(screen.getAllByText(hash).length).toBe(1);
});

it('Mining multiple blocks works correctly', () => {
  render(<BlockChain />);
  userEvent.click(screen.getByText('Add Block'));
  userEvent.click(screen.getByText('Add Block'));
  // Mine the first block
  userEvent.click(screen.getAllByText('Mine')[0]);
  // Hash contents of first block
  const hash1 = screen.getAllByText('Hash')[0].children[0].textContent || '';
  expect(hash1.substring(0, 3)).toBe('000');
  // This hash should exists in 2 places, block 1's hash and block 2's previousHash
  expect(screen.getAllByText(hash1).length).toBe(2);
  expect(screen.getAllByText("Not Valid")).toBeTruthy();
  expect(screen.getByText("Valid")).toBeInTheDocument();
  // Mine the second block
  userEvent.click(screen.getAllByText('Mine')[1]);
  // Hash contents of second block
  const hash2 = screen.getAllByText('Hash')[1].children[0].textContent || '';
  expect(hash2.substring(0, 3)).toBe('000');
  // Both blocks are now valid
  expect(screen.getAllByText("Valid").length).toBe(2);
});

it('On delete works correctly', () => {
  render(<BlockChain />);
  userEvent.click(screen.getByText('Add Block'));
  userEvent.click(screen.getByText('Add Block'));
  expect(screen.getByText("Total Blocks: 3")).toBeInTheDocument();
  userEvent.click(screen.getByText('Delete'));
  expect(screen.getByText("Total Blocks: 2")).toBeInTheDocument();
});
