import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatBubble = () => {
  return (
    <button
      id="chat-bubble"
      aria-label="Open chat"
      className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer border-0 outline-none"
      style={{
        background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
      }}
    >
      <MessageCircle size={26} className="text-white" fill="white" stroke="none" />
    </button>
  );
};

export default ChatBubble;
