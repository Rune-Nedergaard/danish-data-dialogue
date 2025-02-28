import React, { useState } from 'react';
import { DataTable as DataTableType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Search, SortAsc, SortDesc } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

interface DataTableProps {
  dataTable: DataTableType;
}

const DataTable: React.FC<DataTableProps> = ({ dataTable }) => {
  const { language } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Calculate pagination
  const pageSize = dataTable.pagination?.pageSize || 10;
  const totalRows = dataTable.rows.length;
  const totalPages = Math.ceil(totalRows / pageSize);
  
  // Handle search filtering
  const filteredRows = dataTable.rows.filter(row => 
    row.some(cell => 
      cell.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  // Handle sorting
  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortColumn === null) return 0;
    
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];
    
    // Check if the values are numbers
    const numA = parseFloat(valueA);
    const numB = parseFloat(valueB);
    
    if (!isNaN(numA) && !isNaN(numB)) {
      return sortDirection === 'asc' ? numA - numB : numB - numA;
    }
    
    // Otherwise sort as strings
    const strA = valueA.toString().toLowerCase();
    const strB = valueB.toString().toLowerCase();
    
    if (sortDirection === 'asc') {
      return strA.localeCompare(strB);
    } else {
      return strB.localeCompare(strA);
    }
  });
  
  // Get current page rows
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  // Handle sorting clicks
  const handleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      // Toggle direction if same column
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, reset to ascending
      setSortColumn(columnIndex);
      setSortDirection('asc');
    }
  };
  
  return (
    <div>
      {/* Search input */}
      <div className="mb-3">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-danish-gray-400" />
          <Input
            type="text"
            placeholder={language === 'en' ? 'Search data...' : 'Søg i data...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Data table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-danish-gray-50 dark:bg-danish-gray-800 border-b border-danish-gray-200 dark:border-danish-gray-700">
              {dataTable.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left text-sm font-medium text-danish-gray-600 dark:text-danish-gray-300 cursor-pointer select-none"
                  onClick={() => handleSort(index)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    {sortColumn === index && (
                      sortDirection === 'asc' 
                        ? <SortAsc className="h-3 w-3" /> 
                        : <SortDesc className="h-3 w-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className="border-b border-danish-gray-100 dark:border-danish-gray-800 hover:bg-danish-gray-50 dark:hover:bg-danish-gray-800/50"
              >
                {row.map((cell, cellIndex) => (
                  <td 
                    key={cellIndex}
                    className="px-4 py-3 text-sm text-danish-gray-800 dark:text-danish-gray-200"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
            
            {paginatedRows.length === 0 && (
              <tr>
                <td 
                  colSpan={dataTable.headers.length}
                  className="px-4 py-6 text-center text-sm text-danish-gray-500"
                >
                  {language === 'en' ? 'No data found' : 'Ingen data fundet'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-danish-gray-500 dark:text-danish-gray-400">
            {language === 'en' 
              ? `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, filteredRows.length)} of ${filteredRows.length}`
              : `Viser ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, filteredRows.length)} af ${filteredRows.length}`
            }
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">{language === 'en' ? 'Previous page' : 'Forrige side'}</span>
            </Button>
            
            <span className="text-sm">
              {currentPage} / {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">{language === 'en' ? 'Next page' : 'Næste side'}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
