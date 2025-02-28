
import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Eraser, SendHorizonal, Sparkles } from 'lucide-react';
import { SuggestedQuery } from '@/types';
import { toast } from 'sonner';

export default function MessageInput() {
  const { addMessage, isProcessing, clearMessages, language, suggestedQueries } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isProcessing) return;
    
    addMessage({
      content: inputValue.trim(),
      role: 'user',
    });
    
    setInputValue('');
    
    // Refocus the input after submission
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Don't submit when user is composing (e.g., using IME for languages like Japanese, Chinese)
    if (isComposing) return;
    
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestedQuery = (query: SuggestedQuery) => {
    if (isProcessing) return;
    
    setInputValue(query.text);
    
    // Focus and scroll to end of input
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
  };

  const handleClearChat = () => {
    clearMessages();
    toast.success(
      language === 'en' 
        ? 'Chat history cleared' 
        : 'Chathistorik ryddet'
    );
  };

  return (
    <div className="border border-danish-gray-200 dark:border-danish-gray-800 bg-white dark:bg-danish-gray-900 rounded-xl shadow-sm">
      <div className="p-4">
        {/* Suggested queries */}
        <div className="mb-4 overflow-x-auto pb-2 flex items-center space-x-2">
          <div className="flex-none flex items-center justify-center bg-danish-gray-50 dark:bg-danish-gray-800 rounded-full p-1 mr-1">
            <Sparkles className="h-3.5 w-3.5 text-danish-blue" />
          </div>
          {suggestedQueries.map((query) => (
            <button
              key={query.id}
              onClick={() => handleSuggestedQuery(query)}
              disabled={isProcessing}
              className="flex-none px-3 py-1.5 text-xs text-danish-gray-700 dark:text-danish-gray-300 bg-danish-gray-50 hover:bg-danish-gray-100 dark:bg-danish-gray-800 dark:hover:bg-danish-gray-700 rounded-full transition-colors duration-200 whitespace-nowrap"
            >
              {query.text}
            </button>
          ))}
        </div>
        
        {/* Input form */}
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder={language === 'en' ? 'Ask about Danish statistics...' : 'Spørg om dansk statistik...'}
            disabled={isProcessing}
            className="min-h-24 resize-none rounded-lg py-3 pr-20 border-danish-gray-200 dark:border-danish-gray-700 focus-visible:ring-danish-blue focus-visible:ring-opacity-50 transition-all duration-200 input-field-focus text-danish-gray-800 dark:text-danish-gray-200 placeholder:text-danish-gray-400 dark:placeholder:text-danish-gray-500"
          />
          
          <div className="absolute right-3 bottom-3 flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClearChat}
              disabled={isProcessing}
              className="h-8 w-8 rounded-md text-danish-gray-500 hover:text-danish-gray-700 dark:text-danish-gray-400 dark:hover:text-danish-gray-200"
            >
              <Eraser className="h-4 w-4" />
              <span className="sr-only">{language === 'en' ? 'Clear chat' : 'Ryd chat'}</span>
            </Button>
            
            <Button
              type="submit"
              disabled={isProcessing || !inputValue.trim()}
              className="h-8 rounded-md bg-danish-blue hover:bg-danish-blue-dark transition-colors duration-200 px-3 py-1"
            >
              <SendHorizonal className="h-4 w-4 mr-1" />
              <span className="text-xs">{language === 'en' ? 'Send' : 'Send'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
