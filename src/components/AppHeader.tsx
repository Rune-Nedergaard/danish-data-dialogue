
import { useAppContext } from '@/context/AppContext';
import { Globe, Moon, Sun, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTheme } from '@/hooks/use-theme';

export default function AppHeader() {
  const { language, setLanguage } = useAppContext();
  const { theme, setTheme } = useTheme();
  const [helpOpen, setHelpOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'da' : 'en');
  };

  return (
    <header className="border-b border-danish-gray-100 dark:border-danish-gray-800 py-4 bg-white dark:bg-danish-gray-900 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-danish-red flex items-center justify-center shadow-sm">
              <div className="h-6 w-6 rounded-full bg-danish-white"></div>
            </div>
            <h1 className="text-xl font-medium tracking-tight text-danish-gray-900 dark:text-danish-gray-50">
              {language === 'en' ? 'Danish Statistics Explorer' : 'Dansk Statistik Udforsker'}
            </h1>
          </div>

          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleLanguage}
              className="text-danish-gray-600 dark:text-danish-gray-300 hover:text-danish-gray-900 dark:hover:text-danish-gray-50 transition-all hover:bg-danish-gray-50 dark:hover:bg-danish-gray-800 rounded-md"
            >
              <Globe className="h-4 w-4 mr-1.5" />
              <span className="text-sm">{language === 'en' ? 'Dansk' : 'English'}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-danish-gray-600 dark:text-danish-gray-300 hover:text-danish-gray-900 dark:hover:text-danish-gray-50 transition-all hover:bg-danish-gray-50 dark:hover:bg-danish-gray-800 rounded-md h-8 w-8"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">{theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</span>
            </Button>

            <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-danish-gray-600 dark:text-danish-gray-300 hover:text-danish-gray-900 dark:hover:text-danish-gray-50 transition-all hover:bg-danish-gray-50 dark:hover:bg-danish-gray-800 rounded-md h-8 w-8"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">{language === 'en' ? 'Help' : 'Hjælp'}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md animate-scale-in">
                <DialogHeader>
                  <DialogTitle className="text-lg font-medium text-danish-gray-900 dark:text-danish-gray-50">
                    {language === 'en' ? 'How to use Danish Statistics Explorer' : 'Sådan bruger du Dansk Statistik Udforsker'}
                  </DialogTitle>
                  <DialogDescription className="text-danish-gray-600 dark:text-danish-gray-400 mt-2">
                    {language === 'en' 
                      ? 'Ask questions about Danish statistics in natural language. Here are some examples:'
                      : 'Stil spørgsmål om dansk statistik på naturligt sprog. Her er nogle eksempler:'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <ul className="list-disc pl-6 space-y-2 text-danish-gray-700 dark:text-danish-gray-300">
                    <li>{language === 'en' ? 'Show me population growth in Denmark over the last 10 years' : 'Vis mig befolkningsvæksten i Danmark over de sidste 10 år'}</li>
                    <li>{language === 'en' ? 'What is the unemployment rate trend since 2010?' : 'Hvad er tendensen i arbejdsløshed siden 2010?'}</li>
                    <li>{language === 'en' ? 'Compare GDP growth across Nordic countries' : 'Sammenlign BNP-vækst på tværs af nordiske lande'}</li>
                    <li>{language === 'en' ? 'Visualize immigration patterns by region' : 'Visualiser immigrationsmønstre efter region'}</li>
                  </ul>
                  
                  <p className="text-sm text-danish-gray-500 dark:text-danish-gray-400">
                    {language === 'en'
                      ? 'You can ask follow-up questions, request different visualizations, or export the data for your own analysis.'
                      : 'Du kan stille opfølgende spørgsmål, anmode om forskellige visualiseringer eller eksportere dataene til din egen analyse.'}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}
