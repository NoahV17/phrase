import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  // Array of greetings in different languages
  const greetings = [
    { text: "Hello", language: "English" },
    { text: "Hola", language: "Spanish" },
    { text: "Bonjour", language: "French" },
    { text: "Ciao", language: "Italian" },
    { text: "Hallo", language: "German" },
    { text: "你好", language: "Chinese" },
    { text: "こんにちは", language: "Japanese" },
    { text: "안녕하세요", language: "Korean" },
    { text: "Привет", language: "Russian" },
    { text: "مرحبا", language: "Arabic" },
    { text: "Olá", language: "Portuguese" },
    { text: "Namaste", language: "Hindi" },
    { text: "Sawubona", language: "Zulu" },
    { text: "Hej", language: "Swedish" },
    { text: "Γεια σας", language: "Greek" },
    { text: "Xin chào", language: "Vietnamese" },
    { text: "Salam", language: "Persian" },
    { text: "Sawasdee", language: "Thai" },
    { text: "Merhaba", language: "Turkish" },
    { text: "Shalom", language: "Hebrew" }
  ];

  // Create two separate arrays for top and bottom rows (different speeds)
  const topRowGreetings = greetings.slice(0, 10);
  const bottomRowGreetings = greetings.slice(10);

  return (
    <div className="home">
      <section className="hero">
        {/* Background scrolling greetings */}
        <div className="scrolling-greetings">
          <div className="greetings-row top-row">
            {topRowGreetings.concat(topRowGreetings).map((greeting, index) => (
              <div key={`top-${index}`} className="greeting-item">
                <span className="greeting-text">{greeting.text}</span>
                <span className="greeting-language">{greeting.language}</span>
              </div>
            ))}
          </div>
          <div className="greetings-row bottom-row">
            {bottomRowGreetings.concat(bottomRowGreetings).map((greeting, index) => (
              <div key={`bottom-${index}`} className="greeting-item">
                <span className="greeting-text">{greeting.text}</span>
                <span className="greeting-language">{greeting.language}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="hero-content">
            <h1>Excel in learning a new language with AI</h1>
            <p>Phrase turns your multilingual phrases into flashcards, the most effective and natural way to learn a language.</p>
            <div className="hero-buttons">
              <Link to="/transcribe" className="btn btn-primary">Start Learning</Link>
              <Link to="/lessons" className="btn btn-secondary">Our Lessons</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://via.placeholder.com/500x350?text=Language+Learning+Illustration" alt="Language Learning" />
          </div>
        </div>
      </section>
      
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Choose a Language</h3>
              <p>Select from our wide range of available languages to start learning useful phrases.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Browse Common Phrases</h3>
              <p>Explore useful everyday phrases with accurate translations in your chosen language.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Learn with Flashcards</h3>
              <p>Save your favorite phrases as flashcards and practice them to improve your skills.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
