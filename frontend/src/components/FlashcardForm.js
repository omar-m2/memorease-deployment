import React, { useState, useRef } from 'react';
import { createFlashcard } from '../api/flashcardApi';
import '../styles/App.css';
import '../styles/Form.css';

// Function to manage adding flashcard
function FlashcardForm({ onAdd }) {
  const [flashcards, setFlashcards] = useState([{ question: '', answer: '' }]);
  const firstQuestionRef = useRef(null);

  // Update field of a flashcard at a given index
  const handleChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const flashcard of flashcards) {
      const newFlashcard = await createFlashcard(flashcard);
      onAdd(newFlashcard);
    }
    // Reset form and focus on question textarea
    setFlashcards([{ question: '', answer: '' }]);
    if (firstQuestionRef.current) {
      firstQuestionRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {flashcards.map((flashcard, index) => (
        <div key={index} className="form-area">
          <textarea
            ref={index === 0 ? firstQuestionRef : null}
            placeholder="Question"
            value={flashcard.question}
            onChange={(e) => handleChange(index, 'question', e.target.value)} // Update question
            required
          />
          <textarea
            placeholder="Answer"
            value={flashcard.answer}
            onChange={(e) => handleChange(index, 'answer', e.target.value)} // Update asnwer
            required
          />
        </div>
      ))}
      <button className="btn btn-save-card" type="submit">Save Flashcard</button>
    </form>
  );
}

export default FlashcardForm;
