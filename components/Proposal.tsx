import React, { useState } from 'react';

interface ProposalProps {
  recipientName: string;
  onAccept: () => void;
}

const Proposal: React.FC<ProposalProps> = ({ recipientName, onAccept }) => {
  const [noBtnStyle, setNoBtnStyle] = useState<React.CSSProperties>({}); 
  const [hoverCount, setHoverCount] = useState(0);

  const moveButton = () => {
    const x = Math.random() * 80 + 10; // 10% to 90% of screen width
    const y = Math.random() * 80 + 10; // 10% to 90% of screen height
    
    setNoBtnStyle({
      position: 'fixed',
      top: `${y}%`,
      left: `${x}%`,
      transition: 'all 0.3s ease-out',
      zIndex: 50, // Ensure it stays on top
    });
    setHoverCount(prev => prev + 1);
  };

  const getNoButtonText = () => {
    const texts = ["No", "Are you sure?", "Really?", "Think again!", "Last chance!", "Pretty please?", "Don't do this!", "Have a heart!"];
    return texts[Math.min(hoverCount, texts.length - 1)];
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center z-10 relative p-4 text-center">
      <div className="floating mb-8">
        <h1 className="text-5xl md:text-7xl font-bold text-red-500 drop-shadow-sm handwritten">
          {recipientName ? `Dearest ${recipientName},` : 'Hey there,'}
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mt-4 handwritten">
          Will you be my Valentine?
        </h2>
      </div>

      <div className="mt-12 flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-2xl relative">
        <button
          onClick={onAccept}
          className="bg-green-500 hover:bg-green-600 text-white text-xl md:text-2xl font-bold py-4 px-12 rounded-full shadow-lg transform transition hover:scale-110 active:scale-95 z-20"
        >
          YES! ❤
        </button>

        <button
          onMouseEnter={moveButton}
          onClick={moveButton} // For mobile tap
          style={noBtnStyle}
          className="bg-gray-300 text-gray-700 text-lg font-bold py-3 px-8 rounded-full shadow-md z-10 whitespace-nowrap hover:bg-red-100 transition-colors duration-200"
        >
          {getNoButtonText()}
        </button>
      </div>
      
      {hoverCount > 5 && (
        <p className="fixed bottom-10 left-0 w-full text-center text-gray-500 animate-pulse text-sm">
          (The "No" button is just playing hard to get...)
        </p>
      )}
    </div>
  );
};

export default Proposal;