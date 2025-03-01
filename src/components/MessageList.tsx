import React, { useRef, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import MessageItem from '@/components/MessageItem';
export default function MessageList() {
  const {
    messages
  } = useAppContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return <div className="flex-1 overflow-y-auto py-6 space-y-6 px-[16px]">
      {messages.map(message => <MessageItem key={message.id} message={message} />)}
      <div ref={messagesEndRef} />
    </div>;
}