import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Flashcard from '../components/Flashcard';
import FlashcardForm from '../components/FlashcardForm';
import { getFlashcards, deleteFlashcard } from '../api/flashcardApi';
import '../styles/App.css';
import '../styles/Flashcard.css';

// Function to get list of flashcards
function FlashcardList({ showForm = true }) {
  const location = useLocation();
  const [flashcards, setFlashcards] = useState([]);
  const [areAllFlipped, setAreAllFlipped] = useState(false); // Track if all flashcards flipped

  const isEditMode = location.state?.isEditMode || false; // Check if in edit mode

  // Fetch flashcards from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFlashcards();
        setFlashcards(data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchData();
  }, []);

  // Add a new flashcard to the list
  const addFlashcard = (newFlashcard) => {
    setFlashcards([...flashcards, newFlashcard]);
  };

  // Update an existing flashcard in the list
  const updateFlashcard = (updatedFlashcard) => {
    setFlashcards(
      flashcards.map((card) => (card._id === updatedFlashcard._id ? updatedFlashcard : card))
    );
  };

  // Handle flashcard deletion
  const handleDelete = async (id) => {
    try {
      await deleteFlashcard(id);
      setFlashcards(flashcards.filter((card) => card._id !== id));
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  // Toggle the flipped state for all flashcards
  const handleFlipAll = () => {
    setAreAllFlipped(!areAllFlipped);
  };

  return (
    <div>
      {showForm && <FlashcardForm onAdd={addFlashcard} />}
      <h2 className="flashcard-list">Your Flashcards</h2>
      <button
        className="btn btn-all"
        onClick={handleFlipAll}>{areAllFlipped ? 'Fold All' : 'Flip All'}
      </button>
      <div className="flashcard-container">
        {flashcards.map((card) => (
          <Flashcard
            key={card._id}
            flashcard={card}
            onUpdate={updateFlashcard}
            onDelete={() => handleDelete(card._id)}
            isEditMode={isEditMode}
            isFlipped={areAllFlipped}
          />
        ))}
      </div>
    </div>
  );
}

export default FlashcardList;
