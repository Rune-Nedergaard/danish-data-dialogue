
import React from 'react';
import { AppProvider } from '@/context/AppContext';
import { ThemeProvider } from '@/hooks/use-theme';
import AppHeader from '@/components/AppHeader';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';

const Index = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <AppProvider>
        <div className="flex flex-col min-h-screen">
          <AppHeader />
          <main className="flex-1 overflow-hidden flex flex-col">
            <MessageList />
            <MessageInput />
          </main>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
};

export default Index;
