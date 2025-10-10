import React, { useEffect, useState, useRef, useCallback } from 'react';

const FloatingMessage = ({ message, id, onRemove }) => {
  // All hooks must be called at the top level of the component function
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const messageRef = useRef(null); // This is the useRef in question

  // Using useCallback for onRemove to ensure stability if passed from parent frequently
  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  useEffect(() => {
    // Set initial random position, rotation, and scale
    const initialX = Math.random() * (window.innerWidth - 300); // Avoid going off screen initially
    const initialY = Math.random() * (window.innerHeight - 100);
    const initialRotation = Math.random() * 20 - 10; // -10 to 10 degrees
    const initialScale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2

    setPosition({ x: initialX, y: initialY });
    setRotation(initialRotation);
    setScale(initialScale);

    // Determine a random direction and speed for floating
    const speed = 0.5 + Math.random() * 0.5; // Pixels per frame
    const angle = Math.random() * Math.PI * 2; // Full circle
    let directionX = Math.cos(angle);
    let directionY = Math.sin(angle);

    let animationFrameId;

    const animate = () => {
      if (!messageRef.current) {
        // If the ref is null, the component might have unmounted, stop animation
        return;
      }

      setPosition(prev => {
        let newX = prev.x + directionX * speed;
        let newY = prev.y + directionY * speed;

        const rect = messageRef.current.getBoundingClientRect();

        // Bounce off walls
        // Add a small padding (e.g., 20px) to prevent messages from sticking to edges
        const padding = 20;
        if (newX + rect.width > window.innerWidth - padding || newX < padding) {
          directionX *= -1;
          newX = prev.x + directionX * speed;
        }
        if (newY + rect.height > window.innerHeight - padding || newY < padding) {
          directionY *= -1;
          newY = prev.y + directionY * speed;
        }

        return { x: newX, y: newY };
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Remove message after a certain time (e.g., 20-30 seconds)
    const timeoutDuration = 20000 + Math.random() * 10000; // 20 to 30 seconds
    const timeoutId = setTimeout(() => {
      handleRemove(); // Use the useCallback version
    }, timeoutDuration);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [handleRemove]); // Dependency array: only re-run if handleRemove changes (which it won't much)

  return (
    <div
      ref={messageRef}
      className="absolute bg-white bg-opacity-80 p-4 rounded-xl shadow-lg border border-akanksha-pink-lighter text-center font-parisienne text-lg text-akanksha-purple cursor-default select-none animate-fade-in"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`, // Centering the message and applying transforms
        zIndex: 10 + Math.floor(scale * 10), // Larger messages appear slightly above
        minWidth: '150px',
        maxWidth: '300px',
        pointerEvents: 'none' // Prevent interaction with floating messages
      }}
    >
      {message}
      
    </div>
  );
};

export default FloatingMessage;