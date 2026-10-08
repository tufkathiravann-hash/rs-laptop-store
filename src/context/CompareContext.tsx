import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Laptop } from '../types/product';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useToast } from './ToastContext';

interface CompareContextType {
  compareIds: string[];
  compareCount: number;
  isInCompare: (laptopId: string) => boolean;
  toggleCompare: (laptop: Laptop) => void;
  removeFromCompare: (laptopId: string) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [compareIds, setCompareIds] = useState<string[]>(() =>
    getStorageItem<string[]>('rs_compare_ids', ['rog-scar-18-2024', 'razer-blade-16-dual-mode'])
  );

  useEffect(() => {
    setStorageItem('rs_compare_ids', compareIds);
  }, [compareIds]);

  const isInCompare = (laptopId: string) => compareIds.includes(laptopId);

  const toggleCompare = (laptop: Laptop) => {
    setCompareIds((prev) => {
      if (prev.includes(laptop.id)) {
        showToast('Removed from Compare', `${laptop.name} removed.`, 'info');
        return prev.filter((id) => id !== laptop.id);
      }
      if (prev.length >= 4) {
        showToast('Comparison Limit Reached', 'You can compare up to 4 laptops simultaneously.', 'warning');
        return prev;
      }
      showToast('Added to Comparison', `${laptop.name} ready for side-by-side spec comparison.`, 'success');
      return [...prev, laptop.id];
    });
  };

  const removeFromCompare = (laptopId: string) => {
    setCompareIds((prev) => prev.filter((id) => id !== laptopId));
  };

  const clearCompare = () => {
    setCompareIds([]);
    showToast('Comparison Cleared', 'All compared laptops removed.', 'info');
  };

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        compareCount: compareIds.length,
        isInCompare,
        toggleCompare,
        removeFromCompare,
        clearCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
