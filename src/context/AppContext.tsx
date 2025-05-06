import React, { createContext, useContext, useState } from 'react';
import { mockProperties, mockOwners } from '../data/mockData';
import { Property, Owner, Filter } from '../types';

interface AppContextType {
  properties: Property[];
  owners: Owner[];
  filters: Filter[];
  savedViews: SavedView[];
  addFilter: (filter: Filter) => void;
  removeFilter: (id: string) => void;
  saveView: (view: SavedView) => void;
  removeView: (id: string) => void;
}

interface SavedView {
  id: string;
  name: string;
  filters: Filter[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties] = useState<Property[]>(mockProperties);
  const [owners] = useState<Owner[]>(mockOwners);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);

  const addFilter = (filter: Filter) => {
    setFilters(prevFilters => [...prevFilters, filter]);
  };

  const removeFilter = (id: string) => {
    setFilters(prevFilters => prevFilters.filter(filter => filter.id !== id));
  };

  const saveView = (view: SavedView) => {
    setSavedViews(prevViews => [...prevViews, view]);
  };

  const removeView = (id: string) => {
    setSavedViews(prevViews => prevViews.filter(view => view.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      properties, 
      owners, 
      filters, 
      savedViews,
      addFilter,
      removeFilter,
      saveView,
      removeView
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};