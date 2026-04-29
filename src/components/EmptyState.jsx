import React from 'react';

const EmptyState = ({ title, description }) => {
  return (
    <div className="text-center py-5 bg-white rounded-4 shadow-sm">
      <h2 className="h4 text-muted mb-2">{title}</h2>
      <p className="text-secondary mb-0">{description}</p>
    </div>
  );
};

export default EmptyState;
