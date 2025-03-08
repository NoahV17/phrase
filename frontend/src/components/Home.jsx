import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import CSSParrot from './CSSParrot';

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
    { text: "Shalom", language: "Hebrew" },
    { text: "Aloha", language: "Hawaiian" },
    { text: "Salut", language: "Romanian" },
    { text: "Hej", language: "Danish" },
    { text: "Dzień dobry", language: "Polish" },
  ];
  
  // Divide greetings into 4 rows
  const rowCount = 4;
  const rowData = [];
  const itemsPerRow = Math.ceil(greetings.length / rowCount);
  
  for (let i = 0; i < rowCount; i++) {
    const startIndex = i * itemsPerRow;
    const endIndex = Math.min(startIndex + itemsPerRow, greetings.length);
    rowData.push(greetings.slice(startIndex, endIndex));
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="scrolling-greetings-container">
          {rowData.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className={`greeting-row ${rowIndex % 2 === 0 ? 'scroll-left' : 'scroll-right'}`}
              style={{
                animationDuration: `${60 + rowIndex * 15}s`,
                top: `${(100 / (rowCount + 1)) * (rowIndex + 1)}%`
              }}
            >
              {row.concat(row).map((greeting, index) => (
                <div key={`${rowIndex}-${index}`} className="floating-greeting">
                  <span className="greeting-text">{greeting.text}</span>
                  <span className="greeting-language">{greeting.language}</span>
                </div>
              ))}
            </div>
          ))}
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
            <CSSParrot />
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
