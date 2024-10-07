import React from 'react';
import FolderItem from './FolderItem';

const FolderList = ({ folders, onSelectFolder, selectedFolder }) => {
  return (
    <div className="folder-list">
      {folders.map((folder) => (
        <FolderItem
          key={folder.id}
          folderName={folder.folderName}
          color={folder.color}
          onClick={() => onSelectFolder(folder)}
          isSelected={selectedFolder && selectedFolder.id === folder.id}
        />
      ))}
    </div>
  );
};

export default FolderList;
