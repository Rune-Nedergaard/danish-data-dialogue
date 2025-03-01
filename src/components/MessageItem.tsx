
import React, { useState } from 'react';
import { Message } from '@/types';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/AppContext';
import DataVisualizer from '@/components/visualizations/DataVisualizer';
import DataTable from '@/components/visualizations/DataTable';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Download, Maximize2, X } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { language } = useAppContext();
  const [expandedViz, setExpandedViz] = useState<string | null>(null);
  
  // Check if the message is from the system or user
  const isSystemMessage = message.role === 'system';
  
  return (
    <div
      className={cn(
        "w-full max-w-3xl mx-auto mb-6 animate-slide-in transition-all duration-300",
        isSystemMessage ? "opacity-95" : "opacity-100"
      )}
    >
      <div
        className={cn(
          "rounded-xl p-4",
          isSystemMessage 
            ? "bg-white dark:bg-danish-gray-800 shadow-sm border border-danish-gray-100 dark:border-danish-gray-700" 
            : "bg-danish-blue-light bg-opacity-5 dark:bg-danish-blue-dark dark:bg-opacity-10 border border-danish-blue-light border-opacity-10 dark:border-danish-blue-dark dark:border-opacity-20"
        )}
      >
        {/* Message content */}
        {message.isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <div className="text-balance text-danish-gray-800 dark:text-danish-gray-200 leading-relaxed">{message.content}</div>
        )}
        
        {/* Visualizations */}
        {message.visualizations && message.visualizations.length > 0 && (
          <div className="mt-6 space-y-6">
            {message.visualizations.map((visualization) => (
              <div key={visualization.id} className="visualization-appear bg-white dark:bg-danish-gray-800 rounded-lg p-4 shadow-sm border border-danish-gray-100 dark:border-danish-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-danish-gray-900 dark:text-danish-gray-100 pr-4 truncate">
                    {visualization.title}
                  </h3>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-danish-gray-500 hover:text-danish-gray-700 dark:text-danish-gray-400 dark:hover:text-danish-gray-200">
                          <Download className="h-3.5 w-3.5" />
                          <span className="sr-only">{language === 'en' ? 'Export' : 'Eksporter'}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem className="text-xs cursor-pointer">PNG</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs cursor-pointer">SVG</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs cursor-pointer">PDF</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-7 w-7 text-danish-gray-500 hover:text-danish-gray-700 dark:text-danish-gray-400 dark:hover:text-danish-gray-200"
                      onClick={() => setExpandedViz(visualization.id)}
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span className="sr-only">{language === 'en' ? 'Expand' : 'Udvid'}</span>
                    </Button>
                  </div>
                </div>
                <div className="h-64">
                  <DataVisualizer visualization={visualization} />
                </div>

                {/* Expanded visualization dialog */}
                <Dialog open={expandedViz === visualization.id} onOpenChange={() => setExpandedViz(null)}>
                  <DialogContent className="sm:max-w-4xl w-[90vw] h-[80vh] max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>{visualization.title}</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 h-full overflow-hidden">
                      <div className="w-full h-full py-2">
                        <DataVisualizer visualization={visualization} isExpanded />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        )}
        
        {/* Data Table */}
        {message.dataTable && (
          <div className="mt-6 visualization-appear bg-white dark:bg-danish-gray-800 rounded-lg p-4 shadow-sm border border-danish-gray-100 dark:border-danish-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-danish-gray-900 dark:text-danish-gray-100">
                {message.dataTable.title}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-danish-gray-500 hover:text-danish-gray-700 dark:text-danish-gray-400 dark:hover:text-danish-gray-200">
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    <span>{language === 'en' ? 'Export' : 'Eksporter'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem className="text-xs cursor-pointer">CSV</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs cursor-pointer">Excel</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs cursor-pointer">JSON</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <DataTable dataTable={message.dataTable} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
