import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrencyCode } from '../types/user';
import { CURRENCY_RATES, formatPrice } from '../utils/formatters';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  format: (inrAmount: number) => string;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => 
    getStorageItem<CurrencyCode>('rs_currency', 'INR')
  );

  useEffect(() => {
    setStorageItem('rs_currency', currency);
  }, [currency]);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
  };

  const format = (inrAmount: number) => {
    return formatPrice(inrAmount, currency);
  };

  const symbol = CURRENCY_RATES[currency]?.symbol || '₹';

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
