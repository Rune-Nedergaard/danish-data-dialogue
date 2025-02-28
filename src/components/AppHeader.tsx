
import { useAppContext } from '@/context/AppContext';
import { Globe, Crown, HelpCircle } from 'lucide-react';
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
    <header className="border-b border-danish-blue-100 py-4 bg-white shadow-sm animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 flex items-center justify-center text-danish-blue">
              <Crown className="h-9 w-9" />
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
