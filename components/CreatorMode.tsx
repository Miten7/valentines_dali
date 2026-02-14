import React, { useState } from 'react';
import { generateRomanticMessage } from '../services/geminiService';
import { Loader2, Copy, Check, Sparkles, Heart } from 'lucide-react';

const CreatorMode: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('Sweet and sincere');
  const [extras, setExtras] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateAI = async () => {
    if (!recipient) {
      alert("Please enter her name first!");
      return;
    }
    setIsGenerating(true);
    try {
      const msg = await generateRomanticMessage(recipient, tone, extras);
      setMessage(msg);
    } catch (e) {
      console.error(e);
      alert("Failed to generate message. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateLink = () => {
    if (!recipient || !message) return;
    
    const params = new URLSearchParams();
    params.set('to', recipient);
    params.set('from', sender);
    params.set('msg', encodeURIComponent(message));
    
    // Construct URL with hash to handle client-side routing logic in App.tsx
    const baseUrl = window.location.href.split('#')[0];
    const finalUrl = `${baseUrl}#/?${params.toString()}`;
    setGeneratedLink(finalUrl);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 z-10 relative">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-lg w-full border-2 border-pink-100">
        <div className="text-center mb-6">
          <div className="inline-flex justify-center items-center bg-pink-100 p-3 rounded-full mb-4">
            <Heart className="text-pink-600 fill-pink-600 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Your Valentine</h1>
          <p className="text-gray-600 mt-2">Design a perfect virtual gift for her.</p>
        </div>

        {!generatedLink ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Who is it for?</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                placeholder="Her Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                placeholder="Your Name (Optional)"
              />
            </div>

            <div className="border-t border-pink-100 pt-4 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">The Message</label>
              
              <div className="flex gap-2 mb-2">
                 <input 
                   value={tone} 
                   onChange={(e) => setTone(e.target.value)}
                   className="flex-1 px-3 py-1 text-sm border border-gray-200 rounded-lg"
                   placeholder="Tone (e.g., Funny, Deeply Romantic)"
                 />
                 <input 
                   value={extras} 
                   onChange={(e) => setExtras(e.target.value)}
                   className="flex-1 px-3 py-1 text-sm border border-gray-200 rounded-lg"
                   placeholder="Keywords (e.g., Long distance, Pizza)"
                 />
              </div>

              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition resize-none custom-scrollbar"
                  placeholder="Write something sweet..."
                />
                <button
                  onClick={handleGenerateAI}
                  disabled={isGenerating || !process.env.API_KEY}
                  className="absolute bottom-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg shadow-md hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-xs font-bold"
                >
                  {isGenerating ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  {process.env.API_KEY ? "AI Assist" : "No API Key"}
                </button>
              </div>
            </div>

            <button
              onClick={handleCreateLink}
              disabled={!recipient || !message}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
            >
              Create Gift Link
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="inline-block bg-green-100 p-2 rounded-full mb-2">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-green-800 font-bold">Link Created!</h3>
              <p className="text-green-700 text-sm">Send this link to {recipient}.</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                readOnly
                value={generatedLink}
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 truncate"
              />
              <button
                onClick={copyToClipboard}
                className="bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 transition"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            <a 
              href={generatedLink} 
              target="_blank" 
              rel="noreferrer"
              className="block w-full text-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition"
            >
              Test Link (Open in New Tab)
            </a>
            
            <button
               onClick={() => setGeneratedLink('')}
               className="block w-full text-center text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Create Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorMode;
