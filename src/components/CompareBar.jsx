import React from 'react';
import { Button } from 'react-bootstrap';

const CompareBar = ({ selectedCount, onOpen, onClear }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="compare-bar glass-panel d-flex flex-wrap gap-2 justify-content-between align-items-center p-3 mb-4">
      <span className="fw-semibold">{selectedCount} listing(s) selected for comparison</span>
      <div className="d-flex gap-2">
        <Button variant="outline-secondary" className="rounded-pill fw-semibold" onClick={onClear}>
          Clear
        </Button>
        <Button className="btn-premium px-4" onClick={onOpen}>
          Compare Now
        </Button>
      </div>
    </div>
  );
};

export default CompareBar;
