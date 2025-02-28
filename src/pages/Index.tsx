
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
        <div className="flex flex-col min-h-screen bg-white dark:bg-danish-gray-900">
          <AppHeader />
          <main className="flex-1 overflow-hidden flex flex-col max-w-6xl w-full mx-auto px-4 lg:px-8">
            <div className="py-6 flex-1 overflow-hidden flex flex-col">
              <MessageList />
            </div>
            <div className="pb-6">
              <MessageInput />
            </div>
          </main>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
};

export default Index;
