import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Lessons.css';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, this would fetch from your API
    // For now, using mock data
    const mockLessons = [
      {
        id: 1,
        title: 'Spanish Conversation Basics',
        description: 'Common phrases used in everyday Spanish conversations',
        created_at: '2023-09-15T14:23:45Z',
        flashcard_count: 15
      },
      {
        id: 2,
        title: 'French Restaurant Vocabulary',
        description: 'Essential French words and phrases for ordering in restaurants',
        created_at: '2023-10-02T09:15:00Z',
        flashcard_count: 22
      },
      {
        id: 3,
        title: 'Japanese Travel Phrases',
        description: 'Useful Japanese expressions for travelers',
        created_at: '2023-10-10T16:42:30Z',
        flashcard_count: 18
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setLessons(mockLessons);
      setLoading(false);
    }, 800);

    // Add error handling for the API call
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data here
        // const response = await fetch('/api/lessons');
        // const data = await response.json();
        // setLessons(data);
      } catch (err) {
        setError('Failed to load lessons. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Uncomment this when implementing real API calls
    // fetchData();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="lessons-container">
      <h1>My Lessons</h1>
      
      {lessons.length > 0 ? (
        <div className="lessons-grid">
          {lessons.map(lesson => (
            <div key={lesson.id} className="lesson-card">
              <div className="lesson-card-body">
                <h2>{lesson.title}</h2>
                <p>{lesson.description}</p>
                <div className="lesson-meta">
                  <span>Created: {new Date(lesson.created_at).toLocaleDateString()}</span>
                  <span>{lesson.flashcard_count} flashcards</span>
                </div>
              </div>
              <div className="lesson-card-footer">
                <Link to={`/lessons/${lesson.id}`} className="btn btn-primary">Study Flashcards</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-lessons">
          <h2>You don't have any lessons yet</h2>
          <p>Create your first lesson by uploading an audio file or recording.</p>
          <Link to="/transcribe" className="btn btn-primary btn-large">Create Your First Lesson</Link>
        </div>
      )}
    </div>
  );
};

export default Lessons;
