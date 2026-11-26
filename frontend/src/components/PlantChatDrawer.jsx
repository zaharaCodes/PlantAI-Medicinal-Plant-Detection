import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, MessageSquare, Flame, ShieldAlert, Pill } from 'lucide-react';
import axios from 'axios';
import { PLANTS_DATABASE } from '../data/plantsData';

export default function PlantChatDrawer({ isOpen, onClose, plantName }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Greetings! I am your Botanical Pharmacopeia Assistant. Ask me anything about ${plantName || 'medicinal plants'} — preparation, dosage, drug interactions, or Ayurvedic properties.`,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const plantInfo = PLANTS_DATABASE[plantName] || {};

  const handleSend = async (queryText) => {
    const q = (queryText || inputVal).trim();
    if (!q) return;

    // Add user message
    const userMsg = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      // Call Flask /ask endpoint
      const response = await axios.post(
        'http://127.0.0.1:5000/ask',
        { plant: plantName, question: q },
        { timeout: 4000 }
      );
      const botMsg = { sender: 'bot', text: response.data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      // Offline fallback answer generator from plantsData.js
      setTimeout(() => {
        let fallbackAns = '';
        const lowerQ = q.toLowerCase();

        if (lowerQ.includes('tea') || lowerQ.includes('prepare') || lowerQ.includes('brew')) {
          fallbackAns = `🍵 Traditional Preparation for ${plantInfo.commonName || plantName}:\n${plantInfo.preparation || 'Steep in freshly boiled water for 5-7 minutes.'}`;
        } else if (lowerQ.includes('safe') || lowerQ.includes('warning') || lowerQ.includes('pregnant')) {
          fallbackAns = `⚠️ Safety Warning & Contraindications:\n${plantInfo.warning || 'Exercise standard herbal precautions.'}`;
        } else if (lowerQ.includes('dosha') || lowerQ.includes('vata') || lowerQ.includes('pitta')) {
          const d = plantInfo.dosha || {};
          fallbackAns = `🌿 Ayurvedic Tridosha Balance:\n• Vata: ${d.vata || 'Balances'}\n• Pitta: ${d.pitta || 'Cools'}\n• Kapha: ${d.kapha || 'Pacifies'}`;
        } else if (lowerQ.includes('chemical') || lowerQ.includes('compound')) {
          fallbackAns = `🧪 Key Bioactive Phytochemicals:\n${(plantInfo.phytochemicals || []).join(', ') || 'Alkaloids, Flavonoids, Polyphenols'}`;
        } else {
          fallbackAns = `🌿 ${plantInfo.commonName || plantName} (${plantInfo.scientificName || ''}) Therapeutic Profile:\n${plantInfo.uses || 'Renowned medicinal herb.'}\n\nPreparation:\n${plantInfo.preparation || ''}`;
        }

        setMessages((prev) => [...prev, { sender: 'bot', text: fallbackAns }]);
        setIsTyping(false);
      }, 500);
      return;
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    { label: '🍵 How to prepare', query: 'How to prepare or brew this medicinal leaf?' },
    { label: '⚠️ Safety & Warnings', query: 'What are the safety warnings, dosage, and precautions?' },
    { label: '🌿 Ayurvedic Doshas', query: 'What is the Ayurvedic Tridosha balance for this plant?' },
    { label: '🧪 Bioactive Compounds', query: 'What are the primary bioactive phytochemical compounds?' },
  ];

  return (
    <div className="plant-chat-backdrop" onClick={onClose}>
      <div className="plant-chat-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chat-drawer-header">
          <div className="chat-header-title">
            <div className="bot-avatar-badge">
              <Bot size={20} color="#10B981" />
            </div>
            <div>
              <h3>Botanical Herbalist AI</h3>
              <span className="chat-specimen-indicator">Dossier: {plantName}</span>
            </div>
          </div>
          <button className="icon-btn-close" onClick={onClose} aria-label="Close Chat">
            <X size={18} />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="chat-quick-prompts">
          {quickPrompts.map((p) => (
            <button
              key={p.label}
              className="chat-prompt-pill"
              onClick={() => handleSend(p.query)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="chat-messages-body">
          {messages.map((m, idx) => (
            <div key={idx} className={`chat-bubble-row ${m.sender}`}>
              {m.sender === 'bot' && (
                <div className="chat-bot-icon">
                  <Sparkles size={14} color="#34D399" />
                </div>
              )}
              <div className={`chat-bubble ${m.sender}`}>
                <pre className="bubble-text">{m.text}</pre>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble-row bot">
              <div className="chat-bot-icon">
                <Sparkles size={14} color="#34D399" />
              </div>
              <div className="chat-bubble bot typing">
                <span className="dot d1" />
                <span className="dot d2" />
                <span className="dot d3" />
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          className="chat-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            placeholder={`Ask about ${plantName}'s benefits, brewing, safety...`}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="chat-text-input"
          />
          <button type="submit" className="chat-send-btn" disabled={!inputVal.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
