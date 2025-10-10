import React, { useEffect, useState, useCallback, useRef } from 'react';
import FloatingMessage from './FloatingMessage';
import usImage from '../image/Akanksha.jpg'; // IMPORTANT: Replace cat.jpg with your photo!

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

function MainPage() {
  const [floatingMessages, setFloatingMessages] = useState([]);
  const [imageTitle, setImageTitle] = useState('Happy Birthday, My Love!');
  const messageCounter = useRef(0);

  const fetchFloatingMessage = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/floating-message`);
      if (!response.ok) throw new Error('API response not OK');
      const data = await response.json();
      if (data.message) {
        setFloatingMessages(prevMessages => {
          messageCounter.current += 1;
          const newMessage = { id: messageCounter.current, text: data.message };
          // Keep a maximum of 10 messages on screen to avoid clutter
          return [...prevMessages, newMessage].slice(-10);
        });
      }
    } catch (error) {
      console.error('Error fetching floating message:', error);
      // We can avoid showing a fallback message on rate limit errors
    }
  }, []);

  const fetchImageTitle = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/image-title`);
      if (!response.ok) throw new Error('API response not OK');
      const data = await response.json();
      if (data.title) {
        setImageTitle(data.title);
      }
    } catch (error) {
      console.error('Error fetching image title:', error);
      setImageTitle('A Moment with You, Forever Cherished.');
    }
  }, []);

  // Effect for continuous floating messages with a gentler interval
  useEffect(() => {
    // Fetch the first message immediately on load
    fetchFloatingMessage();
    fetchImageTitle();

    // Continuously add new messages at a safer interval
    const messageInterval = setInterval(() => {
      fetchFloatingMessage();
    }, 12000); // Increased from 5s to 12s to stay within free limits

    return () => clearInterval(messageInterval);
  }, [fetchFloatingMessage, fetchImageTitle]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-akanksha-pink-lightest to-akanksha-pink-lighter p-4 font-poppins text-akanksha-pink-dark relative overflow-hidden">
      {/* Floating Messages */}
      {floatingMessages.map(msg => (
        <FloatingMessage key={msg.id} message={msg.text} />
      ))}

      <div className="relative z-20 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl text-center max-w-2xl w-full border-4 border-akanksha-pink-darkest animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-great-vibes text-akanksha-pink-darkest mb-4 drop-shadow-lg leading-tight">
          Happy 21st Birthday, Akanksha!
        </h1>
        <p className="text-xl md:text-2xl font-parisienne text-akanksha-purple mb-6 animate-fade-in delay-200">
          My dearest Akanksha, on your special day, I wish you endless joy, love, and all the dreams your beautiful heart desires. Every moment with you is a cherished gift.
        </p>

        {/* Image Section */}
        <div className="relative group w-full max-w-md mx-auto mb-8 rounded-xl overflow-hidden shadow-xl border-4 border-akanksha-pink-dark transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <img
            src={usImage}
            alt="Shivam and Akanksha"
            className="w-full h-auto object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300 flex items-end justify-center p-4">
            <h2 className="text-white text-lg md:text-xl font-poppins font-light tracking-wide animate-fade-in delay-500">
              {imageTitle}
            </h2>
          </div>
        </div>

        <p className="text-lg md:text-xl text-akanksha-purple mt-6 font-semibold animate-fade-in delay-600">
          With all my love, <span className="font-great-vibes text-akanksha-pink-darkest text-2xl">Shivam</span>
        </p>
      </div>
    </div>
  );
}

export default MainPage;
