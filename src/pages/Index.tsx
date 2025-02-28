
import React from 'react';
import { AppProvider } from '@/context/AppContext';
import { ThemeProvider } from '@/hooks/use-theme';
import AppHeader from '@/components/AppHeader';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <AppProvider>
        <div className="flex flex-col min-h-screen bg-white">
          <AppHeader />
          <main className="flex-1 overflow-hidden flex flex-col w-full mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="py-6 flex-1 overflow-hidden flex flex-col">
              <MessageList />
            </div>
            <div className="pb-6">
              <MessageInput />
            </div>
          </main>
          <footer className="bg-danish-blue-50 py-3 border-t border-danish-blue-100">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 text-sm text-danish-blue-600">
              <p>© {new Date().getFullYear()} Danish Statistics Explorer</p>
            </div>
          </footer>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
};

export default Index;
