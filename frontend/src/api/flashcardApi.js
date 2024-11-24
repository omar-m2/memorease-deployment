import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api/flashcards';

// Fetch all flashcards from the API
export const getFlashcards = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new flashcard in the API
export const createFlashcard = async (flashcard) => {
  const response = await axios.post(API_URL, flashcard);
  return response.data;
};

// Update an existing flashcard by ID
export const updateFlashcard = async (id, updatedFlashcard) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedFlashcard);
  return response.data;
};

// Delete a flashcard
export const deleteFlashcard = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
