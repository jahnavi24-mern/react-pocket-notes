import React from 'react';

function Note({ note }) {
  return (
    <div className="note">
      <p>{note.text}</p>
      <span>{note.date}</span>
    </div>
  );
}

export default Note;
