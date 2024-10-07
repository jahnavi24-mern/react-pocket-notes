import React, { useState, useEffect } from 'react';
import FolderList from '../components/FolderList';
import NoteEditor from '../components/NoteEditor';
import Modal from '../components/Modal';
import '../styles/App.css';

const Home = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folders, setFolders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mobileView, setMobileView] = useState('folders');

  useEffect(() => {
    const storedFolders = localStorage.getItem('folders');
    if (storedFolders) {
      try {
        setFolders(JSON.parse(storedFolders));
      } catch (error) {
        console.error("Error parsing folders from localStorage", error);
        setFolders([]);
      }
    }
  }, []);

  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem('folders', JSON.stringify(folders));
    }
  }, [folders]);

  const addNote = (note) => {
    if (!selectedFolder) return;

    const updatedFolders = folders.map((folder) => {
      if (folder.id === selectedFolder.id) {
        return {
          ...folder,
          notes: [...folder.notes, { note, timestamp: new Date() }],
        };
      }
      return folder;
    });

    setFolders(updatedFolders);
    setSelectedFolder(updatedFolders.find(f => f.id === selectedFolder.id));
  };

  const addFolder = (folder) => {
    const newFolder = {
      id: Date.now(),
      ...folder,
      notes: []
    };
    setFolders([...folders, newFolder]);
    setSelectedFolder(newFolder);
    setShowModal(false);
  };

  const handleSelectFolder = (folder) => {
    setSelectedFolder(folder);
    if (window.innerWidth <= 768) {
      setMobileView('notes');
    }
  };

  const handleBack = () => {
    setMobileView('folders');
  };

  return (
    <div className={`home ${mobileView === 'notes' ? 'mobile-notes' : ''}`}>
      {/* Left Panel: Folders */}
      <div className="left-panel">
        <h2>Pocket Notes</h2>
        <FolderList
          folders={folders}
          onSelectFolder={handleSelectFolder}
          selectedFolder={selectedFolder}
        />
        <button className="add-folder-btn" onClick={() => setShowModal(true)}>+</button>
      </div>

      {/* Right Panel: Notes */}
      <div className="right-panel">
        {selectedFolder ? (
          <>
            {window.innerWidth <= 768 && (
              <button className="back-btn" onClick={handleBack}>
                <img src="/back.svg" alt="Back" />
              </button>
            )}
            <NoteEditor selectedFolder={selectedFolder} addNote={addNote} />
          </>
        ) : (
          <div className='home-landing'>
            <div className='cont-1'>
              <img src="/people.svg" alt="People" />

              <h2>Pocket Notes</h2>
              <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            </div>
            <div className="encryption-message">
              <img src="/Vector copy.svg"></img>
              <p>end-to-end encrypted</p>
            </div>
          </div>


        )}
      </div>

      {showModal && <Modal onCreateFolder={addFolder} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Home;
