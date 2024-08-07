"use client";

import React, { useState, useEffect } from 'react';

const words = ['BATMAN', 'JOKER', 'SPIDERMAN', 'WONDERWOMAN', 'WOLVERINE', 'HULK', 'THOR', 'IRONMAN', 'HAWKEYE', 'BLACKWIDOW'];

const qwertyLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '']
];

const HangmanGame: React.FC = () => {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setRemainingAttempts(remainingAttempts - 1);
      }
    }
  };

  const handleReset = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setRemainingAttempts(6);
  }

  const maskedWord = word
    .split('')
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  const isGameOver = remainingAttempts === 0;
  const isGameWon = word === maskedWord.replace(/ /g, '');

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-[rgb(var(--color-background))]">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full transition-colors duration-300 bg-[rgb(var(--color-foreground))]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[rgb(var(--color-primary))]">Hangman</h1>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={darkMode} onChange={toggleTheme} />
              <div className="w-14 h-7 bg-[rgb(var(--color-button-disabled))] rounded-full shadow-inner"></div>
              <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 ease-in-out flex items-center justify-center ${darkMode ? 'transform translate-x-7 bg-[rgb(var(--color-primary))]' : ''}`}>
                {darkMode ? '🌙' : '☀️'}
              </div>
            </div>
          </label>
        </div>
        <p className="text-2xl font-mono text-center mb-4 text-[rgb(var(--color-text))]">{maskedWord}</p>
        <p className="text-lg text-center mb-4 text-[rgb(var(--color-text))]">Remaining attempts: {remainingAttempts}</p>
        {!isGameOver && !isGameWon && (
          <div className="mb-4">
            {qwertyLayout.map((row, rowIndex) => (
              <div key={rowIndex} className={`flex justify-center ${rowIndex === 1 ? 'ml-4' : rowIndex === 2 ? 'ml-8' : ''}`}>
                {row.map((letter, letterIndex) => (
                  <React.Fragment key={letterIndex}>
                    {letter ? (
                      <button
                        onClick={() => handleGuess(letter)}
                        disabled={guessedLetters.includes(letter)}
                        className={`m-1 w-10 h-10 text-lg font-bold rounded ${
                          guessedLetters.includes(letter)
                            ? 'bg-[rgb(var(--color-button-disabled))] text-[rgb(var(--color-text-muted))] cursor-not-allowed'
                            : 'bg-[rgb(var(--color-primary))] text-[rgb(var(--color-text))] hover:bg-[rgb(var(--color-primary-hover))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]'
                        }`}
                      >
                        {letter}
                      </button>
                    ) : (
                      <div className="w-10 h-10 m-1"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        )}
        {isGameOver && (
          <p className="text-lg text-center font-semibold text-[rgb(var(--color-error))]">
            You lost! The word was: {word}
          </p>
        )}
        {isGameWon && (
          <p className="text-lg text-center font-semibold text-[rgb(var(--color-success))]">
            Congratulations! You win!
          </p>
        )}
        <button onClick={handleReset} className="mt-4 mx-auto block text-lg font-medium text-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary-hover))]"> Restart </button>
      </div>
    </div>
  );
};

export default HangmanGame;