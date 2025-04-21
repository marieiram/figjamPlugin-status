import React from 'react';

interface StatusIndicatorProps {
  status: 'fix' | 'wip' | 'rejected' | 'ignore' | null;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  // Map status to colors and labels
  const statusMap = {
    fix: {
      color: '#A6E9B3',
      label: 'Fix',
      description: 'Confirmed'
    },
    wip: {
      color: '#FFDE82',
      label: 'WIP',
      description: 'Work in Progress'
    },
    rejected: {
      color: '#FFAFAF',
      label: 'Rejected',
      description: 'Not Adopted'
    },
    ignore: {
      color: '#E0E0E0',
      label: 'Ignore',
      description: 'Can Be Ignored'
    }
  };

  if (!status || !statusMap[status]) {
    return null;
  }

  const { color, label, description } = statusMap[status];

  return (
    <div 
      className="flex items-center gap-2 rounded-md px-3 py-1.5"
      style={{ backgroundColor: color, color: '#333' }}
    >
      <span className="font-medium">{label}</span>
      <span className="text-xs opacity-80">({description})</span>
    </div>
  );
};

export default StatusIndicator;