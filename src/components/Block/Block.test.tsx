import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/dom'

import Block from './';

/**
 * Block Testing
 * Please Complete these tests
 */

/**
 * Hash is set on load
 * We need to check that when component is rendered, 
 * onHash is called and the hash change is reflected in the component
 */
it('Hash is set on load', () => {
  const fakeOnHash = jest.fn();
  render(<Block blockId={1} hash={undefined} onHash={fakeOnHash} />);
  expect(fakeOnHash).toHaveBeenCalledTimes(1);
});

/**
 * Shows not valid text
 * On render, the text 'Not Valid' should be in the document as the hash is not valid
 */
it("Shows not valid text", () => {
  render(<Block blockId={1} hash="invalidHash" onHash={jest.fn()} />);
  // when the hash is invalid
  const notValidText = screen.getByText("Not Valid");
  expect(notValidText).toBeInTheDocument();
});

/**
 * Delete is called correctly
 * We need to make sure that when clicking on delete, the delete function is called
 */
it("Delete is called correctly", () => {
  const fakeOnDelete = jest.fn();
  render(<Block blockId={1} hash="ValidHash" onHash={jest.fn()} onDelete={fakeOnDelete} />);
  const deleteButton = screen.getByText("button");
  userEvent.click(deleteButton);
  expect(fakeOnDelete).toHaveBeenCalledTimes(1);
});

/**
 * Mining works correctly
 * We need to be able to click on mine and expect the block hash to now be valid
 * The text 'Valid' should also be in the document
 */
it("Mining works correctly", () => {
  const fakeOnHash = jest.fn();
  render(<Block blockId={1} hash="invalidHash" onHash={fakeOnHash} />);
  expect(fakeOnHash).toHaveBeenCalledTimes(1)

  const mineButton = screen.getByText("button");
  userEvent.click(mineButton);

  // when the hash is valid
  const validText = screen.getByText("Valid");
  expect(validText).toBeInTheDocument();
});

/**
 * Changing data effects hash
 * The data textarea can be changed, 
 * we need to make sure the changes effect the hash and that onHash is called
 */
it("Changing data effects hash", () => {
  // changes effect the hash and called
  const fakeOnHash = jest.fn();
  render(<Block blockId={1} hash="validHash" onHash={fakeOnHash} />);
  expect(fakeOnHash).toHaveBeenCalledTimes(1)

  // data textarea can be changed to New Data
  const textareaText = screen.getByLabelText("Data");
  fireEvent.change(textareaText, { target: { value: "New Data" } })
});

