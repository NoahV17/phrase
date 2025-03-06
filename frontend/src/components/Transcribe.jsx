import React, { useState } from 'react';
import '../styles/Transcribe.css';

const Transcribe = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [phrases, setPhrases] = useState([]);
  const [customPhrase, setCustomPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // List of available languages
  const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese (Mandarin)' },
    { code: 'ru', name: 'Russian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' }
  ];
  
  // Common phrases by category
  const commonPhrasesByCategory = {
    greetings: [
      "Hello",
      "Good morning",
      "Good afternoon",
      "Good evening",
      "How are you?",
      "Nice to meet you",
      "Goodbye"
    ],
    practical: [
      "Where is the bathroom?",
      "How much does this cost?",
      "I don't understand",
      "Can you speak more slowly?",
      "Can you help me?",
      "I need a doctor"
    ],
    dining: [
      "I would like to order",
      "The check, please",
      "Water, please",
      "I am vegetarian",
      "I am allergic to...",
      "This is delicious"
    ],
    transportation: [
      "Where is the train station?",
      "I need a taxi",
      "How much is the fare?",
      "Can you take me to this address?",
      "Is this the right way to...?",
      "When does the bus arrive?"
    ]
  };
  
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    generatePhrases(e.target.value);
  };
  
  const handleCustomPhraseChange = (e) => {
    setCustomPhrase(e.target.value);
  };
  
  const handleCustomPhraseSubmit = (e) => {
    e.preventDefault();
    if (customPhrase.trim() === '') return;
    
    setLoading(true);
    
    // Simulate API call for translating custom phrase
    setTimeout(() => {
      const newPhrase = {
        id: Date.now(),
        english: customPhrase,
        translated: `[${selectedLanguage.toUpperCase()} Translation of "${customPhrase}"]`,
        favorite: false,
        category: 'custom'
      };
      
      setPhrases([newPhrase, ...phrases]);
      setCustomPhrase('');
      setLoading(false);
    }, 1000);
  };
  
  const generatePhrases = (langCode) => {
    if (!langCode) return;
    
    setLoading(true);
    
    // Combine phrases from all categories
    const allPhrases = [
      ...commonPhrasesByCategory.greetings, 
      ...commonPhrasesByCategory.practical,
      ...commonPhrasesByCategory.dining,
      ...commonPhrasesByCategory.transportation
    ];
    
    // Create randomized subset of phrases (in real app you might want all phrases)
    const selectedPhrases = allPhrases.slice(0, 15);
    
    // Simulate API call for translation
    setTimeout(() => {
      const translatedPhrases = selectedPhrases.map((phrase, index) => ({
        id: index,
        english: phrase,
        translated: `[${langCode.toUpperCase()} Translation of "${phrase}"]`,
        favorite: false,
        category: getCategoryForPhrase(phrase)
      }));
      
      setPhrases(translatedPhrases);
      setLoading(false);
    }, 1500);
  };
  
  const getCategoryForPhrase = (phrase) => {
    for (const [category, phrases] of Object.entries(commonPhrasesByCategory)) {
      if (phrases.includes(phrase)) {
        return category;
      }
    }
    return 'other';
  };
  
  const toggleFavorite = (id) => {
    setPhrases(phrases.map(phrase => 
      phrase.id === id ? {...phrase, favorite: !phrase.favorite} : phrase
    ));
  };
  
  const saveToFlashcards = () => {
    const favoritePhrases = phrases.filter(phrase => phrase.favorite);
    if (favoritePhrases.length === 0) {
      alert("Please favorite at least one phrase before saving to flashcards.");
      return;
    }
    
    alert(`${favoritePhrases.length} phrases saved to your flashcards!`);
    // In a real app, you would save these to your backend/database
  };
  
  return (
    <div className="phrases-container">
      <h1>Common Useful Phrases</h1>
      
      <div className="language-selection">
        <label htmlFor="language-select">Select a language:</label>
        <select 
          id="language-select" 
          value={selectedLanguage} 
          onChange={handleLanguageChange}
        >
          <option value="">-- Choose a language --</option>
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div>
      
      {selectedLanguage && (
        <div className="custom-phrase-form">
          <form onSubmit={handleCustomPhraseSubmit}>
            <input
              type="text"
              value={customPhrase}
              onChange={handleCustomPhraseChange}
              placeholder="Enter your own phrase to translate..."
              disabled={loading}
            />
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={!customPhrase.trim() || loading}
            >
              Translate
            </button>
          </form>
        </div>
      )}
      
      {loading && (
        <div className="loading-indicator">
          <p>Generating translations...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {selectedLanguage && phrases.length > 0 && (
        <>
          <div className="phrases-list">
            <div className="phrases-header">
              <h2>Useful Phrases in {languages.find(l => l.code === selectedLanguage)?.name}</h2>
              <button 
                className="btn btn-primary save-btn"
                onClick={saveToFlashcards}
              >
                Save Favorites to Flashcards
              </button>
            </div>
            
            {['custom', 'greetings', 'practical', 'dining', 'transportation', 'other'].map(category => {
              const categoryPhrases = phrases.filter(p => p.category === category);
              if (categoryPhrases.length === 0) return null;
              
              return (
                <div key={category} className="phrase-category">
                  <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                  <div className="phrase-cards">
                    {categoryPhrases.map(phrase => (
                      <div key={phrase.id} className="phrase-card">
                        <div className="phrase-content">
                          <p className="english-phrase">{phrase.english}</p>
                          <p className="translated-phrase">{phrase.translated}</p>
                        </div>
                        <button 
                          className={`favorite-btn ${phrase.favorite ? 'favorited' : ''}`}
                          onClick={() => toggleFavorite(phrase.id)}
                        >
                          {phrase.favorite ? '★' : '☆'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      
      {selectedLanguage && !loading && phrases.length === 0 && (
        <div className="no-phrases">
          <p>Select a language to see common useful phrases</p>
        </div>
      )}
    </div>
  );
};

export default Transcribe;
