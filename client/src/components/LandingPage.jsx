import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cakeImage from '../image/cake.png'; // Make sure you have a cake.png in assets

function LandingPage() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.toLowerCase() === 'akanksha') { // Case-insensitive check
      navigate('/wish');
    } else {
      alert('That\'s not my name! Try again :)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-akanksha-pink-lightest p-4 font-poppins relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-akanksha-pink-lightest to-akanksha-pink-lighter opacity-75"></div>

      {/* Floating Sparkles - purely decorative */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-akanksha-gold rounded-full animate-pulse-slow opacity-50"></div>
      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-akanksha-pink-light rounded-full animate-pulse-fast opacity-60"></div>
      <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-akanksha-pink-lighter rounded-full animate-pulse-medium opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-akanksha-gold rounded-full animate-pulse-slow opacity-70"></div>

      <div className="relative z-10 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-md w-full border-4 border-akanksha-pink-light">
        <h1 className="text-4xl md:text-5xl font-great-vibes text-akanksha-pink-dark mb-4 drop-shadow-lg animate-fade-in-down">
          A Special Message Awaits You...
        </h1>
        <p className="text-lg md:text-xl text-akanksha-purple mb-6 animate-fade-in delay-200">
          But first, tell me, what's your beautiful name?
        </p>

        <img src={cakeImage} alt="Birthday Cake" className="mx-auto w-32 h-32 md:w-40 md:h-40 object-contain mb-6 animate-pop-in" />

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your name here..."
            className="w-full px-5 py-3 mb-6 text-lg text-akanksha-pink-darker placeholder-akanksha-pink-light bg-akanksha-pink-lightest border-2 border-akanksha-pink rounded-full focus:outline-none focus:ring-4 focus:ring-akanksha-pink-lighter focus:border-transparent transition-all duration-300 shadow-inner"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-akanksha-pink text-white text-xl font-semibold rounded-full shadow-lg hover:bg-akanksha-pink-dark transform hover:scale-105 transition-all duration-300 ease-in-out relative overflow-hidden group border-2 border-akanksha-pink-dark"
          >
            <span className="relative z-10">Reveal My Wish</span>
            <span className="absolute inset-0 bg-gradient-to-r from-akanksha-pink to-akanksha-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-500 animate-fade-in delay-400">
          Hint: It's the name you're celebrating! 😉
        </p>
      </div>

      {/* Tailwind CSS Animations (add to index.css or a dedicated CSS file if preferred) */}
      
    </div>
  );
}

export default LandingPage;