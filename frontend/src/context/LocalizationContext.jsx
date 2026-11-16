import React, { createContext, useContext, useState, useEffect } from 'react';

const LocalizationContext = createContext();

export const currenciesData = {
  USD: { code: "USD", symbol: "$", rate: 1.0, name: "US Dollar" },
  INR: { code: "INR", symbol: "₹", rate: 84.0, name: "Indian Rupee" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, name: "Euro" },
  GBP: { code: "GBP", symbol: "£", rate: 0.79, name: "British Pound" }
};

export const languagesData = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "hi", name: "हिन्दी" }
];

export const LocalizationProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('implexcart_currency') || 'INR';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('implexcart_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('implexcart_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('implexcart_language', language);
  }, [language]);

  const currentCurrency = currenciesData[currency] || currenciesData.INR;

  const formatPrice = (usdAmount) => {
    const val = Number(usdAmount) || 0;
    const converted = val * currentCurrency.rate;
    if (currency === 'INR') {
      return `${currentCurrency.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${currentCurrency.symbol}${converted.toFixed(2)}`;
  };

  const getRawPrice = (usdAmount) => {
    const val = Number(usdAmount) || 0;
    return val * currentCurrency.rate;
  };

  return (
    <LocalizationContext.Provider
      value={{
        currency,
        setCurrency,
        currentCurrency,
        formatPrice,
        getRawPrice,
        language,
        setLanguage,
        currenciesData,
        languagesData
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);
