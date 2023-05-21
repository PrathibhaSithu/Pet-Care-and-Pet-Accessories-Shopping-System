import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const LOCAL_STORAGE_KEY = 'sidebar';

export const AppProvider = ({ children }) => {
  const [stateTrack, setStateTrack] = useState(0);

  useEffect(() => {
    const storedStateTrack = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedStateTrack) {
      setStateTrack(storedStateTrack);
    }
  }, []);

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateTrack));
  }, [stateTrack]);

  return (
    <AppContext.Provider value={{ stateTrack, setStateTrack }}>
      {children}
    </AppContext.Provider>
  );
};
