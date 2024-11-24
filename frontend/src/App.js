import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { getFlashcards } from './api/flashcardApi';
import FlashcardList from './pages/FlashcardList';
import FlashcardReview from './components/FlashcardReview';
import './styles/App.css';
import './styles/Home.css';

function App() {
  const [flashcards, setFlashcards] = useState([]); // State to hold the list of flashcards

  // Fetch flashcards from the API
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const data = await getFlashcards();
        setFlashcards(data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, []);

  return (
    <div className="App">
      <h1>MemorEase</h1>
      <nav>

        <Link
        to="/"
        draggable="false"
        className="btn btn-home">
        Home
        </Link>{' '}

        <Link
        to="/flashcards"
        draggable="false"
        className="btn btn-view"
        state={{ isEditMode: false }}>
        View Flashcards
        </Link>

        <Link
        to="/review"
        draggable="false"
        className="btn btn-review">
        Study Mode
        </Link>

      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<FlashcardList showForm={true} />} />
        <Route path="/flashcards" element={<FlashcardList showForm={false} />} />
        <Route
          path="/review"
          element={
            flashcards.length > 0
              ? <FlashcardReview flashcards={flashcards} />
              : <p>Loading flashcards...</p>
          }
        />
      </Routes>
    </div>
  );
}

// Home page component
function HomePage() {
  return (
    <div className="home">

      <h2>Welcome to MemorEase!</h2>
      <p>Organize your knowledge and study smarter with flashcards.</p>
      <h3>To get started, create new flashcards, view and edit your existing ones.</h3>

      <Link
      to="/create"
      draggable="false"
      className="btn btn-create"
      state={{ isEditMode: true }}>
      Create New Flashcard
      </Link>

      <Link
      to="/flashcards"
      draggable="false"
      className="btn btn-edit-all"
      state={{ isEditMode: true }}>
      Edit Your Flashcards
      </Link>

    </div>
  );
}

export default App;
