import React from 'react';

const FolderItem = ({ folderName, onClick, color, isSelected }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  return (
    <div 
      className={`folder-item ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
      style={{ backgroundColor: isSelected ? '#d3d3d3' : 'transparent' }}
    >
      <div className="folder-icon" style={{ backgroundColor: color }}>
        {getInitials(folderName)}
      </div>
      <span className="folder-name">{folderName}</span>
    </div>
  );
};

export default FolderItem;
