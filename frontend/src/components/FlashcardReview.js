import React, { useState } from 'react';
import '../styles/Flashcard.css';
import '../styles/Review.css';

// Function to track flashcard current index and flipping
function FlashcardReview({ flashcards }) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Toggle flashcard flip state
  const handleFlip = () => setIsFlipped(!isFlipped);

  // Handle moving to next flashcard
  const handleNext = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        // Delay moving to next flashcard (on answer flip)
        if (index < flashcards.length - 1) {
          setIndex(index + 1);
        } else {
          setIndex(0);
        }
      }, 600);
    } else {
      // Move to the next flashcard immediately
      if (index < flashcards.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }
  };

  // Handle moving to the previous flashcard
  const handlePrevious = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        // Delay moving to previous flashcard (on answer flip)
        if (index > 0) {
          setIndex(index - 1);
        } else {
          setIndex(flashcards.length - 1);
        }
      }, 600);
    } else {
      // Move to the previous flashcard immediately
      if (index > 0) {
        setIndex(index - 1);
      } else {
        setIndex(flashcards.length - 1);
      }
    }
};

  return (
    <div className="review-container">
      <div className="flashcard-review" onClick={handleFlip}>
        <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <p>{flashcards[index].question}</p>
          </div>
          <div className="flashcard-back">
            <p>{flashcards[index].answer}</p>
          </div>
        </div>
      </div>
      <div className="review-control">
        <button onClick={handlePrevious}>Previous</button>
        <p className="review-progress">
          Progress: {index + 1} / {flashcards.length}
        </p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default FlashcardReview;
