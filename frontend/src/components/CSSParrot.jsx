import React, { useState, useEffect } from 'react';
import '../styles/CSSParrot.css';

const CSSParrot = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState('');
  
  const phrases = [
    "Hello! I'm Polly!",
    "Let's learn languages!",
    "Hablas español?",
    "Parlez-vous français?",
    "Sprechen Sie Deutsch?",
    "你好！",
    "Ciao!",
    "こんにちは!"
  ];
  
  useEffect(() => {
    // Start speaking immediately 
    setIsSpeaking(true);
    
    // Cycle through phrases
    let phraseIndex = 0;
    setCurrentPhrase(phrases[0]);
    
    const speakInterval = setInterval(() => {
      // Switch between speaking and not speaking
      setIsSpeaking(prevState => !prevState);
      
      // When starting to speak again, change the phrase
      if (!isSpeaking) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setCurrentPhrase(phrases[phraseIndex]);
      }
    }, 2000);
    
    return () => clearInterval(speakInterval);
  }, []);
  
  return (
    <div className="parrot-container">
      <div className="speech-bubble">
        <p>{currentPhrase}</p>
      </div>
      
      <div className="parrot">
        <div className="parrot-head">
          <div className="parrot-face"></div>
          <div className="parrot-eye"></div>
          <div className="parrot-eye-pupil"></div>
          
          <div className={`parrot-beak ${isSpeaking ? 'speaking' : ''}`}>
            <div className="parrot-beak-top"></div>
            <div className="parrot-beak-bottom"></div>
          </div>
        </div>
        
        <div className="parrot-body">
          <div className="parrot-wing"></div>
          <div className="parrot-tail"></div>
        </div>
        
        <div className="parrot-feet">
          <div className="parrot-foot left"></div>
          <div className="parrot-foot right"></div>
        </div>
      </div>
    </div>
  );
};

export default CSSParrot;
