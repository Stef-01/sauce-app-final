import React from 'react';

export const Background: React.FC = () => {
  return (
    <div
      role="backdrop"
      className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#0d1a2f] via-[#111827] to-[#1a202c]"
    />
  );
};
