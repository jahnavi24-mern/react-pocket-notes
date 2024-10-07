import React, { useState } from 'react';
import FolderItem from './FolderItem';
import { formatDate } from '../utils/formatDate';
import { IoSendSharp } from "react-icons/io5";

const NoteEditor = ({ selectedFolder, addNote }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      addNote(input);
      setInput('');
    }
  };

  return (
    <div className='note-editor'>
      <div className='folder-note-editor'>
        <FolderItem
          folderName={selectedFolder.folderName}
          color={selectedFolder.color}
        />
      </div>


      <div className="notes-list">
        {(selectedFolder.notes && selectedFolder.notes.length > 0) ? (
          selectedFolder.notes.map((note, index) => (
            <div key={index} className="note">
              <p>{note.note}</p>
              <div>{formatDate(note.timestamp)}</div>
            </div>
          ))
        ) : (
          <p>No notes in this folder yet.</p>
        )}
      </div>

      <div className='notes-input-container'>
        <textarea
          className="note-input"
          placeholder="Enter your text here..........."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button 
        className={`send-btn ${!input.trim() ? 'disabled' : ''}`}
        onClick={handleSend}
        disabled={!input.trim()}
        >
          <IoSendSharp size={20} color="#001F8B" />
        </button>
      </div>

    </div>


  );
};

export default NoteEditor;
