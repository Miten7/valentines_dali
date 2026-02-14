import React, { useState } from "react";
import { Typewriter } from "./Typewriter";
import { ValentineData } from "../types";
import { Heart } from "lucide-react";

interface EnvelopeProps {
  data: ValentineData;
}

const Envelope: React.FC<EnvelopeProps> = ({ data }) => {
  const [step, setStep] = useState<"ENVELOPE" | "CARD_CLOSED" | "CARD_OPEN">(
    "ENVELOPE",
  );
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleEnvelopeClick = () => {
    if (step !== "ENVELOPE") return;
    setEnvelopeOpen(true);
    // Sequence: Open envelope (0.5s) -> Slide card up (1s) -> Switch to Card View
    setTimeout(() => {
      setStep("CARD_CLOSED");
    }, 1500);
  };

  const handleCardClick = () => {
    if (step === "CARD_CLOSED") {
      setStep("CARD_OPEN");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 z-10 relative overflow-hidden perspective-1500">
      {/* ==================== STEP 1: ENVELOPE ==================== */}
      {step === "ENVELOPE" && (
        <div
          className="relative w-72 h-48 md:w-96 md:h-64 cursor-pointer floating transition-transform duration-500 hover:scale-105 animate-in fade-in zoom-in duration-700"
          onClick={handleEnvelopeClick}
        >
          {/* Envelope Body (Back) */}
          <div className="absolute inset-0 bg-red-700 rounded-lg shadow-2xl"></div>

          {/* Card Inside (Peeking) - This slides up when envelopeOpen is true */}
          <div
            className={`absolute left-4 right-4 bg-pink-100 transition-all duration-1000 ease-in-out rounded-lg shadow-sm flex items-center justify-center z-10`}
            style={{
              top: envelopeOpen ? "-150px" : "8px",
              height: "140px",
              transitionDelay: "500ms", // Wait for flap to open
            }}
          >
            <Heart className="text-red-400 w-12 h-12 fill-red-400" />
          </div>

          {/* Envelope Flap */}
          <div
            className="absolute top-0 left-0 w-0 h-0 border-l-[9rem] md:border-l-[12rem] border-r-[9rem] md:border-r-[12rem] border-t-[6rem] md:border-t-[8rem] border-l-transparent border-r-transparent border-t-red-800 rounded-t-lg z-20 origin-top transition-transform duration-500 ease-in-out"
            style={{
              transform: envelopeOpen ? "rotateX(180deg)" : "rotateX(0deg)",
              zIndex: envelopeOpen ? 0 : 30,
            }}
          ></div>

          {/* Envelope Front (Left & Right) */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[6rem] md:border-t-[8rem] border-b-[6rem] md:border-b-[8rem] border-l-[9rem] md:border-l-[12rem] border-t-transparent border-b-red-600 border-l-red-600 rounded-bl-lg z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[6rem] md:border-t-[8rem] border-b-[6rem] md:border-b-[8rem] border-r-[9rem] md:border-r-[12rem] border-t-transparent border-b-red-600 border-r-red-600 rounded-br-lg z-20 pointer-events-none"></div>
        </div>
      )}

      {/* ==================== STEP 2 & 3: 3D CARD ==================== */}
      {step !== "ENVELOPE" && (
        <div className="relative w-full max-w-6xl h-[60vh] md:h-[500px] flex items-center justify-center transition-all duration-1000">
          {/* The Book/Card Container (wider, original height preserved) */}
          <div
            className="relative w-[90vw] md:w-[820px] h-full transition-all duration-1000 ease-in-out preserve-3d cursor-pointer"
            style={{
              // Expand width when the card is open to give more room for text
              width:
                step === "CARD_OPEN"
                  ? window.innerWidth >= 768
                    ? "960px"
                    : "96vw"
                  : undefined,
              // Desktop: Shift left when closed so the right half (cover) is centered.
              // When open, remove shift so the whole book is centered.
              // Mobile: No shift, just flip in place.
              transform:
                step === "CARD_OPEN"
                  ? "translateX(0)"
                  : window.innerWidth >= 768
                    ? "translateX(-25%)"
                    : "translateX(0)",
            }}
            onClick={handleCardClick}
          >
            {/* BACK PAGE (Static Right Side - The Design) */}
            <div
              className="absolute right-0 top-0 w-full md:w-1/2 h-full bg-pink-50 rounded-r-lg shadow-xl border-l border-pink-100 flex flex-col items-center justify-center p-6 text-center overflow-hidden hidden md:flex"
              style={{ zIndex: 0 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Heart className="w-24 h-24 text-red-300" />
              </div>
              <div className="absolute bottom-0 left-0 p-4 opacity-20">
                <Heart className="w-16 h-16 text-red-300" />
              </div>

              {/* Spine Shadow */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/5 to-transparent z-10"></div>

              <h2 className="handwritten text-5xl text-red-600 mb-4 transform -rotate-6">
                Happy
                <br />
                Valentine's
                <br />
                Day!
              </h2>
              <div className="mt-4 flex gap-2">
                <Heart
                  className="w-6 h-6 text-red-500 fill-red-500 animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
                <Heart
                  className="w-8 h-8 text-red-500 fill-red-500 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <Heart
                  className="w-6 h-6 text-red-500 fill-red-500 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>

              {/* Signature moved to right page so left page has more space */}
              {step === "CARD_OPEN" && (
                <div className="absolute bottom-6 right-6 text-center">
                  <p className="handwritten text-lg text-red-600">
                    With dher sara love,
                  </p>
                  <p className="handwritten text-2xl text-red-500 font-bold">
                    {data.senderName}
                  </p>
                </div>
              )}
            </div>

            {/* FRONT FLAP (Rotates) */}
            <div
              className="absolute top-0 right-0 w-full md:w-1/2 h-full transition-transform duration-1000 ease-in-out preserve-3d md:origin-left origin-center shadow-2xl"
              style={{
                transform:
                  step === "CARD_OPEN" ? "rotateY(-180deg)" : "rotateY(0deg)",
                zIndex: 10,
              }}
            >
              {/* FRONT FACE (Cover) */}
              <div
                className="absolute inset-0 bg-pink-50 rounded-lg md:rounded-r-lg md:rounded-l-none overflow-hidden border border-pink-200 shadow-xl"
                style={{ backfaceVisibility: "hidden", zIndex: 2 }}
              >
                {data.coverImage && !imageError ? (
                  <img
                    src={data.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  /* CSS RECREATION OF THE ELEPHANT IMAGE AS FALLBACK */
                  <div className="w-full h-full bg-pink-50 flex flex-col items-center justify-center p-6 relative overflow-hidden border-2 border-dashed border-pink-200">
                    {/* Decorative background elements */}
                    <div className="absolute top-10 left-10 text-pink-200 animate-pulse">
                      ★
                    </div>
                    <div
                      className="absolute top-20 right-20 text-pink-200 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    >
                      ★
                    </div>
                    <div
                      className="absolute bottom-20 left-16 text-pink-200 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    >
                      ★
                    </div>

                    {/* White heart shape background behind elephants */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 w-64 h-56 bg-white rounded-[100%] blur-xl opacity-60"></div>

                    {/* Elephants Container */}
                    <div className="relative z-10 flex items-end justify-center -space-x-4 mb-2">
                      {/* Left Elephant */}
                      <div className="transform -scale-x-100 text-6xl md:text-8xl relative -rotate-6">
                        🐘
                      </div>

                      {/* Hearts rising from trunks */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 flex flex-col items-center mb-2">
                        <Heart
                          className="w-6 h-6 text-pink-500 fill-pink-500 animate-bounce"
                          style={{ animationDuration: "2s" }}
                        />
                        <Heart
                          className="w-4 h-4 text-pink-400 fill-pink-400 animate-bounce"
                          style={{
                            animationDuration: "2s",
                            animationDelay: "0.2s",
                          }}
                        />
                      </div>

                      {/* Right Elephant */}
                      <div className="text-6xl md:text-8xl relative rotate-6">
                        🐘
                      </div>
                    </div>

                    {/* Text */}
                    <h1 className="handwritten text-pink-500 text-5xl md:text-6xl text-center font-bold leading-tight z-10 drop-shadow-sm">
                      Be My
                      <br />
                      <span className="text-pink-600">Valentine</span>
                    </h1>

                    <p className="absolute bottom-4 text-pink-300 text-[10px] uppercase tracking-widest">
                      Click to Open
                    </p>
                  </div>
                )}
              </div>

              {/* BACK FACE (Inside Left - Message) */}
              <div
                className="absolute inset-0 bg-white rounded-lg md:rounded-l-lg md:rounded-r-none flex flex-col p-4 md:p-6 transform rotate-y-180 overflow-hidden custom-scrollbar"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="w-full h-full rounded relative flex flex-col">
                  {/* (star removed) reduced padding so more text fits on left page */}

                  <div className="px-2 md:px-4 pt-2 pb-4 flex-grow whitespace-pre-wrap">
                    {/* Recipient header in same red as signature */}
                    <div className="mb-2">
                      <p className="handwritten text-base md:text-lg text-red-500">
                        To {data.opening}
                      </p>
                    </div>
                    {step === "CARD_OPEN" && (
                      <Typewriter
                        text={data.message}
                        speed={45}
                        startDelay={1000}
                      />
                    )}
                  </div>

                  {/* signature removed from left page */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .perspective-1500 {
            perspective: 1500px;
        }
        .preserve-3d {
            transform-style: preserve-3d;
        }
        /* Rotate Y 180 class utility */
        .rotate-y-180 {
            transform: rotateY(180deg);
        }
        /* Hide scrollbar for clean look but allow scroll */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Envelope;
