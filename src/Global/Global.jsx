import React, { createContext, useState, useContext } from 'react';

// 1. Use PascalCase for context and provider
export const GlobalLoginContext = createContext();

const Global = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  // 2. Export the context for use in other components
  return (
    <GlobalLoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </GlobalLoginContext.Provider>
  );
};

export default Global;

// Create a custom hook for accessing the context
export const useGlobalLogin = () => {
  return useContext(GlobalLoginContext);
};
