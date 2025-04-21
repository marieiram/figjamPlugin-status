import React from 'react';

interface SuiChanCharacterProps {
  status: 'fix' | 'wip' | 'rejected' | 'ignore' | null;
  size?: 'small' | 'medium' | 'large';
}

const SuiChanCharacter: React.FC<SuiChanCharacterProps> = ({ 
  status, 
  size = 'medium' 
}) => {
  // Return null if no status provided
  if (!status) return null;

  // Map size to actual pixel dimensions
  const sizeMap = {
    small: 40,
    medium: 60,
    large: 100
  };

  const pixelSize = sizeMap[size];
  
  // Get the appropriate SVG based on status
  const getSuiChanSvg = () => {
    switch (status) {
      case 'fix':
        return (
          <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#A6E9B3"/>
            <path d="M30 50 L45 65 L70 40" stroke="white" strokeWidth="8" fill="none"/>
          </svg>
        );
      case 'wip':
        return (
          <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FFDE82"/>
            <path d="M35 50 A15 15 0 0 1 65 50 A15 15 0 0 1 35 50" stroke="white" strokeWidth="6" fill="none"/>
            <path d="M40 70 L60 70" stroke="white" strokeWidth="6" fill="none"/>
          </svg>
        );
      case 'rejected':
        return (
          <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FFAFAF"/>
            <path d="M35 35 L65 65 M35 65 L65 35" stroke="white" strokeWidth="8" fill="none"/>
          </svg>
        );
      case 'ignore':
        return (
          <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#E0E0E0"/>
            <path d="M30 50 L70 50" stroke="white" strokeWidth="8" fill="none"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sui-chan-character">
      {getSuiChanSvg()}
    </div>
  );
};

export default SuiChanCharacter;