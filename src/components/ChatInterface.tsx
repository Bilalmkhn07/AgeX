import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';
import type { CalculationResult } from '../utils/biologicalAgeCalculator';

interface ChatInterfaceProps {
  result: CalculationResult;
  apiKey?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface({ result, apiKey }: ChatInterfaceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm your AI Longevity Scientist. I've analyzed your profile and created your personalized protocol. Ask me anything about your results, how the therapy works, or longevity science in general!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Why is my biological age higher than my chronological age?",
    "How does the mRNA therapy work?",
    "What are the side effects?",
    "How is this different from standard anti-aging treatments?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // If API key is available, use Claude API
      if (apiKey) {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-5-20250514',
            max_tokens: 500,
            messages: [
              {
                role: 'user',
                content: `You are the AI Longevity Scientist for AgeX. You're explaining personalized anti-aging therapy to a user.

User's data:
- Chronological Age: ${result.chronologicalAge}
- Current Biological Age: ${result.biologicalAge}
- Optimized Biological Age: ${result.optimizedAge}
- Protocol: ${result.protocolDetails.dosesCount} doses over ${result.protocolDetails.durationWeeks} weeks
- Target Tissues: ${result.protocolDetails.targetTissues.join(', ')}
- Optimization Score: ${result.protocolDetails.optimizationScore}%

Answer their question in a warm, confident, scientifically-grounded way. Reference their specific data when relevant. Keep response concise (2-3 paragraphs max). Use analogies to explain complex concepts. Always emphasize safety and personalization.

Question: ${messageText}`,
              },
            ],
          }),
        });

        const data = await response.json();
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.content[0].text,
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Fallback responses without API key
        const fallbackResponse = generateFallbackResponse(messageText, result);
        const assistantMessage: Message = {
          role: 'assistant',
          content: fallbackResponse,
        };
        setTimeout(() => {
          setMessages(prev => [...prev, assistantMessage]);
          setIsLoading(false);
        }, 1000);
        return;
      }
    } catch (error) {
      console.error('Error calling Claude API:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm having trouble connecting right now. But I can tell you that your protocol is carefully designed based on your age, lifestyle factors, and biological markers. It uses mRNA technology to safely activate telomerase at optimal levels.",
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const generateFallbackResponse = (question: string, result: CalculationResult): string => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('biological age') && lowerQ.includes('higher')) {
      return `Your biological age of ${result.biologicalAge} is slightly higher than your chronological age of ${result.chronologicalAge} due to lifestyle factors like sleep, stress, exercise, and diet. Think of it like a car's condition versus its model year - the wear and tear on your cells tells a different story than the calendar. The good news? Our AI protocol can reverse this by ${(result.biologicalAge - result.optimizedAge).toFixed(1)} years!`;
    }
    
    if (lowerQ.includes('mrna') || lowerQ.includes('work') || lowerQ.includes('therapy')) {
      return `Your protocol uses modified TERT mRNA - essentially, genetic instructions that tell your cells to temporarily produce telomerase, the enzyme that maintains telomeres (chromosome protective caps). Delivered via ${result.protocolDetails.lnpFormulation}, it's like sending a software update to your cells. The treatment consists of ${result.protocolDetails.dosesCount} precise doses over ${result.protocolDetails.durationWeeks} weeks, targeting your ${result.protocolDetails.targetTissues.join(', ')} tissues.`;
    }
    
    if (lowerQ.includes('side effect') || lowerQ.includes('safe')) {
      return `Safety is our #1 priority. Unlike traditional approaches that risk excessive telomerase activation (cancer risk), our AI has identified your precise therapeutic window with ${result.metrics.safetyWindowConfidence}% confidence. The protocol operates in the "Goldilocks zone" - enough activation for rejuvenation, but carefully controlled to avoid any oncogenic risk. Plus, your protocol adapts in real-time based on your body's response.`;
    }
    
    if (lowerQ.includes('different') || lowerQ.includes('standard') || lowerQ.includes('traditional')) {
      return `Traditional anti-aging treatments use one-size-fits-all dosing and static protocols. Your AI-optimized approach is completely different: (1) It's personalized to YOUR biology, (2) It uses reinforcement learning to find your exact therapeutic window, and (3) It adapts continuously based on 50+ biomarkers. That's why it delivers ${((result.biologicalAge - result.optimizedAge) / 3 * 100).toFixed(0)}% better results than standard telomerase therapy.`;
    }
    
    return `That's a great question! Your personalized protocol is designed to reverse ${(result.biologicalAge - result.optimizedAge).toFixed(1)} years of biological aging safely. With ${result.metrics.protocolConfidence}% confidence and ${result.metrics.optimizationCycles.toLocaleString()} optimization cycles, we've found the perfect balance for your unique profile. The key is continuous monitoring and adaptation - your protocol evolves with your body's response.`;
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 z-50 hover:scale-110 transition-transform"
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] glass rounded-2xl border border-white/20 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center">
              <Sparkles className="w-6 h-6 text-white mr-3" />
              <div className="flex-1">
                <h3 className="font-bold text-white">AI Longevity Scientist</h3>
                <p className="text-xs text-purple-100">Ask me anything</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-white/10 text-gray-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 rounded-2xl p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (only show if first message) */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
                <div className="space-y-2">
                  {suggestedQuestions.slice(0, 2).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className="w-full text-left text-xs bg-white/5 hover:bg-white/10 rounded-lg p-2 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

