
import { useAppContext } from '@/context/AppContext';
import { Globe, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTheme } from '@/hooks/use-theme';

// Custom BotWithCrown icon component
const BotWithCrown = ({ className = "h-9 w-9" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Crown */}
    <path d="M3 9l4 4L12 8l5 5 4-4v5c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9z" fill="#FCDB3A" stroke="#C8102E" />
    
    {/* Bot face - square with rounded corners */}
    <rect x="6" y="10" width="12" height="11" rx="2" fill="#0068B4" />
    
    {/* Bot eyes */}
    <circle cx="9" cy="14" r="1.5" fill="white" />
    <circle cx="15" cy="14" r="1.5" fill="white" />
    
    {/* Bot mouth - happy line */}
    <path d="M9 18c1 1 5 1 6 0" stroke="white" strokeWidth="1.5" fill="none" />
    
    {/* Bot antenna */}
    <line x1="12" y1="10" x2="12" y2="8" stroke="#0068B4" strokeWidth="2" />
  </svg>
);

export default function AppHeader() {
  const { language, setLanguage } = useAppContext();
  const { theme, setTheme } = useTheme();
  const [helpOpen, setHelpOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'da' : 'en');
  };

  return (
    <header className="border-b border-danish-blue-100 py-4 bg-white shadow-sm animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 flex items-center justify-center text-danish-blue">
              <BotWithCrown />
            </div>
            <div>
              <h1 className="text-xl font-medium tracking-tight text-danish-blue font-dstext">
                {language === 'en' ? 'Danish Statistics Explorer' : 'Dansk Statistik Udforsker'}
              </h1>
              <p className="text-sm text-danish-blue-600 font-dstext">
                {language === 'en' ? 'Interactive data visualization' : 'Interaktiv datavisualisering'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleLanguage}
              className="text-danish-blue-600 hover:text-danish-blue hover:bg-danish-blue-50 transition-all rounded-md border-danish-blue-200"
            >
              <Globe className="h-4 w-4 mr-1.5" />
              <span className="text-sm">{language === 'en' ? 'Dansk' : 'English'}</span>
            </Button>
            
            <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-danish-blue-600 hover:text-danish-blue hover:bg-danish-blue-50 transition-all rounded-md h-8 w-8 border-danish-blue-200"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">{language === 'en' ? 'Help' : 'Hjælp'}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md animate-scale-in">
                <DialogHeader>
                  <DialogTitle className="text-lg font-medium text-danish-blue font-dsheading">
                    {language === 'en' ? 'How to use Danish Statistics Explorer' : 'Sådan bruger du Dansk Statistik Udforsker'}
                  </DialogTitle>
                  <DialogDescription className="text-danish-blue-600 mt-2">
                    {language === 'en' 
                      ? 'Ask questions about Danish statistics in natural language. Here are some examples:'
                      : 'Stil spørgsmål om dansk statistik på naturligt sprog. Her er nogle eksempler:'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <ul className="list-disc pl-6 space-y-2 text-danish-blue-700">
                    <li>{language === 'en' ? 'Show me population growth in Denmark over the last 10 years' : 'Vis mig befolkningsvæksten i Danmark over de sidste 10 år'}</li>
                    <li>{language === 'en' ? 'What is the unemployment rate trend since 2010?' : 'Hvad er tendensen i arbejdsløshed siden 2010?'}</li>
                    <li>{language === 'en' ? 'Compare GDP growth across Nordic countries' : 'Sammenlign BNP-vækst på tværs af nordiske lande'}</li>
                    <li>{language === 'en' ? 'Visualize immigration patterns by region' : 'Visualiser immigrationsmønstre efter region'}</li>
                  </ul>
                  
                  <p className="text-sm text-danish-blue-500">
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
