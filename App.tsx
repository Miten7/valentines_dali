import React, { useState, useEffect } from "react";
import Proposal from "./components/Proposal";
import Envelope from "./components/Envelope";
import FloatingHearts from "./components/FloatingHearts";
import { AppState, ValentineData } from "./types";

// ==================================================================================
// ❤ CUSTOMIZE YOUR VALENTINE'S GIFT HERE ❤
// ==================================================================================
const GIFT_DATA: ValentineData = {
  // 1. Her Name (Replace this!)
  recipientName: "Dalisha Mrinali Seevlall",

  // 2. Your Name (Replace this!)
  senderName: "Miten",

  // 3. Custom Card Cover Image
  // HOW TO USE YOUR OWN PHOTO:
  // 1. Place your image file (e.g., 'us.jpg') in the 'public' folder of this project.
  // 2. Change the line below to: coverImage: "./us.jpg",
  //
  // You can also use a link from the internet.
  // If you leave this empty (""), it will use a cute animated design instead.
  coverImage: "./3258717.jpg",

  opening: "mera pari, janemaan & thodasa pagal cutie pie,",

  // 4. Your Personal Message
  // (The animation will type this out like a typewriter!)
  // Use \n for new lines.
  message: `  I spent so much time making this e-card work, I didn't really think about what I wanna write on it ;)
  It's 1.30am here on Valentine's and tu kitni door hain. I miss you alot, you would be chipku with me rn on a normal weekend. I miss our laughs, the shana remarks & expressions you make with them.
  We have come from our bustop to our 3rd Valentines together (and hopefully to Mexico soon ;). You have truly changed my life for the better, and I am very grateful for you.
  I hope you like this lil card, I did add the two hathi on the card, but when you come back imma be ripped, so make sure you're not thuso-ing too much on the chota tapu. Enjoy your time with family, beach pe matako and come back soon!`,
};
// ==================================================================================

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.PROPOSAL);

  // Personalized Tab Title
  useEffect(() => {
    document.title = `For ${GIFT_DATA.recipientName} ❤️`;
  }, []);

  const handleAcceptProposal = () => {
    setAppState(AppState.ENVELOPE);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 relative overflow-hidden">
      <FloatingHearts />

      {appState === AppState.PROPOSAL && (
        <Proposal
          recipientName={GIFT_DATA.recipientName}
          onAccept={handleAcceptProposal}
        />
      )}

      {(appState === AppState.ENVELOPE || appState === AppState.READING) && (
        <Envelope data={GIFT_DATA} />
      )}
    </div>
  );
};

export default App;
