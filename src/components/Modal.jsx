import React, { useState } from 'react';

const colorNames = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF"
];

const Modal = ({ onCreateFolder, onClose }) => {
    const [folderName, setFolderName] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const handleCreate = () => {
        if (folderName && selectedColor) {
            onCreateFolder({ folderName, color: selectedColor });
            setFolderName('');
            setSelectedColor('');
            onClose();
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOutsideClick}>
            <div className="modal">
                <h3>Create a New group</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                    <div className="form-group">
                        <label htmlFor="folder-name">Group Name</label>
                        <input
                            id="folder-name"
                            type="text"
                            placeholder="Enter group name"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Choose Colour</label>
                        <div className="color-options">
                            {colorNames.map((color, index) => (
                                <div
                                    key={index}
                                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type="submit" className="create-btn" disabled={!folderName || !selectedColor}>
                            Create
                        </button>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default Modal;
