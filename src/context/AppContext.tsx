import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Language, Message, SuggestedQuery, ChartType } from '@/types';
import { toast } from 'sonner';

interface AppContextProps {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  isProcessing: boolean;
  clearMessages: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  suggestedQueries: SuggestedQuery[];
  selectedCategories: string[];
  toggleCategorySelection: (category: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    // Try to detect browser language, default to English
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('da') ? 'da' : 'en';
  });

  // Sample suggested queries (these would actually come from your backend)
  const [suggestedQueries, setSuggestedQueries] = useState<SuggestedQuery[]>([
    { id: '1', text: 'Show me population growth in Denmark over the last 10 years', category: 'Demographics' },
    { id: '2', text: 'What is the unemployment rate trend since 2010?', category: 'Economy' },
    { id: '3', text: 'Compare GDP growth across Nordic countries', category: 'Economy' },
    { id: '4', text: 'Visualize immigration patterns by region', category: 'Demographics' },
    { id: '5', text: 'Show me education level by age group', category: 'Education' },
  ]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategorySelection = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category) 
        : [...prev, category]
    );
  };

  // Add a welcome message when the component mounts
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      content: language === 'en' 
        ? 'Welcome to the Danish Statistics Explorer! Ask questions about Danish statistics in natural language, and I\'ll provide insights with visualizations.'
        : 'Velkommen til Dansk Statistik Udforskeren! Stil spørgsmål om dansk statistik på naturligt sprog, og jeg vil give indsigt med visualiseringer.',
      role: 'system',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [language]); // Re-run if language changes to update welcome message

  // Update suggested queries when language changes
  useEffect(() => {
    if (language === 'da') {
      setSuggestedQueries([
        { id: '1', text: 'Vis mig befolkningsvæksten i Danmark over de sidste 10 år', category: 'Demografi' },
        { id: '2', text: 'Hvad er tendensen i arbejdsløshed siden 2010?', category: 'Økonomi' },
        { id: '3', text: 'Sammenlign BNP-vækst på tværs af nordiske lande', category: 'Økonomi' },
        { id: '4', text: 'Visualiser immigrationsmønstre efter region', category: 'Demografi' },
        { id: '5', text: 'Vis mig uddannelsesniveau efter aldersgruppe', category: 'Uddannelse' },
      ]);
    } else {
      setSuggestedQueries([
        { id: '1', text: 'Show me population growth in Denmark over the last 10 years', category: 'Demographics' },
        { id: '2', text: 'What is the unemployment rate trend since 2010?', category: 'Economy' },
        { id: '3', text: 'Compare GDP growth across Nordic countries', category: 'Economy' },
        { id: '4', text: 'Visualize immigration patterns by region', category: 'Demographics' },
        { id: '5', text: 'Show me education level by age group', category: 'Education' },
      ]);
    }
  }, [language]);

  const addMessage = async (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: uuidv4(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    // If it's a user message, simulate a response from the system
    if (message.role === 'user') {
      setIsProcessing(true);
      
      try {
        // This would be replaced with your actual API call to the backend
        // For demonstration, we'll simulate a response with random visualizations
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Create a response message
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: language === 'en'
            ? `I've analyzed the data related to your query about "${message.content}". Here are the insights:`
            : `Jeg har analyseret data relateret til dit spørgsmål om "${message.content}". Her er indsigterne:`,
          role: 'system',
          timestamp: new Date(),
          visualizations: generateMockVisualizations(message.content),
          dataTable: generateMockDataTable(message.content),
        };
        
        setMessages(prev => [...prev, responseMessage]);
      } catch (error) {
        console.error('Error processing message:', error);
        
        toast.error(language === 'en' 
          ? 'There was an error processing your request. Please try again.' 
          : 'Der opstod en fejl under behandlingen af din anmodning. Prøv igen.');
        
        // Add an error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: language === 'en'
            ? 'Sorry, I encountered an error processing your request. Please try again.'
            : 'Beklager, jeg stødte på en fejl under behandlingen af din anmodning. Prøv igen.',
          role: 'system',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const clearMessages = () => {
    // Keep only the welcome message
    const welcomeMessage = messages[0];
    setMessages([welcomeMessage]);
  };

  return (
    <AppContext.Provider
      value={{
        messages,
        addMessage,
        isProcessing,
        clearMessages,
        language,
        setLanguage,
        suggestedQueries,
        selectedCategories,
        toggleCategorySelection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Helper functions to generate mock data for demonstration purposes
function generateMockVisualizations(query: string) {
  // In a real application, this would come from your backend
  
  // For demonstration, let's generate some random charts based on the query
  const lowercaseQuery = query.toLowerCase();
  
  const charts = [];
  
  if (lowercaseQuery.includes('population') || lowercaseQuery.includes('befolkning')) {
    charts.push({
      id: 'population-chart',
      type: 'line' as ChartType,
      title: 'Population Growth in Denmark (2013-2023)',
      data: {
        labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [{
          label: 'Population (millions)',
          data: [5.61, 5.64, 5.66, 5.71, 5.75, 5.78, 5.81, 5.83, 5.84, 5.87, 5.91],
          borderColor: '#0EA5E9',
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          tension: 0.2,
          fill: true,
        }]
      }
    });
  }
  
  if (lowercaseQuery.includes('unemployment') || lowercaseQuery.includes('arbejdsløshed')) {
    charts.push({
      id: 'unemployment-chart',
      type: 'bar' as ChartType,
      title: 'Unemployment Rate in Denmark (2010-2023)',
      data: {
        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [{
          label: 'Unemployment Rate (%)',
          data: [7.5, 7.6, 7.5, 7.0, 6.6, 6.2, 6.2, 5.8, 5.1, 5.0, 5.6, 5.1, 4.8, 4.5],
          backgroundColor: '#C8102E',
        }]
      }
    });
  }
  
  if (lowercaseQuery.includes('gdp') || lowercaseQuery.includes('bnp')) {
    charts.push({
      id: 'gdp-chart',
      type: 'line' as ChartType,
      title: 'GDP Growth in Nordic Countries (2018-2023)',
      data: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'Denmark',
            data: [2.0, 2.1, -2.1, 4.9, 3.8, 2.3],
            borderColor: '#C8102E',
            tension: 0.2,
          },
          {
            label: 'Sweden',
            data: [2.0, 1.4, -2.2, 5.1, 3.0, 1.8],
            borderColor: '#006AA7',
            tension: 0.2,
          },
          {
            label: 'Norway',
            data: [1.1, 0.7, -1.3, 3.9, 3.3, 1.5],
            borderColor: '#00205B',
            tension: 0.2,
          },
          {
            label: 'Finland',
            data: [1.1, 1.2, -2.2, 3.0, 2.1, 1.6],
            borderColor: '#0066CC',
            tension: 0.2,
          }
        ]
      }
    });
  }
  
  if (lowercaseQuery.includes('immigration') || lowercaseQuery.includes('immigration')) {
    charts.push({
      id: 'immigration-chart',
      type: 'map' as ChartType,
      title: 'Immigration in Denmark by Region (2023)',
      data: {
        // Simplified map data for demonstration
        regions: [
          { id: 'hovedstaden', name: 'Hovedstaden', value: 15.2 },
          { id: 'midtjylland', name: 'Midtjylland', value: 8.7 },
          { id: 'nordjylland', name: 'Nordjylland', value: 6.4 },
          { id: 'sjælland', name: 'Sjælland', value: 5.9 },
          { id: 'syddanmark', name: 'Syddanmark', value: 7.8 },
        ]
      }
    });
  }
  
  if (lowercaseQuery.includes('education') || lowercaseQuery.includes('uddannelse')) {
    charts.push({
      id: 'education-chart',
      type: 'pie' as ChartType,
      title: 'Education Level Distribution in Denmark (2023)',
      data: {
        labels: ['Primary', 'Secondary', 'Vocational', 'Bachelor', 'Master or higher'],
        datasets: [{
          data: [18, 25, 30, 17, 10],
          backgroundColor: [
            '#C8102E',
            '#F47C3C',
            '#0EA5E9',
            '#0C4A6E',
            '#334155',
          ],
        }]
      }
    });
  }
  
  // If no specific charts were generated based on the query, return a default one
  if (charts.length === 0) {
    charts.push({
      id: 'default-chart',
      type: 'bar' as ChartType,
      title: 'General Statistics Overview (2023)',
      data: {
        labels: ['Population (M)', 'GDP Growth (%)', 'Unemployment (%)', 'Life Expectancy'],
        datasets: [{
          label: 'Denmark',
          data: [5.91, 2.3, 4.5, 81.4],
          backgroundColor: '#C8102E',
        }]
      }
    });
  }
  
  return charts;
}

function generateMockDataTable(query: string) {
  // In a real application, this would come from your backend
  
  // For demonstration, let's generate a mock data table based on the query
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes('population') || lowercaseQuery.includes('befolkning')) {
    return {
      id: 'population-table',
      title: 'Population in Denmark (2013-2023)',
      headers: ['Year', 'Population', 'Growth Rate (%)', 'Natural Increase', 'Net Migration'],
      rows: [
        ['2023', '5,910,577', '0.68', '10,423', '30,215'],
        ['2022', '5,873,420', '0.51', '8,239', '21,789'],
        ['2021', '5,843,347', '0.22', '7,018', '6,253'],
        ['2020', '5,830,534', '0.35', '8,121', '12,310'],
        ['2019', '5,806,081', '0.45', '9,547', '16,719'],
        ['2018', '5,781,190', '0.53', '8,224', '22,621'],
        ['2017', '5,748,769', '0.67', '7,915', '30,677'],
        ['2016', '5,707,251', '0.79', '8,892', '36,883'],
        ['2015', '5,659,715', '0.35', '8,358', '11,642'],
        ['2014', '5,639,719', '0.53', '9,045', '20,952'],
        ['2013', '5,605,836', '0.41', '8,564', '14,362'],
      ],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        pageSize: 11,
      }
    };
  }
  
  if (lowercaseQuery.includes('unemployment') || lowercaseQuery.includes('arbejdsløshed')) {
    return {
      id: 'unemployment-table',
      title: 'Unemployment Rate in Denmark (2010-2023)',
      headers: ['Year', 'Unemployment Rate (%)', 'Male (%)', 'Female (%)', 'Youth (15-24) (%)'],
      rows: [
        ['2023', '4.5', '4.3', '4.7', '8.2'],
        ['2022', '4.8', '4.6', '5.0', '9.1'],
        ['2021', '5.1', '4.9', '5.3', '10.2'],
        ['2020', '5.6', '5.4', '5.8', '11.6'],
        ['2019', '5.0', '4.8', '5.2', '10.1'],
        ['2018', '5.1', '4.9', '5.3', '10.5'],
        ['2017', '5.8', '5.6', '6.0', '11.9'],
        ['2016', '6.2', '5.9', '6.5', '12.0'],
        ['2015', '6.2', '5.9', '6.5', '12.6'],
        ['2014', '6.6', '6.4', '6.8', '13.1'],
        ['2013', '7.0', '6.7', '7.3', '13.0'],
        ['2012', '7.5', '7.5', '7.5', '14.1'],
        ['2011', '7.6', '7.7', '7.5', '14.2'],
        ['2010', '7.5', '8.4', '6.5', '13.8'],
      ],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        pageSize: 14,
      }
    };
  }
  
  // Default table if no specific query matched
  return {
    id: 'default-table',
    title: 'Key Danish Statistics Indicators (2023)',
    headers: ['Indicator', 'Value', 'Change from 2022'],
    rows: [
      ['Population', '5,910,577', '+0.68%'],
      ['GDP Growth', '2.3%', '-1.5%'],
      ['Inflation', '3.1%', '-2.6%'],
      ['Unemployment Rate', '4.5%', '-0.3%'],
      ['Life Expectancy', '81.4 years', '+0.2'],
      ['Fertility Rate', '1.73', '+0.05'],
      ['CO2 Emissions', '35.2 Mt', '-3.1%'],
      ['Renewable Energy Share', '43.8%', '+2.4%'],
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      pageSize: 8,
    }
  };
}
