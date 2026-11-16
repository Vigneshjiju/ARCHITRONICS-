import React from 'react';

export default function SlabWipe({ state = '' }) {
  // state can be '', 'in', 'out'
  return (
    <div
      id="wipe"
      className={`wipe ${state ? (state === 'in' ? 'in' : 'out') : ''}`}
      aria-hidden="true"
    />
  );
}
