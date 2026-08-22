'use client';

import React, { useState } from 'react';
import { 
  MessageSquareText, 
  Mic, 
  Volume2, 
  Send, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowUpRight,
  Bot,
  User,
  Table
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface MandiItem {
  mandi: string;
  minRate: string;
  maxRate: string;
  modalRate: string;
}

interface ChatMessage {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
  audioText: string;
  lang: string;
  mandiData: MandiItem[] | null;
}

const SAMPLE_PROMPTS = [
  'What is the current Mandi price for Cotton in Maharashtra?',
  'How to prevent yellowing of leaves in Wheat (Yellow Rust)?',
  'Is soil pH 6.8 suitable for Mustard sowing in Punjab?',
  'How to apply for PM Kisan Samman Nidhi installment?',
  'Best organic spray for Aphid pest control?',
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: 'assistant',
    text: 'Namaste! I am your Farmitron AI Assistant. You can ask me questions about crop cultivation, leaf diseases, local Mandi market prices, or government agricultural subsidies in your regional language.',
    audioText: 'नमस्ते! मैं आपका फ़ार्मिट्रॉन एआई सहायक हूँ। आप मुझसे फसल चक्र, मंडी भाव या कीट नियंत्रण पर प्रश्न पूछ सकते हैं।',
    lang: 'Hindi / English',
    mandiData: null,
  },
];

export default function FarmAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
      audioText: '',
      lang: 'User Input',
      mandiData: null,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Simulate AI response based on topic
    setTimeout(() => {
      let aiText = "Based on your location telemetry and current season, here is the agronomic recommendation:";
      let audioTxt = "यहाँ आपकी फसल से संबंधित सुझाव दिए गए हैं:";
      let mandiDataList: MandiItem[] | null = null;

      if (text.toLowerCase().includes('mandi') || text.toLowerCase().includes('price') || text.toLowerCase().includes('cotton')) {
        aiText = "Current Agmarknet Mandi rates for Medium Staple Cotton in major Maharashtra markets (Per Quintal):";
        audioTxt = "महाराष्ट्र की प्रमुख मंडियों में कपास के ताज़ा भाव प्रस्तुत हैं।";
        mandiDataList = [
          { mandi: 'Rajura (Chandrapur)', minRate: '₹7,100', maxRate: '₹7,550', modalRate: '₹7,400' },
          { mandi: 'Amravati', minRate: '₹7,000', maxRate: '₹7,480', modalRate: '₹7,350' },
          { mandi: 'Yavatmal', minRate: '₹6,950', maxRate: '₹7,420', modalRate: '₹7,280' },
        ];
      } else if (text.toLowerCase().includes('yellow') || text.toLowerCase().includes('wheat')) {
        aiText = "Yellowing in wheat foliage is often caused by Nitrogen deficit or Yellow Rust (Puccinia striiformis). Check if yellow powder rubs off on your fingers. If yes, spray Propiconazole 25% EC @ 1ml/liter water immediately.";
        audioTxt = "गेहूँ में पीलापन नाइट्रोजन की कमी या येलो रस्ट का लक्षण है। प्रोपिकोनाज़ोल का छिड़काव करें।";
      } else if (text.toLowerCase().includes('mustard') || text.toLowerCase().includes('ph')) {
        aiText = "Yes! Soil pH 6.8 is in the 98th percentile optimal range for Mustard (Sarson). Alluvial soils with pH 6.5–7.2 achieve maximum nutrient uptake for oilseed crops.";
        audioTxt = "हाँ! मिट्टी का पीएच 6.8 सरसों की बुआई के लिए बिल्कुल उत्तम है।";
      } else {
        aiText = "For smallholder farmers, we recommend maintaining a split nitrogen application and incorporating bio-fungicides like Trichoderma to protect root health.";
        audioTxt = "फ़सल स्वास्थ्य बनाए रखने के लिए समय पर जैविक खाद का प्रयोग करें।";
      }

      const aiMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: aiText,
        audioText: audioTxt,
        lang: 'Farmitron Advisor',
        mandiData: mandiDataList,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputValue("गेहूँ में यूरिया कब डालना चाहिए?");
      }, 2500);
    }
  };

  const playAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* HEADER SECTION */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EDE5D4] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="sand" icon={<Sparkles className="w-3.5 h-3.5 text-[#2F6B45]" />}>
              Multilingual Agronomic Voice Assistant
            </Badge>
            <span className="text-xs font-mono text-[#66706A]">Zero Jargon Model</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#17221C] tracking-tight">
            Farmitron AI Conversational Assistant
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <select className="px-3 py-1.5 rounded-xl border border-[#EDE5D4] bg-[#F7F5EF] text-xs font-semibold text-[#17221C]">
            <option>🇮🇳 Hindi (हिंदी)</option>
            <option>🇮🇳 Punjabi (ਪੰਜਾਬੀ)</option>
            <option>🇮🇳 Marathi (मराठी)</option>
            <option>🇮🇳 Telugu (తెలుగు)</option>
            <option>🇬🇧 English</option>
          </select>
        </div>
      </div>

      {/* CHAT MESSAGES DISPLAY WINDOW */}
      <div className="bg-white rounded-3xl p-6 border border-[#EDE5D4] shadow-sm min-h-[420px] max-h-[550px] overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-9 h-9 rounded-xl bg-[#16352B] text-[#D6A84A] flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4" />
              </div>
            )}

            <div
              className={`p-4 md:p-5 rounded-3xl max-w-[85%] space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-[#2F6B45] text-white rounded-tr-none'
                  : 'bg-[#F7F5EF] border border-[#EDE5D4] text-[#17221C] rounded-tl-none'
              }`}
            >
              <div className="flex items-center justify-between text-xs pb-1 border-b border-black/10">
                <span className="font-bold">{msg.sender === 'user' ? 'You (Farmer)' : 'Farmitron AI Advisor'}</span>
                
                {msg.sender === 'assistant' && (
                  <button
                    onClick={playAudio}
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isPlayingAudio
                        ? 'bg-[#2F6B45] text-white animate-pulse'
                        : 'bg-[#EDE5D4] text-[#16352B] hover:bg-[#6E9F5B] hover:text-white'
                    }`}
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>{isPlayingAudio ? 'Playing...' : 'Suno / Listen'}</span>
                  </button>
                )}
              </div>

              <p className="text-sm leading-relaxed">{msg.text}</p>

              {/* MANDI DATA TABLE IF PRESENT */}
              {msg.mandiData && (
                <div className="bg-white p-3 rounded-xl border border-[#EDE5D4] overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#EDE5D4] text-[#66706A]">
                        <th className="py-1">Mandi Market</th>
                        <th className="py-1">Min Rate</th>
                        <th className="py-1">Max Rate</th>
                        <th className="py-1 text-[#2F6B45]">Modal Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDE5D4]">
                      {msg.mandiData.map((m, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5 font-bold text-[#17221C]">{m.mandi}</td>
                          <td className="py-1.5 text-[#66706A]">{m.minRate}</td>
                          <td className="py-1.5 text-[#66706A]">{m.maxRate}</td>
                          <td className="py-1.5 font-extrabold text-[#2F6B45]">{m.modalRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

            {msg.sender === 'user' && (
              <div className="w-9 h-9 rounded-xl bg-[#EDE5D4] text-[#16352B] flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                🌾
              </div>
            )}
          </div>
        ))}
      </div>

      {/* QUICK SUGGESTED PROMPT PILLS */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#66706A] block">
          Suggested Agronomic Prompts
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#EDE5D4] text-[#17221C] hover:border-[#2F6B45] hover:bg-[#F7F5EF] transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* INPUT FORM & VOICE SIMULATION BAR */}
      <div className="bg-white rounded-3xl p-3 border border-[#EDE5D4] shadow-md flex items-center gap-3">
        <button
          onClick={toggleRecording}
          className={`p-3 rounded-2xl transition-all ${
            isRecording
              ? 'bg-red-500 text-white animate-ping'
              : 'bg-[#16352B] text-[#D6A84A] hover:bg-[#2F6B45]'
          }`}
          title="Hold or Click for Voice Input"
        >
          <Mic className="w-5 h-5" />
        </button>

        {isRecording ? (
          <div className="flex-grow flex items-center gap-2 text-xs text-red-600 font-bold animate-pulse px-2">
            <span>Listening to Voice Prompt... Speak now in Hindi or English</span>
          </div>
        ) : (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your question (e.g., Best crop for low rainfall area in Rabi)..."
            className="flex-grow p-2.5 text-sm text-[#17221C] bg-transparent focus:outline-none placeholder-[#66706A]"
          />
        )}

        <button
          onClick={() => handleSendMessage()}
          className="p-3 rounded-2xl bg-[#2F6B45] text-white hover:bg-[#16352B] transition-colors shadow-xs"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
