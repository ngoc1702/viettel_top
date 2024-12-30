import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create a Context for the title
const TitleContext = createContext<{ setTitle: (title: string) => void } | undefined>(undefined);

// TitleProvider component to provide the context value
export const TitleProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState<string>("");

  // Update document title whenever it changes
  React.useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <TitleContext.Provider value={{ setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

// Custom hook to access the context
export const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error("useTitle must be used within a TitleProvider");
  }
  return context;
};
