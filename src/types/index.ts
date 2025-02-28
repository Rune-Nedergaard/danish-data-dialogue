
export type Language = 'en' | 'da';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'system';
  timestamp: Date;
  visualizations?: Visualization[];
  dataTable?: DataTable;
  isLoading?: boolean;
}

export type ChartType = 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'map';

export interface Visualization {
  id: string;
  type: ChartType;
  title: string;
  data: any; // This would typically be a more specific type based on the chart library
  config?: any; // Chart configuration options
}

export interface DataTable {
  id: string;
  title: string;
  headers: string[];
  rows: any[][];
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}

export interface SuggestedQuery {
  id: string;
  text: string;
  category?: string;
}
