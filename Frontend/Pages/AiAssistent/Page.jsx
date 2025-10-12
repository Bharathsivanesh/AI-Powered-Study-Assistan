// export default function AiAssistent() {
//   return <h1 className="text-2xl font-semibold">Welcome to AiAssistent</h1>;
// }
import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

const AiAssistent = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I help you today?", isBot: true },
    {
      id: 2,
      text: "Sure, I can help with that. What topic would you like me to explain?",
      isBot: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        isBot: false,
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "I understand your question. Let me help you with that...",
          isBot: true,
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-500 mb-2">
            Chat with your AI tutor
          </h1>
          <p className="text-green-500 text-lg">
            Get personalized explanations
          </p>
        </div>

        {/* Main Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`flex items-start max-w-xs lg:max-w-md ${
                    message.isBot
                      ? "bg-green-100 text-green-800"
                      : "bg-green-500 text-white"
                  } rounded-2xl p-4`}
                >
                  <div className="mr-3 mt-1">
                    {message.isBot ? (
                      <Bot size={20} className="text-green-600" />
                    ) : (
                      <User size={20} className="text-white" />
                    )}
                  </div>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-green-200 p-4 bg-white">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 border-2 border-green-200 rounded-full px-4 py-3 text-green-800 placeholder-green-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
              />
              <div className="flex items-center gap-2">
               
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  <Send size={25}  className="rotate-45"  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistent;
