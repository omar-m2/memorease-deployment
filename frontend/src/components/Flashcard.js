import React, { useState, useEffect } from 'react';
import { updateFlashcard, deleteFlashcard } from '../api/flashcardApi';
import '../styles/App.css';
import '../styles/Flashcard.css';

// Function to manage flashcard flip and edit & question and answer text
function Flashcard({ flashcard, onUpdate, onDelete, isFlipped, isEditMode }) {
  const [isFlippedState, setIsFlippedState] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState(flashcard.question);
  const [answer, setAnswer] = useState(flashcard.answer);

  // Synchronize flipped state with the prop
  useEffect(() => {
    setIsFlippedState(isFlipped);
  }, [isFlipped]);

  // Toggle flipped state
  const handleFlip = () => setIsFlippedState(!isFlippedState);

  // Handle edit form submission
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedFlashcard = await updateFlashcard(flashcard._id, { question, answer });
      onUpdate(updatedFlashcard);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };

  // Handle flashcard deletion
  const handleDelete = async () => {
    try {
      await deleteFlashcard(flashcard._id);
      onDelete(flashcard._id);
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  return (
    <div className="flashcard">
      {isEditing ? (
        // Render edit form if in edit mode
        <form className="flashcard-form" onSubmit={handleEdit}>

          <textarea
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)} // Update question state
            required
          />

          <textarea
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)} // Update answer state
            required
          />

          <div className="btn-edit-container">

            <button
            className="btn btn-save"
            type="submit">
            Save
            </button>

            <button
            className="btn btn-cancel"
            type="button"
            onClick={() => setIsEditing(false)}>
            Cancel
            </button>

          </div>
        </form>
      ) : (
        // Render flashcard content when not in editing mode
        <div>
          <div
          className={`flashcard-inner ${isFlippedState ? 'flipped' : ''}`}
          onClick={handleFlip}>

            <div className="flashcard-front">
              <p>{flashcard.question}</p>
            </div>
            <div className="flashcard-back">
              <p>{flashcard.answer}</p>
            </div>

          </div>
          {isEditMode && (
            // Render edit and delete buttons if in edit mode
            <>
              <button className="btn btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Flashcard;
