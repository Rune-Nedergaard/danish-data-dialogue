
import React from 'react';
import { AppProvider } from '@/context/AppContext';
import { ThemeProvider } from '@/hooks/use-theme';
import AppHeader from '@/components/AppHeader';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Download, BarChart, RefreshCcw, Bot, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Define categories and subcategories structure
const categories = [
  {
    id: 'demographics',
    icon: BarChart,
    subcategories: ['Population', 'Age Distribution', 'Gender', 'Migration']
  },
  {
    id: 'economy',
    icon: BarChart,
    subcategories: ['GDP', 'Employment', 'Inflation', 'Trade', 'Public Finance']
  },
  {
    id: 'education',
    icon: BarChart,
    subcategories: ['Primary Education', 'Secondary Education', 'Higher Education', 'Adult Education', 'Educational Attainment']
  },
  {
    id: 'health',
    icon: BarChart,
    subcategories: ['Healthcare System', 'Diseases', 'Life Expectancy', 'Mental Health', 'Healthcare Spending']
  },
  {
    id: 'environment',
    icon: BarChart,
    subcategories: ['Emissions', 'Renewable Energy', 'Waste Management', 'Biodiversity', 'Climate Change']
  }
];

const ActionButtons = () => {
  const { language, clearMessages } = useAppContext();
  
  return (
    <div className="fixed bottom-8 right-8 flex flex-col space-y-2">
      <Button 
        className="rounded-full w-12 h-12 bg-danish-blue shadow-lg hover:bg-danish-blue-600 transition-all duration-300"
        title={language === 'en' ? 'Export data' : 'Eksportér data'}
      >
        <Download className="h-5 w-5" />
      </Button>
      <Button 
        className="rounded-full w-12 h-12 bg-danish-blue shadow-lg hover:bg-danish-blue-600 transition-all duration-300"
        title={language === 'en' ? 'New query' : 'Ny forespørgsel'}
        onClick={clearMessages}
      >
        <RefreshCcw className="h-5 w-5" />
      </Button>
    </div>
  );
};

const ExplorerSidebar = () => {
  const { language, selectedCategories, toggleCategorySelection } = useAppContext();
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const translateCategory = (category: string) => {
    if (language === 'en') return category;
    
    const translations: Record<string, string> = {
      'demographics': 'Demografi',
      'economy': 'Økonomi',
      'education': 'Uddannelse',
      'health': 'Sundhed',
      'environment': 'Miljø',
      'Population': 'Befolkning',
      'Age Distribution': 'Aldersfordeling',
      'Gender': 'Køn',
      'Migration': 'Migration',
      'GDP': 'BNP',
      'Employment': 'Beskæftigelse',
      'Inflation': 'Inflation',
      'Trade': 'Handel',
      'Public Finance': 'Offentlige finanser',
      'Primary Education': 'Grundskole',
      'Secondary Education': 'Ungdomsuddannelse',
      'Higher Education': 'Videregående uddannelse',
      'Adult Education': 'Voksenuddannelse',
      'Educational Attainment': 'Uddannelsesniveau',
      'Healthcare System': 'Sundhedssystem',
      'Diseases': 'Sygdomme',
      'Life Expectancy': 'Middellevetid',
      'Mental Health': 'Mental sundhed',
      'Healthcare Spending': 'Sundhedsudgifter',
      'Emissions': 'Emissioner',
      'Renewable Energy': 'Vedvarende energi',
      'Waste Management': 'Affaldshåndtering',
      'Biodiversity': 'Biodiversitet',
      'Climate Change': 'Klimaforandringer'
    };
    
    return translations[category] || category;
  };
  
  const getCategoryFromSubcategory = (subcategory: string) => {
    for (const category of categories) {
      if (category.subcategories.includes(subcategory)) {
        return category.id;
      }
    }
    return null;
  };
  
  return (
    <Sidebar className="max-w-[240px] w-[240px]">
      <SidebarHeader>
        <div className="flex items-center space-x-2 p-4">
          <Bot className="h-6 w-6 text-danish-blue" />
          <span className="font-medium text-danish-blue">
            {language === 'en' ? 'Statistics Explorer' : 'Statistik Udforsker'}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <h3 className="px-4 text-xs uppercase tracking-wider text-danish-blue-600 font-semibold mb-2">
            {language === 'en' ? 'Recent Queries' : 'Seneste forespørgsler'}
          </h3>
          <div className="space-y-1 px-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-2 py-1.5 text-sm rounded-md hover:bg-danish-blue-50 cursor-pointer transition-colors text-danish-blue-700">
                {language === 'en' ? `Example query ${i}` : `Eksempel forespørgsel ${i}`}
              </div>
            ))}
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <h3 className="px-4 text-xs uppercase tracking-wider text-danish-blue-600 font-semibold mb-2 mt-6">
            {language === 'en' ? 'Data Categories' : 'Datakategorier'}
          </h3>
          <div className="space-y-1 px-2">
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <Collapsible>
                    <div className="flex items-center">
                      <CollapsibleTrigger 
                        onClick={() => toggleCategory(category.id)}
                        className="px-2 py-1.5 text-sm rounded-md hover:bg-danish-blue-50 cursor-pointer transition-colors text-danish-blue-700 flex items-center w-full"
                      >
                        <category.icon className="h-3.5 w-3.5 mr-2 text-danish-blue-500" />
                        <span className="flex-1">{translateCategory(category.id)}</span>
                        {openCategories[category.id] ? 
                          <ChevronDown className="h-3.5 w-3.5 text-danish-blue-500" /> : 
                          <ChevronRight className="h-3.5 w-3.5 text-danish-blue-500" />
                        }
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {category.subcategories.map((subcategory) => {
                          const fullPath = `${category.id}/${subcategory}`;
                          return (
                            <SidebarMenuSubItem key={subcategory}>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`category-${fullPath}`}
                                  checked={selectedCategories.includes(fullPath)}
                                  onChange={() => toggleCategorySelection(fullPath)}
                                  className="mr-2 h-3.5 w-3.5 rounded-sm border-danish-gray-300 text-danish-blue-500 focus:ring-danish-blue-500"
                                />
                                <label 
                                  htmlFor={`category-${fullPath}`}
                                  className="cursor-pointer text-sm text-danish-blue-700 hover:text-danish-blue-900 dark:text-danish-gray-300 dark:hover:text-danish-gray-100"
                                >
                                  {translateCategory(subcategory)}
                                </label>
                              </div>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <AppProvider>
        <SidebarProvider>
          <div className="flex flex-col min-h-screen bg-white w-full">
            <AppHeader />
            <div className="flex flex-1 overflow-hidden">
              <ExplorerSidebar />
              <main className="flex-1 overflow-hidden flex flex-col w-full px-4 lg:px-8 md:ml-[240px]">
                <div className="py-6 flex-1 overflow-hidden flex flex-col">
                  <MessageList />
                </div>
                <div className="pb-6">
                  <MessageInput />
                </div>
                <ActionButtons />
              </main>
            </div>
            <footer className="bg-danish-blue-50 py-3 border-t border-danish-blue-100 md:ml-[240px]">
              <div className="px-4 lg:px-8 text-sm text-danish-blue-600">
                <p>© {new Date().getFullYear()} Danish Statistics Explorer</p>
              </div>
            </footer>
          </div>
        </SidebarProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

export default Index;
